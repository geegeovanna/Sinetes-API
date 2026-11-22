
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import sigilImage from '@/assets/sigil-arcane.png';

const links = [
  { label: 'Início', path: '/' },
  { label: 'Arquivo', path: '/gerenciar' },
];

const serif = {
  fontFamily: "'Cinzel', serif",
};

function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080706] text-[#E5D7BE]">

      <header className="sticky top-0 z-50 border-b border-[#B99A62]/20 bg-[#080706]">

        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-6 md:px-10">

          <NavLink
            to="/"
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            aria-label="DRACONIS - Página inicial"
          >
            <img
              src={sigilImage}
              alt=""
              className="h-10 w-10 object-contain md:h-11 md:w-11"
            />

            <div className="flex flex-col gap-0.5">
              <span
                className="text-lg tracking-[0.22em] text-[#D0B47C] md:text-xl"
                style={serif}
              >
                DRACONIS
              </span>

              <span className="text-[8px] tracking-[0.24em] text-[#8B806E] md:text-[9px]">
                ARQUIVOS DE NAVARRE
              </span>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex lg:gap-11">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative py-2 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 lg:text-xs ${
                    isActive
                      ? 'text-[#D0B47C]'
                      : 'text-[#918779] hover:text-[#E5D7BE]'
                  }`
                }
                style={serif}
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#B99A62] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[6px] border border-[#B99A62]/30 md:hidden"
          >
            <span
              className={`h-px w-4 bg-[#B99A62] transition-transform ${
                open ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />

            <span
              className={`h-px w-4 bg-[#B99A62] transition-opacity ${
                open ? 'opacity-0' : ''
              }`}
            />

            <span
              className={`h-px w-4 bg-[#B99A62] transition-transform ${
                open ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {open && (
          <nav className="border-t border-[#B99A62]/20 bg-[#080706] px-6 py-3 md:hidden">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block border-b border-[#B99A62]/10 py-4 text-xs uppercase tracking-[0.2em] last:border-0 ${
                    isActive
                      ? 'text-[#D0B47C]'
                      : 'text-[#918779] hover:text-[#E5D7BE]'
                  }`
                }
                style={serif}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-[#B99A62]/20 py-10">
        <p
          className="text-center text-[9px] uppercase tracking-[0.3em] text-[#8B806E]"
          style={serif}
        >
          DRACONIS · Arquivos de Navarre
        </p>
      </footer>
    </div>
  );
}

export default AppLayout;
