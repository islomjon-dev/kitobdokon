import { useStore } from '../store/useStore';
import { translations } from '../data/translations';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function AboutPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-8">{t['about.title']}</h1>
      <div className={`prose max-w-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p className="text-lg leading-relaxed mb-6">{t['about.desc']}</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { num: '10,000+', label: lang === 'uz' ? 'Kitoblar' : lang === 'ru' ? 'Книг' : 'Books' },
            { num: '5,000+', label: lang === 'uz' ? 'Mijozlar' : lang === 'ru' ? 'Клиентов' : 'Customers' },
            { num: '500+', label: lang === 'uz' ? 'Mualliflar' : lang === 'ru' ? 'Авторов' : 'Authors' },
          ].map((stat, i) => (
            <div key={i} className={`text-center p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <p className="text-3xl font-bold text-[#C9A96E]">{stat.num}</p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];
  void t; // used in template

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-12">{t['contact.title']}</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[
            { icon: <MapPin size={20} />, label: t['contact.address'], value: t['contact.addressValue'] },
            { icon: <Phone size={20} />, label: t['contact.phone'], value: '+998 71 200 00 00' },
            { icon: <Mail size={20} />, label: t['contact.email'], value: 'info@bookmarket.uz' },
            { icon: <Clock size={20} />, label: t['contact.workHours'], value: t['contact.workHoursValue'] },
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] shrink-0">
                {item.icon}
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`p-8 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
          <form className="space-y-4">
            <input className={`w-full px-4 py-3 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none focus:border-[#C9A96E]`} placeholder={t['auth.name']} />
            <input className={`w-full px-4 py-3 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none focus:border-[#C9A96E]`} placeholder={t['checkout.email']} />
            <input className={`w-full px-4 py-3 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none focus:border-[#C9A96E]`} placeholder={t['checkout.phone']} />
            <textarea className={`w-full px-4 py-3 rounded-lg border text-sm ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none focus:border-[#C9A96E] resize-none`} rows={4} placeholder={t['contact.message']} />
            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
              <Send size={16} /> {t['contact.send']}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];
  const faqs = lang === 'uz' ? [
    { q: "Buyurtma qancha vaqtda yetkaziladi?", a: "Toshkent shahri ichida 1 kun, viloyatlarga 2-3 kun ichida yetkazib beriladi." },
    { q: "To'lov qanday amalga oshiriladi?", a: "Naqd pul, karta, Click va Payme orqali to'lash mumkin." },
    { q: "Kitobni qaytarish mumkinmi?", a: "Ha, 14 kun ichida kitobni qaytarish mumkin, agar kitob buzilmagan bo'lsa." },
    { q: "Yetkazib berish narxi qancha?", a: "200,000 so'mdan ortiq buyurtmalarga bepul. Kam buyurtmalarga 15,000 so'm." },
  ] : lang === 'ru' ? [
    { q: "Сколько времени занимает доставка?", a: "По Ташкенту 1 день, по регионам 2-3 дня." },
    { q: "Как осуществляется оплата?", a: "Наличными, картой, через Click и Payme." },
    { q: "Можно ли вернуть книгу?", a: "Да, в течение 14 дней, если книга не повреждена." },
    { q: "Сколько стоит доставка?", a: "Бесплатно при заказе от 200,000 сум. Для меньших заказов 15,000 сум." },
  ] : [
    { q: "How long does delivery take?", a: "1 day within Tashkent, 2-3 days to regions." },
    { q: "How is payment made?", a: "Cash, card, Click, and Payme." },
    { q: "Can I return a book?", a: "Yes, within 14 days if the book is undamaged." },
    { q: "How much is delivery?", a: "Free for orders over 200,000 UZS. 15,000 UZS for smaller orders." },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-12">{t['footer.faq']}</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className={`group rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
            <summary className="flex items-center justify-between p-6 cursor-pointer font-medium">
              {faq.q}
              <span className="text-[#C9A96E] group-open:rotate-45 transition-transform text-xl">+</span>
            </summary>
            <div className={`px-6 pb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function DeliveryPage() {
  const { lang, darkMode } = useStore();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-8">{lang === 'uz' ? 'Yetkazib berish' : lang === 'ru' ? 'Доставка' : 'Delivery'}</h1>
      <div className={`p-8 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm space-y-6`}>
        <div>
          <h3 className="font-semibold text-lg mb-2">{lang === 'uz' ? "Toshkent shahri" : lang === 'ru' ? 'Город Ташкент' : 'Tashkent City'}</h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{lang === 'uz' ? "1 kun ichida. 200,000 so'mdan ortiq buyurtmalarga bepul." : lang === 'ru' ? "В течение 1 дня. Бесплатно при заказе от 200,000 сум." : "Within 1 day. Free for orders over 200,000 UZS."}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{lang === 'uz' ? "Viloyatlar" : lang === 'ru' ? 'Регионы' : 'Regions'}</h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{lang === 'uz' ? "2-3 kun ichida. Yetkazib berish narxi 15,000 so'm." : lang === 'ru' ? "В течение 2-3 дней. Стоимость доставки 15,000 сум." : "Within 2-3 days. Delivery fee 15,000 UZS."}</p>
        </div>
      </div>
    </div>
  );
}

export function PaymentPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-8">{t['footer.payment']}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: t['checkout.cash'], desc: lang === 'uz' ? "Kuryerga naqd pul orqali" : lang === 'ru' ? "Наличными курьеру" : "Cash to courier", icon: "💵" },
          { title: t['checkout.card'], desc: lang === 'uz' ? "Kuryerga karta orqali" : lang === 'ru' ? "Картой курьеру" : "Card to courier", icon: "💳" },
          { title: 'Click', desc: lang === 'uz' ? "Click tizimi orqali" : lang === 'ru' ? "Через систему Click" : "Via Click system", icon: "🔵" },
          { title: 'Payme', desc: lang === 'uz' ? "Payme tizimi orqali" : lang === 'ru' ? "Через систему Payme" : "Via Payme system", icon: "🟢" },
        ].map((method, i) => (
          <div key={i} className={`p-6 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
            <span className="text-3xl">{method.icon}</span>
            <h3 className="font-semibold mt-3">{method.title}</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{method.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReturnsPage() {
  const { lang, darkMode } = useStore();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-8">{lang === 'uz' ? 'Qaytarish shartlari' : lang === 'ru' ? 'Условия возврата' : 'Return Policy'}</h1>
      <div className={`p-8 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>{lang === 'uz' ? "Kitobni 14 kun ichida qaytarish mumkin." : lang === 'ru' ? "Книгу можно вернуть в течение 14 дней." : "Books can be returned within 14 days."}</p>
          <p>{lang === 'uz' ? "Kitob asl holatida va qadoqlangan bo'lishi kerak." : lang === 'ru' ? "Книга должна быть в оригинальном состоянии и упаковке." : "Book must be in original condition and packaging."}</p>
          <p>{lang === 'uz' ? "Qaytarish uchun buyurtma raqami kerak bo'ladi." : lang === 'ru' ? "Для возврата необходим номер заказа." : "Order number is required for returns."}</p>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  const { lang, darkMode } = useStore();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-8">{lang === 'uz' ? 'Maxfiylik siyosati' : lang === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}</h1>
      <div className={`p-8 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
        <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>{lang === 'uz' ? "BookMarket mijozlarning shaxsiy ma'lumotlarini himoya qilishga majbur." : lang === 'ru' ? "BookMarket обязуется защищать личные данные клиентов." : "BookMarket is committed to protecting customer personal data."}</p>
          <p>{lang === 'uz' ? "Ma'lumotlar faqat buyurtma bajarish uchun ishlatiladi." : lang === 'ru' ? "Данные используются только для выполнения заказов." : "Data is used only for order fulfillment."}</p>
          <p>{lang === 'uz' ? "Uchinchi tomonlarga ma'lumotlar berilmaydi." : lang === 'ru' ? "Данные не передаются третьим лицам." : "Data is not shared with third parties."}</p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  const { lang, darkMode } = useStore();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-4xl font-bold text-center mb-8">{lang === 'uz' ? 'Foydalanish shartlari' : lang === 'ru' ? 'Условия использования' : 'Terms of Use'}</h1>
      <div className={`p-8 rounded-xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-sm`}>
        <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>{lang === 'uz' ? "Saytdan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz." : lang === 'ru' ? "Используя сайт, вы соглашаетесь с данными условиями." : "By using the site, you agree to these terms."}</p>
          <p>{lang === 'uz' ? "Narxlar va mavjudlik oldindan xabarsiz o'zgartirilishi mumkin." : lang === 'ru' ? "Цены и наличие могут быть изменены без предварительного уведомления." : "Prices and availability may change without notice."}</p>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  const { lang, darkMode } = useStore();
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center animate-fade-in">
      <p className="text-8xl font-bold text-[#C9A96E] mb-4">404</p>
      <h1 className="font-serif text-3xl font-bold mb-4">
        {lang === 'uz' ? "Sahifa topilmadi" : lang === 'ru' ? 'Страница не найдена' : 'Page Not Found'}
      </h1>
      <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {lang === 'uz' ? "Siz qidirayotgan sahifa mavjud emas." : lang === 'ru' ? "Запрашиваемая страница не существует." : "The page you're looking for doesn't exist."}
      </p>
      <Link to="/" className="btn-primary">
        {lang === 'uz' ? 'Bosh sahifaga' : lang === 'ru' ? 'На главную' : 'Go Home'}
      </Link>
    </div>
  );
}

export function ForgotPasswordPage() {
  const { lang, darkMode } = useStore();
  const t = translations[lang];
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className={`w-full max-w-md p-8 rounded-2xl ${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'} shadow-lg text-center`}>
        <h1 className="font-serif text-2xl font-bold mb-4">{t['auth.forgotPassword']}</h1>
        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {lang === 'uz' ? "Email manzilingizni kiriting, biz parolni tiklash havolasini yuboramiz." : lang === 'ru' ? "Введите ваш email, мы отправим ссылку для восстановления пароля." : "Enter your email and we'll send you a password reset link."}
        </p>
        <input className={`w-full px-4 py-3 rounded-lg border text-sm mb-4 ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F0E8]' : 'border-gray-200'} outline-none`} placeholder={t['auth.email']} />
        <button className="w-full btn-primary">{lang === 'uz' ? 'Yuborish' : lang === 'ru' ? 'Отправить' : 'Send'}</button>
        <Link to="/login" className="text-sm text-[#C9A96E] mt-4 inline-block hover:underline">{t['common.back']}</Link>
      </div>
    </div>
  );
}
