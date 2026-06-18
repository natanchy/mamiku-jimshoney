import { useState, useMemo } from "react";
import {
  ShoppingBag,
  Wallet,
  Watch,
  Star,
  Search,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  Truck,
  RotateCcw,
  Instagram,
  Phone,
  MapPin,
  Heart,
  Sparkles,
  Grid3X3,
  Package,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
} from "lucide-react";

// ─── DATA PRODUK ──────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "6282330313865";
const PRODUCTS_PER_PAGE = 8;

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Celia Bag",
    category: "tas",
    price: 299000,
    originalPrice: 375000,
    rating: 4.9,
    reviews: 287,
    badge: "Best Seller",
    description:
      "Tas tote elegan berbahan canvas premium dengan lapisan dalam suede. Desain minimalis cocok untuk kerja dan jalan-jalan.",
    colors: ["#c8a06e", "#1a1a1a", "#e8d5c0"],
    emoji: "👜",
    bg: "from-rose-100 to-pink-50",
  },
  {
    id: 2,
    name: "Rosalind Handbag",
    category: "tas",
    price: 345000,
    originalPrice: 430000,
    rating: 4.8,
    reviews: 194,
    badge: "New Arrival",
    description:
      "Handbag mewah dengan detail tali rantai gold dan bahan PU leather berkualitas. Cocok untuk tampilan formal maupun kasual.",
    colors: ["#f5c6d0", "#8b6f8e", "#f9e4e8"],
    emoji: "💼",
    bg: "from-fuchsia-100 to-rose-50",
  },
  {
    id: 3,
    name: "Bella Sling Bag",
    category: "tas",
    price: 225000,
    originalPrice: 285000,
    rating: 4.7,
    reviews: 312,
    badge: "Best Seller",
    description:
      "Sling bag compact dengan tali adjustable. Muat banyak barang bawaan harian: HP, dompet, pouch.",
    colors: ["#e8c4b8", "#6b4f3a", "#f5ddd5"],
    emoji: "🎒",
    bg: "from-orange-100 to-rose-50",
  },
  {
    id: 4,
    name: "Aurora Tote Bag",
    category: "tas",
    price: 265000,
    originalPrice: 330000,
    rating: 4.6,
    reviews: 156,
    badge: "Promo",
    description:
      "Tote bag berukuran besar dengan bahan twill yang kuat. Dilengkapi kantong dalam berzipper anti-lusuh.",
    colors: ["#d4b8e0", "#7a5c8a", "#ede0f5"],
    emoji: "🛍️",
    bg: "from-purple-100 to-pink-50",
  },
  {
    id: 5,
    name: "Evelyn Wallet",
    category: "dompet",
    price: 155000,
    originalPrice: 195000,
    rating: 4.9,
    reviews: 421,
    badge: "Best Seller",
    description:
      "Dompet panjang wanita dengan 12 slot kartu, 2 kantong uang, dan resleting koin. Bahan PU leather premium.",
    colors: ["#c8a06e", "#f5e6d3", "#1a1a1a"],
    emoji: "👛",
    bg: "from-amber-100 to-rose-50",
  },
  {
    id: 6,
    name: "Mini Pouch Wallet",
    category: "dompet",
    price: 125000,
    originalPrice: 158000,
    rating: 4.7,
    reviews: 238,
    badge: "New Arrival",
    description:
      "Dompet mini clutch serbaguna, bisa juga dijadikan coin purse. Hadir dalam berbagai pilihan warna pastel.",
    colors: ["#f9c6d0", "#fce4ec", "#f48fb1"],
    emoji: "💰",
    bg: "from-pink-100 to-fuchsia-50",
  },
  {
    id: 7,
    name: "Slim Card Holder",
    category: "dompet",
    price: 98000,
    originalPrice: 125000,
    rating: 4.6,
    reviews: 178,
    badge: null,
    description:
      "Card holder ramping muat 6 kartu ATM/KTP. Desain super slim masuk saku celana tanpa bikin menonjol.",
    colors: ["#2c2c2c", "#c8a06e", "#f5f5f5"],
    emoji: "💳",
    bg: "from-slate-100 to-pink-50",
  },
  {
    id: 8,
    name: "Bifold Velvet Wallet",
    category: "dompet",
    price: 142000,
    originalPrice: 179000,
    rating: 4.8,
    reviews: 203,
    badge: "Promo",
    description:
      "Dompet bifold berbahan velvet halus dengan detail aksen gold. Tampil mewah dengan harga terjangkau.",
    colors: ["#6b4a7a", "#d4b8e0", "#4a2c5a"],
    emoji: "🪄",
    bg: "from-violet-100 to-pink-50",
  },
  {
    id: 9,
    name: "Clara Watch",
    category: "jam",
    price: 445000,
    originalPrice: 545000,
    rating: 4.9,
    reviews: 134,
    badge: "Best Seller",
    description:
      "Jam tangan analog dial bunga dengan tali mesh stainless steel gold. Elegan dan tahan lama, cocok untuk semua acara.",
    colors: ["#d4a96a", "#c0c0c0", "#f5e6d3"],
    emoji: "⌚",
    bg: "from-yellow-100 to-rose-50",
  },
  {
    id: 10,
    name: "Rose Gold Timepiece",
    category: "jam",
    price: 485000,
    originalPrice: 589000,
    rating: 4.9,
    reviews: 97,
    badge: "Limited",
    description:
      "Jam tangan rose gold limited edition dengan kristal pada bezel. Tali kulit genuine leather warna mauve.",
    colors: ["#e8c5b0", "#a67c52", "#f0d5c5"],
    emoji: "✨",
    bg: "from-rose-100 to-fuchsia-50",
  },
  {
    id: 11,
    name: "Luna Minimalist Watch",
    category: "jam",
    price: 395000,
    originalPrice: 490000,
    rating: 4.7,
    reviews: 88,
    badge: "New Arrival",
    description:
      "Jam tangan minimalis dengan dial bersih tanpa angka. Tali silikon nyaman, ringan, dan water-resistant.",
    colors: ["#f5f5f5", "#1a1a1a", "#e8e8e8"],
    emoji: "🌙",
    bg: "from-gray-100 to-pink-50",
  },
  {
    id: 12,
    name: "Fleur Pearl Watch",
    category: "jam",
    price: 415000,
    originalPrice: 510000,
    rating: 4.8,
    reviews: 112,
    badge: "Promo",
    description:
      "Jam tangan cantik dengan detail mutiara pada tali. Tampilan feminin yang sempurna untuk hari spesial.",
    colors: ["#f9e4e8", "#c8a0a8", "#fff0f3"],
    emoji: "🌸",
    bg: "from-pink-100 to-rose-50",
  },
  {
    id: 13,
    name: "Fleur Pearl Watch",
    category: "jam",
    price: 415000,
    originalPrice: 510000,
    rating: 4.8,
    reviews: 112,
    badge: "Promo",
    description:
      "Jam tangan cantik dengan detail mutiara pada tali. Tampilan feminin yang sempurna untuk hari spesial.",
    colors: ["#f9e4e8", "#c8a0a8", "#fff0f3"],
    emoji: "🌸",
    bg: "from-pink-100 to-rose-50",
  },
  {
    id: 14,
    name: "Fleur Pearl Watch",
    category: "jam",
    price: 415000,
    originalPrice: 510000,
    rating: 4.8,
    reviews: 112,
    badge: "Promo",
    description:
      "Jam tangan cantik dengan detail mutiara pada tali. Tampilan feminin yang sempurna untuk hari spesial.",
    colors: ["#f9e4e8", "#c8a0a8", "#fff0f3"],
    emoji: "🌸",
    bg: "from-pink-100 to-rose-50",
  },
  {
    id: 15,
    name: "Fleur Pearl Watch",
    category: "jam",
    price: 415000,
    originalPrice: 510000,
    rating: 4.8,
    reviews: 112,
    badge: "Promo",
    description:
      "Jam tangan cantik dengan detail mutiara pada tali. Tampilan feminin yang sempurna untuk hari spesial.",
    colors: ["#f9e4e8", "#c8a0a8", "#fff0f3"],
    emoji: "🌸",
    bg: "from-pink-100 to-rose-50",
  },
  {
    id: 16,
    name: "Fleur Pearl Watch",
    category: "jam",
    price: 415000,
    originalPrice: 510000,
    rating: 4.8,
    reviews: 112,
    badge: "Promo",
    description:
      "Jam tangan cantik dengan detail mutiara pada tali. Tampilan feminin yang sempurna untuk hari spesial.",
    colors: ["#f9e4e8", "#c8a0a8", "#fff0f3"],
    emoji: "🌸",
    bg: "from-pink-100 to-rose-50",
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua", icon: Grid3X3 },
  { id: "tas", label: "Tas", icon: ShoppingBag },
  { id: "dompet", label: "Dompet", icon: Wallet },
  { id: "jam", label: "Jam Tangan", icon: Watch },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);

