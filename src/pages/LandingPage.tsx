import React, { useState } from 'react';
import { ArrowRight, Users, Search, MessageSquare, BookOpen, Star, Play, CheckCircle, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const featuredSkills = [
    { name: 'Photoshop', icon: '🎨', count: '245 people' },
    { name: 'Excel', icon: '📊', count: '189 people' },
    { name: 'Guitar', icon: '🎸', count: '156 people' },
    { name: 'Public Speaking', icon: '🎤', count: '134 people' },
    { name: 'Yoga', icon: '🧘', count: '198 people' },
    { name: 'Cooking', icon: '👨‍🍳', count: '223 people' },
    { name: 'Photography', icon: '📸', count: '167 people' },
    { name: 'Spanish', icon: '🇪🇸', count: '145 people' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'I finally learned to play the ukulele, thanks to SkillSwap! The community is so supportive.',
      skill: 'Learned Ukulele',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Ravi Kumar',
      text: 'Swapping skills saved me time and money. I taught coding and learned photography!',
      skill: 'Learned Photography',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sarah Chen',
      text: 'Amazing platform! I\'ve made great friends while learning new skills.',
      skill: 'Learned Spanish',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const steps = [
    {
      icon: Users,
      title: 'Create a Profile',
      description: 'Add your skills and what you want to learn.'
    },
    {
      icon: Search,
      title: 'Find Matches',
      description: 'Search others by skill or location.'
    },
    {
      icon: MessageSquare,
      title: 'Send a Swap Request',
      description: 'Offer your skill in exchange.'
    },
    {
      icon: BookOpen,
      title: 'Learn Together',
      description: 'Chat, collaborate, and grow!'
    }
  ];

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract form values
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Choose endpoint
    const endpoint = authMode === 'login' ? '/api/login/' : '/api/signup/';
    const url = `http://127.0.0.1:8000${endpoint}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Unknown error');

      // Success!
      alert(json.message);
      setShowAuthModal(false);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">SkillSwap</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#skills" className="text-gray-600 hover:text-blue-600 font-medium">Browse Skills</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Login
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Exchange Skills.
                  <span className="text-blue-500"> Learn for Free.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Offer your skills and learn something new by swapping with others in your community.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border-2 border-gray-200 hover:border-blue-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2,500+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5,000+</div>
                  <div className="text-sm text-gray-600">Swaps Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 transform rotate-3 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="People learning together"
                  className="w-full h-96 object-cover rounded-2xl transform -rotate-3"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Join 2,500+ learners</div>
                    <div className="text-sm text-gray-600">Start swapping today!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to begin your skill-swapping journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-600 transition-colors duration-200 shadow-lg">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after skills in our community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
              >
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{skill.count}</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:underline">
                  Find people →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from our amazing community members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-500 mb-4" />
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.skill}</div>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners and start your skill-swapping journey today.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
          >
            Create Your Profile
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">SkillSwap</span>
              </div>
              <p className="text-gray-400 mb-4">
                The platform where skills meet opportunity. Learn, teach, and grow together.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {authMode === 'login' ? 'Welcome Back' : 'Join SkillSwap'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {/* Full Name for Signup only */}
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your password"
                />
              </div>

              {/* Terms checkbox for signup */}
              {authMode === 'signup' && (
                <div className="flex items-center space-x-2">
                  <input type="checkbox" required className="h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                  </span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>


            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;