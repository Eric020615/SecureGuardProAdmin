import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@components/ui/card'
import { Button } from '@components/ui/button'
import { Camera } from 'lucide-react'
import FaceIDDialog from '@components/dialog/FaceIDDialog.tsx'

const SecurityPage = () => {
    const [openFaceIDDialog, setOpenFaceIDDialog] = useState(false)
    return (
        <>
            <FaceIDDialog open={openFaceIDDialog} setOpen={setOpenFaceIDDialog} />
            <div className="h-full">
                <div className="grid gap-5">
                    <div className="grid gap-4 my-2">
                        <Card>
                            <CardHeader className="border-b">
                                <CardTitle>Face Id</CardTitle>
                                <CardDescription>
                                    Take a photo to be uploaded as face id to access
                                    premises using a phone or web camera
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-5">
                                <Button
                                    type="button"
                                    className="w-fit h-fit"
                                    onClick={() => {
                                        setOpenFaceIDDialog(true)
                                    }}
                                >
                                    <Camera className="mr-2 h-5 w-5" />
                                    Activate Camera
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SecurityPage
