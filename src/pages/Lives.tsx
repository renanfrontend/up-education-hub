
import React, { useState, useEffect } from 'react';
import { Search as MagnifyingGlassIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LiveCard, { LiveCardProps } from '@/components/LiveCard';

// Mock data
const livesData: LiveCardProps[] = [
  {
    id: '1',
    title: 'Introdução ao Next.js 14',
    description: 'Vamos explorar as novidades do Next.js 14 e como usar o App Router para construir aplicações modernas.',
    thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Marcos Paulo',
    date: '15/06/2023',
    time: '19:00',
    duration: '2h',
    attendees: 345,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Desenvolvimento de APIs RESTful com Node.js',
    description: 'Aprenda a construir APIs robustas e escaláveis usando Node.js, Express e boas práticas.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Juliana Costa',
    date: '10/06/2023',
    time: '20:00',
    duration: '1h30',
    attendees: 256,
    status: 'live'
  },
  {
    id: '3',
    title: 'Testes Automatizados com Jest e React Testing Library',
    description: 'Descubra como implementar testes unitários e de integração para suas aplicações React.',
    thumbnail: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Rafael Mendes',
    date: '05/06/2023',
    time: '19:00',
    duration: '2h',
    attendees: 189,
    status: 'recorded'
  },
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
    id: '5',
    title: 'Tailwind CSS: Dicas Avançadas e Práticas Recomendadas',
    description: 'Explore técnicas avançadas do Tailwind CSS para criar interfaces modernas e responsivas.',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Renato Alves',
    date: '18/06/2023',
    time: '20:00',
    duration: '1h',
    attendees: 203,
    status: 'upcoming'
  },
  {
    id: '6',
    title: 'Animações Avançadas com CSS e JavaScript',
    description: 'Crie animações impressionantes e fluidas para suas interfaces web usando CSS e JavaScript.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Amanda Gonçalves',
    date: '02/06/2023',
    time: '19:00',
    duration: '1h30',
    attendees: 178,
    status: 'recorded'
  },
  {
    id: '7',
    title: 'Acessibilidade Web na Prática',
    description: 'Aprenda a aplicar os princípios de acessibilidade em suas aplicações web para uma experiência inclusiva.',
    thumbnail: 'https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Paulo Roberto',
    date: '08/06/2023',
    time: '19:00',
    duration: '2h',
    attendees: 134,
    status: 'recorded'
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
];

const Lives = () => {
  const [filteredLives, setFilteredLives] = useState<LiveCardProps[]>(livesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterLives();
  }, [searchTerm, activeTab]);

  const filterLives = () => {
    let result = [...livesData];

    // Search filter
    if (searchTerm) {
      result = result.filter(live => 
        live.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        live.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        live.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tab filter
    if (activeTab !== 'all') {
      result = result.filter(live => live.status === activeTab);
    }

    setFilteredLives(result);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setActiveTab('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-rocketseat-background">
      <NavBar />
      
      {/* Header */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rocketseat-purple/10 via-transparent to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center animate-stagger">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 heading-gradient">
              Lives e Eventos
            </h1>
            <p className="text-rocketseat-text text-lg max-w-3xl mx-auto mb-6">
              Participe de transmissões ao vivo com especialistas e aprenda em tempo real
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rocketseat-text" />
                <Input 
                  type="search"
                  placeholder="Buscar lives..."
                  className="pl-10 bg-rocketseat-shape border-rocketseat-shape text-rocketseat-title focus-visible:ring-rocketseat-purple"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lives Tabs and Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-rocketseat-shape">
                <TabsTrigger value="all" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="live" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                  <span className="mr-1 w-2 h-2 bg-red-500 rounded-full inline-block"></span> Ao vivo
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                  Em breve
                </TabsTrigger>
                <TabsTrigger value="recorded" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                  Gravados
                </TabsTrigger>
              </TabsList>
              {(searchTerm || activeTab !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-rocketseat-purple hover:text-rocketseat-purple/90 hover:bg-rocketseat-purple/10"
                  onClick={resetFilters}
                >
                  Limpar filtros
                </Button>
              )}
            </div>

            <TabsContent value="all" className="mt-0">
              {renderLivesGrid(filteredLives)}
            </TabsContent>
            <TabsContent value="live" className="mt-0">
              {renderLivesGrid(filteredLives)}
            </TabsContent>
            <TabsContent value="upcoming" className="mt-0">
              {renderLivesGrid(filteredLives)}
            </TabsContent>
            <TabsContent value="recorded" className="mt-0">
              {renderLivesGrid(filteredLives)}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );

  function renderLivesGrid(lives: LiveCardProps[]) {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="bg-rocketseat-shape rounded-lg overflow-hidden h-full">
                <div className="h-48 bg-rocketseat-dark/50"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-rocketseat-dark/50 rounded"></div>
                  <div className="h-4 bg-rocketseat-dark/50 rounded"></div>
                  <div className="h-4 bg-rocketseat-dark/50 rounded w-3/4"></div>
                  <div className="h-4 bg-rocketseat-dark/50 rounded w-1/2"></div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-3 bg-rocketseat-dark/50 rounded"></div>
                    <div className="h-3 bg-rocketseat-dark/50 rounded"></div>
                    <div className="h-3 bg-rocketseat-dark/50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return lives.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lives.map((live, index) => (
          <div 
            key={live.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <LiveCard {...live} />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-rocketseat-title mb-2">Nenhuma live encontrada</h3>
        <p className="text-rocketseat-text mb-6">Tente ajustar seus filtros ou buscar por outro termo.</p>
        <Button onClick={resetFilters} className="button-primary">
          Limpar filtros
        </Button>
      </div>
    );
  }
};

export default Lives;
