import { Button } from "@/components/ui/button";
import { SiteData } from "@/types/documents";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, Home01Icon } from "@hugeicons/core-free-icons";

interface SiteHeaderProps {
  data: SiteData | null;
}

/* Кнопки-иконки навигации: одинаковый стиль, различаются только ссылка, иконка и подпись.
   Внешние ссылки — только нативные <a> (инвариант №2 из AGENTS.md). */
const NAV_ITEMS = [
  { hrefKey: "home", icon: Home01Icon, label: "Официальный сайт РГСУ" },
  { hrefKey: "schedule", icon: Calendar03Icon, label: "Расписание занятий" },
] as const;

export function SiteHeader({ data }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-5 pt-3 pointer-events-none">
      <div className="glass-header glass-surface pointer-events-auto max-w-6xl mx-auto h-14 rounded-full flex items-center justify-between gap-3 pl-2.5 pr-2.5 border border-white/70 dark:border-white/15 shadow-[0_1px_3px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.75)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        {/* Логотип и название сервиса: единый синий вариант для всех тем */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo-white.svg"
            alt="Логотип РГСУ"
            className="w-9 h-9 rounded-full shrink-0 shadow-xs"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm leading-tight text-foreground truncate">Филиал РГСУ в г. Минске</span>
            <span className="text-xs text-muted-foreground leading-tight truncate">Справки и документы онлайн</span>
          </div>
        </div>

        {/* Правая часть шапки: навигация и тема */}
        <div className="flex items-center gap-1">
          {data && (
            <div className="hidden sm:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Tooltip key={item.hrefKey}>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="w-9 h-9 rounded-full border-transparent dark:border-transparent text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-rgsu-ice hover:bg-primary/10 dark:hover:bg-primary/20 active:scale-95 transition"
                    >
                      <a
                        href={data.site.links[item.hrefKey]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                      >
                        <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.5} className="transition-colors" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}

          {/* Смена темы — оформлена в абсолютно идентичном стиле */}
          <ThemeSwitcher className="w-9 h-9 rounded-full border-transparent dark:border-transparent text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-rgsu-ice hover:bg-primary/10 dark:hover:bg-primary/20 active:scale-95 transition" />
        </div>
      </div>
    </header>
  );
}
