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

interface CustomConfirmDialogProps {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    content: {
        title: string
        subtitle: string
    }
    onConfirm?: () => void
    onCancel?: () => void
}

const CustomConfirmDialog = ({
    isOpen,
    setOpen,
    content,
    onConfirm = () => {},
    onCancel = () => {},
}: CustomConfirmDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{content.title}</DialogTitle>
                    <DialogDescription>{content.subtitle}</DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex'>
                    <Button
                        className="flex justify-center items-center"
                        onClick={() => {
                            onConfirm()
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        className="flex justify-center items-center"
                        onClick={() => {
                            onCancel()
                        }}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CustomConfirmDialog
