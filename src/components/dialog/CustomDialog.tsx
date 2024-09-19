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
import { useModal } from '@zustand/modal/useModal'


interface CustomDialogProps {
	customConfirmButtonPress: () => void
}

const CustomDialog = ({customConfirmButtonPress} : CustomDialogProps) => {
    const {isOpen, toogleModal, content} = useModal();
    return (
        <Dialog open={isOpen} onOpenChange={toogleModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{content.title}</DialogTitle>
                    <DialogDescription>{content.subtitle}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        className="flex justify-center items-center"
                        onClick={() => {
                            customConfirmButtonPress()
                            toogleModal()
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
