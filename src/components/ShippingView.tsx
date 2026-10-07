import React, { useState } from 'react';
import {
  DetalleCarrito,
  Direccion,
  ModalidadEntrega,
  Promocion
} from '../types/database';
import { ProductImage } from './ProductImage';
import {
  Check,
  MapPin,
  Truck,
  Store,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Info,
  Navigation,
  Compass,
  Tag
} from 'lucide-react';

interface ShippingViewProps {
  cartItems: DetalleCarrito[];
  shippingAddress: Direccion;
  onUpdateAddress: (address: Partial<Direccion>) => void;
  shippingMethod: ModalidadEntrega;
  onChangeShippingMethod: (method: ModalidadEntrega) => void;
  appliedPromo: Promocion | null;
  onApplyPromoCode: (code: string) => { success: boolean; message: string };
  onBackToCart: () => void;
  onProceedToPayment: () => void;
}

export const ShippingView: React.FC<ShippingViewProps> = ({
  cartItems,
  shippingAddress,
  onUpdateAddress,
  shippingMethod,
  onChangeShippingMethod,
  appliedPromo,
  onApplyPromoCode,
  onBackToCart,
  onProceedToPayment
}) => {
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [pinOffset, setPinOffset] = useState({ x: 0, y: 0 });
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoNotice, setPromoNotice] = useState<string | null>(null);

  // Totals
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

  const shippingCost = shippingMethod === 'DELIVERY' ? 5.00 : 0.00;
  const total = Math.max(0, subtotal + shippingCost - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = onApplyPromoCode(promoCodeInput);
    setPromoNotice(res.message);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPinOffset({ x: Math.max(-100, Math.min(100, x)), y: Math.max(-60, Math.min(60, y)) });
  };

  return (
    <div className="w-full pb-16">
      {/* Banner matching ENVIO.png */}
      <div className="bg-[#2B180C] text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-6 border-b border-[#4A2D18]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-xs text-stone-400 mb-2 flex items-center gap-1.5">
            <span className="hover:text-stone-200 cursor-pointer" onClick={onBackToCart}>
              Inicio
            </span>
            <span>›</span>
            <span className="hover:text-stone-200 cursor-pointer" onClick={onBackToCart}>
              Carrito de compra
            </span>
            <span>›</span>
            <span className="text-[#E8B878]">Envío</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#8C532B] text-white flex items-center justify-center shrink-0 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                Envío
              </h1>
              <p className="text-stone-300 text-sm">
                Completa tus datos de envío para recibir tu pedido.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Bar matching ENVIO.png */}
        <div className="mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            {/* Connecting lines */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-stone-200 -z-0" />
            <div className="absolute top-1/2 left-8 w-1/3 -translate-y-1/2 h-0.5 bg-[#4A2E18] -z-0" />

            {/* Step 1: Carrito (completed) */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-[#4A2E18] text-white flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-stone-700">Carrito de compra</span>
            </div>

            {/* Step 2: Envío (active) */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-[#4A2E18] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#F5EDE4] shadow-md">
                2
              </div>
              <span className="text-xs font-bold text-[#4A2E18]">Envío</span>
            </div>

            {/* Step 3: Pago */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <span className="text-xs font-medium text-stone-400">Pago</span>
            </div>

            {/* Step 4: Confirmación */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <span className="text-xs font-medium text-stone-400">Confirmación</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Dirección y Método de Envío matching ENVIO.png */}
          <div className="lg:col-span-8 space-y-6">
            {/* Box: Dirección de entrega */}
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#8C532B]" />
                  <h2 className="font-display font-bold text-stone-900 text-lg">
                    Dirección de entrega
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useSavedAddress}
                      onChange={(e) => setUseSavedAddress(e.target.checked)}
                      className="rounded text-[#4A2E18] focus:ring-[#8C532B] w-4 h-4 cursor-pointer"
                    />
                    <span>Usar mi dirección guardada</span>
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#8C532B] hover:text-[#52331C] px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] cursor-pointer"
                  >
                    Mis direcciones
                  </button>
                </div>
              </div>

              {/* Input Fields Grid matching ENVIO.png */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value="Ronny"
                    readOnly
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tipo de vía
                  </label>
                  <select
                    value="Avenida"
                    onChange={() => {}}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                  >
                    <option value="Avenida">Avenida</option>
                    <option value="Jirón">Jirón</option>
                    <option value="Calle">Calle</option>
                    <option value="Pasaje">Pasaje</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Teléfono de contacto
                  </label>
                  <input
                    type="text"
                    value="987 654 321"
                    readOnly
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.direccion}
                    onChange={(e) => onUpdateAddress({ direccion: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Departamento
                  </label>
                  <select
                    value={shippingAddress.departamento || 'Áncash'}
                    onChange={(e) => onUpdateAddress({ departamento: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                  >
                    <option value="Áncash">Áncash</option>
                    <option value="Lima">Lima</option>
                    <option value="La Libertad">La Libertad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Provincia
                  </label>
                  <select
                    value={shippingAddress.provincia || 'Santa'}
                    onChange={(e) => onUpdateAddress({ provincia: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                  >
                    <option value="Santa">Santa</option>
                    <option value="Huaraz">Huaraz</option>
                    <option value="Huarmey">Huarmey</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Distrito
                  </label>
                  <select
                    value={shippingAddress.distrito || 'Chimbote'}
                    onChange={(e) => onUpdateAddress({ distrito: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                  >
                    <option value="Chimbote">Chimbote</option>
                    <option value="Nuevo Chimbote">Nuevo Chimbote</option>
                    <option value="Coishco">Coishco</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Código postal (opcional)
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.codigoPostal || '02711'}
                    onChange={(e) => onUpdateAddress({ codigoPostal: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Referencia (opcional)
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.referencia}
                    onChange={(e) => onUpdateAddress({ referencia: e.target.value })}
                    placeholder="Ej. A media cuadra del parque, casa color azul"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                  />
                </div>
              </div>

              {/* Interactive Mini Map matching ENVIO.png (Chimbote Plaza de Armas pin) */}
              <div className="pt-2">
                <div
                  onClick={handleMapClick}
                  className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E8DFD5] bg-[#E5E3DF] cursor-crosshair shadow-inner group"
                >
                  {/* Street map pattern simulation */}
                  <svg className="w-full h-full opacity-60" viewBox="0 0 600 300">
                    <rect width="600" height="300" fill="#E8ECE9" />
                    {/* Ocean water edge */}
                    <path d="M0,0 L120,0 L80,300 L0,300 Z" fill="#CDE1EB" />
                    <text x="30" y="150" fill="#7FA9C2" fontSize="12" fontWeight="bold">Bahía de Chimbote</text>
                    {/* Main avenues */}
                    <line x1="80" y1="120" x2="600" y2="100" stroke="#FFF" strokeWidth="18" />
                    <line x1="80" y1="120" x2="600" y2="100" stroke="#DDD" strokeWidth="2" />
                    <text x="260" y="94" fill="#999" fontSize="10">Av. José Pardo</text>

                    <line x1="120" y1="200" x2="600" y2="180" stroke="#FFF" strokeWidth="14" />
                    <text x="320" y="174" fill="#999" fontSize="9">Av. Bolognesi</text>

                    <line x1="280" y1="0" x2="300" y2="300" stroke="#FFF" strokeWidth="12" />
                    <line x1="420" y1="0" x2="440" y2="300" stroke="#FFF" strokeWidth="12" />

                    {/* Plaza de Armas square */}
                    <rect x="290" y="110" width="70" height="60" fill="#CFE2CE" rx="4" />
                    <text x="295" y="145" fill="#5F885D" fontSize="9" fontWeight="bold">Plaza de Armas</text>
                  </svg>

                  {/* Top right action: Buscar mi ubicación */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md text-xs font-semibold text-stone-800 flex items-center gap-1.5 border border-stone-200">
                    <Navigation className="w-3.5 h-3.5 text-[#8C532B]" />
                    <span>Buscar mi ubicación</span>
                  </div>

                  {/* Zoom controls */}
                  <div className="absolute right-3 bottom-3 flex flex-col bg-white rounded-lg shadow-md border border-stone-200 overflow-hidden text-stone-700 font-bold text-xs">
                    <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-stone-50 border-b border-stone-200">
                      +
                    </button>
                    <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-stone-50">
                      -
                    </button>
                  </div>

                  {/* Interactive Pin */}
                  <div
                    style={{
                      transform: `translate(${pinOffset.x}px, ${pinOffset.y}px)`
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full transition-transform duration-200 pointer-events-none flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#4A2E18] text-[#E8B878] flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-[#8C532B]/30 animate-bounce">
                      <MapPin className="w-5 h-5 fill-current" />
                    </div>
                    <div className="w-3 h-1.5 bg-black/40 rounded-full blur-2xs mt-1" />
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-2 text-xs text-stone-500">
                  <Compass className="w-4 h-4 text-[#8C532B] shrink-0" />
                  <p>
                    <strong className="text-stone-700">Confirma tu ubicación en el mapa:</strong> Haz clic en el mapa para ajustar con precisión la dirección de entrega.
                  </p>
                </div>
              </div>
            </div>

            {/* Box: Método de envío matching ENVIO.png */}
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <Truck className="w-5 h-5 text-[#8C532B]" />
                <h3 className="font-display font-bold text-stone-900 text-lg">
                  Método de envío
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Delivery a domicilio */}
                <div
                  onClick={() => onChangeShippingMethod('DELIVERY')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    shippingMethod === 'DELIVERY'
                      ? 'border-[#4A2E18] bg-[#FAF7F2]'
                      : 'border-[#E8DFD5] bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full border-2 border-[#4A2E18] flex items-center justify-center shrink-0">
                      {shippingMethod === 'DELIVERY' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#4A2E18]" />
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#F5EDE4] text-[#8C532B] flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Delivery a domicilio</h4>
                      <p className="text-[11px] text-stone-500">Recibe tu pedido en la dirección indicada.</p>
                      <span className="text-[11px] text-stone-600 font-semibold block mt-0.5">
                        Tiempo estimado: 30 - 45 min
                      </span>
                    </div>
                  </div>
                  <div className="font-display font-bold text-[#8C532B] text-sm shrink-0">
                    S/ 5.00
                  </div>
                </div>

                {/* Option 2: Recojo en tienda */}
                <div
                  onClick={() => onChangeShippingMethod('RECOJO_TIENDA')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    shippingMethod === 'RECOJO_TIENDA'
                      ? 'border-[#4A2E18] bg-[#FAF7F2]'
                      : 'border-[#E8DFD5] bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full border-2 border-stone-300 flex items-center justify-center shrink-0">
                      {shippingMethod === 'RECOJO_TIENDA' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#4A2E18]" />
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#F5EDE4] text-[#8C532B] flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Recojo en tienda</h4>
                      <p className="text-[11px] text-stone-500">Retira tu pedido en nuestro local.</p>
                      <span className="text-[11px] text-stone-600 font-semibold block mt-0.5">
                        Tiempo estimado: 15 - 20 min
                      </span>
                    </div>
                  </div>
                  <div className="font-bold text-emerald-700 text-sm shrink-0">
                    Gratis
                  </div>
                </div>
              </div>

              {/* Blue Info Notice matching ENVIO.png */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-sky-800">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-sky-600" />
                <p>
                  El tiempo de entrega puede variar según la ubicación y la disponibilidad de los productos.
                </p>
              </div>

              {/* Navigation Action Buttons matching ENVIO.png */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onBackToCart}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E8DFD5] text-stone-700 hover:bg-[#FAF7F2] font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver al carrito</span>
                </button>

                <button
                  type="button"
                  onClick={onProceedToPayment}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4A2E18] hover:bg-[#382314] text-white font-bold text-sm transition-all shadow-md hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continuar al pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sticky Column: Resumen del Pedido matching ENVIO.png */}
          <div className="lg:col-span-4 space-y-5 sticky top-28">
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-md space-y-4">
              <h3 className="font-display font-bold text-stone-900 text-lg pb-3 border-b border-stone-100">
                Resumen del pedido
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.idDetalleCarrito} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <ProductImage
                          imageKey={item.producto?.imagen || 'cappuccino'}
                          alt={item.producto?.nombre || ''}
                          aspectRatio="1/1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 truncate max-w-[130px]">
                          {item.producto?.nombre}
                        </p>
                        <p className="text-stone-400">x {item.cantidad}</p>
                      </div>
                    </div>
                    <span className="font-display font-bold text-stone-800">
                      S/ {(item.precioUnitario * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({totalItemCount} productos)</span>
                  <span className="font-semibold text-stone-900">S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Envío ({shippingMethod === 'DELIVERY' ? 'Delivery' : 'Recojo'})</span>
                  <span className="font-semibold text-stone-900">S/ {shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Descuento</span>
                  <span className={`font-semibold ${discount > 0 ? 'text-emerald-700' : 'text-stone-400'}`}>
                    - S/ {discount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                <span className="font-display font-bold text-stone-900 text-base">Total a pagar</span>
                <span className="font-display font-bold text-2xl text-[#8C532B]">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Código de promoción input box */}
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-5 shadow-xs">
              <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#8C532B]" />
                <span>Código de promoción</span>
              </h4>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingresa tu código"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#E3DBD0] rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#8C532B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A2E18] hover:bg-[#382314] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Aplicar
                </button>
              </form>
              {promoNotice && (
                <p className="text-[11px] text-emerald-700 mt-2 font-medium">
                  {promoNotice}
                </p>
              )}
            </div>

            {/* Compra segura banner matching screenshot */}
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-4.5 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-xs">Compra segura</h5>
                <p className="text-[11px] text-stone-500">
                  Tus datos están protegidos. Realiza tu pedido con total confianza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
