import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ShoppingBag, Check, AlertCircle } from 'lucide-react';
import StationSelector from '../components/refill/StationSelector';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import gasTypes, { getGasTypeById } from '../data/gasTypes';
import stations from '../data/stations';
import { addOrder } from '../data/orders';
import { GasType } from '../types/GasType';

// Form validation schema
const RequestRefillSchema = Yup.object().shape({
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  deliveryAddress: Yup.string()
    .required('Delivery address is required')
    .min(10, 'Address is too short'),
  paymentMethod: Yup.string()
    .required('Payment method is required')
    .oneOf(['cash', 'mobile_money', 'credit_card'], 'Invalid payment method'),
  notes: Yup.string(),
});

interface FormValues {
  quantity: number;
  deliveryAddress: string;
  paymentMethod: 'cash' | 'mobile_money' | 'credit_card';
  notes: string;
}

const RequestRefillPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  
  const [selectedGasType, setSelectedGasType] = useState<GasType | null>(null);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Set initial gas type if id is provided
  useEffect(() => {
    if (id) {
      const gasType = getGasTypeById(id);
      if (gasType) {
        setSelectedGasType(gasType);
      }
    }
  }, [id]);
  
  const initialValues: FormValues = {
    quantity: 1,
    deliveryAddress: '',
    paymentMethod: 'cash',
    notes: '',
  };
  
  const handleSubmit = async (values: FormValues) => {
    if (!selectedGasType || !selectedStationId || !user) {
      addNotification({
        userId: 'system',
        message: 'Please select a gas type and station before submitting',
        type: 'error',
      });
      return;
    }
    
    const station = stations.find(s => s.id === selectedStationId);
    if (!station) {
      return;
    }
    
    // Calculate total price (gas price * quantity + delivery fee)
    const totalPrice = (selectedGasType.price * values.quantity) + station.deliveryFee;
    
    // Add order to local storage
    const newOrder = addOrder({
      userId: user.id,
      gasType: selectedGasType,
      station,
      quantity: values.quantity,
      totalPrice,
      deliveryAddress: values.deliveryAddress,
      paymentMethod: values.paymentMethod,
      notes: values.notes,
    });
    
    // Show success notification
    addNotification({
      userId: user.id,
      message: 'Your refill request has been submitted successfully!',
      type: 'success',
    });
    
    // Set success state
    setIsSuccess(true);
    
    // Redirect to orders page after 3 seconds
    setTimeout(() => {
      navigate('/my-orders');
    }, 3000);
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Request Gas Refill</h1>
          <p className="text-gray-600">
            Select your gas type, preferred station, and provide delivery details.
          </p>
        </div>
        
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center max-w-2xl mx-auto fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Request Submitted!</h2>
            <p className="text-green-700 mb-6">
              Your gas refill request has been successfully submitted. You will be redirected to your orders page.
            </p>
            <button
              onClick={() => navigate('/my-orders')}
              className="btn btn-primary"
            >
              View My Orders
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Gas type selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Select Gas Type</h2>
                
                {selectedGasType ? (
                  <div className="flex items-start border p-4 rounded-lg">
                    <div className="w-24 h-24 flex-shrink-0 mr-4 overflow-hidden rounded">
                      <img 
                        src={selectedGasType.image} 
                        alt={selectedGasType.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{selectedGasType.name}</h3>
                        <span className="font-bold text-teal-600">${selectedGasType.price.toFixed(2)}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {selectedGasType.type} - {selectedGasType.size} ({selectedGasType.weight})
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {selectedGasType.description}
                      </p>
                      <button
                        className="mt-3 text-teal-600 hover:text-teal-700 text-sm flex items-center"
                        onClick={() => setSelectedGasType(null)}
                      >
                        Change gas type
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {gasTypes.filter(g => g.inStock).map(gasType => (
                        <button
                          key={gasType.id}
                          className="bg-white border rounded-lg p-3 hover:shadow transition text-left flex items-center"
                          onClick={() => setSelectedGasType(gasType)}
                        >
                          <div className="w-16 h-16 flex-shrink-0 mr-3 overflow-hidden rounded">
                            <img 
                              src={gasType.image} 
                              alt={gasType.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{gasType.name}</h3>
                            <div className="text-xs text-gray-600 mt-1">
                              {gasType.weight} - ${gasType.price.toFixed(2)}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Station selection */}
              {selectedGasType && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <StationSelector 
                    stations={stations} 
                    selectedStationId={selectedStationId}
                    onSelectStation={setSelectedStationId}
                  />
                </div>
              )}
              
              {/* Order details form */}
              {selectedGasType && selectedStationId && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
                  
                  <Formik
                    initialValues={initialValues}
                    validationSchema={RequestRefillSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <div>
                          <label htmlFor="quantity" className="form-label">Quantity</label>
                          <Field
                            id="quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            className="form-input"
                          />
                          <ErrorMessage name="quantity" component="div" className="form-error" />
                        </div>
                        
                        <div>
                          <label htmlFor="deliveryAddress" className="form-label">Delivery Address</label>
                          <Field
                            id="deliveryAddress"
                            name="deliveryAddress"
                            as="textarea"
                            rows={3}
                            className="form-input"
                            placeholder="Enter your full delivery address"
                          />
                          <ErrorMessage name="deliveryAddress" component="div" className="form-error" />
                        </div>
                        
                        <div>
                          <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                          <Field
                            id="paymentMethod"
                            name="paymentMethod"
                            as="select"
                            className="form-input"
                          >
                            <option value="cash">Cash on Delivery</option>
                            <option value="mobile_money">Mobile Money</option>
                            <option value="credit_card">Credit Card</option>
                          </Field>
                          <ErrorMessage name="paymentMethod" component="div" className="form-error" />
                        </div>
                        
                        <div>
                          <label htmlFor="notes" className="form-label">
                            Additional Notes <span className="text-gray-500 text-xs">(Optional)</span>
                          </label>
                          <Field
                            id="notes"
                            name="notes"
                            as="textarea"
                            rows={2}
                            className="form-input"
                            placeholder="Any special instructions for delivery"
                          />
                          <ErrorMessage name="notes" component="div" className="form-error" />
                        </div>
                        
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <span className="w-5 h-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></span>
                                Submitting...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center">
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Submit Refill Request
                              </span>
                            )}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {selectedGasType ? (
                  <div>
                    <div className="border-b pb-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Gas Type:</span>
                        <span className="font-medium">{selectedGasType.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Size:</span>
                        <span>{selectedGasType.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span>${selectedGasType.price.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {selectedStationId && (
                      <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Station:</span>
                          <span className="font-medium">
                            {stations.find(s => s.id === selectedStationId)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Fee:</span>
                          <span>${stations.find(s => s.id === selectedStationId)?.deliveryFee.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="border-b pb-4 mb-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-teal-600">
                          ${selectedStationId
                            ? (selectedGasType.price + (stations.find(s => s.id === selectedStationId)?.deliveryFee || 0)).toFixed(2)
                            : selectedGasType.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        *Total will update based on quantity
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700">
                      <div className="flex items-start mb-2">
                        <ShoppingBag className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>Select a station and fill in delivery details to complete your order.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-center py-8">
                    <div>
                      <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                      <p className="text-gray-600">
                        Please select a gas type to see order summary
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestRefillPage;