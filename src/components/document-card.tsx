import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/types/documents";
import { useState, lazy, Suspense, useEffect } from "react";

// Модалка QR-кода — отдельный чанк, монтируется только по клику на иконку
const QrDialog = lazy(() => import("./qr-dialog"));

// Предзагрузка чанков модалки: при наведении/фокусе на QR-кнопку и один раз в фоне.
// Флаг на уровне модуля — все карточки греют кэш один раз.
let qrPrefetched = false;
const prefetchQrChunks = () => {
  if (qrPrefetched) return;
  qrPrefetched = true;
  import("./qr-dialog");
  import("./styled-qr-code");
};
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
    <Card className="w-full h-full flex flex-col relative group hover:border-primary/40 hover:shadow-apple-hover transition duration-300 bg-gradient-to-br from-blue-50/80 via-card to-card dark:from-primary/10 dark:via-card dark:to-card">
      {/* QR-кнопка в потоке шапки, а не absolute — строка отдела с бейджем всегда ниже неё */}
      <CardHeader className="p-4 sm:p-5 pb-2 sm:pb-3 flex-none flex-row items-start justify-between gap-3 space-y-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="flex-1 min-w-0 text-sm sm:text-base font-semibold text-foreground !leading-snug line-clamp-3">
                {document.documentType}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <p className="text-balance leading-tight">{document.documentType}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={!isLinkAvailable}
                className={`shrink-0 bg-primary/5 hover:bg-primary/15 dark:bg-primary/15 dark:hover:bg-primary/25 dark:border-primary/30 dark:text-slate-200 dark:hover:text-rgsu-ice text-muted-foreground hover:text-primary w-9 h-9 flex items-center justify-center rounded-full border border-primary/15 transition ${
                  !isLinkAvailable
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer active:scale-95"
                }`}
                onClick={handleQrClick}
                onPointerEnter={prefetchQrChunks}
                onFocus={prefetchQrChunks}
                aria-label="Показать QR-код для заказа"
              >
                <HugeiconsIcon icon={QrCodeIcon} size={18} strokeWidth={1.5} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {isLinkAvailable ? "Показать QR-код" : "QR-код недоступен"}
            </TooltipContent>
          </Tooltip>
        </CardHeader>

        {/* Модалка QR-кода — отдельный чанк, в DOM только пока открыта */}
        {isQrModalOpen && (
          <Suspense fallback={null}>
            <QrDialog document={document} onClose={closeQrModal} />
          </Suspense>
        )}

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
              className="px-2 py-0.5 text-xs shrink-0"
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
                className="rounded-lg gap-1.5 px-2.5 py-1 text-xs font-medium"
              >
                <HugeiconsIcon icon={IdCardIcon} size={14} strokeWidth={1.5} className="shrink-0 text-destructive" />
                <span>{document.requirements}</span>
              </Badge>
            </div>
          )}
        </div>

        <div className="pt-3.5 sm:pt-4 mt-auto">
          {isLinkAvailable ? (
            <Button
              asChild
              className="w-full h-11 sm:h-10 text-xs sm:text-sm font-semibold rounded-xl gap-1.5 transition active:scale-[0.98]"
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
