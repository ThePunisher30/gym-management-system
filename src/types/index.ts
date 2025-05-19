// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  profilePicture?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  MEMBER = 'member',
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role?: UserRole;
}

// Membership types
export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in months
  features: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
}

// Class booking types
export interface GymClass {
  id: string;
  name: string;
  description: string;
  trainerId: string;
  trainerName: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  location: string;
}

export interface ClassBooking {
  id: string;
  userId: string;
  classId: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'attended';
}

// Workout tracking types
export interface Workout {
  id: string;
  userId: string;
  date: string;
  exercises: Exercise[];
  duration: number; // in minutes
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  category: string;
}

export interface Set {
  reps: number;
  weight: number;
  completed: boolean;
}

// Diet planning types
export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  meals: Meal[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
}

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Payment types
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  date: string;
  method: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet';
  status: 'completed' | 'pending' | 'failed';
  description: string;
}