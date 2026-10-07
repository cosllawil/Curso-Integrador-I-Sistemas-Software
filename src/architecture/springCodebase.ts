/**
 * Arquitectura Backend Completa: Java 17 + Spring Boot 3 + Spring Data JPA + Hibernate + Spring Security + MySQL
 * Contiene el código fuente real, archivos de configuración, DDL SQL y controllers.
 */

export interface CodeFile {
  id: string;
  name: string;
  path: string;
  language: 'java' | 'sql' | 'xml' | 'yaml' | 'json';
  category: 'config' | 'sql' | 'entity' | 'repository' | 'dto' | 'service' | 'controller' | 'security' | 'exception';
  description: string;
  content: string;
}

export const SPRING_CODEBASE_FILES: CodeFile[] = [
  {
    id: 'pom-xml',
    name: 'pom.xml',
    path: 'pom.xml',
    language: 'xml',
    category: 'config',
    description: 'Descriptor Maven con Java 17, Spring Boot 3.2.3, Spring Security, Spring Data JPA, MySQL Connector/J y JJWT.',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/>
    </parent>

    <groupId>com.pazyespresso</groupId>
    <artifactId>paz-espresso-backend</artifactId>
    <version>1.0.0</version>
    <name>paz-espresso-backend</name>
    <description>API REST para Paz y Espresso - Cafetería de Especialidad</description>

    <properties>
        <java.version>17</java.version>
        <jjwt.version>0.12.5</jjwt.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web: Servidor Tomcat embebido, Jackson JSON, MVC & REST Controllers -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA & Hibernate: ORM y repositorios relacionales -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Spring Security: Autenticación, autorización basada en roles (ROLE_ADMIN, ROLE_CLIENTE) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- Bean Validation: Validaciones @NotNull, @NotBlank, @Min, @Email en DTOs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- MySQL Driver: Conector JDBC para MySQL 8.x -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- JWT (JSON Web Tokens): jjwt para autenticación Stateless -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>\${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok: Generación de getters, setters, constructores y builders -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    id: 'application-yml',
    name: 'application.yml',
    path: 'src/main/resources/application.yml',
    language: 'yaml',
    category: 'config',
    description: 'Configuración de conexión a MySQL, pool de conexiones HikariCP, Hibernate Dialect y JWT.',
    content: `server:
  port: 8080
  servlet:
    context-path: /api/v1

spring:
  application:
    name: paz-espresso-api

  # Conexión a Base de Datos MySQL
  datasource:
    url: jdbc:mysql://localhost:3306/paz_espresso_db?useSSL=false&serverTimezone=America/Lima&allowPublicKeyRetrieval=true
    username: root
    password: \${MYSQL_PASSWORD:root}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 15
      minimum-idle: 5
      idle-timeout: 30000
      connection-timeout: 20000

  # Configuración Hibernate y Spring Data JPA
  jpa:
    hibernate:
      ddl-auto: update # o 'validate' en producción
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQLDialect

# Configuración de Seguridad y Token JWT
jwt:
  secret: dGhpcy1pcy1hLXNlY3JldC1rZXktZm9yLXBhei15LWVzcHJlc3NvLWNhZmUtdG9rZW4tc2VjdXJpdHktMjAyNg==
  expiration-ms: 86400000 # 24 horas en milisegundos`
  },
  {
    id: 'schema-sql',
    name: 'schema.sql (MySQL DDL)',
    path: 'src/main/resources/db/schema.sql',
    language: 'sql',
    category: 'sql',
    description: 'Script DDL completo con las 15 tablas exactas del diagrama ER MySQL, claves primarias, foráneas e índices.',
    content: `-- ==============================================================
-- BASE DE DATOS: paz_espresso_db
-- MODELO ER COMPLETO: 15 TABLAS RELACIONALES (MySQL 8.x)
-- ==============================================================

CREATE DATABASE IF NOT EXISTS paz_espresso_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE paz_espresso_db;

-- 1. Tabla Rol
CREATE TABLE IF NOT EXISTS Rol (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- 2. Tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    idRol INT NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT fk_usuario_rol FOREIGN KEY (idRol) REFERENCES Rol(idRol) ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3. Tabla Cliente
CREATE TABLE IF NOT EXISTS Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    CONSTRAINT fk_cliente_usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabla Dirección
CREATE TABLE IF NOT EXISTS Direccion (
    idDireccion INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    referencia VARCHAR(150),
    distrito VARCHAR(80) NOT NULL,
    CONSTRAINT fk_direccion_cliente FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Tabla Categoría
CREATE TABLE IF NOT EXISTS Categoria (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    descripcion VARCHAR(150) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB;

-- 6. Tabla Producto
CREATE TABLE IF NOT EXISTS Producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    idCategoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT fk_producto_categoria FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria) ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 7. Tabla VarianteProducto
CREATE TABLE IF NOT EXISTS VarianteProducto (
    idVariante INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    valor VARCHAR(50) NOT NULL,
    precioExtra DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_variante_producto FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. Tabla Inventario
CREATE TABLE IF NOT EXISTS Inventario (
    idInventario INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT NOT NULL UNIQUE,
    stockActual INT NOT NULL DEFAULT 0,
    stockMinimo INT NOT NULL DEFAULT 5,
    fechaActualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_inventario_producto FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. Tabla Carrito
CREATE TABLE IF NOT EXISTS Carrito (
    idCarrito INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    fechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_carrito_cliente FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. Tabla DetalleCarrito
CREATE TABLE IF NOT EXISTS DetalleCarrito (
    idDetalleCarrito INT AUTO_INCREMENT PRIMARY KEY,
    idCarrito INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_carrito FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 11. Tabla Promoción
CREATE TABLE IF NOT EXISTS Promocion (
    idPromocion INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    descuento DECIMAL(10,2) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB;

-- 12. Tabla Pedido
CREATE TABLE IF NOT EXISTS Pedido (
    idPedido INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    idPromocion INT NULL,
    fechaPedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modalidadEntrega VARCHAR(30) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'REGISTRADO',
    total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente) ON UPDATE CASCADE,
    CONSTRAINT fk_pedido_promocion FOREIGN KEY (idPromocion) REFERENCES Promocion(idPromocion) ON SET NULL
) ENGINE=InnoDB;

-- 13. Tabla DetallePedido
CREATE TABLE IF NOT EXISTS DetallePedido (
    idDetallePedido INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_pedido_producto FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 14. Tabla Pago
CREATE TABLE IF NOT EXISTS Pago (
    idPago INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL UNIQUE,
    metodoPago VARCHAR(30) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    estadoPago VARCHAR(20) NOT NULL DEFAULT 'COMPLETADO',
    fechaPago DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pago_pedido FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 15. Tabla HistorialEstadoPedido
CREATE TABLE IF NOT EXISTS HistorialEstadoPedido (
    idHistorial INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL,
    estado VARCHAR(30) NOT NULL,
    fechaHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacion VARCHAR(150),
    CONSTRAINT fk_historial_pedido FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido) ON DELETE CASCADE
) ENGINE=InnoDB;`
  },
  {
    id: 'data-sql',
    name: 'data.sql (Seed Data)',
    path: 'src/main/resources/db/data.sql',
    language: 'sql',
    category: 'sql',
    description: 'Inserción de datos de prueba para Roles, Usuarios, Categorías, Productos y Promociones en MySQL.',
    content: `-- Inserción inicial de Roles
INSERT INTO Rol (idRol, nombre, descripcion) VALUES
(1, 'ROLE_ADMIN', 'Administrador con acceso a inventario y gestión de pedidos'),
(2, 'ROLE_CLIENTE', 'Cliente registrado con capacidad de compra y carrito');

-- Inserción de Categorías
INSERT INTO Categoria (idCategoria, nombre, descripcion, estado) VALUES
(1, 'Cafés', 'Espresso selecto, cappuccinos con arte latte y cafés de especialidad', 'ACTIVO'),
(2, 'Bebidas Frías', 'Frappés cremosos, lattes helados y refrescantes creaciones artesanales', 'ACTIVO'),
(3, 'Postres', 'Tortas esponjosas, cheesecakes de autor y repostería artesanal', 'ACTIVO'),
(4, 'Sándwiches', 'Panes rústicos tostados rellenos con pollo marinado y vegetales', 'ACTIVO'),
(5, 'Panes', 'Croissants hojaldrados y panes de mantequilla recién horneados', 'ACTIVO'),
(6, 'Otros', 'Galletas de cacao puro y complementos gourmet', 'ACTIVO');

-- Inserción de Productos
INSERT INTO Producto (idProducto, idCategoria, nombre, descripcion, precio, estado) VALUES
(1, 1, 'Cappuccino Clásico', 'Espresso doble con suave microespuma de leche y arte latte', 8.00, 'ACTIVO'),
(2, 2, 'Frappé de Café', 'Café batido con hielo, leche fresca y salsa de caramelo', 10.00, 'ACTIVO'),
(3, 3, 'Torta de Chocolate', 'Bizcocho húmedo de cacao orgánico al 70% con ganache', 12.00, 'ACTIVO'),
(4, 4, 'Sándwich de Pollo', 'Pechuga deshilachada con apio y mayonesa en pan ciabatta', 9.00, 'ACTIVO'),
(5, 5, 'Muffin de Arándanos', 'Muffin esponjoso horneado con arándanos silvestres', 6.00, 'ACTIVO'),
(6, 5, 'Croissant de Mantequilla', 'Hojaldre francés crujiente con mantequilla premium', 5.00, 'ACTIVO'),
(7, 2, 'Mocha Frío', 'Espresso, jarabe de chocolate belga, leche fría y crema chantilly', 11.00, 'ACTIVO'),
(8, 3, 'Cheesecake de Frutos Rojos', 'Crema de queso New York con coulis de frambuesas y moras', 12.00, 'ACTIVO'),
(9, 2, 'Latte Helado', 'Shot doble servido sobre leche helada con cubos de hielo', 9.00, 'ACTIVO'),
(10, 6, 'Galletas de Chocolate', 'Galletas horneadas suaves con trozos de chocolate con leche', 4.00, 'ACTIVO');

-- Inserción de Inventario inicial
INSERT INTO Inventario (idProducto, stockActual, stockMinimo) VALUES
(1, 50, 10), (2, 40, 8), (3, 25, 5), (4, 30, 6), (5, 45, 10),
(6, 40, 10), (7, 35, 8), (8, 20, 5), (9, 30, 6), (10, 60, 15);

-- Inserción de Promociones
INSERT INTO Promocion (codigo, descuento, fechaInicio, fechaFin, estado) VALUES
('PAZ10', 10.00, '2026-01-01', '2026-12-31', 'ACTIVO'),
('EXPRESSO5', 5.00, '2026-01-01', '2026-12-31', 'ACTIVO'),
('BIENVENIDO', 4.00, '2026-01-01', '2026-12-31', 'ACTIVO');`
  },
  {
    id: 'entity-producto',
    name: 'Producto.java',
    path: 'src/main/java/com/pazyespresso/entity/Producto.java',
    language: 'java',
    category: 'entity',
    description: 'Entidad JPA con Hibernate que modela la tabla Producto y sus relaciones con Categoria, Inventario y Variantes.',
    content: `package com.pazyespresso.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "Producto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProducto")
    private Integer idProducto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCategoria", nullable = false)
    private Categoria categoria;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "descripcion", length = 150, nullable = false)
    private String descripcion;

    @Column(name = "precio", precision = 10, scale = 2, nullable = false)
    private BigDecimal precio;

    @Column(name = "estado", length = 20, nullable = false)
    @Builder.Default
    private String estado = "ACTIVO";

    @OneToOne(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Inventario inventario;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VarianteProducto> variantes;
}`
  },
  {
    id: 'entity-pedido',
    name: 'Pedido.java',
    path: 'src/main/java/com/pazyespresso/entity/Pedido.java',
    language: 'java',
    category: 'entity',
    description: 'Entidad JPA para Pedido, con relaciones OneToMany a DetallePedido, OneToOne a Pago y OneToMany a HistorialEstadoPedido.',
    content: `package com.pazyespresso.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPedido")
    private Integer idPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCliente", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPromocion")
    private Promocion promocion;

    @Column(name = "fechaPedido", nullable = false)
    private LocalDateTime fechaPedido;

    @Column(name = "modalidadEntrega", length = 30, nullable = false)
    private String modalidadEntrega; // DELIVERY o RECOJO_TIENDA

    @Column(name = "estado", length = 30, nullable = false)
    private String estado; // REGISTRADO, EN_PREPARACION, EN_CAMINO, ENTREGADO

    @Column(name = "total", precision = 10, scale = 2, nullable = false)
    private BigDecimal total;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<DetallePedido> detalles = new ArrayList<>();

    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pago pago;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    @Builder.Default
    private List<HistorialEstadoPedido> historial = new ArrayList<>();

    public void addDetalle(DetallePedido detalle) {
        detalles.add(detalle);
        detalle.setPedido(this);
    }
}`
  },
  {
    id: 'entity-inventario',
    name: 'Inventario.java',
    path: 'src/main/java/com/pazyespresso/entity/Inventario.java',
    language: 'java',
    category: 'entity',
    description: 'Entidad JPA para la tabla Inventario que controla stockActual y stockMinimo con actualización automática de fecha.',
    content: `package com.pazyespresso.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Inventario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idInventario")
    private Integer idInventario;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto", nullable = false, unique = true)
    private Producto producto;

    @Column(name = "stockActual", nullable = false)
    private Integer stockActual;

    @Column(name = "stockMinimo", nullable = false)
    private Integer stockMinimo;

    @Column(name = "fechaActualizacion", nullable = false)
    private LocalDateTime fechaActualizacion;

    @PreUpdate
    @PrePersist
    public void onUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }
}`
  },
  {
    id: 'repository-pedido',
    name: 'PedidoRepository.java',
    path: 'src/main/java/com/pazyespresso/repository/PedidoRepository.java',
    language: 'java',
    category: 'repository',
    description: 'Repositorio Spring Data JPA con consultas JPQL para pedidos de un cliente y estados.',
    content: `package com.pazyespresso.repository;

import com.pazyespresso.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findByClienteIdClienteOrderByFechaPedidoDesc(Integer idCliente);

    @Query("SELECT p FROM Pedido p " +
           "LEFT JOIN FETCH p.detalles d " +
           "LEFT JOIN FETCH d.producto " +
           "LEFT JOIN FETCH p.pago " +
           "LEFT JOIN FETCH p.historial " +
           "WHERE p.idPedido = :idPedido")
    Optional<Pedido> findByIdWithDetails(@Param("idPedido") Integer idPedido);

    List<Pedido> findByEstado(String estado);
}`
  },
  {
    id: 'service-pedido',
    name: 'PedidoServiceImpl.java',
    path: 'src/main/java/com/pazyespresso/service/impl/PedidoServiceImpl.java',
    language: 'java',
    category: 'service',
    description: 'Servicio transaccional de Spring Boot con lógica de validación de inventario, descuento por cupón, guardado de Pago e Historial.',
    content: `package com.pazyespresso.service.impl;

import com.pazyespresso.dto.request.PedidoRequestDTO;
import com.pazyespresso.dto.response.PedidoResponseDTO;
import com.pazyespresso.entity.*;
import com.pazyespresso.exception.ResourceNotFoundException;
import com.pazyespresso.exception.StockInsuficienteException;
import com.pazyespresso.repository.*;
import com.pazyespresso.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;
    private final InventarioRepository inventarioRepository;
    private final PromocionRepository promocionRepository;

    @Override
    @Transactional
    public PedidoResponseDTO crearPedido(PedidoRequestDTO request) {
        Cliente cliente = clienteRepository.findById(request.idCliente())
            .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + request.idCliente()));

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setFechaPedido(LocalDateTime.now());
        pedido.setModalidadEntrega(request.modalidadEntrega());
        pedido.setEstado("REGISTRADO");

        BigDecimal subtotal = BigDecimal.ZERO;

        for (var itemReq : request.items()) {
            Producto producto = productoRepository.findById(itemReq.idProducto())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + itemReq.idProducto()));

            // Validación y descuento atómico de stock en Inventario
            Inventario inventario = inventarioRepository.findByProductoIdProducto(producto.getIdProducto())
                .orElseThrow(() -> new ResourceNotFoundException("Inventario no registrado para producto: " + producto.getIdProducto()));

            if (inventario.getStockActual() < itemReq.cantidad()) {
                throw new StockInsuficienteException("Stock insuficiente para: " + producto.getNombre() + 
                    ". Disponible: " + inventario.getStockActual());
            }

            inventario.setStockActual(inventario.getStockActual() - itemReq.cantidad());
            inventarioRepository.save(inventario);

            BigDecimal itemSubtotal = producto.getPrecio().multiply(BigDecimal.valueOf(itemReq.cantidad()));
            subtotal = subtotal.add(itemSubtotal);

            DetallePedido detalle = DetallePedido.builder()
                .producto(producto)
                .cantidad(itemReq.cantidad())
                .precioUnitario(producto.getPrecio())
                .subtotal(itemSubtotal)
                .build();
            pedido.addDetalle(detalle);
        }

        // Aplicación opcional de cupón de Promoción
        BigDecimal descuento = BigDecimal.ZERO;
        if (request.idPromocion() != null) {
            Promocion promo = promocionRepository.findById(request.idPromocion())
                .filter(p -> "ACTIVO".equalsIgnoreCase(p.getEstado()))
                .orElse(null);
            if (promo != null) {
                pedido.setPromocion(promo);
                descuento = promo.getDescuento();
            }
        }

        BigDecimal costoEnvio = "DELIVERY".equalsIgnoreCase(request.modalidadEntrega()) 
            ? new BigDecimal("5.00") 
            : BigDecimal.ZERO;

        BigDecimal total = subtotal.add(costoEnvio).subtract(descuento);
        pedido.setTotal(total.max(BigDecimal.ZERO));

        // Registro del Pago
        Pago pago = Pago.builder()
            .pedido(pedido)
            .metodoPago(request.metodoPago())
            .monto(pedido.getTotal())
            .estadoPago("COMPLETADO")
            .fechaPago(LocalDateTime.now())
            .build();
        pedido.setPago(pago);

        // Registro inicial en HistorialEstadoPedido
        HistorialEstadoPedido historial = HistorialEstadoPedido.builder()
            .pedido(pedido)
            .estado("REGISTRADO")
            .fechaHora(LocalDateTime.now())
            .observacion("Pedido generado exitosamente a través de la API REST")
            .build();
        pedido.getHistorial().add(historial);

        Pedido saved = pedidoRepository.save(pedido);
        return mapToResponseDTO(saved);
    }

    private PedidoResponseDTO mapToResponseDTO(Pedido p) {
        return new PedidoResponseDTO(
            p.getIdPedido(),
            "PED-2026-" + String.format("%04d", p.getIdPedido()),
            p.getCliente().getNombres() + " " + p.getCliente().getApellidos(),
            p.getFechaPedido(),
            p.getModalidadEntrega(),
            p.getEstado(),
            p.getTotal()
        );
    }
}`
  },
  {
    id: 'controller-pedido',
    name: 'PedidoController.java',
    path: 'src/main/java/com/pazyespresso/controller/PedidoController.java',
    language: 'java',
    category: 'controller',
    description: 'Controlador REST con Spring Web (@RestController) que expone endpoints para generar pedidos y consultar estado.',
    content: `package com.pazyespresso.controller;

import com.pazyespresso.dto.request.PedidoRequestDTO;
import com.pazyespresso.dto.response.ApiResponse;
import com.pazyespresso.dto.response.PedidoResponseDTO;
import com.pazyespresso.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> crearPedido(
            @Valid @RequestBody PedidoRequestDTO request) {
        
        PedidoResponseDTO pedido = pedidoService.crearPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ApiResponse<>(true, "Pedido generado y registrado exitosamente", pedido)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> obtenerPorId(@PathVariable Integer id) {
        PedidoResponseDTO pedido = pedidoService.obtenerPedidoPorId(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Pedido recuperado", pedido));
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<ApiResponse<List<PedidoResponseDTO>>> listarPorCliente(@PathVariable Integer idCliente) {
        List<PedidoResponseDTO> pedidos = pedidoService.listarPorCliente(idCliente);
        return ResponseEntity.ok(new ApiResponse<>(true, "Historial de pedidos obtenido", pedidos));
    }
}`
  },
  {
    id: 'security-config',
    name: 'SecurityConfig.java',
    path: 'src/main/java/com/pazyespresso/config/SecurityConfig.java',
    language: 'java',
    category: 'security',
    description: 'Configuración de Spring Security 6 con BCryptPasswordEncoder, SessionCreationPolicy Stateless y JWT Filter.',
    content: `package com.pazyespresso.config;

import com.pazyespresso.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configure(http))
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/productos/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/categorias/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/promociones/**").permitAll()
                .requestMatchers("/api/v1/pedidos/**").authenticated()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}`
  },
  {
    id: 'exception-handler',
    name: 'GlobalExceptionHandler.java',
    path: 'src/main/java/com/pazyespresso/exception/GlobalExceptionHandler.java',
    language: 'java',
    category: 'exception',
    description: 'Manejador global con @RestControllerAdvice para devolver respuestas JSON estandarizadas en errores HTTP.',
    content: `package com.pazyespresso.exception;

import com.pazyespresso.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiResponse<>(false, ex.getMessage(), null));
    }

    @ExceptionHandler(StockInsuficienteException.class)
    public ResponseEntity<ApiResponse<String>> handleStock(StockInsuficienteException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(new ApiResponse<>(false, ex.getMessage(), null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> 
            errors.put(err.getField(), err.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new ApiResponse<>(false, "Error de validación en la petición", errors));
    }
}`
  }
];
