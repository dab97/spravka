import { SiteData } from "@/types/documents";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, Home01Icon } from "@hugeicons/core-free-icons";

/* Пункты нижней навигации: единый стиль, различаются ссылка, иконка и подпись.
   Внешние ссылки — только нативные <a> (инвариант №2 из AGENTS.md). */
const TAB_ITEMS = [
  { hrefKey: "home", icon: Home01Icon, label: "На сайт" },
  { hrefKey: "schedule", icon: Calendar03Icon, label: "Расписание" },
] as const;

export function MobileTabBar({ data }: { data: SiteData }) {
  return (
    <nav
      className="glass-surface sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/60 dark:border-slate-800/60 pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Мобильная навигация"
    >
      <div className="grid grid-cols-2 h-14 max-w-xs mx-auto px-4">
        {TAB_ITEMS.map((item) => (
          <a
            key={item.hrefKey}
            href={data.site.links[item.hrefKey]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-rgsu-ice active:scale-95 transition"
          >
            <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.5} />
            <span className="text-xs font-medium leading-none">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
