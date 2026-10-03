// All the words on the site live here, so you can edit content without touching the layout.
import type { IconKey } from './icons';

export const site = {
  name: 'Mudasser Hussain',
  first: 'Mudasser',
  last: 'Hussain',
  title: 'Mudasser Hussain · Senior Full-Stack Developer',
  description:
    'Senior Full-Stack Developer in Lahore becoming a Solutions Architect. Six years designing and scaling Laravel, Vue and React platforms on AWS and Azure DevOps.',
  email: 'mudasserh56@gmail.com',
  linkedin: 'https://linkedin.com/in/mahr-mudasser-313997125',
  location: 'Lahore, Pakistan',
  timezone: 'Asia/Karachi',
  // Put your CV at public/cv/Mudasser-Hussain-CV.pdf
  cv: '/cv/Mudasser-Hussain-CV.pdf',
  // Optional: a Cal.com or Calendly link for "Book an architecture call". Leave empty to use the contact section.
  bookingUrl: '',
};

export const nav = [
  { label: 'Trajectory', href: '/#trajectory' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Writing', href: '/#writing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export const hero = {
  roles: ['Senior Full-Stack Developer', 'Laravel & Vue specialist', 'Team lead and mentor', 'Future Solutions Architect'],
  intro:
    'Six years designing and scaling enterprise platforms in Laravel, Vue, React and Next.js, on AWS and Azure DevOps. Clean architecture, solid data models and APIs that hold up in production.',
  stack: ['laravel', 'vue', 'react', 'next', 'node', 'mysql', 'postgres', 'ts'] as IconKey[],
};

export const about = {
  text: "I've moved from writing code to leading the teams that write it. Now I design the systems behind them.",
  tags: ['Laravel', 'System design', 'Team lead', 'AI-assisted'],
};

export const dockStack: IconKey[] = ['laravel', 'vue', 'react', 'next', 'node', 'ts', 'php', 'mysql', 'postgres', 'mongo', 'fastapi', 'git'];

export interface Step {
  years: string;
  short: string;
  role: string;
  company: string;
  where: string;
  scope: string;
  height: number;
  alpha: number;
  points: string[];
  stack: IconKey[];
  now?: boolean;
  next?: boolean;
}

// Index 4 is the current role; the last one is the "next" step.
export const trajectory: Step[] = [
  {
    years: '2020', short: 'Management Trainee', role: 'Management Trainee', company: 'My Technology', where: 'My Technology · Lahore',
    scope: 'Learning', height: 64, alpha: 0.12,
    points: ['Selected for the Management Trainee Officer programme', 'Promoted to Laravel Developer within months for strong technical work'],
    stack: ['laravel', 'mysql'],
  },
  {
    years: '2020', short: 'Laravel Developer', role: 'Laravel Developer', company: 'My Technology', where: 'My Technology · Lahore',
    scope: 'Code', height: 104, alpha: 0.18,
    points: ['Shipped small-to-medium full-stack web apps for clients', 'Built business logic, custom modules and schemas in Laravel and MySQL', 'Worked with senior engineers and designers to unblock frontend work'],
    stack: ['laravel', 'php', 'mysql'],
  },
  {
    years: '2021–23', short: 'Dev & Team Lead', role: 'Laravel Developer & Team Lead', company: 'YumyApps', where: 'YumyApps · Lahore',
    scope: 'Teams', height: 156, alpha: 0.25,
    points: ['Rebuilt a legacy product on a new Laravel architecture', 'Led the dev team: sprint tasks, code reviews and quality standards', 'Designed MySQL schemas tuned with indexing for speed'],
    stack: ['laravel', 'mysql', 'git'],
  },
  {
    years: '2023–25', short: 'Senior Dev / Lead', role: 'Senior Software Developer / Team Lead', company: 'ISKAAN', where: 'ISKAAN · Lahore, plus remote for Fastnet, Jeddah',
    scope: 'Teams + architecture', height: 212, alpha: 0.33,
    points: ['Led and mentored the backend team from planning to deployment', 'Designed the backend architecture in Laravel and MySQL', 'Ran AWS in production and Azure DevOps for staging'],
    stack: ['laravel', 'mysql', 'aws', 'azure'],
  },
  {
    years: '2025–now', short: 'Senior Full Stack', role: 'Senior Full Stack Developer', company: 'Avid Collective', where: 'Avid Collective · Lahore',
    scope: 'Product + systems', height: 272, alpha: 0.44, now: true,
    points: ['Ship full-stack features end to end in Laravel and Vue', 'Track down legacy bottlenecks with AI-assisted debugging', 'Help the team adopt Claude and Cursor in daily work'],
    stack: ['laravel', 'vue', 'mysql'],
  },
  {
    years: 'Next', short: 'Solutions Architect', role: 'Solutions Architect', company: 'Your team?', where: 'Open to the right team',
    scope: 'Systems', height: 338, alpha: 0.2, next: true,
    points: ['Designing systems, not just features', 'Owning architecture decisions across teams and services', 'Bringing six years of shipping to the whiteboard'],
    stack: ['aws', 'postgres', 'next'],
  },
];

export interface Testimonial {
  who: string;
  quote: string;
  name: string;
  role: string;
  initials?: string;
  placeholder?: boolean;
}

// Up to six, shown three at a time. Replace with real quotes and set placeholder: false.
export const testimonials: Testimonial[] = [
  { who: 'Client or founder', quote: 'One or two sentences from a founder or client about the result you delivered, in their own words.', name: 'Client name', role: 'Role · Company', placeholder: true },
  { who: 'Manager or lead', quote: 'A manager or tech lead on how you lead the team and ship under pressure.', name: 'Manager name', role: 'Role · Company', placeholder: true },
  { who: 'Teammate', quote: 'Someone you built with, on what working with you is like day to day.', name: 'Teammate name', role: 'Role · Company', placeholder: true },
  { who: 'Remote client', quote: 'A remote client on communication across time zones and delivering on time.', name: 'Client name', role: 'Role · Company', placeholder: true },
  { who: 'Product owner', quote: 'A product owner on turning loose requirements into clear specs.', name: 'Product owner name', role: 'Role · Company', placeholder: true },
  { who: 'Mentee', quote: 'A developer you mentored, on how they grew through your code reviews.', name: 'Developer name', role: 'Role · Company', placeholder: true },
];

export const faq = [
  { q: 'Are you available right now?', a: 'Yes. I am open to new full-time senior roles, and I take on a limited number of freelance and contract projects.' },
  { q: 'What is your notice period?', a: 'Usually one month, and flexible for the right role.' },
  { q: 'Do you work remotely? What hours?', a: 'Yes. I am based in Lahore (PKT, UTC+5), with full overlap with Gulf (UAE, Saudi Arabia) and Cyprus and EU working hours, plus three to four hours with UK mornings.' },
  { q: 'Are you open to relocation?', a: 'Yes, for the right role. I have also worked with remote teams, so starting remotely is easy too.' },
  { q: 'How do you charge for freelance work?', a: 'Per project or as a monthly retainer. I quote after a free 30-minute call, once I understand the scope.' },
  { q: 'What projects are the best fit?', a: 'Laravel and Vue platforms that need to grow: new MVPs, refactoring or rescuing an existing codebase, and API or architecture reviews.' },
];
