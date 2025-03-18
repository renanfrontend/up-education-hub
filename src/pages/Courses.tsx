
import React, { useState, useEffect } from 'react';
import { Search as MagnifyingGlassIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CourseCard, { CourseCardProps } from '@/components/CourseCard';

// Mock data
const allCourses: CourseCardProps[] = [
  {
    id: '1',
    title: 'JavaScript Moderno: ES6 ao ES2022',
    description: 'Domine recursos avançados do JavaScript moderno e entenda todas as novidades recentes da linguagem.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Ana Silva',
    duration: '12h',
    lessons: 48,
    students: 2354,
    level: 'intermediário',
    featured: true
  },
  {
    id: '2',
    title: 'React: Componentes, Hooks e Performance',
    description: 'Crie aplicações React profissionais com foco em performance, reutilização e padrões modernos.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Lucas Martins',
    duration: '15h',
    lessons: 60,
    students: 1856,
    level: 'avançado',
    featured: true
  },
  {
    id: '3',
    title: 'CSS Avançado: Flexbox e Grid Layout',
    description: 'Domine os sistemas de layout modernos e crie interfaces responsivas e avançadas com CSS.',
    thumbnail: 'https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Carla Oliveira',
    duration: '8h',
    lessons: 32,
    students: 3102,
    level: 'intermediário'
  },
  {
    id: '4',
    title: 'HTML5 para Iniciantes',
    description: 'Aprenda HTML5 do zero e construa seu primeiro site com as melhores práticas e técnicas modernas.',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Roberto Souza',
    duration: '6h',
    lessons: 24,
    students: 4521,
    level: 'iniciante'
  },
  {
    id: '5',
    title: 'TypeScript Avançado',
    description: 'Escreva código mais seguro e escalável com TypeScript, integração com React e boas práticas.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Marina Costa',
    duration: '10h',
    lessons: 40,
    students: 1286,
    level: 'avançado'
  },
  {
    id: '6',
    title: 'Sass e Pré-processadores',
    description: 'Aumente sua produtividade e organize melhor seu CSS com Sass, Less e Stylus.',
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Pedro Alves',
    duration: '7h',
    lessons: 28,
    students: 2435,
    level: 'intermediário'
  },
  {
    id: '7',
    title: 'Testes Automatizados com Jest',
    description: 'Aprenda a escrever testes unitários, de integração e end-to-end para suas aplicações frontend.',
    thumbnail: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'Bianca Mendes',
    duration: '9h',
    lessons: 36,
    students: 987,
    level: 'avançado'
  },
  {
    id: '8',
    title: 'Redux e Gerenciamento de Estado',
    description: 'Domine o Redux e outros patterns de gerenciamento de estado em aplicações React.',
    thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    instructor: 'José Carlos',
    duration: '11h',
    lessons: 44,
    students: 1543,
    level: 'avançado'
  }
];

const categories = [
  "JavaScript", "React", "CSS", "HTML", "TypeScript", "Testes", "Performance", "UI/UX"
];

const Courses = () => {
  const [filteredCourses, setFilteredCourses] = useState<CourseCardProps[]>(allCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState([0, 15]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, levelFilter, durationFilter, categoryFilters]);

  const filterCourses = () => {
    let result = [...allCourses];

    // Search filter
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Level filter
    if (levelFilter !== 'all') {
      result = result.filter(course => course.level === levelFilter);
    }

    // Duration filter
    result = result.filter(course => {
      const courseDuration = parseInt(course.duration.replace('h', ''));
      return courseDuration >= durationFilter[0] && courseDuration <= durationFilter[1];
    });

    // Category filters
    if (categoryFilters.length > 0) {
      result = result.filter(course => 
        categoryFilters.some(category => 
          course.title.includes(category) || course.description.includes(category)
        )
      );
    }

    setFilteredCourses(result);
  };

  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLevelFilter('all');
    setDurationFilter([0, 15]);
    setCategoryFilters([]);
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
              Todos os Cursos
            </h1>
            <p className="text-rocketseat-text text-lg max-w-3xl mx-auto mb-6">
              Explore nossa biblioteca completa de cursos de desenvolvimento frontend
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rocketseat-text" />
                <Input 
                  type="search"
                  placeholder="Buscar cursos..."
                  className="pl-10 bg-rocketseat-shape border-rocketseat-shape text-rocketseat-title focus-visible:ring-rocketseat-purple"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses List */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-panel rounded-lg p-6 sticky top-28">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-rocketseat-title">Filtros</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-rocketseat-purple hover:text-rocketseat-purple/90 hover:bg-rocketseat-purple/10 text-xs"
                    onClick={resetFilters}
                  >
                    Limpar
                  </Button>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {/* Level Filter */}
                  <AccordionItem value="level">
                    <AccordionTrigger className="text-rocketseat-title hover:text-rocketseat-purple text-sm">
                      Nível
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger className="bg-rocketseat-dark border-rocketseat-shape">
                          <SelectValue placeholder="Todos os níveis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os níveis</SelectItem>
                          <SelectItem value="iniciante">Iniciante</SelectItem>
                          <SelectItem value="intermediário">Intermediário</SelectItem>
                          <SelectItem value="avançado">Avançado</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Duration Filter */}
                  <AccordionItem value="duration">
                    <AccordionTrigger className="text-rocketseat-title hover:text-rocketseat-purple text-sm">
                      Duração
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="pt-4">
                          <Slider
                            value={durationFilter}
                            min={0}
                            max={15}
                            step={1}
                            onValueChange={setDurationFilter}
                            className="mt-2"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-rocketseat-text">
                          <span>{durationFilter[0]}h</span>
                          <span>{durationFilter[1]}h</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Categories Filter */}
                  <AccordionItem value="categories">
                    <AccordionTrigger className="text-rocketseat-title hover:text-rocketseat-purple text-sm">
                      Categorias
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <Button
                            key={category}
                            variant="outline"
                            size="sm"
                            className={`text-xs border-rocketseat-shape bg-rocketseat-shape/50 ${
                              categoryFilters.includes(category) 
                                ? 'bg-rocketseat-purple text-white hover:bg-rocketseat-purple/90' 
                                : 'text-rocketseat-text hover:text-rocketseat-title hover:bg-rocketseat-shape'
                            }`}
                            onClick={() => toggleCategoryFilter(category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            {/* Courses Grid */}
            <div className="lg:col-span-3">
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
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <div 
                      key={course.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CourseCard {...course} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-rocketseat-title mb-2">Nenhum curso encontrado</h3>
                  <p className="text-rocketseat-text mb-6">Tente ajustar seus filtros ou buscar por outro termo.</p>
                  <Button onClick={resetFilters} className="button-primary">
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
