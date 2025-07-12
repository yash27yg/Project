import React, { useState } from 'react';
import { Star, Send, Heart, Search } from 'lucide-react';
import { mockUsers } from '../data/mockData';

const RatingFeedback: React.FC = () => {
  const [selectedUser] = useState(mockUsers[0]); // Example user
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue: number) => {
    setHoveredRating(starValue);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }
    
    // In a real app, this would make an API call
    setIsSubmitted(true);
    setTimeout(() => {
      alert('Thank you for your feedback!');
      setRating(0);
      setComment('');
      setIsSubmitted(false);
    }, 2000);
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rate Your Swap Experience</h1>
          <p className="text-gray-600">Your feedback helps improve our platform!</p>
        </div>

        {/* Search for Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search for Skills</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for a skill or person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          {searchTerm && (
            <div className="mt-4 space-y-2">
              {filteredUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.skillsOffered.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rating Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {!isSubmitted ? (
            <div className="p-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
                <img
                  src={selectedUser.photo}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Rate Your Swap with {selectedUser.name}
                  </h2>
                  <p className="text-gray-600">Photography ↔ React Development</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How was your experience?
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-colors duration-150 focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-3 text-sm text-gray-600">
                      {rating === 1 && 'Poor'}
                      {rating === 2 && 'Fair'}
                      {rating === 3 && 'Good'}
                      {rating === 4 && 'Very Good'}
                      {rating === 5 && 'Excellent'}
                    </span>
                  )}
                </div>
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave a comment (optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this skill swap..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {comment.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  rating === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
                }`}
              >
                <Send className="h-4 w-4" />
                <span>Submit Feedback</span>
              </button>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-green-600 fill-current" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">Your feedback has been submitted successfully.</p>
              <p className="text-sm text-gray-500">
                Your feedback helps improve the platform and builds trust in our community.
              </p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Your feedback helps improve the platform! 🌟
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Helps other users make informed decisions</li>
            <li>• Builds trust within our community</li>
            <li>• Recognizes great skill swappers</li>
            <li>• Improves the overall platform experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RatingFeedback;