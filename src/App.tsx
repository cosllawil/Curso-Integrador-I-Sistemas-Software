/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Producto,
  Categoria,
  DetalleCarrito,
  Direccion,
  ModalidadEntrega,
  MetodoPago,
  Pedido,
  Promocion
} from './types/database';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_VARIANTS,
  INITIAL_PROMOTIONS,
  INITIAL_CART_ITEMS,
  CURRENT_CLIENT,
  SAVED_DIRECTIONS
} from './data/initialData';
import { apiSimulator } from './services/apiSimulator';

import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoriesSection } from './components/CategoriesSection';
import { TrendingSection } from './components/TrendingSection';
import { CartView } from './components/CartView';
import { ShippingView } from './components/ShippingView';
import { PaymentView } from './components/PaymentView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { OrdersView } from './components/OrdersView';
import { PromotionsView } from './components/PromotionsView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<
    'inicio' | 'productos' | 'categorias' | 'carrito' | 'pedidos' | 'promociones'
  >('inicio');
  const [checkoutStep, setCheckoutStep] = useState<
    'cart' | 'shipping' | 'payment' | 'confirmation'
  >('cart');

  // Application Data
  const [products] = useState<Producto[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Categoria[]>(INITIAL_CATEGORIES);
  const [cartItems, setCartItems] = useState<DetalleCarrito[]>(INITIAL_CART_ITEMS);
  const [appliedPromo, setAppliedPromo] = useState<Promocion | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Direccion>(SAVED_DIRECTIONS[0]);
  const [shippingMethod, setShippingMethod] = useState<ModalidadEntrega>('DELIVERY');
  const [orders, setOrders] = useState<Pedido[]>(apiSimulator.getPedidosCliente(1).data);
  const [completedOrder, setCompletedOrder] = useState<Pedido | null>(null);

  // Filters & Modals
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Producto | null>(null);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  // Cart Management
  const handleAddToCart = (product: Producto, quantity: number = 1, variantString?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.idProducto === product.idProducto &&
          item.varianteSeleccionada === (variantString || undefined)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          cantidad: next[existingIndex].cantidad + quantity,
          subtotal: (next[existingIndex].cantidad + quantity) * next[existingIndex].precioUnitario
        };
        return next;
      }

      const newItem: DetalleCarrito = {
        idDetalleCarrito: Date.now(),
        idCarrito: 1,
        idProducto: product.idProducto,
        cantidad: quantity,
        precioUnitario: product.precio,
        subtotal: product.precio * quantity,
        producto: product,
        varianteSeleccionada: variantString
      };
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (idDetalleCarrito: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(idDetalleCarrito);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.idDetalleCarrito === idDetalleCarrito) {
          return {
            ...item,
            cantidad: newQty,
            subtotal: item.precioUnitario * newQty
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (idDetalleCarrito: number) => {
    setCartItems((prev) => prev.filter((item) => item.idDetalleCarrito !== idDetalleCarrito));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Promo Code Validation
  const handleApplyPromoCode = (code: string) => {
    const res = apiSimulator.validarPromocion(code);
    if (res.success && res.data) {
      setAppliedPromo(res.data);
      return { success: true, message: `¡Cupón ${res.data.codigo} aplicado exitosamente!` };
    }
    return { success: false, message: 'Código de promoción no válido o expirado.' };
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Order Placement (Simulating Spring Boot REST API POST /api/v1/pedidos)
  const handleConfirmOrder = (paymentDetails: {
    method: MetodoPago;
    cardNumber?: string;
    cardHolder?: string;
  }) => {
    try {
      const response = apiSimulator.crearPedido({
        idCliente: CURRENT_CLIENT.idCliente,
        idPromocion: appliedPromo?.idPromocion || null,
        modalidadEntrega: shippingMethod,
        idDireccion: shippingAddress.idDireccion,
        metodoPago: paymentDetails.method,
        datosPago: {
          numeroTarjeta: paymentDetails.cardNumber,
          titular: paymentDetails.cardHolder
        },
        items: cartItems.map((item) => ({
          idProducto: item.idProducto,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario
        }))
      });

      if (response.success && response.data) {
        setCompletedOrder(response.data);
        setOrders((prev) => [response.data, ...prev]);
        setCartItems([]);
        setAppliedPromo(null);
        setCheckoutStep('confirmation');
      }
    } catch (err: any) {
      alert(`Error al procesar pedido: ${err.message}`);
    }
  };

  const cartTotalItemsCount = cartItems.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 font-sans">
      {/* Global Header */}
      <Header
        cartItemCount={cartTotalItemsCount}
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          if (tab === 'carrito') {
            setCheckoutStep('cart');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onSearch={(query) => {
          // Navigates and filters
          setCurrentTab('productos');
        }}
        client={CURRENT_CLIENT}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* VIEW 1: INICIO (Homepage matching INICIO DE PAGINA.png) */}
        {currentTab === 'inicio' && (
          <div className="space-y-6">
            <HeroBanner
              onExploreProducts={() => {
                setCurrentTab('productos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <CategoriesSection
              categories={categories}
              onSelectCategory={(idCat) => {
                if (idCat === 0) {
                  setCurrentTab('categorias');
                } else {
                  setSelectedCategoryId(idCat);
                  setCurrentTab('productos');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExplorePromotions={() => setCurrentTab('promociones')}
              fullPageView={false}
            />

            <TrendingSection
              products={products}
              onAddToCart={handleAddToCart}
              onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
              selectedCategoryId={null}
              onSelectCategoryFilter={(catId) => setSelectedCategoryId(catId)}
            />
          </div>
        )}

        {/* VIEW 2: CATEGORÍAS (matching CATEGORIAS.png) */}
        {currentTab === 'categorias' && (
          <CategoriesSection
            categories={categories}
            onSelectCategory={(idCat) => {
              setSelectedCategoryId(idCat);
              setCurrentTab('productos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExplorePromotions={() => setCurrentTab('promociones')}
            fullPageView={true}
          />
        )}

        {/* VIEW 3: PRODUCTOS EN TENDENCIA / CATÁLOGO (matching PRODUCTOS EN TENDENCIA.png) */}
        {currentTab === 'productos' && (
          <TrendingSection
            products={products}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
            selectedCategoryId={selectedCategoryId}
            onSelectCategoryFilter={(catId) => setSelectedCategoryId(catId)}
          />
        )}

        {/* VIEW 4: PROCESO DE COMPRA (Carrito -> Envío -> Pago -> Confirmación) */}
        {currentTab === 'carrito' && (
          <div>
            {checkoutStep === 'cart' && (
              <CartView
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onProceedToCheckout={() => {
                  setCheckoutStep('shipping');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onContinueShopping={() => setCurrentTab('productos')}
                suggestedProducts={products.filter(
                  (p) => !cartItems.some((c) => c.idProducto === p.idProducto)
                )}
                onAddSuggestedProduct={(prod) => handleAddToCart(prod, 1)}
                appliedPromo={appliedPromo}
                onApplyPromoCode={handleApplyPromoCode}
                onRemovePromo={handleRemovePromo}
              />
            )}

            {checkoutStep === 'shipping' && (
              <ShippingView
                cartItems={cartItems}
                shippingAddress={shippingAddress}
                onUpdateAddress={(patch) =>
                  setShippingAddress((prev) => ({ ...prev, ...patch }))
                }
                shippingMethod={shippingMethod}
                onChangeShippingMethod={(m) => setShippingMethod(m)}
                appliedPromo={appliedPromo}
                onApplyPromoCode={handleApplyPromoCode}
                onBackToCart={() => {
                  setCheckoutStep('cart');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onProceedToPayment={() => {
                  setCheckoutStep('payment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {checkoutStep === 'payment' && (
              <PaymentView
                cartItems={cartItems}
                shippingMethod={shippingMethod}
                appliedPromo={appliedPromo}
                onBackToShipping={() => {
                  setCheckoutStep('shipping');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onConfirmOrder={handleConfirmOrder}
              />
            )}

            {checkoutStep === 'confirmation' && completedOrder && (
              <OrderConfirmationView
                pedido={completedOrder}
                onGoToHome={() => {
                  setCurrentTab('inicio');
                  setCheckoutStep('cart');
                }}
                onGoToOrders={() => {
                  setCurrentTab('pedidos');
                  setCheckoutStep('cart');
                }}
                onViewArchitecture={() => setIsArchitectureModalOpen(true)}
              />
            )}
          </div>
        )}

        {/* VIEW 5: MIS PEDIDOS (Order history & tracking) */}
        {currentTab === 'pedidos' && (
          <OrdersView
            orders={orders}
            onViewOrderDetails={(order) => {}}
            onContinueShopping={() => setCurrentTab('productos')}
          />
        )}

        {/* VIEW 6: PROMOCIONES */}
        {currentTab === 'promociones' && (
          <PromotionsView
            promotions={INITIAL_PROMOTIONS}
            onApplyPromoToCart={(code) => {
              handleApplyPromoCode(code);
            }}
            onGoToCart={() => {
              setCurrentTab('carrito');
              setCheckoutStep('cart');
            }}
          />
        )}
      </main>

      {/* Global Product Customization Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        variants={INITIAL_VARIANTS}
        inventory={apiSimulator.getInventario().data}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Global Spring Boot Architecture & MySQL Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          if (tab === 'carrito') setCheckoutStep('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />
    </div>
  );
}
