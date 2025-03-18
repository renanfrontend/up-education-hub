
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PathCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  courses: number;
  totalHours: string;
  certificates: number;
  level: 'iniciante' | 'intermediário' | 'avançado';
}

const PathCard: React.FC<PathCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  courses,
  totalHours,
  certificates,
  level,
}) => {
  const getLevelColor = () => {
    switch (level) {
      case 'iniciante':
        return 'bg-green-500';
      case 'intermediário':
        return 'bg-yellow-500';
      case 'avançado':
        return 'bg-red-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <Link to={`/path/${id}`}>
      <div className="rounded-lg overflow-hidden bg-rocketseat-shape border border-rocketseat-shape h-full card-hover">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className={`text-white text-xs font-semibold px-2 py-1 rounded-md ${getLevelColor()}`}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-rocketseat-title">{title}</h3>
          <p className="text-sm text-rocketseat-text mb-4 line-clamp-3">{description}</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-rocketseat-support">
            <div className="flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              <span>{courses} cursos</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{totalHours}</span>
            </div>
            <div className="flex items-center">
              <Award className="w-3 h-3 mr-1" />
              <span>{certificates} certificados</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PathCard;
