/**
 * Modelos de datos basados exactamente en el diagrama ER MySQL de Paz y Espresso
 * (TABLA BASE DATOS MYSQL.png) y DTOs para la API REST Spring Boot.
 */

export interface Rol {
  idRol: number;
  nombre: string;
  descripcion: string;
}

export interface Usuario {
  idUsuario: number;
  idRol: number;
  correo: string;
  contraseña?: string; // Encriptada con BCrypt en backend
  estado: 'ACTIVO' | 'INACTIVO';
}

export interface Cliente {
  idCliente: number;
  idUsuario: number;
  nombres: string;
  apellidos: string;
  telefono: string;
}

export interface Direccion {
  idDireccion: number;
  idCliente: number;
  direccion: string;
  referencia: string;
  distrito: string;
  departamento?: string;
  provincia?: string;
  codigoPostal?: string;
  esPrincipal?: boolean;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;
  descripcion: string;
  estado: 'ACTIVO' | 'INACTIVO';
  imagen?: string;
  totalProductos?: number;
}

export interface Producto {
  idProducto: number;
  idCategoria: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: 'ACTIVO' | 'INACTIVO';
  categoriaNombre?: string;
  imagen: string;
  tag?: 'Más vendido' | 'En tendencia' | 'Popular' | 'Nuevo';
  rating: number;
  reviewsCount: number;
  disponible: boolean;
}

export interface VarianteProducto {
  idVariante: number;
  idProducto: number;
  tipo: 'Tamaño' | 'Tipo de Leche' | 'Temperatura' | 'Nivel de Azúcar';
  valor: string;
  precioExtra: number;
}

export interface Inventario {
  idInventario: number;
  idProducto: number;
  stockActual: number;
  stockMinimo: number;
  fechaActualizacion: string;
}

export interface Carrito {
  idCarrito: number;
  idCliente: number;
  fechaCreacion: string;
  subtotal: number;
  total: number;
}

export interface DetalleCarrito {
  idDetalleCarrito: number;
  idCarrito: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  producto?: Producto;
  varianteSeleccionada?: string;
}

export interface Promocion {
  idPromocion: number;
  codigo: string;
  descuento: number; // Porcentaje o monto fijo según regla de negocio
  tipoDescuento?: 'PORCENTAJE' | 'MONTO_FIJO';
  fechaInicio: string;
  fechaFin: string;
  estado: 'ACTIVO' | 'INACTIVO';
  descripcion?: string;
}

export type ModalidadEntrega = 'DELIVERY' | 'RECOJO_TIENDA';
export type EstadoPedido = 'REGISTRADO' | 'EN_PREPARACION' | 'EN_CAMINO' | 'ENTREGADO' | 'CANCELADO';

export interface Pedido {
  idPedido: number;
  codigoPedido?: string; // Ej: PED-2026-0842
  idCliente: number;
  idPromocion: number | null;
  fechaPedido: string;
  modalidadEntrega: ModalidadEntrega;
  estado: EstadoPedido;
  subtotal: number;
  costoEnvio: number;
  descuento: number;
  total: number;
  detalles?: DetallePedido[];
  pago?: Pago;
  historial?: HistorialEstadoPedido[];
  direccionEntrega?: Direccion;
  cliente?: Cliente;
}

export interface DetallePedido {
  idDetallePedido: number;
  idPedido: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  producto?: Producto;
}

export type MetodoPago = 'TARJETA_CREDITO' | 'YAPE' | 'PLIN' | 'TRANSFERENCIA';
export type EstadoPago = 'COMPLETADO' | 'PENDIENTE' | 'RECHAZADO';

export interface Pago {
  idPago: number;
  idPedido: number;
  metodoPago: MetodoPago;
  monto: number;
  estadoPago: EstadoPago;
  fechaPago: string;
  referenciaOperacion?: string;
  ultimosCuatroDigitos?: string;
}

export interface HistorialEstadoPedido {
  idHistorial: number;
  idPedido: number;
  estado: EstadoPedido;
  fechaHora: string;
  observacion: string;
}

// Request / Response DTOs para la API REST Spring Boot
export interface CreatePedidoRequestDTO {
  idCliente: number;
  idPromocion?: number | null;
  modalidadEntrega: ModalidadEntrega;
  idDireccion?: number;
  metodoPago: MetodoPago;
  datosPago?: {
    numeroTarjeta?: string;
    titular?: string;
    mesVencimiento?: string;
    anioVencimiento?: string;
    telefonoYapePlin?: string;
    codigoOperacion?: string;
  };
  items: {
    idProducto: number;
    cantidad: number;
    precioUnitario: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
