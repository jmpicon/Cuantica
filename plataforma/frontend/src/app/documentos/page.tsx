"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { docsApi } from "@/lib/api";

const USER_ID = 1;

type Documento = {
  id: number;
  nombre: string;
  tipo: string;
  tamaño: string;
  estado: "procesando" | "listo" | "error";
  fecha: string;
  chunks?: number;
  resumen?: string;
};

export default function Documentos() {
  const [docs, setDocs] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [arrastrando, setArrastrando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preguntaDocId, setPreguntaDocId] = useState<number | null>(null);
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [cargandoRespuesta, setCargandoRespuesta] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cargar documentos
  const cargarDocs = useCallback(async () => {
    try {
      const res = await docsApi.list(USER_ID);
      setDocs(res.data);
    } catch {
      setError("No se pudo conectar al backend. ¿Está arrancado?");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDocs();
  }, [cargarDocs]);

  // Polling mientras haya documentos procesando
  useEffect(() => {
    const hayProcesando = docs.some((d) => d.estado === "procesando");
    if (hayProcesando && !pollingRef.current) {
      pollingRef.current = setInterval(cargarDocs, 4000);
    } else if (!hayProcesando && pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [docs, cargarDocs]);

  const subirArchivo = async (file: File) => {
    setError(null);
    const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");
    const permitidos = [".pdf", ".txt", ".md", ".ipynb"];
    if (!permitidos.includes(ext)) {
      setError(`Tipo no permitido. Acepta: ${permitidos.join(", ")}`);
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("El archivo supera el límite de 50 MB");
      return;
    }

    setSubiendo(true);
    setProgreso(10);
    const intervalo = setInterval(() => setProgreso((p) => Math.min(p + 10, 80)), 300);

    try {
      await docsApi.upload(USER_ID, file);
      setProgreso(100);
      await cargarDocs();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? "Error al subir el archivo");
    } finally {
      clearInterval(intervalo);
      setSubiendo(false);
      setTimeout(() => setProgreso(0), 600);
    }
  };

  const eliminar = async (id: number) => {
    try {
      await docsApi.remove(USER_ID, id);
      setDocs((prev) => prev.filter((d) => d.id !== id));
      if (preguntaDocId === id) setPreguntaDocId(null);
    } catch {
      setError("Error al eliminar el documento");
    }
  };

  const preguntarDoc = async () => {
    if (!pregunta.trim() || preguntaDocId === null) return;
    setCargandoRespuesta(true);
    setRespuesta(null);
    try {
      const res = await docsApi.query(USER_ID, preguntaDocId, pregunta);
      setRespuesta(res.data.respuesta);
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setRespuesta(`Error: ${msg ?? "No se pudo obtener respuesta"}`);
    } finally {
      setCargandoRespuesta(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setArrastrando(false);
    const file = e.dataTransfer.files[0];
    if (file) subirArchivo(file);
  }, []);

  const iconoTipo = (tipo: string) =>
    tipo === "PDF" ? "📕" : tipo === "MD" ? "📝" : tipo === "IPYNB" ? "📓" : "📄";

  const colorEstado: Record<string, string> = {
    listo: "text-green-400 bg-green-900/30",
    procesando: "text-yellow-400 bg-yellow-900/30",
    error: "text-red-400 bg-red-900/30",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white">Documentos</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Mis Documentos</h1>
          <p className="text-gray-400">
            Sube PDFs, apuntes y papers. El sistema los indexa con ChromaDB + OpenAI
            para que puedas chatear con ellos.
          </p>
        </div>

        {/* Zona de carga */}
        <div
          onDragOver={(e) => { e.preventDefault(); setArrastrando(true); }}
          onDragLeave={() => setArrastrando(false)}
          onDrop={onDrop}
          onClick={() => !subiendo && inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all mb-6 ${
            arrastrando
              ? "border-purple-500 bg-purple-900/20"
              : "border-gray-700 hover:border-gray-500 bg-gray-800/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.txt,.md,.ipynb"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && subirArchivo(e.target.files[0])}
          />
          <div className="text-4xl mb-3">{arrastrando ? "📂" : subiendo ? "⏳" : "⬆️"}</div>
          <p className="font-medium text-gray-200">
            {subiendo ? "Subiendo y procesando..." : arrastrando ? "Suelta el archivo" : "Arrastra o haz clic para subir"}
          </p>
          <p className="text-sm text-gray-500 mt-2">PDF, TXT, Markdown, Jupyter · Máx. 50 MB</p>
          {subiendo && progreso > 0 && (
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progreso}%` }}
              />
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-sm text-red-300 flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-300">✕</button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Documentos", value: docs.length },
            { label: "Listos para chat", value: docs.filter((d) => d.estado === "listo").length },
            { label: "Chunks indexados", value: docs.reduce((s, d) => s + (d.chunks ?? 0), 0) },
          ].map((s) => (
            <div key={s.label} className="p-4 bg-gray-800 border border-gray-700 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-400">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Lista */}
        {cargando ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-3xl mb-3 animate-spin">⟳</div>
            <p>Cargando documentos...</p>
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-4xl mb-3">📭</div>
            <p>Sin documentos. Sube tu primer PDF o apunte.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((doc) => (
              <div key={doc.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <span className="text-2xl flex-shrink-0">{iconoTipo(doc.tipo)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.nombre}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-gray-500">{doc.tipo}</span>
                      <span className="text-xs text-gray-500">{doc.tamaño}</span>
                      <span className="text-xs text-gray-500">{doc.fecha}</span>
                      {doc.chunks ? (
                        <span className="text-xs text-gray-500">{doc.chunks} chunks</span>
                      ) : null}
                    </div>
                    {doc.resumen && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{doc.resumen}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colorEstado[doc.estado] ?? "text-gray-400"}`}>
                      {doc.estado === "procesando" ? "⏳ procesando" : doc.estado === "listo" ? "✓ listo" : "✗ error"}
                    </span>
                    {doc.estado === "listo" && (
                      <button
                        onClick={() => {
                          setPreguntaDocId(doc.id);
                          setPregunta("");
                          setRespuesta(null);
                        }}
                        className="text-xs px-3 py-1.5 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors"
                      >
                        Chat
                      </button>
                    )}
                    <button
                      onClick={() => eliminar(doc.id)}
                      className="text-xs px-2 py-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Panel chat */}
                {preguntaDocId === doc.id && (
                  <div className="border-t border-gray-700 p-4 bg-gray-900/60">
                    <p className="text-xs text-gray-400 mb-3">
                      Chat con <span className="text-white font-medium">{doc.nombre}</span>
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={pregunta}
                        onChange={(e) => setPregunta(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && preguntarDoc()}
                        placeholder="¿Qué explica este documento sobre qubits?"
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                        autoFocus
                      />
                      <button
                        onClick={preguntarDoc}
                        disabled={cargandoRespuesta || !pregunta.trim()}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-lg text-sm transition-colors"
                      >
                        {cargandoRespuesta ? "..." : "Enviar"}
                      </button>
                      <button
                        onClick={() => setPreguntaDocId(null)}
                        className="px-2 text-gray-500 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    {respuesta && (
                      <div className="mt-3 p-4 bg-gray-800 rounded-lg text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                        {respuesta}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
