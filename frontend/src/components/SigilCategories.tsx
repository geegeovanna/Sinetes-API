
import { useEffect, useState } from 'react';

import { sineteService } from '@/services/sineteService';
import type { Sinete } from '@/types/sinete';

import arcaneSigil from '@/assets/sigil-arcane.png';
import arcanoSigil from '@/assets/sigil-arcano.png';
import fireSigil from '@/assets/sigil-fogo.png';
import natureSigil from '@/assets/sigil-nature.png';
import protectionSigil from '@/assets/sigil-protection.png';
import shadowsSigil from '@/assets/sigil-shadows.png';

const categoryImages: Record<string, string> = {
  arcano: arcanoSigil,
  elemental: arcaneSigil,
  fogo: fireSigil,
  natureza: natureSigil,
  proteção: protectionSigil,
  sombras: shadowsSigil,
};

function getCategoryImage(category: string) {
  return categoryImages[category.trim().toLowerCase()] ?? arcanoSigil;
}

function SigilCategories() {
  const [sinetes, setSinetes] = useState<Sinete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function carregarSinetes() {
      try {
        const dados = await sineteService.listar();
        setSinetes(dados);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    carregarSinetes();
  }, []);

  const categories = Object.values(
    sinetes.reduce<Record<string, { nome: string; quantidade: number }>>(
      (acc, sinete) => {
        const nome = sinete.categoria.trim();

        if (!nome) return acc;

        if (!acc[nome]) {
          acc[nome] = { nome, quantidade: 0 };
        }

        acc[nome].quantidade += 1;

        return acc;
      },
      {},
    ),
  ).sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <section className="relative overflow-hidden border-b border-[#B99A62]/15 bg-[#0D0B08] px-6 py-24 md:px-12 md:py-32">

      <div className="pointer-events-none absolute -left-48 top-40 h-[500px] w-[500px] rounded-full bg-[#B99A62]/[0.035] blur-[130px]" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[450px] w-[450px] rounded-full bg-[#B99A62]/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div className="max-w-2xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-[#B99A62]/70" />

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#B99A62]">
                04 — Manifestações de poder
              </span>
            </div>

            <h2
              className="text-3xl font-normal leading-[1.35] tracking-wide text-[#E8D8B9] md:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              As manifestações
              <span className="block text-[#B99A62]">
                do poder.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-[#A69A85]">
              Nos arquivos de Navarre, cada manifestação recebe uma
              classificação própria. Registros preservados para documentar
              a natureza e a força dos dons dos cavaleiros.
            </p>
          </div>

          <div className="flex items-center gap-5 border-l border-[#B99A62]/20 py-2 pl-6 md:mb-2">

            <span
              className="text-5xl text-[#B99A62]/70"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {String(categories.length).padStart(2, '0')}
            </span>

            <div>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8C8575]">
                Arquivo
              </span>

              <span className="mt-1 block text-xs tracking-wider text-[#C3AD88]">
                Classificações registradas
              </span>
            </div>
          </div>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-[#B99A62]/20" />
          <span className="h-2 w-2 rotate-45 border border-[#B99A62]/60" />
          <span className="h-px flex-1 bg-[#B99A62]/20" />
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A69A85]">
              Consultando os arquivos de Navarre...
            </p>
          </div>
        ) : error ? (
          <div className="border border-[#B99A62]/20 bg-[#0D0B08] px-6 py-16 text-center">
            <p className="text-sm text-[#A69A85]">
              Não foi possível acessar os registros no momento.
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="border border-[#B99A62]/20 bg-[#0D0B08] px-6 py-16 text-center">
            <p className="text-sm text-[#A69A85]">
              Nenhuma classificação foi registrada até o momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {categories.map((category, index) => (
              <article
                key={category.nome}
                className="group relative flex min-h-[410px] flex-col overflow-hidden border border-[#B99A62]/20 bg-[#080706] transition-all duration-500 hover:border-[#B99A62]/55"
              >

                <div className="pointer-events-none absolute inset-2 border border-[#B99A62]/10 transition-all duration-500 group-hover:inset-3 group-hover:border-[#B99A62]/25" />

                <div className="relative z-10 flex items-center justify-between px-8 pt-8">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#B99A62]/80">
                    Registro de Navarre
                  </span>

                  <span className="text-xs tracking-[0.2em] text-[#8C806B]">
                    Nº {String(index + 1).padStart(3, '0')}
                  </span>
                </div>

                <div className="relative mx-auto mt-6 flex h-[220px] w-full items-center justify-center">

                  <div className="absolute h-44 w-44 rounded-full bg-[#B99A62]/[0.05] blur-3xl transition-all duration-700 group-hover:bg-[#B99A62]/[0.12]" />

                  <div className="absolute h-44 w-44 rounded-full border border-[#B99A62]/15 transition-transform duration-700 group-hover:rotate-45" />

                  <div className="absolute h-36 w-36 rounded-full border border-dashed border-[#B99A62]/20 transition-transform duration-1000 group-hover:-rotate-45" />

                  <img
                    src={getCategoryImage(category.nome)}
                    alt={`Símbolo da categoria ${category.nome}`}
                    className="relative z-10 h-36 w-36 object-contain opacity-85 drop-shadow-[0_0_18px_rgba(185,154,98,0.12)] transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:drop-shadow-[0_0_25px_rgba(185,154,98,0.3)]"
                    draggable={false}
                  />
                </div>

                <div className="relative z-10 mx-8 mt-auto border-t border-[#B99A62]/20 pt-6">

                  <div className="flex items-end justify-between gap-4">

                    <div className="min-w-0">
                      <span className="mb-2 block text-[8px] uppercase tracking-[0.3em] text-[#8C8575]">
                        Classificação
                      </span>

                      <h3
                        className="break-words text-2xl tracking-wide text-[#E8D8B9]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {category.nome}
                      </h3>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="block text-[8px] uppercase tracking-[0.2em] text-[#8C8575]">
                        Registros
                      </span>

                      <span
                        className="mt-1 block text-2xl text-[#C3AD88]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {String(category.quantidade).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3 pb-8">
                    <span className="h-px w-6 bg-[#B99A62]/50" />

                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#8C8575]">
                      Arquivo de manifestações
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#D4B477]/80 transition-all duration-700 group-hover:w-full" />

              </article>
            ))}
          </div>
        )}

        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#B99A62]/20" />
          <span className="h-1.5 w-1.5 rotate-45 border border-[#B99A62]/50" />

          <span className="text-[8px] uppercase tracking-[0.35em] text-[#8C806B]">
            Registros preservados em Navarre
          </span>

          <span className="h-1.5 w-1.5 rotate-45 border border-[#B99A62]/50" />
          <span className="h-px w-12 bg-[#B99A62]/20" />
        </div>

      </div>
    </section>
  );
}

export default SigilCategories;
