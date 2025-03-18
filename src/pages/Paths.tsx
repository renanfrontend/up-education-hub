
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PathCard, { PathCardProps } from '@/components/PathCard';

// Mock data
const allPaths: PathCardProps[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'Torne-se um desenvolvedor frontend com foco em React, TypeScript e boas práticas de desenvolvimento web.',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    courses: 12,
    totalHours: '65h',
    certificates: 3,
    level: 'iniciante'
  },
  {
    id: '2',
    title: 'UI/UX para Desenvolvedores',
    description: 'Aprenda princípios de design, acessibilidade e implementação de interfaces de usuário excepcionais.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    courses: 8,
    totalHours: '42h',
    certificates: 2,
    level: 'intermediário'
  },
  {
    id: '3',
    title: 'Especialista em React',
    description: 'Domine o ecossistema React com técnicas avançadas, Redux, GraphQL e frameworks modernos.',
    thumbnail: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    courses: 10,
    totalHours: '55h',
    certificates: 2,
    level: 'avançado'
  },
  {
    id: '4',
    title: 'Desenvolvimento Web Completo',
    description: 'Aprenda a construir projetos web completos usando HTML, CSS, JavaScript e frameworks modernos.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    courses: 15,
    totalHours: '80h',
    certificates: 4,
    level: 'iniciante'
  },
  {
    id: '5',
    title: 'Frontend Performance',
    description: 'Otimize suas aplicações web para máxima performance, velocidade e experiência do usuário.',
    thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    courses: 6,
    totalHours: '32h',
    certificates: 1,
    level: 'avançado'
  },
  {
    id: '6',
    title: 'Desenvolvedor JavaScript Moderno',
    description: 'Domine JavaScript moderno incluindo ES6+, async/await, módulos e padrões avançados.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    courses: 9,
    totalHours: '48h',
    certificates: 2,
    level: 'intermediário'
  }
];

const Paths = () => {
  const [filteredPaths, setFilteredPaths] = useState<PathCardProps[]>(allPaths);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterPaths();
  }, [searchTerm, levelFilter]);

  const filterPaths = () => {
    let result = [...allPaths];

    // Search filter
    if (searchTerm) {
      result = result.filter(path => 
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Level filter
    if (levelFilter !== 'all') {
      result = result.filter(path => path.level === levelFilter);
    }

    setFilteredPaths(result);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLevelFilter('all');
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
              Formações Completas
            </h1>
            <p className="text-rocketseat-text text-lg max-w-3xl mx-auto mb-6">
              Trilhas estruturadas para desenvolver suas habilidades do básico ao avançado
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 max-w-xl mx-auto">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rocketseat-text" />
                <Input 
                  type="search"
                  placeholder="Buscar formações..."
                  className="pl-10 bg-rocketseat-shape border-rocketseat-shape text-rocketseat-title focus-visible:ring-rocketseat-purple"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="bg-rocketseat-shape border-rocketseat-shape">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os níveis</SelectItem>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediário">Intermediário</SelectItem>
                    <SelectItem value="avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(searchTerm || levelFilter !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-rocketseat-purple hover:text-rocketseat-purple/90 hover:bg-rocketseat-purple/10"
                  onClick={resetFilters}
                >
                  Limpar
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Paths Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
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
          ) : filteredPaths.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((path, index) => (
                <div 
                  key={path.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PathCard {...path} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-rocketseat-title mb-2">Nenhuma formação encontrada</h3>
              <p className="text-rocketseat-text mb-6">Tente ajustar seus filtros ou buscar por outro termo.</p>
              <Button onClick={resetFilters} className="button-primary">
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-rocketseat-dark">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-rocketseat-title mb-4">Benefícios das Formações</h2>
            <p className="text-rocketseat-text max-w-2xl mx-auto">
              Conheça as vantagens de aprender através de nossas trilhas completas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-rocketseat-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-rocketseat-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rocketseat-title mb-2">Aprendizado Direcionado</h3>
              <p className="text-rocketseat-text">Sequência lógica para o desenvolvimento de habilidades sem lacunas de conhecimento.</p>
            </div>
            <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-rocketseat-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-rocketseat-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rocketseat-title mb-2">Certificados Reconhecidos</h3>
              <p className="text-rocketseat-text">Certificações que validam seu conhecimento e experiência para o mercado de trabalho.</p>
            </div>
            <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-rocketseat-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-rocketseat-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rocketseat-title mb-2">Mentoria em Grupo</h3>
              <p className="text-rocketseat-text">Sessões exclusivas com instrutores para tirar dúvidas e receber orientação personalizada.</p>
            </div>
            <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-full bg-rocketseat-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-rocketseat-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rocketseat-title mb-2">Projetos Práticos</h3>
              <p className="text-rocketseat-text">Desenvolvimento de aplicações reais para construir um portfólio profissional completo.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Paths;
