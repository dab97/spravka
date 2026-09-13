export interface Document {
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
  documents: Document[];
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
