import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon, Globe, BookOpen } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, darkMode, toggleDarkMode, getCartCount, favorites, user, logout, searchQuery, setSearchQuery } = useStore();
  const t = translations[lang];
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t['nav.home'] },
    { path: '/books', label: t['nav.books'] },
    { path: '/categories', label: t['nav.categories'] },
    { path: '/authors', label: t['nav.authors'] },
    { path: '/new-arrivals', label: t['nav.new'] },
    { path: '/bestsellers', label: t['nav.bestsellers'] },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-[#1A1A1A] text-[#F5F0E8]' : 'bg-[#FAF7F2] text-[#1A1A1A]'}`}>
      {/* Announcement Bar */}
      <div className={`${darkMode ? 'bg-[#C9A96E]' : 'bg-[#4A3728]'} text-white text-center py-2 text-sm`}>
        📚 {lang === 'uz' ? "Bepul yetkazib berish 200,000 so'mdan ortiq buyurtmalarga!" : lang === 'ru' ? "Бесплатная доставка при заказе от 200,000 сум!" : "Free delivery on orders over 200,000 UZS!"} 📚
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-[#242424] border-[#3D3D3D]' : 'bg-white/95 backdrop-blur-sm border-[#E8DFD0]'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <BookOpen size={28} className="text-[#C9A96E]" />
              <span className="font-serif text-xl font-bold tracking-tight">
                Book<span className="text-[#C9A96E]">Market</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className={`relative w-full ${darkMode ? 'bg-[#2D2D2D]' : 'bg-[#F5F0E8]'} rounded-full`}>
                <input
                  type="text"
                  placeholder={t['common.search']}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = '/books?search=' + searchQuery; }}
                  className={`w-full py-2.5 pl-4 pr-10 rounded-full ${darkMode ? 'bg-[#2D2D2D] text-[#F5F0E8] placeholder-gray-500' : 'bg-[#F5F0E8] text-[#1A1A1A] placeholder-gray-500'} outline-none text-sm`}
                />
                <Link to={`/books?search=${searchQuery}`} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search size={18} className="text-[#C9A96E]" />
                </Link>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium hover:text-[#C9A96E] transition-colors">
                  <Globe size={16} />
                  <span className="hidden sm:inline uppercase">{lang}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg border overflow-hidden min-w-[80px]">
                  {(['uz', 'ru', 'en'] as const).map(l => (
                    <button key={l} onClick={() => setLang(l)} className={`block w-full text-left px-3 py-2 text-sm hover:bg-[#F5F0E8] dark:hover:bg-[#3D3D3D] ${lang === l ? 'text-[#C9A96E] font-bold' : ''}`}>
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <button onClick={toggleDarkMode} className="p-2 hover:text-[#C9A96E] transition-colors">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile Search */}
              <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 hover:text-[#C9A96E]">
                <Search size={18} />
              </button>

              {/* Favorites */}
              <Link to="/favorites" className="relative p-2 hover:text-[#C9A96E] transition-colors">
                <Heart size={18} />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C9A96E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 hover:text-[#C9A96E] transition-colors">
                <ShoppingCart size={18} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C9A96E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <div className="relative group">
                  <Link to={user.isAdmin ? '/admin' : '/profile'} className="flex items-center gap-1 p-2 hover:text-[#C9A96E] transition-colors">
                    <User size={18} />
                  </Link>
                  <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg border overflow-hidden min-w-[150px]">
                    <Link to={user.isAdmin ? '/admin' : '/profile'} className="block px-4 py-2 text-sm hover:bg-[#F5F0E8] dark:hover:bg-[#3D3D3D]">
                      {user.name}
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-[#F5F0E8] dark:hover:bg-[#3D3D3D]">
                      {t['profile.orders']}
                    </Link>
                    <button onClick={() => { logout(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#F5F0E8] dark:hover:bg-[#3D3D3D] text-red-500">
                      {t['auth.logout']}
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="p-2 hover:text-[#C9A96E] transition-colors">
                  <User size={18} />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <div className={`relative ${darkMode ? 'bg-[#2D2D2D]' : 'bg-[#F5F0E8]'} rounded-full`}>
                <input
                  type="text"
                  placeholder={t['common.search']}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-2.5 pl-4 pr-10 rounded-full ${darkMode ? 'bg-[#2D2D2D] text-[#F5F0E8]' : 'bg-[#F5F0E8]'} outline-none text-sm`}
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A96E]" />
              </div>
            </div>
          )}

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 py-3 border-t border-[#E8DFD0] dark:border-[#3D3D3D]">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#C9A96E] ${location.pathname === link.path ? 'text-[#C9A96E]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-[#C9A96E] ${location.pathname === '/about' ? 'text-[#C9A96E]' : ''}`}>
              {t['nav.about']}
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-[#C9A96E] ${location.pathname === '/contact' ? 'text-[#C9A96E]' : ''}`}>
              {t['nav.contact']}
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t ${darkMode ? 'bg-[#242424] border-[#3D3D3D]' : 'bg-white border-[#E8DFD0]'} animate-fade-in`}>
            <nav className="flex flex-col py-4 px-4 gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-[#F5F0E8] dark:hover:bg-[#3D3D3D] ${location.pathname === link.path ? 'text-[#C9A96E] bg-[#F5F0E8] dark:bg-[#3D3D3D]' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[#F5F0E8] dark:hover:bg-[#3D3D3D]">
                {t['nav.about']}
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[#F5F0E8] dark:hover:bg-[#3D3D3D]">
                {t['nav.contact']}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D]' : 'bg-[#4A3728]'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={24} className="text-[#C9A96E]" />
                <span className="font-serif text-lg font-bold">BookMarket</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {lang === 'uz' ? "O'zbekistondagi eng yirik onlayn kitob do'koni. Minglab kitoblar, tez yetkazib berish." : lang === 'ru' ? "Крупнейший онлайн-книжный магазин в Узбекистане. Тысячи книг, быстрая доставка." : "The largest online bookstore in Uzbekistan. Thousands of books, fast delivery."}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-[#C9A96E]">{t['footer.about']}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-[#C9A96E] transition-colors">{t['footer.about']}</Link></li>
                <li><Link to="/contact" className="hover:text-[#C9A96E] transition-colors">{t['footer.contact']}</Link></li>
                <li><Link to="/faq" className="hover:text-[#C9A96E] transition-colors">{t['footer.faq']}</Link></li>
                <li><Link to="/delivery" className="hover:text-[#C9A96E] transition-colors">{t['footer.delivery']}</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-4 text-[#C9A96E]">{lang === 'uz' ? 'Mijozlarga xizmat' : lang === 'ru' ? 'Клиентам' : 'Customer Service'}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/payment" className="hover:text-[#C9A96E] transition-colors">{t['footer.payment']}</Link></li>
                <li><Link to="/returns" className="hover:text-[#C9A96E] transition-colors">{t['footer.returns']}</Link></li>
                <li><Link to="/privacy" className="hover:text-[#C9A96E] transition-colors">{t['footer.privacy']}</Link></li>
                <li><Link to="/terms" className="hover:text-[#C9A96E] transition-colors">{t['footer.terms']}</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-[#C9A96E]">{t['footer.newsletter']}</h4>
              <p className="text-sm text-gray-300 mb-3">
                {lang === 'uz' ? "Yangiliklar va chegirmalardan xabardor bo'ling" : lang === 'ru' ? "Будьте в курсе новостей и скидок" : "Stay updated with news and discounts"}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t['footer.emailPlaceholder']}
                  className="flex-1 px-3 py-2 rounded-l-lg text-sm text-[#1A1A1A] outline-none"
                />
                <button className="bg-[#C9A96E] px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-[#B8956A] transition-colors">
                  {t['footer.subscribe']}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2024 BookMarket. {t['footer.rights']}.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">📞 +998 71 200 00 00</span>
              <span className="text-sm text-gray-400">✉️ info@bookmarket.uz</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
