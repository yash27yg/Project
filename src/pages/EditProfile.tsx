import React, { useState } from 'react';
import { Save, Plus, Upload, MapPin, Tag, Clock, Eye } from 'lucide-react';
import { currentUser } from '../data/mockData';
import SkillTag from '../components/SkillTag';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    location: currentUser.location || '',
    skillsOffered: [...currentUser.skillsOffered],
    skillsWanted: [...currentUser.skillsWanted],
    availability: [...currentUser.availability],
    isPublic: currentUser.isPublic
  });

  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings'];

  const handleAddSkillOffered = () => {
    if (newSkillOffered.trim() && !formData.skillsOffered.includes(newSkillOffered.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered('');
    }
  };

  const handleAddSkillWanted = () => {
    if (newSkillWanted.trim() && !formData.skillsWanted.includes(newSkillWanted.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted('');
    }
  };

  const handleRemoveSkillOffered = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleRemoveSkillWanted = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAvailabilityChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(item => item !== option)
        : [...prev.availability, option]
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    alert('Profile updated successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your information and skills</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Photo Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={currentUser.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                <p className="text-sm text-gray-600">Click the upload button to change your photo</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center space-x-1">
                    <span>Full Name</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Location (optional)</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Skills Offered */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>Skills I Offer</span>
                </span>
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newSkillOffered}
                  onChange={(e) => setNewSkillOffered(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkillOffered()}
                  placeholder="Add a skill..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={handleAddSkillOffered}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skillsOffered.map((skill, index) => (
                  <SkillTag
                    key={index}
                    skill={skill}
                    variant="offered"
                    onRemove={() => handleRemoveSkillOffered(skill)}
                  />
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>Skills I Want to Learn</span>
                </span>
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newSkillWanted}
                  onChange={(e) => setNewSkillWanted(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkillWanted()}
                  placeholder="Add a skill..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
                <button
                  onClick={handleAddSkillWanted}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skillsWanted.map((skill, index) => (
                  <SkillTag
                    key={index}
                    skill={skill}
                    variant="wanted"
                    onRemove={() => handleRemoveSkillWanted(skill)}
                  />
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Availability</span>
                </span>
              </label>
              <div className="space-y-2">
                {availabilityOptions.map(option => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(option)}
                      onChange={() => handleAvailabilityChange(option)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Visibility */}
            <div className="border-t border-gray-100 pt-6">
              <label className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Make my profile public</span>
                </span>
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Public profiles can be found by other users when browsing skills
              </p>
            </div>

            {/* Save Button */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;