
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, BookOpen, Clock, User, BarChart, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Mock course data
const courseData = {
  id: '1',
  title: 'JavaScript Moderno: ES6 ao ES2022',
  description: 'Domine recursos avançados do JavaScript moderno e entenda todas as novidades recentes da linguagem. Desenvolva projetos práticos utilizando as principais funcionalidades introduzidas nas versões mais recentes, incluindo arrow functions, destructuring, async/await, optional chaining, e muito mais.',
  thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
  instructor: {
    name: 'Ana Silva',
    bio: 'Desenvolvedora JavaScript com mais de 10 anos de experiência. Contribuidora de projetos open source e palestrante em conferências internacionais.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  duration: '12h',
  lessons: 48,
  students: 2354,
  level: 'intermediário',
  rating: 4.8,
  reviews: 367,
  lastUpdate: '15/05/2023',
  includes: [
    'Acesso vitalício a 48 aulas',
    'Projetos práticos com código-fonte',
    'Exercícios com resolução',
    'Certificado de conclusão',
    'Suporte via comunidade',
    'Atualizações periódicas'
  ],
  requirements: [
    'Conhecimentos básicos de JavaScript',
    'Familiaridade com HTML e CSS',
    'Ambiente de desenvolvimento configurado'
  ],
  modules: [
    {
      id: 'm1',
      title: 'Introdução ao JavaScript Moderno',
      description: 'Visão geral sobre a evolução do JavaScript e as principais mudanças.',
      lessons: [
        { id: 'l1', title: 'Boas-vindas ao curso', duration: '5:30', isCompleted: true, isFree: true },
        { id: 'l2', title: 'História do JavaScript e ECMAScript', duration: '12:45', isCompleted: true, isFree: true },
        { id: 'l3', title: 'Configurando o ambiente de desenvolvimento', duration: '8:20', isCompleted: false, isFree: true },
        { id: 'l4', title: 'Entendendo o paradigma do JavaScript', duration: '15:10', isCompleted: false, isFree: false }
      ]
    },
    {
      id: 'm2',
      title: 'Novas Sintaxes do ES6+',
      description: 'Aprenda as novas sintaxes introduzidas a partir do ES6.',
      lessons: [
        { id: 'l5', title: 'let, const e escopo de bloco', duration: '14:25', isCompleted: false, isFree: false },
        { id: 'l6', title: 'Template literals e multiline strings', duration: '8:50', isCompleted: false, isFree: false },
        { id: 'l7', title: 'Arrow functions e this lexical', duration: '18:35', isCompleted: false, isFree: false },
        { id: 'l8', title: 'Parâmetros default e rest parameters', duration: '12:40', isCompleted: false, isFree: false },
        { id: 'l9', title: 'Destructuring de arrays e objetos', duration: '16:55', isCompleted: false, isFree: false }
      ]
    },
    {
      id: 'm3',
      title: 'Programação Assíncrona Moderna',
      description: 'Domine as técnicas modernas para lidar com operações assíncronas.',
      lessons: [
        { id: 'l10', title: 'Callbacks e problemas do callback hell', duration: '13:15', isCompleted: false, isFree: false },
        { id: 'l11', title: 'Promises e seus métodos', duration: '20:05', isCompleted: false, isFree: false },
        { id: 'l12', title: 'Async/await e tratamento de erros', duration: '18:30', isCompleted: false, isFree: false },
        { id: 'l13', title: 'Fetch API e requisições HTTP', duration: '22:10', isCompleted: false, isFree: false }
      ]
    },
    {
      id: 'm4',
      title: 'Recursos das Versões Mais Recentes',
      description: 'Explore as funcionalidades introduzidas nas versões mais recentes do JavaScript.',
      lessons: [
        { id: 'l14', title: 'Optional chaining e nullish coalescing', duration: '14:20', isCompleted: false, isFree: false },
        { id: 'l15', title: 'Dynamic import e code splitting', duration: '16:40', isCompleted: false, isFree: false },
        { id: 'l16', title: 'BigInt e novas funcionalidades numéricas', duration: '11:25', isCompleted: false, isFree: false },
        { id: 'l17', title: 'Top-level await e módulos', duration: '15:50', isCompleted: false, isFree: false },
        { id: 'l18', title: 'Novidades do ES2022 e beyond', duration: '19:15', isCompleted: false, isFree: false }
      ]
    }
  ],
  similarCourses: [
    { id: '2', title: 'React: Componentes, Hooks e Performance', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80' },
    { id: '5', title: 'TypeScript Avançado', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80' },
    { id: '7', title: 'Testes Automatizados com Jest', thumbnail: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80' }
  ]
};

const CoursePage = () => {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Calculate completed and total lessons
    let completed = 0;
    let total = 0;
    
    courseData.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        total++;
        if (lesson.isCompleted) {
          completed++;
        }
      });
    });

    setCompletedLessons(completed);
    setTotalLessons(total);

    return () => clearTimeout(timer);
  }, []);

  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-rocketseat-background">
        <NavBar />
        <div className="pt-28 pb-20 px-4 flex-grow">
          <div className="container mx-auto max-w-6xl">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-rocketseat-shape/50 rounded-lg w-3/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4">
                  <div className="h-64 bg-rocketseat-shape/50 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-rocketseat-shape/50 rounded w-full"></div>
                    <div className="h-6 bg-rocketseat-shape/50 rounded w-5/6"></div>
                    <div className="h-6 bg-rocketseat-shape/50 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="col-span-1 space-y-4">
                  <div className="h-80 bg-rocketseat-shape/50 rounded-lg"></div>
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
      
      {/* Course Header */}
      <section className="pt-28 pb-8 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm breadcrumbs mb-4 text-rocketseat-text">
            <ul className="flex items-center space-x-2">
              <li><Link to="/courses" className="hover:text-rocketseat-title transition-colors">Cursos</Link></li>
              <li className="before:content-['>'] before:mr-2 text-rocketseat-title">{courseData.title}</li>
            </ul>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-rocketseat-title animate-fade-in">
            {courseData.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center mb-4 text-rocketseat-text animate-fade-in">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{courseData.lessons} aulas</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{courseData.duration} de duração</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{courseData.students} alunos</span>
            </div>
            <div className="flex items-center">
              <BarChart className="w-4 h-4 mr-1" />
              <span>Nível {courseData.level}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1 text-yellow-400">★</span>
              <span>{courseData.rating} ({courseData.reviews} avaliações)</span>
            </div>
          </div>
          <p className="text-rocketseat-text mb-4 animate-fade-in">
            Última atualização: {courseData.lastUpdate}
          </p>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Details and Curriculum */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="bg-rocketseat-shape mb-6">
                  <TabsTrigger value="curriculum" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                    Conteúdo do curso
                  </TabsTrigger>
                  <TabsTrigger value="description" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                    Descrição
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="data-[state=active]:bg-rocketseat-purple data-[state=active]:text-white">
                    Instrutor
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="curriculum" className="mt-0 animate-fade-in">
                  <div className="bg-rocketseat-shape rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-rocketseat-title">Seu progresso</h3>
                      <span className="text-sm text-rocketseat-title">{completedLessons} de {totalLessons} aulas</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 bg-rocketseat-dark">
                      <div 
                        className="h-full bg-rocketseat-green rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </Progress>
                    <p className="text-xs text-rocketseat-text mt-2">
                      {progressPercentage}% concluído
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {courseData.modules.map((module, moduleIndex) => (
                      <Accordion 
                        key={module.id} 
                        type="single" 
                        collapsible 
                        defaultValue={moduleIndex === 0 ? module.id : undefined}
                        className="bg-rocketseat-shape rounded-lg overflow-hidden"
                      >
                        <AccordionItem value={module.id} className="border-b-0">
                          <AccordionTrigger className="px-6 py-4 text-rocketseat-title hover:text-rocketseat-purple">
                            <div className="text-left">
                              <h3 className="font-medium">{module.title}</h3>
                              <p className="text-sm text-rocketseat-text">{module.lessons.length} aulas</p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <p className="text-sm text-rocketseat-text mb-4">{module.description}</p>
                            <ul className="space-y-2">
                              {module.lessons.map((lesson) => (
                                <li 
                                  key={lesson.id}
                                  className="flex items-center justify-between p-3 rounded-md hover:bg-rocketseat-dark/30 transition-colors"
                                >
                                  <div className="flex items-center">
                                    {lesson.isCompleted ? (
                                      <CheckCircle className="w-5 h-5 text-rocketseat-green mr-3" />
                                    ) : lesson.isFree ? (
                                      <Play className="w-5 h-5 text-rocketseat-purple mr-3" />
                                    ) : (
                                      <Lock className="w-5 h-5 text-rocketseat-text mr-3" />
                                    )}
                                    <div>
                                      <h4 className={`text-sm ${lesson.isCompleted ? 'text-rocketseat-title' : 'text-rocketseat-title'}`}>
                                        {lesson.title}
                                      </h4>
                                      <div className="flex items-center mt-1">
                                        <Clock className="w-3 h-3 text-rocketseat-text mr-1" />
                                        <span className="text-xs text-rocketseat-text">{lesson.duration}</span>
                                        {lesson.isFree && (
                                          <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-rocketseat-green/20 text-rocketseat-green rounded-sm">
                                            GRÁTIS
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="text-rocketseat-purple">
                                    {lesson.isCompleted ? 'Rever' : 'Assistir'}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="description" className="mt-0 animate-fade-in">
                  <div className="bg-rocketseat-shape rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-rocketseat-title mb-4">Sobre este curso</h3>
                    <p className="text-rocketseat-text mb-6">{courseData.description}</p>
                    
                    <h4 className="text-lg font-medium text-rocketseat-title mb-3">O que você vai aprender</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      {courseData.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-rocketseat-green mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-rocketseat-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-medium text-rocketseat-title mb-3">Pré-requisitos</h4>
                    <ul className="space-y-2 mb-6">
                      {courseData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-rocketseat-purple mt-2 mr-2"></div>
                          <span className="text-rocketseat-text">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="instructor" className="mt-0 animate-fade-in">
                  <div className="bg-rocketseat-shape rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img 
                        src={courseData.instructor.avatar} 
                        alt={courseData.instructor.name} 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-rocketseat-title mb-2">{courseData.instructor.name}</h3>
                        <p className="text-rocketseat-text">{courseData.instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Similar Courses */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-rocketseat-title mb-6">Cursos relacionados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {courseData.similarCourses.map((course, index) => (
                    <Link 
                      key={course.id} 
                      to={`/course/${course.id}`} 
                      className="bg-rocketseat-shape rounded-lg overflow-hidden card-hover animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-rocketseat-title line-clamp-2">{course.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Course CTA Card */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="glass-panel rounded-lg overflow-hidden sticky top-28">
                <img src={courseData.thumbnail} alt={courseData.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-rocketseat-title mb-2">R$ 129,90</div>
                    <div className="text-sm text-rocketseat-text">Acesso vitalício a todos os conteúdos</div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button className="button-primary w-full">Matricular-se agora</Button>
                    <Button variant="outline" className="w-full border-rocketseat-shape bg-transparent text-rocketseat-title hover:bg-rocketseat-shape/50">
                      Adicionar à lista de desejos
                    </Button>
                  </div>
                  
                  <div className="text-sm text-rocketseat-text mb-4 text-center">
                    Garantia de 30 dias de reembolso
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-rocketseat-title">Este curso inclui:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>{courseData.duration} de conteúdo em vídeo</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>{courseData.lessons} aulas</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>Projetos práticos</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>Certificado de conclusão</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>Acesso por dispositivos móveis</span>
                      </li>
                    </ul>
                  </div>
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

export default CoursePage;
