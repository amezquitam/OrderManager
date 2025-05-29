import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Restaurant, User, Product, Order, TableEntity, 
  Ingredient, Supplier, Promotion, 
  OrderDetail,
  OrderWithProducts
} from '../types';
import { initializeData } from '../utils/initData';
import { axiosInstance } from '../axios';

const DEFAULT_RESTAURANT_ID = 1;

interface DataContextType {
  // Data collections
  restaurants: Restaurant[];
  users: User[];
  products: Product[];
  productsDefault: Product[];
  orders: OrderWithProducts[];
  tables: TableEntity[];
  ingredients: Ingredient[];
  suppliers: Supplier[];
  promotions: Promotion[];
  
  // Restaurant methods
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void;
  updateRestaurant: (id: string, restaurant: Partial<Restaurant>) => void;
  deleteRestaurant: (id: string) => void;
  
  // User methods
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  // Product methods
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // ProductDefault methods
  addProductDefault: (product: Omit<Product, 'id'>) => void;
  updateProductDefault: (id: string, product: Partial<Product>) => void;
  deleteProductDefault: (id: string) => void;
  
  // Order methods
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // Table methods
  updateTableStatus: (id: string, isOccupied: boolean) => void;
  
  // Ingredient methods
  updateIngredientStock: (id: string, quantity: number) => void;

  // Helpers
  getRestaurantById: (id: string) => Restaurant | undefined;
  getUserById: (id: string) => User | undefined;
  getProductById: (id: string) => Product | undefined;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};


const getProducts = async (restaurantId: number) => {
  const productsRaw = await axiosInstance.get('/product');
  const products = productsRaw.data as Product[];
  return products.filter(product => product.restaurant.id === restaurantId);
};


function groupOrderDetailsToOrdersWithProducts(
  orderDetails: OrderDetail[]
): OrderWithProducts[] {
  const grouped = new Map<string, OrderDetail[]>();

  for (const detail of orderDetails) {
    const orderId = detail.order.id;
    if (!grouped.has(orderId)) {
      grouped.set(orderId, []);
    }
    grouped.get(orderId)!.push(detail);
  }

  const result: OrderWithProducts[] = [];

  for (const details of grouped.values()) {
    const { order } = details[0];
    result.push({
      id: order.id,
      client: order.client,
      status: order.status,
      timestamp: new Date(order.timestamp).toISOString(),
      restaurant: details[0].product.restaurant,
      products: details.map((d) => ({
        product: d.product,
        quantity: d.quantity,
      })),
      table: order.table
    });
  }

  return result;
}

const getTables = async (restaurantId: number) => {
  const rawTables = await axiosInstance.get('/table-entity');
  const tables = rawTables.data as TableEntity[];
  return tables.filter(table => table.restaurant.id === restaurantId);
};

