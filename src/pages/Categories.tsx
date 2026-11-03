import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { categories, authors, publishers, books, getBooksByCategory, getBooksByAuthor } from '../data/books';
import { BookCard } from '../components/BookCard';

export function CategoriesPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['nav.categories']}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(cat => {
          const count = books.filter(b => b.categoryId === cat.id).length;
          return (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className={`flex flex-col items-center p-8 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 ${darkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white'}`}
            >
              <span className="text-5xl mb-4">{cat.icon}</span>
              <h3 className="font-semibold text-center">{cat.name[lang]}</h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{count} {lang === 'uz' ? 'kitob' : lang === 'ru' ? 'книг' : 'books'}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CategoryDetailPage() {
  const { id } = useParams();
  const { lang, darkMode } = useStore();
  const t = translations[lang];
  const category = categories.find(c => c.id === id);
  const categoryBooks = getBooksByCategory(id || '');

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-xl">{t['common.noResults']}</p>
        <Link to="/categories" className="btn-primary mt-6 inline-block">{t['common.back']}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="font-serif text-3xl font-bold">{category.name[lang]}</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{categoryBooks.length} {lang === 'uz' ? 'kitob' : lang === 'ru' ? 'книг' : 'books'}</p>
        </div>
      </div>
      {categoryBooks.length === 0 ? (
        <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t['common.noResults']}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export function AuthorsPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['nav.authors']}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map(author => (
          <Link
            key={author.id}
            to={`/authors/${author.id}`}
            className={`flex items-center gap-4 p-6 rounded-xl transition-all hover:shadow-lg ${darkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white'}`}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#4A3728] flex items-center justify-center text-white text-xl font-bold shrink-0">
              {author.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{author.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{author.nationality}</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{author.bookCount} {lang === 'uz' ? 'kitob' : lang === 'ru' ? 'книг' : 'books'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AuthorDetailPage() {
  const { id } = useParams();
  const { lang, darkMode } = useStore();
  const t = translations[lang];
  const author = authors.find(a => a.id === id);
  const authorBooks = getBooksByAuthor(id || '');

  if (!author) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-xl">{t['common.noResults']}</p>
        <Link to="/authors" className="btn-primary mt-6 inline-block">{t['common.back']}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className={`flex flex-col md:flex-row items-center gap-6 p-8 rounded-xl mb-8 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#4A3728] flex items-center justify-center text-white text-3xl font-bold">
          {author.name.charAt(0)}
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-serif text-3xl font-bold">{author.name}</h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{author.nationality}</p>
          <p className={`mt-2 max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{author.bio[lang]}</p>
        </div>
      </div>
      <h2 className="font-serif text-xl font-bold mb-4">{author.name} — {authorBooks.length} {lang === 'uz' ? 'kitob' : lang === 'ru' ? 'книг' : 'books'}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {authorBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export function PublishersPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['nav.publishers']}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publishers.map(pub => (
          <div key={pub.id} className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] font-bold text-lg">
                {pub.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{pub.name}</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pub.country}</p>
              </div>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{pub.description[lang]}</p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pub.bookCount} {lang === 'uz' ? 'kitob' : lang === 'ru' ? 'книг' : 'books'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple filtered pages
export function NewArrivalsPage() {
  const { lang } = useStore();
  const t = translations[lang];
  const newBooks = books.filter(b => b.newArrival);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['nav.new']}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {newBooks.map(book => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}

export function BestsellersPage() {
  const { lang } = useStore();
  const t = translations[lang];
  const bestBooks = books.filter(b => b.bestseller);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['nav.bestsellers']}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {bestBooks.map(book => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}
