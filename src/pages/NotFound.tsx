
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-rocketseat-background">
      <NavBar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-float mb-6">
            <div className="w-40 h-40 bg-gradient-to-br from-rocketseat-purple to-rocketseat-green rounded-full mx-auto flex items-center justify-center text-white font-bold text-7xl">
              ?
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 heading-gradient">
            Página não encontrada
          </h1>
          
          <p className="text-rocketseat-text text-xl max-w-xl mx-auto mb-10">
            A página que você está procurando não existe ou foi movida para outro endereço.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="button-primary text-lg py-6 px-8">
                Voltar para a página inicial
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" className="text-lg py-6 px-8 border-rocketseat-shape bg-transparent text-rocketseat-title hover:bg-rocketseat-shape/50">
                Explorar cursos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
