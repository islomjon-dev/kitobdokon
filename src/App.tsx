import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { BooksPage } from './pages/Books';
import { BookDetails } from './pages/BookDetails';
import { CartPage, CheckoutPage } from './pages/Cart';
import { LoginPage, RegisterPage, ProfilePage, OrdersPage, FavoritesPage } from './pages/Auth';
import { CategoriesPage, CategoryDetailPage, AuthorsPage, AuthorDetailPage, PublishersPage, NewArrivalsPage, BestsellersPage } from './pages/Categories';
import { AdminPage } from './pages/Admin';
import { AboutPage, ContactPage, FAQPage, DeliveryPage, PaymentPage, ReturnsPage, PrivacyPage, TermsPage, NotFoundPage, ForgotPasswordPage } from './pages/Static';

function AppContent() {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/authors/:id" element={<AuthorDetailPage />} />
          <Route path="/publishers" element={<PublishersPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/bestsellers" element={<BestsellersPage />} />
          <Route path="/popular" element={<BooksPage />} />
          <Route path="/recommended" element={<BooksPage />} />
          <Route path="/search" element={<BooksPage />} />
          <Route path="/tracking" element={<OrdersPage />} />
          <Route path="/order-success" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppContent />;
}
