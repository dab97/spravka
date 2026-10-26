import { useEffect } from "react";
import { useDocuments } from "@/hooks/useDocuments";
import { prefetchQrChunks } from "@/lib/prefetch-qr";
import { DocumentsSection } from "@/components/documents-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { ErrorState } from "@/components/error-state";
import { CatalogSkeleton } from "@/components/catalog-skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  const { data, error, retry } = useDocuments();

  // Предзагрузка чанков QR-модалки в фоне: клик по иконке открывает её мгновенно
  useEffect(() => {
    const t = window.setTimeout(prefetchQrChunks, 2500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* 1. Плавающая капсула Liquid Glass — контент прокручивается под стеклом */}
        <SiteHeader data={data} />

        {/* 2. Основная область */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-24 sm:pb-8">
          {/* Заголовок страницы (Hero): дисплейный Bebas Neue */}
          <section className="space-y-2 sm:space-y-3">
            <h1 className="font-display font-bold uppercase text-5xl sm:text-display text-foreground">
              {data ? data.site.title : "Заказ справок и документов"}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {data
                ? data.site.subtitle
                : "Выберите необходимый документ и заполните онлайн-форму"}
            </p>
          </section>

          {/* 3. Каталог документов: данные / ошибка / скелетон */}
          {data ? (
            <div className="space-y-8">
              {data.categories.map((category, index) => (
                <DocumentsSection key={category.title} id={`category-${index}`} category={category} />
              ))}
            </div>
          ) : error ? (
            <ErrorState onRetry={retry} />
          ) : (
            <CatalogSkeleton />
          )}
        </main>

        {/* 4. Футер и мобильная нижняя навигация */}
        <SiteFooter data={data} />
        {data && <MobileTabBar data={data} />}
      </div>
    </TooltipProvider>
  );
}
