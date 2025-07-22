import { NavigationItem, SocialLink } from '@/types/Navbar';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin,
  FaDiscord
} from 'react-icons/fa';

export const navigation: NavigationItem[] = [
  { 
    name: 'Home', 
    href: '/',
    description: 'Welcome to our homepage'
  },
  { 
    name: 'About', 
    href: '/about',
    description: 'Learn more about us'
  },
  {
    name: 'Services',
    href: '/services',
    description: 'Our professional services',
    submenu: [
      { name: 'Web Development', href: '/services/web' },
      { name: 'UI/UX Design', href: '/services/design' },
      { name: 'Consulting', href: '/services/consulting' },
      { name: 'Support', href: '/services/support' },
    ]
  },
  { 
    name: 'Contact', 
    href: '/contact',
    description: 'Get in touch with us'
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
  { name: 'Discord', icon: FaDiscord, href: 'https://discord.com' },
];