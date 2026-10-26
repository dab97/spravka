import { SiteData } from "@/types/documents";

interface SiteFooterProps {
  data: SiteData | null;
}

/* Компактный лёгкий футер с контактной информацией учреждения.
   Ссылки работают и до загрузки данных — есть фолбэк на официальные адреса. */
export function SiteFooter({ data }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 py-4 mt-8 sm:mt-10 mb-16 sm:mb-0 bg-transparent text-xs text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="space-y-0.5">
          <p className="font-medium text-foreground text-xs sm:text-sm">
            Филиал РГСУ в г. Минске
            <span className="hidden sm:inline font-normal text-muted-foreground text-xs"> · ул. Народная, 21</span>
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            © {new Date().getFullYear()} РГСУ · Выдача документов при предъявлении паспорта
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 text-xs">
          <a
            href={data?.site?.links?.home || "https://rgsu.by"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary dark:hover:text-rgsu-ice transition-colors py-1"
          >
            Официальный сайт
          </a>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a
            href={data?.site?.links?.schedule || "https://shedule.rgsu.by"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary dark:hover:text-rgsu-ice transition-colors py-1"
          >
            Расписание
          </a>
        </div>
      </div>
    </footer>
  );
}
