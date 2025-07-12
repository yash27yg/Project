import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { User } from '../types';
import UserCard from '../components/UserCard';

const BrowseSkills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showPublicOnly, setShowPublicOnly] = useState(true);

  const categories = [
    'Programming', 'Design', 'Languages', 'Music', 'Photography', 
    'Cooking', 'Business', 'Fitness', 'Arts & Crafts'
  ];

  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings'];

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Availability filter
      const matchesAvailability = selectedAvailability === '' || 
        user.availability.includes(selectedAvailability);

      // Public profile filter
      const matchesVisibility = !showPublicOnly || user.isPublic;

      return matchesSearch && matchesAvailability && matchesVisibility;
    });
  }, [searchTerm, selectedCategory, selectedAvailability, showPublicOnly]);

  const handleRequestSwap = (user: User) => {
    alert(`Swap request sent to ${user.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h1>
          <p className="text-gray-600">Discover talented people and find your next learning opportunity</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for a skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Any Time</option>
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showPublicOnly}
                  onChange={(e) => setShowPublicOnly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Public profiles only</span>
              </label>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedAvailability('');
                  setShowPublicOnly(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
          </p>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onRequestSwap={handleRequestSwap}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedAvailability('');
              }}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseSkills;