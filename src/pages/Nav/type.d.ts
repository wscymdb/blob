export interface NavCard {
  title: string;
  subtitle: string;
  description: string;
  updateTime: string;
  data: NavItem[];
}

export interface NavItem {
  title: string;
  subtitle: string;
  description: string;
  updateTime: string;
  img: string;
  link: string;
  tags: string[];
}
