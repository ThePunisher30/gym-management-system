import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage: React.FC = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 25000 },
    { month: 'Feb', revenue: 30000 },
    { month: 'Mar', revenue: 28000 },
    { month: 'Apr', revenue: 35000 },
    { month: 'May', revenue: 32000 },
    { month: 'Jun', revenue: 40000 },
  ];

  const membershipData = [
    { month: 'Jan', active: 150, new: 20, cancelled: 5 },
    { month: 'Feb', active: 165, new: 25, cancelled: 10 },
    { month: 'Mar', active: 180, new: 30, cancelled: 15 },
    { month: 'Apr', active: 195, new: 35, cancelled: 20 },
    { month: 'May', active: 210, new: 40, cancelled: 25 },
    { month: 'Jun', active: 225, new: 45, cancelled: 30 },
  ];

  const membershipDistribution = [
    { name: 'Basic', value: 30 },
    { name: 'Premium', value: 45 },
    { name: 'Elite', value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="opacity-90">Track key metrics and performance indicators.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-primary-100">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              12%
            </span>
          </div>
          <h3 className="text-2xl font-bold">₹42,500</h3>
          <p className="text-gray-500 text-sm">Monthly Revenue</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-secondary-100">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              8%
            </span>
          </div>
          <h3 className="text-2xl font-bold">245</h3>
          <p className="text-gray-500 text-sm">Active Members</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-accent-100">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <span className="text-sm font-medium text-red-600 flex items-center">
              <ArrowDown className="h-4 w-4 mr-1" />
              3%
            </span>
          </div>
          <h3 className="text-2xl font-bold">186</h3>
          <p className="text-gray-500 text-sm">Classes This Month</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-success/20">
              <Activity className="h-6 w-6 text-success" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              15%
            </span>
          </div>
          <h3 className="text-2xl font-bold">89%</h3>
          <p className="text-gray-500 text-sm">Attendance Rate</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Revenue Overview</h2>
          <div className="h-80">
            <BarChart
              width={500}
              height={300}
              data={revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#FF4C2B" name="Revenue (₹)" />
            </BarChart>
          </div>
        </div>

        {/* Membership Trends */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Membership Trends</h2>
          <div className="h-80">
            <LineChart
              width={500}
              height={300}
              data={membershipData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#0B8457" name="Active Members" />
              <Line type="monotone" dataKey="new" stroke="#3D5CFF" name="New Members" />
              <Line type="monotone" dataKey="cancelled" stroke="#EF4444" name="Cancelled" />
            </LineChart>
          </div>
        </div>

        {/* Membership Distribution */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Membership Distribution</h2>
          <div className="h-80">
            <PieChart width={400} height={300}>
              <Pie
                data={membershipDistribution}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {membershipDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-primary-100 mr-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">New member registration</p>
                <p className="text-xs text-gray-500">John Doe signed up for Elite membership</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-secondary-100 mr-3">
                <Calendar className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium">Class booking spike</p>
                <p className="text-xs text-gray-500">15 new bookings for "Morning Yoga"</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-accent-100 mr-3">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-gray-500">₹3,999 received for Elite membership</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;