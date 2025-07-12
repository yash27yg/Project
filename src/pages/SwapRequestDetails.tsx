import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare, Trash2, Star, MapPin } from 'lucide-react';
import { mockSwapRequests } from '../data/mockData';
import SkillTag from '../components/SkillTag';

const SwapRequestDetails: React.FC = () => {
  const [request] = useState(mockSwapRequests[0]); // Using first request as example
  const [status, setStatus] = useState(request.status);

  const handleAccept = () => {
    setStatus('accepted');
    alert('Swap request accepted!');
  };

  const handleReject = () => {
    setStatus('rejected');
    alert('Swap request rejected.');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this request?')) {
      alert('Request deleted.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      accepted: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Swap Request from {request.fromUser.name}
          </h1>
          <div className="flex items-center space-x-3 mt-3">
            {getStatusBadge(status)}
            <span className="text-gray-500 text-sm">
              Received {request.createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* User Profile Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Profile</h2>
            
            <div className="flex items-start space-x-4">
              <img
                src={request.fromUser.photo}
                alt={request.fromUser.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{request.fromUser.name}</h3>
                {request.fromUser.location && (
                  <div className="flex items-center space-x-1 text-gray-500 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{request.fromUser.location}</span>
                  </div>
                )}
                {request.fromUser.rating && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {request.fromUser.rating} ({request.fromUser.totalSwaps} swaps)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills They Offer</h4>
                <div className="flex flex-wrap gap-2">
                  {request.fromUser.skillsOffered.map((skill, index) => (
                    <SkillTag key={index} skill={skill} variant="offered" />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills They Want</h4>
                <div className="flex flex-wrap gap-2">
                  {request.fromUser.skillsWanted.map((skill, index) => (
                    <SkillTag key={index} skill={skill} variant="wanted" />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Availability</h4>
              <p className="text-sm text-gray-600">{request.fromUser.availability.join(', ')}</p>
            </div>
          </div>

          {/* Swap Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Swap Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">They Offer</h3>
                  <div className="text-lg font-semibold text-blue-700">{request.skillOffered}</div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">They Want from You</h3>
                  <div className="text-lg font-semibold text-purple-700">{request.skillWanted}</div>
                </div>
              </div>
            </div>

            {request.message && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">"{request.message}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {status === 'pending' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleAccept}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Accept Request</span>
                </button>

                <button
                  onClick={handleReject}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <XCircle className="h-5 w-5" />
                  <span>Reject Request</span>
                </button>

                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Request</span>
                </button>
              </div>
            </div>
          )}

          {status === 'accepted' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-medium text-green-900">Request Accepted!</h3>
                  <p className="text-green-700">You can now start coordinating your skill swap.</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Message {request.fromUser.name}</span>
                </button>
              </div>
            </div>
          )}

          {status === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <XCircle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="text-lg font-medium text-red-900">Request Rejected</h3>
                  <p className="text-red-700">This swap request has been declined.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapRequestDetails;