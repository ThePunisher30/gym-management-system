import React, { useState } from 'react';
import { Utensils, Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { mockMealPlans } from '../../utils/mockData';
import { MealPlan, Meal, Food } from '../../types';

const DietPlanner: React.FC = () => {
  const [activePlan, setActivePlan] = useState<MealPlan>(mockMealPlans[0]);
  const [editMode, setEditMode] = useState(false);
  const [editedPlan, setEditedPlan] = useState<MealPlan | null>(null);
  
  const handleEditPlan = () => {
    setEditedPlan({ ...activePlan });
    setEditMode(true);
  };
  
  const handleCancelEdit = () => {
    setEditedPlan(null);
    setEditMode(false);
  };
  
  const handleSavePlan = () => {
    if (editedPlan) {
      setActivePlan(editedPlan);
      setEditMode(false);
      setEditedPlan(null);
      // In a real app, this would make an API call to save the changes
      alert('Meal plan updated successfully!');
    }
  };
  
  const handleAddMeal = () => {
    if (editedPlan) {
      const newMeal: Meal = {
        id: `meal-${Date.now()}`,
        name: 'New Meal',
        time: '12:00',
        foods: [],
      };
      
      setEditedPlan({
        ...editedPlan,
        meals: [...editedPlan.meals, newMeal],
      });
    }
  };
  
  const handleRemoveMeal = (mealId: string) => {
    if (editedPlan) {
      setEditedPlan({
        ...editedPlan,
        meals: editedPlan.meals.filter(meal => meal.id !== mealId),
      });
    }
  };
  
  const handleAddFood = (mealId: string) => {
    if (editedPlan) {
      const newFood: Food = {
        id: `food-${Date.now()}`,
        name: 'New Food',
        quantity: 100,
        unit: 'g',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };
      
      setEditedPlan({
        ...editedPlan,
        meals: editedPlan.meals.map(meal => {
          if (meal.id === mealId) {
            return {
              ...meal,
              foods: [...meal.foods, newFood],
            };
          }
          return meal;
        }),
      });
    }
  };
  
  const handleRemoveFood = (mealId: string, foodId: string) => {
    if (editedPlan) {
      setEditedPlan({
        ...editedPlan,
        meals: editedPlan.meals.map(meal => {
          if (meal.id === mealId) {
            return {
              ...meal,
              foods: meal.foods.filter(food => food.id !== foodId),
            };
          }
          return meal;
        }),
      });
    }
  };
  
  const handleChangeMealName = (mealId: string, name: string) => {
    if (editedPlan) {
      setEditedPlan({
        ...editedPlan,
        meals: editedPlan.meals.map(meal => {
          if (meal.id === mealId) {
            return { ...meal, name };
          }
          return meal;
        }),
      });
    }
  };
  
  const handleChangeMealTime = (mealId: string, time: string) => {
    if (editedPlan) {
      setEditedPlan({
        ...editedPlan,
        meals: editedPlan.meals.map(meal => {
          if (meal.id === mealId) {
            return { ...meal, time };
          }
          return meal;
        }),
      });
    }
  };
  
  const handleChangeFoodDetail = (mealId: string, foodId: string, field: keyof Food, value: string | number) => {
    if (editedPlan) {
      setEditedPlan({
        ...editedPlan,
        meals: editedPlan.meals.map(meal => {
          if (meal.id === mealId) {
            return {
              ...meal,
              foods: meal.foods.map(food => {
                if (food.id === foodId) {
                  return { ...food, [field]: value };
                }
                return food;
              }),
            };
          }
          return meal;
        }),
      });
    }
  };
  
  // Calculate nutrition totals
  const calculateTotals = (plan: MealPlan) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    
    plan.meals.forEach(meal => {
      meal.foods.forEach(food => {
        totalCalories += food.calories;
        totalProtein += food.protein;
        totalCarbs += food.carbs;
        totalFat += food.fat;
      });
    });
    
    return { totalCalories, totalProtein, totalCarbs, totalFat };
  };
  
  const { totalCalories, totalProtein, totalCarbs, totalFat } = calculateTotals(activePlan);
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-secondary to-secondary-700 rounded-card p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Diet Planner</h1>
        <p className="opacity-90">Create and manage your meal plans to achieve your fitness goals.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Meal plan list sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">My Meal Plans</h2>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <Plus className="h-5 w-5 text-secondary" />
              </button>
            </div>
            
            <div className="space-y-2">
              {mockMealPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    if (!editMode) {
                      setActivePlan(plan);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activePlan.id === plan.id
                      ? 'bg-secondary-100 text-secondary'
                      : 'hover:bg-gray-100'
                  } ${editMode && activePlan.id !== plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-xs text-gray-500">
                    {plan.targetCalories} calories | {plan.meals.length} meals
                  </div>
                </button>
              ))}
            </div>
            
            <button className="btn-secondary w-full mt-4">
              <Plus className="h-4 w-4 mr-1" />
              Create New Plan
            </button>
          </div>
        </div>
        
        {/* Active meal plan */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">{activePlan.name}</h2>
                <p className="text-gray-500">{activePlan.description}</p>
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
                      onClick={handleSavePlan}
                      className="btn-secondary py-1 px-3"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditPlan}
                    className="btn-secondary py-1 px-3"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Plan
                  </button>
                )}
              </div>
            </div>
            
            {/* Nutrition summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500 mb-1">Calories</div>
                <div className="text-xl font-bold">{totalCalories}</div>
                <div className="text-xs text-gray-500">
                  Target: {activePlan.targetCalories}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500 mb-1">Protein</div>
                <div className="text-xl font-bold">{totalProtein}g</div>
                <div className="text-xs text-gray-500">
                  Target: {activePlan.targetProtein}g
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500 mb-1">Carbs</div>
                <div className="text-xl font-bold">{totalCarbs}g</div>
                <div className="text-xs text-gray-500">
                  Target: {activePlan.targetCarbs}g
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500 mb-1">Fat</div>
                <div className="text-xl font-bold">{totalFat}g</div>
                <div className="text-xs text-gray-500">
                  Target: {activePlan.targetFat}g
                </div>
              </div>
            </div>
            
            {/* Meals */}
            <div className="space-y-6">
              {(editMode ? editedPlan?.meals : activePlan.meals).map((meal) => (
                <div key={meal.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 flex justify-between items-center">
                    {editMode ? (
                      <div className="flex items-center space-x-3 flex-1">
                        <input
                          type="text"
                          value={meal.name}
                          onChange={(e) => handleChangeMealName(meal.id, e.target.value)}
                          className="form-input py-1"
                        />
                        <input
                          type="time"
                          value={meal.time}
                          onChange={(e) => handleChangeMealTime(meal.id, e.target.value)}
                          className="form-input py-1 w-32"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-medium">{meal.name}</h3>
                        <div className="text-sm text-gray-500">{meal.time}</div>
                      </div>
                    )}
                    
                    {editMode && (
                      <button
                        onClick={() => handleRemoveMeal(meal.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-4">
                    {meal.foods.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Food
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Calories
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Protein
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Carbs
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fat
                              </th>
                              {editMode && (
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {meal.foods.map((food) => (
                              <tr key={food.id}>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  {editMode ? (
                                    <input
                                      type="text"
                                      value={food.name}
                                      onChange={(e) => handleChangeFoodDetail(meal.id, food.id, 'name', e.target.value)}
                                      className="form-input py-1 text-sm"
                                    />
                                  ) : (
                                    <span className="text-sm">{food.name}</span>
                                  )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  {editMode ? (
                                    <div className="flex items-center space-x-1">
                                      <input
                                        type="number"
                                        value={food.quantity}
                                        onChange={(e) => handleChangeFoodDetail(meal.id, food.id, 'quantity', parseInt(e.target.value))}
                                        className="form-input py-1 text-sm w-16"
                                      />
                                      <input
                                        type="text"
                                        value={food.unit}
                                        onChange={(e) => handleChangeFoodDetail(meal.id, food.id, 'unit', e.target.value)}
                                        className="form-input py-1 text-sm w-12"
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-sm">{food.quantity} {food.unit}</span>
                                  )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  {editMode ? (
                                    <input
                                      type="number"
                                      value={food.calories}
                                      onChange={(e) => handleChangeFoodDetail(meal.id, food.id, 'calories', parseInt(e.target.value))}
                                      className="form-input py-1 text-sm w-16"
                                    />
                                  ) : (
                                    <span className="text-sm">{food.calories}</span>
                                  )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  {editMode ? (
                                    <input
                                      type="number"
                                      value={food.protein}
                                      onChange={(e) => handleChangeFoodDetail(meal.id, food.id, 'protein', parseFloat(e.target.value))}
                                      className="form-input py-1 text-sm w-16"
                                    />
                                  ) : (
                                    <span className="text-sm">{food.protein}g</span>
                                  )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  {editMode ? (
                                    <input
                                      type="number"
                                      value={food.carbs}
                                      onChange={(e) => handleChangeFoodDetail(meal.id, food.id, 'carbs', parseFloat(e.target.value))}
                                      className="form-input py-1 text-sm w-16"
                                    />
                                  ) : (
                                    <span className="text-sm">{food.carbs}g</span>
                                  )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  {editMode ? (
                                    <input
                                      type="number"
                                      value={food.fat}
                                      onChange={(e) => handleChangeFoodDetail(meal.id, food.id, 'fat', parseFloat(e.target.value))}
                                      className="form-input py-1 text-sm w-16"
                                    />
                                  ) : (
                                    <span className="text-sm">{food.fat}g</span>
                                  )}
                                </td>
                                {editMode && (
                                  <td className="px-3 py-2 whitespace-nowrap text-right">
                                    <button
                                      onClick={() => handleRemoveFood(meal.id, food.id)}
                                      className="text-gray-500 hover:text-red-500"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No foods added to this meal yet.
                      </div>
                    )}
                    
                    {editMode && (
                      <button
                        onClick={() => handleAddFood(meal.id)}
                        className="mt-3 flex items-center text-sm text-secondary hover:text-secondary-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Food
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {editMode && (
                <button
                  onClick={handleAddMeal}
                  className="btn-outline w-full flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Meal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;