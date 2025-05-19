import React, { useState } from 'react';
import { Dumbbell, Plus, Trash2, Calendar, Clock, Edit, Save, X } from 'lucide-react';
import { mockWorkouts } from '../../utils/mockData';
import { Workout, Exercise, Set } from '../../types';

const WorkoutTracker: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(mockWorkouts[0] || null);
  const [editMode, setEditMode] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState<Workout | null>(null);
  
  const handleEditWorkout = () => {
    if (activeWorkout) {
      setEditedWorkout({ ...activeWorkout });
      setEditMode(true);
    }
  };
  
  const handleCancelEdit = () => {
    setEditedWorkout(null);
    setEditMode(false);
  };
  
  const handleSaveWorkout = () => {
    if (editedWorkout) {
      // Update the active workout
      setActiveWorkout(editedWorkout);
      
      // Update the workouts list
      setWorkouts(workouts.map(workout => 
        workout.id === editedWorkout.id ? editedWorkout : workout
      ));
      
      setEditMode(false);
      setEditedWorkout(null);
      
      // In a real app, this would make an API call to save the changes
      alert('Workout updated successfully!');
    }
  };
  
  const handleAddExercise = () => {
    if (editedWorkout) {
      const newExercise: Exercise = {
        id: `exercise-${Date.now()}`,
        name: 'New Exercise',
        category: 'Other',
        sets: [
          { reps: 10, weight: 0, completed: false }
        ],
      };
      
      setEditedWorkout({
        ...editedWorkout,
        exercises: [...editedWorkout.exercises, newExercise],
      });
    }
  };
  
  const handleRemoveExercise = (exerciseId: string) => {
    if (editedWorkout) {
      setEditedWorkout({
        ...editedWorkout,
        exercises: editedWorkout.exercises.filter(exercise => exercise.id !== exerciseId),
      });
    }
  };
  
  const handleAddSet = (exerciseId: string) => {
    if (editedWorkout) {
      setEditedWorkout({
        ...editedWorkout,
        exercises: editedWorkout.exercises.map(exercise => {
          if (exercise.id === exerciseId) {
            const lastSet = exercise.sets[exercise.sets.length - 1];
            const newSet: Set = {
              reps: lastSet ? lastSet.reps : 10,
              weight: lastSet ? lastSet.weight : 0,
              completed: false,
            };
            
            return {
              ...exercise,
              sets: [...exercise.sets, newSet],
            };
          }
          return exercise;
        }),
      });
    }
  };
  
  const handleRemoveSet = (exerciseId: string, setIndex: number) => {
    if (editedWorkout) {
      setEditedWorkout({
        ...editedWorkout,
        exercises: editedWorkout.exercises.map(exercise => {
          if (exercise.id === exerciseId) {
            return {
              ...exercise,
              sets: exercise.sets.filter((_, index) => index !== setIndex),
            };
          }
          return exercise;
        }),
      });
    }
  };
  
  const handleChangeExerciseName = (exerciseId: string, name: string) => {
    if (editedWorkout) {
      setEditedWorkout({
        ...editedWorkout,
        exercises: editedWorkout.exercises.map(exercise => {
          if (exercise.id === exerciseId) {
            return { ...exercise, name };
          }
          return exercise;
        }),
      });
    }
  };
  
  const handleChangeExerciseCategory = (exerciseId: string, category: string) => {
    if (editedWorkout) {
      setEditedWorkout({
        ...editedWorkout,
        exercises: editedWorkout.exercises.map(exercise => {
          if (exercise.id === exerciseId) {
            return { ...exercise, category };
          }
          return exercise;
        }),
      });
    }
  };
  
  const handleChangeSetDetail = (exerciseId: string, setIndex: number, field: keyof Set, value: number | boolean) => {
    if (editedWorkout) {
      setEditedWorkout({
        ...editedWorkout,
        exercises: editedWorkout.exercises.map(exercise => {
          if (exercise.id === exerciseId) {
            return {
              ...exercise,
              sets: exercise.sets.map((set, index) => {
                if (index === setIndex) {
                  return { ...set, [field]: value };
                }
                return set;
              }),
            };
          }
          return exercise;
        }),
      });
    }
  };
  
  const handleToggleSetCompletion = (exerciseId: string, setIndex: number) => {
    if (activeWorkout && !editMode) {
      const updatedWorkout = {
        ...activeWorkout,
        exercises: activeWorkout.exercises.map(exercise => {
          if (exercise.id === exerciseId) {
            return {
              ...exercise,
              sets: exercise.sets.map((set, index) => {
                if (index === setIndex) {
                  return { ...set, completed: !set.completed };
                }
                return set;
              }),
            };
          }
          return exercise;
        }),
      };
      
      setActiveWorkout(updatedWorkout);
      
      // Update the workouts list
      setWorkouts(workouts.map(workout => 
        workout.id === updatedWorkout.id ? updatedWorkout : workout
      ));
    }
  };
  
  const handleCreateNewWorkout = () => {
    const newWorkout: Workout = {
      id: `workout-${Date.now()}`,
      userId: '3', // Assuming the current user's ID
      date: new Date().toISOString(),
      exercises: [],
      duration: 0,
    };
    
    setWorkouts([newWorkout, ...workouts]);
    setActiveWorkout(newWorkout);
    setEditedWorkout(newWorkout);
    setEditMode(true);
  };
  
  if (!activeWorkout) {
    return (
      <div className="text-center py-12">
        <Dumbbell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No workouts found</h3>
        <p className="text-gray-500 mb-4">
          Start tracking your workouts to see your progress.
        </p>
        <button
          onClick={handleCreateNewWorkout}
          className="btn-primary"
        >
          Create New Workout
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Workout Tracker</h1>
        <p className="opacity-90">Track your workouts and monitor your progress over time.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workout list sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">My Workouts</h2>
              <button
                onClick={handleCreateNewWorkout}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="h-5 w-5 text-primary" />
              </button>
            </div>
            
            <div className="space-y-2">
              {workouts.map((workout) => (
                <button
                  key={workout.id}
                  onClick={() => {
                    if (!editMode) {
                      setActiveWorkout(workout);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeWorkout.id === workout.id
                      ? 'bg-primary-100 text-primary'
                      : 'hover:bg-gray-100'
                  } ${editMode && activeWorkout.id !== workout.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-medium">
                    {new Date(workout.date).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {workout.exercises.length} exercises | {workout.duration} min
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Active workout */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {new Date(activeWorkout.date).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{activeWorkout.duration} minutes</span>
                </div>
              </div>
              
              <div>
                {editMode ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      className="btn-outline py-1 px-3"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveWorkout}
                      className="btn-primary py-1 px-3"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditWorkout}
                    className="btn-primary py-1 px-3"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Workout
                  </button>
                )}
              </div>
            </div>
            
            {/* Exercises */}
            <div className="space-y-6">
              {(editMode ? editedWorkout?.exercises : activeWorkout.exercises).map((exercise) => (
                <div key={exercise.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 flex justify-between items-center">
                    {editMode ? (
                      <div className="flex items-center space-x-3 flex-1">
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => handleChangeExerciseName(exercise.id, e.target.value)}
                          className="form-input py-1"
                          placeholder="Exercise name"
                        />
                        <select
                          value={exercise.category}
                          onChange={(e) => handleChangeExerciseCategory(exercise.id, e.target.value)}
                          className="form-input py-1"
                        >
                          <option value="Chest">Chest</option>
                          <option value="Back">Back</option>
                          <option value="Legs">Legs</option>
                          <option value="Shoulders">Shoulders</option>
                          <option value="Arms">Arms</option>
                          <option value="Core">Core</option>
                          <option value="Cardio">Cardio</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-medium">{exercise.name}</h3>
                        <div className="text-sm text-gray-500">{exercise.category}</div>
                      </div>
                    )}
                    
                    {editMode && (
                      <button
                        onClick={() => handleRemoveExercise(exercise.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Set
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Weight (kg)
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Reps
                            </th>
                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Completed
                            </th>
                            {editMode && (
                              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {exercise.sets.map((set, setIndex) => (
                            <tr key={setIndex}>
                              <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm">{setIndex + 1}</span>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap">
                                {editMode ? (
                                  <input
                                    type="number"
                                    value={set.weight}
                                    onChange={(e) => handleChangeSetDetail(exercise.id, setIndex, 'weight', parseInt(e.target.value))}
                                    className="form-input py-1 text-sm w-20"
                                  />
                                ) : (
                                  <span className="text-sm">{set.weight}</span>
                                )}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap">
                                {editMode ? (
                                  <input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) => handleChangeSetDetail(exercise.id, setIndex, 'reps', parseInt(e.target.value))}
                                    className="form-input py-1 text-sm w-20"
                                  />
                                ) : (
                                  <span className="text-sm">{set.reps}</span>
                                )}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-center">
                                <input
                                  type="checkbox"
                                  checked={set.completed}
                                  onChange={() => {
                                    if (editMode) {
                                      handleChangeSetDetail(exercise.id, setIndex, 'completed', !set.completed);
                                    } else {
                                      handleToggleSetCompletion(exercise.id, setIndex);
                                    }
                                  }}
                                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                              </td>
                              {editMode && (
                                <td className="px-3 py-2 whitespace-nowrap text-right">
                                  <button
                                    onClick={() => handleRemoveSet(exercise.id, setIndex)}
                                    className="text-gray-500 hover:text-red-500"
                                    disabled={exercise.sets.length <= 1}
                                  >
                                    <Trash2 className={`h-4 w-4 ${exercise.sets.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {editMode && (
                      <button
                        onClick={() => handleAddSet(exercise.id)}
                        className="mt-3 flex items-center text-sm text-primary hover:text-primary-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Set
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {editMode && (
                <button
                  onClick={handleAddExercise}
                  className="btn-outline w-full flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Exercise
                </button>
              )}
              
              {!editMode && activeWorkout.exercises.length === 0 && (
                <div className="text-center py-8">
                  <Dumbbell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No exercises added to this workout yet.</p>
                  <button
                    onClick={handleEditWorkout}
                    className="btn-primary"
                  >
                    Add Exercises
                  </button>
                </div>
              )}
            </div>
            
            {activeWorkout.notes && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-700">{activeWorkout.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;