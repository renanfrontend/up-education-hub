
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Award, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CourseCard, { CourseCardProps } from '@/components/CourseCard';

// Mock path data
const pathData = {
  id: '1',
  title: 'Frontend Developer',
  description: 'Torne-se um desenvolvedor frontend com foco em React, TypeScript e boas práticas de desenvolvimento web. Esta formação completa abrange desde os fundamentos do HTML, CSS e JavaScript até técnicas avançadas de desenvolvimento com React, incluindo hooks, context API, gerenciamento de estado, e muito mais.',
  thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80',
  courses: 12,
  totalHours: '65h',
  certificates: 3,
  level: 'iniciante',
  progress: 25,
  skills: [
    'HTML5 e semântica',
    'CSS3 e layout responsivo',
    'JavaScript moderno (ES6+)',
    'React e seu ecossistema',
    'TypeScript para aplicações robustas',
    'Gerenciamento de estado',
    'Testes automatizados',
    'Performance e otimização',
    'Integração com APIs',
    'Deployment e CI/CD'
  ],
  courseModules: [
    {
      id: 'm1',
      title: 'Fundamentos Web',
      description: 'Aprenda os pilares do desenvolvimento web moderno.',
      courses: [
        {
          id: '4',
          title: 'HTML5 para Iniciantes',
          description: 'Aprenda HTML5 do zero e construa seu primeiro site com as melhores práticas e técnicas modernas.',
          thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
          instructor: 'Roberto Souza',
          duration: '6h',
          lessons: 24,
          students: 4521,
          level: 'iniciante',
          progress: 100
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
          level: 'intermediário',
          progress: 75
        }
      ]
    },
    {
      id: 'm2',
      title: 'JavaScript Moderno',
      description: 'Domine a linguagem JavaScript e seus recursos modernos.',
      courses: [
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
          progress: 30
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
          level: 'avançado',
          progress: 0
        }
      ]
    },
    {
      id: 'm3',
      title: 'React e seu Ecossistema',
      description: 'Desenvolva aplicações React modernas e performáticas.',
      courses: [
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
          progress: 0
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
          level: 'avançado',
          progress: 0
        }
      ]
    }
  ]
};

