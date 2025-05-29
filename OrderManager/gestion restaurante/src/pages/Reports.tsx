import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useData } from '../contexts/DataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Download, TrendingUp, Clock, Star } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports: React.FC = () => {
  const { orders, productsDefault: products } = useData();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [salesData, setSalesData] = useState<any>(null);
  const [topProducts, setTopProducts] = useState<any>(null);
  const [averagePreparationTime, setAveragePreparationTime] = useState<number>(0);

  useEffect(() => {
    // Calculate sales data
    const calculateSalesData = () => {
      const now = new Date();
      const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        if (timeRange === 'daily') {
          return orderDate.toDateString() === now.toDateString();
        } else if (timeRange === 'weekly') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        } else {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        }
      });

      // Group orders by date
      const groupedOrders = filteredOrders.reduce((acc: any, order) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += order.totalAmount;
        return acc;
      }, {});

      return {
        labels: Object.keys(groupedOrders),
        datasets: [
          {
            label: 'Sales',
            data: Object.values(groupedOrders),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };
    };

    // Calculate top products
    const calculateTopProducts = () => {
      const productSales = products.map(product => {
        const sales = orders.reduce((total, order) => {
          const orderItem = order.items.find(item => item.productId === product.id);
          return total + (orderItem ? orderItem.quantity : 0);
        }, 0);
        return {
          name: product.name,
          sales,
          rating: product.ratings.length > 0
            ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length
            : 0,
        };
      });

      productSales.sort((a, b) => b.sales - a.sales);

      return {
        labels: productSales.slice(0, 5).map(p => p.name),
        datasets: [
          {
            label: 'Sales',
            data: productSales.slice(0, 5).map(p => p.sales),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
            ],
          },
        ],
      };
    };

    // Calculate average preparation time
    const calculateAveragePreparationTime = () => {
      const completedOrders = orders.filter(order => 
        order.status === 'delivered' && order.readyAt
      );

      if (completedOrders.length === 0) return 0;

      const totalTime = completedOrders.reduce((sum, order) => {
        const startTime = new Date(order.createdAt).getTime();
        const endTime = new Date(order.readyAt!).getTime();
        return sum + (endTime - startTime);
      }, 0);

      return totalTime / completedOrders.length / (1000 * 60); // Convert to minutes
    };

    setSalesData(calculateSalesData());
    setTopProducts(calculateTopProducts());
    setAveragePreparationTime(calculateAveragePreparationTime());
  }, [orders, products, timeRange]);

  const exportData = (format: 'csv' | 'json') => {
    const data = {
      orders,
      products,
      salesData,
      topProducts,
      averagePreparationTime,
    };

    if (format === 'csv') {
      // Convert to CSV
      const csvContent = 'data:text/csv;charset=utf-8,' + 
        orders.map(order => 
          [
            order.id,
            order.customerName,
            order.totalAmount,
            order.status,
            order.createdAt
          ].join(',')
        ).join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'restaurant_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Export as JSON
      const jsonContent = 'data:text/json;charset=utf-8,' + 
        encodeURIComponent(JSON.stringify(data, null, 2));

      const link = document.createElement('a');
      link.setAttribute('href', jsonContent);
      link.setAttribute('download', 'restaurant_data.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">View your restaurant's performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => exportData('csv')}
                className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </button>
              <button
                onClick={() => exportData('json')}
                className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-1" />
                JSON
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {timeRange === 'daily' ? 'Today' : timeRange === 'weekly' ? 'This Week' : 'This Month'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Average Preparation Time</h3>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {averagePreparationTime.toFixed(1)} min
            </p>
            <p className="text-sm text-gray-500 mt-1">Per Order</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              {orders.filter(o => o.status === 'delivered').length} Completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Trend</h3>
            {salesData && <Line data={salesData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }} />}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
            {topProducts && <Bar data={topProducts} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }} />}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status Distribution</h3>
            <Pie data={{
              labels: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
              datasets: [{
                data: [
                  orders.filter(o => o.status === 'pending').length,
                  orders.filter(o => o.status === 'preparing').length,
                  orders.filter(o => o.status === 'ready').length,
                  orders.filter(o => o.status === 'delivered').length,
                  orders.filter(o => o.status === 'cancelled').length,
                ],
                backgroundColor: [
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 99, 132, 0.5)',
                ],
              }],
            }} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right' as const,
                },
              },
            }} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Ratings</h3>
            {products.length > 0 && (
              <Bar data={{
                labels: products.slice(0, 5).map(p => p.name),
                datasets: [{
                  label: 'Average Rating',
                  data: products.slice(0, 5).map(p => 
                    p.ratings.length > 0 
                      ? p.ratings.reduce((sum, r) => sum + r.rating, 0) / p.ratings.length 
                      : 0
                  ),
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                }],
              }} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                  },
                },
              }} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;