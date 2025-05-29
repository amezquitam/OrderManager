import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useData } from '../contexts/DataContext';
import { Order, OrderWithProducts, Product, TableEntity } from '../types';
import { Clock, CheckCircle, XCircle, AlertTriangle, Plus } from 'lucide-react';

const OrderManagement: React.FC = () => {
  const { orders, products, tables, updateOrderStatus, addOrder } = useData();

  const [selectedStatus, setSelectedStatus] = useState<Order['status'] | 'all'>('all');
  const filteredOrders = selectedStatus === 'all' ? orders : orders.filter(order => order.status === selectedStatus);

  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [newOrderTableId, setNewOrderTableId] = useState<string>('');
  const [productsSelected, setProductsSelected] = useState<{ productId: string; quantity: number }[]>([]);

  // Inicializa newOrderTableId cuando las mesas estén disponibles
  useEffect(() => {
    if (tables.length > 0 && !newOrderTableId) {
      setNewOrderTableId(tables[0].id); // Asigna la primera mesa por defecto
    }
  }, [tables, newOrderTableId]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const calculateTotal = (order: OrderWithProducts) => {
    return order.products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleAddProductToOrder = (productId: string) => {
    if (!newOrderTableId) {
      alert('Please select a table first.');
      return;
    }
    setProductsSelected(prev => {
      const found = prev.find(p => p.productId === productId);
      if (found) {
        return prev.map(p => p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setProductsSelected(prev => prev.filter(p => p.productId !== productId));
    } else {
      setProductsSelected(prev => prev.map(p => p.productId === productId ? { ...p, quantity } : p));
    }
  };

  const handleSubmitNewOrder = () => {
    if (!newOrderTableId) {
      alert('Please select a table.');
      return;
    }
    if (productsSelected.length === 0) {
      alert('Please add at least one product.');
      return;
    }

    const table = tables.find(t => t.id === newOrderTableId);
    if (!table) {
      alert('Selected table not found.');
      return;
    }

    try {
      const orderToAdd: Omit<Order, 'id' | 'status' | 'createdAt'> = {
        client: 'Walk-in', // Puedes modificar esto para ingresar el nombre del cliente
        restaurant: table.restaurant,
        table,
        products: productsSelected.map(ps => {
          const prod = products.find(p => p.id === ps.productId);
          if (!prod) throw new Error('Product not found');
          return { product: prod, quantity: ps.quantity };
        }),
      };

      addOrder(orderToAdd);
      setIsAddingOrder(false);
      setProductsSelected([]);
    } catch (error) {
      alert('Error creating order: ' + (error as Error).message);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>

          {!isAddingOrder && (
            <button
              onClick={() => setIsAddingOrder(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              type="button"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Order
            </button>
          )}
        </div>

        {isAddingOrder && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Create New Order</h2>

            {tables.length === 0 ? (
              <p className="mb-4 text-red-600">No tables available. Please add tables first.</p>
            ) : (
              <div className="mb-4">
                <label className="block mb-1 font-medium">Select Table</label>
                <select
                  value={newOrderTableId}
                  onChange={(e) => setNewOrderTableId(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="">-- Select a table --</option>
                  {tables.map(table => (
                    <option key={table.id} value={table.id}>
                      {table.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {products.length === 0 ? (
              <p className="mb-4 text-red-600">No products available. Please add products first.</p>
            ) : (
              <div className="mb-4">
                <label className="block mb-1 font-medium">Add Products</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-40 overflow-y-auto border border-gray-200 p-2 rounded">
                  {products.map(product => (
                    <button
                      key={product.id}
                      type="button"
                      disabled={!newOrderTableId}
                      onClick={() => handleAddProductToOrder(product.id)}
                      className={`border rounded p-2 text-left text-sm ${
                        newOrderTableId ? 'hover:bg-green-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {product.name} - ${product.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {productsSelected.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Products in Order</h3>
                {productsSelected.map(({ productId, quantity }) => {
                  const product = products.find(p => p.id === productId);
                  if (!product) return null;
                  return (
                    <div key={productId} className="flex items-center justify-between mb-2">
                      <div>{product.name}</div>
                      <input
                        type="number"
                        min={0}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(productId, Number(e.target.value))}
                        className="border border-gray-300 rounded w-16 text-center"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex space-x-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsAddingOrder(false);
                  setProductsSelected([]);
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitNewOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={tables.length === 0 || products.length === 0}
              >
                Submit Order
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <label className="text-sm text-gray-600">Filter by status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Order['status'] | 'all')}
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

        <div className="grid grid-cols-1 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
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
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {order.products.map((item, idx) => (
                        <li key={idx} className="py-5 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {products.find(p => p.id === item.product.id)?.name || 'Unknown Product'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity} × ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              ${(item.quantity * item.product.price).toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Ordered at: {new Date(order.timestamp).toLocaleString()}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      Total: ${calculateTotal(order).toFixed(2)}
                    </p>
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
