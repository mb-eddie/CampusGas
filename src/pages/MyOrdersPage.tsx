import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders, Order } from '../data/orders';
import OrderCard from '../components/orders/OrderCard';

const MyOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Load orders
  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.id);
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    }
  }, [user]);
  
  // Apply filter when status filter changes
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, orders]);
  
  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
  });
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">
            Track your gas refill requests and view station responses.
          </p>
        </div>
        
        {/* Filter */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <span className="mr-3 text-gray-600">Filter by status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input py-1 pl-3 pr-8"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="in_delivery">In Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <Link to="/request-refill" className="btn btn-primary mt-2 sm:mt-0">
            <ShoppingBag className="h-4 w-4 mr-2" />
            New Refill Request
          </Link>
        </div>
        
        {/* Orders list */}
        {sortedOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
            {sortedOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex justify-center">
              <Package className="h-16 w-16 text-gray-300 mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {statusFilter !== 'all' 
                ? `You don't have any ${statusFilter} orders.` 
                : "You haven't placed any gas refill requests yet."}
            </p>
            <Link to="/request-refill" className="btn btn-primary">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Request a Gas Refill
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;