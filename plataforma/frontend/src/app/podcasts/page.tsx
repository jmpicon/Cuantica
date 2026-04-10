"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { podcastsApi, docsApi } from "@/lib/api";

const USER_ID = 1;

type Podcast = {
  id: number;
  titulo: string;
  estilo: string;
  guion: string;
  estado: string;
  fecha: string;
};

type Doc = {
  id: number;
  nombre: string;
  estado: string;
};

const ESTILOS = [
  { id: "conversacional", label: "Conversacional", desc: "Tono accesible con analogías" },
  { id: "academico", label: "Académico", desc: "Rigor técnico y terminología precisa" },
  { id: "debate", label: "Debate", desc: "Dos perspectivas enfrentadas" },
  { id: "resumen", label: "Resumen", desc: "5 puntos clave en menos de 10 min" },
];

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [cargando, setCargando] = useState(true);
  const [generando, setGenerando] = useState(false);
  const [abierto, setAbierto] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    titulo: "",
    documento_id: "" as string | number,
    tema: "",
    estilo: "conversacional",
    duracion_minutos: 15,
  });

  useEffect(() => {
    Promise.all([
      podcastsApi.list(USER_ID),
      docsApi.list(USER_ID),
    ]).then(([pRes, dRes]) => {
      setPodcasts(pRes.data);
      setDocs(dRes.data.filter((d: Doc) => d.estado === "listo"));
    }).catch(() => {
      setError("No se pudo conectar al backend. ¿Está arrancado?");
    }).finally(() => setCargando(false));
  }, []);

  const generar = async () => {
    if (!form.titulo.trim()) {
      setError("El título es obligatorio.");
      return;
    }
    if (!form.documento_id && !form.tema.trim()) {
      setError("Selecciona un documento o escribe un tema libre.");
      return;
    }
    setError(null);
    setGenerando(true);

    try {
      const payload = {
        titulo: form.titulo,
        estilo: form.estilo,
        duracion_minutos: form.duracion_minutos,
        ...(form.documento_id ? { documento_id: Number(form.documento_id) } : {}),
        ...(form.tema.trim() ? { tema: form.tema } : {}),
      };
      const res = await podcastsApi.generate(USER_ID, payload);
      setPodcasts((prev) => [res.data, ...prev]);
      setAbierto(res.data.id);
      setForm((f) => ({ ...f, titulo: "", tema: "", documento_id: "" }));
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? "Error al generar el podcast");
    } finally {
      setGenerando(false);
    }
  };

  const eliminar = async (id: number) => {
    try {
      await podcastsApi.remove(USER_ID, id);
      setPodcasts((prev) => prev.filter((p) => p.id !== id));
      if (abierto === id) setAbierto(null);
    } catch {
      setError("Error al eliminar el podcast");
    }
  };

  const descargar = (podcast: Podcast) => {
    const blob = new Blob([podcast.guion], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${podcast.titulo.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white">Podcasts</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🎙️ Podcasts educativos</h1>
          <p className="text-gray-400">
            Convierte documentos o cualquier tema cuántico en guiones de audio con GPT-4o-mini.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800 border border-purple-800/50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-lg mb-5 text-purple-300">Generar nuevo episodio</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-sm text-red-300 flex justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}

          <div className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Título del episodio *</label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                placeholder="Ej: Entrelazamiento cuántico — Explicación intuitiva"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Fuente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Documento indexado {docs.length > 0 ? `(${docs.length} disponibles)` : ""}
                </label>
                {docs.length > 0 ? (
                  <select
                    value={form.documento_id}
                    onChange={(e) => setForm((f) => ({ ...f, documento_id: e.target.value }))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="">— Sin documento —</option>
                    {docs.map((d) => (
                      <option key={d.id} value={d.id}>{d.nombre}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-gray-600 mt-2">
                    Sube documentos en{" "}
                    <Link href="/documentos" className="text-purple-400 hover:underline">Documentos</Link>
                    {" "}para usarlos aquí.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  O tema libre (si no hay documento)
                </label>
                <input
                  type="text"
                  value={form.tema}
                  onChange={(e) => setForm((f) => ({ ...f, tema: e.target.value }))}
                  placeholder="Ej: Algoritmo de Shor para factorización"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Estilo */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Estilo del podcast</label>
              <div className="grid grid-cols-2 gap-2">
                {ESTILOS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setForm((f) => ({ ...f, estilo: e.id }))}
                    className={`p-3 rounded-lg text-left border transition-all ${
                      form.estilo === e.id
                        ? "border-purple-500 bg-purple-900/30"
                        : "border-gray-700 bg-gray-900 hover:border-gray-600"
                    }`}
                  >
                    <p className="text-sm font-medium">{e.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{e.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Duración */}
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Duración: <span className="text-white font-medium">{form.duracion_minutos} min</span>
              </label>
              <input
                type="range" min={5} max={45} step={5}
                value={form.duracion_minutos}
                onChange={(e) => setForm((f) => ({ ...f, duracion_minutos: Number(e.target.value) }))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>5 min</span><span>25 min</span><span>45 min</span>
              </div>
            </div>

            <button
              onClick={generar}
              disabled={generando}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {generando ? (
                <><span className="animate-spin inline-block">⟳</span> Generando guión con GPT-4o-mini...</>
              ) : (
                "Generar podcast"
              )}
            </button>
          </div>
        </div>

        {/* Episodios */}
        <h2 className="text-xl font-semibold mb-4">
          Mis episodios {!cargando && `(${podcasts.length})`}
        </h2>

        {cargando ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-3xl mb-3 animate-spin">⟳</div>
            <p>Cargando episodios...</p>
          </div>
        ) : podcasts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">🎧</div>
            <p>Aún no tienes episodios. Genera tu primero arriba.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {podcasts.map((p) => {
              const expandido = abierto === p.id;
              return (
                <div key={p.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                  <div className="flex items-start gap-4 p-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-700/50 border border-purple-700 rounded-full flex items-center justify-center text-lg">
                      🎙️
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{p.titulo}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 capitalize">
                            {p.estilo} · {p.fecha}
                          </p>
                        </div>
                        <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full text-green-400 bg-green-900/30">
                          listo
                        </span>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => setAbierto(expandido ? null : p.id)}
                          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {expandido ? "Ocultar guión ▲" : "Ver guión ▼"}
                        </button>
                        <button
                          onClick={() => descargar(p)}
                          className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                          Descargar .txt
                        </button>
                        <button
                          onClick={() => eliminar(p.id)}
                          className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>

                  {expandido && (
                    <div className="border-t border-gray-700 p-5 bg-gray-900/60">
                      <p className="text-xs text-gray-500 font-mono mb-3 uppercase tracking-wide">Guión completo</p>
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
                        {p.guion}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
