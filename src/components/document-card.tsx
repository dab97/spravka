import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/types/documents";
import { useState, lazy, Suspense } from "react";

const StyledQrCode = lazy(() =>
  import("./styled-qr-code").then((mod) => ({ default: mod.StyledQrCode }))
);
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
  Location01Icon,
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
    <Card className="w-full h-full flex flex-col relative group hover:border-[#0180ff]/50 dark:hover:border-sky-400/50 hover:shadow-apple-hover transition-all duration-300 bg-gradient-to-br from-blue-50/80 via-card to-card dark:from-[#0180ff]/10 dark:via-card dark:to-card">
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button
                type="button"
                className={`absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 bg-[#0180ff]/5 hover:bg-[#0180ff]/15 dark:bg-slate-800/80 dark:hover:bg-[#0180ff]/20 text-slate-500 hover:text-[#0180ff] dark:text-slate-300 dark:hover:text-sky-300 w-9 h-9 flex items-center justify-center rounded-full border border-[#0180ff]/15 dark:border-slate-700/80 transition-all ${
                  !isLinkAvailable
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer active:scale-95"
                }`}
                onClick={handleQrClick}
                aria-label="Показать QR-код для заказа"
              >
                <HugeiconsIcon icon={QrCodeIcon} size={18} strokeWidth={1.5} />
              </button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            {isLinkAvailable ? "Показать QR-код" : "QR-код недоступен"}
          </TooltipContent>
        </Tooltip>
        <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-96 mx-auto px-5 py-6 rounded-2xl shadow-apple-modal flex flex-col items-center">
          <DialogHeader className="text-center w-full">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-center text-foreground">
              QR-код документа
            </DialogTitle>
            <DialogDescription className="mt-2 text-xs sm:text-sm text-center leading-snug">
              {document.documentType}
            </DialogDescription>
          </DialogHeader>
          <div className="w-[216px] h-[216px] flex items-center justify-center my-4 bg-white rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex-none">
            <Suspense
              fallback={
                <div className="w-[184px] h-[184px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-400 font-mono">
                  Загрузка...
                </div>
              }
            >
              <StyledQrCode
                value={document.link || document.id.toString()}
                size={184}
              />
            </Suspense>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Отсканируйте камерой смартфона для перехода к форме
          </p>
          <Button
            className="w-full mt-4 h-11 sm:h-10 text-sm rounded-xl border-[#0180ff]/30 text-[#006bd8] hover:bg-[#0180ff]/10 hover:text-[#006bd8] dark:text-sky-300 dark:border-sky-800/60 dark:hover:bg-[#0180ff]/20"
            variant="outline"
            onClick={closeQrModal}
          >
            Закрыть
          </Button>
        </DialogContent>
      </Dialog>

      <CardHeader className="p-4 sm:p-5 pb-2 sm:pb-3 flex-none pr-14 sm:pr-16">
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

          <div
            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
            title={document.purpose && document.purpose !== "-" ? document.purpose : undefined}
          >
            <HugeiconsIcon icon={File01Icon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500 mt-[1px]" />
            <p className="leading-snug line-clamp-2">{document.purpose}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500" />
            <p className="leading-snug truncate">{document.destination}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <HugeiconsIcon icon={Calendar03Icon} size={16} strokeWidth={1.5} className="shrink-0 text-slate-400 dark:text-slate-500" />
            <p className="leading-snug">{document.issueDays}</p>
          </div>

          {document.requirements && document.requirements !== "-" && (
            <div className="pt-0.5">
              <Badge
                variant="ruby"
                className="rounded-lg gap-1.5 px-2.5 py-1 text-xs font-normal"
              >
                <HugeiconsIcon icon={IdCardIcon} size={14} strokeWidth={1.5} className="shrink-0 text-[#A91917] dark:text-rose-300" />
                <span>{document.requirements}</span>
              </Badge>
            </div>
          )}
        </div>

        <div className="pt-3.5 sm:pt-4 mt-auto">
          {isLinkAvailable ? (
            <Button
              asChild
              className="w-full h-11 sm:h-10 text-xs sm:text-sm font-semibold rounded-xl gap-1.5 transition-all active:scale-[0.98]"
              variant="default"
            >
              <a
                href={document.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Заказать онлайн
                <HugeiconsIcon icon={LinkSquare02Icon} size={16} strokeWidth={1.5} />
              </a>
            </Button>
          ) : (
            <Button
              className="w-full h-11 sm:h-10 text-xs sm:text-sm font-medium rounded-xl gap-1.5"
              variant="secondary"
              disabled
            >
              Заказ онлайн недоступен
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
