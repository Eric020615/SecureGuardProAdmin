import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '@components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { useModal } from '@store/modal/useModal'

interface CustomDialogProps {
	customConfirmButtonPress?: () => void
}

const CustomDialog = ({customConfirmButtonPress} : CustomDialogProps) => {
    const {isOpen, toogleModalAction, content} = useModal();
    return (
        <Dialog open={isOpen} onOpenChange={toogleModalAction}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{content.title}</DialogTitle>
                    <DialogDescription>{content.subtitle}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        className="flex justify-center items-center"
                        onClick={() => {
                            customConfirmButtonPress?.()
                            toogleModalAction()
                        }}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
