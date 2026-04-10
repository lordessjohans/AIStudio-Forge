export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'Chat' | 'Vision' | 'Audio' | 'Utility';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  author: string;
  content: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
}
