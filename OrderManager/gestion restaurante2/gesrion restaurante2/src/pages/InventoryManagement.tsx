import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useData } from '../contexts/DataContext';
import { Ingredient, Supplier } from '../types';
import { Plus, AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';

const InventoryManagement: React.FC = () => {
  const { ingredients, suppliers, updateIngredientStock } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showLowStock, setShowLowStock] = useState(false);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(ingredients.map(i => i.category)))];

  // Filter ingredients
  const filteredIngredients = ingredients
    .filter(ingredient => 
      (selectedCategory === 'all' || ingredient.category === selectedCategory) &&
      (!showLowStock || ingredient.stock <= ingredient.minStock)
    );

  const handleStockChange = (id: string, change: number) => {
    updateIngredientStock(id, change);
  };

  const getSupplierName = (supplierId?: string) => {
    if (!supplierId) return 'No supplier assigned';
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Unknown supplier';
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Manage your ingredients and stock levels</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showLowStock}
                onChange={(e) => setShowLowStock(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 mr-2"
              />
              <span className="text-sm text-gray-600">Show Low Stock Only</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className={`bg-white rounded-lg shadow-sm overflow-hidden border-l-4 ${
                ingredient.stock <= ingredient.minStock
                  ? 'border-red-500'
                  : ingredient.stock <= ingredient.minStock * 1.5
                    ? 'border-yellow-500'
                    : 'border-green-500'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{ingredient.name}</h3>
                    <p className="text-sm text-gray-500">{ingredient.category}</p>
                  </div>
                  {ingredient.stock <= ingredient.minStock && (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Low Stock</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Current Stock:</span>
                    <span className="font-medium">
                      {ingredient.stock} {ingredient.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Minimum Stock:</span>
                    <span className="font-medium">
                      {ingredient.minStock} {ingredient.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Supplier:</span>
                    <span className="font-medium">
                      {getSupplierName(ingredient.supplierId)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between space-x-2">
                    <button
                      onClick={() => handleStockChange(ingredient.id, -1)}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <TrendingDown className="h-4 w-4 mr-1" />
                      Decrease
                    </button>
                    <button
                      onClick={() => handleStockChange(ingredient.id, 1)}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Increase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No ingredients found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default InventoryManagement;