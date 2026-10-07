import React, { useState } from 'react';
import { Producto, VarianteProducto, Inventario } from '../types/database';
import { ProductImage } from './ProductImage';
import { X, Star, Plus, Minus, ShoppingBag, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Producto | null;
  variants: VarianteProducto[];
  inventory: Inventario[];
  onClose: () => void;
  onAddToCart: (product: Producto, quantity: number, variantString?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  variants,
  inventory,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const productVariants = variants.filter((v) => v.idProducto === product.idProducto);
  const inv = inventory.find((i) => i.idProducto === product.idProducto);
  const stock = inv?.stockActual ?? 20;

  // Group variants by type
  const variantGroups: Record<string, VarianteProducto[]> = {};
  productVariants.forEach((v) => {
    if (!variantGroups[v.tipo]) variantGroups[v.tipo] = [];
    variantGroups[v.tipo].push(v);
  });

  // Calculate extra price from variants
  let extraPrice = 0;
  Object.entries(selectedVariants).forEach(([tipo, val]) => {
    const found = productVariants.find((v) => v.tipo === tipo && v.valor === val);
    if (found) extraPrice += found.precioExtra;
  });

  const unitPrice = product.precio + extraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const variantString = Object.entries(selectedVariants)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    onAddToCart(product, quantity, variantString || undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8DFD5] animate-in fade-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Image Box */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-inner">
              <ProductImage
                imageKey={product.imagen}
                alt={product.nombre}
                aspectRatio="4/3"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Column */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#8C532B] uppercase tracking-wider block">
                {product.categoriaNombre}
              </span>

              <h2 className="font-display font-bold text-2xl text-stone-900 leading-tight">
                {product.nombre}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-stone-500">
                  {product.rating} ({product.reviewsCount} reseñas)
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {product.descripcion}
              </p>

              {/* Stock Badge */}
              <div className="pt-1 flex items-center gap-2 text-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    stock > 5 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span className="text-stone-600 font-medium">
                  {stock > 0
                    ? `Stock disponible: ${stock} unidades (Inventario MySQL)`
                    : 'Agotado'}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs text-stone-400 block uppercase">Precio</span>
                <span className="font-display font-bold text-2xl text-[#8C532B]">
                  S/ {unitPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Variants customization */}
          {Object.keys(variantGroups).length > 0 && (
            <div className="border-t border-stone-100 pt-4 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                Personaliza tu pedido
              </h4>

              {Object.entries(variantGroups).map(([tipo, list]) => (
                <div key={tipo} className="space-y-2">
                  <span className="text-xs font-semibold text-stone-700 block">
                    {tipo}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {list.map((v) => {
                      const isSelected = selectedVariants[tipo] === v.valor;
                      return (
                        <button
                          key={v.idVariante}
                          type="button"
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [tipo]: v.valor
                            }))
                          }
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#4A2E18] bg-[#4A2E18] text-white shadow-xs'
                              : 'border-[#E8DFD5] bg-white text-stone-700 hover:bg-[#FAF7F2]'
                          }`}
                        >
                          <span>{v.valor}</span>
                          {v.precioExtra > 0 && (
                            <span className="ml-1 opacity-80 text-[11px]">
                              (+S/ {v.precioExtra.toFixed(2)})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity & Add to Cart button */}
          <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-700">Cantidad:</span>
              <div className="flex items-center border border-[#E3DBD0] rounded-xl bg-[#FAF7F2] p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={stock === 0}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#4A2E18] hover:bg-[#382314] text-white hover:scale-[1.01]'
              } ${stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Agregado al carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar por S/ {totalPrice.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
