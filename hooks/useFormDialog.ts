import { useState } from "react";

export function useFormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  };

  const startSubmitting = () => setIsSubmitting(true);
  const stopSubmitting = () => setIsSubmitting(false);

  const handleSuccess = () => {
    setIsOpen(false);
    setIsSubmitting(false);
  };

  return {
    isOpen,
    isSubmitting,
    openDialog,
    closeDialog,
    startSubmitting,
    stopSubmitting,
    handleSuccess,
  };
}
