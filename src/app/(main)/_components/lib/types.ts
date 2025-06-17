export interface PolicySection {
    id: string;
    title: string;
    content: string;
    articles?: string[];
  }
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