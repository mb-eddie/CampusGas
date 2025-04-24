import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Truck,
  Clock,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Order } from "../../data/orders";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  // Get status info
  const getStatusInfo = () => {
    switch (order.status) {
      case "pending":
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          label: "Pending",
          color: "text-amber-500",
          bgColor: "bg-amber-50",
        };
      case "accepted":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          label: "Accepted",
          color: "text-green-500",
          bgColor: "bg-green-50",
        };
      case "in_delivery":
        return {
          icon: <Truck className="h-5 w-5 text-indigo-500" />,
          label: "In Delivery",
          color: "text-indigo-500",
          bgColor: "bg-indigo-50",
        };
      case "delivered":
        return {
          icon: <ShoppingBag className="h-5 w-5 text-teal-500" />,
          label: "Delivered",
          color: "text-teal-500",
          bgColor: "bg-teal-50",
        };
      case "cancelled":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          label: "Cancelled",
          color: "text-red-500",
          bgColor: "bg-red-50",
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
          label: "Unknown",
          color: "text-gray-500",
          bgColor: "bg-gray-50",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">{order.gasType.name}</h3>
            <p className="text-gray-600 text-sm mt-1">
              Order #{order.id.split("-")[1]} •{" "}
              {formatDistanceToNow(order.orderDate, { addSuffix: true })}
            </p>
          </div>
          <div
            className={`${statusInfo.bgColor} ${statusInfo.color} py-1 px-3 rounded-full flex items-center text-sm font-medium`}
          >
            {statusInfo.icon}
            <span className="ml-1">{statusInfo.label}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-medium">
              {order.quantity} x {order.gasType.weight}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-medium">
              KES {order.totalPrice.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Station</p>
            <p className="font-medium">{order.station.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment</p>
            <p className="font-medium">
              {order.paymentMethod === "cash"
                ? "Cash on Delivery"
                : order.paymentMethod === "mobile_money"
                  ? "Mobile Money"
                  : "Credit Card"}
            </p>
          </div>
        </div>

        {/* Station response (if available) */}
        {order.stationResponse && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-medium mb-2">Station Response:</h4>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Estimated Delivery:</span>{" "}
                {order.stationResponse.estimatedDelivery} minutes
              </p>
              {order.stationResponse.message && (
                <p className="text-sm mt-1">
                  <span className="font-medium">Message:</span>{" "}
                  {order.stationResponse.message}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Responded{" "}
                {formatDistanceToNow(order.stationResponse.responseDate, {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        )}

        {/* Delivery address */}
        <div className="mt-4 text-sm">
          <span className="font-medium">Delivery Address:</span>{" "}
          {order.deliveryAddress}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
