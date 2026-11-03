import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Book } from '../data/books';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';

interface BookCardProps {
  book: Book;
  showAddToCart?: boolean;
}

export function BookCard({ book, showAddToCart = true }: BookCardProps) {
  const { lang, addToCart, toggleFavorite, favorites, darkMode } = useStore();
  const t = translations[lang];
  const isFav = favorites.includes(book.id);
  const discount = book.oldPrice ? Math.round((1 - book.price / book.oldPrice) * 100) : 0;

  const formatPrice = (price: number) => {
    return price.toLocaleString() + ' ' + t['common.currency'];
  };

  return (
    <div className={`book-card group rounded-xl overflow-hidden ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm hover:shadow-lg transition-all duration-300`}>
      {/* Image */}
      <Link to={`/book/${book.id}`} className="relative block overflow-hidden aspect-[3/4]">
        <img
          src={book.cover}
          alt={book.title[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600/F5F0E8/4A3728?text=Book'; }}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          {book.bestseller && (
            <span className="bg-[#C9A96E] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {lang === 'uz' ? 'Top' : lang === 'ru' ? 'Хит' : 'Top'}
            </span>
          )}
          {book.newArrival && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              NEW
            </span>
          )}
        </div>
        {/* Stock badge */}
        {book.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">{t['common.outOfStock']}</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3">
        {/* Category */}
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>
          {book.categoryId}
        </span>

        {/* Title */}
        <Link to={`/book/${book.id}`}>
          <h3 className={`font-medium text-sm mt-1 line-clamp-2 hover:text-[#C9A96E] transition-colors ${darkMode ? 'text-[#F5F0E8]' : 'text-[#1A1A1A]'}`}>
            {book.title[lang]}
          </h3>
        </Link>

        {/* Author */}
        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={12}
                className={star <= Math.round(book.rating) ? 'text-[#C9A96E] fill-[#C9A96E]' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ({book.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`font-bold text-sm ${darkMode ? 'text-[#F5F0E8]' : 'text-[#4A3728]'}`}>
            {formatPrice(book.price)}
          </span>
          {book.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(book.oldPrice)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3">
          {showAddToCart && book.stock > 0 && (
            <button
              onClick={() => addToCart(book)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${darkMode ? 'bg-[#C9A96E] hover:bg-[#B8956A] text-white' : 'bg-[#4A3728] hover:bg-[#6B5344] text-white'}`}
            >
              <ShoppingCart size={14} />
              {t['common.addToCart']}
            </button>
          )}
          <button
            onClick={() => toggleFavorite(book.id)}
            className={`p-2 rounded-lg border transition-all ${isFav ? 'border-red-300 bg-red-50 text-red-500' : darkMode ? 'border-[#3D3D3D] hover:border-red-400 hover:text-red-400' : 'border-gray-200 hover:border-red-300 hover:text-red-500'}`}
          >
            <Heart size={14} className={isFav ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
      <div className="aspect-[3/4] skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-16 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="h-3 w-24 skeleton rounded" />
        <div className="h-4 w-20 skeleton rounded" />
      </div>
    </div>
  );
}
