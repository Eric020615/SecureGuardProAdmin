import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { convertImageToGeneralFile } from '@libs/file'
import { useCard } from '@store/card/useCard'
import { useVisitor } from '@store/visitor/useVisitor'
import { DialogDescription } from '@radix-ui/react-dialog'
import { CreateUpdateVisitorFaceAuthDto } from '@dtos/card/card.dto'
import SharedWebcam from '@components/camera/Webcam'
import SharedScanner from '@components/camera/Scanner'
import { convertDateStringToFormattedString } from '@libs/time'
import { ITimeFormat } from '@config/constant'

interface VisitorCheckInDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const VisitorCheckInDialog = ({ open, setOpen }: VisitorCheckInDialogProps) => {
    const [scanned, setScannedText] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [faceImage, setFaceImage] = useState<string | undefined>('')

    const { uploadVisitorFaceAuthAction } = useCard()
    const { visitorDetails, verifyVisitorTokenAction, isValid, resetVisitorDetails } =
        useVisitor()

    const uploadImage = async () => {
        if (faceImage) {
            const file = await convertImageToGeneralFile(faceImage)
            await uploadVisitorFaceAuthAction({
                visitorDetails: visitorDetails,
                faceData: file,
            } as CreateUpdateVisitorFaceAuthDto)
            setOpen(false)
        }
    }

    const verifyVisitorToken = async () => {
        if (scanned) {
            await verifyVisitorTokenAction(scanned)
            if (isValid) {
                setIsVerified(true)
            }
        }
    }

    const closeScanner = () => {
        return
    }

    useEffect(() => {
        return () => {
            if (!open) {
                setScannedText('')
                setIsVerified(false)
                setFaceImage('')
                resetVisitorDetails()
                closeScanner()
            }
        }
    }, [open])

    useEffect(() => {
        if (scanned) verifyVisitorToken()
    }, [scanned, isValid])

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
                            <p>
                                Visit Date/Time: {convertDateStringToFormattedString(
                                    visitorDetails.visitDateTime,
                                    ITimeFormat.dateTime
                                )}
                            </p>
                            <div className="mt-4">
                                <h2>Face ID Registration</h2>
                                <div className="mt-2">
                                    <SharedWebcam
                                        faceImage={faceImage}
                                        setFaceImage={setFaceImage}
                                        onUpload={uploadImage}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading visitor details...</p>
                    )
                ) : (
                    <div>
                        <div className="flex items-center justify-center mb-2">
                            <SharedScanner
                                scannedText={scanned}
                                setScannedText={setScannedText}
                                onClose={closeScanner}
                            />
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default VisitorCheckInDialog
