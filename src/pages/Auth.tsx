import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { books as allBooks } from '../data/books';
import { BookCard } from '../components/BookCard';

export function LoginPage() {
  const { lang, darkMode, login } = useStore();
  const t = translations[lang];
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/profile');
    } else {
      setError(lang === 'uz' ? "Email yoki parol noto'g'ri" : lang === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password');
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none focus:border-[#C9A96E]`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className={`w-full max-w-md p-8 rounded-2xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-lg`}>
        <div className="text-center mb-8">
          <BookOpen size={40} className="mx-auto text-[#C9A96E] mb-3" />
          <h1 className="font-serif text-2xl font-bold">{t['auth.login']}</h1>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">{t['auth.email']}</label>
            <input type="email" className={inputClass} value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{t['auth.password']}</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} className={inputClass} value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-[#C9A96E]" />
              {lang === 'uz' ? 'Eslab qolish' : lang === 'ru' ? 'Запомнить' : 'Remember me'}
            </label>
            <Link to="/forgot-password" className="text-[#C9A96E] hover:underline">{t['auth.forgotPassword']}</Link>
          </div>
          <button type="submit" className="w-full btn-primary">{t['auth.signIn']}</button>
        </form>

        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t['auth.noAccount']} <Link to="/register" className="text-[#C9A96E] font-medium hover:underline">{t['auth.signUp']}</Link>
        </p>

        <div className={`mt-6 p-3 rounded-lg text-xs ${darkMode ? 'bg-[#1A1A1A] text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
          <p className="font-medium mb-1">Demo:</p>
          <p>Admin: admin@bookmarket.uz / admin123</p>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { lang, darkMode, register } = useStore();
  const t = translations[lang];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(lang === 'uz' ? "Parollar mos kelmadi" : lang === 'ru' ? 'Пароли не совпадают' : 'Passwords do not match');
      return;
    }
    if (register(formData.name, formData.email, formData.phone, formData.password)) {
      navigate('/profile');
    } else {
      setError(lang === 'uz' ? "Bu email allaqachon ro'yxatdan o'tgan" : lang === 'ru' ? 'Этот email уже зарегистрирован' : 'This email is already registered');
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none focus:border-[#C9A96E]`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className={`w-full max-w-md p-8 rounded-2xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-lg`}>
        <div className="text-center mb-8">
          <BookOpen size={40} className="mx-auto text-[#C9A96E] mb-3" />
          <h1 className="font-serif text-2xl font-bold">{t['auth.register']}</h1>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">{t['auth.name']}</label>
            <input className={inputClass} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{t['auth.email']}</label>
            <input type="email" className={inputClass} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{t['auth.phone']}</label>
            <input className={inputClass} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{t['auth.password']}</label>
            <input type="password" className={inputClass} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{t['auth.confirmPassword']}</label>
            <input type="password" className={inputClass} value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required />
          </div>
          <button type="submit" className="w-full btn-primary">{t['auth.signUp']}</button>
        </form>

        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t['auth.hasAccount']} <Link to="/login" className="text-[#C9A96E] font-medium hover:underline">{t['auth.signIn']}</Link>
        </p>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const { lang, darkMode, user, orders, favorites, logout } = useStore();
  const t = translations[lang];
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const formatPrice = (price: number) => price.toLocaleString() + ' ' + t['common.currency'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['profile.title']}</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className={`p-6 rounded-xl h-fit ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#4A3728] flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
              {user.name.charAt(0)}
            </div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
          </div>
          <nav className="space-y-1">
            <Link to="/profile" className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${darkMode ? 'bg-[#3D3D3D]' : 'bg-[#F5F0E8]'}`}>
              {t['profile.title']}
            </Link>
            <Link to="/orders" className={`block px-4 py-2.5 rounded-lg text-sm hover:${darkMode ? 'bg-[#3D3D3D]' : 'bg-gray-50'}`}>
              {t['profile.orders']}
            </Link>
            <Link to="/favorites" className={`block px-4 py-2.5 rounded-lg text-sm hover:${darkMode ? 'bg-[#3D3D3D]' : 'bg-gray-50'}`}>
              {t['profile.favorites']} ({favorites.length})
            </Link>
            <Link to="/edit-profile" className={`block px-4 py-2.5 rounded-lg text-sm hover:${darkMode ? 'bg-[#3D3D3D]' : 'bg-gray-50'}`}>
              {t['profile.editProfile']}
            </Link>
            <button onClick={() => { logout(); navigate('/'); }} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50">
              {t['auth.logout']}
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Recent Orders */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
            <h2 className="font-semibold text-lg mb-4">{t['profile.orderHistory']}</h2>
            {orders.length === 0 ? (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t['profile.noOrders']}</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                    <div>
                      <p className="font-medium text-sm">#{order.trackingNumber}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {t[`orders.${order.status}`]}
                      </span>
                      <p className="text-sm font-medium mt-1">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersPage() {
  const { lang, darkMode, orders, user } = useStore();
  const t = translations[lang];

  if (!user) return <LoginPage />;

  const formatPrice = (price: number) => price.toLocaleString() + ' ' + t['common.currency'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['orders.title']}</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">📦</p>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t['profile.noOrders']}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">#{order.trackingNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {t[`orders.${order.status}`]}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} {t['cart.items']}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#C9A96E]">{formatPrice(order.total)}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {order.paymentMethod === 'cash' ? t['checkout.cash'] : order.paymentMethod === 'click' ? 'Click' : order.paymentMethod === 'payme' ? 'Payme' : t['checkout.card']}
                  </p>
                </div>
              </div>
              {/* Items preview */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {order.items.map(item => (
                  <img key={item.book.id} src={item.book.cover} alt="" className="w-12 h-16 rounded object-cover shrink-0" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FavoritesPage() {
  const { lang, darkMode, favorites } = useStore();
  const t = translations[lang];
  const favBooks = allBooks.filter((b) => favorites.includes(b.id));

  if (favBooks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center animate-fade-in">
        <p className="text-4xl mb-4">❤️</p>
        <h1 className="font-serif text-2xl font-bold mb-2">{t['profile.noFavorites']}</h1>
        <Link to="/books" className="btn-primary mt-6 inline-block">{t['nav.books']}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['profile.favorites']} ({favBooks.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {favBooks.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}