const getDiscount = (price, original) =>
  Math.round(((original - price) / original) * 100);

const makeWALink = (name, price) => {
  const msg = `Halo Kak Admin Mamiku JimsHoney! Saya tertarik untuk memesan produk original *${name}* seharga *${formatRupiah(price)}*. Apakah saat ini ready?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

// ─── SUB-KOMPONEN ─────────────────────────────────────────────────────────────

/** Ilustrasi placeholder produk berbasis emoji + gradient */
function ProductIllustration({ product }) {
  return (
    <div
      className={`w-full aspect-[4/3] bg-gradient-to-br ${product.bg} flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Lingkaran dekorasi */}
      <div className="absolute top-2 right-2 w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-full blur-xl" />
      <div className="absolute bottom-2 left-2 w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-full blur-lg" />
      {/* Emoji produk */}
      <span
        className="text-4xl sm:text-5xl md:text-6xl select-none drop-shadow-sm"
        role="img"
        aria-label={product.name}
      >
        {product.emoji}
      </span>
      <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium text-pink-400/80 tracking-widest uppercase">
        JimsHoney
      </p>
      {/* Palet warna */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {product.colors.map((c, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-white/60 shadow"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

/** Bintang rating */
function StarRating({ rating, reviews, compact }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`${compact ? "w-2.5 h-2.5 sm:w-3 sm:h-3" : "w-3 h-3"} ${s <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 fill-gray-300"
              }`}
          />
        ))}
      </div>
      <span
        className={`${compact ? "text-[9px] sm:text-[10px]" : "text-[10px]"} text-gray-400`}
      >
        {rating} ({reviews})
      </span>
    </div>
  );
}

