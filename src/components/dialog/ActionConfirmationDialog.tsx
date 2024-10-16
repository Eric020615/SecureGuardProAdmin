import React from 'react'
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

interface ActionConfirmationDialogProps {
    onSuccessConfirm?: () => void
    onFailedConfirm?: () => void
}

const ActionConfirmationDialog = ({
    onSuccessConfirm = () => {},
    onFailedConfirm = () => {},
}: ActionConfirmationDialogProps) => {
    const { isOpen, toogleModalAction, content } = useModal()
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
                            if(content.isError){
                                onFailedConfirm()
                            }
                            else{
                                onSuccessConfirm()
                            }
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

export default ActionConfirmationDialog
