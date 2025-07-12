import React, { useState } from 'react';
import { Edit, MessageSquare, RotateCcw, History, Star, CheckCircle, XCircle } from 'lucide-react';
import { currentUser, mockSwapRequests } from '../data/mockData';
import { SwapRequest } from '../types';
import SkillTag from '../components/SkillTag';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [requests, setRequests] = useState(mockSwapRequests);
  const navigate = useNavigate();

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const activeSwaps = requests.filter(req => req.status === 'accepted');
  const completedSwaps = requests.filter(req => req.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}! 👋</h1>
          <p className="text-gray-600 mt-2">Manage your skill swaps and connect with others</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={currentUser.photo}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{currentUser.name}</h2>
                  <p className="text-gray-600 text-sm">{currentUser.location}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{currentUser.rating} ({currentUser.totalSwaps} swaps)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Skills I Offer</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skillsOffered.map((skill, index) => (
                      <SkillTag key={index} skill={skill} variant="offered" />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Skills I Want</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skillsWanted.map((skill, index) => (
                      <SkillTag key={index} skill={skill} variant="wanted" />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                  <p className="text-sm text-gray-600">{currentUser.availability.join(', ')}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Profile Visibility</span>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={currentUser.isPublic}
                      className="h-4 w-4 text-blue-600 rounded"
                      readOnly
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {currentUser.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/profile/edit')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit My Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* Tabs */}
              <div className="border-b border-gray-100">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {[
                    { id: 'pending', label: 'Pending Requests', icon: MessageSquare, count: pendingRequests.length },
                    { id: 'active', label: 'Active Swaps', icon: RotateCcw, count: activeSwaps.length },
                    { id: 'history', label: 'History', icon: History, count: completedSwaps.length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                      {tab.count > 0 && (
                        <span className="bg-blue-100 text-blue-600 py-1 px-2 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'pending' && (
                  <div className="space-y-4">
                    {pendingRequests.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No pending requests</p>
                      </div>
                    ) : (
                      pendingRequests.map((request) => (
                        <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <img
                                src={request.fromUser.photo}
                                alt={request.fromUser.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">{request.fromUser.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  Wants to learn <strong>{request.skillWanted}</strong> for <strong>{request.skillOffered}</strong>
                                </p>
                                {request.message && (
                                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    "{request.message}"
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAcceptRequest(request.id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Accept</span>
                              </button>
                              <button
                                onClick={() => handleRejectRequest(request.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1"
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'active' && (
                  <div className="space-y-4">
                    {activeSwaps.length === 0 ? (
                      <div className="text-center py-8">
                        <RotateCcw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No active swaps</p>
                      </div>
                    ) : (
                      activeSwaps.map((swap) => (
                        <div key={swap.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={swap.fromUser.photo}
                                alt={swap.fromUser.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">Swap with {swap.fromUser.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {swap.skillOffered} ↔ {swap.skillWanted}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                Message
                              </button>
                              <button
                                onClick={() => navigate('/rating')}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                              >
                                Complete Swap
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No completed swaps yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;