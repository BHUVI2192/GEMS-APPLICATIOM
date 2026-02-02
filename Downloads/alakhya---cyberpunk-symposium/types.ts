
export interface EventData {
  id: string;
  title: string;
  category: 'Technical' | 'Non-Technical' | 'Workshop';
  description: string;
  image: string;
  date: string;
  time: string;
  venue: string;
}

export interface NavItem {
  label: string;
  href: string;
}
