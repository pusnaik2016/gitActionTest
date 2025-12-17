import React, { useState } from 'react';

const EventCard = ({ event, onRegister, onUnregister, isRegistered }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Workshop': 'bg-blue-100 text-blue-800',
      'Hackathon': 'bg-purple-100 text-purple-800',
      'Tech Talk': 'bg-green-100 text-green-800',
      'Career': 'bg-orange-100 text-orange-800',
      'Study Group': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };


  const availableSeats = event.capacity - event.registered;
  const percentFull = (event.registered / event.capacity) * 100;

  const [regState, setRegState] = useState('idle'); // idle | loading | success | error
  const [regError, setRegError] = useState('');

  const handleRegister = async () => {
    setRegState('loading');
    setRegError('');
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      // Optionally, call backend here
      if (onRegister) {
        const result = await onRegister(event.id);
        if (result && result.error) {
          setRegState('error');
          setRegError(result.error);
          return;
        }
      }
      setRegState('success');
      setTimeout(() => setRegState('idle'), 1500);
    } catch (e) {
      setRegState('error');
      setRegError('Registration failed. Please try again.');
    }
  };

  const handleUnregister = async () => {
    setRegState('loading');
    setRegError('');
    try {
      await new Promise(res => setTimeout(res, 500));
      if (onUnregister) {
        await onUnregister(event.id);
      }
      setRegState('idle');
    } catch (e) {
      setRegState('error');
      setRegError('Unregister failed. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">
            {event.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Registration</span>
            <span className="font-medium text-gray-900">
              {event.registered} / {event.capacity} registered
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className={`h-2 rounded-full transition-all ${
                percentFull >= 90 ? 'bg-red-500' : percentFull >= 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${percentFull}%` }}
            ></div>
          </div>
          
          {isRegistered ? (
            <div className="flex gap-2">
              <button
                className="flex-1 py-2 px-4 rounded-md font-medium bg-green-600 text-white cursor-default flex items-center justify-center gap-2"
                disabled
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Registered
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  regState === 'loading'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
                onClick={handleUnregister}
                disabled={regState === 'loading'}
              >
                {regState === 'loading' ? 'Unregistering...' : 'Unregister'}
              </button>
            </div>
          ) : (
            <button
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                availableSeats > 0
                  ? regState === 'success'
                    ? 'bg-green-600 text-white'
                    : regState === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={availableSeats === 0 || regState === 'loading' || regState === 'success'}
              onClick={handleRegister}
              aria-busy={regState === 'loading'}
              aria-label={availableSeats > 0 ? 'Register for event' : 'Event Full'}
            >
              {regState === 'loading' && (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {regState === 'success' ? 'Registered!' : regState === 'error' ? 'Try Again' : availableSeats > 0 ? 'Register Now' : 'Event Full'}
            </button>
          )}
          {regState === 'error' && regError && (
            <div className="text-red-600 text-xs mt-2">{regError}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
