import React from 'react';
import { Calendar, Clock, Dumbbell, Utensils, CreditCard, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockGymClasses, mockWorkouts, mockMealPlans } from '../../utils/mockData';

const MemberDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get upcoming classes (next 3)
  const upcomingClasses = mockGymClasses.slice(0, 3);
  
  // Get recent workouts (last 2)
  const recentWorkouts = mockWorkouts.slice(0, 2);
  
  // Get active meal plan
  const activeMealPlan = mockMealPlans[0];

  // Check if user is new (registered within last 24 hours)
  const isNewUser = user && new Date().getTime() - new Date(user.createdAt).getTime() < 24 * 60 * 60 * 1000;

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-primary to-primary-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome{user?.name ? `, ${user.name}` : ''}!</h1>
        <p className="opacity-90">
          {isNewUser 
            ? "Get started with your fitness journey by exploring our features below."
            : "Track your fitness journey, book classes, and stay on top of your goals."}
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-primary-100 mr-4">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Workouts This Week</p>
            <p className="text-xl font-semibold">{user?.stats?.workoutsCompleted || 0}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-secondary-100 mr-4">
            <Calendar className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Classes Booked</p>
            <p className="text-xl font-semibold">{user?.stats?.classesBooked || 0}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-accent-100 mr-4">
            <TrendingUp className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Fitness Score</p>
            <p className="text-xl font-semibold">{user?.stats?.fitnessScore || 0}/100</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-gray-100 mr-4">
            <CreditCard className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Membership</p>
            <p className="text-xl font-semibold capitalize">
              {user?.membership?.type || 'None'}
            </p>
          </div>
        </div>
      </div>
      
      {isNewUser ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-primary-50 mr-3">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Choose a Membership</h3>
                  <p className="text-sm text-gray-500">
                    Select a membership plan that fits your goals and budget.
                  </p>
                  <button 
                    onClick={() => navigate('/membership')}
                    className="text-primary hover:text-primary-700 text-sm font-medium mt-2"
                  >
                    View Plans →
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-secondary-50 mr-3">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">Book Your First Class</h3>
                  <p className="text-sm text-gray-500">
                    Browse our class schedule and join a session.
                  </p>
                  <button 
                    onClick={() => navigate('/classes')}
                    className="text-secondary hover:text-secondary-700 text-sm font-medium mt-2"
                  >
                    Browse Classes →
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-accent-50 mr-3">
                  <Utensils className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Create a Meal Plan</h3>
                  <p className="text-sm text-gray-500">
                    Start planning your nutrition for better results.
                  </p>
                  <button 
                    onClick={() => navigate('/diet-plans')}
                    className="text-accent hover:text-accent-700 text-sm font-medium mt-2"
                  >
                    Plan Meals →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 card">
            <h2 className="text-lg font-semibold mb-4">Recommended Classes</h2>
            <div className="space-y-4">
              {upcomingClasses.slice(0, 2).map((gymClass) => (
                <div key={gymClass.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="p-2 rounded-lg bg-primary-50 mr-3">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{gymClass.name}</h3>
                    <p className="text-sm text-gray-500">
                      Perfect for beginners • {gymClass.duration} minutes
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{new Date(gymClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="mx-2">•</span>
                      <span>{gymClass.location}</span>
                    </div>
                  </div>
                  <button className="btn-primary text-sm">Book Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming classes */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upcoming Classes</h2>
              <button className="text-sm text-primary hover:text-primary-700">View all</button>
            </div>
            
            <div className="space-y-4">
              {upcomingClasses.map((gymClass) => (
                <div key={gymClass.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="p-2 rounded-lg bg-primary-50 mr-3">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{gymClass.name}</h3>
                    <p className="text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(gymClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{gymClass.location}</span>
                    </p>
                  </div>
                  <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    Cancel
                  </button>
                </div>
              ))}
              
              {upcomingClasses.length === 0 && (
                <p className="text-gray-500 text-sm">No upcoming classes. Book a class now!</p>
              )}
              
              <button className="btn-primary w-full mt-2">Book a Class</button>
            </div>
          </div>
          
          {/* Recent workouts */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Workouts</h2>
              <button className="text-sm text-primary hover:text-primary-700">View all</button>
            </div>
            
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">
                      {new Date(workout.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {workout.duration} min
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {workout.exercises.map((exercise) => (
                      <div key={exercise.id} className="flex items-center text-sm">
                        <Dumbbell className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="flex-1">{exercise.name}</span>
                        <span className="text-gray-500">
                          {exercise.sets.length} sets
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {recentWorkouts.length === 0 && (
                <p className="text-gray-500 text-sm">No recent workouts. Start tracking your workouts!</p>
              )}
              
              <button className="btn-primary w-full mt-2">Log Workout</button>
            </div>
          </div>
          
          {/* Meal plan */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Today's Meal Plan</h2>
              <button className="text-sm text-primary hover:text-primary-700">View all</button>
            </div>
            
            {activeMealPlan ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{activeMealPlan.name}</h3>
                  <span className="text-xs bg-secondary-100 text-secondary px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="space-y-3">
                  {activeMealPlan.meals.map((meal) => (
                    <div key={meal.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <Utensils className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="font-medium">{meal.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({meal.time})</span>
                      </div>
                      
                      <div className="pl-6 space-y-1">
                        {meal.foods.map((food) => (
                          <div key={food.id} className="flex items-center justify-between text-sm">
                            <span>{food.name}</span>
                            <span className="text-gray-500">
                              {food.quantity} {food.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Calories</p>
                    <p className="font-semibold">{activeMealPlan.targetCalories}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Protein</p>
                    <p className="font-semibold">{activeMealPlan.targetProtein}g</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Carbs</p>
                    <p className="font-semibold">{activeMealPlan.targetCarbs}g</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Fat</p>
                    <p className="font-semibold">{activeMealPlan.targetFat}g</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Utensils className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No active meal plan</p>
                <button className="btn-primary">Create Meal Plan</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;