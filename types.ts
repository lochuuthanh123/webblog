
export enum Tag {
  LAB = 'LAB',
  CTF = 'CTF',
  PROJECT = 'PROJECT',
  CERT = 'CERT',
  READING = 'READING',
  NOTE = 'NOTE'
}

export enum Level {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export interface Activity {
  slug: string;
  date: string;
  title: string;
  tags: Tag[];
  level: Level;
  tools_used: string[];
  what_i_did: string[];
  what_i_learned: string[];
  verification?: {
    id?: string;
    hash?: string;
    note?: string;
  };
  next_step: string;
  images: string[];
}

export interface ToolboxSnippet {
  title: string;
  description: string;
  code: string;
  tool: string;
}

export interface Skill {
  name: string;
  value: number; // 0-100
}

export interface Project {
  slug: string;
  title: string;
  tags: Tag[];
  tools: string[];
  description: string;
  images: string[];
}

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  verification_url?: string;
  description: string;
}

export interface Profile {
  full_name: string;
  school: string;
  field: string;
  current_focus: string;
  bio: string;
  tools: string[];
  interests: string[];
  verified_achievements: string[];
  skills: Skill[];
}
