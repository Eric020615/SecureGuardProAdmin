'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { useFaceAuth } from '@store/faceAuth/useFaceAuth'
import { convertImageToGeneralFile } from '@lib/file'
import SharedWebcam from '@components/camera/Webcam'

interface FaceIDDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const FaceIDDialog = ({ open, setOpen }: FaceIDDialogProps) => {
    const [faceImage, setFaceImage] = useState<string>()
    const { uploadUserFaceAuthAction } = useFaceAuth()

    const uploadImage = async () => {
        if (faceImage == null) return
        let file = await convertImageToGeneralFile(faceImage)
        await uploadUserFaceAuthAction({
            faceData: file,
        })
        setOpen(false)
    }

    const onCloseWebcam = () => {
        return
    }

    useEffect(() => {
        return () => {
            if (!open) {
                setFaceImage('')
                onCloseWebcam()
            }
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[625px] w-full">
                <DialogHeader>
                    <DialogTitle>Take Photo</DialogTitle>
                    <DialogDescription>
                        Please ensure your face is evenly lit and there is no direct
                        sunlight or harsh lighting.
                    </DialogDescription>
                </DialogHeader>
                <SharedWebcam
                    faceImage={faceImage}
                    setFaceImage={setFaceImage}
                    onUpload={uploadImage}
                    onClose={onCloseWebcam}
                />
            </DialogContent>
        </Dialog>
    )
}

export default FaceIDDialog
