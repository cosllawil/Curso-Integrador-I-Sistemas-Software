import {
  Categoria,
  Producto,
  VarianteProducto,
  Inventario,
  Cliente,
  Usuario,
  Direccion,
  Promocion,
  DetalleCarrito
} from '../types/database';

export const INITIAL_CATEGORIES: Categoria[] = [
  {
    idCategoria: 1,
    nombre: 'Cafés',
    descripcion: 'Espresso selecto, cappuccinos con arte latte y granos de especialidad.',
    estado: 'ACTIVO',
    totalProductos: 12,
    imagen: 'coffee'
  },
  {
    idCategoria: 2,
    nombre: 'Bebidas Frías',
    descripcion: 'Frappés cremosos, lattes helados y refrescantes creaciones artesanales.',
    estado: 'ACTIVO',
    totalProductos: 8,
    imagen: 'cold_drink'
  },
  {
    idCategoria: 3,
    nombre: 'Postres',
    descripcion: 'Tortas esponjosas, cheesecakes de autor y repostería recién horneada.',
    estado: 'ACTIVO',
    totalProductos: 10,
    imagen: 'dessert'
  },
  {
    idCategoria: 4,
    nombre: 'Sándwiches',
    descripcion: 'Panes rústicos tostados rellenos con pollo marinado, quesos y hierbas.',
    estado: 'ACTIVO',
    totalProductos: 6,
    imagen: 'sandwich'
  },
  {
    idCategoria: 5,
    nombre: 'Panes',
    descripcion: 'Croissants de mantequilla hojaldrados y panes artesanales de masa madre.',
    estado: 'ACTIVO',
    totalProductos: 8,
    imagen: 'bread'
  },
  {
    idCategoria: 6,
    nombre: 'Otros',
    descripcion: 'Galletas de cacao puro, bocaditos gourmet y complementos para tu café.',
    estado: 'ACTIVO',
    totalProductos: 5,
    imagen: 'cookies'
  }
];

