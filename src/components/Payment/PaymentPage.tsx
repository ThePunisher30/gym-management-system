import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Globe, Wallet, Check, ArrowLeft } from 'lucide-react';
import { mockMembershipPlans } from '../../utils/mockData';
import { MembershipPlan } from '../../types';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get('planId');
  
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  useEffect(() => {
    if (planId) {
      const plan = mockMembershipPlans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        navigate('/membership');
      }
    } else {
      navigate('/membership');
    }
  }, [planId, navigate]);
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };
  
  if (!selectedPlan) {
    return <div className="text-center py-12">Loading...</div>;
  }
  
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="bg-success/10 rounded-full p-4 w-20 h-20 mx-auto mb-6">
          <Check className="h-12 w-12 text-success" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your membership has been activated.
        </p>
        <div className="card mb-6">
          <h2 className="font-semibold mb-2">Payment Details</h2>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Plan</span>
            <span className="font-medium">{selectedPlan.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium">₹{selectedPlan.price}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Date</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/membership')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Plans
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Payment form */}
        <div className="md:col-span-2">
          <div className="card">
            <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${
                    paymentMethod === 'credit_card'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <CreditCard className={`h-5 w-5 mr-2 ${
                    paymentMethod === 'credit_card' ? 'text-primary' : 'text-gray-500'
                  }`} />
                  <span className={paymentMethod === 'credit_card' ? 'text-primary' : 'text-gray-700'}>
                    Credit/Debit Card
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${
                    paymentMethod === 'upi'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Smartphone className={`h-5 w-5 mr-2 ${
                    paymentMethod === 'upi' ? 'text-primary' : 'text-gray-500'
                  }`} />
                  <span className={paymentMethod === 'upi' ? 'text-primary' : 'text-gray-700'}>
                    UPI
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('net_banking')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${
                    paymentMethod === 'net_banking'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Globe className={`h-5 w-5 mr-2 ${
                    paymentMethod === 'net_banking' ? 'text-primary' : 'text-gray-500'
                  }`} />
                  <span className={paymentMethod === 'net_banking' ? 'text-primary' : 'text-gray-700'}>
                    Net Banking
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${
                    paymentMethod === 'wallet'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Wallet className={`h-5 w-5 mr-2 ${
                    paymentMethod === 'wallet' ? 'text-primary' : 'text-gray-500'
                  }`} />
                  <span className={paymentMethod === 'wallet' ? 'text-primary' : 'text-gray-700'}>
                    Wallet
                  </span>
                </button>
              </div>
            </div>
            
            <form onSubmit={handlePaymentSubmit}>
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card_number" className="form-label">
                      Card Number
                    </label>
                    <input
                      id="card_number"
                      type="text"
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="form-label">
                        Expiry Date
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        className="form-input"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        className="form-input"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name on Card
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="upi_id" className="form-label">
                      UPI ID
                    </label>
                    <input
                      id="upi_id"
                      type="text"
                      className="form-input"
                      placeholder="name@upi"
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'net_banking' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bank" className="form-label">
                      Select Bank
                    </label>
                    <select id="bank" className="form-input">
                      <option value="">Select your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'wallet' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="wallet" className="form-label">
                      Select Wallet
                    </label>
                    <select id="wallet" className="form-input">
                      <option value="">Select your wallet</option>
                      <option value="paytm">Paytm</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="amazonpay">Amazon Pay</option>
                      <option value="mobikwik">MobiKwik</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full py-3"
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${selectedPlan.price}`}
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>This is a demo payment page. No actual payment will be processed.</p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="md:col-span-1">
          <div className="card sticky top-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{selectedPlan.description}</p>
              <div className="text-sm text-gray-600">
                Duration: {selectedPlan.duration} {selectedPlan.duration === 1 ? 'month' : 'months'}
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{selectedPlan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹0</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>₹{selectedPlan.price}</span>
            </div>
            
            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2">What's included:</p>
              <ul className="space-y-1">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;