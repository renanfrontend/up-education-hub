
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rocketseat-dark border-t border-rocketseat-shape mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rocketseat-purple to-rocketseat-green flex items-center justify-center text-white font-bold text-lg">
                Up
              </div>
              <span className="text-xl font-bold">
                <span className="text-rocketseat-purple">Up</span> Education
              </span>
            </div>
            <p className="text-rocketseat-text mb-6 max-w-md">
              Elevando seus conhecimentos em desenvolvimento frontend através de uma plataforma de educação completa e imersiva.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-rocketseat-text hover:text-rocketseat-purple transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-rocketseat-text hover:text-rocketseat-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-rocketseat-text hover:text-rocketseat-purple transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-rocketseat-text hover:text-rocketseat-purple transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="text-rocketseat-text hover:text-rocketseat-purple transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-rocketseat-title font-medium text-lg mb-4">Plataforma</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link to="/paths" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Formações
                </Link>
              </li>
              <li>
                <Link to="/lives" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Lives
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-rocketseat-title font-medium text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-rocketseat-title font-medium text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="text-rocketseat-text">
                <span className="block">contato@upeducation.com</span>
              </li>
              <li className="text-rocketseat-text">
                <span className="block">+55 11 9999-9999</span>
              </li>
              <li className="text-rocketseat-text">
                <span className="block">São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rocketseat-shape text-center">
          <p className="text-rocketseat-text text-sm">
            © {currentYear} Up Education. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
