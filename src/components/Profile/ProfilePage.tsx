import React, { useState } from 'react';
import { User, Camera, Mail, Key, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
        <p className="opacity-90">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary py-1 px-3"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400 m-6" />
                    )}
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium">{user?.name}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since {new Date(user?.createdAt || '').toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="form-input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="form-input pl-10"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-6">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="form-label">
                          Current Password
                        </label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="form-input pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newPassword" className="form-label">
                          New Password
                        </label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="form-input pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="form-input pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="btn-primary">
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4">Membership Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium capitalize">{user?.membership?.type || 'None'}</span>
              </div>
              {user?.membership?.startDate && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium">
                    {new Date(user.membership.startDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {user?.membership?.endDate && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">End Date</span>
                  <span className="font-medium">
                    {new Date(user.membership.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            <button className="btn-primary w-full mt-4">
              Upgrade Membership
            </button>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-4">Activity Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Workouts Completed</span>
                <span className="font-medium">{user?.stats?.workoutsCompleted || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Classes Booked</span>
                <span className="font-medium">{user?.stats?.classesBooked || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fitness Score</span>
                <span className="font-medium">{user?.stats?.fitnessScore || 0}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;