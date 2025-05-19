import React from 'react';
import { Users, CreditCard, Calendar, TrendingUp, User, DollarSign, Activity } from 'lucide-react';
import { mockUsers } from '../../utils/mockData';
import { UserRole } from '../../types';

const AdminDashboard: React.FC = () => {
  // Filter users by role
  const memberCount = mockUsers.filter(user => user.role === UserRole.MEMBER).length;
  const trainerCount = mockUsers.filter(user => user.role === UserRole.TRAINER).length;
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-secondary to-secondary-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="opacity-90">Manage your gym, members, trainers, and view analytics.</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-primary-100 mr-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="text-xl font-semibold">{memberCount}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-secondary-100 mr-4">
            <User className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Trainers</p>
            <p className="text-xl font-semibold">{trainerCount}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-accent-100 mr-4">
            <Calendar className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Classes Today</p>
            <p className="text-xl font-semibold">8</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-success/20 mr-4">
            <DollarSign className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue (Monthly)</p>
            <p className="text-xl font-semibold">₹42,500</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent members */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Members</h2>
            <button className="text-sm text-secondary hover:text-secondary-700">View all</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockUsers
                  .filter(user => user.role === UserRole.MEMBER)
                  .map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            {member.profilePicture ? (
                              <img src={member.profilePicture} alt={member.name} className="h-full w-full object-cover" />
                            ) : (
                              <User className="h-4 w-4 m-auto text-gray-500" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {member.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-secondary hover:text-secondary-700 mr-3">
                          Edit
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="btn-secondary w-full justify-start">
              <User className="mr-2 h-5 w-5" />
              Add New Member
            </button>
            <button className="btn-secondary w-full justify-start">
              <User className="mr-2 h-5 w-5" />
              Add New Trainer
            </button>
            <button className="btn-secondary w-full justify-start">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Class
            </button>
            <button className="btn-secondary w-full justify-start">
              <CreditCard className="mr-2 h-5 w-5" />
              Manage Memberships
            </button>
            <button className="btn-secondary w-full justify-start">
              <Activity className="mr-2 h-5 w-5" />
              View Reports
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">System Status</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Server Status</span>
                <span className="flex items-center text-xs font-medium text-green-800">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                  Operational
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Database</span>
                <span className="flex items-center text-xs font-medium text-green-800">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                  Operational
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Payment Gateway</span>
                <span className="flex items-center text-xs font-medium text-green-800">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;