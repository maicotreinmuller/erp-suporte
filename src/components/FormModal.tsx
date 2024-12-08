import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FormModalProps {
  title: string;
  children: React.ReactElement;
  triggerText: React.ReactNode;
}

const FormModal = ({ title, children, triggerText }: FormModalProps) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const childrenWithProps = React.cloneElement(children, {
    onSubmitSuccess: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {typeof triggerText === 'string' ? <Button>{triggerText}</Button> : triggerText}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {childrenWithProps}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;