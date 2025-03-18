
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  lessons: number;
  students: number;
  level: 'iniciante' | 'intermediário' | 'avançado';
  featured?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  instructor,
  duration,
  lessons,
  students,
  level,
  featured = false,
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
    <Link to={`/course/${id}`}>
      <div 
        className={cn(
          'rounded-lg overflow-hidden bg-rocketseat-shape border border-rocketseat-shape h-full card-hover',
          featured && 'ring-2 ring-rocketseat-purple'
        )}
      >
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
          {featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-rocketseat-purple text-white text-xs font-semibold px-2 py-1 rounded-md">
                Destaque
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`text-white text-xs font-semibold px-2 py-1 rounded-md ${getLevelColor()}`}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-rocketseat-title">{title}</h3>
          <p className="text-sm text-rocketseat-text mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center mb-3 text-rocketseat-text">
            <span className="text-sm">por {instructor}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-rocketseat-support">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              <span>{lessons} aulas</span>
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              <span>{students} alunos</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
