import React, { useState } from 'react';
import { Pedido } from '../types/database';
import { ProductImage } from './ProductImage';
import {
  Package,
  Calendar,
  ChevronRight,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle2,
  Receipt
} from 'lucide-react';

interface OrdersViewProps {
  orders: Pedido[];
  onViewOrderDetails: (order: Pedido) => void;
  onContinueShopping: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onViewOrderDetails,
  onContinueShopping
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(orders[0] || null);

  return (
    <div className="w-full pb-16">
      <div className="bg-[#2B180C] text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-8 border-b border-[#4A2D18]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-2">
              Mis Pedidos
            </h1>
            <p className="text-stone-300 text-sm max-w-xl">
              Consulta el estado en tiempo real de tus pedidos y tus comprobantes de compra.
            </p>
          </div>
          <div className="text-xs text-[#E8B878] bg-[#3E2514] px-3.5 py-1.5 rounded-lg border border-[#8C532B]/40 font-mono">
            {orders.length} pedidos registrados en MySQL
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DFD5] max-w-xl mx-auto">
            <Package className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="font-bold text-stone-900 text-lg mb-1">Aún no tienes pedidos</h3>
            <p className="text-xs text-stone-500 mb-6">
              Empieza a disfrutar de nuestro café de especialidad realizando tu primer pedido.
            </p>
            <button
              onClick={onContinueShopping}
              className="px-6 py-2.5 bg-[#4A2E18] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Orders list on left */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider px-1">
                Historial de Compras
              </h3>
              {orders.map((order) => {
                const isSelected = selectedOrder?.idPedido === order.idPedido;
                return (
                  <div
                    key={order.idPedido}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white ${
                      isSelected
                        ? 'border-[#4A2E18] shadow-md ring-2 ring-[#4A2E18]/10'
                        : 'border-[#E8DFD5] hover:border-stone-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                      <span className="font-mono font-bold text-xs text-[#8C532B]">
                        {order.codigoPedido || `#PED-2026-${order.idPedido}`}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                        {order.estado}
                      </span>
                    </div>

                    <div className="pt-2.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-1.5 text-stone-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{order.fechaPedido.slice(0, 16)}</span>
                        </div>
                        <span className="text-stone-400 text-[11px] block mt-0.5">
                          {order.detalles?.length || 1} producto(s) · {order.modalidadEntrega}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-display font-bold text-stone-900 text-sm">
                          S/ {order.total.toFixed(2)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-400 ml-auto mt-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected order detail view on right */}
            {selectedOrder && (
              <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8DFD5] p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                  <div>
                    <h2 className="font-display font-bold text-stone-900 text-xl">
                      {selectedOrder.codigoPedido || `#PED-2026-${selectedOrder.idPedido}`}
                    </h2>
                    <p className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Registrado el {selectedOrder.fechaPedido}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedOrder.estado}</span>
                  </span>
                </div>

                {/* Shipping & Payment Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF7F2] text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-stone-900">
                      <MapPin className="w-4 h-4 text-[#8C532B]" />
                      <span>Dirección de Entrega</span>
                    </div>
                    <p className="text-stone-600">
                      {selectedOrder.direccionEntrega?.direccion || 'Av. Pardo N.° 1234'}
                    </p>
                    <p className="text-stone-400 text-[11px]">
                      {selectedOrder.direccionEntrega?.distrito || 'Chimbote'}, {selectedOrder.direccionEntrega?.departamento || 'Áncash'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-stone-900">
                      <CreditCard className="w-4 h-4 text-[#8C532B]" />
                      <span>Pago</span>
                    </div>
                    <p className="text-stone-600 font-medium">
                      {selectedOrder.pago?.metodoPago.replace('_', ' ') || 'TARJETA'}
                    </p>
                    <p className="text-stone-400 text-[11px]">
                      Estado: {selectedOrder.pago?.estadoPago || 'COMPLETADO'}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Detalle de Productos
                  </h4>
                  <div className="divide-y divide-stone-100 border-y border-stone-100">
                    {selectedOrder.detalles?.map((det) => (
                      <div key={det.idDetallePedido} className="py-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                            <ProductImage
                              imageKey={det.producto?.imagen || 'cappuccino'}
                              alt=""
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
                        <span className="font-display font-bold text-stone-900">
                          S/ {det.subtotal.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotals & Total */}
                <div className="flex justify-end pt-2">
                  <div className="w-60 space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal:</span>
                      <span>S/ {selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Envío:</span>
                      <span>S/ {selectedOrder.costoEnvio.toFixed(2)}</span>
                    </div>
                    {selectedOrder.descuento > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Descuento:</span>
                        <span>- S/ {selectedOrder.descuento.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-stone-200 flex justify-between font-display font-bold text-base text-stone-900">
                      <span>Total:</span>
                      <span className="text-[#8C532B]">S/ {selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Live History */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8C532B]" />
                    <span>Línea de tiempo de entrega</span>
                  </h4>
                  <div className="space-y-3 pl-4 border-l-2 border-[#8C532B]/30">
                    {selectedOrder.historial?.map((h) => (
                      <div key={h.idHistorial} className="relative text-xs">
                        <div className="font-bold text-stone-900 flex items-center gap-2">
                          <span>{h.estado}</span>
                          <span className="text-[10px] font-normal text-stone-400">{h.fechaHora}</span>
                        </div>
                        <p className="text-stone-600 text-[11px] mt-0.5">{h.observacion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
