import { DocumentCategory } from "@/types/documents";
import { DocumentCard } from "@/components/document-card";
import { Badge } from "@/components/ui/badge";

interface DocumentsSectionProps {
  category: DocumentCategory;
}

export function DocumentsSection({ category }: DocumentsSectionProps) {
  if (!category.documents || category.documents.length === 0) {
    return null;
  }

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
          {category.title}
        </h2>
        <Badge variant="outline" className="font-mono tabular-nums text-xs">
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
