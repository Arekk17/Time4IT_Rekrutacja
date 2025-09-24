"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteOrder, ApiError } from "@/lib/api/orders";
import { Loader2, Trash2 } from "lucide-react";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";

interface DeleteOrderDialogProps {
  orderId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteOrderDialog({
  orderId,
  onClose,
  onSuccess,
}: DeleteOrderDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!orderId) return;

    setIsDeleting(true);
    setError(null);

    try {
      await deleteOrder(orderId);
      onSuccess();
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Wystąpił błąd podczas usuwania zamówienia");
      } else {
        setError("Wystąpił nieoczekiwany błąd");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={!!orderId} onOpenChange={handleClose}>
      <DialogContent className="w-[400px] max-w-[400px] h-auto p-0 rounded-2xl overflow-hidden shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_3px_3px_-1.5px_rgba(10,13,18,0.04)]">
        <DialogHeader className="relative items-start px-6 pt-6 pb-0 gap-4 overflow-visible isolate">
          <BackgroundDecor className="absolute -left-30 -top-30 w-[336px] h-[336px] z-0 pointer-events-none select-none" />

          <div className="relative z-[1] w-12 h-12 bg-[#FEE4E2] border-8 border-[#FEF3F2] rounded-[28px] flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-[#D92D20]" />
          </div>

          <div className="relative z-[1] flex flex-col items-start gap-0.5 w-full">
            <DialogTitle className="text-[#181D27] text-base leading-6 font-semibold">
              Usuń zamówienie
            </DialogTitle>
            <p className="text-[#535862] text-sm leading-5 font-normal">
              Czy na pewno chcesz usunąć to zamówienie? Ta akcja jest
              nieodwracalna.
            </p>
          </div>
        </DialogHeader>

        {error && (
          <div className="mx-6 bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex flex-col pt-8 pb-0">
          <div className="flex flex-row items-start px-6 pb-6 gap-3">
            <Button
              variant="outline"
              className="flex-1 h-11 px-4 py-2.5 bg-white border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_rgba(10,13,18,0.05)] rounded-lg"
              onClick={handleClose}
              disabled={isDeleting}
            >
              <span className="text-[#414651] text-base leading-6 font-semibold">
                Anuluj
              </span>
            </Button>

            <Button
              className="flex-1 h-11 px-4 py-2.5 bg-[#D92D20] hover:bg-[#B91C1C] shadow-[0px_1px_2px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_rgba(10,13,18,0.05)] rounded-lg flex items-center justify-center gap-1.5"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span className="text-white text-base leading-6 font-semibold">
                    Usuwanie...
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white text-base leading-6 font-semibold">
                    Usuń
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
