import { DocumentCategory } from "@/types/documents";
import { DocumentCard } from "@/components/document-card";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  IdCardIcon,
  Mortarboard02Icon,
  Invoice01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";

export function getCategoryIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("пропуск")) return IdCardIcon;
  if (lower.includes("обучен")) return Mortarboard02Icon;
  if (lower.includes("оплат")) return Invoice01Icon;
  return File01Icon;
}

interface DocumentsSectionProps {
  category: DocumentCategory;
  id?: string;
}

export function DocumentsSection({ category, id }: DocumentsSectionProps) {
  if (!category.documents || category.documents.length === 0) {
    return null;
  }

  const CategoryIcon = getCategoryIcon(category.title);

  return (
    <section id={id} className="w-full space-y-4 scroll-mt-20 sm:scroll-mt-24">
      <div className="sticky top-14 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 flex items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 py-2.5 sm:py-3 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 dark:bg-primary/20 shadow-xs">
            <HugeiconsIcon icon={CategoryIcon} size={18} strokeWidth={1.5} />
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-foreground truncate">
            {category.title}
          </h2>
        </div>
        <Badge variant="blue" className="font-mono tabular-nums text-xs shrink-0">
          {category.documents.length}
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.documents.map((document) => (
          <div key={document.id} className="flex">
            <DocumentCard document={document} />
          </div>
        ))}
      </div>
    </section>
  );
}
