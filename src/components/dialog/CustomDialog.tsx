import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

interface CustomDialogProps {
  title?: string;
  subtitle?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isConfirm: () => void
}

const CustomDialog = ({ title, subtitle, open, setOpen, isConfirm }: CustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="flex justify-center items-center" onClick={() => {isConfirm()}}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
