
import { Link } from 'react-router-dom';
import dragonImage from '@/assets/dragao.png';

function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute h-24 w-24 text-[#B99A62] md:h-32 md:w-32 ${className}`}
    >
      <path
        d="M4 75V12Q4 4 12 4H75"
        stroke="currentColor"
        strokeWidth=".8"
      />
      <path
        d="M4 43C20 43 23 20 43 20C43 10 53 4 68 4"
        stroke="currentColor"
        strokeWidth=".7"
      />
      <path
        d="M12 4C12 19 20 26 31 26C31 39 40 43 49 43"
        stroke="currentColor"
        strokeWidth=".6"
      />
      <path
        d="M4 59C19 58 24 49 27 38C37 37 42 30 44 20"
        stroke="currentColor"
        strokeWidth=".6"
      />
      <circle cx="43" cy="20" r="2" fill="currentColor" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <path
        d="M17 17L20 23L26 26L20 29L17 35L14 29L8 26L14 23L17 17Z"
        fill="currentColor"
        fillOpacity=".65"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080706] text-[#E9DFCC]">

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_48%,rgba(153,111,51,0.10),transparent_48%)]" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 12% 18%, #D6B77C, transparent),
              radial-gradient(1px 1px at 27% 72%, #D6B77C, transparent),
              radial-gradient(1px 1px at 83% 17%, #D6B77C, transparent),
              radial-gradient(1px 1px at 92% 76%, #D6B77C, transparent),
              radial-gradient(1px 1px at 58% 88%, #D6B77C, transparent)
            `,
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-3 border border-[#B99A62]/30 md:inset-5">
        <div className="absolute inset-[5px] border border-[#B99A62]/10" />

        <CornerOrnament className="left-0 top-0" />
        <CornerOrnament className="right-0 top-0 -scale-x-100" />
        <CornerOrnament className="bottom-0 left-0 -scale-y-100" />
        <CornerOrnament className="bottom-0 right-0 -scale-x-100 -scale-y-100" />
      </div>

      <div className="relative mx-auto grid min-h-[580px] max-w-[1500px] items-center gap-4 px-8 py-14 md:min-h-[620px] md:grid-cols-[0.85fr_1.15fr] md:px-16 md:py-12 lg:px-24">

        <div className="relative z-20 mx-auto w-full max-w-xl md:mx-0">

          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-[#B99A62]/70" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#B99A62]">
              Arquivos de Navarre
            </span>
          </div>

          <h1
            className="text-4xl font-normal leading-tight tracking-[0.12em] text-[#E8D8B9] md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            DRACONIS
          </h1>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px w-14 bg-[#B99A62]/60" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#B99A62]" />
            <span className="h-px w-14 bg-[#B99A62]/60" />
          </div>

          <h2
            className="max-w-md text-xl font-normal leading-relaxed text-[#D8C8A9] md:text-2xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Toda força deixa uma marca.
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-[#A69A85]">
            Um registro dos sinetes, das habilidades e dos poderes
            manifestados pelos cavaleiros ligados aos dragões.
          </p>

          <div className="mt-10">
            <Link
              to="/gerenciar"
              className="group inline-flex items-center gap-5 border border-[#B99A62]/60 bg-[#0D0B08]/70 px-7 py-4 text-[10px] uppercase tracking-[0.25em] text-[#D8C49D] transition-all duration-300 hover:border-[#D4B477] hover:bg-[#B99A62]/10"
            >
              <span className="text-[#B99A62]">✧</span>

              <span>Consultar o arquivo</span>

              <span className="text-[#B99A62] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center">

          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="96"
              stroke="#B99A62"
              strokeOpacity=".45"
              strokeWidth=".45"
              strokeDasharray="1.5 3"
            />

            <circle cx="100" cy="4" r="1.5" fill="#D4B477" />
            <circle cx="196" cy="100" r="1.5" fill="#D4B477" />
            <circle cx="100" cy="196" r="1.5" fill="#D4B477" />
            <circle cx="4" cy="100" r="1.5" fill="#D4B477" />
          </svg>

          <svg
            viewBox="0 0 200 200"
            className="absolute inset-[8%] h-[84%] w-[84%]"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="96"
              stroke="#B99A62"
              strokeOpacity=".3"
              strokeWidth=".55"
            />

            <circle cx="100" cy="4" r="1" fill="#B99A62" />
            <circle cx="196" cy="100" r="1" fill="#B99A62" />
            <circle cx="100" cy="196" r="1" fill="#B99A62" />
            <circle cx="4" cy="100" r="1" fill="#B99A62" />
          </svg>

          <div className="absolute h-[65%] w-[65%] rounded-full bg-[#B58A48]/10 blur-[75px]" />

          <img
            src={dragonImage}
            alt="Ilustração dourada de um dragão com as asas abertas"
            className="relative z-10 w-[94%] select-none object-contain drop-shadow-[0_0_22px_rgba(185,154,98,0.16)]"
            draggable={false}
          />

        </div>
      </div>


    </section>
  );
}

export default Hero;
