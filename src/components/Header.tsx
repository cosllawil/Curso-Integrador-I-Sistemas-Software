import React, { useState } from 'react';
import { ShoppingBag, Search, Coffee, User, Code2, ChevronDown } from 'lucide-react';
import { Cliente } from '../types/database';

interface HeaderProps {
  cartItemCount: number;
  currentTab: 'inicio' | 'productos' | 'categorias' | 'carrito' | 'pedidos' | 'promociones';
  onNavigate: (tab: 'inicio' | 'productos' | 'categorias' | 'carrito' | 'pedidos' | 'promociones') => void;
  onOpenArchitecture: () => void;
  onSearch: (query: string) => void;
  client: Cliente;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  currentTab,
  onNavigate,
  onOpenArchitecture,
  onSearch,
  client
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    if (currentTab !== 'productos') {
      onNavigate('productos');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8DFD5] shadow-xs">
      {/* Top Banner for Architecture Notification */}
      <div className="bg-[#382314] text-[#E8DFD5] text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-[#52331C] text-[#F3E7DC] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
              Java 17 & Spring Boot 3
            </span>
            <span className="hidden sm:inline text-[#D5C2B1]">
              Arquitectura MVC + API REST con Spring Data JPA, Hibernate, Spring Security & MySQL
            </span>
          </div>
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 text-xs text-[#E8B878] hover:text-white font-medium transition-colors cursor-pointer bg-[#52331C]/60 hover:bg-[#52331C] px-2.5 py-0.5 rounded"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Ver Arquitectura & Código</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo matching screenshots */}
          <button
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-3.5 text-left group cursor-pointer shrink-0"
          >
            <div className="w-11 h-11 rounded-full bg-[#382314] text-[#E8B878] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold tracking-tight text-[#382314]">
                Paz y Espresso
              </div>
              <div className="text-[12px] text-[#8C532B] font-medium tracking-wide">
                Café que une momentos
              </div>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-700">
            <button
              onClick={() => onNavigate('inicio')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'inicio'
                  ? 'text-[#382314] font-semibold bg-[#F5EDE4]'
                  : 'hover:text-[#382314] hover:bg-stone-50'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('productos')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'productos'
                  ? 'text-[#382314] font-semibold bg-[#F5EDE4]'
                  : 'hover:text-[#382314] hover:bg-stone-50'
              }`}
            >
              <Coffee className="w-4 h-4 text-[#8C532B]" />
              Productos
            </button>
            <button
              onClick={() => onNavigate('promociones')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'promociones'
                  ? 'text-[#382314] font-semibold bg-[#F5EDE4]'
                  : 'hover:text-[#382314] hover:bg-stone-50'
              }`}
            >
              Promociones
            </button>
            <button
              onClick={() => onNavigate('carrito')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 relative ${
                currentTab === 'carrito'
                  ? 'text-[#382314] font-semibold bg-[#F5EDE4]'
                  : 'hover:text-[#382314] hover:bg-stone-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#8C532B]" />
              Mi Carrito
              {cartItemCount > 0 && (
                <span className="bg-[#A32A1C] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center ml-0.5">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('pedidos')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'pedidos'
                  ? 'text-[#382314] font-semibold bg-[#F5EDE4]'
                  : 'hover:text-[#382314] hover:bg-stone-50'
              }`}
            >
              Mis Pedidos
            </button>
          </nav>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xs xl:max-w-sm relative hidden md:block"
          >
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F6F4F0] border border-[#E3DBD0] rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#8C532B] focus:bg-white transition-colors"
              />
            </div>
          </form>

          {/* Right Action: User Menu */}
          <div className="flex items-center gap-3">
            {/* User Profile Pill button matching screenshot */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 bg-[#4A2E18] hover:bg-[#382314] text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-colors shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{client.nombres}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* User dropdown popup */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E8DFD5] p-3 text-stone-800 z-50">
                  <div className="pb-3 border-b border-stone-100">
                    <p className="font-semibold text-sm text-stone-900">
                      {client.nombres} {client.apellidos}
                    </p>
                    <p className="text-xs text-stone-500">RonnyCoscol@gmail.com</p>
                    <div className="mt-2 inline-flex items-center text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Rol: ROLE_CLIENTE (MySQL idUsuario: 1)
                    </div>
                  </div>
                  <div className="py-2 space-y-1 text-xs">
                    <button
                      onClick={() => {
                        onNavigate('pedidos');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-stone-50 text-stone-700"
                    >
                      Historial de Pedidos (MySQL)
                    </button>
                    <button
                      onClick={() => {
                        onOpenArchitecture();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F5EDE4] text-[#8C532B] font-medium"
                    >
                      Inspeccionar Código Spring Boot
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Cart Button */}
            <button
              onClick={() => onNavigate('carrito')}
              className="lg:hidden relative p-2.5 rounded-lg bg-[#F5EDE4] text-[#382314]"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A32A1C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