const PathPage = () => {
  const { pathId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate total progress
  const calculateTotalProgressForSection = (courses: CourseCardProps[]) => {
    const total = courses.reduce((acc, course) => acc + course.progress, 0);
    return Math.round(total / courses.length);
  };

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
      
      {/* Path Header */}
      <section className="pt-28 pb-8 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm breadcrumbs mb-4 text-rocketseat-text">
            <ul className="flex items-center space-x-2">
              <li><Link to="/paths" className="hover:text-rocketseat-title transition-colors">Formações</Link></li>
              <li className="before:content-['>'] before:mr-2 text-rocketseat-title">{pathData.title}</li>
            </ul>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-rocketseat-title animate-fade-in">
            Formação {pathData.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center mb-4 text-rocketseat-text animate-fade-in">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{pathData.courses} cursos</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{pathData.totalHours} de duração</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>{pathData.certificates} certificados</span>
            </div>
            <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {pathData.level.charAt(0).toUpperCase() + pathData.level.slice(1)}
            </div>
          </div>
        </div>
      </section>
      
      {/* Path Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Path Details and Curriculum */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-rocketseat-shape rounded-lg p-6 mb-8 animate-fade-in">
                <h3 className="text-xl font-semibold text-rocketseat-title mb-4">Sobre esta formação</h3>
                <p className="text-rocketseat-text mb-6">{pathData.description}</p>
                
                <h4 className="text-lg font-medium text-rocketseat-title mb-3">O que você vai aprender</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {pathData.skills.map((skill, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-rocketseat-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-rocketseat-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Curriculum Modules */}
              <div className="space-y-8">
                {pathData.courseModules.map((module, moduleIndex) => (
                  <div 
                    key={module.id} 
                    className="bg-rocketseat-shape rounded-lg overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${moduleIndex * 0.1}s` }}
                  >
                    <div className="p-6 border-b border-rocketseat-dark">
                      <h3 className="text-xl font-semibold text-rocketseat-title">{module.title}</h3>
                      <p className="text-rocketseat-text">{module.description}</p>
                      <div className="mt-4">
                        <div className="flex justify-between items-center text-xs text-rocketseat-text mb-1">
                          <span>Progresso do módulo</span>
                          <span>{calculateTotalProgressForSection(module.courses)}%</span>
                        </div>
                        <Progress value={calculateTotalProgressForSection(module.courses)} className="h-2 bg-rocketseat-dark">
                          <div 
                            className="h-full bg-rocketseat-green rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${calculateTotalProgressForSection(module.courses)}%` }}
                          />
                        </Progress>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {module.courses.map((course) => (
                        <div key={course.id} className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/3">
                            <Link to={`/course/${course.id}`}>
                              <img 
                                src={course.thumbnail} 
                                alt={course.title} 
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            </Link>
                          </div>
                          <div className="md:w-2/3">
                            <Link to={`/course/${course.id}`}>
                              <h4 className="text-lg font-medium text-rocketseat-title hover:text-rocketseat-purple transition-colors mb-2">
                                {course.title}
                              </h4>
                            </Link>
                            <p className="text-sm text-rocketseat-text mb-3 line-clamp-2">{course.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-rocketseat-text mb-4">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="w-3 h-3 mr-1" />
                                <span>{course.lessons} aulas</span>
                              </div>
                              <div className="bg-rocketseat-dark px-2 py-0.5 rounded">
                                {course.level}
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center text-xs text-rocketseat-text mb-1">
                                <span>Progresso</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2 bg-rocketseat-dark">
                                <div 
                                  className="h-full bg-rocketseat-green rounded-full transition-all duration-300 ease-in-out"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </Progress>
                              <div className="mt-3">
                                <Link to={`/course/${course.id}`}>
                                  <Button 
                                    variant="outline"
                                    size="sm"
                                    className="text-rocketseat-purple border-rocketseat-purple hover:bg-rocketseat-purple/10"
                                  >
                                    {course.progress > 0 ? 'Continuar' : 'Começar'} curso
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Path Progress and CTA */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="glass-panel rounded-lg overflow-hidden sticky top-28 animate-fade-in">
                <img src={pathData.thumbnail} alt={pathData.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <h4 className="font-medium text-rocketseat-title">Seu progresso</h4>
                      <span className="text-rocketseat-text">{pathData.progress}%</span>
                    </div>
                    <Progress value={pathData.progress} className="h-3 bg-rocketseat-dark">
                      <div 
                        className="h-full bg-rocketseat-green rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${pathData.progress}%` }}
                      />
                    </Progress>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-rocketseat-dark/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-rocketseat-title mb-1">{pathData.courses}</div>
                      <div className="text-xs text-rocketseat-text">Cursos</div>
                    </div>
                    <div className="bg-rocketseat-dark/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-rocketseat-title mb-1">{pathData.totalHours}</div>
                      <div className="text-xs text-rocketseat-text">Horas</div>
                    </div>
                    <div className="bg-rocketseat-dark/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-rocketseat-title mb-1">{pathData.certificates}</div>
                      <div className="text-xs text-rocketseat-text">Certificados</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button className="button-primary w-full">
                      {pathData.progress > 0 ? 'Continuar formação' : 'Começar formação'}
                    </Button>
                    <Button variant="outline" className="w-full border-rocketseat-shape bg-transparent text-rocketseat-title hover:bg-rocketseat-shape/50">
                      Ver detalhes da assinatura
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-rocketseat-title">Esta formação inclui:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>Acesso a todos os {pathData.courses} cursos</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>{pathData.totalHours} de conteúdo em vídeo</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>{pathData.certificates} certificados oficiais</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>Exercícios práticos e projetos</span>
                      </li>
                      <li className="flex items-center text-sm text-rocketseat-text">
                        <CheckCircle className="w-4 h-4 text-rocketseat-green mr-2" />
                        <span>Acesso à comunidade de alunos</span>
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

export default PathPage;
