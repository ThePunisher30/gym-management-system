import React from 'react';
import { Check, X } from 'lucide-react';
import { mockMembershipPlans } from '../../utils/mockData';
import { useNavigate } from 'react-router-dom';

const MembershipPlans: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSelectPlan = (planId: string) => {
    navigate(`/payment?planId=${planId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Choose Your Membership Plan</h1>
        <p className="text-gray-600">
          Select the plan that best fits your fitness goals and budget. All plans include access to our state-of-the-art facilities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {mockMembershipPlans.slice(0, 3).map((plan) => (
          <div 
            key={plan.id} 
            className={`card border-2 ${
              plan.id === '2' ? 'border-primary' : 'border-transparent'
            } hover:border-primary transition-all duration-200`}
          >
            {plan.id === '2' && (
              <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
            </div>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">₹{plan.price}</span>
              <span className="text-gray-500">/{plan.duration === 1 ? 'month' : 'year'}</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => handleSelectPlan(plan.id)}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                plan.id === '2'
                  ? 'bg-primary text-white hover:bg-primary-700'
                  : 'bg-white text-primary border-2 border-primary hover:bg-primary-50'
              }`}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Annual Plans</h2>
        <p className="text-gray-600 mb-6">
          Save up to 20% with our annual membership plans. Commit to your fitness journey and enjoy additional benefits.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockMembershipPlans.slice(3).map((plan) => (
            <div key={plan.id} className="card border hover:border-primary transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-500">/year</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                {plan.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className="mt-4 w-full py-2 bg-white text-primary border border-primary rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Can I cancel my membership anytime?</h3>
            <p className="mt-1 text-gray-600">
              Monthly memberships can be cancelled with 15 days notice. Annual memberships have a 3-month minimum commitment.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Are there any joining fees?</h3>
            <p className="mt-1 text-gray-600">
              No, we don't charge any joining fees or hidden costs. The price you see is what you pay.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Can I freeze my membership?</h3>
            <p className="mt-1 text-gray-600">
              Yes, you can freeze your membership for up to 30 days per year for medical or travel reasons.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Do you offer student discounts?</h3>
            <p className="mt-1 text-gray-600">
              Yes, we offer a 10% discount for students with a valid student ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;