import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ShoppingBag, Truck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { getAllOrders, respondToOrder, updateOrder, Order } from '../data/orders';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [response, setResponse] = useState({
    estimatedDelivery: '30',
    message: '',
  });
  
  // Load all orders
  useEffect(() => {
    const allOrders = getAllOrders();
    setOrders(allOrders);
  }, []);
  
  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'pending') return order.status === 'pending';
    if (activeTab === 'accepted') return order.status === 'accepted';
    if (activeTab === 'in_delivery') return order.status === 'in_delivery';
    if (activeTab === 'delivered') return order.status === 'delivered';
    return true; // 'all' tab
  });
  
  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
  });
  
  // Handle order response
  const handleOrderResponse = (orderId: string) => {
    if (!response.estimatedDelivery) {
      addNotification({
        userId: 'system',
        message: 'Please provide an estimated delivery time',
        type: 'error',
      });
      return;
    }
    
    const updatedOrder = respondToOrder(
      orderId, 
      response.estimatedDelivery, 
      response.message
    );
    
    if (updatedOrder) {
      // Update orders state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
      
      // Reset response form
      setResponse({
        estimatedDelivery: '30',
        message: '',
      });
      
      // Close response modal
      setSelectedOrder(null);
      
      // Show success notification
      addNotification({
        userId: 'system',
        message: 'Response sent to customer successfully',
        type: 'success',
      });
    }
  };
  
  // Handle status update
  const handleStatusUpdate = (orderId: string, newStatus: 'in_delivery' | 'delivered' | 'cancelled') => {
    const updatedOrder = updateOrder(orderId, { status: newStatus });
    
    if (updatedOrder) {
      // Update orders state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
      
      // Show success notification
      addNotification({
        userId: 'system',
        message: `Order status updated to ${newStatus.replace('_', ' ')}`,
        type: 'success',
      });
    }
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Station Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage and respond to gas refill requests from customers.
          </p>
        </div>
        
        {/* Tab navigation */}
        <div className="mb-6 bg-white p-2 rounded-lg shadow-sm flex overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'pending' 
                ? 'bg-amber-100 text-amber-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'accepted' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'in_delivery' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('in_delivery')}
          >
            In Delivery
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'delivered' 
                ? 'bg-teal-100 text-teal-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('delivered')}
          >
            Delivered
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'all' 
                ? 'bg-gray-200 text-gray-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
        </div>
        
        {/* Orders table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gas Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedOrders.length > 0 ? (
                  sortedOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id.split('-')[1]}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDistanceToNow(order.orderDate, { addSuffix: true })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">{order.deliveryAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.gasType.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.quantity} x {order.gasType.weight}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          order.status === 'in_delivery' ? 'bg-indigo-100 text-indigo-800' :
                          order.status === 'delivered' ? 'bg-teal-100 text-teal-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-teal-600 hover:text-teal-900 mr-2"
                          >
                            Respond
                          </button>
                        )}
                        
                        {order.status === 'accepted' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'in_delivery')}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                          >
                            Mark In Delivery
                          </button>
                        )}
                        
                        {order.status === 'in_delivery' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'delivered')}
                            className="text-teal-600 hover:text-teal-900 mr-2"
                          >
                            Mark Delivered
                          </button>
                        )}
                        
                        {(order.status === 'pending' || order.status === 'accepted') && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                      <p>No {activeTab !== 'all' ? activeTab : ''} orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Response modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black opacity-40" onClick={() => setSelectedOrder(null)}></div>
              
              <div className="bg-white rounded-lg shadow-xl overflow-hidden z-10 w-full max-w-md">
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Respond to Order #{selectedOrder.id.split('-')[1]}
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Order Details</h4>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-gray-500">Gas Type</p>
                          <p className="font-medium">{selectedOrder.gasType.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-medium">{selectedOrder.quantity} x {selectedOrder.gasType.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-medium">${selectedOrder.totalPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Payment</p>
                          <p className="font-medium">
                            {selectedOrder.paymentMethod === 'cash' ? 'Cash on Delivery' : 
                             selectedOrder.paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Credit Card'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-500">Delivery Address</p>
                        <p className="font-medium">{selectedOrder.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Estimated Delivery Time (minutes)</label>
                    <input
                      type="number"
                      value={response.estimatedDelivery}
                      onChange={(e) => setResponse({ ...response, estimatedDelivery: e.target.value })}
                      className="form-input"
                      min="5"
                      max="180"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="form-label">Message to Customer (Optional)</label>
                    <textarea
                      value={response.message}
                      onChange={(e) => setResponse({ ...response, message: e.target.value })}
                      className="form-input"
                      rows={3}
                      placeholder="Any additional information for the customer..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOrderResponse(selectedOrder.id)}
                      className="btn btn-primary"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;