import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  Layout, 
  Wrench, 
  Search, 
  ChevronRight, 
  ExternalLink, 
  Cpu, 
  Code, 
  Zap,
  MessageSquare,
  Send,
  X,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { TEMPLATES, TUTORIALS, TOOLS } from './constants';
import { getForgeAdvice } from './services/gemini';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Welcome to the Forge! How can I help you build your next AI app today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [templateFeedback, setTemplateFeedback] = useState<Record<string, 'like' | 'dislike'>>(() => {
    const saved = localStorage.getItem('forge-template-feedback');
    return saved ? JSON.parse(saved) : {};
  });

  const handleFeedback = (templateId: string, type: 'like' | 'dislike') => {
    setTemplateFeedback(prev => {
      const newState = { ...prev };
      if (newState[templateId] === type) {
        delete newState[templateId]; // toggle off
      } else {
        newState[templateId] = type;
      }
      localStorage.setItem('forge-template-feedback', JSON.stringify(newState));
      return newState;
    });
  };

  const filteredTemplates = TEMPLATES.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setUserInput('');
    setIsTyping(true);

    const aiResponse = await getForgeAdvice(userMsg);
    setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">AI Studio <span className="text-indigo-600">Forge</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#templates" className="hover:text-indigo-600 transition-colors">Templates</a>
            <a href="#tutorials" className="hover:text-indigo-600 transition-colors">Tutorials</a>
            <a href="#tools" className="hover:text-indigo-600 transition-colors">Tools</a>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => setIsAssistantOpen(true)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Ask Forge AI
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-indigo-700 bg-indigo-50 border-indigo-100">
              The Ultimate AI Builder's Hub
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Forge Your Next <br />
              <span className="text-indigo-600">AI Masterpiece</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Everything you need to build, deploy, and scale AI applications using Google AI Studio. 
              From production-ready templates to deep-dive tutorials.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 shadow-lg shadow-indigo-200">
                Explore Templates
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsAssistantOpen(true)}>
                Talk to Forge AI
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Search & Tabs */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              placeholder="Search templates, tools, or topics..." 
              className="pl-10 h-12 bg-white border-slate-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="templates" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-slate-100/50 p-1 rounded-xl">
                <TabsTrigger value="templates" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Layout className="w-4 h-4 mr-2" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="tutorials" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tutorials
                </TabsTrigger>
                <TabsTrigger value="tools" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Wrench className="w-4 h-4 mr-2" />
                  Tools
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Templates Content */}
            <TabsContent value="templates" id="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, idx) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden group">
                      <div className="h-32 bg-slate-50 flex items-center justify-center border-b border-slate-100 group-hover:bg-indigo-50 transition-colors">
                        {template.category === 'Chat' && <MessageSquare className="w-12 h-12 text-indigo-400" />}
                        {template.category === 'Vision' && <Zap className="w-12 h-12 text-amber-400" />}
                        {template.category === 'Utility' && <Code className="w-12 h-12 text-emerald-400" />}
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold border-slate-300">
                            {template.category}
                          </Badge>
                          <Badge className={`text-[10px] uppercase tracking-wider font-bold ${
                            template.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                            template.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {template.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">{template.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-2">
                          {template.tags.map(tag => (
                            <span key={tag} className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-slate-50/50 border-t border-slate-100 flex justify-between items-center py-3">
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 ${templateFeedback[template.id] === 'like' ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                            onClick={() => handleFeedback(template.id, 'like')}
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 ${templateFeedback[template.id] === 'dislike' ? 'text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'}`}
                            onClick={() => handleFeedback(template.id, 'dislike')}
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" className="group/btn">
                          View Template
                          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Tutorials Content */}
            <TabsContent value="tutorials" id="tutorials">
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {TUTORIALS.map((tutorial) => (
                    <AccordionItem key={tutorial.id} value={tutorial.id} className="bg-white border border-slate-200 rounded-xl px-4 shadow-sm">
                      <AccordionTrigger className="hover:no-underline py-6">
                        <div className="flex flex-col items-start text-left">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-lg">{tutorial.title}</span>
                            <Badge variant="secondary" className="text-[10px]">{tutorial.duration}</Badge>
                          </div>
                          <span className="text-sm text-slate-500 font-normal">{tutorial.description}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        <div className="prose prose-slate max-w-none">
                          <p className="mb-4">{tutorial.content}</p>
                          <div className="flex items-center justify-between mt-6">
                            <span className="text-xs text-slate-400">By {tutorial.author}</span>
                            <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700">
                              Start Tutorial
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            {/* Tools Content */}
            <TabsContent value="tools" id="tools">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TOOLS.map((tool) => (
                  <Card key={tool.id} className="border-slate-200 hover:border-indigo-300 transition-colors group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                        {tool.icon === 'Sparkles' && <Sparkles className="w-6 h-6 text-indigo-600" />}
                        {tool.icon === 'Cloud' && <Cpu className="w-6 h-6 text-blue-600" />}
                        {tool.icon === 'Flame' && <Zap className="w-6 h-6 text-orange-600" />}
                      </div>
                      <CardTitle>{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="link" className="p-0 text-indigo-600 h-auto" asChild>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Community Section */}
        <section className="mt-32 p-12 bg-indigo-900 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Join the Forge Community</h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Share your creations, get feedback from experts, and stay updated with the latest in AI development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-indigo-900 hover:bg-indigo-50">Join Discord</Button>
              <Button variant="outline" className="border-indigo-400 text-white hover:bg-indigo-800">Subscribe to Newsletter</Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-800/50 skew-x-12 translate-x-1/2 -z-0" />
          <Sparkles className="absolute bottom-8 right-8 w-32 h-32 text-indigo-800/30 -z-0" />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight">AI Studio Forge</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </div>
          <p className="text-sm text-slate-400">© 2026 AI Studio Forge. Built with Gemini.</p>
        </div>
      </footer>

      {/* Forge AI Assistant Drawer/Dialog */}
      <Dialog open={isAssistantOpen} onOpenChange={setIsAssistantOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-6 bg-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-white">Forge AI Assistant</DialogTitle>
                  <p className="text-xs text-indigo-100">Ask me anything about building AI apps</p>
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-grow p-6 bg-slate-50">
            <div className="space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <Input 
              placeholder="Type your question..." 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="bg-slate-50 border-slate-200"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={isTyping} className="bg-indigo-600 hover:bg-indigo-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
