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
    const [isVerified, setIsVerified] = useState(false) // State to track if the token is verified
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
        setFaceImage('')
    }, [open == false])

    // Reset scanned text when dialog is closed
    useEffect(() => {
        if (!open) {
            setScannedText('')
            resetVisitorDetails()
        }
    }, [open])

    useEffect(() => {
        const verifyVisitorToken = async () => {
            if (scanned) {
                await verifyVisitorTokenAction(scanned)
                if (isValid) {
                    setIsVerified(true) // Set as verified
                }
            }
        }
        verifyVisitorToken()
    }, [scanned])

    const onScan = (detectedCodes: IDetectedBarcode[]) => {
        if (detectedCodes && detectedCodes.length > 0) {
            const firstDetectedCode = detectedCodes[0]
            if (firstDetectedCode.rawValue) {
                setScannedText(firstDetectedCode.rawValue) // Store the rawValue of the scanned QR code
            } else {
                setScannedText('Invalid QR Code') // Handle case if rawValue is not found
            }
        } else {
            setScannedText('No QR Code detected') // Handle case where no QR code was detected
        }
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
                                        <Webcam
                                            height={600}
                                            width={600}
                                            ref={webcamRef}
                                            mirrored={true}
                                            screenshotFormat="image/jpeg"
                                            screenshotQuality={0.3}
                                        />
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
                                                type="submit"
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
                            <Scanner onScan={onScan} />
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default VisitorCheckInDialog
