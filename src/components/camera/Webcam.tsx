import { Button } from '@components/ui/button'
import { Camera, Repeat, Upload, RefreshCcw } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

interface SharedWebcamProps {
    faceImage: string | undefined
    setFaceImage: (image: string | undefined) => void
    onUpload: () => void
    screenshotQuality?: number // Allow customization of quality if needed
    height?: number
    width?: number
    onClose?: () => void // Optional: Trigger when closes
}

const SharedWebcam: React.FC<SharedWebcamProps> = ({
    faceImage,
    setFaceImage,
    onUpload,
    screenshotQuality = 1.0,
    height = 600,
    width = 600,
    onClose = () => {},
}) => {
    const webcamRef = useRef<Webcam>(null)
    const [webcamError, setWebcamError] = useState<string | null>(null)
    const [isWebcamAvailable, setIsWebcamAvailable] = useState<boolean>(false)
    const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true) // State for camera type
    const mediaStreamRef = useRef<MediaStream | null>(null)

    const capture = useCallback(() => {
        if (!webcamRef.current) return
        const imageSrc = webcamRef.current.getScreenshot()
        if (!imageSrc) return
        setFaceImage(imageSrc)
    }, [webcamRef])

    const retake = () => {
        setFaceImage('')
    }

    const checkWebcamAvailability = async () => {
        try {
            const constraints = {
                video: {
                    facingMode: isFrontCamera ? 'user' : 'environment', // Toggle front/back camera
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            }
            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            mediaStreamRef.current = stream
            setIsWebcamAvailable(true)
        } catch (error: any) {
            setWebcamError(error.message)
        }
    }

    const toggleCamera = () => {
        setIsFrontCamera((prev) => !prev)
    }

    const stopWebcam = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop())
            mediaStreamRef.current = null
        }
    }

    useEffect(() => {
        setFaceImage('')
        setWebcamError(null)
        checkWebcamAvailability()

        // Cleanup on unmount
        return () => {
            stopWebcam()
        }
    }, [isFrontCamera]) // Recheck availability when toggling camera

    const handleError = (error: unknown) => {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred'
        setWebcamError(errorMessage)
    }

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
                    key={isFrontCamera ? 'front' : 'back'} // Force reinitialization
                    height={height}
                    width={width}
                    ref={webcamRef}
                    mirrored={isFrontCamera} // Mirror only for front camera
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        facingMode: isFrontCamera ? 'user' : 'environment',
                    }}
                    onError={(error) => handleError(error)}
                />
            )
        }

        return (
            <div className="flex items-center justify-center w-full h-96">
                <span className="text-gray-500">Loading Webcam...</span>
            </div>
        )
    }

    return (
        <div className="w-full max-h-fit">
            <div className="relative w-full max-w-screen-sm h-auto mx-auto max-h-96 overflow-hidden rounded-md">
                {faceImage ? <img src={faceImage} alt="Captured" /> : renderWebcam()}
            </div>
            <div className="flex justify-center gap-4 mt-5">
                {faceImage ? (
                    <div className="flex w-full justify-evenly">
                        <Button onClick={retake}>
                            <Repeat className="mr-2 h-5 w-5" /> Retake
                        </Button>
                        <Button onClick={onUpload}>
                            <Upload className="mr-2 h-5 w-5" /> Upload
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button onClick={capture}>
                            <Camera className="mr-2 h-5 w-5" /> Capture
                        </Button>
                        <Button onClick={toggleCamera}>
                            <RefreshCcw className="mr-2 h-5 w-5" /> Switch Camera
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default SharedWebcam
