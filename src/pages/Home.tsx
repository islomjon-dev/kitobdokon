import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { books, categories, authors, getBestsellers, getNewArrivals, getPopularBooks, getRecommendedBooks } from '../data/books';
import { BookCard } from '../components/BookCard';
import { Truck, Shield, BadgeDollarSign, Headphones, ArrowRight, Star } from 'lucide-react';

export function Home() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];

  const bestsellers = getBestsellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);
  const popular = getPopularBooks().slice(0, 4);
  const recommended = getRecommendedBooks().slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A]' : 'bg-gradient-to-br from-[#F5F0E8] to-[#FAF7F2]'}`}>
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t['home.hero.title']}
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md`}>
                {t['home.hero.subtitle']}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/books" className="btn-primary inline-flex items-center gap-2">
                  {t['home.hero.cta']}
                  <ArrowRight size={18} />
                </Link>
                <Link to="/bestsellers" className="btn-outline inline-flex items-center gap-2">
                  {t['nav.bestsellers']}
                </Link>
              </div>
              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-[#C9A96E]">10K+</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'uz' ? 'Kitoblar' : lang === 'ru' ? 'Книг' : 'Books'}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C9A96E]">5K+</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'uz' ? 'Mijozlar' : lang === 'ru' ? 'Клиентов' : 'Customers'}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C9A96E]">500+</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'uz' ? 'Mualliflar' : lang === 'ru' ? 'Авторов' : 'Authors'}</div>
                </div>
              </div>
            </div>
            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=500&fit=crop"
                  alt="Books"
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#C9A96E]/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C9A96E]/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold">{t['home.featuredCategories']}</h2>
          <Link to="/categories" className="text-[#C9A96E] text-sm font-medium flex items-center gap-1 hover:underline">
            {t['common.viewAll']} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className={`flex flex-col items-center p-4 rounded-xl transition-all hover:shadow-md ${darkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white hover:bg-[#F5F0E8]'}`}
            >
              <span className="text-3xl mb-2">{cat.icon}</span>
              <span className="text-xs font-medium text-center">{cat.name[lang]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className={`py-12 ${darkMode ? 'bg-[#242424]' : 'bg-[#F5F0E8]/50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">{t['home.bestsellers']}</h2>
            <Link to="/bestsellers" className="text-[#C9A96E] text-sm font-medium flex items-center gap-1 hover:underline">
              {t['common.viewAll']} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold">{t['home.newArrivals']}</h2>
          <Link to="/new-arrivals" className="text-[#C9A96E] text-sm font-medium flex items-center gap-1 hover:underline">
            {t['common.viewAll']} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className={`rounded-2xl overflow-hidden relative ${darkMode ? 'bg-gradient-to-r from-[#4A3728] to-[#6B5344]' : 'bg-gradient-to-r from-[#4A3728] to-[#6B5344]'} text-white`}>
          <div className="px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[#C9A96E] font-bold text-sm uppercase tracking-wider">
                {lang === 'uz' ? 'Maxsus taklif' : lang === 'ru' ? 'Специальное предложение' : 'Special Offer'}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mt-2">
                {lang === 'uz' ? 'Barcha kitoblarga 20% chegirma' : lang === 'ru' ? 'Скидка 20% на все книги' : '20% off on all books'}
              </h3>
              <p className="text-gray-300 mt-2">
                {lang === 'uz' ? "Promokod: BOOK20" : lang === 'ru' ? "Промокод: BOOK20" : "Promo code: BOOK20"}
              </p>
            </div>
            <Link to="/books" className="btn-gold whitespace-nowrap">
              {t['home.hero.cta']}
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Books */}
      <section className={`${darkMode ? 'bg-[#242424]' : 'bg-[#F5F0E8]/50'} py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">{t['home.popular']}</h2>
            <Link to="/books?sort=popular" className="text-[#C9A96E] text-sm font-medium flex items-center gap-1 hover:underline">
              {t['common.viewAll']} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {popular.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold">{t['home.featuredAuthors']}</h2>
          <Link to="/authors" className="text-[#C9A96E] text-sm font-medium flex items-center gap-1 hover:underline">
            {t['common.viewAll']} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {authors.slice(0, 4).map(author => (
            <Link
              key={author.id}
              to={`/authors/${author.id}`}
              className={`flex flex-col items-center p-6 rounded-xl transition-all hover:shadow-md ${darkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white'}`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#4A3728] flex items-center justify-center text-white text-xl font-bold mb-3">
                {author.name.charAt(0)}
              </div>
              <h4 className="font-medium text-sm text-center">{author.name}</h4>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {author.bookCount} {lang === 'uz' ? 'kitob' : lang === 'ru' ? 'книг' : 'books'}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <Star size={12} className="text-[#C9A96E] fill-[#C9A96E]" />
                <span className="text-xs">{author.nationality}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className={`${darkMode ? 'bg-[#242424]' : 'bg-[#F5F0E8]/50'} py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">{t['home.recommended']}</h2>
            <Link to="/books?sort=rating" className="text-[#C9A96E] text-sm font-medium flex items-center gap-1 hover:underline">
              {t['common.viewAll']} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {recommended.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-10">{t['home.whyUs']}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Truck size={28} />, title: t['home.fastDelivery'], desc: t['home.fastDeliveryDesc'] },
            { icon: <Shield size={28} />, title: t['home.quality'], desc: t['home.qualityDesc'] },
            { icon: <BadgeDollarSign size={28} />, title: t['home.bestPrice'], desc: t['home.bestPriceDesc'] },
            { icon: <Headphones size={28} />, title: t['home.support'], desc: t['home.supportDesc'] },
          ].map((item, i) => (
            <div key={i} className={`text-center p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
