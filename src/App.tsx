import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import MembershipPlans from './components/Membership/MembershipPlans';
import PaymentPage from './components/Payment/PaymentPage';
import ClassBooking from './components/Classes/ClassBooking';
import DietPlanner from './components/Diet/DietPlanner';
import WorkoutTracker from './components/Workouts/WorkoutTracker';
import ProfilePage from './components/Profile/ProfilePage';
import MembersPage from './components/Admin/MembersPage';
import TrainersPage from './components/Admin/TrainersPage';
import AnalyticsPage from './components/Admin/AnalyticsPage';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="membership" element={<MembershipPlans />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="classes" element={<ClassBooking />} />
            <Route path="diet-plans" element={<DietPlanner />} />
            <Route path="workouts" element={<WorkoutTracker />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Admin routes */}
            <Route path="admin/members" element={<MembersPage />} />
            <Route path="admin/trainers" element={<TrainersPage />} />
            <Route path="admin/analytics" element={<AnalyticsPage />} />
            
            {/* Trainer routes */}
            <Route path="trainer/classes" element={<div>Trainer Classes Page (Coming Soon)</div>} />
            <Route path="trainer/members" element={<div>Trainer Members Page (Coming Soon)</div>} />
          </Route>
          
          {/* Redirect to login for any other routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;