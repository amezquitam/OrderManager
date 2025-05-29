import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, Coffee, ShoppingBag, AlertTriangle,
  Clock, CheckCircle, XCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { products, orders, tables, ingredients } = useData();
  const { isAdmin } = useAuth();
  
  // Calculate stats
  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.isAvailable).length;
  
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const preparingOrders = orders.filter(o => o.status === 'preparing').length;
  const completedOrders = orders.filter(o => o.status === 'ready' || o.status === 'delivered').length;
  
  const totalTables = tables.length;
  const occupiedTables = tables.filter(t => t.isOccupied).length;
  
  const lowStockIngredients = ingredients.filter(i => i.stock <= i.minStock).length;

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your restaurant management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats cards */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Coffee className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Products</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
                <p className="text-sm text-gray-500 ml-2">({availableProducts} available)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <ShoppingBag className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Orders Today</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
                <p className="text-sm text-gray-500 ml-2">({completedOrders} completed)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500 transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 mr-4">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tables</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800">{totalTables}</p>
                <p className="text-sm text-gray-500 ml-2">({occupiedTables} occupied)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500 transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-800">{lowStockIngredients}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Active orders */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Active Orders</h2>
            <Link to="/orders" className="text-sm text-blue-600 hover:text-blue-800">View all</Link>
          </div>
          <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
            {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length > 0 ? (
              orders
                .filter(o => o.status === 'pending' || o.status === 'preparing')
                .map(order => (
                  <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">Order #{order.id.substring(0, 8)}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                        <div className="mt-1">
                          {order.items.map((item, idx) => {
                            const product = products.find(p => p.id === item.productId);
                            return (
                              <p key={idx} className="text-xs text-gray-500">
                                {item.quantity}x {product?.name}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'pending' ? 'Pending' : 'Preparing'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Table {tables.find(t => t.id === order.tableId)?.number || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No active orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent activities */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Recent Activities</h2>
          </div>
          <div className="px-6 py-4 max-h-80 overflow-y-auto">
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Order #12345 was delivered</p>
                  <p className="text-sm text-gray-500">10 minutes ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">New order received from Table 3</p>
                  <p className="text-sm text-gray-500">25 minutes ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Low stock alert: Tomatoes</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Coffee className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Product updated: Spaghetti Bolognese</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/products"
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-colors"
            >
              <Coffee className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Products</h3>
              <p className="text-sm text-gray-500">Add or update menu items</p>
            </Link>
            
            <Link
              to="/orders"
              className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-colors"
            >
              <ShoppingBag className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Orders</h3>
              <p className="text-sm text-gray-500">View and update order status</p>
            </Link>
            
            <Link
              to="/inventory"
              className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-colors"
            >
              <AlertTriangle className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-medium text-gray-900">Check Inventory</h3>
              <p className="text-sm text-gray-500">Update stock and manage ingredients</p>
            </Link>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;