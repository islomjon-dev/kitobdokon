import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book } from '../data/books';
import { Lang } from '../data/translations';

interface CartItem {
  book: Book;
  quantity: number;
}

interface Order {
  id: string;
  trackingNumber: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    region: string;
    city: string;
    address: string;
    comment: string;
  };
  paymentMethod: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

interface StoreState {
  // Language
  lang: Lang;
  setLang: (lang: Lang) => void;
  
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  
  // Favorites
  favorites: string[];
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  
  // Auth
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  
  // Orders
  orders: Order[];
  createOrder: (customerInfo: Order['customerInfo'], paymentMethod: string) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Promo
  promoCode: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const generateTrackingNumber = () => 'BM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Language
      lang: 'uz',
      setLang: (lang) => set({ lang }),
      
      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => {
        const newDark = !state.darkMode;
        if (newDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newDark };
      }),
      
      // Cart
      cart: [],
      addToCart: (book, quantity = 1) => set((state) => {
        const existing = state.cart.find(item => item.book.id === book.id);
        if (existing) {
          return {
            cart: state.cart.map(item =>
              item.book.id === book.id
                ? { ...item, quantity: Math.min(item.quantity + quantity, book.stock) }
                : item
            )
          };
        }
        return { cart: [...state.cart, { book, quantity: Math.min(quantity, book.stock) }] };
      }),
      removeFromCart: (bookId) => set((state) => ({
        cart: state.cart.filter(item => item.book.id !== bookId)
      })),
      updateQuantity: (bookId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.book.id === bookId ? { ...item, quantity } : item
        )
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const state = get();
        let total = state.cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
        if (state.promoCode === 'BOOK10') total *= 0.9;
        if (state.promoCode === 'BOOK20') total *= 0.8;
        return Math.round(total);
      },
      getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
      
      // Favorites
      favorites: [],
      toggleFavorite: (bookId) => set((state) => ({
        favorites: state.favorites.includes(bookId)
          ? state.favorites.filter(id => id !== bookId)
          : [...state.favorites, bookId]
      })),
      isFavorite: (bookId) => get().favorites.includes(bookId),
      
      // Auth
      user: null,
      login: (email, password) => {
        // Admin login
        if (email === 'admin@bookmarket.uz' && password === 'admin123') {
          set({ user: { id: 'admin1', name: 'Admin', email, phone: '', isAdmin: true } });
          return true;
        }
        // Regular user - check localStorage users
        const users = JSON.parse(localStorage.getItem('bm_users') || '[]');
        const found = users.find((u: any) => u.email === email && u.password === password);
        if (found) {
          set({ user: { id: found.id, name: found.name, email: found.email, phone: found.phone, isAdmin: false } });
          return true;
        }
        return false;
      },
      register: (name, email, phone, password) => {
        const users = JSON.parse(localStorage.getItem('bm_users') || '[]');
        if (users.find((u: any) => u.email === email)) return false;
        const newUser = { id: generateId(), name, email, phone, password };
        users.push(newUser);
        localStorage.setItem('bm_users', JSON.stringify(users));
        set({ user: { id: newUser.id, name, email, phone, isAdmin: false } });
        return true;
      },
      logout: () => set({ user: null }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
      
      // Orders
      orders: [],
      createOrder: (customerInfo, paymentMethod) => {
        const state = get();
        const trackingNumber = generateTrackingNumber();
        const order: Order = {
          id: generateId(),
          trackingNumber,
          items: [...state.cart],
          total: state.getCartTotal(),
          status: 'pending',
          customerInfo,
          paymentMethod,
          createdAt: new Date().toISOString()
        };
        set((s) => ({ orders: [order, ...s.orders], cart: [] }));
        return trackingNumber;
      },
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
      })),
      
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Promo
      promoCode: null,
      applyPromo: (code) => {
        const validCodes = ['BOOK10', 'BOOK20'];
        if (validCodes.includes(code.toUpperCase())) {
          set({ promoCode: code.toUpperCase() });
          return true;
        }
        return false;
      },
      removePromo: () => set({ promoCode: null }),
    }),
    {
      name: 'bookmarket-store',
      partialize: (state) => ({
        lang: state.lang,
        darkMode: state.darkMode,
        cart: state.cart,
        favorites: state.favorites,
        user: state.user,
        orders: state.orders,
        promoCode: state.promoCode,
      })
    }
  )
);