export const INITIAL_PRODUCTS: Producto[] = [
  {
    idProducto: 1,
    idCategoria: 1,
    categoriaNombre: 'Cafés',
    nombre: 'Cappuccino Clásico',
    descripcion: 'Espresso doble extraído a presión perfecta, coronado con una suave y sedosa microespuma de leche y arte latte.',
    precio: 8.00,
    estado: 'ACTIVO',
    imagen: 'cappuccino',
    tag: 'Más vendido',
    rating: 5.0,
    reviewsCount: 156,
    disponible: true
  },
  {
    idProducto: 2,
    idCategoria: 2,
    categoriaNombre: 'Bebidas Frías',
    nombre: 'Frappé de Café',
    descripcion: 'Intenso café espresso batido con hielo frappé, leche fresca y salsa de caramelo, con crema batida encima.',
    precio: 10.00,
    estado: 'ACTIVO',
    imagen: 'frappe',
    tag: 'En tendencia',
    rating: 4.9,
    reviewsCount: 143,
    disponible: true
  },
  {
    idProducto: 3,
    idCategoria: 3,
    categoriaNombre: 'Postres',
    nombre: 'Torta de Chocolate',
    descripcion: 'Bizcocho húmedo de puro cacao orgánico al 70%, relleno y bañado con ganache de chocolate artesanal.',
    precio: 12.00,
    estado: 'ACTIVO',
    imagen: 'chocolate_cake',
    tag: 'Popular',
    rating: 4.8,
    reviewsCount: 128,
    disponible: true
  },
  {
    idProducto: 4,
    idCategoria: 4,
    categoriaNombre: 'Sándwiches',
    nombre: 'Sándwich de Pollo',
    descripcion: 'Pechuga de pollo deshilachada con apio crocante, mayonesa artesanal y lechuga fresca en pan ciabatta rústico.',
    precio: 9.00,
    estado: 'ACTIVO',
    imagen: 'chicken_sandwich',
    tag: 'En tendencia',
    rating: 4.7,
    reviewsCount: 97,
    disponible: true
  },
  {
    idProducto: 5,
    idCategoria: 5,
    categoriaNombre: 'Panes',
    nombre: 'Muffin de Arándanos',
    descripcion: 'Muffin esponjoso horneado diariamente con arándanos silvestres frescos y toque crujiente de azúcar rubia.',
    precio: 6.00,
    estado: 'ACTIVO',
    imagen: 'blueberry_muffin',
    tag: 'Nuevo',
    rating: 4.8,
    reviewsCount: 85,
    disponible: true
  },
  {
    idProducto: 6,
    idCategoria: 5,
    categoriaNombre: 'Panes',
    nombre: 'Croissant de Mantequilla',
    descripcion: 'Clásico hojaldre francés elaborado con mantequilla premium, dorado, crujiente por fuera y aireado por dentro.',
    precio: 5.00,
    estado: 'ACTIVO',
    imagen: 'croissant',
    tag: 'Popular',
    rating: 4.9,
    reviewsCount: 92,
    disponible: true
  },
  {
    idProducto: 7,
    idCategoria: 2,
    categoriaNombre: 'Bebidas Frías',
    nombre: 'Mocha Frío',
    descripcion: 'Deliciosa combinación de espresso oscuro, jarabe de chocolate belga, leche fría y generosa crema chantilly.',
    precio: 11.00,
    estado: 'ACTIVO',
    imagen: 'mocha_cold',
    tag: 'En tendencia',
    rating: 4.8,
    reviewsCount: 78,
    disponible: true
  },
  {
    idProducto: 8,
    idCategoria: 3,
    categoriaNombre: 'Postres',
    nombre: 'Cheesecake de Frutos Rojos',
    descripcion: 'Base crocante de galleta con crema de queso estilo New York, bañada con coulis artesanal de frambuesas y moras.',
    precio: 12.00,
    estado: 'ACTIVO',
    imagen: 'cheesecake',
    tag: 'Más vendido',
    rating: 4.9,
    reviewsCount: 110,
    disponible: true
  },
  {
    idProducto: 9,
    idCategoria: 2,
    categoriaNombre: 'Bebidas Frías',
    nombre: 'Latte Helado',
    descripcion: 'Shot doble de café de altura servido sobre leche helada con cubos de hielo filtrado, balanceado y refrescante.',
    precio: 9.00,
    estado: 'ACTIVO',
    imagen: 'iced_latte',
    tag: 'Popular',
    rating: 4.7,
    reviewsCount: 76,
    disponible: true
  },
  {
    idProducto: 10,
    idCategoria: 6,
    categoriaNombre: 'Otros',
    nombre: 'Galletas de Chocolate',
    descripcion: 'Galletas horneadas estilo americano, suaves en el centro y repletas de trozos de chocolate con leche.',
    precio: 4.00,
    estado: 'ACTIVO',
    imagen: 'chocolate_cookies',
    tag: 'Nuevo',
    rating: 4.8,
    reviewsCount: 64,
    disponible: true
  }
];

export const INITIAL_VARIANTS: VarianteProducto[] = [
  { idVariante: 1, idProducto: 1, tipo: 'Tamaño', valor: 'Regular (8 oz)', precioExtra: 0.00 },
  { idVariante: 2, idProducto: 1, tipo: 'Tamaño', valor: 'Grande (12 oz)', precioExtra: 2.50 },
  { idVariante: 3, idProducto: 1, tipo: 'Tipo de Leche', valor: 'Entera', precioExtra: 0.00 },
  { idVariante: 4, idProducto: 1, tipo: 'Tipo de Leche', valor: 'Deslactosada', precioExtra: 0.50 },
  { idVariante: 5, idProducto: 1, tipo: 'Tipo de Leche', valor: 'Almendras', precioExtra: 2.00 },
  { idVariante: 6, idProducto: 2, tipo: 'Tamaño', valor: 'Mediano (12 oz)', precioExtra: 0.00 },
  { idVariante: 7, idProducto: 2, tipo: 'Tamaño', valor: 'Grande (16 oz)', precioExtra: 3.00 },
  { idVariante: 8, idProducto: 3, tipo: 'Tamaño', valor: 'Porción individual', precioExtra: 0.00 },
  { idVariante: 9, idProducto: 4, tipo: 'Tamaño', valor: 'Pan Ciabatta', precioExtra: 0.00 },
  { idVariante: 10, idProducto: 4, tipo: 'Tamaño', valor: 'Pan Croissant', precioExtra: 2.00 }
];

