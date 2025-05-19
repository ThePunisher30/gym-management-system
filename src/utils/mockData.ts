import { 
  User, 
  UserRole, 
  MembershipPlan, 
  GymClass, 
  Workout, 
  Exercise, 
  MealPlan, 
  Meal, 
  Food, 
  Payment 
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@fithub.com',
    role: UserRole.ADMIN,
    createdAt: '2023-01-01T00:00:00Z',
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'John Trainer',
    email: 'trainer@fithub.com',
    role: UserRole.TRAINER,
    createdAt: '2023-01-15T00:00:00Z',
    profilePicture: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'Jane Member',
    email: 'member@fithub.com',
    role: UserRole.MEMBER,
    createdAt: '2023-02-01T00:00:00Z',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Mock Membership Plans
export const mockMembershipPlans: MembershipPlan[] = [
  {
    id: '1',
    name: 'Basic',
    description: 'Access to basic gym facilities and equipment',
    price: 999,
    duration: 1,
    features: [
      'Access to gym equipment',
      'Locker room access',
      'Free water dispenser',
      'Basic fitness assessment'
    ],
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Full access to gym facilities and group classes',
    price: 1999,
    duration: 1,
    features: [
      'All Basic features',
      'Unlimited group classes',
      'Personalized workout plan',
      'Nutrition consultation',
      'Access to sauna'
    ],
  },
  {
    id: '3',
    name: 'Elite',
    description: 'Complete fitness solution with personal training',
    price: 3999,
    duration: 1,
    features: [
      'All Premium features',
      '4 personal training sessions/month',
      'Advanced fitness assessment',
      'Custom diet plan',
      'Exclusive member events',
      'Guest passes (2/month)'
    ],
  },
  {
    id: '4',
    name: 'Annual Basic',
    description: 'Basic plan with annual commitment',
    price: 9990,
    duration: 12,
    features: [
      'All Basic features',
      '2 months free',
      'Free gym bag',
      'Fitness e-book collection'
    ],
  },
  {
    id: '5',
    name: 'Annual Premium',
    description: 'Premium plan with annual commitment',
    price: 19990,
    duration: 12,
    features: [
      'All Premium features',
      '2 months free',
      'Free gym bag and water bottle',
      'Quarterly fitness assessment',
      'Fitness e-book collection'
    ],
  },
];

// Mock Gym Classes
export const mockGymClasses: GymClass[] = [
  {
    id: '1',
    name: 'Morning Yoga',
    description: 'Start your day with energizing yoga poses and breathing exercises',
    trainerId: '2',
    trainerName: 'John Trainer',
    startTime: '2023-06-01T06:00:00Z',
    endTime: '2023-06-01T07:00:00Z',
    capacity: 15,
    enrolled: 8,
    category: 'Yoga',
    level: 'beginner',
    location: 'Studio 1',
  },
  {
    id: '2',
    name: 'HIIT Blast',
    description: 'High-intensity interval training to maximize calorie burn',
    trainerId: '2',
    trainerName: 'John Trainer',
    startTime: '2023-06-01T08:00:00Z',
    endTime: '2023-06-01T09:00:00Z',
    capacity: 12,
    enrolled: 10,
    category: 'Cardio',
    level: 'intermediate',
    location: 'Main Floor',
  },
  {
    id: '3',
    name: 'Strength Fundamentals',
    description: 'Learn proper form and technique for strength training',
    trainerId: '2',
    trainerName: 'John Trainer',
    startTime: '2023-06-01T10:00:00Z',
    endTime: '2023-06-01T11:00:00Z',
    capacity: 10,
    enrolled: 5,
    category: 'Strength',
    level: 'beginner',
    location: 'Weight Room',
  },
  {
    id: '4',
    name: 'Spin Class',
    description: 'High-energy indoor cycling with music and motivation',
    trainerId: '2',
    trainerName: 'John Trainer',
    startTime: '2023-06-01T17:00:00Z',
    endTime: '2023-06-01T18:00:00Z',
    capacity: 20,
    enrolled: 15,
    category: 'Cardio',
    level: 'intermediate',
    location: 'Spin Studio',
  },
  {
    id: '5',
    name: 'Advanced Powerlifting',
    description: 'Technical training for experienced lifters',
    trainerId: '2',
    trainerName: 'John Trainer',
    startTime: '2023-06-01T19:00:00Z',
    endTime: '2023-06-01T20:30:00Z',
    capacity: 8,
    enrolled: 6,
    category: 'Strength',
    level: 'advanced',
    location: 'Weight Room',
  },
];

// Mock Workouts
export const mockWorkouts: Workout[] = [
  {
    id: '1',
    userId: '3',
    date: '2023-05-28T00:00:00Z',
    exercises: [
      {
        id: '1',
        name: 'Bench Press',
        category: 'Chest',
        sets: [
          { reps: 10, weight: 60, completed: true },
          { reps: 8, weight: 70, completed: true },
          { reps: 6, weight: 80, completed: true },
        ],
      },
      {
        id: '2',
        name: 'Squat',
        category: 'Legs',
        sets: [
          { reps: 12, weight: 80, completed: true },
          { reps: 10, weight: 90, completed: true },
          { reps: 8, weight: 100, completed: true },
        ],
      },
    ],
    duration: 60,
    notes: 'Felt strong today, increased weights on all exercises',
  },
  {
    id: '2',
    userId: '3',
    date: '2023-05-30T00:00:00Z',
    exercises: [
      {
        id: '3',
        name: 'Pull-ups',
        category: 'Back',
        sets: [
          { reps: 8, weight: 0, completed: true },
          { reps: 6, weight: 0, completed: true },
          { reps: 5, weight: 0, completed: true },
        ],
      },
      {
        id: '4',
        name: 'Deadlift',
        category: 'Back',
        sets: [
          { reps: 8, weight: 100, completed: true },
          { reps: 6, weight: 120, completed: true },
          { reps: 4, weight: 140, completed: true },
        ],
      },
    ],
    duration: 45,
  },
];

// Mock Meal Plans
export const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    userId: '3',
    name: 'Weight Loss Plan',
    description: 'Calorie-controlled plan for steady weight loss',
    targetCalories: 1800,
    targetProtein: 150,
    targetCarbs: 150,
    targetFat: 60,
    meals: [
      {
        id: '1',
        name: 'Breakfast',
        time: '08:00',
        foods: [
          {
            id: '1',
            name: 'Oatmeal',
            quantity: 50,
            unit: 'g',
            calories: 180,
            protein: 6,
            carbs: 30,
            fat: 3,
          },
          {
            id: '2',
            name: 'Banana',
            quantity: 1,
            unit: 'piece',
            calories: 105,
            protein: 1.3,
            carbs: 27,
            fat: 0.4,
          },
        ],
      },
      {
        id: '2',
        name: 'Lunch',
        time: '13:00',
        foods: [
          {
            id: '3',
            name: 'Grilled Chicken Breast',
            quantity: 150,
            unit: 'g',
            calories: 240,
            protein: 45,
            carbs: 0,
            fat: 6,
          },
          {
            id: '4',
            name: 'Brown Rice',
            quantity: 100,
            unit: 'g',
            calories: 110,
            protein: 2.5,
            carbs: 23,
            fat: 0.9,
          },
          {
            id: '5',
            name: 'Mixed Vegetables',
            quantity: 150,
            unit: 'g',
            calories: 75,
            protein: 4,
            carbs: 15,
            fat: 0.5,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    userId: '3',
    name: 'Muscle Building Plan',
    description: 'High protein plan for muscle growth',
    targetCalories: 2800,
    targetProtein: 220,
    targetCarbs: 280,
    targetFat: 80,
    meals: [
      {
        id: '3',
        name: 'Breakfast',
        time: '07:00',
        foods: [
          {
            id: '6',
            name: 'Eggs',
            quantity: 4,
            unit: 'piece',
            calories: 280,
            protein: 24,
            carbs: 0,
            fat: 20,
          },
          {
            id: '7',
            name: 'Whole Grain Toast',
            quantity: 2,
            unit: 'slice',
            calories: 160,
            protein: 8,
            carbs: 30,
            fat: 2,
          },
        ],
      },
      {
        id: '4',
        name: 'Post-Workout',
        time: '11:00',
        foods: [
          {
            id: '8',
            name: 'Whey Protein',
            quantity: 30,
            unit: 'g',
            calories: 120,
            protein: 24,
            carbs: 3,
            fat: 1.5,
          },
          {
            id: '9',
            name: 'Banana',
            quantity: 1,
            unit: 'piece',
            calories: 105,
            protein: 1.3,
            carbs: 27,
            fat: 0.4,
          },
        ],
      },
    ],
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: '1',
    userId: '3',
    amount: 1999,
    date: '2023-05-01T00:00:00Z',
    method: 'credit_card',
    status: 'completed',
    description: 'Premium Membership - May 2023',
  },
  {
    id: '2',
    userId: '3',
    amount: 500,
    date: '2023-05-15T00:00:00Z',
    method: 'upi',
    status: 'completed',
    description: 'Personal Training Session',
  },
];

// Authentication helpers
export const mockLogin = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      // In a real app, we would check the password hash
      if (user && password === 'password') {
        resolve(user);
      } else {
        resolve(null);
      }
    }, 800);
  });
};

export const mockRegister = (name: string, email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        resolve(null);
      } else {
        const newUser: User = {
          id: `${mockUsers.length + 1}`,
          name,
          email,
          role: UserRole.MEMBER,
          createdAt: new Date().toISOString(),
        };
        mockUsers.push(newUser);
        resolve(newUser);
      }
    }, 800);
  });
};