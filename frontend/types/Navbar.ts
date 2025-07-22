export interface NavigationItem {
  name: string;
  href: string;
  description: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}