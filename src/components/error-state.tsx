import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon, RefreshIcon } from "@hugeicons/core-free-icons";

interface ErrorStateProps {
  onRetry: () => void;
}

/* Карточка ошибки загрузки данных с кнопкой повторной попытки */
export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="bg-card border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 sm:p-8 text-center space-y-4 max-w-md mx-auto my-12">
      <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto border border-rose-200 dark:border-rose-900">
        <HugeiconsIcon icon={AlertCircleIcon} size={22} strokeWidth={1.5} />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">Не удалось загрузить данные</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Проверьте подключение к сети или обновите страницу.
        </p>
      </div>
      <Button
        onClick={onRetry}
        variant="default"
        size="sm"
        className="rounded-xl gap-2 h-10 px-4"
      >
        <HugeiconsIcon icon={RefreshIcon} size={15} strokeWidth={1.5} />
        Повторить попытку
      </Button>
    </div>
  );
}
