import React, { useState } from 'react';
import { Categoria } from '../types/database';
import { ProductImage } from './ProductImage';
import { ArrowRight, ChevronRight, Search, Sparkles } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Categoria[];
  onSelectCategory: (idCategoria: number) => void;
  onExplorePromotions: () => void;
  fullPageView?: boolean;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSelectCategory,
  onExplorePromotions,
  fullPageView = false
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredCategories = categories
    .filter((cat) => {
      const matchesSearch = cat.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeCategoryFilter === null || cat.idCategoria === activeCategoryFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.nombre.localeCompare(b.nombre);
      return b.nombre.localeCompare(a.nombre);
    });

  if (!fullPageView) {
    // Compact section for Homepage matching INICIO DE PAGINA.png
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-stone-900 tracking-tight">
            Categorías
          </h2>
          <button
            onClick={() => onSelectCategory(0)}
            className="text-xs font-semibold text-[#8C532B] hover:text-[#52331C] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.idCategoria}
              onClick={() => onSelectCategory(cat.idCategoria)}
              className="group flex flex-col items-center bg-white border border-[#E8DFD5] hover:border-[#8C532B] rounded-2xl p-3.5 transition-all hover:shadow-md cursor-pointer text-center"
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-3 shadow-inner">
                <ProductImage
                  imageKey={cat.imagen || 'coffee'}
                  alt={cat.nombre}
                  aspectRatio="4/3"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-stone-900 text-sm group-hover:text-[#8C532B] transition-colors">
                {cat.nombre}
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                ({cat.totalProductos || 8} productos)
              </p>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // Full Page view matching CATEGORIAS.png
  return (
    <div className="w-full pb-16">
      {/* Banner matching CATEGORIAS.png */}
      <div className="bg-[#2B180C] text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-8 border-b border-[#4A2D18]">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#C48C46]/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-2">
              Categorías
            </h1>
            <p className="text-stone-300 text-sm max-w-xl">
              Explora nuestros productos y encuentra tu sabor favorito. Granos seleccionados y panadería recién salida del horno.
            </p>
          </div>
          <div className="text-xs text-[#E8B878] bg-[#3E2514] px-3.5 py-1.5 rounded-lg border border-[#8C532B]/40">
            6 Categorías disponibles en MySQL
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar matching CATEGORIAS.png */}
          <div className="lg:col-span-3 space-y-6">
            {/* Category Navigation Box */}
            <div className="bg-white border border-[#E8DFD5] rounded-2xl p-4 shadow-xs">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <span>Categorías</span>
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategoryFilter(null)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeCategoryFilter === null
                      ? 'bg-[#4A2E18] text-white'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>Todas las categorías</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.idCategoria}
                    onClick={() => setActiveCategoryFilter(cat.idCategoria)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      activeCategoryFilter === cat.idCategoria
                        ? 'bg-[#4A2E18] text-white'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{cat.nombre}</span>
                    <span className="text-[11px] opacity-70">({cat.totalProductos})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Card: "Descubre nuestros sabores" */}
            <div className="bg-gradient-to-br from-[#2D1B10] to-[#4A2E18] rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[#E8B878]/30">
                <Sparkles className="w-12 h-12" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#FFF8F0] mb-1">
                Descubre nuestros sabores
              </h4>
              <p className="text-xs text-stone-300 mb-4">
                Aprovecha cupones especiales como PAZ10 y EXPRESSO5 en tu carrito.
              </p>
              <button
                onClick={onExplorePromotions}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#8C532B] hover:bg-[#A36435] text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <span>Ver promociones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Filter & Search Bar matching CATEGORIAS.png */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DFD5]">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#8C532B]"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                  Ordenar por:
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="bg-[#FAF7F2] border border-[#E3DBD0] rounded-lg text-xs px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-[#8C532B]"
                >
                  <option value="asc">Nombre (A - Z)</option>
                  <option value="desc">Nombre (Z - A)</option>
                </select>
              </div>
            </div>

            {/* Grid of Categories with "Ver productos >" button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.idCategoria}
                  className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col"
                >
                  <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden relative">
                    <ProductImage
                      imageKey={cat.imagen || 'coffee'}
                      alt={cat.nombre}
                      aspectRatio="4/3"
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-stone-900 group-hover:text-[#8C532B] transition-colors">
                        {cat.nombre}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {cat.descripcion}
                      </p>
                      <span className="inline-block text-[11px] font-medium text-stone-400 mt-2">
                        {cat.totalProductos || 8} productos registrados
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectCategory(cat.idCategoria)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#4A2E18] hover:bg-[#382314] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Ver productos</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
