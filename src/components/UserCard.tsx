import React from 'react';
import { MapPin, Star, MessageSquare } from 'lucide-react';
import { User } from '../types';
import SkillTag from './SkillTag';

interface UserCardProps {
  user: User;
  onRequestSwap?: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onRequestSwap }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <img
          src={user.photo || 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{user.name}</h3>
          {user.location && (
            <div className="flex items-center space-x-1 text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{user.location}</span>
            </div>
          )}
          {user.rating && (
            <div className="flex items-center space-x-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{user.rating} ({user.totalSwaps} swaps)</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Offers:</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <SkillTag key={index} skill={skill} variant="offered" />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Wants:</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, index) => (
              <SkillTag key={index} skill={skill} variant="wanted" />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Available:</p>
          <p className="text-sm text-gray-600">{user.availability.join(', ')}</p>
        </div>

        {onRequestSwap && (
          <button
            onClick={() => onRequestSwap(user)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Request Swap</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;