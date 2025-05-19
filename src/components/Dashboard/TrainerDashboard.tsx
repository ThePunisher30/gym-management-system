import React from 'react';
import { Calendar, Users, Clock, Dumbbell, User } from 'lucide-react';
import { mockGymClasses } from '../../utils/mockData';

const TrainerDashboard: React.FC = () => {
  // Get today's classes
  const todayClasses = mockGymClasses.slice(0, 3);
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-accent to-accent-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Trainer Dashboard</h1>
        <p className="opacity-90">Manage your classes, track member progress, and schedule sessions.</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-accent-100 mr-4">
            <Calendar className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Today's Classes</p>
            <p className="text-xl font-semibold">3</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-primary-100 mr-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Members</p>
            <p className="text-xl font-semibold">24</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-secondary-100 mr-4">
            <Clock className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Hours This Week</p>
            <p className="text-xl font-semibold">18</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-gray-100 mr-4">
            <Dumbbell className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">PT Sessions</p>
            <p className="text-xl font-semibold">12</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Today's Schedule</h2>
            <button className="text-sm text-accent hover:text-accent-700">View full schedule</button>
          </div>
          
          <div className="space-y-4">
            {todayClasses.map((gymClass) => (
              <div key={gymClass.id} className="flex border rounded-lg overflow-hidden">
                <div className="w-2 bg-accent"></div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{gymClass.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(gymClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(gymClass.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-500">{gymClass.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent">
                        {gymClass.enrolled}/{gymClass.capacity}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{gymClass.level}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-sm text-gray-600">{gymClass.description}</p>
                    <div>
                      <button className="btn-outline text-xs py-1">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {todayClasses.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No classes scheduled for today</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Member progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Member Progress</h2>
            <button className="text-sm text-accent hover:text-accent-700">View all</button>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Jane Member" className="h-full w-full object-cover" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">Jane Member</p>
                  <p className="text-xs text-gray-500">Weight Loss Program</p>
                </div>
                <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  View
                </button>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  <User className="h-5 w-5 m-auto text-gray-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-gray-500">Strength Training</p>
                </div>
                <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  View
                </button>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  <User className="h-5 w-5 m-auto text-gray-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Yoga & Flexibility</p>
                </div>
                <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  View
                </button>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="btn-accent w-full mt-4">Add Progress Note</button>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;