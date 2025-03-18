
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LiveCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  status: 'upcoming' | 'live' | 'recorded';
}

const LiveCard: React.FC<LiveCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  instructor,
  date,
  time,
  duration,
  attendees,
  status,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="bg-rocketseat-purple/80 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Em breve
          </span>
        );
      case 'live':
        return (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center">
            <span className="mr-1 w-2 h-2 bg-white rounded-full inline-block animate-pulse-slow"></span>
            Ao vivo
          </span>
        );
      case 'recorded':
        return (
          <span className="bg-rocketseat-shape text-rocketseat-text text-xs font-semibold px-2 py-1 rounded-md">
            Gravado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Link to={`/live/${id}`}>
      <div className="rounded-lg overflow-hidden bg-rocketseat-shape border border-rocketseat-shape h-full card-hover">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            {getStatusBadge()}
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
              <Calendar className="w-3 h-3 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{time} • {duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              <span>{attendees} inscritos</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LiveCard;
