import React, { useState } from 'react';
import {
  DetalleCarrito,
  MetodoPago,
  ModalidadEntrega,
  Promocion
} from '../types/database';
import { ProductImage } from './ProductImage';
import {
  Check,
  CreditCard,
  Building2,
  Calendar,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  QrCode,
  Copy,
  Smartphone
} from 'lucide-react';

interface PaymentViewProps {
  cartItems: DetalleCarrito[];
  shippingMethod: ModalidadEntrega;
  appliedPromo: Promocion | null;
  onBackToShipping: () => void;
  onConfirmOrder: (paymentDetails: {
    method: MetodoPago;
    cardNumber?: string;
    cardHolder?: string;
    expiry?: string;
    yapePlinPhone?: string;
    operationCode?: string;
  }) => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  cartItems,
  shippingMethod,
  appliedPromo,
  onBackToShipping,
  onConfirmOrder
}) => {
  const [selectedMethod, setSelectedMethod] = useState<MetodoPago>('TARJETA_CREDITO');
  const [cardNumber, setCardNumber] = useState('1234 5678 9012 3456');
  const [cardExpiry, setCardExpiry] = useState('12 / 28');
  const [cardCvv, setCardCvv] = useState('321');
  const [cardHolder, setCardHolder] = useState('RONNY COSCOL LLATAS');
  const [saveCard, setSaveCard] = useState(true);

  // Yape / Plin states
  const [mobilePhone, setMobilePhone] = useState('987 654 321');
  const [operationCode, setOperationCode] = useState('784912');
  const [copiedBank, setCopiedBank] = useState(false);

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

  const shippingCost = shippingMethod === 'DELIVERY' ? 5.00 : 0.00;
  const total = Math.max(0, subtotal + shippingCost - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmOrder({
      method: selectedMethod,
      cardNumber,
      cardHolder,
      expiry: cardExpiry,
      yapePlinPhone: mobilePhone,
      operationCode
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="w-full pb-16">
      {/* Banner matching MEDIO DE PAGO.png */}
      <div className="bg-[#2B180C] text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-6 border-b border-[#4A2D18]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-xs text-stone-400 mb-2 flex items-center gap-1.5">
            <span className="hover:text-stone-200 cursor-pointer">Inicio</span>
            <span>›</span>
            <span className="hover:text-stone-200 cursor-pointer">Carrito de compra</span>
            <span>›</span>
            <span className="hover:text-stone-200 cursor-pointer" onClick={onBackToShipping}>
              Envío
            </span>
            <span>›</span>
            <span className="text-[#E8B878]">Medio de pago</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#8C532B] text-white flex items-center justify-center shrink-0 shadow-md">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                Medio de pago
              </h1>
              <p className="text-stone-300 text-sm">
                Elige el método de pago que más te convenga.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Bar matching MEDIO DE PAGO.png */}
        <div className="mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-stone-200 -z-0" />
            <div className="absolute top-1/2 left-8 w-2/3 -translate-y-1/2 h-0.5 bg-[#4A2E18] -z-0" />

            {/* Step 1: Carrito (completed) */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-[#4A2E18] text-white flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-stone-700">Carrito de compra</span>
            </div>

            {/* Step 2: Envío (completed) */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-[#4A2E18] text-white flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-stone-700">Envío</span>
            </div>

            {/* Step 3: Medio de pago (active) */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-[#4A2E18] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#F5EDE4] shadow-md">
                3
              </div>
              <span className="text-xs font-bold text-[#4A2E18]">Medio de pago</span>
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
          {/* Left Form: Selección de Método y Datos de Pago */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-xs space-y-6">
              <div className="pb-4 border-b border-stone-100 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#8C532B]" />
                <h2 className="font-display font-bold text-stone-900 text-lg">
                  Selecciona un método de pago
                </h2>
              </div>

              {/* 4 Method Cards matching MEDIO DE PAGO.png */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Tarjeta */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('TARJETA_CREDITO')}
                  className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center ${
                    selectedMethod === 'TARJETA_CREDITO'
                      ? 'border-[#4A2E18] bg-[#FAF7F2] shadow-xs'
                      : 'border-[#E8DFD5] bg-white hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-[#4A2E18]" />
                  <span className="text-xs font-bold text-stone-900 leading-tight">
                    Tarjeta de crédito/débito
                  </span>
                </button>

                {/* 2. Yape */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('YAPE')}
                  className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center ${
                    selectedMethod === 'YAPE'
                      ? 'border-[#742284] bg-purple-50 shadow-xs'
                      : 'border-[#E8DFD5] bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#742284] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    yape
                  </div>
                  <span className="text-xs font-bold text-stone-900">Yape</span>
                </button>

                {/* 3. Plin */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('PLIN')}
                  className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center ${
                    selectedMethod === 'PLIN'
                      ? 'border-[#00BCD4] bg-cyan-50 shadow-xs'
                      : 'border-[#E8DFD5] bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#00BCD4] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    plin
                  </div>
                  <span className="text-xs font-bold text-stone-900">Plin</span>
                </button>

                {/* 4. Transferencia */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('TRANSFERENCIA')}
                  className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center ${
                    selectedMethod === 'TRANSFERENCIA'
                      ? 'border-[#4A2E18] bg-[#FAF7F2] shadow-xs'
                      : 'border-[#E8DFD5] bg-white hover:border-stone-300'
                  }`}
                >
                  <Building2 className="w-6 h-6 text-[#4A2E18]" />
                  <span className="text-xs font-bold text-stone-900 leading-tight">
                    Transferencia bancaria
                  </span>
                </button>
              </div>

              {/* Form Content based on selection */}
              {selectedMethod === 'TARJETA_CREDITO' && (
                <div className="pt-2 space-y-4">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">Pago con tarjeta</h3>
                    <p className="text-xs text-stone-500">
                      Aceptamos Visa, MasterCard y American Express.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-extrabold text-[10px] tracking-wider">
                        VISA
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-700 text-white font-extrabold text-[10px] tracking-wider">
                        Mastercard
                      </span>
                      <span className="px-2 py-0.5 rounded bg-sky-600 text-white font-extrabold text-[10px] tracking-wider">
                        AMEX
                      </span>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Número de tarjeta
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs font-mono tracking-wider text-stone-800 focus:outline-none focus:border-[#8C532B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Fecha de vencimiento
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / AA"
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs font-mono text-stone-800 focus:outline-none focus:border-[#8C532B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Código de seguridad (CVV)
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="password"
                            value={cardCvv}
                            maxLength={4}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs font-mono text-stone-800 focus:outline-none focus:border-[#8C532B]"
                          />
                          <HelpCircle className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nombre del titular
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3DBD0] rounded-xl text-xs uppercase font-semibold text-stone-800 focus:outline-none focus:border-[#8C532B]"
                        />
                      </div>
                    </div>

                    {/* Toggle Save card matching screenshot */}
                    <div className="pt-1 flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setSaveCard(!saveCard)}
                          className={`w-10 h-5.5 rounded-full p-0.5 transition-colors ${
                            saveCard ? 'bg-[#4A2E18]' : 'bg-stone-300'
                          }`}
                        >
                          <div
                            className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transform transition-transform ${
                              saveCard ? 'translate-x-4.5' : 'translate-x-0'
                            }`}
                          />
                        </div>
                        <span className="text-xs font-semibold text-stone-700">
                          Guardar esta tarjeta para futuras compras
                        </span>
                      </label>
                    </div>
                  </form>
                </div>
              )}

              {/* Yape Screen */}
              {selectedMethod === 'YAPE' && (
                <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#742284] text-white flex items-center justify-center font-bold text-sm">
                      yape
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-950 text-sm">Paga con QR o Número Yape</h4>
                      <p className="text-xs text-purple-700">Escanea el código o yapea a nuestro número oficial.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="bg-white p-4 rounded-xl border border-purple-200 flex flex-col items-center justify-center text-center">
                      <div className="w-32 h-32 bg-stone-900 rounded-lg p-2 text-white flex items-center justify-center mb-2 shadow-sm">
                        <QrCode className="w-24 h-24 text-white" />
                      </div>
                      <span className="text-[11px] font-bold text-purple-900">Paz y Espresso E.I.R.L.</span>
                      <span className="text-[11px] text-stone-500">Número: 987 654 321</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Teléfono celular desde donde yapeas
                        </label>
                        <div className="relative">
                          <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Código de aprobación o referencia
                        </label>
                        <input
                          type="text"
                          value={operationCode}
                          onChange={(e) => setOperationCode(e.target.value)}
                          placeholder="Ej: 849201"
                          className="w-full px-3 py-2 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Plin Screen */}
              {selectedMethod === 'PLIN' && (
                <div className="p-4 bg-cyan-50/70 rounded-2xl border border-cyan-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00BCD4] text-white flex items-center justify-center font-bold text-sm">
                      plin
                    </div>
                    <div>
                      <h4 className="font-bold text-cyan-950 text-sm">Paga con Plin (Interbank, BBVA, Scotiabank)</h4>
                      <p className="text-xs text-cyan-700">Sin comisiones bancarias adicionales.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="bg-white p-4 rounded-xl border border-cyan-200 flex flex-col items-center justify-center text-center">
                      <div className="w-32 h-32 bg-stone-900 rounded-lg p-2 text-white flex items-center justify-center mb-2 shadow-sm">
                        <QrCode className="w-24 h-24 text-white" />
                      </div>
                      <span className="text-[11px] font-bold text-cyan-900">Paz y Espresso Plin</span>
                      <span className="text-[11px] text-stone-500">Número: 987 654 321</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Código de transacción Plin
                        </label>
                        <input
                          type="text"
                          value={operationCode}
                          onChange={(e) => setOperationCode(e.target.value)}
                          placeholder="Ej: 492018"
                          className="w-full px-3 py-2 bg-white border border-[#E3DBD0] rounded-xl text-xs text-stone-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transferencia Screen */}
              {selectedMethod === 'TRANSFERENCIA' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm">Cuentas Corrientes Autorizadas</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-blue-900 block">BCP Banco de Crédito</span>
                        <span className="font-mono text-stone-700">310-98421039-0-44</span>
                        <span className="text-stone-400 block text-[11px]">CCI: 002-310-009842103904-44</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('002-310-009842103904-44')}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedBank ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-blue-800 block">BBVA Perú</span>
                        <span className="font-mono text-stone-700">0011-0284-0100049281</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('0011-0284-0100049281')}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onBackToShipping}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E8DFD5] text-stone-700 hover:bg-[#FAF7F2] font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver al envío</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#4A2E18] hover:bg-[#382314] text-white font-bold text-sm transition-all shadow-lg shadow-[#4A2E18]/25 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirmar pedido</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sticky Column: Resumen del Pedido matching MEDIO DE PAGO.png */}
          <div className="lg:col-span-4 space-y-5 sticky top-28">
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-md space-y-4">
              <h3 className="font-display font-bold text-stone-900 text-lg pb-3 border-b border-stone-100">
                Resumen del pedido
              </h3>

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

            {/* Pago 100% seguro banner matching MEDIO DE PAGO.png */}
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-4.5 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-xs">Pago 100% seguro</h5>
                <p className="text-[11px] text-stone-500">
                  Tus datos de pago están protegidos con encriptación SSL de 256 bits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
