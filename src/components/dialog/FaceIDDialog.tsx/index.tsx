'use client'
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import Webcam from 'react-webcam'
import { Button } from '@components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { Camera, Repeat, Upload } from 'lucide-react'

interface FaceIDDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const FaceIDDialog = ({ open, setOpen }: FaceIDDialogProps) => {
    // add reference to webcam component allow us to access webcam instance and take photo
    const webcamRef = useRef<Webcam>(null)
    const [faceImage, setFaceImage] = useState<string>()

    const capture = useCallback(() => {
        if (!webcamRef.current) return
        const imageSrc = webcamRef.current.getScreenshot()
        if (imageSrc == null) return
        setFaceImage(imageSrc)
    }, [webcamRef])

    const retake = () => {
        setFaceImage('')
    }

    const uploadImage = () => {}

    useEffect(() => {
        setFaceImage('')
    }, [open == false])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[625px] w-full">
                <DialogHeader>
                    <DialogTitle>Take Photo</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    {faceImage ? (
                        <img src={faceImage} alt="webcam" />
                    ) : (
                        <Webcam
                            height={600}
                            width={600}
                            ref={webcamRef}
                            mirrored={true}
                        />
                    )}
                </div>
                <div className="flex justify-center">
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
                        <Button type="button" className="w-fit h-fit" onClick={capture}>
                            <Camera className="mr-2 h-5 w-5" />
                            Capture
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FaceIDDialog