const getOrders = async (restaurantId: number) => {
  const rawOrderDetails = await axiosInstance.get('/order-detail');
  const orderDetails = rawOrderDetails.data as OrderDetail[];
  const orders = groupOrderDetailsToOrdersWithProducts(orderDetails);
  return orders.filter(order => order.restaurant.id === restaurantId);
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsDefault, setProductsDefault] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderWithProducts[]>([]);
  const [tables, setTables] = useState<TableEntity[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  // Initialize data on first load
  useEffect(() => {
    const loadData = async () => {
      const storedRestaurants = localStorage.getItem('restaurants');
      const storedUsers = localStorage.getItem('users');
      const storedProducts = await getProducts(DEFAULT_RESTAURANT_ID);
      const storedProductsDefault = localStorage.getItem('products');
      const storedOrders = await getOrders(DEFAULT_RESTAURANT_ID);
      const storedTables = await getTables(DEFAULT_RESTAURANT_ID);
      const storedIngredients = localStorage.getItem('ingredients');
      const storedSuppliers = localStorage.getItem('suppliers');
      const storedPromotions = localStorage.getItem('promotions');

      if (!storedRestaurants || !storedUsers || !storedProducts || !storedProductsDefault) {
        const initialData = initializeData();

        setRestaurants(initialData.restaurants);
        setUsers(initialData.users);
        setProducts(initialData.products);
        setProductsDefault(initialData.products);
        setOrders(initialData.orders);
        setTables(initialData.tables);
        setIngredients(initialData.ingredients);
        setSuppliers(initialData.suppliers);
        setPromotions(initialData.promotions);

        localStorage.setItem('restaurants', JSON.stringify(initialData.restaurants));
        localStorage.setItem('users', JSON.stringify(initialData.users));
        localStorage.setItem('products', JSON.stringify(initialData.products));
        localStorage.setItem('orders', JSON.stringify(initialData.orders));
        localStorage.setItem('tables', JSON.stringify(initialData.tables));
        localStorage.setItem('ingredients', JSON.stringify(initialData.ingredients));
        localStorage.setItem('suppliers', JSON.stringify(initialData.suppliers));
        localStorage.setItem('promotions', JSON.stringify(initialData.promotions));
      } else {
        setRestaurants(JSON.parse(storedRestaurants));
        setUsers(JSON.parse(storedUsers));
        setProducts(storedProducts);
        setProductsDefault(JSON.parse(storedProductsDefault));
        setOrders(storedOrders);
        setTables(storedTables);
        setIngredients(JSON.parse(storedIngredients || '[]'));
        setSuppliers(JSON.parse(storedSuppliers || '[]'));
        setPromotions(JSON.parse(storedPromotions || '[]'));
      }
    };

    loadData();
  }, []);

  // Sync localStorage when state changes
  useEffect(() => {
    if (restaurants.length > 0) localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    if (users.length > 0) localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // useEffect(() => {
  //   if (products.length > 0) localStorage.setItem('products', JSON.stringify(products));
  // }, [products]);

  useEffect(() => {
    if (productsDefault.length > 0) localStorage.setItem('products', JSON.stringify(productsDefault));
  }, [productsDefault]);

  useEffect(() => {
    if (orders.length > 0) localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (tables.length > 0) localStorage.setItem('tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    if (ingredients.length > 0) localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    if (suppliers.length > 0) localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    if (promotions.length > 0) localStorage.setItem('promotions', JSON.stringify(promotions));
  }, [promotions]);

  // Restaurant methods
  const addRestaurant = (restaurant: Omit<Restaurant, 'id'>) => {
    const newRestaurant = { ...restaurant, id: uuidv4() };
    setRestaurants([...restaurants, newRestaurant]);
  };

  const updateRestaurant = (id: string, restaurant: Partial<Restaurant>) => {
    setRestaurants(restaurants.map(r => 
      r.id === id ? { ...r, ...restaurant } : r
    ));
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
  };

  // User methods
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: uuidv4() };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, user: Partial<User>) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, ...user } : u
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // Product methods
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: uuidv4() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, ...product } : p
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // ProductDefault methods
  const addProductDefault = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: uuidv4() };
    setProductsDefault([...productsDefault, newProduct]);
  };

  const updateProductDefault = (id: string, product: Partial<Product>) => {
    setProductsDefault(productsDefault.map(p => 
      p.id === id ? { ...p, ...product } : p
    ));
  };

  const deleteProductDefault = (id: string) => {
    setProductsDefault(productsDefault.filter(p => p.id !== id));
  };

  // Order methods
  const addOrder = (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder = { 
      ...order, 
      id: uuidv4(), 
      status: 'pending', 
      createdAt: new Date().toISOString() 
    };
    setOrders([...orders, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => 
      o.id === id ? { ...o, status, 
        ...(status === 'ready' ? { readyAt: new Date().toISOString() } : {}) 
      } : o
    ));
  };

  // Table methods
  const updateTableStatus = (id: string, isOccupied: boolean) => {
    setTables(tables.map(t => 
      t.id === id ? { ...t, isOccupied } : t
    ));
  };

  // Ingredient methods
  const updateIngredientStock = (id: string, quantity: number) => {
    setIngredients(ingredients.map(i => 
      i.id === id ? { ...i, stock: i.stock + quantity } : i
    ));
  };

  // Helper methods
  const getRestaurantById = (id: string) => {
    return restaurants.find(r => r.id === id);
  };

  const getUserById = (id: string) => {
    return users.find(u => u.id === id);
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const refreshData = () => {
    const storedRestaurants = localStorage.getItem('restaurants');
    const storedUsers = localStorage.getItem('users');
    const storedProducts = localStorage.getItem('products');
    const storedOrders = localStorage.getItem('orders');
    const storedTables = localStorage.getItem('tables');
    const storedIngredients = localStorage.getItem('ingredients');
    const storedSuppliers = localStorage.getItem('suppliers');
    const storedPromotions = localStorage.getItem('promotions');

    if (storedRestaurants) setRestaurants(JSON.parse(storedRestaurants));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedProducts) setProductsDefault(JSON.parse(storedProducts));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedTables) setTables(JSON.parse(storedTables));
    if (storedIngredients) setIngredients(JSON.parse(storedIngredients));
    if (storedSuppliers) setSuppliers(JSON.parse(storedSuppliers));
    if (storedPromotions) setPromotions(JSON.parse(storedPromotions));
  };

  const value = {
    restaurants,
    users,
    products,
    productsDefault,
    orders,
    tables,
    ingredients,
    suppliers,
    promotions,
    
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    
    addUser,
    updateUser,
    deleteUser,
    
    addProduct,
    updateProduct,
    deleteProduct,

    addProductDefault,
    updateProductDefault,
    deleteProductDefault,
    
    addOrder,
    updateOrderStatus,
    
    updateTableStatus,
    
    updateIngredientStock,

    getRestaurantById,
    getUserById,
    getProductById,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
