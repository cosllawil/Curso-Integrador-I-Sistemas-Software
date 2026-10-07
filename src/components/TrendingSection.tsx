import React, { useState } from 'react';
import { Producto } from '../types/database';
import { ProductImage } from './ProductImage';
import { Heart, Star, ShoppingBag, Sparkles } from 'lucide-react';

interface TrendingSectionProps {
  products: Producto[];
  onAddToCart: (product: Producto, quantity?: number) => void;
  onOpenProductDetail: (product: Producto) => void;
  selectedCategoryId?: number | null;
  onSelectCategoryFilter?: (catId: number | null) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  products,
  onAddToCart,
  onOpenProductDetail,
  selectedCategoryId = null,
  onSelectCategoryFilter
}) => {
  const [activeTab, setActiveTab] = useState<string>('En tendencia');
  const [sortBy, setSortBy] = useState<'ventas' | 'precio_asc' | 'precio_desc' | 'rating'>('ventas');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [addedAnimationId, setAddedAnimationId] = useState<number | null>(null);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = (e: React.MouseEvent, product: Producto) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedAnimationId(product.idProducto);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const tabs = [
    'En tendencia',
    'Cafés',
    'Bebidas Frías',
    'Postres',
    'Sándwiches',
    'Panes',
    'Otros'
  ];

  // Filtering
  const filteredProducts = products
    .filter((p) => {
      if (selectedCategoryId) {
        return p.idCategoria === selectedCategoryId;
      }
      if (activeTab === 'En tendencia') return true;
      return p.categoriaNombre?.toLowerCase() === activeTab.toLowerCase();
    })
    .sort((a, b) => {
      if (sortBy === 'ventas') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'precio_asc') return a.precio - b.precio;
      if (sortBy === 'precio_desc') return b.precio - a.precio;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const getTagStyle = (tag?: string) => {
    switch (tag) {
      case 'Más vendido':
        return 'bg-amber-600 text-white';
      case 'En tendencia':
        return 'bg-rose-700 text-white';
      case 'Popular':
        return 'bg-sky-700 text-white';
      case 'Nuevo':
        return 'bg-emerald-700 text-white';
      default:
        return 'bg-stone-800 text-white';
    }
  };

  return (
    <section className="w-full pb-16">
      {/* Banner matching PRODUCTOS EN TENDENCIA.png */}
      <div className="bg-[#2B180C] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-8 border-b border-[#4A2D18]">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#C48C46]/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Productos en tendencia
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Los favoritos de nuestros clientes, descubre los más pedidos y vive una experiencia única de sabor. Preparados al instante con ingredientes premium.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#3E2514] px-4 py-2 rounded-xl border border-[#8C532B]/50 shrink-0 text-xs text-[#E8B878]">
            <Sparkles className="w-4 h-4 text-[#E8B878]" />
            <span>Actualizado en tiempo real con MySQL JPA</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls row matching screenshot */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          {/* Filter button tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (onSelectCategoryFilter) onSelectCategoryFilter(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab && !selectedCategoryId
                    ? 'bg-[#3E2514] text-white shadow-md'
                    : 'bg-white border border-[#E8DFD5] text-stone-700 hover:bg-[#FAF7F2]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort dropdown matching screenshot */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="text-xs text-stone-500 font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E8DFD5] rounded-xl text-xs px-3 py-2 text-stone-800 font-medium focus:outline-none focus:border-[#8C532B] shadow-2xs"
            >
              <option value="ventas">Más vendidos</option>
              <option value="precio_asc">Precio: Menor a Mayor</option>
              <option value="precio_desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid matching screenshots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFav = favorites.has(product.idProducto);
            const isAdded = addedAnimationId === product.idProducto;

            return (
              <div
                key={product.idProducto}
                onClick={() => onOpenProductDetail(product)}
                className="bg-white border border-[#E8DFD5] hover:border-[#8C532B]/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer relative"
              >
                {/* Top Badges & Wishlist Button */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <ProductImage
                    imageKey={product.imagen}
                    alt={product.nombre}
                    aspectRatio="4/3"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Tag Pill badge on top left */}
                  {product.tag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 ${getTagStyle(
                          product.tag
                        )}`}
                      >
                        {product.tag === 'Más vendido' && '👑'}
                        {product.tag === 'En tendencia' && '🔥'}
                        {product.tag === 'Popular' && '⭐'}
                        {product.tag === 'Nuevo' && '🌿'}
                        <span>{product.tag}</span>
                      </span>
                    </div>
                  )}

                  {/* Heart button on top right */}
                  <button
                    onClick={(e) => toggleFavorite(e, product.idProducto)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-md"
                    aria-label="Agregar a favoritos"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-[#8C532B] transition-colors leading-snug">
                      {product.nombre}
                    </h3>

                    {/* Star rating & review count matching screenshot */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-stone-500 font-medium">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.descripcion}
                    </p>
                  </div>

                  {/* Price & Add to cart button */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col gap-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                        Precio
                      </span>
                      <span className="font-display font-bold text-lg text-stone-900">
                        S/ {product.precio.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                        isAdded
                          ? 'bg-emerald-700 text-white scale-[0.98]'
                          : 'bg-[#4A2E18] hover:bg-[#382314] text-white hover:scale-[1.01]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isAdded ? '¡Agregado al carrito!' : 'Agregar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
