export interface ResolutionCardProps {
  id: string;
  tag: string;
  code: string;
  category: string;
  title: string;
  date: string;
  description: string;
  onClick: () => void;
}

export interface RevolutionRow {
  id: string;
  tag: string;
  code: string;
  category: string;
  title: string;
  date: string;
  description: string;
  content: string; // HTML
}