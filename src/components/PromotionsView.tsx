import React, { useState } from 'react';
import { Promocion } from '../types/database';
import { Tag, Copy, Check, Sparkles, ArrowRight, Clock } from 'lucide-react';

interface PromotionsViewProps {
  promotions: Promocion[];
  onApplyPromoToCart: (code: string) => void;
  onGoToCart: () => void;
}

export const PromotionsView: React.FC<PromotionsViewProps> = ({
  promotions,
  onApplyPromoToCart,
  onGoToCart
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyPromoToCart(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="w-full pb-16">
      <div className="bg-[#2B180C] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-8 border-b border-[#4A2D18]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Promociones Exclusivas
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl">
              Aprovecha descuentos especiales en tus cafés favoritos, postres y sándwiches. Aplica el cupón directamente en tu carrito de compra.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#3E2514] px-4 py-2 rounded-xl border border-[#8C532B]/40 text-xs text-[#E8B878]">
            <Sparkles className="w-4 h-4" />
            <span>Gestionadas en la tabla MySQL Promoción</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo) => {
            const isCopied = copiedCode === promo.codigo;
            return (
              <div
                key={promo.idPromocion}
                className="bg-white border-2 border-[#E8DFD5] hover:border-[#8C532B] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Decorative background aura */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#FAF7F2] rounded-full blur-xl -mr-10 -mt-10 group-hover:bg-[#F5EDE4] transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] text-[#8C532B] font-bold text-xs border border-[#E8DFD5]">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{promo.tipoDescuento === 'PORCENTAJE' ? `${promo.descuento}% OFF` : `S/ ${promo.descuento.toFixed(2)} OFF`}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Vigente
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-stone-900 tracking-wider">
                    {promo.codigo}
                  </h3>

                  <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                    {promo.descripcion}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Válido hasta el {promo.fechaFin}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(promo.codigo)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#4A2E18] hover:bg-[#382314] text-white'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? '¡Cupón copiado y aplicado!' : 'Copiar y aplicar'}</span>
                  </button>

                  <button
                    onClick={onGoToCart}
                    className="p-2.5 rounded-xl border border-[#E8DFD5] hover:bg-[#FAF7F2] text-stone-700 transition-colors cursor-pointer"
                    title="Ir al carrito"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
