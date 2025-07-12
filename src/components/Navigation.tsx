import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, User, MessageSquare, Star, Users } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/browse', icon: Search, label: 'Browse Skills' },
    { to: '/profile/edit', icon: User, label: 'Edit Profile' },
    { to: '/requests', icon: MessageSquare, label: 'Requests' },
    { to: '/rating', icon: Star, label: 'Rate Swap' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-900">SkillSwap</span>
          </NavLink>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex space-x-4">
            {navItems.slice(0, 3).map(({ to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-colors ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;