import { useEffect, useMemo, useState } from 'react';

import {
  Shield,
  Gem,
  Layers3,
  Search,
  RefreshCw,
  Flame,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';

import { toast } from 'sonner';

import { sineteService } from '@/services/sineteService';
import type { Sinete, SineteInput } from '@/types/sinete';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import fogo from '@/assets/sigil-fogo.png';

const formularioInicial: SineteInput = {
  nome: '',
  descricao: '',
  categoria: '',
  nivelPerigo: 1,
  raro: false,
};

const niveisPerigo = [
  'Contido',
  'Moderado',
  'Perigoso',
  'Severo',
  'Catastrófico',
];

function CornerOrnament({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute h-20 w-20 text-[#B99A62] md:h-28 md:w-28 ${className}`}
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

function SigilSeal({ className = 'h-14 w-14' }: { className?: string }) {
  return (
    <img
      src={fogo}
      alt=""
      aria-hidden="true"
      className={`shrink-0 object-contain ${className}`}
    />
  );
}

function Gerenciar() {
  const [sinetes, setSinetes] = useState<Sinete[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState('');

  const [dialogAberto, setDialogAberto] = useState(false);
  const [sineteEditando, setSineteEditando] = useState<Sinete | null>(null);
  const [formulario, setFormulario] = useState<SineteInput>(formularioInicial);
  const [salvando, setSalvando] = useState(false);
  const [sineteExcluindo, setSineteExcluindo] = useState<Sinete | null>(null);

  async function carregarSinetes() {
    try {
      setLoading(true);
      setErro(null);

      const dados = await sineteService.listar();
      setSinetes(dados);
    } catch (error) {
      const mensagem =
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar os sinetes.';

      setErro(mensagem);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void carregarSinetes();
  }, []);

  const sinetesFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();

    return sinetes.filter(
      (sinete) =>
        sinete.nome.toLowerCase().includes(termo) ||
        sinete.categoria.toLowerCase().includes(termo),
    );
  }, [sinetes, busca]);

  const totalSinetes = sinetes.length;
  const totalRaros = sinetes.filter((sinete) => sinete.raro).length;
  const totalCategorias = new Set(
    sinetes.map((sinete) => sinete.categoria),
  ).size;

  function abrirCadastro() {
    setSineteEditando(null);
    setFormulario({ ...formularioInicial });
    setDialogAberto(true);
  }

  function abrirEdicao(sinete: Sinete) {
    setSineteEditando(sinete);

    setFormulario({
      nome: sinete.nome,
      descricao: sinete.descricao,
      categoria: sinete.categoria,
      nivelPerigo: sinete.nivelPerigo,
      raro: sinete.raro,
    });

    setDialogAberto(true);
  }

  function atualizarCampo<K extends keyof SineteInput>(
    campo: K,
    valor: SineteInput[K],
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  async function salvarSinete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !formulario.nome.trim() ||
      !formulario.descricao.trim() ||
      !formulario.categoria.trim()
    ) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    if (
      !Number.isInteger(formulario.nivelPerigo) ||
      formulario.nivelPerigo < 1 ||
      formulario.nivelPerigo > 5
    ) {
      toast.error('O nível de perigo deve estar entre 1 e 5.');
      return;
    }

    try {
      setSalvando(true);

      const dados: SineteInput = {
        ...formulario,
        nome: formulario.nome.trim(),
        descricao: formulario.descricao.trim(),
        categoria: formulario.categoria.trim(),
      };

      if (sineteEditando) {
        await sineteService.atualizar(sineteEditando.id, dados);
        toast.success('Sinete atualizado com sucesso!');
      } else {
        await sineteService.cadastrar(dados);
        toast.success('Sinete cadastrado com sucesso!');
      }

      setDialogAberto(false);
      setFormulario({ ...formularioInicial });
      setSineteEditando(null);

      await carregarSinetes();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar o sinete.',
      );
    } finally {
      setSalvando(false);
    }
  }

  function confirmarExclusao(sinete: Sinete) {
    setSineteExcluindo(sinete);
  }

  async function excluirSinete() {
    if (!sineteExcluindo) return;

    try {
      await sineteService.excluir(sineteExcluindo.id);

      toast.success('Sinete excluído com sucesso!');
      setSineteExcluindo(null);

      await carregarSinetes();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Não foi possível excluir o sinete.',
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#080706] px-4 py-10 text-[#E9DFCC] sm:px-6 md:px-10 md:py-14">
      <section className="relative mx-auto max-w-[1450px] overflow-hidden border border-[#B99A62]/25 px-5 py-12 sm:px-8 md:px-12 md:py-16">

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(153,111,51,0.09),transparent_45%)]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 12% 18%, #D6B77C, transparent),
                radial-gradient(1px 1px at 83% 17%, #D6B77C, transparent),
                radial-gradient(1px 1px at 92% 76%, #D6B77C, transparent),
                radial-gradient(1px 1px at 58% 88%, #D6B77C, transparent)
              `,
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-2 border border-[#B99A62]/10 md:inset-3">
          <CornerOrnament className="left-0 top-0" />
          <CornerOrnament className="right-0 top-0 -scale-x-100" />
          <CornerOrnament className="bottom-0 left-0 -scale-y-100" />
          <CornerOrnament className="bottom-0 right-0 -scale-x-100 -scale-y-100" />
        </div>

        <div className="relative z-10">

          <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-9 bg-[#B99A62]/70" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#B99A62]">
                  Arquivos de Navarre · Administração
                </span>
              </div>

              <h1
                className="text-3xl font-normal leading-tight tracking-[0.08em] text-[#E8D8B9] sm:text-4xl md:text-5xl"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Registro de Sinetes
              </h1>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px w-12 bg-[#B99A62]/50" />
                <span className="h-1.5 w-1.5 rotate-45 border border-[#B99A62]" />
                <span className="h-px w-12 bg-[#B99A62]/50" />
              </div>

              <p className="max-w-xl text-sm leading-7 text-[#A69A85]">
                Consulte, registre e organize os poderes manifestados pelos
                cavaleiros ligados aos dragões. Cada habilidade possui seu
                próprio registro nos arquivos de Navarre.
              </p>
            </div>

            <Button
              onClick={abrirCadastro}
              className="h-12 w-full rounded-none border border-[#B99A62]/70 bg-[#B99A62] px-6 text-[10px] uppercase tracking-[0.2em] text-[#100D08] transition-all hover:border-[#D4B477] hover:bg-[#D4B477] sm:w-fit"
            >
              <Plus size={16} />
              Registrar sinete
            </Button>
          </div>

          <div className="mb-14 grid grid-cols-1 border-y border-[#B99A62]/25 sm:grid-cols-3">
            <div className="flex items-center justify-between gap-4 border-b border-[#B99A62]/20 px-5 py-5 sm:border-b-0 sm:border-r sm:px-7">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#8C8575]">
                  Total de registros
                </p>
                <p className="mt-2 text-3xl font-light text-[#E8D8B9]">
                  {String(totalSinetes).padStart(2, '0')}
                </p>
              </div>
              <Shield className="h-6 w-6 text-[#B99A62]/80" />
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-[#B99A62]/20 px-5 py-5 sm:border-b-0 sm:border-r sm:px-7">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#8C8575]">
                  Sinetes raros
                </p>
                <p className="mt-2 text-3xl font-light text-[#E8D8B9]">
                  {String(totalRaros).padStart(2, '0')}
                </p>
              </div>
              <Gem className="h-6 w-6 text-[#B99A62]/80" />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#8C8575]">
                  Categorias catalogadas
                </p>
                <p className="mt-2 text-3xl font-light text-[#E8D8B9]">
                  {String(totalCategorias).padStart(2, '0')}
                </p>
              </div>
              <Layers3 className="h-6 w-6 text-[#B99A62]/80" />
            </div>
          </div>

          <section>
            <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-6 bg-[#B99A62]/60" />
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B99A62]">
                    Acervo de habilidades
                  </span>
                </div>

                <h2
                  className="text-2xl font-normal tracking-wide text-[#E8D8B9]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Catálogo de Sinetes
                </h2>

                <p className="mt-2 text-xs text-[#8C8575]">
                  Registros oficiais das manifestações mágicas.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B99A62]/70" />
                  <Input
                    placeholder="Buscar por nome ou categoria..."
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                    className="h-11 rounded-none border-[#59452A]/70 bg-[#0D0B09]/80 pl-10 text-sm text-[#E8DFC8] placeholder:text-[#70695D] focus-visible:border-[#B99A62] focus-visible:ring-1 focus-visible:ring-[#B99A62]/40"
                  />
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={carregarSinetes}
                  disabled={loading}
                  aria-label="Atualizar listagem"
                  className="h-11 w-11 rounded-none border-[#59452A]/70 bg-[#0D0B09]/80 text-[#B99A62] hover:border-[#B99A62] hover:bg-[#292216] hover:text-[#E3C48F]"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? 'animate-spin' : ''}
                  />
                </Button>
              </div>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center gap-4 border border-[#59452A]/50 bg-[#100E0B]/80 py-20">
                <RefreshCw className="h-7 w-7 animate-spin text-[#B99A62]" />
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C8575]">
                  Consultando os arquivos de Navarre...
                </p>
              </div>
            )}

            {!loading && erro && (
              <div className="border border-red-900/50 bg-red-950/20 p-8 text-center">
                <p className="text-[#E8D8B9]">
                  Não foi possível carregar os sinetes.
                </p>
                <p className="mt-2 text-sm text-red-400">{erro}</p>
                <Button
                  onClick={carregarSinetes}
                  variant="outline"
                  className="mt-5 rounded-none border-[#B99A62] text-[#B99A62] hover:bg-[#292216]"
                >
                  Tentar novamente
                </Button>
              </div>
            )}

            {!loading && !erro && sinetes.length === 0 && (
              <div className="border border-dashed border-[#59452A] bg-[#100E0B]/80 px-6 py-20 text-center">
                <Flame className="mx-auto mb-4 h-9 w-9 text-[#B99A62]" />
                <h3
                  className="text-lg text-[#E8D8B9]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Nenhum sinete registrado
                </h3>
                <p className="mt-2 text-sm text-[#8C8575]">
                  Os arquivos ainda não possuem registros.
                </p>
                <Button
                  onClick={abrirCadastro}
                  className="mt-6 rounded-none bg-[#B99A62] text-[10px] uppercase tracking-widest text-[#100D08] hover:bg-[#D4B477]"
                >
                  <Plus size={15} />
                  Registrar primeiro sinete
                </Button>
              </div>
            )}

            {!loading &&
              !erro &&
              sinetes.length > 0 &&
              sinetesFiltrados.length === 0 && (
                <div className="border border-[#59452A]/50 bg-[#100E0B]/80 py-16 text-center">
                  <Search className="mx-auto mb-3 h-8 w-8 text-[#8C8575]" />
                  <p className="text-[#E8D8B9]">
                    Nenhum sinete encontrado.
                  </p>
                  <p className="mt-2 text-sm text-[#8C8575]">
                    Experimente pesquisar por outro nome ou categoria.
                  </p>
                </div>
              )}

            {!loading && !erro && sinetesFiltrados.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {sinetesFiltrados.map((sinete) => (
                  <Card
                    key={sinete.id}
                    className="group relative overflow-hidden rounded-none border-[#59452A]/60 bg-[#100E0B]/90 text-[#E8DFC8] transition-all duration-300 hover:border-[#B99A62]/80 hover:bg-[#15120D]"
                  >
                    <div className="pointer-events-none absolute inset-2 border border-[#B99A62]/10 transition-colors group-hover:border-[#B99A62]/25" />

                    <CardContent className="relative z-10 flex h-full flex-col p-6">
                      <div className="mb-6 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.22em] text-[#8C8575]">
                            Registro de Navarre
                          </p>
                          <p className="mt-1 font-mono text-xs tracking-widest text-[#B99A62]">
                            Nº {String(sinete.id).padStart(4, '0')}
                          </p>
                        </div>

                        <SigilSeal className="h-14 w-14" />
                      </div>

                      <div className="mb-4">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="rounded-none border-[#59452A] bg-transparent px-2 py-1 text-[9px] font-normal uppercase tracking-[0.15em] text-[#B99A62]"
                          >
                            {sinete.categoria}
                          </Badge>

                          {sinete.raro && (
                            <Badge
                              variant="outline"
                              className="rounded-none border-[#B99A62]/70 bg-[#B99A62]/10 px-2 py-1 text-[9px] font-normal uppercase tracking-[0.15em] text-[#E3C48F]"
                            >
                              <Gem size={10} className="mr-1" />
                              Raro
                            </Badge>
                          )}
                        </div>

                        <h3
                          className="text-lg leading-snug tracking-wide text-[#E8D8B9] transition-colors group-hover:text-[#F0DFBD]"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {sinete.nome}
                        </h3>
                      </div>

                      <p className="mb-7 min-h-[76px] flex-1 text-[13px] leading-6 text-[#A69A85]">
                        {sinete.descricao}
                      </p>

                      <div className="border-t border-[#59452A]/50 pt-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-[0.18em] text-[#8C8575]">
                            Nível de perigo
                          </span>
                          <span className="font-mono text-xs text-[#D4B477]">
                            {sinete.nivelPerigo}/5
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: 5 }, (_, index) => (
                            <span
                              key={index}
                              className={`h-[3px] flex-1 ${
                                index < sinete.nivelPerigo
                                  ? 'bg-[#B99A62]'
                                  : 'bg-[#443C30]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[#59452A]/50 pt-4">
                        <span className="text-[9px] uppercase tracking-[0.15em] text-[#70695D]">
                          Ações do registro
                        </span>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => abrirEdicao(sinete)}
                            aria-label={`Editar ${sinete.nome}`}
                            className="h-8 w-8 rounded-none text-[#B99A62] hover:bg-[#B99A62]/10 hover:text-[#E8D8B9]"
                          >
                            <Pencil size={15} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmarExclusao(sinete)}
                            aria-label={`Excluir ${sinete.nome}`}
                            className="h-8 w-8 rounded-none text-[#9C6256] hover:bg-red-950/30 hover:text-red-300"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {!loading && !erro && sinetes.length > 0 && (
            <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#B99A62]/20 pt-5 text-[9px] uppercase tracking-[0.2em] text-[#70695D] sm:flex-row">
              <span>Arquivos de Navarre · Draconis</span>
              <span>
                Exibindo {sinetesFiltrados.length} de {totalSinetes} registros
              </span>
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={dialogAberto}
        onOpenChange={(aberto) => {
          if (!salvando) setDialogAberto(aberto);
        }}
      >
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-none border border-[#B99A62]/50 bg-[#100E0B] p-0 text-[#E8DFC8] shadow-[0_0_60px_rgba(0,0,0,0.7)] sm:max-w-3xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-2 border border-[#B99A62]/10" />
            <div className="pointer-events-none absolute left-0 top-0 origin-top-left scale-[0.6] opacity-70">
              <CornerOrnament className="left-0 top-0" />
            </div>
            <div className="pointer-events-none absolute right-0 top-0 origin-top-right scale-[0.6] opacity-70">
              <CornerOrnament className="right-0 top-0 -scale-x-100" />
            </div>

            <div className="relative z-10 px-6 py-9 sm:px-12 sm:py-12">
              <DialogHeader className="border-b border-[#59452A]/60 pb-7">
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#B99A62]/70" />
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#B99A62]">
                        Arquivos de Navarre · Registro oficial
                      </span>
                    </div>

                    <DialogTitle
                      className="text-2xl font-normal tracking-[0.08em] text-[#E8D8B9] sm:text-3xl"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {sineteEditando ? 'Editar sinete' : 'Novo registro'}
                    </DialogTitle>

                    <div className="my-4 flex items-center gap-3">
                      <span className="h-px w-10 bg-[#B99A62]/50" />
                      <span className="h-1.5 w-1.5 rotate-45 border border-[#B99A62]" />
                      <span className="h-px w-10 bg-[#B99A62]/50" />
                    </div>

                    <DialogDescription className="max-w-lg text-sm leading-6 text-[#8C8575]">
                      {sineteEditando
                        ? 'Atualize as informações deste registro nos arquivos de Navarre.'
                        : 'Registre as características e propriedades de um novo sinete no catálogo.'}
                    </DialogDescription>
                  </div>

                  <div className="hidden shrink-0 flex-col items-center gap-2 sm:flex">
                    <SigilSeal className="h-16 w-16" />
                    <span className="font-mono text-[10px] tracking-widest text-[#B99A62]">
                      {sineteEditando
                        ? `Nº ${String(sineteEditando.id).padStart(4, '0')}`
                        : 'Nº ----'}
                    </span>
                  </div>
                </div>
              </DialogHeader>

              <form onSubmit={salvarSinete} className="pt-8">
                <div className="space-y-9">
                  <section className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm text-[#B99A62]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        I
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D8B9]">
                        Identificação
                      </span>
                      <span className="h-px flex-1 bg-[#59452A]/50" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="nome"
                          className="text-[10px] uppercase tracking-[0.18em] text-[#B99A62]"
                        >
                          Nome do sinete <span className="text-[#D4B477]">*</span>
                        </Label>
                        <Input
                          id="nome"
                          value={formulario.nome}
                          onChange={(event) =>
                            atualizarCampo('nome', event.target.value)
                          }
                          placeholder="Ex.: Manipulação de sombras"
                          required
                          className="h-12 rounded-none border-0 border-b border-[#59452A]/80 bg-[#080706]/70 px-3 text-[#E8DFC8] placeholder:text-[#70695D] transition-colors hover:border-[#B99A62]/60 focus-visible:border-[#B99A62] focus-visible:ring-1 focus-visible:ring-[#B99A62]/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="categoria"
                          className="text-[10px] uppercase tracking-[0.18em] text-[#B99A62]"
                        >
                          Categoria <span className="text-[#D4B477]">*</span>
                        </Label>
                        <Input
                          id="categoria"
                          value={formulario.categoria}
                          onChange={(event) =>
                            atualizarCampo('categoria', event.target.value)
                          }
                          placeholder="Ex.: Elemental"
                          required
                          className="h-12 rounded-none border-0 border-b border-[#59452A]/80 bg-[#080706]/70 px-3 text-[#E8DFC8] placeholder:text-[#70695D] transition-colors hover:border-[#B99A62]/60 focus-visible:border-[#B99A62] focus-visible:ring-1 focus-visible:ring-[#B99A62]/30"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm text-[#B99A62]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        II
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D8B9]">
                        Características
                      </span>
                      <span className="h-px flex-1 bg-[#59452A]/50" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-end justify-between">
                        <Label
                          htmlFor="descricao"
                          className="text-[10px] uppercase tracking-[0.18em] text-[#B99A62]"
                        >
                          Descrição <span className="text-[#D4B477]">*</span>
                        </Label>
                        <span className="font-mono text-[10px] text-[#70695D]">
                          {formulario.descricao.length} caracteres
                        </span>
                      </div>
                      <Textarea
                        id="descricao"
                        value={formulario.descricao}
                        onChange={(event) =>
                          atualizarCampo('descricao', event.target.value)
                        }
                        placeholder="Descreva as características e capacidades deste sinete..."
                        required
                        className="min-h-32 resize-y rounded-none border-[#59452A]/70 bg-[#080706]/70 p-3 text-sm leading-6 text-[#E8DFC8] placeholder:text-[#70695D] transition-colors hover:border-[#B99A62]/60 focus-visible:border-[#B99A62] focus-visible:ring-1 focus-visible:ring-[#B99A62]/30"
                      />
                    </div>
                  </section>

                  <section className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm text-[#B99A62]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        III
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D8B9]">
                        Classificação
                      </span>
                      <span className="h-px flex-1 bg-[#59452A]/50" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
                      <div className="space-y-3">
                        <div className="flex items-end justify-between">
                          <Label
                            id="nivelPerigo-label"
                            className="text-[10px] uppercase tracking-[0.18em] text-[#B99A62]"
                          >
                            Nível de perigo <span className="text-[#D4B477]">*</span>
                          </Label>
                          <span className="font-mono text-xs text-[#D4B477]">
                            {formulario.nivelPerigo}/5
                          </span>
                        </div>

                        <div
                          role="group"
                          aria-labelledby="nivelPerigo-label"
                          className="grid grid-cols-5 gap-2"
                        >
                          {niveisPerigo.map((rotulo, index) => {
                            const nivel = index + 1;
                            const ativo = formulario.nivelPerigo === nivel;
                            const preenchido = nivel <= formulario.nivelPerigo;

                            return (
                              <button
                                key={nivel}
                                type="button"
                                aria-pressed={ativo}
                                aria-label={`Nível ${nivel}: ${rotulo}`}
                                onClick={() => atualizarCampo('nivelPerigo', nivel)}
                                className={`flex h-16 flex-col items-center justify-center gap-2 border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B99A62]/60 ${
                                  ativo
                                    ? 'border-[#B99A62] bg-[#B99A62]/10 text-[#E8D8B9]'
                                    : 'border-[#59452A]/70 bg-[#080706]/70 text-[#8C8575] hover:border-[#B99A62]/60 hover:text-[#E8D8B9]'
                                }`}
                              >
                                <span
                                  className="text-base"
                                  style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                  {nivel}
                                </span>
                                <span
                                  className={`h-[3px] w-6 ${
                                    preenchido ? 'bg-[#B99A62]' : 'bg-[#443C30]'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>

                        <p className="text-[11px] italic text-[#8C8575]">
                          {niveisPerigo[formulario.nivelPerigo - 1] ??
                            'Selecione um nível de 1 a 5.'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-[#B99A62]">
                          Raridade
                        </span>

                        <label
                          className={`relative flex min-h-16 cursor-pointer items-center gap-4 border px-4 py-3 transition-all has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-[#B99A62]/60 ${
                            formulario.raro
                              ? 'border-[#B99A62] bg-[#B99A62]/10'
                              : 'border-[#59452A]/70 bg-[#080706]/70 hover:border-[#B99A62]/60'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formulario.raro}
                            onChange={(event) =>
                              atualizarCampo('raro', event.target.checked)
                            }
                            className="sr-only"
                          />

                          <span
                            className={`flex h-9 w-9 shrink-0 rotate-45 items-center justify-center border transition-colors ${
                              formulario.raro
                                ? 'border-[#D4B477] bg-[#B99A62]/20 text-[#E3C48F]'
                                : 'border-[#59452A] text-[#70695D]'
                            }`}
                          >
                            <Gem size={14} className="-rotate-45" />
                          </span>

                          <span className="flex flex-col">
                            <span
                              className={`text-xs uppercase tracking-[0.15em] ${
                                formulario.raro ? 'text-[#E8D8B9]' : 'text-[#D8C8A9]'
                              }`}
                            >
                              Sinete raro
                            </span>
                            <span className="text-[10px] text-[#8C8575]">
                              {formulario.raro
                                ? 'Marcado como raro nos arquivos'
                                : 'Toque para classificar como raro'}
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </section>
                </div>
                
                <DialogFooter className="mx-0 mb-0 mt-10 flex-col-reverse items-stretch gap-4 rounded-none border-t border-[#59452A]/60 bg-transparent p-0 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <span className="hidden text-[9px] uppercase tracking-[0.2em] text-[#70695D] sm:block">
                    <span className="text-[#D4B477]">*</span> Campos obrigatórios
                  </span>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={salvando}
                      onClick={() => setDialogAberto(false)}
                      className="h-11 rounded-none border-[#59452A] bg-transparent px-6 text-[10px] uppercase tracking-[0.18em] text-[#B99A62] hover:border-[#B99A62] hover:bg-[#292216] hover:text-[#E8D8B9]"
                    >
                      Cancelar
                    </Button>

                    <Button
                      type="submit"
                      disabled={salvando}
                      className="h-11 rounded-none border border-[#B99A62]/70 bg-[#B99A62] px-7 text-[10px] uppercase tracking-[0.18em] text-[#100D08] transition-all hover:border-[#D4B477] hover:bg-[#D4B477] disabled:opacity-60"
                    >
                      {salvando
                        ? 'Salvando...'
                        : sineteEditando
                          ? 'Salvar alterações'
                          : 'Registrar sinete'}
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={sineteExcluindo !== null}
        onOpenChange={(aberto) => {
          if (!aberto) setSineteExcluindo(null);
        }}
      >
        <AlertDialogContent className="gap-0 overflow-hidden rounded-none border border-[#B99A62]/50 bg-[#100E0B] p-0 text-[#E8DFC8] shadow-[0_0_60px_rgba(0,0,0,0.7)] sm:max-w-md">
          <div className="relative">
            <div className="pointer-events-none absolute inset-2 border border-[#B99A62]/10" />

            <div className="relative z-10 px-7 py-8 sm:px-9 sm:py-9">
              <AlertDialogHeader className="items-start gap-0 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#B99A62]/70" />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#B99A62]">
                    Arquivos de Navarre · Remoção
                  </span>
                </div>

                <AlertDialogTitle
                  className="text-xl font-normal tracking-[0.08em] text-[#E8D8B9] sm:text-2xl"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Confirmar exclusão
                </AlertDialogTitle>

                <div className="my-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#B99A62]/50" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-[#B99A62]" />
                  <span className="h-px w-10 bg-[#B99A62]/50" />
                </div>

                <AlertDialogDescription className="text-sm leading-6 text-[#A69A85]">
                  Você está prestes a riscar dos arquivos o registro abaixo.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="mt-5 border border-[#59452A]/70 bg-[#080706]/70 px-4 py-3">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#8C8575]">
                  Registro
                </p>
                <p
                  className="mt-1 text-base tracking-wide text-[#D4B477]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {sineteExcluindo?.nome}
                </p>
              </div>

              <p className="mt-4 text-[11px] italic text-[#9C6256]">
                Essa ação não poderá ser desfeita.
              </p>

              <AlertDialogFooter className="mx-0 mb-0 mt-7 flex-col-reverse gap-3 rounded-none border-t border-[#59452A]/60 bg-transparent p-0 pt-6 sm:flex-row sm:justify-end">
                <AlertDialogCancel className="h-11 rounded-none border border-[#59452A] bg-transparent px-6 text-[10px] uppercase tracking-[0.18em] text-[#B99A62] hover:border-[#B99A62] hover:bg-[#292216] hover:text-[#E8D8B9]">
                  Cancelar
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={excluirSinete}
                  className="h-11 rounded-none border border-red-900/70 bg-red-950/60 px-6 text-[10px] uppercase tracking-[0.18em] text-[#E8C4B8] transition-colors hover:border-red-700 hover:bg-red-900/60 hover:text-[#F3D6CC]"
                >
                  Excluir registro
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

export default Gerenciar;
