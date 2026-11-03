import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { getBookById, getBooksByAuthor, books, categories } from '../data/books';
import { BookCard } from '../components/BookCard';
import { useState } from 'react';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';

export function BookDetails() {
  const { id } = useParams();
  const { lang, darkMode, addToCart, toggleFavorite, favorites } = useStore();
  const t = translations[lang];
  const book = getBookById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">📚</p>
        <p className="text-xl">{t['common.noResults']}</p>
        <Link to="/books" className="btn-primary mt-6 inline-block">{t['common.back']}</Link>
      </div>
    );
  }

  const isFav = favorites.includes(book.id);
  const discount = book.oldPrice ? Math.round((1 - book.price / book.oldPrice) * 100) : 0;
  const similarBooks = getBooksByAuthor(book.authorId).filter(b => b.id !== book.id).slice(0, 4);
  const categoryBooks = books.filter(b => b.categoryId === book.categoryId && b.id !== book.id).slice(0, 4);
  const relatedBooks = similarBooks.length > 0 ? similarBooks : categoryBooks;

  const formatPrice = (price: number) => price.toLocaleString() + ' ' + t['common.currency'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className={`flex items-center gap-2 text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <Link to="/" className="hover:text-[#C9A96E]">{t['nav.home']}</Link>
        <span>/</span>
        <Link to="/books" className="hover:text-[#C9A96E]">{t['nav.books']}</Link>
        <span>/</span>
        <span className={darkMode ? 'text-[#F5F0E8]' : 'text-[#1A1A1A]'}>{book.title[lang]}</span>
      </nav>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-[#2D2D2D]' : 'bg-[#F5F0E8]'} aspect-[3/4] max-h-[500px]`}>
            <img
              src={book.images[selectedImage] || book.cover}
              alt={book.title[lang]}
              className="w-full h-full object-cover"
            />
          </div>
          {book.images.length > 1 && (
            <div className="flex gap-2">
              {book.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-[#C9A96E]' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Category & Badges */}
          <div className="flex items-center gap-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {categories.find(c => c.id === book.categoryId)?.name[lang] || book.categoryId}
            </span>
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
            )}
            {book.bestseller && (
              <span className="bg-[#C9A96E] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {lang === 'uz' ? 'Bestseller' : lang === 'ru' ? 'Бестселлер' : 'Bestseller'}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold">{book.title[lang]}</h1>

          {/* Author */}
          <Link to={`/authors/${book.authorId}`} className="text-[#C9A96E] font-medium hover:underline">
            {book.author}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={18}
                  className={star <= Math.round(book.rating) ? 'text-[#C9A96E] fill-[#C9A96E]' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {book.rating} ({book.reviewCount} {t['common.reviews']})
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              | {book.salesCount}+ {lang === 'uz' ? 'sotilgan' : lang === 'ru' ? 'продано' : 'sold'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#C9A96E]">{formatPrice(book.price)}</span>
            {book.oldPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(book.oldPrice)}</span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {book.stock > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-green-600">{t['common.inStock']} ({book.stock})</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm text-red-500">{t['common.outOfStock']}</span>
              </>
            )}
          </div>

          {/* Quantity & Actions */}
          {book.stock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{t['cart.quantity']}:</span>
                <div className={`flex items-center border rounded-lg ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] rounded-l-lg"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] rounded-r-lg"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(book, quantity)}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  {t['common.addToCart']}
                </button>
                <button
                  onClick={() => toggleFavorite(book.id)}
                  className={`px-4 py-3 rounded-lg border transition-all ${isFav ? 'border-red-300 bg-red-50 text-red-500' : darkMode ? 'border-[#3D3D3D] hover:border-red-400' : 'border-gray-200 hover:border-red-300'}`}
                >
                  <Heart size={20} className={isFav ? 'fill-current' : ''} />
                </button>
              </div>

              <Link
                to="/checkout"
                onClick={() => addToCart(book, quantity)}
                className="block w-full text-center btn-gold"
              >
                {t['common.buyNow']}
              </Link>
            </div>
          )}

          {/* Features */}
          <div className={`grid grid-cols-3 gap-4 pt-4 border-t ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
            <div className="text-center">
              <Truck size={20} className="mx-auto text-[#C9A96E] mb-1" />
              <span className="text-xs">{lang === 'uz' ? 'Tez yetkazish' : lang === 'ru' ? 'Быстрая доставка' : 'Fast Delivery'}</span>
            </div>
            <div className="text-center">
              <Shield size={20} className="mx-auto text-[#C9A96E] mb-1" />
              <span className="text-xs">{lang === 'uz' ? 'Kafolat' : lang === 'ru' ? 'Гарантия' : 'Guarantee'}</span>
            </div>
            <div className="text-center">
              <RotateCcw size={20} className="mx-auto text-[#C9A96E] mb-1" />
              <span className="text-xs">{lang === 'uz' ? 'Qaytarish' : lang === 'ru' ? 'Возврат' : 'Returns'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Details Table */}
      <div className={`mt-12 p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
        <h2 className="font-serif text-xl font-bold mb-4">{t['common.details']}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: t['common.isbn'], value: book.isbn },
            { label: t['common.publisher'], value: book.publisherId },
            { label: t['common.year'], value: book.year },
            { label: t['common.pages'], value: `${book.pages} ${t['common.pages']}` },
            { label: t['common.language'], value: book.language.toUpperCase() },
            { label: t['common.cover'], value: book.coverType },
            { label: t['common.format'], value: book.format },
          ].map((item, i) => (
            <div key={i} className={`flex justify-between py-2 border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-100'}`}>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
        <h2 className="font-serif text-xl font-bold mb-4">{t['common.description']}</h2>
        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {book.description[lang]}
        </p>
      </div>

      {/* Similar Books */}
      {relatedBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold mb-6">
            {lang === 'uz' ? "O'xshash kitoblar" : lang === 'ru' ? 'Похожие книги' : 'Similar Books'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedBooks.map(b => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


