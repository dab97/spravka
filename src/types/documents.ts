/* DocumentInfo, а не Document: не затеняем глобальный DOM-тип Document */
export interface DocumentInfo {
  id: number;
  department: string;
  documentType: string;
  room: string;
  purpose: string;
  destination: string;
  issueDays: string;
  requirements: string;
  link: string;
}

export interface DocumentCategory {
  title: string;
  documents: DocumentInfo[];
}

export interface SiteLinks {
  home: string;
  schedule: string;
}

export interface SiteInfo {
  title: string;
  subtitle: string;
  links: SiteLinks;
}

export interface SiteData {
  site: SiteInfo;
  categories: DocumentCategory[];
}
