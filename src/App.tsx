import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteData } from "@/types/documents";
import { DocumentsSection } from "@/components/documents-section";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Home01Icon,
  AlertCircleIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";

export default function App() {
  const [data, setData] = useState<SiteData | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    setData(null);
    setError(false);
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    // При первой загрузке используется preload-ресурс, при повторной попытке — bust-параметр
    const dataUrl = reloadKey > 0 ? `/data/documents.json?t=${Date.now()}` : "/data/documents.json";
    fetch(dataUrl, { cache: "no-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: SiteData) => {
        if (!cancelled) {
          if (!Array.isArray(json?.categories) || !json?.site?.links) {
            throw new Error("Некорректный формат данных");
          }
          setData(json);
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки documents.json:", err);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* 1. Sticky Header (56px) - Тонкое матовое стекло без резкой белой полосы */}
        <header className="sticky top-0 z-40 w-full h-14 backdrop-blur-md bg-white/25 dark:bg-slate-950/30 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Логотип и название сервиса */}
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-white.svg"
                alt="Логотип РГСУ"
                className="w-8 h-8 rounded-xl shrink-0 shadow-xs"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm leading-tight text-foreground">РГСУ</span>
                <span className="text-[11px] text-muted-foreground leading-tight">Заказ документов</span>
              </div>
            </div>

            {/* Правая часть шапки: навигация и тема */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {data && (
                <div className="hidden sm:flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 active:scale-95 transition-all"
                      >
                        <a
                          href={data.site.links.home}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Официальный сайт РГСУ"
                        >
                          <HugeiconsIcon icon={Home01Icon} size={18} strokeWidth={1.5} className="transition-colors" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Официальный сайт РГСУ
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 active:scale-95 transition-all"
                      >
                        <a
                          href={data.site.links.schedule}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Расписание занятий"
                        >
                          <HugeiconsIcon icon={Calendar03Icon} size={18} strokeWidth={1.5} className="transition-colors" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Расписание занятий
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {/* Смена темы — оформлена в абсолютно идентичном стиле */}
              <ThemeSwitcher className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 active:scale-95 transition-all" />
            </div>
          </div>
        </header>

      {/* 2. Основная область (max-w-6xl mx-auto px-4 sm:px-6) */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-24 sm:pb-8">
          {/* Заголовок страницы (Hero) в стиле Apple Large Title */}
        <section className="space-y-2 sm:space-y-2.5">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] sm:text-[11px] font-semibold text-slate-700 dark:text-slate-200 uppercase leading-tight max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="truncate">Филиал РГСУ в г. Минске · Электронная подача заявок</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground !leading-tight">
            {data ? data.site.title : "Заказ справок и документов"}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {data
              ? data.site.subtitle
              : "Выберите необходимый документ и заполните онлайн-форму"}
          </p>
        </section>

        {/* 3. Каталог документов */}
        {data ? (
          <div className="space-y-8">
            {data.categories.map((category, index) => (
              <DocumentsSection key={index} id={`category-${index}`} category={category} />
            ))}
          </div>
        ) : error ? (
          /* Ошибка загрузки */
          <div className="bg-card border border-rose-200 dark:border-rose-900/60 rounded-2xl p-6 sm:p-8 text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto border border-rose-200 dark:border-rose-900">
              <HugeiconsIcon icon={AlertCircleIcon} size={22} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">Не удалось загрузить данные</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Проверьте подключение к сети или обновите страницу.
              </p>
            </div>
            <Button
              onClick={retry}
              variant="default"
              size="sm"
              className="rounded-xl gap-2 h-10 px-4"
            >
              <HugeiconsIcon icon={RefreshIcon} size={15} strokeWidth={1.5} />
              Повторить попытку
            </Button>
          </div>
        ) : (
          /* Skeleton Loader — реалистичная структура для предотвращения CLS (Layout Shift) */
          <div className="space-y-8 animate-pulse">
            {[1, 2].map((section) => (
              <div key={section} className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="w-8 h-8 rounded-xl" />
                  <Skeleton className="h-6 w-48 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between bg-card min-h-[240px]"
                    >
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-4/5 rounded-lg" />
                        <div className="space-y-2 pt-1">
                          <Skeleton className="h-3.5 w-full rounded-md" />
                          <Skeleton className="h-3.5 w-5/6 rounded-md" />
                          <Skeleton className="h-3.5 w-2/3 rounded-md" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-full rounded-xl mt-4" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 4. Компактный легкий футер с контактной информацией учреждения */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800/60 py-4 mt-8 sm:mt-10 mb-16 sm:mb-0 bg-transparent text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-0.5">
            <p className="font-medium text-foreground text-xs sm:text-sm">
              Филиал РГСУ в г. Минске
              <span className="hidden sm:inline font-normal text-muted-foreground text-xs"> · ул. Народная, 21</span>
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              © {new Date().getFullYear()} РГСУ · Выдача документов при предъявлении паспорта
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 text-xs">
            <a
              href={data?.site?.links?.home || "https://rgsu.by"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors py-1"
            >
              Официальный сайт
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href={data?.site?.links?.schedule || "https://shedule.rgsu.by"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors py-1"
            >
              Расписание
            </a>
          </div>
        </div>
      </footer>

      {/* 5. Мобильный Bottom Navigation Bar (Tab Bar) - под большой палец */}
      {data && (
        <nav
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/30 dark:bg-slate-950/40 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 pb-[env(safe-area-inset-bottom,0px)]"
          aria-label="Мобильная навигация"
        >
          <div className="grid grid-cols-2 h-14 max-w-xs mx-auto px-4">
            <a
              href={data.site.links.home}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary active:scale-95 transition-all"
            >
              <HugeiconsIcon icon={Home01Icon} size={20} strokeWidth={1.5} />
              <span className="text-[11px] font-medium leading-none">На сайт</span>
            </a>

            <a
              href={data.site.links.schedule}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary active:scale-95 transition-all"
            >
              <HugeiconsIcon icon={Calendar03Icon} size={20} strokeWidth={1.5} />
              <span className="text-[11px] font-medium leading-none">Расписание</span>
            </a>
          </div>
        </nav>
      )}
    </div>
  </TooltipProvider>
);
}
