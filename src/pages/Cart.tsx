import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function CartPage() {
  const { lang, darkMode, cart, removeFromCart, updateQuantity, getCartTotal, promoCode, applyPromo, removePromo } = useStore();
  const t = translations[lang];
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const formatPrice = (price: number) => price.toLocaleString() + ' ' + t['common.currency'];

  const handleApplyPromo = () => {
    if (applyPromo(promoInput)) {
      setPromoError('');
    } else {
      setPromoError(lang === 'uz' ? "Noto'g'ri promokod" : lang === 'ru' ? 'Неверный промокод' : 'Invalid promo code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center animate-fade-in">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="font-serif text-2xl font-bold mb-2">{t['cart.empty']}</h1>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {lang === 'uz' ? "Savatga kitob qo'shing" : lang === 'ru' ? 'Добавьте книги в корзину' : 'Add books to your cart'}
        </p>
        <Link to="/books" className="btn-primary inline-flex items-center gap-2">
          {t['nav.books']} <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['cart.title']}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.book.id} className={`flex gap-4 p-4 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <Link to={`/book/${item.book.id}`} className="w-20 h-28 shrink-0 rounded-lg overflow-hidden">
                <img src={item.book.cover} alt={item.book.title[lang]} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/book/${item.book.id}`} className="font-medium text-sm hover:text-[#C9A96E] line-clamp-2">
                  {item.book.title[lang]}
                </Link>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.book.author}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className={`flex items-center border rounded-lg ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
                    <button
                      onClick={() => updateQuantity(item.book.id, Math.max(1, item.quantity - 1))}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] rounded-l-lg"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.book.id, Math.min(item.book.stock, item.quantity + 1))}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] rounded-r-lg"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{formatPrice(item.book.price * item.quantity)}</p>
                    {item.quantity > 1 && (
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatPrice(item.book.price)} × {item.quantity}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.book.id)}
                className="self-start p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className={`p-6 rounded-xl h-fit sticky top-24 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
          <h3 className="font-semibold text-lg mb-4">{t['cart.total']}</h3>
          
          <div className="space-y-3 mb-4">
            <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>{t['cart.subtotal']} ({cart.reduce((s, i) => s + i.quantity, 0)} {t['cart.items']})</span>
              <span>{formatPrice(cart.reduce((s, i) => s + i.book.price * i.quantity, 0))}</span>
            </div>
            {promoCode && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{t['common.discount']} ({promoCode})</span>
                <span>-{formatPrice(cart.reduce((s, i) => s + i.book.price * i.quantity, 0) - getCartTotal())}</span>
              </div>
            )}
            <div className={`flex justify-between font-bold text-lg pt-3 border-t ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
              <span>{t['cart.total']}</span>
              <span className="text-[#C9A96E]">{formatPrice(getCartTotal())}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={t['cart.promo']}
                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none`}
              />
              <button onClick={handleApplyPromo} className="px-3 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-medium">
                {t['cart.applyPromo']}
              </button>
            </div>
            {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
            {promoCode && (
              <button onClick={removePromo} className="text-xs text-[#C9A96E] hover:underline mt-1">
                {lang === 'uz' ? 'Promokodni olib tashlash' : lang === 'ru' ? 'Убрать промокод' : 'Remove promo code'}
              </button>
            )}
          </div>

          <Link to="/checkout" className="block w-full text-center btn-primary">
            {t['cart.checkout']}
          </Link>
          <Link to="/books" className={`block w-full text-center mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-[#C9A96E]`}>
            {t['cart.continue']}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  const { lang, darkMode, cart, getCartTotal, createOrder, user } = useStore();
  const t = translations[lang];
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    region: '', city: '', address: '', comment: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => price.toLocaleString() + ' ' + t['common.currency'];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = lang === 'uz' ? "Ismni kiriting" : "Введите имя";
    if (!formData.lastName.trim()) errs.lastName = lang === 'uz' ? "Familiyani kiriting" : "Введите фамилию";
    if (!formData.phone.trim()) errs.phone = lang === 'uz' ? "Telefonni kiriting" : "Введите телефон";
    if (!formData.address.trim()) errs.address = lang === 'uz' ? "Manzilni kiriting" : "Введите адрес";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;
    const tracking = createOrder(formData, paymentMethod);
    setOrderId(tracking);
  };

  if (orderId) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">{t['checkout.orderSuccess']}</h1>
        <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t['checkout.tracking']}</p>
        <p className="text-2xl font-bold text-[#C9A96E] mb-6">{orderId}</p>
        <div className="flex gap-3 justify-center">
          <Link to="/orders" className="btn-primary">{t['orders.title']}</Link>
          <Link to="/books" className="btn-outline">{t['nav.books']}</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-xl">{t['cart.empty']}</p>
        <Link to="/books" className="btn-primary mt-6 inline-block">{t['nav.books']}</Link>
      </div>
    );
  }

  const inputClass = `w-full px-4 py-3 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none focus:border-[#C9A96E]`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">{t['checkout.title']}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <h3 className="font-semibold mb-4">{lang === 'uz' ? 'Aloqa ma\'lumotlari' : lang === 'ru' ? 'Контактные данные' : 'Contact Information'}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input className={inputClass} placeholder={t['checkout.firstName']} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input className={inputClass} placeholder={t['checkout.lastName']} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <input className={inputClass} placeholder={t['checkout.phone']} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <input className={inputClass} placeholder={t['checkout.email']} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <h3 className="font-semibold mb-4">{lang === 'uz' ? 'Yetkazib berish manzili' : lang === 'ru' ? 'Адрес доставки' : 'Delivery Address'}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input className={inputClass} placeholder={t['checkout.region']} value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} />
                </div>
                <div>
                  <input className={inputClass} placeholder={t['checkout.city']} value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <input className={inputClass} placeholder={t['checkout.address']} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="md:col-span-2">
                  <textarea className={inputClass + ' resize-none'} rows={3} placeholder={t['checkout.comment']} value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <h3 className="font-semibold mb-4">{t['checkout.payment']}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { id: 'cash', label: t['checkout.cash'], icon: '💵' },
                  { id: 'card', label: t['checkout.card'], icon: '💳' },
                  { id: 'click', label: t['checkout.click'], icon: '🔵' },
                  { id: 'payme', label: t['checkout.payme'], icon: '🟢' },
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${paymentMethod === method.id ? 'border-[#C9A96E] bg-[#C9A96E]/5' : darkMode ? 'border-[#3D3D3D] hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className={`p-6 rounded-xl h-fit sticky top-24 ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
            <h3 className="font-semibold text-lg mb-4">{lang === 'uz' ? 'Buyurtma xulosasi' : lang === 'ru' ? 'Итог заказа' : 'Order Summary'}</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map(item => (
                <div key={item.book.id} className="flex gap-3">
                  <img src={item.book.cover} alt="" className="w-12 h-16 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.book.title[lang]}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>×{item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.book.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className={`border-t pt-4 ${darkMode ? 'border-[#3D3D3D]' : 'border-gray-200'}`}>
              <div className="flex justify-between font-bold text-lg">
                <span>{t['cart.total']}</span>
                <span className="text-[#C9A96E]">{formatPrice(getCartTotal())}</span>
              </div>
            </div>
            <button type="submit" className="w-full btn-primary mt-6">
              {t['checkout.placeOrder']}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
