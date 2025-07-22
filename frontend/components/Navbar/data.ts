import { NavigationItem, SocialLink } from '@/types/Navbar';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin,
  FaDiscord
} from 'react-icons/fa';

export const navigation: NavigationItem[] = [
  { 
    name: 'Features', 
    href: '/features',
    description: 'Key features of our platform'
  },
  { 
    name: 'Security', 
    href: '/security',
    description: 'How we protect your data'
  },
  { 
    name: 'Pricing', 
    href: '/pricing',
    description: 'Choose the plan that suits you'
  },
  { 
    name: 'Support', 
    href: '/Support',
    description: 'Need help? Start here'
  },
  // {
  //   name: 'Services',
  //   href: '/services',
  //   description: 'Our professional services',
  //   submenu: [
  //     { name: 'Web Development', href: '/services/web' },
  //     { name: 'UI/UX Design', href: '/services/design' },
  //     { name: 'Consulting', href: '/services/consulting' },
  //     { name: 'Support', href: '/services/support' },
  //   ]
  // },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
  { name: 'Discord', icon: FaDiscord, href: 'https://discord.com' },
];