/**
 * Simulador de la API REST de Spring Boot con MySQL
 * Mantiene la persistencia en estado local respetando la lógica de negocio de Spring Data JPA.
 */

import {
  Producto,
  Categoria,
  Promocion,
  Inventario,
  Pedido,
  DetallePedido,
  Pago,
  HistorialEstadoPedido,
  CreatePedidoRequestDTO,
  ApiResponse
} from '../types/database';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_PROMOTIONS,
  INITIAL_INVENTORY,
  CURRENT_CLIENT,
  SAVED_DIRECTIONS
} from '../data/initialData';

class SpringBootRestApiSimulator {
  private productos: Producto[] = [...INITIAL_PRODUCTS];
  private categorias: Categoria[] = [...INITIAL_CATEGORIES];
  private promociones: Promocion[] = [...INITIAL_PROMOTIONS];
  private inventario: Inventario[] = [...INITIAL_INVENTORY];
  private pedidos: Pedido[] = [];

  constructor() {
    // Seed initial mock order for Ronny
    const initialOrder: Pedido = {
      idPedido: 1,
      codigoPedido: 'PED-2026-0842',
      idCliente: 1,
      idPromocion: null,
      fechaPedido: '2026-10-06 18:30:00',
      modalidadEntrega: 'DELIVERY',
      estado: 'EN_CAMINO',
      subtotal: 41.00,
      costoEnvio: 5.00,
      descuento: 0.00,
      total: 46.00,
      cliente: CURRENT_CLIENT,
      direccionEntrega: SAVED_DIRECTIONS[0],
      detalles: [
        {
          idDetallePedido: 1,
          idPedido: 1,
          idProducto: 1,
          cantidad: 1,
          precioUnitario: 8.00,
          subtotal: 8.00,
          producto: this.productos.find(p => p.idProducto === 1)
        },
        {
          idDetallePedido: 2,
          idPedido: 1,
          idProducto: 3,
          cantidad: 2,
          precioUnitario: 12.00,
          subtotal: 24.00,
          producto: this.productos.find(p => p.idProducto === 3)
        },
        {
          idDetallePedido: 3,
          idPedido: 1,
          idProducto: 4,
          cantidad: 1,
          precioUnitario: 9.00,
          subtotal: 9.00,
          producto: this.productos.find(p => p.idProducto === 4)
        }
      ],
      pago: {
        idPago: 1,
        idPedido: 1,
        metodoPago: 'TARJETA_CREDITO',
        monto: 46.00,
        estadoPago: 'COMPLETADO',
        fechaPago: '2026-10-06 18:31:00',
        ultimosCuatroDigitos: '3456'
      },
      historial: [
        {
          idHistorial: 1,
          idPedido: 1,
          estado: 'REGISTRADO',
          fechaHora: '2026-10-06 18:30:00',
          observacion: 'Pedido recibido a través del sistema web'
        },
        {
          idHistorial: 2,
          idPedido: 1,
          estado: 'EN_PREPARACION',
          fechaHora: '2026-10-06 18:35:00',
          observacion: 'El barista está preparando las bebidas y empaquetando los postres'
        },
        {
          idHistorial: 3,
          idPedido: 1,
          estado: 'EN_CAMINO',
          fechaHora: '2026-10-06 18:50:00',
          observacion: 'El repartidor está en ruta hacia Av. Pardo N.° 1234, Chimbote'
        }
      ]
    };
    this.pedidos.push(initialOrder);
  }

