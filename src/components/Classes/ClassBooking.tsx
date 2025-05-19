import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter, Search, Clock, MapPin, User } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { mockGymClasses } from '../../utils/mockData';
import { GymClass } from '../../types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ClassBooking: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  
  // Get unique categories and levels for filters
  const categories = Array.from(new Set(mockGymClasses.map(c => c.category)));
  const levels = ['beginner', 'intermediate', 'advanced'];
  
  // Filter classes based on search term, category, and level
  const filteredClasses = mockGymClasses.filter(gymClass => {
    const matchesSearch = gymClass.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          gymClass.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? gymClass.category === selectedCategory : true;
    const matchesLevel = selectedLevel ? gymClass.level === selectedLevel : true;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  const handleDateChange = (value: Value) => {
    setDate(value);
    setShowCalendar(false);
  };
  
  const handleBookClass = (classId: string) => {
    // In a real app, this would make an API call to book the class
    console.log(`Booking class with ID: ${classId}`);
    alert('Class booked successfully!');
  };
  
  const formatDate = (date: Value) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    }
    return '';
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-accent to-accent-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Class Booking</h1>
        <p className="opacity-90">Browse and book fitness classes with our expert trainers.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            
            <div className="space-y-4">
              {/* Date filter */}
              <div>
                <label className="form-label">Date</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="form-input flex items-center justify-between w-full"
                  >
                    <span>{formatDate(date)}</span>
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                  </button>
                  
                  {showCalendar && (
                    <div className="absolute z-10 mt-1 w-full">
                      <Calendar
                        onChange={handleDateChange}
                        value={date}
                        className="border border-gray-200 rounded-lg shadow-lg bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Category filter */}
              <div>
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Level filter */}
              <div>
                <label htmlFor="level" className="form-label">
                  Level
                </label>
                <select
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="form-input"
                >
                  <option value="">All Levels</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedLevel('');
                  setSearchTerm('');
                  setDate(new Date());
                }}
                className="btn-outline w-full mt-2"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Classes list */}
        <div className="lg:col-span-3">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
          
          {/* Classes grid */}
          <div className="space-y-4">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((gymClass: GymClass) => (
                <div key={gymClass.id} className="card hover:shadow-card-hover transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <div className={`p-3 rounded-lg mr-4 ${
                          gymClass.category === 'Yoga' ? 'bg-purple-100 text-purple-600' :
                          gymClass.category === 'Cardio' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {gymClass.category === 'Yoga' ? (
                            <CalendarIcon className="h-6 w-6" />
                          ) : gymClass.category === 'Cardio' ? (
                            <CalendarIcon className="h-6 w-6" />
                          ) : (
                            <CalendarIcon className="h-6 w-6" />
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold">{gymClass.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{gymClass.description}</p>
                          
                          <div className="flex flex-wrap gap-y-2">
                            <div className="flex items-center text-sm text-gray-500 mr-4">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(gymClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                {new Date(gymClass.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500 mr-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{gymClass.location}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500 mr-4">
                              <User className="h-4 w-4 mr-1" />
                              <span>{gymClass.trainerName}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">
                          {gymClass.enrolled}/{gymClass.capacity} spots
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          gymClass.level === 'beginner' ? 'bg-green-100 text-green-800' :
                          gymClass.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {gymClass.level.charAt(0).toUpperCase() + gymClass.level.slice(1)}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleBookClass(gymClass.id)}
                        disabled={gymClass.enrolled >= gymClass.capacity}
                        className={`btn ${
                          gymClass.enrolled >= gymClass.capacity
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'btn-accent'
                        }`}
                      >
                        {gymClass.enrolled >= gymClass.capacity ? 'Class Full' : 'Book Class'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No classes found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search term to find classes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassBooking;