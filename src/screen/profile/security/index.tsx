import React, { useEffect, useState } from 'react'
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
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { useCard } from '@store/card/useCard'

const SecurityPage = () => {
    const [openFaceIDDialog, setOpenFaceIDDialog] = useState(false)
    const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false)
    const [hasBadge, setHasBadge] = useState(false)
    const { card, getCardAction, createCardAction } = useCard()

    useEffect(() => {
        getCardAction() // Fetch the user card details
    }, [])

    useEffect(() => {
        if (card.badgeNumber) {
            setHasBadge(true) // Set the badge presence state
        }
    }, [card])
    const createCard = async () => {
        await createCardAction()
        await getCardAction() // Re-fetch the card after creation
    }
    return (
        <>
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    setOpenFaceIDDialog(false)
                }}
                onFailedConfirm={() => {
                    setOpenFaceIDDialog(false)
                }}
            />
            <FaceIDDialog open={openFaceIDDialog} setOpen={setOpenFaceIDDialog} />
            <ResetPasswordDialog
                open={openResetPasswordDialog}
                setOpen={setOpenResetPasswordDialog}
            />
            <div className="h-full">
                <div className="grid gap-5">
                    <div className="grid gap-4 my-2">
                        <Card>
                            <CardHeader className="border-b">
                                <CardTitle>Card Information</CardTitle>
                                <CardDescription>
                                    Manage your card to access the system features.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-5">
                                {hasBadge ? (
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-700">
                                            <strong>Badge Number:</strong>{' '}
                                            {card.badgeNumber}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Cardholder Name:</strong>{' '}
                                            {card.cardHolder || 'N/A'}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            No card found. Please create a card to access
                                            the features.
                                        </p>
                                        <Button
                                            type="button"
                                            className="bg-primary w-fit h-fit"
                                            onClick={async () => {
                                                await createCard()
                                            }}
                                        >
                                            Create Card
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
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
                                        if (hasBadge) {
                                            setOpenFaceIDDialog(true)
                                        }
                                    }}
                                    disabled={!hasBadge}
                                >
                                    <Camera className="mr-2 h-5 w-5" />
                                    Activate Camera
                                </Button>
                                {!hasBadge && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        You need to create a card first to enable Face ID.
                                    </p>
                                )}
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