/** Kartu produk tunggal */
function ProductCard({ product, onAddToCart }) {
  const discount = getDiscount(product.price, product.originalPrice);

  const badgeColor =
    product.badge === "Best Seller"
      ? "bg-pink-500"
      : product.badge === "New Arrival"
        ? "bg-emerald-500"
        : product.badge === "Promo"
          ? "bg-orange-500"
          : product.badge === "Limited"
            ? "bg-purple-500"
            : "";

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-pink-100 flex flex-col">
      {/* Gambar / Ilustrasi */}
      <div className="relative overflow-hidden">
        <ProductIllustration product={product} />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2 left-2 ${badgeColor} text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow`}
          >
            {product.badge}
          </span>
        )}
        {/* Diskon */}
        <span className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          -{discount}%
        </span>
        {/* Tombol wishlist */}
        <button
          aria-label="Tambah ke favorit"
          className="absolute bottom-2 left-2 w-6 h-6 sm:w-7 sm:h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow hover:bg-pink-50"
        >
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400" />
        </button>
      </div>

      {/* Konten kartu */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 gap-1 sm:gap-1.5">
        {/* Nama produk */}
        <h3 className="font-semibold text-gray-800 text-xs sm:text-sm leading-tight line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <StarRating rating={product.rating} reviews={product.reviews} compact />

        {/* Deskripsi – tersembunyi di mobile agar rapi */}
        <p className="hidden sm:block text-[10px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Harga */}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="font-bold text-pink-600 text-xs sm:text-sm">
            {formatRupiah(product.price)}
          </span>
          <span className="text-[9px] sm:text-[10px] text-gray-400 line-through">
            {formatRupiah(product.originalPrice)}
          </span>
        </div>

        {/* Tombol + Keranjang */}
        <button
          id={`add-to-cart-btn-${product.id}`}
          onClick={() => onAddToCart(product)}
          className="mt-1 flex items-center justify-center gap-1 sm:gap-1.5 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white text-[10px] sm:text-xs font-semibold py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 shadow hover:shadow-md w-full"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>+ Keranjang</span>
        </button>
      </div>
    </article>
  );
}

/** Kontrol paginasi */
function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <button
        id="btn-prev-page"
        onClick={onPrev}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-pink-200 text-sm font-medium text-pink-600 bg-white hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <span
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${page === currentPage
              ? "bg-pink-600 text-white shadow"
              : "bg-white text-gray-500 border border-pink-200"
              }`}
          >
            {page}
          </span>
        ))}
      </div>

      <button
        id="btn-next-page"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-pink-200 text-sm font-medium text-pink-600 bg-white hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const getWhatsAppCartLink = () => {
    const cartItemsText = cart
      .map(
        (item) =>
          `- *${item.name}* (Qty: ${item.quantity}) @ ${formatRupiah(item.price)} = *${formatRupiah(item.price * item.quantity)}*`
      )
      .join("\n");
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const msg = `Halo Admin Mamiku JimsHoney!\nSaya tertarik untuk memesan produk berikut:\n\n${cartItemsText}\n\n*Total Belanja:* *${formatRupiah(totalPrice)}*\n\nApakah saat ini ready?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  // Filter & search produk
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Paginasi
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  // Ganti kategori → reset ke halaman 1
  const handleCategory = (id) => {
    setActiveCategory(id);
    setCurrentPage(1);
  };

  // Cari → reset ke halaman 1
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-rose-50 font-sans">

      {/* ── TOP BANNER: Authorized Reseller ──────────────────────────────── */}
      <div className="bg-pink-600 text-white text-center py-2 px-4">
        <p className="text-[11px] sm:text-xs font-semibold tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <BadgeCheck className="w-3.5 h-3.5 flex-shrink-0" />
          Authorized Reseller Jims Honey — 100% Original Guarantee &amp; Garansi Fisik
          <BadgeCheck className="w-3.5 h-3.5 flex-shrink-0" />
        </p>
      </div>

      {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-pink-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Mamiku JimsHoney Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-full shadow-sm bg-white"
            />
            <div className="leading-tight">
              <p className="font-bold text-gray-800 text-sm sm:text-base leading-none">
                Mamiku
              </p>
              <p className="text-pink-500 text-[10px] sm:text-xs font-semibold tracking-wider leading-none">
                JimsHoney
              </p>
            </div>
          </div>

          {/* Info singkat desktop */}
          <div className="hidden md:flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-500" /> 100% Original
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-pink-500" /> Pengiriman Cepat
            </span>
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-pink-500" /> Garansi Fisik
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Tombol Keranjang */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-pink-600 hover:bg-pink-50 rounded-xl transition-all shadow-sm border border-pink-100 bg-white flex items-center justify-center"
              aria-label="Buka Keranjang Belanja"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Kontak WA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-wa-btn"
              className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow hover:shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chat Admin</span>
              <span className="sm:hidden">WA</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-100 px-3 py-1 rounded-full mb-4">
            <BadgeCheck className="w-3.5 h-3.5" /> Authorized Reseller Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-3">
            Katalog{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-400">
              Mamiku JimsHoney
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-6 leading-relaxed">
            Dapatkan koleksi <strong>tas, dompet, dan jam tangan</strong> JimsHoney original
            100% langsung dari reseller resmi. Harga terbaik, pengiriman cepat, garansi fisik.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {[
              { icon: ShieldCheck, text: "100% Original" },
              { icon: Truck, text: "Gratis Ongkir Min. 200rb" },
              { icon: RotateCcw, text: "Garansi 7 Hari" },
              { icon: Package, text: "Packing Rapi & Aman" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 bg-white/70 backdrop-blur px-3 py-1.5 rounded-xl border border-pink-100 shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN KATALOG ──────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Search + Filter Baris */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400 pointer-events-none" />
            <input
              id="search-bar"
              type="text"
              placeholder="Cari produk Jims Honey..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-pink-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent placeholder:text-gray-400 text-gray-700"
            />
          </div>

          {/* Info jumlah produk */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-pink-100 px-3 py-2.5 rounded-xl shadow-sm flex-shrink-0">
            <Package className="w-3.5 h-3.5 text-pink-400" />
            <span>
              <strong className="text-pink-600">{filteredProducts.length}</strong> produk ditemukan
            </span>
          </div>
        </div>

        {/* Tab Kategori */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-7 scrollbar-hide"
          role="tablist"
          aria-label="Filter kategori produk"
        >
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`tab-${id}`}
              role="tab"
              aria-selected={activeCategory === id}
              onClick={() => handleCategory(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 shadow-sm ${activeCategory === id
                ? "bg-pink-600 text-white shadow-pink-200 shadow-md"
                : "bg-white text-gray-600 border border-pink-200 hover:bg-pink-50 hover:text-pink-600"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Grid Produk: 2 kolom mobile, 4 kolom desktop */}
        {pagedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Produk tidak ditemukan
            </h2>
            <p className="text-sm text-gray-400">
              Coba kata kunci atau kategori lain.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            role="list"
            aria-label="Daftar produk"
          >
            {pagedProducts.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        )}

        {/* Paginasi */}
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        />
      </main>

      {/* ── TESTIMONIAL ───────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-pink-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-1">
              Kata Pembeli Kami 💬
            </h2>
            <p className="text-sm text-gray-500">
              Ribuan pelanggan puas berbelanja di Mamiku JimsHoney
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: "Anonim",
                loc: "Bandung",
                text: "Produk originalnya terjamin! Kualitas JimsHoney emang nggak diragukan. Pengiriman super cepat dan packing rapi banget. Recommended 100%!",
                product: "Celia Bag",
                avatar: "SD",
              },
              {
                name: "Anonim",
                loc: "Jakarta",
                text: "Udah beli 3x di sini. Barang selalu sesuai foto, ada nota resmi juga. Admin ramah dan fast response. Pasti balik lagi deh!",
                product: "Evelyn Wallet",
                avatar: "PR",
              },
              {
                name: "Anonim",
                loc: "Surabaya",
                text: "Clara Watch-nya cantik banget! Persis seperti di foto, bahkan lebih bagus aslinya. Harga juga lebih murah dari toko lain. Worth it!",
                product: "Clara Watch",
                avatar: "AM",
              },
            ].map(({ name, loc, text, product, avatar }) => (
              <article
                key={name}
                className="bg-rose-50 border border-pink-100 rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {avatar}
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-gray-800">{name}</p>
                    <p className="text-[10px] text-gray-400">
                      {loc} · Beli: {product}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="logo.png"
                alt="Mamiku JimsHoney Logo"
                className="w-9 h-9 object-contain rounded-full bg-white shadow-sm"
              />
              <div className="leading-tight">
                <p className="font-bold text-white text-sm">Mamiku JimsHoney</p>
                <p className="text-pink-400 text-[10px] font-semibold tracking-wider">
                  Authorized Reseller
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              Reseller resmi JimsHoney terpercaya. Produk 100% original dengan garansi
              fisik dan harga terbaik.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Kategori</h3>
            <ul className="space-y-1.5 text-xs">
              {["Tas Jims Honey", "Dompet Jims Honey", "Jam Tangan Jims Honey", "Promo & Diskon"].map(
                (item) => (
                  <li key={item}>
                    <span className="hover:text-pink-400 cursor-pointer transition-colors">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Hubungi Kami</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="hover:text-pink-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 823-3031-3865
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                <span>@mamiku.jimshoney</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Indonesia — Pengiriman ke seluruh wilayah</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <p>© 2025 Mamiku JimsHoney. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for JimsHoney Lovers
          </p>
        </div>
      </footer>

      {/* ── CART SIDEBAR (DRAWER) ────────────────────────────────────────── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-pink-100 h-full relative">
              {/* Header */}
              <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-pink-50">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-pink-600" />
                  <h2 className="text-lg font-bold text-gray-800">Keranjang Belanja</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 hover:bg-pink-100 text-gray-400 hover:text-pink-600 rounded-lg transition-colors"
                  aria-label="Tutup Keranjang"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-2 py-12">
                    <span className="text-4xl">🛒</span>
                    <p className="text-gray-500 font-medium text-sm">Keranjang Anda masih kosong</p>
                    <p className="text-xs text-gray-400">Silakan pilih produk terbaik kami</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl transition-all"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-pink-50/50 p-2.5 rounded-xl border border-pink-100/50"
                    >
                      {/* Emoji / Mini Illustration */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.bg} flex items-center justify-center text-xl shadow-sm flex-shrink-0`}>
                        {item.emoji}
                      </div>

                      {/* Detail */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-gray-800 truncate">{item.name}</h3>
                        <p className="text-[10px] text-pink-600 font-semibold mt-0.5">
                          {formatRupiah(item.price)}
                        </p>
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-1.5 bg-white border border-pink-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-pink-50 text-pink-600 rounded-md transition-colors"
                          aria-label="Kurangi kuantitas"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-700 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-pink-50 text-pink-600 rounded-md transition-colors"
                          aria-label="Tambah kuantitas"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 hover:bg-rose-50 text-gray-400 hover:text-rose-600 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Hapus dari keranjang"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout / Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-pink-100 bg-pink-50/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-600">Total Harga ({cart.reduce((total, item) => total + item.quantity, 0)} Barang):</span>
                    <span className="text-lg font-bold text-pink-600">
                      {formatRupiah(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}
                    </span>
                  </div>

                  <a
                    href={getWhatsAppCartLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Pesanan ke WA</span>
                  </a>
                  <p className="text-[10px] text-center text-gray-400 mt-2">
                    Pesanan Anda akan dikirim ke WhatsApp resmi Mamiku JimsHoney
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
