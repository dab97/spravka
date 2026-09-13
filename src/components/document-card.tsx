import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/types/documents";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building02Icon,
  Calendar03Icon,
  File01Icon,
  MapPinnedIcon,
  IdCardIcon,
  QrCodeIcon,
  LinkSquare02Icon,
} from "@hugeicons/core-free-icons";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleQrClick = () => {
    if (document.link) {
      setIsQrModalOpen(true);
    }
  };

  const closeQrModal = () => {
    setIsQrModalOpen(false);
  };

  const isLinkAvailable = Boolean(document.link);

  return (
    <Card className="w-full h-full flex flex-col relative group hover:border-blue-300 dark:hover:border-blue-700/60 hover:shadow-apple-hover transition-all duration-300 bg-gradient-to-br from-blue-50/50 via-card to-card dark:from-blue-950/25 dark:via-card dark:to-card">
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className={`absolute top-3 right-3 sm:top-3.5 sm:right-3.5 cursor-pointer bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/50 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 w-9 h-9 flex items-center justify-center rounded-full border border-slate-200/80 dark:border-slate-700/80 transition-all ${
              !isLinkAvailable
                ? "opacity-40 cursor-not-allowed pointer-events-none"
                : "active:scale-95"
            }`}
            onClick={handleQrClick}
            aria-label="Показать QR-код для заказа"
            title={isLinkAvailable ? "Показать QR-код" : "QR-код недоступен"}
          >
            <HugeiconsIcon icon={QrCodeIcon} size={18} strokeWidth={1.5} />
          </button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-96 mx-auto px-5 py-6 rounded-2xl shadow-apple-modal flex flex-col items-center">
          <DialogHeader className="text-center w-full">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-center text-foreground">
              QR-код документа
            </DialogTitle>
            <DialogDescription className="mt-2 text-xs sm:text-sm text-center leading-snug">
              {document.documentType}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center my-4 p-4 bg-white rounded-2xl border border-slate-200/80">
            <QRCodeSVG
              value={document.link || document.id.toString()}
              size={180}
              bgColor={"#ffffff"}
              fgColor={"#0f172a"}
            />
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Отсканируйте камерой смартфона для перехода к форме
          </p>
          <Button
            className="w-full mt-4 h-11 sm:h-10 text-sm rounded-xl"
            variant="outline"
            onClick={closeQrModal}
          >
            Закрыть
          </Button>
        </DialogContent>
      </Dialog>

      <CardHeader className="p-4 sm:p-5 pb-2 sm:pb-3 flex-none pr-12">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="text-sm sm:text-base font-semibold text-foreground !leading-snug line-clamp-3">
                {document.documentType}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <p className="text-balance leading-tight">{document.documentType}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-0 flex-grow flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-2.5 flex-grow py-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <HugeiconsIcon icon={Building02Icon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase truncate">
                {document.department || "Не указано"}
              </span>
            </div>
            <Badge
              variant="blue"
              className="px-2 py-0.5 font-mono tabular-nums text-xs shrink-0"
            >
              Каб. {document.room || "—"}
            </Badge>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
            <HugeiconsIcon icon={File01Icon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" />
            <p className="leading-snug line-clamp-2">{document.purpose}</p>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
            <HugeiconsIcon icon={MapPinnedIcon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" />
            <p className="leading-snug truncate">{document.destination}</p>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
            <HugeiconsIcon icon={Calendar03Icon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" />
            <p className="leading-snug">{document.issueDays}</p>
          </div>

          {document.requirements && document.requirements !== "-" && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <HugeiconsIcon icon={IdCardIcon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500" />
              <Badge variant="outline" className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 font-normal">
                {document.requirements}
              </Badge>
            </div>
          )}
        </div>

        <div className="pt-3.5 sm:pt-4 mt-auto">
          <Button
            className="w-full h-11 sm:h-10 text-xs sm:text-sm font-medium rounded-xl gap-1.5 transition-all active:scale-[0.98]"
            variant={isLinkAvailable ? "default" : "secondary"}
            disabled={!isLinkAvailable}
            onClick={() =>
              isLinkAvailable && window.open(document.link, "_blank", "noopener,noreferrer")
            }
          >
            {isLinkAvailable ? (
              <>
                Заказать онлайн
                <HugeiconsIcon icon={LinkSquare02Icon} size={16} strokeWidth={1.5} />
              </>
            ) : (
              "Заказ онлайн недоступен"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
