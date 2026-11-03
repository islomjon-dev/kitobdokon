export interface Book {
  id: string;
  title: { uz: string; ru: string; en: string };
  author: string;
  authorId: string;
  isbn: string;
  description: { uz: string; ru: string; en: string };
  price: number;
  oldPrice?: number;
  cover: string;
  images: string[];
  categoryId: string;
  publisherId: string;
  year: number;
  pages: number;
  language: string;
  coverType: string;
  stock: number;
  rating: number;
  reviewCount: number;
  salesCount: number;
  format: string;
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: { uz: string; ru: string; en: string };
  icon: string;
  bookCount: number;
}

export interface Author {
  id: string;
  name: string;
  bio: { uz: string; ru: string; en: string };
  photo: string;
  bookCount: number;
  nationality: string;
}

export interface Publisher {
  id: string;
  name: string;
  description: { uz: string; ru: string; en: string };
  logo: string;
  bookCount: number;
  country: string;
}

export const categories: Category[] = [
  { id: 'fiction', name: { uz: 'Badiiy adabiyot', ru: 'Художественная литература', en: 'Fiction' }, icon: '📚', bookCount: 12 },
  { id: 'non-fiction', name: { uz: 'Nobadiiy adabiyot', ru: 'Документальная литература', en: 'Non-Fiction' }, icon: '📖', bookCount: 8 },
  { id: 'science', name: { uz: 'Fan va texnologiya', ru: 'Наука и технологии', en: 'Science & Tech' }, icon: '🔬', bookCount: 6 },
  { id: 'history', name: { uz: 'Tarix', ru: 'История', en: 'History' }, icon: '🏛️', bookCount: 5 },
  { id: 'children', name: { uz: 'Bolalar adabiyoti', ru: 'Детская литература', en: 'Children' }, icon: '🧸', bookCount: 7 },
  { id: 'business', name: { uz: 'Biznes va iqtisodiyot', ru: 'Бизнес и экономика', en: 'Business' }, icon: '💼', bookCount: 6 },
  { id: 'psychology', name: { uz: 'Psixologiya', ru: 'Психология', en: 'Psychology' }, icon: '🧠', bookCount: 5 },
  { id: 'philosophy', name: { uz: 'Falsafa', ru: 'Философия', en: 'Philosophy' }, icon: '💭', bookCount: 4 },
];

export const authors: Author[] = [
  { id: 'a1', name: 'Abdulla Qodiriy', bio: { uz: "O'zbek adabiyotining asoschilaridan biri", ru: "Один из основателей узбекской литературы", en: "One of the founders of Uzbek literature" }, photo: '', bookCount: 3, nationality: 'Uzbekistan' },
  { id: 'a2', name: 'O\'tkir Hoshimov', bio: { uz: "Zamonaviy o'zbek adabiyotining yirik namoyandasi", ru: "Крупный представитель современной узбекской литературы", en: "Major figure of modern Uzbek literature" }, photo: '', bookCount: 2, nationality: 'Uzbekistan' },
  { id: 'a3', name: 'Gabriel García Márquez', bio: { uz: "Kolumbiyalik yozuvchi, Nobel mukofoti sovrindori", ru: "Колумбийский писатель, лауреат Нобелевской премии", en: "Colombian writer, Nobel Prize winner" }, photo: '', bookCount: 2, nationality: 'Colombia' },
  { id: 'a4', name: 'Fyodor Dostoyevskiy', bio: { uz: "Rus adabiyotining buyuk namoyandasi", ru: "Великий представитель русской литературы", en: "Great figure of Russian literature" }, photo: '', bookCount: 2, nationality: 'Russia' },
  { id: 'a5', name: 'Haruki Murakami', bio: { uz: "Yaponiyalik zamonaviy yozuvchi", ru: "Японский современный писатель", en: "Japanese contemporary writer" }, photo: '', bookCount: 2, nationality: 'Japan' },
  { id: 'a6', name: 'Chinua Achebe', bio: { uz: "Afrika adabiyotining otasi", ru: "Отец африканской литературы", en: "Father of African literature" }, photo: '', bookCount: 1, nationality: 'Nigeria' },
  { id: 'a7', name: 'Stephen Hawking', bio: { uz: "Buyuk fizik va kosmolog", ru: "Великий физик и космолог", en: "Great physicist and cosmologist" }, photo: '', bookCount: 1, nationality: 'UK' },
  { id: 'a8', name: 'Robert Kiyosaki', bio: { uz: "Moliyaviy savodxonlik bo'yicha mutaxassis", ru: "Специалист по финансовой грамотности", en: "Financial literacy expert" }, photo: '', bookCount: 1, nationality: 'USA' },
];

