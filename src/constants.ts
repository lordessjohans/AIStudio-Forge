import { Template, Tutorial, Tool } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'chatbot',
    title: 'AI Conversationalist',
    description: 'A robust starting point for building multi-turn chat applications with context awareness.',
    category: 'Chat',
    difficulty: 'Beginner',
    tags: ['Gemini 3 Flash', 'React', 'Chat'],
  },
  {
    id: 'image-gen',
    title: 'Visionary Canvas',
    description: 'Harness the power of Gemini to generate and edit images from natural language prompts.',
    category: 'Vision',
    difficulty: 'Intermediate',
    tags: ['Gemini 2.5 Flash Image', 'Creative', 'Vision'],
  },
  {
    id: 'summarizer',
    title: 'Insight Summarizer',
    description: 'Process long-form content and extract key insights, action items, and summaries.',
    category: 'Utility',
    difficulty: 'Beginner',
    tags: ['NLP', 'Efficiency', 'Utility'],
  },
  {
    id: 'code-forge',
    title: 'Code Forge Assistant',
    description: 'Build a coding companion that can explain snippets, debug errors, and suggest improvements.',
    category: 'Utility',
    difficulty: 'Advanced',
    tags: ['Coding', 'Gemini 3.1 Pro', 'Developer Tools'],
  },
];

export const TUTORIALS: Tutorial[] = [
  {
    id: 'intro-aistudio',
    title: 'AI Studio 101',
    description: 'Learn the fundamentals of the Google AI Studio interface and your first prompt.',
    duration: '10 min',
    author: 'Forge Team',
    content: 'Google AI Studio is a fast way to start building with Gemini...',
  },
  {
    id: 'prompt-mastery',
    title: 'Prompt Engineering Mastery',
    description: 'Advanced techniques for getting the most out of LLMs through structured prompting.',
    duration: '25 min',
    author: 'AI Expert',
    content: 'Effective prompting is an art and a science. Start with clear instructions...',
  },
  {
    id: 'react-integration',
    title: 'Gemini in React Apps',
    description: 'A step-by-step guide to integrating the @google/genai SDK into your React frontend.',
    duration: '15 min',
    author: 'Dev Advocate',
    content: 'Integrating Gemini into your React app is straightforward with the SDK...',
  },
];

export const TOOLS: Tool[] = [
  {
    id: 'aistudio',
    name: 'Google AI Studio',
    description: 'The fastest way to build AI apps with Gemini.',
    url: 'https://aistudio.google.com/',
    icon: 'Sparkles',
  },
  {
    id: 'vertex',
    name: 'Vertex AI',
    description: 'Enterprise-grade AI platform on Google Cloud.',
    url: 'https://cloud.google.com/vertex-ai',
    icon: 'Cloud',
  },
  {
    id: 'firebase',
    name: 'Firebase GenKit',
    description: 'Build, deploy, and monitor AI-powered apps.',
    url: 'https://firebase.google.com/docs/genkit',
    icon: 'Flame',
  },
];
