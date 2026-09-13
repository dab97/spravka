import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteData } from "@/types/documents";
import { DocumentsSection } from "@/components/documents-section";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@/context/theme-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  File01Icon,
  Home01Icon,
  AlertCircleIcon,
  RefreshIcon,
  Sun03Icon,
  Moon01Icon,
} from "@hugeicons/core-free-icons";

export default function App() {
  const [data, setData] = useState<SiteData | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const retry = useCallback(() => {
    setData(null);
    setError(false);
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Параметр ?t= защищает от кэширования при правках на хостинге
    fetch(`/data/documents.json?t=${Date.now()}`, { cache: "no-cache" })
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Sticky Header (56px) - Строго совпадает по ширине с основным контейнером max-w-6xl */}
      <header className="sticky top-0 z-40 w-full h-14 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Логотип и название сервиса */}
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-white.svg"
              alt="Логотип РГСУ"
              className="w-8 h-8 rounded-xl object-cover shadow-xs shrink-0 border border-slate-200/80 dark:border-slate-800 overflow-hidden"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight text-foreground">РГСУ</span>
              <span className="text-[11px] text-muted-foreground leading-tight">Заказ документов</span>
            </div>
          </div>

          {/* Правая часть шапки: навигация и тема */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <TooltipProvider delayDuration={150}>
              {data && (
                <div className="hidden sm:flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="w-9 h-9 rounded-xl border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <a
                          href={data.site.links.home}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Официальный сайт РГСУ"
                        >
                          <HugeiconsIcon icon={Home01Icon} size={18} strokeWidth={1.5} />
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
                        className="w-9 h-9 rounded-xl border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <a
                          href={data.site.links.schedule}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Расписание занятий"
                        >
                          <HugeiconsIcon icon={Calendar03Icon} size={18} strokeWidth={1.5} />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Расписание занятий
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {/* Смена темы — оформлена в точно таком же стиле Tooltip */}
              <ThemeSwitcher className="w-9 h-9 rounded-xl border-slate-200/80 dark:border-slate-800" />
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* 2. Основная область (max-w-6xl mx-auto px-4 sm:px-6) */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-24 sm:pb-8">
        {/* Заголовок страницы (Hero) */}
        <section className="flex items-start gap-3.5 sm:gap-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-xs mt-0.5">
            <HugeiconsIcon icon={File01Icon} size={22} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {data ? data.site.title : "Заказ справок и документов"}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-snug sm:leading-relaxed">
              {data
                ? data.site.subtitle
                : "Выберите необходимый документ и заполните онлайн-форму"}
            </p>
          </div>
        </section>

        {/* 3. Каталог документов */}
        {data ? (
          <div className="space-y-8">
            {data.categories.map((category, index) => (
              <DocumentsSection key={index} category={category} />
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
              className="rounded-xl gap-2 bg-blue-600 hover:bg-blue-700 h-10 px-4"
            >
              <HugeiconsIcon icon={RefreshIcon} size={15} strokeWidth={1.5} />
              Повторить попытку
            </Button>
          </div>
        ) : (
          /* Skeleton Loader */
          <div className="space-y-6 animate-pulse">
            <div className="space-y-3">
              <Skeleton className="h-6 w-44 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 bg-card">
                    <Skeleton className="h-5 w-4/5 rounded-lg" />
                    <div className="space-y-2 pt-1">
                      <Skeleton className="h-3.5 w-full rounded-md" />
                      <Skeleton className="h-3.5 w-5/6 rounded-md" />
                      <Skeleton className="h-3.5 w-2/3 rounded-md" />
                    </div>
                    <Skeleton className="h-11 sm:h-10 w-full rounded-xl mt-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Футер с контактной информацией учреждения (NAP-консистентность) */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-8 mt-12 mb-16 sm:mb-0 bg-white/50 dark:bg-slate-950/50 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 text-xs">
            <div className="space-y-1">
              <p className="font-semibold text-foreground text-sm">
                Филиал РГСУ в г. Минске
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                220107, Республика Беларусь, г. Минск, ул. Народная, 21 (ст. м. «Партизанская»)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <a
                href="tel:+375173788389"
                className="inline-flex items-center min-h-[36px] py-1.5 px-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 font-mono transition-colors"
              >
                +375 (17) 378-83-89
              </a>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
              <a
                href={data?.site?.links?.home || "https://rgsu.by"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[36px] py-1.5 px-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Официальный сайт
              </a>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
              <a
                href={data?.site?.links?.schedule || "https://shedule.rgsu.by"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[36px] py-1.5 px-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Расписание занятий
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Российский государственный социальный университет. Все права защищены.</p>
            <p>Выдача документов производится при предъявлении паспорта</p>
          </div>
        </div>
      </footer>

      {/* 5. Мобильный Bottom Navigation Bar (Tab Bar) - под большой палец */}
      {data && (
        <nav
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 pb-[env(safe-area-inset-bottom,0px)]"
          aria-label="Мобильная навигация"
        >
          <div className="grid grid-cols-2 h-14 max-w-xs mx-auto px-4">
            <a
              href={data.site.links.home}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all"
            >
              <HugeiconsIcon icon={Home01Icon} size={20} strokeWidth={1.5} />
              <span className="text-[11px] font-medium leading-none">На сайт</span>
            </a>

            <a
              href={data.site.links.schedule}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all"
            >
              <HugeiconsIcon icon={Calendar03Icon} size={20} strokeWidth={1.5} />
              <span className="text-[11px] font-medium leading-none">Расписание</span>
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
