
import { EventData, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'System.Home', href: '#home' },
  { label: 'Event.Data', href: '#events' },
  { label: 'Core.About', href: '#about' },
  { label: 'Society.404', href: '#society' },
  { label: 'User.Register', href: '#register' },
];

export const EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Code Breach',
    category: 'Technical',
    description: 'A 6-hour hackathon where speed meets precision. Crack the firewall and build the future.',
    image: 'https://picsum.photos/seed/code/800/600',
    date: 'Oct 24, 2024',
    time: '09:00 AM',
    venue: 'Lab Alpha-9',
  },
  {
    id: '2',
    title: 'Neural Nexus',
    category: 'Technical',
    description: 'An AI-focused presentation challenge. Show the world how neural networks will reshape reality.',
    image: 'https://picsum.photos/seed/ai/800/600',
    date: 'Oct 24, 2024',
    time: '11:30 AM',
    venue: 'Auditorium V',
  },
  {
    id: '3',
    title: 'Circuit Surge',
    category: 'Technical',
    description: 'Hardware debugging and circuit design. Can you handle the voltage without blowing the fuse?',
    image: 'https://picsum.photos/seed/circuit/800/600',
    date: 'Oct 25, 2024',
    time: '10:00 AM',
    venue: 'VLSI Center',
  },
  {
    id: '4',
    title: 'Pixel Perfect',
    category: 'Non-Technical',
    description: 'Digital art and design competition. Create the visual language of the cyberpunk era.',
    image: 'https://picsum.photos/seed/art/800/600',
    date: 'Oct 25, 2024',
    time: '02:00 PM',
    venue: 'Design Studio',
  },
  {
    id: '5',
    title: 'E-Sports Arena',
    category: 'Non-Technical',
    description: 'Valorant and CS2 tournaments. Prove your skills in the digital battlefield.',
    image: 'https://picsum.photos/seed/gaming/800/600',
    date: 'Oct 24-25, 2024',
    time: 'All Day',
    venue: 'Arena Zero',
  },
  {
    id: '6',
    title: 'Robo Wars',
    category: 'Technical',
    description: 'Witness the clash of titanium. Only one bot will emerge as the supreme machine.',
    image: 'https://picsum.photos/seed/robot/800/600',
    date: 'Oct 25, 2024',
    time: '03:00 PM',
    venue: 'Central Courtyard',
  }
];
