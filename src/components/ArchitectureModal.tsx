import React, { useState } from 'react';
import { SPRING_CODEBASE_FILES, CodeFile } from '../architecture/springCodebase';
import { apiSimulator } from '../services/apiSimulator';
import {
  X,
  Database,
  Layers,
  Code2,
  Terminal,
  Copy,
  Check,
  Play,
  FileCode,
  Shield,
  Table,
  Key,
  FolderTree,
  ExternalLink
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'code' | 'apiTester' | 'guide'>('diagram');
  const [selectedFileId, setSelectedFileId] = useState<string>('schema-sql');
  const [copied, setCopied] = useState(false);

  // API Tester States
  const [apiEndpoint, setApiEndpoint] = useState<string>('/api/v1/productos');
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST'>('GET');
  const [apiRequestBody, setApiRequestBody] = useState<string>(
    JSON.stringify(
      {
        idCliente: 1,
        idPromocion: 1,
        modalidadEntrega: 'DELIVERY',
        idDireccion: 1,
        metodoPago: 'TARJETA_CREDITO',
        items: [
          { idProducto: 1, cantidad: 1, precioUnitario: 8.00 },
          { idProducto: 3, cantidad: 2, precioUnitario: 12.00 }
        ]
      },
      null,
      2
    )
  );
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiStatus, setApiStatus] = useState<number>(200);
  const [apiLoading, setApiLoading] = useState(false);

  if (!isOpen) return null;

  const currentFile =
    SPRING_CODEBASE_FILES.find((f) => f.id === selectedFileId) || SPRING_CODEBASE_FILES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteApi = () => {
    setApiLoading(true);
    setTimeout(() => {
      try {
        if (apiEndpoint.startsWith('/api/v1/productos')) {
          const res = apiSimulator.getProductos();
          setApiResponse(res);
          setApiStatus(200);
        } else if (apiEndpoint.startsWith('/api/v1/categorias')) {
          const res = apiSimulator.getCategorias();
          setApiResponse(res);
          setApiStatus(200);
        } else if (apiEndpoint.startsWith('/api/v1/promociones')) {
          const res = apiSimulator.validarPromocion('PAZ10');
          setApiResponse(res);
          setApiStatus(200);
        } else if (apiEndpoint.startsWith('/api/v1/inventario')) {
          const res = apiSimulator.getInventario();
          setApiResponse(res);
          setApiStatus(200);
        } else if (apiEndpoint.startsWith('/api/v1/pedidos') && apiMethod === 'POST') {
          const parsed = JSON.parse(apiRequestBody);
          const res = apiSimulator.crearPedido(parsed);
          setApiResponse(res);
          setApiStatus(201);
        } else if (apiEndpoint.startsWith('/api/v1/pedidos')) {
          const res = apiSimulator.getPedidosCliente(1);
          setApiResponse(res);
          setApiStatus(200);
        }
      } catch (err: any) {
        setApiResponse({ success: false, message: err.message, timestamp: new Date().toISOString() });
        setApiStatus(400);
      } finally {
        setApiLoading(false);
      }
    }, 250);
  };

  // Diagram Tables Data matching TABLA BASE DATOS MYSQL.png
  const tables = [
    {
      name: 'Rol',
      color: 'border-purple-300 bg-purple-50/60 text-purple-900',
      headerBg: 'bg-purple-600 text-white',
      fields: [
        { name: 'idRol', type: 'INT', key: 'PK' },
        { name: 'nombre', type: 'VARCHAR(50)', key: '' },
        { name: 'descripcion', type: 'VARCHAR(100)', key: '' }
      ]
    },
    {
      name: 'Usuario',
      color: 'border-emerald-300 bg-emerald-50/60 text-emerald-900',
      headerBg: 'bg-emerald-600 text-white',
      fields: [
        { name: 'idUsuario', type: 'INT', key: 'PK' },
        { name: 'idRol', type: 'INT', key: 'FK' },
        { name: 'correo', type: 'VARCHAR(100)', key: '' },
        { name: 'contraseña', type: 'VARCHAR(255)', key: '' },
        { name: 'estado', type: 'VARCHAR(20)', key: '' }
      ]
    },
    {
      name: 'Cliente',
      color: 'border-sky-300 bg-sky-50/60 text-sky-900',
      headerBg: 'bg-sky-600 text-white',
      fields: [
        { name: 'idCliente', type: 'INT', key: 'PK' },
        { name: 'idUsuario', type: 'INT', key: 'FK' },
        { name: 'nombres', type: 'VARCHAR(100)', key: '' },
        { name: 'apellidos', type: 'VARCHAR(100)', key: '' },
        { name: 'telefono', type: 'VARCHAR(20)', key: '' }
      ]
    },
    {
      name: 'Dirección',
      color: 'border-amber-300 bg-amber-50/60 text-amber-900',
      headerBg: 'bg-amber-600 text-white',
      fields: [
        { name: 'idDireccion', type: 'INT', key: 'PK' },
        { name: 'idCliente', type: 'INT', key: 'FK' },
        { name: 'direccion', type: 'VARCHAR(150)', key: '' },
        { name: 'referencia', type: 'VARCHAR(150)', key: '' },
        { name: 'distrito', type: 'VARCHAR(80)', key: '' }
      ]
    },
    {
      name: 'Categoría',
      color: 'border-amber-300 bg-amber-50/60 text-amber-900',
      headerBg: 'bg-amber-600 text-white',
      fields: [
        { name: 'idCategoria', type: 'INT', key: 'PK' },
        { name: 'nombre', type: 'VARCHAR(80)', key: '' },
        { name: 'descripcion', type: 'VARCHAR(150)', key: '' },
        { name: 'estado', type: 'VARCHAR(20)', key: '' }
      ]
    },
    {
      name: 'Producto',
      color: 'border-sky-300 bg-sky-50/60 text-sky-900',
      headerBg: 'bg-sky-600 text-white',
      fields: [
        { name: 'idProducto', type: 'INT', key: 'PK' },
        { name: 'idCategoria', type: 'INT', key: 'FK' },
        { name: 'nombre', type: 'VARCHAR(100)', key: '' },
        { name: 'descripcion', type: 'VARCHAR(150)', key: '' },
        { name: 'precio', type: 'DECIMAL(10,2)', key: '' },
        { name: 'estado', type: 'VARCHAR(20)', key: '' }
      ]
    },
    {
      name: 'VarianteProducto',
      color: 'border-emerald-300 bg-emerald-50/60 text-emerald-900',
      headerBg: 'bg-emerald-600 text-white',
      fields: [
        { name: 'idVariante', type: 'INT', key: 'PK' },
        { name: 'idProducto', type: 'INT', key: 'FK' },
        { name: 'tipo', type: 'VARCHAR(50)', key: '' },
        { name: 'valor', type: 'VARCHAR(50)', key: '' },
        { name: 'precioExtra', type: 'DECIMAL(10,2)', key: '' }
      ]
    },
    {
      name: 'Inventario',
      color: 'border-purple-300 bg-purple-50/60 text-purple-900',
      headerBg: 'bg-purple-600 text-white',
      fields: [
        { name: 'idInventario', type: 'INT', key: 'PK' },
        { name: 'idProducto', type: 'INT', key: 'FK' },
        { name: 'stockActual', type: 'INT', key: '' },
        { name: 'stockMinimo', type: 'INT', key: '' },
        { name: 'fechaActualizacion', type: 'DATETIME', key: '' }
      ]
    },
    {
      name: 'Carrito',
      color: 'border-rose-300 bg-rose-50/60 text-rose-900',
      headerBg: 'bg-rose-600 text-white',
      fields: [
        { name: 'idCarrito', type: 'INT', key: 'PK' },
        { name: 'idCliente', type: 'INT', key: 'FK' },
        { name: 'fechaCreacion', type: 'DATETIME', key: '' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', key: '' },
        { name: 'total', type: 'DECIMAL(10,2)', key: '' }
      ]
    },
    {
      name: 'DetalleCarrito',
      color: 'border-amber-300 bg-amber-50/60 text-amber-900',
      headerBg: 'bg-amber-600 text-white',
      fields: [
        { name: 'idDetalleCarrito', type: 'INT', key: 'PK' },
        { name: 'idCarrito', type: 'INT', key: 'FK' },
        { name: 'idProducto', type: 'INT', key: 'FK' },
        { name: 'cantidad', type: 'INT', key: '' },
        { name: 'precioUnitario', type: 'DECIMAL(10,2)', key: '' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', key: '' }
      ]
    },
    {
      name: 'Promoción',
      color: 'border-emerald-300 bg-emerald-50/60 text-emerald-900',
      headerBg: 'bg-emerald-600 text-white',
      fields: [
        { name: 'idPromocion', type: 'INT', key: 'PK' },
        { name: 'codigo', type: 'VARCHAR(30)', key: '' },
        { name: 'descuento', type: 'DECIMAL(10,2)', key: '' },
        { name: 'fechaInicio', type: 'DATE', key: '' },
        { name: 'fechaFin', type: 'DATE', key: '' },
        { name: 'estado', type: 'VARCHAR(20)', key: '' }
      ]
    },
    {
      name: 'Pedido',
      color: 'border-purple-300 bg-purple-50/60 text-purple-900',
      headerBg: 'bg-purple-600 text-white',
      fields: [
        { name: 'idPedido', type: 'INT', key: 'PK' },
        { name: 'idCliente', type: 'INT', key: 'FK' },
        { name: 'idPromocion', type: 'INT', key: 'FK (opcional)' },
        { name: 'fechaPedido', type: 'DATETIME', key: '' },
        { name: 'modalidadEntrega', type: 'VARCHAR(30)', key: '' },
        { name: 'estado', type: 'VARCHAR(30)', key: '' },
        { name: 'total', type: 'DECIMAL(10,2)', key: '' }
      ]
    },
    {
      name: 'DetallePedido',
      color: 'border-amber-300 bg-amber-50/60 text-amber-900',
      headerBg: 'bg-amber-600 text-white',
      fields: [
        { name: 'idDetallePedido', type: 'INT', key: 'PK' },
        { name: 'idPedido', type: 'INT', key: 'FK' },
        { name: 'idProducto', type: 'INT', key: 'FK' },
        { name: 'cantidad', type: 'INT', key: '' },
        { name: 'precioUnitario', type: 'DECIMAL(10,2)', key: '' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', key: '' }
      ]
    },
    {
      name: 'Pago',
      color: 'border-rose-300 bg-rose-50/60 text-rose-900',
      headerBg: 'bg-rose-600 text-white',
      fields: [
        { name: 'idPago', type: 'INT', key: 'PK' },
        { name: 'idPedido', type: 'INT', key: 'FK' },
        { name: 'metodoPago', type: 'VARCHAR(30)', key: '' },
        { name: 'monto', type: 'DECIMAL(10,2)', key: '' },
        { name: 'estadoPago', type: 'VARCHAR(20)', key: '' },
        { name: 'fechaPago', type: 'DATETIME', key: '' }
      ]
    },
    {
      name: 'HistorialEstadoPedido',
      color: 'border-sky-300 bg-sky-50/60 text-sky-900',
      headerBg: 'bg-sky-600 text-white',
      fields: [
        { name: 'idHistorial', type: 'INT', key: 'PK' },
        { name: 'idPedido', type: 'INT', key: 'FK' },
        { name: 'estado', type: 'VARCHAR(30)', key: '' },
        { name: 'fechaHora', type: 'DATETIME', key: '' },
        { name: 'observacion', type: 'VARCHAR(150)', key: '' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div
        className="bg-stone-900 text-stone-100 rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl border border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C532B] text-white flex items-center justify-center shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <span>Arquitectura MVC & API REST Spring Boot</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  Java 17 + MySQL
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Paz y Espresso · Spring Security · Spring Data JPA · Hibernate · JSON
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab navigation pills */}
            <div className="flex bg-stone-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'diagram' ? 'bg-[#8C532B] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Modelo ER MySQL (15 tablas)</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'code' ? 'bg-[#8C532B] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Código Spring Boot</span>
              </button>

              <button
                onClick={() => setActiveTab('apiTester')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'apiTester' ? 'bg-[#8C532B] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Probador API REST (Swagger)</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-hidden flex flex-col bg-stone-900">
          {/* TAB 1: MODELO ER MYSQL (15 TABLAS EXACTAS) */}
          {activeTab === 'diagram' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-stone-800/80 border border-stone-700 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Table className="w-4 h-4 text-[#E8B878]" />
                    <span>Diagrama de Clases Relacionales MySQL (Paz y Espresso)</span>
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    15 tablas normalizadas con claves primarias (PK), foráneas (FK), índices y restricciones relacionales.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedFileId('schema-sql');
                    setActiveTab('code');
                  }}
                  className="px-3.5 py-1.5 bg-[#8C532B] hover:bg-[#A36435] text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Ver Script DDL schema.sql</span>
                </button>
              </div>

              {/* Grid of 15 relational tables matching TABLA BASE DATOS MYSQL.png */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
                {tables.map((table) => (
                  <div
                    key={table.name}
                    className="bg-white rounded-xl shadow-lg border border-stone-300 overflow-hidden flex flex-col text-stone-900"
                  >
                    <div
                      className={`px-3 py-2 text-xs font-bold text-center uppercase tracking-wider ${table.headerBg}`}
                    >
                      {table.name}
                    </div>
                    <div className="p-2 divide-y divide-stone-100 text-[11px] font-mono">
                      <div className="flex justify-between text-stone-400 font-bold pb-1 text-[10px]">
                        <span>Campo</span>
                        <span>Tipo</span>
                        <span>Clave</span>
                      </div>
                      {table.fields.map((f, idx) => (
                        <div key={idx} className="py-1 flex items-center justify-between">
                          <span className={`font-semibold ${f.key === 'PK' ? 'text-amber-800' : 'text-stone-800'}`}>
                            {f.name}
                          </span>
                          <span className="text-stone-500 text-[10px]">{f.type}</span>
                          <span className="min-w-6 text-right">
                            {f.key && (
                              <span
                                className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                                  f.key.startsWith('PK')
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'bg-blue-100 text-blue-900'
                                }`}
                              >
                                {f.key}
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CODIGO SPRING BOOT EXPLORER */}
          {activeTab === 'code' && (
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* File list sidebar */}
              <div className="w-full md:w-80 bg-stone-950 border-r border-stone-800 p-4 overflow-y-auto space-y-2">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>Archivos del Proyecto</span>
                </div>

                {SPRING_CODEBASE_FILES.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex flex-col gap-0.5 cursor-pointer ${
                      selectedFileId === file.id
                        ? 'bg-[#8C532B] text-white shadow-sm'
                        : 'text-stone-300 hover:bg-stone-900'
                    }`}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span className="truncate">{file.name}</span>
                      <span className="text-[10px] opacity-70 uppercase font-mono">{file.language}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 line-clamp-1">
                      {file.path}
                    </span>
                  </button>
                ))}
              </div>

              {/* Code viewer main */}
              <div className="flex-1 flex flex-col bg-stone-900 overflow-hidden">
                <div className="px-6 py-3 bg-stone-950/70 border-b border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#E8B878] font-bold">{currentFile.path}</span>
                    <p className="text-[11px] text-stone-400">{currentFile.description}</p>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="flex-1 overflow-auto p-4 font-mono text-xs bg-stone-950 text-stone-200">
                  <pre className="leading-relaxed">
                    <code>{currentFile.content}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROBADOR DE API REST INTERACTIVO (SWAGGER / OPENAPI) */}
          {activeTab === 'apiTester' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-stone-800/80 border border-stone-700 p-4 rounded-2xl">
                <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#E8B878]" />
                  <span>Consola de Pruebas de Endpoints REST (Spring Boot MVC)</span>
                </h3>
                <p className="text-xs text-stone-300">
                  Prueba las rutas REST simuladas y observa los payloads JSON de respuesta de Spring Data JPA.
                </p>
              </div>

              {/* Controls */}
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={apiMethod}
                    onChange={(e) => setApiMethod(e.target.value as any)}
                    className="bg-stone-800 text-white border border-stone-700 rounded-xl px-3 py-2 text-xs font-bold font-mono"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>

                  <select
                    value={apiEndpoint}
                    onChange={(e) => {
                      const val = e.target.value;
                      setApiEndpoint(val);
                      if (val.includes('pedidos') && apiMethod === 'POST') {
                        // keep body
                      } else {
                        setApiMethod('GET');
                      }
                    }}
                    className="flex-1 bg-stone-800 text-white border border-stone-700 rounded-xl px-3 py-2 text-xs font-mono"
                  >
                    <option value="/api/v1/productos">GET /api/v1/productos (Listar catálogo)</option>
                    <option value="/api/v1/categorias">GET /api/v1/categorias (Listar categorías)</option>
                    <option value="/api/v1/promociones/validar?codigo=PAZ10">
                      GET /api/v1/promociones/validar?codigo=PAZ10 (Validar cupón)
                    </option>
                    <option value="/api/v1/inventario">GET /api/v1/inventario (Consultar stock)</option>
                    <option value="/api/v1/pedidos/cliente/1">GET /api/v1/pedidos/cliente/1 (Historial)</option>
                    <option value="/api/v1/pedidos">POST /api/v1/pedidos (Generar nuevo pedido)</option>
                  </select>

                  <button
                    onClick={handleExecuteApi}
                    disabled={apiLoading}
                    className="px-6 py-2 bg-[#8C532B] hover:bg-[#A36435] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{apiLoading ? 'Ejecutando...' : 'Enviar Petición'}</span>
                  </button>
                </div>

                {/* Request body when POST */}
                {apiMethod === 'POST' && (
                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">
                      Request Body (JSON Payload):
                    </label>
                    <textarea
                      value={apiRequestBody}
                      onChange={(e) => setApiRequestBody(e.target.value)}
                      rows={6}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-[#8C532B]"
                    />
                  </div>
                )}
              </div>

              {/* Response output */}
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-xs font-mono font-bold text-stone-400">Response JSON</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        apiStatus === 200 || apiStatus === 201
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      Status: {apiStatus} {apiStatus === 200 ? 'OK' : apiStatus === 201 ? 'CREATED' : 'ERROR'}
                    </span>
                  </div>
                </div>

                <pre className="max-h-96 overflow-auto text-xs font-mono text-emerald-400 p-2">
                  <code>{JSON.stringify(apiResponse || { message: 'Haz clic en "Enviar Petición" para probar el endpoint.' }, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
