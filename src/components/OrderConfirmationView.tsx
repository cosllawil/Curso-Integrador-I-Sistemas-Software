import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Pedido } from '../types/database';
import { ProductImage } from './ProductImage';
import {
  Check,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  ArrowRight,
  Database,
  Receipt
} from 'lucide-react';

interface OrderConfirmationViewProps {
  pedido: Pedido;
  onGoToHome: () => void;
  onGoToOrders: () => void;
  onViewArchitecture: () => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({
  pedido,
  onGoToHome,
  onGoToOrders,
  onViewArchitecture
}) => {
  useEffect(() => {
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'REGISTRADO':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'EN_PREPARACION':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'EN_CAMINO':
        return <Truck className="w-4 h-4 text-purple-600" />;
      case 'ENTREGADO':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <Clock className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="w-full pb-16">
      {/* Banner */}
      <div className="bg-[#2B180C] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-8 border-b border-[#4A2D18]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto mb-2 shadow-lg animate-pulse">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            ¡Gracias por tu compra, {pedido.cliente?.nombres || 'Ronny'}!
          </h1>
          <p className="text-stone-300 text-sm max-w-lg mx-auto">
            Tu pedido ha sido recibido y registrado en la base de datos MySQL a través de Spring Data JPA. Estamos preparando tus productos con el mejor café de especialidad.
          </p>
          <div className="pt-2">
            <span className="inline-block bg-[#3E2514] text-[#E8B878] font-mono px-4 py-1.5 rounded-full text-xs font-bold border border-[#8C532B]/50 shadow-inner">
              Código de Pedido: {pedido.codigoPedido || `#PED-2026-${pedido.idPedido}`}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Step Progress Bar Completed */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-[#4A2E18] -z-0" />
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center gap-1.5 z-10">
                <div className="w-8 h-8 rounded-full bg-[#4A2E18] text-white flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[11px] font-semibold text-stone-700">
                  {step === 1 && 'Carrito'}
                  {step === 2 && 'Envío'}
                  {step === 3 && 'Pago'}
                  {step === 4 && 'Confirmación'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Database Entities Snapshot (Real MySQL Relational Representation) */}
        <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#8C532B]" />
              <h2 className="font-display font-bold text-stone-900 text-lg">
                Comprobante y Detalle del Pedido
              </h2>
            </div>
            <button
              onClick={onViewArchitecture}
              className="text-xs font-semibold text-[#8C532B] hover:text-[#52331C] flex items-center gap-1 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E8DFD5] cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Ver Registro en MySQL</span>
            </button>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs">
            <div>
              <span className="text-stone-400 block uppercase font-medium text-[10px]">Fecha</span>
              <span className="font-semibold text-stone-800">{pedido.fechaPedido}</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase font-medium text-[10px]">Modalidad</span>
              <span className="font-semibold text-stone-800">
                {pedido.modalidadEntrega === 'DELIVERY' ? 'Delivery a domicilio' : 'Recojo en tienda'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase font-medium text-[10px]">Método de Pago</span>
              <span className="font-semibold text-stone-800">
                {pedido.pago?.metodoPago.replace('_', ' ') || 'TARJETA'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase font-medium text-[10px]">Estado Actual</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {getStatusIcon(pedido.estado)}
                <span>{pedido.estado}</span>
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Productos Solicitados (DetallePedido)
            </h3>
            <div className="divide-y divide-stone-100 border-y border-stone-100">
              {pedido.detalles?.map((det) => (
                <div key={det.idDetallePedido} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <ProductImage
                        imageKey={det.producto?.imagen || 'cappuccino'}
                        alt={det.producto?.nombre || ''}
                        aspectRatio="1/1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">{det.producto?.nombre}</span>
                      <span className="text-stone-400">
                        {det.cantidad} x S/ {det.precioUnitario.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-stone-900 text-sm">
                    S/ {det.subtotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span>S/ {pedido.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Costo de envío:</span>
                <span>S/ {pedido.costoEnvio.toFixed(2)}</span>
              </div>
              {pedido.descuento > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Descuento aplicado:</span>
                  <span>- S/ {pedido.descuento.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between font-display font-bold text-base text-stone-900">
                <span>Total pagado:</span>
                <span className="text-[#8C532B]">S/ {pedido.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* HistorialEstadoPedido Timeline */}
        <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-stone-900 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8C532B]" />
            <span>Seguimiento en Vivo (HistorialEstadoPedido)</span>
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {pedido.historial?.map((hist, index) => (
              <div key={hist.idHistorial || index} className="relative">
                <div className="absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full bg-[#4A2E18] text-white flex items-center justify-center ring-4 ring-white text-[10px]">
                  ✓
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-900">{hist.estado}</span>
                    <span className="text-[11px] text-stone-400">{hist.fechaHora}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">{hist.observacion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            onClick={onGoToOrders}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E8DFD5] hover:bg-[#FAF7F2] text-stone-800 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Ver Mis Pedidos</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToHome}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#4A2E18] hover:bg-[#382314] text-white font-bold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Volver a la tienda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
