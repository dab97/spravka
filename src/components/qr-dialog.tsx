import { Button } from "@/components/ui/button";
import { Document } from "@/types/documents";
import { lazy, Suspense } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Отдельный чанк: код модалки и рендер QR грузятся только при открытии диалога
const StyledQrCode = lazy(() =>
  import("./styled-qr-code").then((mod) => ({ default: mod.StyledQrCode }))
);

interface QrDialogProps {
  document: Document;
  onClose: () => void;
}

// Модалка QR-кода. Монтируется только при открытом состоянии —Radix-анимации срабатывают на mount.
export default function QrDialog({ document: doc, onClose }: QrDialogProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-96 mx-auto px-5 py-6 rounded-3xl shadow-apple-modal flex flex-col items-center">
        <DialogHeader className="text-center w-full">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-center text-foreground">
            QR-код документа
          </DialogTitle>
          <DialogDescription className="mt-2 text-xs sm:text-sm text-center leading-snug">
            {doc.documentType}
          </DialogDescription>
        </DialogHeader>
        <div className="w-[216px] h-[216px] flex items-center justify-center my-4 bg-white rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex-none">
          <Suspense
            fallback={
              <div className="w-[184px] h-[184px] rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-400 font-mono">
                Загрузка...
              </div>
            }
          >
            <StyledQrCode value={doc.link || doc.id.toString()} size={184} />
          </Suspense>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Отсканируйте камерой смартфона для перехода к форме
        </p>
          <Button
            className="w-full mt-4 h-11 sm:h-10 text-sm rounded-xl"
            variant="default"
            onClick={onClose}
          >
            Закрыть
          </Button>
      </DialogContent>
    </Dialog>
  );
}
