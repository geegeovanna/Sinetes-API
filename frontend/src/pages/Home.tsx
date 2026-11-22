
import { useEffect, useState } from 'react';

import Hero from '@/components/Hero';
import RecordsIntroduction from '@/components/RecordsIntroduction';

import { sineteService } from '@/services/sineteService';
import type { Sinete } from '@/types/sinete';

import sigilImage from '@/assets/sigil-arcane.png';
import shadowsSigil from '@/assets/sigil-shadows.png';
import protectionSigil from '@/assets/sigil-protection.png';
import fireSigil from '@/assets/sigil-fogo.png';
import voeOuMorraImage from '@/assets/voe-ou-morra.jpeg';

function Home() {
  const [sinetes, setSinetes] = useState<Sinete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function carregarSinetes() {
      try {
        const dados = await sineteService.listar();
        setSinetes(dados);
      } catch (error) {
        console.error('Erro ao carregar registros em destaque:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    carregarSinetes();
  }, []);

  const destaques = [...sinetes]
    .sort((a, b) => {
      if (a.raro !== b.raro) {
        return Number(b.raro) - Number(a.raro);
      }

      return b.nivelPerigo - a.nivelPerigo;
    })
    .slice(0, 3);

  return (
    <>
      <Hero />

      <RecordsIntroduction />

      <section className="relative isolate overflow-hidden border-b border-[#B99A62]/15 bg-[#080706] px-6 py-24 md:px-12 md:py-32">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-9 bg-[#B99A62]/70" />

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#B99A62]">
                03 — O vínculo e os sinetes
              </span>
            </div>

            <h2
              className="text-3xl font-normal leading-[1.4] tracking-wide text-[#E8D8B9] md:text-5xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Um vínculo.
              <span className="mt-2 block text-[#B99A62]">
                Um poder único.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-8 text-[#A69A85]">
              Em Navarre, o vínculo entre dragão e cavaleiro representa o
              despertar de habilidades extraordinárias. A partir dessa conexão,
              surgem manifestações de poder que tornam cada cavaleiro único.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#A69A85]">
              Os sinetes são a expressão dessas habilidades. Cada manifestação
              possui características próprias, tornando seu registro e
              conhecimento parte essencial dos arquivos de DRACONIS.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-14 bg-[#B99A62]/50" />

              <span className="text-[8px] uppercase tracking-[0.3em] text-[#B99A62]/70">
                Registros de manifestações
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex h-[380px] w-full max-w-[460px] items-center justify-center md:h-[460px]">
            <div className="absolute h-64 w-64 rounded-full bg-[#B99A62]/[0.07] blur-[90px]" />

            <div className="absolute h-[300px] w-[300px] rotate-45 border border-[#B99A62]/15 md:h-[360px] md:w-[360px]" />

            <div className="absolute h-[270px] w-[270px] rounded-full border border-[#B99A62]/25 md:h-[320px] md:w-[320px]" />

            <div className="absolute h-[235px] w-[235px] rounded-full border border-dashed border-[#B99A62]/20 md:h-[285px] md:w-[285px]" />

            <img
              src={fireSigil}
              alt="Símbolo da manifestação de fogo"
              className="relative z-10 h-56 w-56 object-contain opacity-90 drop-shadow-[0_0_35px_rgba(185,154,98,0.25)] transition-transform duration-700 hover:scale-105 md:h-72 md:w-72"
              draggable={false}
            />

            <span className="absolute left-0 top-10 text-[8px] uppercase tracking-[0.3em] text-[#B99A62]/60">
              Manifestação
            </span>

            <span className="absolute bottom-8 right-0 text-[8px] uppercase tracking-[0.3em] text-[#B99A62]/60">
              Elemental — Fogo
            </span>
          </div>
        </div>
      </section>

      
      <section className="relative overflow-hidden border-b border-[#B99A62]/15 bg-[#0D0B08] px-6 py-20 md:px-12 md:py-24">
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#B99A62]/[0.04] blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-9 bg-[#B99A62]/70" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#B99A62]">
                04 — Os poderes
              </span>
            </div>

            <h2
              className="text-3xl font-normal leading-[1.4] tracking-wide text-[#E8D8B9] md:text-5xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Manifestações de
              <span className="text-[#B99A62]"> poder.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-[#A69A85]">
              Cada cavaleiro manifesta uma habilidade singular. Conheça alguns
              dos poderes registrados nos arquivos de Navarre.
            </p>
          </div>

          {loading ? (
            <div className="border border-[#B99A62]/15 px-6 py-16 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-[#A69A85]">
                Consultando registros...
              </p>
            </div>
          ) : error ? (
            <div className="border border-[#B99A62]/15 px-6 py-16 text-center">
              <p className="text-sm text-[#A69A85]">
                Não foi possível carregar os registros.
              </p>
            </div>
          ) : destaques.length === 0 ? (
            <div className="border border-[#B99A62]/15 px-6 py-16 text-center">
              <p className="text-sm text-[#A69A85]">
                Ainda não existem poderes registrados nos arquivos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {destaques.map((sinete, index) => {
                const simbolos = [
                  shadowsSigil,
                  fireSigil,
                  protectionSigil,
                  sigilImage,
                ];

                return (
                  <article
                    key={sinete.id}
                    className="group relative flex min-h-[430px] flex-col overflow-hidden border border-[#B99A62]/20 bg-[#080706] p-3 transition-all duration-500 hover:border-[#B99A62]/50"
                  >
                    <div className="pointer-events-none absolute inset-3 border border-[#B99A62]/10" />

                    <div className="relative flex flex-1 flex-col px-5 pb-6 pt-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#B99A62]/80">
                          Registro {String(sinete.id).padStart(3, '0')}
                        </span>

                        {sinete.raro && (
                          <span className="border border-[#B99A62]/30 px-3 py-1 text-[8px] uppercase tracking-[0.2em] text-[#D4B477]">
                            Raro
                          </span>
                        )}
                      </div>

                      <div className="relative mx-auto my-8 flex h-52 w-full max-w-[230px] items-center justify-center">
                        <div className="absolute h-44 w-44 rounded-full border border-[#B99A62]/20 transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute h-36 w-36 rounded-full border border-dashed border-[#B99A62]/20" />

                        <div className="absolute h-28 w-28 rotate-45 border border-[#B99A62]/10" />

                        <img
                          src={simbolos[index % simbolos.length]}
                          alt=""
                          className="relative z-10 h-32 w-32 object-contain opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                          draggable={false}
                        />
                      </div>

                      <div className="mt-auto border-t border-[#B99A62]/15 pt-5">
                        <span className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-[#B99A62]/70">
                          {sinete.categoria}
                        </span>

                        <h3
                          className="line-clamp-2 min-h-[3.5rem] text-xl leading-snug tracking-wide text-[#E8D8B9]"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {sinete.nome}
                        </h3>

                        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-[#A69A85]">
                          {sinete.descricao}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-[#B99A62]/10 pt-4">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-[#8C8575]">
                            Nível de perigo
                          </span>

                          <span className="text-xs tracking-widest text-[#C3AD88]">
                            {sinete.nivelPerigo} / 5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-0 bg-[#D4B477]/80 transition-all duration-700 group-hover:w-full" />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden bg-[#080706] px-6 py-28 md:min-h-[620px] md:py-36">

        <img
          src={voeOuMorraImage}
          alt="Dragão voando sobre as montanhas de Navarre"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          draggable={false}
        />

        <div className="absolute inset-0 -z-10 bg-black/40" />

        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-[#080706] via-[#080706]/70 to-transparent md:h-64" />

        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#080706] via-[#080706]/60 to-transparent md:h-64" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2
            className="text-5xl font-normal uppercase leading-tight tracking-[0.08em] text-[#E8D8B9] sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Voe ...
            <span className="mt-3 block text-[#B99A62]">
            ou morra.
            </span>
          </h2>
        </div>

      </section>
    </>
  );
}

export default Home;
