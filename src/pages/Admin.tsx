import { useState } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { books, categories, authors } from '../data/books';
import { BarChart3, BookOpen, Package, ShoppingCart, Users, TrendingUp, Settings, LogOut } from 'lucide-react';

export function AdminPage() {
  const { lang, darkMode, user, orders, logout } = useStore();
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user?.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-xl">{lang === 'uz' ? "Bu sahifa faqat administratorlar uchun" : lang === 'ru' ? "Эта страница только для администраторов" : "This page is for administrators only"}</p>
      </div>
    );
  }

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalRevenue = books.reduce((sum, b) => sum + b.salesCount * b.price, 0);

  const formatPrice = (price: number) => price.toLocaleString() + ' ' + t['common.currency'];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'books', label: lang === 'uz' ? 'Kitoblar' : lang === 'ru' ? 'Книги' : 'Books', icon: <BookOpen size={18} /> },
    { id: 'orders', label: lang === 'uz' ? 'Buyurtmalar' : lang === 'ru' ? 'Заказы' : 'Orders', icon: <ShoppingCart size={18} /> },
    { id: 'inventory', label: lang === 'uz' ? 'Ombor' : lang === 'ru' ? 'Склад' : 'Inventory', icon: <Package size={18} /> },
    { id: 'customers', label: lang === 'uz' ? 'Mijozlar' : lang === 'ru' ? 'Клиенты' : 'Customers', icon: <Users size={18} /> },
    { id: 'analytics', label: lang === 'uz' ? 'Tahlillar' : lang === 'ru' ? 'Аналитика' : 'Analytics', icon: <TrendingUp size={18} /> },
    { id: 'settings', label: lang === 'uz' ? 'Sozlamalar' : lang === 'ru' ? 'Настройки' : 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Sidebar */}
      <aside className={`w-64 shrink-0 ${darkMode ? 'bg-[#242424] border-[#3D3D3D]' : 'bg-[#4A3728]'} text-white hidden lg:flex flex-col`}>
        <div className="p-6 border-b border-white/10">
          <h2 className="font-serif text-xl font-bold">BookMarket</h2>
          <p className="text-xs text-gray-300 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-gray-300'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => { logout(); window.location.href = '/'; }} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-red-300 hover:bg-white/5">
            <LogOut size={18} />
            {t['auth.logout']}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile tabs */}
        <div className="lg:hidden flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 px-4 py-2 gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap ${activeTab === tab.id ? 'bg-[#C9A96E] text-white' : darkMode ? 'bg-[#2D2D2D]' : 'bg-gray-100'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: lang === 'uz' ? 'Jami sotuvlar' : lang === 'ru' ? 'Общие продажи' : 'Total Sales', value: formatPrice(totalRevenue), color: 'text-green-500' },
                  { label: lang === 'uz' ? 'Buyurtmalar' : lang === 'ru' ? 'Заказы' : 'Orders', value: totalOrders, color: 'text-blue-500' },
                  { label: lang === 'uz' ? 'Kitoblar' : lang === 'ru' ? 'Книги' : 'Books', value: books.length, color: 'text-purple-500' },
                  { label: lang === 'uz' ? 'Mijozlar' : lang === 'ru' ? 'Клиенты' : 'Customers', value: '1,247', color: 'text-[#C9A96E]' },
                ].map((stat, i) => (
                  <div key={i} className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                <h3 className="font-semibold mb-4">{lang === 'uz' ? "So'nggi buyurtmalar" : lang === 'ru' ? 'Последние заказы' : 'Recent Orders'}</h3>
                {orders.length === 0 ? (
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'uz' ? "Buyurtmalar yo'q" : lang === 'ru' ? 'Нет заказов' : 'No orders yet'}</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
                          <th className="text-left py-2 font-medium">{lang === 'uz' ? 'Trek' : 'Track'}</th>
                          <th className="text-left py-2 font-medium">{lang === 'uz' ? 'Mijoz' : lang === 'ru' ? 'Клиент' : 'Customer'}</th>
                          <th className="text-left py-2 font-medium">{t['orders.status']}</th>
                          <th className="text-right py-2 font-medium">{t['orders.total']}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id} className={`border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-100'}`}>
                            <td className="py-2 font-mono text-xs">#{order.trackingNumber}</td>
                            <td className="py-2">{order.customerInfo.firstName} {order.customerInfo.lastName}</td>
                            <td className="py-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {t[`orders.${order.status}`]}
                              </span>
                            </td>
                            <td className="py-2 text-right font-medium">{formatPrice(order.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Low Stock Alert */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                <h3 className="font-semibold mb-4">{lang === 'uz' ? 'Kam qolgan kitoblar' : lang === 'ru' ? 'Заканчивающиеся книги' : 'Low Stock Books'}</h3>
                <div className="space-y-2">
                  {books.filter(b => b.stock < 30).map(book => (
                    <div key={book.id} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <img src={book.cover} alt="" className="w-8 h-10 rounded object-cover" />
                        <span className="text-sm font-medium">{book.title[lang]}</span>
                      </div>
                      <span className={`text-sm font-bold ${book.stock < 10 ? 'text-red-500' : 'text-yellow-500'}`}>
                        {book.stock} {lang === 'uz' ? 'dona' : lang === 'ru' ? 'шт.' : 'pcs'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'books' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-2xl font-bold">{lang === 'uz' ? 'Kitoblar boshqaruvi' : lang === 'ru' ? 'Управление книгами' : 'Books Management'}</h1>
                <button className="btn-primary text-sm">+ {lang === 'uz' ? "Yangi kitob" : lang === 'ru' ? 'Новая книга' : 'Add Book'}</button>
              </div>
              <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
                        <th className="text-left p-4 font-medium">{lang === 'uz' ? 'Kitob' : 'Book'}</th>
                        <th className="text-left p-4 font-medium">{t['common.author']}</th>
                        <th className="text-left p-4 font-medium">{t['common.price']}</th>
                        <th className="text-left p-4 font-medium">{t['common.stock']}</th>
                        <th className="text-left p-4 font-medium">{t['common.rating']}</th>
                        <th className="text-right p-4 font-medium">{lang === 'uz' ? 'Amallar' : lang === 'ru' ? 'Действия' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map(book => (
                        <tr key={book.id} className={`border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-100'} hover:${darkMode ? 'bg-[#3D3D3D]' : 'bg-gray-50'}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={book.cover} alt="" className="w-10 h-14 rounded object-cover" />
                              <span className="font-medium">{book.title[lang]}</span>
                            </div>
                          </td>
                          <td className="p-4">{book.author}</td>
                          <td className="p-4">{formatPrice(book.price)}</td>
                          <td className="p-4">
                            <span className={book.stock < 10 ? 'text-red-500 font-bold' : ''}>{book.stock}</span>
                          </td>
                          <td className="p-4">⭐ {book.rating}</td>
                          <td className="p-4 text-right">
                            <button className="text-[#C9A96E] hover:underline text-xs mr-3">{t['common.edit']}</button>
                            <button className="text-red-500 hover:underline text-xs">{t['common.delete']}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">{lang === 'uz' ? 'Buyurtmalar boshqaruvi' : lang === 'ru' ? 'Управление заказами' : 'Orders Management'}</h1>
              {orders.length === 0 ? (
                <div className={`p-12 rounded-xl text-center ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
                  <p className="text-4xl mb-4">📦</p>
                  <p>{lang === 'uz' ? "Hozircha buyurtmalar yo'q" : lang === 'ru' ? 'Пока нет заказов' : 'No orders yet'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-mono font-bold">#{order.trackingNumber}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {order.customerInfo.firstName} {order.customerInfo.lastName} • {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#C9A96E]">{formatPrice(order.total)}</span>
                          <select className={`px-3 py-1.5 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'border-gray-200'}`}>
                            {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <option key={s} value={s} selected={order.status === s}>{t[`orders.${s}`]}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">{lang === 'uz' ? 'Ombor boshqaruvi' : lang === 'ru' ? 'Управление складом' : 'Inventory Management'}</h1>
              <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
                        <th className="text-left p-4 font-medium">ISBN</th>
                        <th className="text-left p-4 font-medium">{lang === 'uz' ? 'Kitob' : 'Book'}</th>
                        <th className="text-left p-4 font-medium">{t['common.stock']}</th>
                        <th className="text-left p-4 font-medium">{lang === 'uz' ? 'Holat' : lang === 'ru' ? 'Статус' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map(book => (
                        <tr key={book.id} className={`border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-100'}`}>
                          <td className="p-4 font-mono text-xs">{book.isbn}</td>
                          <td className="p-4 font-medium">{book.title[lang]}</td>
                          <td className="p-4 font-bold">{book.stock}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              book.stock > 30 ? 'bg-green-100 text-green-700' :
                              book.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {book.stock > 30 ? '✓' : book.stock > 10 ? '⚠' : '⚠️ Low'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">{lang === 'uz' ? 'Mijozlar' : lang === 'ru' ? 'Клиенты' : 'Customers'}</h1>
              <div className={`p-12 rounded-xl text-center ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
                <p className="text-4xl mb-4">👥</p>
                <p>{lang === 'uz' ? "Ro'yxatdan o'tgan mijozlar shu yerda ko'rinadi" : lang === 'ru' ? 'Зарегистрированные клиенты будут здесь' : 'Registered customers will appear here'}</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">{lang === 'uz' ? 'Tahlillar' : lang === 'ru' ? 'Аналитика' : 'Analytics'}</h1>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                  <h3 className="font-semibold mb-4">{lang === 'uz' ? "Eng ko'p sotilgan" : lang === 'ru' ? 'Самые продаваемые' : 'Top Selling'}</h3>
                  {books.sort((a, b) => b.salesCount - a.salesCount).slice(0, 5).map((book, i) => (
                    <div key={book.id} className={`flex items-center justify-between py-2 ${i > 0 ? `border-t ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-100'}` : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#C9A96E]">#{i + 1}</span>
                        <span className="text-sm">{book.title[lang]}</span>
                      </div>
                      <span className="text-sm font-medium">{book.salesCount} sold</span>
                    </div>
                  ))}
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
                  <h3 className="font-semibold mb-4">{lang === 'uz' ? 'Eng yuqori reytingli' : lang === 'ru' ? 'Самые рейтинговые' : 'Top Rated'}</h3>
                  {books.sort((a, b) => b.rating - a.rating).slice(0, 5).map((book, i) => (
                    <div key={book.id} className={`flex items-center justify-between py-2 ${i > 0 ? `border-t ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-100'}` : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#C9A96E]">#{i + 1}</span>
                        <span className="text-sm">{book.title[lang]}</span>
                      </div>
                      <span className="text-sm font-medium">⭐ {book.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">{lang === 'uz' ? 'Sozlamalar' : lang === 'ru' ? 'Настройки' : 'Settings'}</h1>
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm space-y-4`}>
                <div>
                  <label className="text-sm font-medium block mb-1">{lang === 'uz' ? 'Do\'kon nomi' : lang === 'ru' ? 'Название магазина' : 'Store Name'}</label>
                  <input className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'}`} defaultValue="BookMarket" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">{lang === 'uz' ? 'Aloqa email' : lang === 'ru' ? 'Контактный email' : 'Contact Email'}</label>
                  <input className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'}`} defaultValue="info@bookmarket.uz" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">{lang === 'uz' ? 'Telefon' : lang === 'ru' ? 'Телефон' : 'Phone'}</label>
                  <input className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'}`} defaultValue="+998 71 200 00 00" />
                </div>
                <button className="btn-primary">{t['common.save']}</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