export const publishers: Publisher[] = [
  { id: 'p1', name: 'G\'afur G\'ulom nomli nashriyot', description: { uz: "O'zbekistonning eng yirik nashriyoti", ru: "Крупнейшее издательство Узбекистана", en: "Largest publisher in Uzbekistan" }, logo: '', bookCount: 8, country: 'Uzbekistan' },
  { id: 'p2', name: 'O\'qituvchi', description: { uz: "Ta'limiy adabiyotlar nashriyoti", ru: "Издательство учебной литературы", en: "Educational literature publisher" }, logo: '', bookCount: 6, country: 'Uzbekistan' },
  { id: 'p3', name: 'Penguin Books', description: { uz: "Jahon miqyosidagi nufuzli nashriyot", ru: "Престижное мировое издательство", en: "Prestigious world publisher" }, logo: '', bookCount: 5, country: 'UK' },
  { id: 'p4', name: 'AST', description: { uz: "Rus tilidagi yirik nashriyot", ru: "Крупное русскоязычное издательство", en: "Major Russian-language publisher" }, logo: '', bookCount: 4, country: 'Russia' },
];

const bookCovers = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1495446819938-c56370a13374?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1553729459-afe8f2e2ed08?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&h=600&fit=crop',
];

export const books: Book[] = [
  {
    id: 'b1', title: { uz: "O'tkan kunlar", ru: "Минувшие дни", en: "Days Gone By" },
    author: 'Abdulla Qodiriy', authorId: 'a1', isbn: '978-9943-12-345-6',
    description: { uz: "O'zbek adabiyotining durdonasi hisoblangan ushbu roman XIX asr oxiridagi Turkiston hayotini tasvirlaydi.", ru: "Жемчужина узбекской литературы, этот роман описывает жизнь Туркестана конца XIX века.", en: "A gem of Uzbek literature, this novel depicts life in Turkestan at the end of the 19th century." },
    price: 85000, oldPrice: 120000, cover: bookCovers[0], images: [bookCovers[0], bookCovers[1]],
    categoryId: 'fiction', publisherId: 'p1', year: 1925, pages: 416, language: 'uz',
    coverType: 'Qattiq', stock: 45, rating: 4.8, reviewCount: 234, salesCount: 1520, format: 'Paperback',
    featured: true, newArrival: false, bestseller: true, createdAt: '2024-01-15'
  },
  {
    id: 'b2', title: { uz: "Dunyoning ishlari", ru: "Мирские дела", en: "Worldly Affairs" },
    author: 'Abdulla Qodiriy', authorId: 'a1', isbn: '978-9943-12-346-3',
    description: { uz: "Muallifning ikkinchi yirik romani, jamiyatdagi ijtimoiy muammolarni ochib beradi.", ru: "Второй крупный роман автора, раскрывающий социальные проблемы общества.", en: "The author's second major novel, revealing social problems in society." },
    price: 75000, cover: bookCovers[1], images: [bookCovers[1]],
    categoryId: 'fiction', publisherId: 'p1', year: 1932, pages: 352, language: 'uz',
    coverType: 'Qattiq', stock: 30, rating: 4.6, reviewCount: 156, salesCount: 890, format: 'Hardcover',
    featured: true, newArrival: false, bestseller: false, createdAt: '2024-02-10'
  },
  {
    id: 'b3', title: { uz: "Sariq devni minib", ru: "Оседлав жёлтого дьявола", en: "Riding the Yellow Devil" },
    author: 'O\'tkir Hoshimov', authorId: 'a2', isbn: '978-9943-12-347-0',
    description: { uz: "Zamonaviy hayot va inson qadr-qimmati haqidagi chuqur falsafiy roman.", ru: "Глубокий философский роман о современной жизни и достоинстве человека.", en: "A deep philosophical novel about modern life and human dignity." },
    price: 65000, oldPrice: 80000, cover: bookCovers[2], images: [bookCovers[2]],
    categoryId: 'fiction', publisherId: 'p2', year: 1985, pages: 288, language: 'uz',
    coverType: 'Yumshoq', stock: 55, rating: 4.5, reviewCount: 189, salesCount: 1100, format: 'Paperback',
    featured: false, newArrival: true, bestseller: true, createdAt: '2024-03-01'
  },
  {
    id: 'b4', title: { uz: "Yuz sizdan keyin", ru: "Сто лет спустя", en: "A Hundred Years Later" },
    author: 'O\'tkir Hoshimov', authorId: 'a2', isbn: '978-9943-12-348-7',
    description: { uz: "Inson hayoti va vaqt haqidagi ta'sirli hikoya.", ru: "Трогательная история о человеческой жизни и времени.", en: "A touching story about human life and time." },
    price: 55000, cover: bookCovers[3], images: [bookCovers[3]],
    categoryId: 'fiction', publisherId: 'p2', year: 1990, pages: 224, language: 'uz',
    coverType: 'Yumshoq', stock: 40, rating: 4.3, reviewCount: 98, salesCount: 650, format: 'Paperback',
    featured: false, newArrival: false, bestseller: false, createdAt: '2024-03-15'
  },
  {
    id: 'b5', title: { uz: "Yuz yillik yolg'izlik", ru: "Сто лет одиночества", en: "One Hundred Years of Solitude" },
    author: 'Gabriel García Márquez', authorId: 'a3', isbn: '978-0-14-028329-7',
    description: { uz: "Magik realizm janrining durdonasi. Buendia oilasining yetti avlodi hikoyasi.", ru: "Жемчужина магического реализма. История семи поколений семьи Буэндиа.", en: "A masterpiece of magical realism. The story of seven generations of the Buendía family." },
    price: 120000, oldPrice: 150000, cover: bookCovers[4], images: [bookCovers[4], bookCovers[5]],
    categoryId: 'fiction', publisherId: 'p3', year: 1967, pages: 417, language: 'en',
    coverType: 'Qattiq', stock: 25, rating: 4.9, reviewCount: 567, salesCount: 2340, format: 'Hardcover',
    featured: true, newArrival: false, bestseller: true, createdAt: '2024-01-20'
  },
  {
    id: 'b6', title: { uz: "Jinoyat va jazo", ru: "Преступление и наказание", en: "Crime and Punishment" },
    author: 'Fyodor Dostoyevskiy', authorId: 'a4', isbn: '978-0-14-044913-6',
    description: { uz: "Inson ruhiyatining chuqur tahlili. Jinoyat, vijdon va qayta tug'ilish haqida.", ru: "Глубокий анализ человеческой психики. О преступлении, совести и перерождении.", en: "A deep analysis of human psyche. About crime, conscience, and rebirth." },
    price: 95000, cover: bookCovers[5], images: [bookCovers[5]],
    categoryId: 'fiction', publisherId: 'p4', year: 1866, pages: 671, language: 'ru',
    coverType: 'Qattiq', stock: 35, rating: 4.7, reviewCount: 445, salesCount: 1890, format: 'Hardcover',
    featured: true, newArrival: false, bestseller: true, createdAt: '2024-02-01'
  },
  {
    id: 'b7', title: { uz: "Norveg o'rmoni", ru: "Норвежский лес", en: "Norwegian Wood" },
    author: 'Haruki Murakami', authorId: 'a5', isbn: '978-0-375-70402-4',
    description: { uz: "Sevgi, yo'qotish va o'sish haqidagi ta'sirli roman.", ru: "Трогательный роман о любви, потере и взрослении.", en: "A touching novel about love, loss, and growing up." },
    price: 78000, oldPrice: 95000, cover: bookCovers[6], images: [bookCovers[6]],
    categoryId: 'fiction', publisherId: 'p3', year: 1987, pages: 296, language: 'en',
    coverType: 'Yumshoq', stock: 50, rating: 4.4, reviewCount: 312, salesCount: 1450, format: 'Paperback',
    featured: false, newArrival: true, bestseller: false, createdAt: '2024-04-01'
  },
  {
    id: 'b8', title: { uz: "Things Fall Apart", ru: "И всё рушилось", en: "Things Fall Apart" },
    author: 'Chinua Achebe', authorId: 'a6', isbn: '978-0-385-47454-2',
    description: { uz: "Afrika xalqlari tarixi va madaniyati haqidagi buyuk roman.", ru: "Великий роман об истории и культуре африканских народов.", en: "A great novel about the history and culture of African peoples." },
    price: 72000, cover: bookCovers[7], images: [bookCovers[7]],
    categoryId: 'fiction', publisherId: 'p3', year: 1958, pages: 209, language: 'en',
    coverType: 'Yumshoq', stock: 28, rating: 4.5, reviewCount: 278, salesCount: 980, format: 'Paperback',
    featured: false, newArrival: false, bestseller: false, createdAt: '2024-04-10'
  },
  {
    id: 'b9', title: { uz: "Vaqtning qisqa tarixi", ru: "Краткая история времени", en: "A Brief History of Time" },
    author: 'Stephen Hawking', authorId: 'a7', isbn: '978-0-553-38016-3',
    description: { uz: "Koinot sirlari haqida oddiy tilda yozilgan ilmiy asar.", ru: "Научное произведение, написанное простым языком о тайнах Вселенной.", en: "A scientific work written in simple language about the mysteries of the Universe." },
    price: 110000, oldPrice: 135000, cover: bookCovers[8], images: [bookCovers[8]],
    categoryId: 'science', publisherId: 'p3', year: 1988, pages: 256, language: 'en',
    coverType: 'Qattiq', stock: 20, rating: 4.8, reviewCount: 389, salesCount: 1670, format: 'Hardcover',
    featured: true, newArrival: true, bestseller: true, createdAt: '2024-05-01'
  },
  {
    id: 'b10', title: { uz: "Boy otaning puli, kambag'al otaning qarzi", ru: "Богатый папа, бедный папа", en: "Rich Dad Poor Dad" },
    author: 'Robert Kiyosaki', authorId: 'a8', isbn: '978-1-61268-019-4',
    description: { uz: "Moliyaviy savodxonlik va boylik sirlari haqida eng mashhur kitob.", ru: "Самая известная книга о финансовой грамотности и секретах богатства.", en: "The most famous book about financial literacy and secrets of wealth." },
    price: 89000, cover: bookCovers[9], images: [bookCovers[9]],
    categoryId: 'business', publisherId: 'p4', year: 1997, pages: 336, language: 'en',
    coverType: 'Yumshoq', stock: 60, rating: 4.3, reviewCount: 456, salesCount: 2100, format: 'Paperback',
    featured: true, newArrival: false, bestseller: true, createdAt: '2024-01-05'
  },
  {
    id: 'b11', title: { uz: "Kichkina shahzoda", ru: "Маленький принц", en: "The Little Prince" },
    author: 'Antoine de Saint-Exupéry', authorId: 'a6', isbn: '978-0-15-601219-5',
    description: { uz: "Bolalar va kattalar uchun falsafiy ertak.", ru: "Философская сказка для детей и взрослых.", en: "A philosophical fairy tale for children and adults." },
    price: 45000, oldPrice: 55000, cover: bookCovers[10], images: [bookCovers[10]],
    categoryId: 'children', publisherId: 'p3', year: 1943, pages: 96, language: 'en',
    coverType: 'Qattiq', stock: 80, rating: 4.9, reviewCount: 678, salesCount: 3200, format: 'Hardcover',
    featured: true, newArrival: true, bestseller: true, createdAt: '2024-05-15'
  },
  {
    id: 'b12', title: { uz: "1984", ru: "1984", en: "1984" },
    author: 'George Orwell', authorId: 'a5', isbn: '978-0-452-28423-4',
    description: { uz: "Totalitar jamiyat haqidagi antiutopik roman.", ru: "Антиутопический роман о тоталитарном обществе.", en: "A dystopian novel about totalitarian society." },
    price: 68000, cover: bookCovers[11], images: [bookCovers[11]],
    categoryId: 'fiction', publisherId: 'p3', year: 1949, pages: 328, language: 'en',
    coverType: 'Yumshoq', stock: 42, rating: 4.7, reviewCount: 534, salesCount: 2800, format: 'Paperback',
    featured: false, newArrival: false, bestseller: true, createdAt: '2024-02-20'
  },
];

export const getBookById = (id: string): Book | undefined => books.find(b => b.id === id);
export const getBooksByCategory = (categoryId: string): Book[] => books.filter(b => b.categoryId === categoryId);
export const getBooksByAuthor = (authorId: string): Book[] => books.filter(b => b.authorId === authorId);
export const getFeaturedBooks = (): Book[] => books.filter(b => b.featured);
export const getNewArrivals = (): Book[] => books.filter(b => b.newArrival);
export const getBestsellers = (): Book[] => books.filter(b => b.bestseller);
export const getPopularBooks = (): Book[] => [...books].sort((a, b) => b.salesCount - a.salesCount).slice(0, 8);
export const getRecommendedBooks = (): Book[] => [...books].sort((a, b) => b.rating - a.rating).slice(0, 8);
