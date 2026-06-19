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
  Palette,
  Hourglass,
} from "lucide-react";
import { products as ALL_PRODUCTS } from "./data/products";

// ─── DATA PRODUK ──────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "6282330313865";
const PRODUCTS_PER_PAGE = 8;

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

const getProductSpecs = (product) => {
  if (product.category === "tas") {
    return {
      bahan: "Premium Canvas / PU Leather (Lapisan Suede)",
      dimensi: "28 x 12 x 20 cm",
      fitur: "Tali Panjang (Adjustable), Kompartemen Luas, Kantong Zipper"
    };
  } else if (product.category === "dompet") {
    return {
      bahan: "Premium PU Leather Grade A",
      dimensi: "19 x 2.5 x 9.5 cm",
      fitur: "12 Slot Kartu, Sekat Uang Kertas, Sekat Koin Zipper"
    };
  } else {
    return {
      bahan: "Strap Stainless Steel Mesh / Kulit Sintetis",
      dimensi: "Dial 32 mm, Panjang Strap 21 cm",
      fitur: "Water Resistant 3 ATM, Quartz Movement, Crystal Bezel"
    };
  }
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
            style={{ backgroundColor: c.hex }}
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
function ProductCard({ product, onAddToCart, onOpenQuickView }) {
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
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onOpenQuickView(product)}
      >
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
        {/* Status Badge */}
        {product.status === "ready" ? (
          <span className="absolute top-[34px] right-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm flex items-center gap-1 backdrop-blur-sm bg-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Ready
          </span>
        ) : (
          <span className="absolute top-[34px] right-2 bg-amber-50 text-amber-700 border border-amber-200 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm flex items-center gap-1 backdrop-blur-sm bg-white/70">
            <Hourglass className="w-2.5 h-2.5 animate-[spin_4s_linear_infinite]" />
            PO
          </span>
        )}
        {/* Tombol wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label="Tambah ke favorit"
          className="absolute bottom-2 left-2 w-6 h-6 sm:w-7 sm:h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow hover:bg-pink-50"
        >
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400" />
        </button>
      </div>      {/* Konten kartu */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 gap-1 sm:gap-1.5">
        {/* Nama produk */}
        <h3
          onClick={() => onOpenQuickView(product)}
          className="font-semibold text-gray-800 text-xs sm:text-sm leading-tight line-clamp-1 cursor-pointer hover:text-pink-600 transition-colors"
        >
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

        {/* Tombol Pilih Warna */}
        <button
          id={`select-color-btn-${product.id}`}
          onClick={() => onOpenQuickView(product)}
          className="mt-1 flex items-center justify-center gap-1 sm:gap-1.5 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white text-[10px] sm:text-xs font-semibold py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 shadow hover:shadow-md w-full"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Pilih Warna</span>
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

  // State untuk Quick View Modal
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  const addToCart = (product, colorName) => {
    const colorToUse = colorName || product.colors[0].name;
    const cartItemId = `${product.id}-${colorToUse}`;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, cartItemId, selectedColor: colorToUse, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const getWhatsAppCartLink = () => {
    const cartItemsText = cart
      .map(
        (item) =>
          `- *${item.name} - Varian ${item.selectedColor} [${item.status === "ready" ? "Ready Stock" : "Pre-Order"}]* (Qty: ${item.quantity}) @ ${formatRupiah(item.price)} = *${formatRupiah(item.price * item.quantity)}*`
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
            Mamiku{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-400">
              JimsHoney
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-6 leading-relaxed">
            Dapatkan koleksi <strong>tas, dompet, dan jam tangan</strong> JimsHoney original
            100% resmi. Harga terbaik, pengiriman cepat, garansi fisik.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {[
              { icon: ShieldCheck, text: "100% Original" },
              { icon: Truck, text: "Gratis Ongkir Min. 250rb" },
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
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onOpenQuickView={(p) => {
                    setActiveProduct(p);
                    setSelectedColor(p.colors[0].name);
                    setIsQuickViewOpen(true);
                  }}
                />
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
            ].map(({ name, loc, text, product, avatar }, index) => (
              <article
                key={index}
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
                      key={item.cartItemId}
                      className="flex items-center gap-3 bg-pink-50/50 p-2.5 rounded-xl border border-pink-100/50"
                    >
                      {/* Emoji / Mini Illustration */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.bg} flex items-center justify-center text-xl shadow-sm flex-shrink-0`}>
                        {item.emoji}
                      </div>

                      {/* Detail */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-gray-800 truncate">{item.name}</h3>
                        <p className="text-[10px] text-gray-400 font-medium">Warna: {item.selectedColor}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {item.status === "ready" ? (
                            <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 uppercase tracking-wide">
                              Ready
                            </span>
                          ) : (
                            <span className="text-[8px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-100 uppercase tracking-wide">
                              PO
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-pink-600 font-semibold mt-0.5">
                          {formatRupiah(item.price)}
                        </p>
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-1.5 bg-white border border-pink-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="p-1 hover:bg-pink-50 text-pink-600 rounded-md transition-colors"
                          aria-label="Kurangi kuantitas"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-700 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="p-1 hover:bg-pink-50 text-pink-600 rounded-md transition-colors"
                          aria-label="Tambah kuantitas"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
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

      {/* ── QUICK VIEW MODAL ────────────────────────────────────────────── */}
      {isQuickViewOpen && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsQuickViewOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh] z-10 border border-pink-100 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-pink-100 text-gray-400 hover:text-pink-600 rounded-full transition-colors shadow-sm"
              aria-label="Tutup Detail"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Panel: Image/Illustration (md:col-span-5) */}
            <div className={`relative md:col-span-5 bg-gradient-to-br ${activeProduct.bg} flex flex-col items-center justify-center p-8 overflow-hidden min-h-[220px] md:min-h-full`}>
              {/* Lingkaran dekorasi */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/20 rounded-full blur-xl" />

              {/* Large Emoji */}
              <span className="text-7xl md:text-8xl select-none drop-shadow-md transform hover:scale-110 transition-transform duration-300">
                {activeProduct.emoji}
              </span>

              <p className="mt-4 text-[10px] font-bold text-pink-500/80 tracking-widest uppercase bg-white/85 px-3 py-1 rounded-full shadow-sm">
                Mamiku JimsHoney
              </p>

              {/* Badge */}
              {activeProduct.badge && (
                <span className="absolute top-4 left-4 bg-pink-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  {activeProduct.badge}
                </span>
              )}
            </div>

            {/* Right Panel: Content (md:col-span-7) */}
            <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[85vh]">
              <div>
                {/* Category & Badge Check */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-600 mb-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wider">{activeProduct.category}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 leading-tight mb-2">
                  {activeProduct.name}
                </h2>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={activeProduct.rating} reviews={activeProduct.reviews} />
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-2 mb-4 bg-pink-50/50 p-3 rounded-2xl border border-pink-100/50 w-fit">
                  <span className="text-lg md:text-xl font-black text-pink-600">
                    {formatRupiah(activeProduct.price)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatRupiah(activeProduct.originalPrice)}
                  </span>
                  <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full shadow-sm">
                    -{getDiscount(activeProduct.price, activeProduct.originalPrice)}% OFF
                  </span>
                </div>

                {/* Status Stok */}
                {activeProduct.status === "ready" ? (
                  <div className="mb-4 bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl p-3 text-[11px] sm:text-xs font-semibold flex items-center gap-2 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Ready Stock di Toko (Bisa dikirim/diambil hari ini!)</span>
                  </div>
                ) : (
                  <div className="mb-4 bg-amber-50 border border-amber-150 text-amber-800 rounded-xl p-3 text-[11px] sm:text-xs font-semibold flex items-center gap-2 shadow-sm">
                    <Hourglass className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 animate-[spin_4s_linear_infinite]" />
                    <span>Sistem PO: Estimasi Pengiriman 3 - 5 Hari Kerja</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {activeProduct.description}
                </p>

                {/* Specifications: bahan, dimensi, dll */}
                <div className="mb-5 space-y-2 border-t border-pink-50 pt-4">
                  <h3 className="text-xs font-bold text-gray-800">Spesifikasi Produk:</h3>
                  <div className="grid grid-cols-1 gap-1.5 text-[11px] text-gray-500">
                    <div className="flex">
                      <span className="font-semibold text-gray-600 w-16 flex-shrink-0">Bahan:</span>
                      <span>{getProductSpecs(activeProduct).bahan}</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-gray-600 w-16 flex-shrink-0">Ukuran:</span>
                      <span>{getProductSpecs(activeProduct).dimensi}</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-gray-600 w-16 flex-shrink-0">Fitur:</span>
                      <span>{getProductSpecs(activeProduct).fitur}</span>
                    </div>
                  </div>
                </div>

                {/* Color Selector */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-800">Pilih Varian Warna:</span>
                    <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md animate-pulse">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {activeProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-1 ${selectedColor === c.name
                          ? "border-pink-600 scale-110 shadow-md"
                          : "border-gray-200 hover:border-pink-400 hover:scale-105"
                          }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <span className="w-3 h-3 bg-white rounded-full border-2 border-pink-600 shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart button inside modal */}
              <button
                id="modal-add-to-cart-btn"
                onClick={() => {
                  addToCart(activeProduct, selectedColor);
                  setIsQuickViewOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 active:scale-[0.98] text-white text-xs md:text-sm font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>+ Tambah Varian {selectedColor} ke Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
