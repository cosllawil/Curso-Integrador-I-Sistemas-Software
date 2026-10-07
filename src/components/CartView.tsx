import React, { useState } from 'react';
import { DetalleCarrito, Producto, Promocion } from '../types/database';
import { ProductImage } from './ProductImage';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  Coffee,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CartViewProps {
  cartItems: DetalleCarrito[];
  onUpdateQuantity: (idDetalleCarrito: number, newQty: number) => void;
  onRemoveItem: (idDetalleCarrito: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  suggestedProducts: Producto[];
  onAddSuggestedProduct: (product: Producto) => void;
  appliedPromo: Promocion | null;
  onApplyPromoCode: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  suggestedProducts,
  onAddSuggestedProduct,
  appliedPromo,
  onApplyPromoCode,
  onRemovePromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Math
  const subtotal = cartItems.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.tipoDescuento === 'PORCENTAJE') {
      discount = Number(((subtotal * appliedPromo.descuento) / 100).toFixed(2));
    } else {
      discount = appliedPromo.descuento;
    }
  }

  const shipping = 0; // calculated in shipping step
  const totalToPay = Math.max(0, subtotal - discount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="w-full pb-16">
      {/* Banner matching CARRITO DE COMPRA.png */}
      <div className="bg-[#2B180C] text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-8 border-b border-[#4A2D18]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-xs text-stone-400 mb-2 flex items-center gap-1.5">
            <span className="hover:text-stone-200 cursor-pointer" onClick={onContinueShopping}>
              Inicio
            </span>
            <span>›</span>
            <span className="text-[#E8B878]">Carrito de compra</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-2">
            Carrito de compra
          </h1>
          <p className="text-stone-300 text-sm max-w-xl">
            Revisa tus productos y completa tu pedido con la frescura y aroma de Paz y Espresso.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DFD5] shadow-xs max-w-2xl mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-[#FAF7F2] text-[#8C532B] flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-10 h-10" />
            </div>
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">
              Explora nuestra selección de cafés recién tostados, panes y postres artesanales para comenzar tu orden.
            </p>
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A2E18] hover:bg-[#382314] text-white font-semibold text-sm transition-colors cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver catálogo de productos</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Products in Cart */}
            <div className="lg:col-span-8 space-y-8">
              {/* Box: "Productos en tu carrito (N)" */}
              <div className="bg-white rounded-2xl border border-[#E8DFD5] p-5 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-stone-900 text-lg">
                      Productos en tu carrito ({totalItemCount})
                    </span>
                  </div>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar carrito</span>
                  </button>
                </div>

                {/* Item List Rows */}
                <div className="divide-y divide-stone-100">
                  {cartItems.map((item) => (
                    <div
                      key={item.idDetalleCarrito}
                      className="py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Title */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 shadow-inner">
                          <ProductImage
                            imageKey={item.producto?.imagen || 'cappuccino'}
                            alt={item.producto?.nombre || 'Producto'}
                            aspectRatio="1/1"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 text-base">
                            {item.producto?.nombre}
                          </h4>
                          <p className="text-xs text-stone-500 font-medium">
                            {item.producto?.categoriaNombre || 'Especialidad'}
                          </p>
                          {item.varianteSeleccionada && (
                            <p className="text-[11px] text-[#8C532B] mt-0.5 font-medium">
                              {item.varianteSeleccionada}
                            </p>
                          )}
                          <div className="font-display font-semibold text-stone-800 text-sm mt-1 sm:hidden">
                            S/ {item.precioUnitario.toFixed(2)} c/u
                          </div>
                        </div>
                      </div>

                      {/* Stepper & Subtotal matching screenshot */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        {/* Stepper [- 1 +] */}
                        <div className="flex items-center border border-[#E3DBD0] rounded-xl bg-[#FAF7F2] p-0.5">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.idDetalleCarrito, item.cantidad - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center font-bold text-xs text-stone-900">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.idDetalleCarrito, item.cantidad + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right min-w-24">
                          <span className="text-[11px] text-stone-400 block uppercase tracking-wider">
                            Subtotal
                          </span>
                          <span className="font-display font-bold text-stone-900 text-base">
                            S/ {(item.precioUnitario * item.cantidad).toFixed(2)}
                          </span>
                        </div>

                        {/* Delete row button */}
                        <button
                          onClick={() => onRemoveItem(item.idDetalleCarrito)}
                          className="w-8 h-8 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* "También te puede interesar" Section matching CARRITO DE COMPRA.png */}
              <div className="bg-white rounded-2xl border border-[#E8DFD5] p-5 shadow-xs">
                <h3 className="font-display font-bold text-stone-900 text-base mb-4 flex items-center gap-2">
                  <span>★ También te puede interesar</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                  {suggestedProducts.slice(0, 5).map((prod) => (
                    <div
                      key={prod.idProducto}
                      className="border border-[#E8DFD5] rounded-xl p-2.5 flex flex-col justify-between hover:shadow-md transition-all bg-[#FAF7F2]/60"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-2">
                        <ProductImage
                          imageKey={prod.imagen}
                          alt={prod.nombre}
                          aspectRatio="4/3"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-stone-900 text-xs truncate">
                          {prod.nombre}
                        </h5>
                        <p className="font-display font-semibold text-xs text-stone-800 mt-1">
                          S/ {prod.precio.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => onAddSuggestedProduct(prod)}
                        className="mt-2.5 w-full py-1.5 bg-[#4A2E18] hover:bg-[#382314] text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Agregar</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Column: Resumen del Pedido matching CARRITO DE COMPRA.png */}
            <div className="lg:col-span-4 space-y-5 sticky top-28">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-md space-y-4">
                <h3 className="font-display font-bold text-stone-900 text-lg flex items-center gap-2 pb-3 border-b border-stone-100">
                  <span>Resumen del pedido</span>
                </h3>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal ({totalItemCount} productos)</span>
                    <span className="font-semibold text-stone-900">
                      S/ {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Descuento</span>
                    <span className={`font-semibold ${discount > 0 ? 'text-emerald-700' : 'text-stone-400'}`}>
                      - S/ {discount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Envío</span>
                    <span className="text-stone-400 italic text-xs">
                      Se calcula en el siguiente paso
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                  <span className="font-display font-bold text-base text-stone-900">
                    Total a pagar
                  </span>
                  <span className="font-display font-bold text-2xl text-[#8C532B]">
                    S/ {totalToPay.toFixed(2)}
                  </span>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#4A2E18] hover:bg-[#382314] text-white font-bold text-sm transition-all shadow-lg shadow-[#4A2E18]/25 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceder al pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Secondary Button */}
                <button
                  onClick={onContinueShopping}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#E8DFD5] text-stone-700 hover:bg-[#FAF7F2] font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Seguir comprando</span>
                </button>
              </div>

              {/* Promo Code Box */}
              <div className="bg-white rounded-2xl border border-[#E8DFD5] p-5 shadow-xs">
                <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#8C532B]" />
                  <span>Código de promoción</span>
                </h4>

                {appliedPromo ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Cupón {appliedPromo.codigo} aplicado</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        {appliedPromo.descripcion} (-S/ {discount.toFixed(2)})
                      </p>
                    </div>
                    <button
                      onClick={onRemovePromo}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold underline cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ingresa tu código (Ej: PAZ10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#8C532B]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#4A2E18] hover:bg-[#382314] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
                      >
                        Aplicar
                      </button>
                    </div>

                    {promoMessage && (
                      <p
                        className={`text-[11px] flex items-center gap-1 font-medium ${
                          promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                        }`}
                      >
                        {promoMessage.isError ? (
                          <AlertCircle className="w-3 h-3" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        <span>{promoMessage.text}</span>
                      </p>
                    )}

                    <div className="text-[11px] text-stone-400 pt-1">
                      💡 Cupones disponibles: <span className="font-semibold text-stone-600">PAZ10</span> (10% desc.) o <span className="font-semibold text-stone-600">EXPRESSO5</span> (S/ 5.00 desc.)
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
