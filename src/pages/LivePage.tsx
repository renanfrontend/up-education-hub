
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Users, MessageSquare, Share2, Bookmark, ThumbsUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LiveCard, { LiveCardProps } from '@/components/LiveCard';

// Mock live data
const liveData = {
  id: '2',
  title: 'Desenvolvimento de APIs RESTful com Node.js',
  description: 'Aprenda a construir APIs robustas e escaláveis usando Node.js, Express e boas práticas. Nesta live, vamos criar uma API RESTful completa do zero, incluindo autenticação, validações, tratamento de erros, documentação com Swagger e deploy. Você verá na prática como estruturar rotas, controllers, services e repositories seguindo padrões arquiteturais modernos.',
  thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80',
  instructor: {
    name: 'Juliana Costa',
    bio: 'Desenvolvedora backend sênior, especialista em Node.js e arquitetura de microsserviços. Palestrante em conferências de tecnologia e autora de conteúdos técnicos.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  date: '10/06/2023',
  time: '20:00',
  duration: '1h30',
  attendees: 256,
  status: 'live',
  topics: [
    'Fundamentos de REST e APIs',
    'Configuração do ambiente com Node.js e Express',
    'Modelagem de dados e interação com MongoDB',
    'Autenticação com JWT',
    'Middlewares e validações',
    'Tratamento de erros e logs',
    'Testes de APIs com Jest e Supertest',
    'Documentação com Swagger',
    'Deploy e monitoramento'
  ],
  requirements: [
    'Conhecimentos básicos de JavaScript',
    'Familiaridade com o conceito de APIs',
    'Node.js instalado (v14+)'
  ],
  video: 'https://www.youtube.com/embed/VIDEO_ID',
  relatedLives: [
    {
      id: '4',
      title: 'React Query e Gerenciamento de Estado Assíncrono',
      description: 'Aprenda como implementar cache e gerenciamento de estado para operações assíncronas em suas aplicações React.',
      thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
      instructor: 'Fernanda Lima',
      date: '20/06/2023',
      time: '19:00',
      duration: '1h30',
      attendees: 127,
      status: 'upcoming'
    },
    {
      id: '8',
      title: 'Técnicas Avançadas de Debugging no Frontend',
      description: 'Domine as ferramentas e técnicas para depurar problemas complexos em aplicações frontend.',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
      instructor: 'Carlos Eduardo',
      date: '25/06/2023',
      time: '20:00',
      duration: '1h30',
      attendees: 98,
      status: 'upcoming'
    }
  ],
  comments: [
    {
      id: 'c1',
      user: {
        name: 'Roberto Alves',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      },
      text: 'Excelente conteúdo! Estou animado para implementar essas técnicas no meu projeto atual.',
      timestamp: '10 minutos atrás',
      likes: 5
    },
    {
      id: 'c2',
      user: {
        name: 'Carolina Mendes',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      },
      text: 'Finalmente entendi como implementar autenticação JWT corretamente. Muito obrigada!',
      timestamp: '15 minutos atrás',
      likes: 7
    },
    {
      id: 'c3',
      user: {
        name: 'Daniel Freitas',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      },
      text: 'A explicação sobre middlewares foi ótima. Consegui resolver um problema que estava tendo há dias. Você poderia explicar um pouco mais sobre o tratamento de erros assíncronos?',
      timestamp: '22 minutos atrás',
      likes: 3
    }
  ]
};

const LivePage = () => {
  const { liveId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, would send to API
      console.log('Comment submitted:', comment);
      setComment('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-rocketseat-background">
        <NavBar />
        <div className="pt-28 pb-20 px-4 flex-grow">
          <div className="container mx-auto max-w-6xl">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-rocketseat-shape/50 rounded-lg w-3/4"></div>
              <div className="h-[32rem] bg-rocketseat-shape/50 rounded-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 bg-rocketseat-shape/50 rounded w-full"></div>
                    <div className="h-6 bg-rocketseat-shape/50 rounded w-5/6"></div>
                    <div className="h-6 bg-rocketseat-shape/50 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="col-span-1 space-y-4">
                  <div className="h-60 bg-rocketseat-shape/50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-rocketseat-background">
      <NavBar />
      
      {/* Live Header */}
      <section className="pt-28 pb-8 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm breadcrumbs mb-4 text-rocketseat-text">
            <ul className="flex items-center space-x-2">
              <li><Link to="/lives" className="hover:text-rocketseat-title transition-colors">Lives</Link></li>
              <li className="before:content-['>'] before:mr-2 text-rocketseat-title">{liveData.title}</li>
            </ul>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-rocketseat-title animate-fade-in">
            {liveData.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center mb-4 text-rocketseat-text animate-fade-in">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{liveData.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{liveData.time} • {liveData.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{liveData.attendees} inscritos</span>
            </div>
            {liveData.status === 'live' && (
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-slow mr-1"></span>
                <span className="text-red-500 font-medium">AO VIVO AGORA</span>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Live Video */}
      <section className="pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-rocketseat-dark rounded-lg overflow-hidden shadow-lg animate-fade-in">
            {liveData.status === 'live' ? (
              <div className="aspect-video relative">
                <iframe 
                  src={liveData.video} 
                  title={liveData.title}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video relative bg-rocketseat-shape flex items-center justify-center">
                <div className="text-center">
                  {liveData.status === 'upcoming' ? (
                    <>
                      <Clock className="w-16 h-16 text-rocketseat-purple mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-rocketseat-title mb-2">Esta live ainda não começou</h3>
                      <p className="text-rocketseat-text">Marque na sua agenda para {liveData.date} às {liveData.time}</p>
                      <Button className="button-primary mt-4">Receber lembrete</Button>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-16 h-16 text-rocketseat-purple mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-rocketseat-title mb-2">Esta live já foi encerrada</h3>
                      <p className="text-rocketseat-text">A gravação estará disponível em breve</p>
                      <Button className="button-primary mt-4">Ser notificado quando disponível</Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Live Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-rocketseat-shape mb-6">
                  <TabsTrigger value="description" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                    Detalhes
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                    Instrutor
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-0 animate-fade-in">
                  <div className="bg-rocketseat-shape rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-rocketseat-title mb-4">Sobre esta live</h3>
                    <p className="text-rocketseat-text mb-6">{liveData.description}</p>
                    
                    <h4 className="text-lg font-medium text-rocketseat-title mb-3">O que será abordado</h4>
                    <ul className="space-y-2 mb-6">
                      {liveData.topics.map((topic, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-rocketseat-purple mt-2 mr-2"></div>
                          <span className="text-rocketseat-text">{topic}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-medium text-rocketseat-title mb-3">Pré-requisitos</h4>
                    <ul className="space-y-2 mb-6">
                      {liveData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-rocketseat-purple mt-2 mr-2"></div>
                          <span className="text-rocketseat-text">{req}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-transparent border-rocketseat-shape text-rocketseat-text hover:text-rocketseat-title hover:bg-rocketseat-shape/50">
                          <Share2 className="w-4 h-4 mr-2" /> Compartilhar
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent border-rocketseat-shape text-rocketseat-text hover:text-rocketseat-title hover:bg-rocketseat-shape/50">
                          <Bookmark className="w-4 h-4 mr-2" /> Salvar
                        </Button>
                      </div>
                      <Button className="button-primary">
                        Inscrever-se
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="chat" className="mt-0 animate-fade-in">
                  <div className="bg-rocketseat-shape rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-rocketseat-dark">
                      <h3 className="text-xl font-semibold text-rocketseat-title mb-1">Chat ao vivo</h3>
                      <p className="text-sm text-rocketseat-text">Participe da discussão com outros alunos</p>
                    </div>
                    
                    <div className="p-6 max-h-96 overflow-y-auto">
                      {liveData.comments.map((comment) => (
                        <div key={comment.id} className="mb-6">
                          <div className="flex items-start">
                            <img 
                              src={comment.user.avatar} 
                              alt={comment.user.name}
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium text-rocketseat-title">{comment.user.name}</h4>
                                <span className="text-xs text-rocketseat-text">{comment.timestamp}</span>
                              </div>
                              <p className="text-rocketseat-text mb-2">{comment.text}</p>
                              <div className="flex items-center">
                                <button className="flex items-center text-xs text-rocketseat-text hover:text-rocketseat-purple transition-colors">
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {comment.likes}
                                </button>
                                <button className="flex items-center text-xs text-rocketseat-text hover:text-rocketseat-purple transition-colors ml-4">
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Responder
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-6 border-t border-rocketseat-dark">
                      <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rocketseat-dark flex items-center justify-center">
                          <User className="w-5 h-5 text-rocketseat-text" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Escreva um comentário..."
                          className="flex-1 bg-rocketseat-dark border-rocketseat-dark text-rocketseat-title focus-visible:ring-rocketseat-purple"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit" className="button-primary">
                          Enviar
                        </Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="instructor" className="mt-0 animate-fade-in">
                  <div className="bg-rocketseat-shape rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img 
                        src={liveData.instructor.avatar} 
                        alt={liveData.instructor.name} 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-rocketseat-title mb-2">{liveData.instructor.name}</h3>
                        <p className="text-rocketseat-text">{liveData.instructor.bio}</p>
                        <Button variant="outline" size="sm" className="mt-4 bg-transparent border-rocketseat-shape text-rocketseat-text hover:text-rocketseat-title hover:bg-rocketseat-shape/50">
                          Ver perfil completo
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Related Lives */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <h3 className="text-xl font-semibold text-rocketseat-title mb-6">Lives relacionadas</h3>
                <div className="space-y-6">
                  {liveData.relatedLives.map((live, index) => (
                    <div 
                      key={live.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <LiveCard {...live} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LivePage;
