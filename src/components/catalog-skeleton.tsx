import { Skeleton } from "@/components/ui/skeleton";

/* Skeleton Loader — реалистичная структура для предотвращения CLS (Layout Shift) */
export function CatalogSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2].map((section) => (
        <div key={section} className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-8 h-8 rounded-xl" />
            <Skeleton className="h-6 w-48 rounded-lg" />
          </div>
          {/* gap как в реальной сетке секций (documents-section.tsx) — без сдвига при подмене */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col justify-between bg-card min-h-[240px]"
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
  );
}