export const INITIAL_INVENTORY: Inventario[] = [
  { idInventario: 1, idProducto: 1, stockActual: 45, stockMinimo: 10, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 2, idProducto: 2, stockActual: 38, stockMinimo: 8, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 3, idProducto: 3, stockActual: 24, stockMinimo: 5, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 4, idProducto: 4, stockActual: 30, stockMinimo: 6, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 5, idProducto: 5, stockActual: 50, stockMinimo: 10, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 6, idProducto: 6, stockActual: 40, stockMinimo: 10, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 7, idProducto: 7, stockActual: 32, stockMinimo: 8, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 8, idProducto: 8, stockActual: 18, stockMinimo: 4, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 9, idProducto: 9, stockActual: 29, stockMinimo: 6, fechaActualizacion: '2026-10-06 08:00:00' },
  { idInventario: 10, idProducto: 10, stockActual: 60, stockMinimo: 15, fechaActualizacion: '2026-10-06 08:00:00' }
];

export const CURRENT_USER: Usuario = {
  idUsuario: 1,
  idRol: 2,
  correo: 'RonnyCoscol@gmail.com',
  estado: 'ACTIVO'
};

export const CURRENT_CLIENT: Cliente = {
  idCliente: 1,
  idUsuario: 1,
  nombres: 'Ronny',
  apellidos: 'Coscol Llatas',
  telefono: '987 654 321'
};

export const SAVED_DIRECTIONS: Direccion[] = [
  {
    idDireccion: 1,
    idCliente: 1,
    direccion: 'Av. Pardo N.° 1234',
    referencia: 'A media cuadra del parque, casa color azul',
    distrito: 'Chimbote',
    provincia: 'Santa',
    departamento: 'Áncash',
    codigoPostal: '02711',
    esPrincipal: true
  },
  {
    idDireccion: 2,
    idCliente: 1,
    direccion: 'Jr. Bolognesi 450 - Of. 302',
    referencia: 'Frente al Centro Cívico',
    distrito: 'Nuevo Chimbote',
    provincia: 'Santa',
    departamento: 'Áncash',
    codigoPostal: '02712',
    esPrincipal: false
  }
];

export const INITIAL_PROMOTIONS: Promocion[] = [
  {
    idPromocion: 1,
    codigo: 'PAZ10',
    descuento: 10.00,
    tipoDescuento: 'PORCENTAJE',
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31',
    estado: 'ACTIVO',
    descripcion: '10% de descuento en tu compra total'
  },
  {
    idPromocion: 2,
    codigo: 'EXPRESSO5',
    descuento: 5.00,
    tipoDescuento: 'MONTO_FIJO',
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31',
    estado: 'ACTIVO',
    descripcion: 'S/ 5.00 de descuento en compras mayores a S/ 30.00'
  },
  {
    idPromocion: 3,
    codigo: 'BIENVENIDO',
    descuento: 4.00,
    tipoDescuento: 'MONTO_FIJO',
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31',
    estado: 'ACTIVO',
    descripcion: 'S/ 4.00 de descuento en tu primer pedido'
  }
];

// Initial cart matching exactly CARRITO DE COMPRA.png screenshot:
// - Cappuccino Clásico x 1 = S/ 8.00
// - Torta de Chocolate x 2 = S/ 24.00
// - Sándwich de Pollo x 1 = S/ 9.00
// Subtotal = S/ 41.00
export const INITIAL_CART_ITEMS: DetalleCarrito[] = [
  {
    idDetalleCarrito: 1,
    idCarrito: 1,
    idProducto: 1,
    cantidad: 1,
    precioUnitario: 8.00,
    subtotal: 8.00,
    producto: INITIAL_PRODUCTS[0],
    varianteSeleccionada: 'Regular (8 oz) - Leche Entera'
  },
  {
    idDetalleCarrito: 2,
    idCarrito: 1,
    idProducto: 3,
    cantidad: 2,
    precioUnitario: 12.00,
    subtotal: 24.00,
    producto: INITIAL_PRODUCTS[2],
    varianteSeleccionada: 'Porción individual'
  },
  {
    idDetalleCarrito: 3,
    idCarrito: 1,
    idProducto: 4,
    cantidad: 1,
    precioUnitario: 9.00,
    subtotal: 9.00,
    producto: INITIAL_PRODUCTS[3],
    varianteSeleccionada: 'Pan Ciabatta'
  }
];
