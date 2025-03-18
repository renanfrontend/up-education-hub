
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cursos', path: '/courses' },
    { name: 'Formações', path: '/paths' },
    { name: 'Lives', path: '/lives' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-rocketseat-dark/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rocketseat-purple to-rocketseat-green flex items-center justify-center text-white font-bold text-lg">
            Up
          </div>
          <span className="text-xl font-bold hidden sm:inline-block">
            <span className="text-rocketseat-purple">Up</span> Education
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-rocketseat-title hover:text-rocketseat-purple transition-colors duration-200 text-sm font-medium link-hover',
                isActive(link.path) && 'text-rocketseat-purple after:w-full'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-rocketseat-text hover:text-rocketseat-title transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <Link to="/profile">
            <div className="w-9 h-9 rounded-full bg-rocketseat-shape flex items-center justify-center hover:bg-rocketseat-shape/80 transition-colors">
              <User className="w-5 h-5 text-rocketseat-title" />
            </div>
          </Link>
          <Link to="/login">
            <Button className="button-primary">Entrar</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-rocketseat-title" 
          onClick={handleMobileMenuToggle}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-rocketseat-dark/95 backdrop-blur-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-rocketseat-title hover:text-rocketseat-purple py-2 transition-colors duration-200 font-medium',
                  isActive(link.path) && 'text-rocketseat-purple'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-4 pt-4 border-t border-rocketseat-shape">
              <Link to="/profile" className="flex-1">
                <Button variant="outline" className="w-full">Perfil</Button>
              </Link>
              <Link to="/login" className="flex-1">
                <Button className="button-primary w-full">Entrar</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
