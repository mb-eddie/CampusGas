import { User } from '../context/AuthContext';
import { Station } from './stations';
import { GasType } from '../types/GasType';

export interface OrderStatus {
  pending: 'pending';
  accepted: 'accepted';
  inDelivery: 'in_delivery';
  delivered: 'delivered';
  cancelled: 'cancelled';
}

export interface Order {
  id: string;
  userId: string;
  gasType: GasType;
  station: Station;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'accepted' | 'in_delivery' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  deliveryAddress: string;
  paymentMethod: 'cash' | 'mobile_money' | 'credit_card';
  notes?: string;
  stationResponse?: {
    responseDate: Date;
    estimatedDelivery: string;
    message?: string;
  };
}

// Function to get mock orders for a user
export const getUserOrders = (userId: string): Order[] => {
  const savedOrders = localStorage.getItem('campusGasOrders');
  if (!savedOrders) return [];
  
  const orders: Order[] = JSON.parse(savedOrders).map((order: any) => ({
    ...order,
    orderDate: new Date(order.orderDate),
    deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : undefined,
    stationResponse: order.stationResponse 
      ? { ...order.stationResponse, responseDate: new Date(order.stationResponse.responseDate) } 
      : undefined
  }));
  
  return orders.filter(order => order.userId === userId);
};

// Function to get all orders (for admin)
export const getAllOrders = (): Order[] => {
  const savedOrders = localStorage.getItem('campusGasOrders');
  if (!savedOrders) return [];
  
  return JSON.parse(savedOrders).map((order: any) => ({
    ...order,
    orderDate: new Date(order.orderDate),
    deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : undefined,
    stationResponse: order.stationResponse 
      ? { ...order.stationResponse, responseDate: new Date(order.stationResponse.responseDate) } 
      : undefined
  }));
};

// Function to add a new order
export const addOrder = (order: Omit<Order, 'id' | 'orderDate' | 'status'>): Order => {
  const savedOrders = localStorage.getItem('campusGasOrders');
  const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
  
  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    orderDate: new Date(),
    status: 'pending'
  };
  
  orders.push(newOrder);
  localStorage.setItem('campusGasOrders', JSON.stringify(orders));
  
  return newOrder;
};

// Function to update an order
export const updateOrder = (orderId: string, updates: Partial<Order>): Order | null => {
  const savedOrders = localStorage.getItem('campusGasOrders');
  if (!savedOrders) return null;
  
  const orders: Order[] = JSON.parse(savedOrders);
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) return null;
  
  const updatedOrder = { ...orders[orderIndex], ...updates };
  orders[orderIndex] = updatedOrder;
  
  localStorage.setItem('campusGasOrders', JSON.stringify(orders));
  return updatedOrder;
};

// Function to respond to an order (for station admins)
export const respondToOrder = (
  orderId: string, 
  estimatedDelivery: string, 
  message?: string
): Order | null => {
  const savedOrders = localStorage.getItem('campusGasOrders');
  if (!savedOrders) return null;
  
  const orders: Order[] = JSON.parse(savedOrders);
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) return null;
  
  const updatedOrder = { 
    ...orders[orderIndex], 
    status: 'accepted' as const,
    stationResponse: {
      responseDate: new Date(),
      estimatedDelivery,
      message
    } 
  };
  
  orders[orderIndex] = updatedOrder;
  localStorage.setItem('campusGasOrders', JSON.stringify(orders));
  
  return updatedOrder;
};