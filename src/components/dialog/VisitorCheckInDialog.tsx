import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import Webcam from 'react-webcam'
import { getBase64FromImage } from '@lib/file'
import { useFaceAuth } from '@store/faceAuth/useFaceAuth'
import { Button } from '@components/ui/button'
import { Camera, Repeat, Upload } from 'lucide-react'
import { useVisitor } from '@store/visitor/useVisitor'

interface VisitorCheckInDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const VisitorCheckInDialog = ({ open, setOpen }: VisitorCheckInDialogProps) => {
    const [scanned, setScannedText] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [webcamError, setWebcamError] = useState<string | null>(null) // Webcam error state
    const [scannerError, setScannerError] = useState<string | null>(null) // Scanner error state
    const [isWebcamAvailable, setIsWebcamAvailable] = useState<boolean>(false) // Track webcam availability
    const [isLoading, setIsLoading] = useState<boolean>(true) // Track if the webcam availability is loading
    const webcamRef = useRef<Webcam>(null)
    const [faceImage, setFaceImage] = useState<string>('')

    const { uploadUserFaceAuthAction } = useFaceAuth()
    const { visitorDetails, verifyVisitorTokenAction, isValid, resetVisitorDetails } =
        useVisitor()

    const capture = useCallback(() => {
        if (!webcamRef.current) return
        const imageSrc = webcamRef.current.getScreenshot()
        if (imageSrc == null) return
        setFaceImage(imageSrc)
    }, [webcamRef])

    const retake = () => {
        setFaceImage('')
    }

    const uploadImage = async () => {
        if (faceImage == null) return
        let base64 = await getBase64FromImage(faceImage)
        await uploadUserFaceAuthAction({
            faceData: base64,
        })
        setOpen(false)
    }

    useEffect(() => {
        if (!open) {
            setScannedText('')
            setIsVerified(false)
            setFaceImage('')
            setScannerError(null)
            resetVisitorDetails()
        }
    }, [open])

    useEffect(() => {
        const verifyVisitorToken = async () => {
            if (scanned) {
                await verifyVisitorTokenAction(scanned)
                if (isValid) {
                    setIsVerified(true)
                    setScannerError(null) // Clear scanner error after verification
                }
            }
        }
        verifyVisitorToken()
    }, [scanned, isValid, verifyVisitorTokenAction])

    const onScan = (detectedCodes: IDetectedBarcode[]) => {
        if (detectedCodes && detectedCodes.length > 0) {
            const firstDetectedCode = detectedCodes[0]
            if (firstDetectedCode.rawValue) {
                setScannedText(firstDetectedCode.rawValue)
                setScannerError(null) // Reset scanner error if QR code is detected
            } else {
                setScannerError('Invalid QR Code') // Handle case if rawValue is not found
            }
        } else {
            setScannerError('No QR Code detected') // Handle case where no QR code was detected
        }
    }

    const onWebcamError = (error: unknown) => {
        if (error instanceof Error) {
            setWebcamError(error.message) // Store the error message instead of the object
        } else if (error instanceof DOMException) {
            setWebcamError(error.message) // Handle DOMException error messages properly
        } else {
            setWebcamError('An unknown error occurred')
        }
    }

    const onScannerError = (error: unknown) => {
        if (error instanceof Error) {
            setScannerError(error.message) // Store the error message
        } else if (error instanceof DOMException) {
            setScannerError(error.message) // Handle DOMException errors
        } else {
            setScannerError('An unknown scanner error occurred')
        }
    }

    // Check if the webcam is available when the component mounts
    useEffect(() => {
        const checkWebcamAvailability = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices()
                const videoDevices = devices.filter(
                    (device) => device.kind === 'videoinput'
                )
                setIsWebcamAvailable(videoDevices.length > 0) // Set webcam availability based on the number of video devices
                setIsLoading(false) // Stop loading once the webcam check is complete
            } catch (error) {
                setWebcamError('Error checking webcam availability')
                setIsLoading(false) // Stop loading even if there's an error
            }
        }

        checkWebcamAvailability()
    }, [])

    useEffect(() => {
        if (isVerified) {
            // Clear any existing webcam errors when verification succeeds
            setWebcamError(null)
        }
    }, [isVerified])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[625px] w-full">
                <DialogHeader>
                    <DialogTitle>Visitor Check In</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {isVerified ? (
                    visitorDetails ? (
                        <div>
                            <h2>Welcome, {visitorDetails.visitorName}!</h2>
                            <p>Email: {visitorDetails.visitorEmail}</p>
                            <p>Category: {visitorDetails.visitorCategory}</p>
                            <p>Contact Number: {visitorDetails.visitorContactNumber}</p>
                            <p>Visit Date/Time: {visitorDetails.visitDateTime}</p>
                            <div className="mt-4">
                                <h2>Face ID Registration</h2>
                                <div className="mt-2">
                                    {faceImage ? (
                                        <img src={faceImage} alt="webcam" />
                                    ) : webcamError ? (
                                        <div className="flex items-center justify-center w-full h-96 border-2 border-red-500">
                                            <span className="text-red-500">
                                                {webcamError}
                                            </span>
                                        </div>
                                    ) : isWebcamAvailable ? (
                                        <Webcam
                                            height={600}
                                            width={600}
                                            ref={webcamRef}
                                            mirrored={true}
                                            screenshotFormat="image/jpeg"
                                            screenshotQuality={0.3}
                                            onError={onWebcamError} // Handle webcam error
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-96">
                                            <span className="text-gray-500">
                                                Loading Webcam...
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center mt-5">
                                    {faceImage ? (
                                        <div className="flex w-full justify-evenly">
                                            <Button
                                                type="button"
                                                className="w-fit h-fit"
                                                onClick={retake}
                                            >
                                                <Repeat className="mr-2 h-5 w-5" />
                                                Retake
                                            </Button>
                                            <Button
                                                type="button"
                                                className="w-fit h-fit"
                                                onClick={uploadImage}
                                            >
                                                <Upload className="mr-2 h-5 w-5" />
                                                Upload
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="button"
                                            className="w-fit h-fit"
                                            onClick={capture}
                                        >
                                            <Camera className="mr-2 h-5 w-5" />
                                            Capture
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading visitor details...</p>
                    )
                ) : (
                    <div>
                        <div className="flex items-center justify-center mb-2">
                            {scannerError ? (
                                <div className="flex items-center justify-center w-full h-96 border-2 border-red-500">
                                    <span className="text-red-500">{scannerError}</span>
                                </div>
                            ) : isLoading ? (
                                <div className="flex items-center justify-center w-full h-96">
                                    <span className="text-gray-500">
                                        Loading Webcam...
                                    </span>
                                </div>
                            ) : isWebcamAvailable ? (
                                <Scanner onScan={onScan} onError={onScannerError} />
                            ) : (
                                <div className="text-center text-red-500">
                                    No camera detected. Please connect a camera.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default VisitorCheckInDialog
