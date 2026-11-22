
import academiaBasgiath from '@/assets/academia-basgiath.jpeg';

function RecordsIntroduction() {
  return (
    <section className="relative isolate flex min-h-[600px] items-center overflow-hidden border-b border-[#B99A62]/20 bg-[#080706] md:min-h-[680px]">

      <img
        src={academiaBasgiath}
        alt="Dragões sobrevoando a Academia de Basgiath entre as montanhas"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        draggable={false}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080706] via-[#080706]/85 to-[#080706]/20" />

      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-[#080706] via-[#080706]/80 via-50% to-transparent" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#080706]/90 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-2xl">

          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-9 bg-[#B99A62]/80" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4B477]">
              02 — O universo
            </span>
          </div>

          <h2
            className="text-4xl font-normal leading-[1.3] tracking-wide text-[#E8D8B9] md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Onde dragões e cavaleiros
            <span className="mt-2 block text-[#C3A675]">
              se encontram.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-8 text-[#C2B7A4] md:text-base md:leading-9">
            Em Navarre, o poder não é conquistado sem sacrifício. Na Academia
            de Guerra de Basgiath, jovens aspirantes enfrentam desafios para
            conquistar seu lugar entre os cavaleiros de dragão. É nesse
            universo de vínculos, coragem e manifestações extraordinárias
            que nasce a inspiração para os arquivos DRACONIS.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <span className="h-px w-16 bg-[#B99A62]/50" />

            <span className="text-[8px] uppercase tracking-[0.3em] text-[#B99A62]/70">
              Arquivos de Navarre
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default RecordsIntroduction;
