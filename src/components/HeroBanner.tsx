import React from 'react';
import { Truck, Award, Tag, ShieldCheck, ArrowRight, Coffee } from 'lucide-react';

interface HeroBannerProps {
  onExploreProducts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreProducts }) => {
  return (
    <div className="w-full">
      {/* Cinematic Coffee Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2B180C] via-[#3E2514] to-[#1E1108] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#4A2D18]">
        {/* Warm glow & ambient background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#C49A45_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#C48C46]/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#52331C]/80 border border-[#8C532B]/50 text-xs font-semibold text-[#E8B878] tracking-wider uppercase">
              <Coffee className="w-3.5 h-3.5 text-[#E8B878]" />
              Café de Especialidad & Repostería Fina
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FFF8F0] leading-tight text-balance">
              Disfruta un buen momento con{' '}
              <span className="text-[#E8B878] italic">Paz y Espresso</span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Café de calidad, sabores únicos y la mejor experiencia, ahora al alcance de un clic. Elaborado con granos selectos y recetas artesanales.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8C532B] hover:bg-[#A36435] text-white font-medium text-sm transition-all shadow-lg shadow-[#8C532B]/30 hover:scale-[1.02] cursor-pointer"
              >
                <span>Ver productos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-stone-300 flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Atendiendo pedidos en Chimbote & Nuevo Chimbote</span>
              </div>
            </div>
          </div>

          {/* Right Visual Cup Showcase matching INICIO DE PAGINA.png */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Soft radiant aura */}
              <div className="absolute inset-0 bg-[#D4A373]/20 rounded-full blur-3xl" />
              
              {/* Cup with Saucer Graphic */}
              <div className="relative w-56 h-56 sm:w-68 sm:h-68 rounded-full bg-[#EAE5DC] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-8 border-[#D8CEBF] flex items-center justify-center p-4">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#F4F1EA] shadow-inner border-2 border-[#CFC5B4] flex items-center justify-center p-3">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#BF7F3E] via-[#854516] to-[#452006] shadow-inner flex items-center justify-center relative overflow-hidden">
                    {/* Latte Heart Art */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#FFF8EE] rounded-full shadow-sm flex items-center justify-center -mb-2">
                        <div className="w-9 h-9 bg-[#FFF8EE] rotate-45 transform origin-center" />
                      </div>
                      <div className="w-16 h-6 bg-[#FFF8EE] rounded-full shadow-sm -mb-2" />
                      <div className="w-1.5 h-10 bg-[#FFF8EE] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag overlay */}
              <div className="absolute -bottom-2 -left-2 bg-[#382314]/90 backdrop-blur-md border border-[#8C532B]/50 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-lg">
                ☕ Granos 100% Arábica
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Value Proposition Cards matching screenshots */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#E8DFD5]">
          {/* Prop 1 */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#F5EDE4] text-[#8C532B] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Envío rápido
              </h4>
              <p className="text-xs text-stone-500">Recibe tu pedido en el menor tiempo.</p>
            </div>
          </div>

          {/* Prop 2 */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#F5EDE4] text-[#8C532B] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Productos de calidad
              </h4>
              <p className="text-xs text-stone-500">Cafés y sabores seleccionados.</p>
            </div>
          </div>

          {/* Prop 3 */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#F5EDE4] text-[#8C532B] flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Promociones exclusivas
              </h4>
              <p className="text-xs text-stone-500">Descuentos especiales para ti.</p>
            </div>
          </div>

          {/* Prop 4 */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#F5EDE4] text-[#8C532B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Pago seguro
              </h4>
              <p className="text-xs text-stone-500">Compra de forma segura y confiable.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
