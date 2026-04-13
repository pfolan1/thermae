export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;      // human readable e.g. "February 14, 2026"
  dateISO: string;   // ISO format e.g. "2026-02-14"
  keyword: string;
  content: string;   // HTML string
}
