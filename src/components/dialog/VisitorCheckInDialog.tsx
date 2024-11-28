import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import Webcam from 'react-webcam'
import { convertImageToGeneralFile, getBase64FromImage } from '@lib/file'
import { useFaceAuth } from '@store/faceAuth/useFaceAuth'
import { Button } from '@components/ui/button'
import { Camera, Repeat, Upload } from 'lucide-react'
import { useVisitor } from '@store/visitor/useVisitor'
import { DialogDescription } from '@radix-ui/react-dialog'
import { CreateUpdateVisitorFaceAuthDto } from '@dtos/faceAuth/faceAuth.dto'

interface VisitorCheckInDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const VisitorCheckInDialog = ({ open, setOpen }: VisitorCheckInDialogProps) => {
    const [scanned, setScannedText] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [webcamError, setWebcamError] = useState<string | null>(null)
    const [scannerError, setScannerError] = useState<string | null>(null)
    const [isWebcamAvailable, setIsWebcamAvailable] = useState<boolean>(false)
    const [faceImage, setFaceImage] = useState<string>('')

    const webcamRef = useRef<Webcam>(null)

    const { uploadVisitorFaceAuthAction } = useFaceAuth()
    const { visitorDetails, verifyVisitorTokenAction, isValid, resetVisitorDetails } =
        useVisitor()

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot()
            if (imageSrc) setFaceImage(imageSrc)
        }
    }, [webcamRef])

    const retake = () => setFaceImage('')

    const uploadImage = async () => {
        if (faceImage) {
            const base64 = await getBase64FromImage(faceImage)
            const file = await convertImageToGeneralFile(base64)
            await uploadVisitorFaceAuthAction({
                visitorDetails: visitorDetails,
                faceData: file,
            } as CreateUpdateVisitorFaceAuthDto)
            setOpen(false)
        }
    }

    const checkWebcamAvailability = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (stream) setIsWebcamAvailable(true)
        } catch (error: any) {
            setWebcamError(error.message)
            setScannerError(error.message)
        }
    }

    const verifyVisitorToken = async () => {
        if (scanned) {
            await verifyVisitorTokenAction(scanned)
            if (isValid) {
                setIsVerified(true)
                setScannerError(null)
            }
        }
    }

    const onScan = (detectedCodes: IDetectedBarcode[]) => {
        const firstDetectedCode = detectedCodes[0]
        if (firstDetectedCode?.rawValue) {
            setScannedText(firstDetectedCode.rawValue)
            setScannerError(null)
        } else {
            setScannerError('Invalid QR Code')
        }
    }

    const handleError = (error: unknown, type: 'webcam' | 'scanner') => {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred'
        if (type === 'webcam') setWebcamError(errorMessage)
        if (type === 'scanner') setScannerError(errorMessage)
    }

    useEffect(() => {
        if (open) checkWebcamAvailability()
        return () => {
            if (!open) {
                setScannedText('')
                setIsVerified(false)
                setFaceImage('')
                setScannerError(null)
                resetVisitorDetails()
            }
        }
    }, [open])

    useEffect(() => {
        if (scanned) verifyVisitorToken()
    }, [scanned, isValid])

    useEffect(() => {
        if (isVerified) setWebcamError(null)
    }, [isVerified])

    const renderWebcam = () => {
        if (webcamError) {
            return (
                <div className="flex items-center justify-center w-full h-96 border-2 border-red-500">
                    <span className="text-red-500">{webcamError}</span>
                </div>
            )
        }

        if (isWebcamAvailable) {
            return (
                <Webcam
                    height={600}
                    width={600}
                    ref={webcamRef}
                    mirrored
                    screenshotFormat="image/jpeg"
                    screenshotQuality={0.3}
                    onError={(error) => handleError(error, 'webcam')}
                />
            )
        }

        return (
            <div className="flex items-center justify-center w-full h-96">
                <span className="text-gray-500">Loading Webcam...</span>
            </div>
        )
    }

    const renderScanner = () => {
        if (scannerError) {
            return (
                <div className="flex items-center justify-center w-full h-96 border-2 border-red-500">
                    <span className="text-red-500">{scannerError}</span>
                </div>
            )
        }

        if (isWebcamAvailable) {
            <Scanner
                onScan={onScan}
                onError={(error) => handleError(error, 'scanner')}
            />
        }

        return (
            <div className="flex items-center justify-center w-full h-96">
                <span className="text-gray-500">Loading Webcam...</span>
            </div>
        )
    }

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
                                    ) : (
                                        renderWebcam()
                                    )}
                                </div>
                                <div className="flex justify-center mt-5">
                                    {faceImage ? (
                                        <div className="flex w-full justify-evenly">
                                            <Button onClick={retake}>
                                                <Repeat className="mr-2 h-5 w-5" /> Retake
                                            </Button>
                                            <Button onClick={uploadImage}>
                                                <Upload className="mr-2 h-5 w-5" /> Upload
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={capture}>
                                            <Camera className="mr-2 h-5 w-5" /> Capture
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
                            {renderScanner()}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default VisitorCheckInDialog
