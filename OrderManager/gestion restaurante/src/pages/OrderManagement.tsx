import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useData } from '../contexts/DataContext';
import { Order, OrderWithProducts } from '../types';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const OrderManagement: React.FC = () => {
  const { orders, products, tables, updateOrderStatus } = useData();
  const [selectedStatus, setSelectedStatus] = useState<Order['status']>('all' as Order['status']);

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'preparing':
        return <AlertTriangle className="h-5 w-5" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const calculateTotal = (order: OrderWithProducts) => {
    return order.products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">Filter by status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Order['status'])}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{String(order.id).substring(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Table {tables.find(t => t.id === order.table.id)?.name || 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status === 'paid' ? 'Paid' : 'Pending Payment'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        {order.products.map((item, index) => {
                          const product = products.find(p => p.id === item.product.id);
                          return (
                            <li key={index} className="py-5">
                              <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {product?.name || 'Unknown Product'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity} × ${item.product.price.toFixed(2)}
                                  </p>
                                  {item.product.description && (
                                    <p className="text-sm text-gray-500 italic">
                                      Note: {item.product.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex-shrink-0">
                                  <p className="text-sm font-medium text-gray-900">
                                    ${(item.quantity * item.product.price).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Ordered at: {new Date(order.timestamp).toLocaleString()}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        Total: ${calculateTotal(order).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderManagement;