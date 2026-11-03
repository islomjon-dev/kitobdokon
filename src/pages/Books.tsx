import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { books, categories } from '../data/books';
import { BookCard } from '../components/BookCard';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

export function BooksPage() {
  const { lang, darkMode, searchQuery } = useStore();
  const t = translations[lang];
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredBooks = useMemo(() => {
    let result = [...books];
    
    // Search
    const search = searchParams.get('search') || searchQuery;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title[lang].toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description[lang].toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(b => b.categoryId === selectedCategory);
    }

    // Price
    result = result.filter(b => b.price >= priceRange[0] && b.price <= priceRange[1]);

    // Stock
    if (inStockOnly) {
      result = result.filter(b => b.stock > 0);
    }

    // Sort
    switch (sortBy) {
      case 'cheapest': result.sort((a, b) => a.price - b.price); break;
      case 'expensive': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'popular': result.sort((a, b) => b.salesCount - a.salesCount); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [lang, searchParams, searchQuery, selectedCategory, priceRange, inStockOnly, sortBy]);

  const formatPrice = (price: number) => price.toLocaleString();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold">{t['nav.books']}</h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {filteredBooks.length} {lang === 'uz' ? 'ta kitob topildi' : lang === 'ru' ? 'книг найдено' : 'books found'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`md:hidden flex items-center gap-2 px-4 py-2 rounded-lg border ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}
          >
            <SlidersHorizontal size={16} />
            {t['common.filter']}
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-lg border text-sm ${darkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] text-[#F5F0E8]' : 'bg-white border-gray-200'} outline-none`}
          >
            <option value="popular">{t['filter.popular']}</option>
            <option value="cheapest">{t['filter.cheapest']}</option>
            <option value="expensive">{t['filter.expensive']}</option>
            <option value="newest">{t['filter.newest']}</option>
            <option value="rating">{t['filter.topRated']}</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-black/50 md:relative md:bg-transparent' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
          <div className={`${showFilters ? 'absolute right-0 top-0 h-full w-80 overflow-y-auto p-6' : ''} ${darkMode ? 'bg-[#2D2D2D] md:bg-transparent' : 'bg-white md:bg-transparent'} md:sticky md:top-24`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="md:hidden absolute top-4 right-4">
                <X size={20} />
              </button>
            )}
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm space-y-6`}>
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Filter size={14} /> {t['common.category']}
                </h3>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-3 py-1.5 rounded text-sm ${!selectedCategory ? 'bg-[#C9A96E]/10 text-[#C9A96E] font-medium' : darkMode ? 'hover:bg-[#3D3D3D]' : 'hover:bg-gray-50'}`}
                  >
                    {t['common.all']}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block w-full text-left px-3 py-1.5 rounded text-sm ${selectedCategory === cat.id ? 'bg-[#C9A96E]/10 text-[#C9A96E] font-medium' : darkMode ? 'hover:bg-[#3D3D3D]' : 'hover:bg-gray-50'}`}
                    >
                      {cat.icon} {cat.name[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-sm mb-3">{t['filter.priceRange']}</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={200000}
                    step={5000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs">
                    <span>{formatPrice(priceRange[0])} {t['common.currency']}</span>
                    <span>{formatPrice(priceRange[1])} {t['common.currency']}</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold text-sm mb-3">{t['filter.availability']}</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-gray-300 text-[#C9A96E] focus:ring-[#C9A96E]"
                  />
                  <span className="text-sm">{t['filter.inStockOnly']}</span>
                </label>
              </div>

              {/* Reset */}
              <button
                onClick={() => { setSelectedCategory(''); setPriceRange([0, 200000]); setInStockOnly(false); }}
                className="w-full py-2 text-sm text-[#C9A96E] hover:underline"
              >
                {t['common.reset']}
              </button>
            </div>
          </div>
        </aside>

        {/* Books Grid */}
        <div className="flex-1">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📚</p>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t['common.noResults']}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
