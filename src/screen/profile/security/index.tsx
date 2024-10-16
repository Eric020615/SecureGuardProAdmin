import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@components/ui/card'
import { Button } from '@components/ui/button'
import { Camera, Key } from 'lucide-react'
import FaceIDDialog from '@components/dialog/FaceIdDialog'
import ResetPasswordDialog from '@components/dialog/auth/ResetPasswordDialog'

const SecurityPage = () => {
    const [openFaceIDDialog, setOpenFaceIDDialog] = useState(false)
    const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false)
    return (
        <>
            <FaceIDDialog open={openFaceIDDialog} setOpen={setOpenFaceIDDialog}/>
            <ResetPasswordDialog open={openResetPasswordDialog} setOpen={setOpenResetPasswordDialog}/>
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
                        <Card>
                            <CardHeader className="border-b">
                                <CardTitle>Reset Password</CardTitle>
                                <CardDescription>
                                    You can reset your password here if needed.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-5">
                                <Button
                                    type="button"
                                    className="w-fit h-fit"
                                    onClick={() => {
                                        setOpenResetPasswordDialog(true)
                                    }}
                                >
                                    <Key className="mr-2 h-5 w-5" />
                                    Reset Password
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
