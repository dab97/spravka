import { DocumentCategory } from "@/types/documents";
import { DocumentCard } from "@/components/document-card";
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
    <section id={id} className="w-full space-y-4 scroll-mt-32">
      {/* Плавающая стеклянная капсула секции — в стиле Liquid Glass, как хедер */}
      <div className="section-glass sticky top-[76px] z-30 w-fit max-w-full h-11 flex items-center gap-2 rounded-full px-2 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl backdrop-saturate-150 border border-white/70 dark:border-white/15 shadow-[0_1px_3px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.75)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
          <HugeiconsIcon icon={CategoryIcon} size={15} strokeWidth={1.5} />
        </div>
        <h2 className="min-w-0 text-sm sm:text-base font-semibold tracking-tight text-foreground truncate">
          {category.title}
        </h2>
        <span
          className="w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-xs"
          aria-label={`${category.documents.length} документов в категории`}
        >
          {category.documents.length}
        </span>
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
