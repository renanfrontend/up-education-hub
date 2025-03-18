
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BookOpen, Video, Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CourseCard, { CourseCardProps } from '@/components/CourseCard';
import LiveCard, { LiveCardProps } from '@/components/LiveCard';
import PathCard, { PathCardProps } from '@/components/PathCard';

// Mock data
const featuredCourses: CourseCardProps[] = [
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
  }
];

const upcomingLives: LiveCardProps[] = [
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
  }
];

const learningPaths: PathCardProps[] = [
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
  }
];

const stats = [
  { id: 1, icon: <BookOpen className="w-10 h-10" />, value: "150+", label: "Cursos" },
  { id: 2, icon: <Video className="w-10 h-10" />, value: "3,000+", label: "Aulas" },
  { id: 3, icon: <Users className="w-10 h-10" />, value: "50,000+", label: "Alunos" },
  { id: 4, icon: <GraduationCap className="w-10 h-10" />, value: "15+", label: "Formações" },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-rocketseat-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rocketseat-purple/10 via-transparent to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`text-center animate-stagger ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="inline-block bg-rocketseat-shape/60 backdrop-blur-sm mb-6 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-rocketseat-title">A plataforma completa para aprender frontend</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-gradient">
              Transforme sua carreira com conteúdo de qualidade
            </h1>
            <p className="text-rocketseat-text text-lg md:text-xl max-w-3xl mx-auto mb-10">
              Domine as tecnologias mais avançadas de frontend com cursos práticos, lives exclusivas e uma comunidade engajada de desenvolvedores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="button-primary text-lg py-6 px-8">
                Começar agora
              </Button>
              <Button variant="outline" className="text-lg py-6 px-8 border-rocketseat-shape bg-transparent text-rocketseat-title hover:bg-rocketseat-shape/50">
                <Play className="w-5 h-5 mr-2" /> Assistir vídeo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-rocketseat-dark">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-rocketseat-purple mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-rocketseat-title mb-2">{stat.value}</div>
                <div className="text-rocketseat-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-rocketseat-title mb-2">Cursos em Destaque</h2>
              <p className="text-rocketseat-text">Explore nossos cursos mais populares e atualizados</p>
            </div>
            <Link to="/courses">
              <Button variant="link" className="text-rocketseat-purple hover:text-rocketseat-purple/90 flex items-center">
                Ver todos <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <div 
                key={course.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-rocketseat-shape/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-rocketseat-title mb-4">Formações Completas</h2>
            <p className="text-rocketseat-text max-w-2xl mx-auto">
              Trilhas de aprendizado estruturadas para desenvolver suas habilidades do básico ao avançado
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <div 
                key={path.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PathCard {...path} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/paths">
              <Button className="button-primary">
                Ver todas as formações
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Events Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-rocketseat-title mb-2">Lives e Eventos</h2>
              <p className="text-rocketseat-text">Aprenda em tempo real com especialistas da indústria</p>
            </div>
            <Link to="/lives">
              <Button variant="link" className="text-rocketseat-purple hover:text-rocketseat-purple/90 flex items-center">
                Ver todos <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingLives.map((live, index) => (
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
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rocketseat-purple/30 to-rocketseat-green/30 opacity-50"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-rocketseat-title mb-6">
              Pronto para impulsionar sua carreira?
            </h2>
            <p className="text-rocketseat-text text-lg max-w-2xl mx-auto mb-10">
              Junte-se a milhares de desenvolvedores que já estão transformando suas carreiras com a Up Education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="button-primary text-lg py-6 px-8">
                Começar gratuitamente
              </Button>
              <Button variant="outline" className="text-lg py-6 px-8 border-rocketseat-shape bg-transparent text-rocketseat-title hover:bg-rocketseat-shape/50">
                Ver planos
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
