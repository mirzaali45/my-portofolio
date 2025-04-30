// Project types
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "frontend" | "fullstack" | "backend";
  tech: string[];
  link: string;
  github: string;
}

// Skill types
export interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 0-100
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Navigation item
export interface NavItem {
  label: string;
  href: string;
}

// Social media link
export interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

// Parallax section props
export interface ParallaxSectionProps {
  id: string;
  bgImage: string;
  title: string;
  children: React.ReactNode;
  overlay?: "light" | "dark";
}