  // GET /api/v1/productos
  public getProductos(categoriaId?: number, search?: string): ApiResponse<Producto[]> {
    let result = [...this.productos];
    if (categoriaId) {
      result = result.filter(p => p.idCategoria === categoriaId);
    }
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)
      );
    }
    return {
      success: true,
      message: 'Productos recuperados exitosamente desde MySQL via Spring Data JPA',
      data: result,
      timestamp: new Date().toISOString()
    };
  }

  // GET /api/v1/categorias
  public getCategorias(): ApiResponse<Categoria[]> {
    return {
      success: true,
      message: 'Categorías recuperadas exitosamente',
      data: this.categorias,
      timestamp: new Date().toISOString()
    };
  }

  // GET /api/v1/promociones/validar?codigo=...
  public validarPromocion(codigo: string): ApiResponse<Promocion | null> {
    const promo = this.promociones.find(
      p => p.codigo.toUpperCase() === codigo.trim().toUpperCase() && p.estado === 'ACTIVO'
    );
    if (!promo) {
      return {
        success: false,
        message: 'Código de promoción inválido o expirado',
        data: null,
        timestamp: new Date().toISOString()
      };
    }
    return {
      success: true,
      message: 'Promoción aplicada correctamente',
      data: promo,
      timestamp: new Date().toISOString()
    };
  }

  // POST /api/v1/pedidos
  public crearPedido(request: CreatePedidoRequestDTO): ApiResponse<Pedido> {
    // 1. Validar cliente
    const cliente = CURRENT_CLIENT;
    
    // 2. Validar stock en Inventario
    for (const item of request.items) {
      const inv = this.inventario.find(i => i.idProducto === item.idProducto);
      if (inv && inv.stockActual < item.cantidad) {
        const prod = this.productos.find(p => p.idProducto === item.idProducto);
        throw new Error(
          `Stock insuficiente para '${prod?.nombre || 'Producto'}'. Disponible: ${inv.stockActual}`
        );
      }
    }

    // 3. Descontar stock
    for (const item of request.items) {
      const inv = this.inventario.find(i => i.idProducto === item.idProducto);
      if (inv) {
        inv.stockActual -= item.cantidad;
        inv.fechaActualizacion = new Date().toISOString();
      }
    }

    // 4. Calcular subtotales
    let subtotal = 0;
    const detalles: DetallePedido[] = request.items.map((item, index) => {
      const prod = this.productos.find(p => p.idProducto === item.idProducto)!;
      const itemSubtotal = prod.precio * item.cantidad;
      subtotal += itemSubtotal;
      return {
        idDetallePedido: index + 1,
        idPedido: this.pedidos.length + 1,
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        precioUnitario: prod.precio,
        subtotal: itemSubtotal,
        producto: prod
      };
    });

    // 5. Aplicar descuento de promoción
    let descuento = 0;
    if (request.idPromocion) {
      const promo = this.promociones.find(p => p.idPromocion === request.idPromocion);
      if (promo) {
        if (promo.tipoDescuento === 'PORCENTAJE') {
          descuento = Number(((subtotal * promo.descuento) / 100).toFixed(2));
        } else {
          descuento = promo.descuento;
        }
      }
    }

    const costoEnvio = request.modalidadEntrega === 'DELIVERY' ? 5.00 : 0.00;
    const total = Math.max(0, subtotal + costoEnvio - descuento);

    const nuevoId = this.pedidos.length + 1;
    const codigoPedido = `PED-2026-${String(nuevoId).padStart(4, '0')}`;
    const ahora = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const pago: Pago = {
      idPago: nuevoId,
      idPedido: nuevoId,
      metodoPago: request.metodoPago,
      monto: total,
      estadoPago: 'COMPLETADO',
      fechaPago: ahora,
      ultimosCuatroDigitos: request.datosPago?.numeroTarjeta?.slice(-4) || '1234'
    };

    const historial: HistorialEstadoPedido[] = [
      {
        idHistorial: 1,
        idPedido: nuevoId,
        estado: 'REGISTRADO',
        fechaHora: ahora,
        observacion: 'Pedido recibido exitosamente en el sistema de Paz y Espresso'
      }
    ];

    const nuevoPedido: Pedido = {
      idPedido: nuevoId,
      codigoPedido,
      idCliente: request.idCliente,
      idPromocion: request.idPromocion || null,
      fechaPedido: ahora,
      modalidadEntrega: request.modalidadEntrega,
      estado: 'REGISTRADO',
      subtotal,
      costoEnvio,
      descuento,
      total,
      detalles,
      pago,
      historial,
      direccionEntrega: SAVED_DIRECTIONS.find(d => d.idDireccion === request.idDireccion) || SAVED_DIRECTIONS[0],
      cliente
    };

    this.pedidos.unshift(nuevoPedido);

    return {
      success: true,
      message: 'Pedido generado y persistido en MySQL exitosamente (@Transactional)',
      data: nuevoPedido,
      timestamp: new Date().toISOString()
    };
  }

  // GET /api/v1/pedidos
  public getPedidosCliente(idCliente: number): ApiResponse<Pedido[]> {
    const list = this.pedidos.filter(p => p.idCliente === idCliente);
    return {
      success: true,
      message: 'Historial de pedidos recuperado',
      data: list,
      timestamp: new Date().toISOString()
    };
  }

  // GET /api/v1/pedidos/{id}
  public getPedidoPorId(id: number): ApiResponse<Pedido | null> {
    const pedido = this.pedidos.find(p => p.idPedido === id);
    if (!pedido) {
      return {
        success: false,
        message: 'Pedido no encontrado con ID: ' + id,
        data: null,
        timestamp: new Date().toISOString()
      };
    }
    return {
      success: true,
      message: 'Pedido encontrado',
      data: pedido,
      timestamp: new Date().toISOString()
    };
  }

  // GET /api/v1/inventario
  public getInventario(): ApiResponse<Inventario[]> {
    return {
      success: true,
      message: 'Stock de inventario actual recuperado',
      data: this.inventario,
      timestamp: new Date().toISOString()
    };
  }
}

export const apiSimulator = new SpringBootRestApiSimulator();
