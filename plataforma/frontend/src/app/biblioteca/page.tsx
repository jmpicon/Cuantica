"use client";
import { useState } from "react";
import Link from "next/link";

type Recurso = {
  titulo: string;
  autor?: string;
  tipo: "libro" | "video" | "paper" | "herramienta" | "curso";
  url: string;
  semanas: number[];
  nivel: "básico" | "intermedio" | "avanzado";
  idioma: "ES" | "EN";
  descripcion: string;
  gratis: boolean;
};

const RECURSOS: Recurso[] = [
  // LIBROS
  {
    titulo: "Quantum Computation and Quantum Information",
    autor: "Nielsen & Chuang",
    tipo: "libro",
    url: "https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information",
    semanas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "La biblia de la computación cuántica. Referencia matemática completa sobre qubits, puertas, algoritmos y criptografía cuántica.",
    gratis: false,
  },
  {
    titulo: "Dancing with Qubits",
    autor: "Robert Sutor",
    tipo: "libro",
    url: "https://www.packtpub.com/product/dancing-with-qubits/9781838827366",
    semanas: [1, 2, 3, 4, 5],
    nivel: "básico",
    idioma: "EN",
    descripcion: "Introducción accesible con enfoque matemático progresivo. Ideal para programadores que llegan desde Python/IA.",
    gratis: false,
  },
  {
    titulo: "Quantum Computing: An Applied Approach",
    autor: "Jack Hidary",
    tipo: "libro",
    url: "https://link.springer.com/book/10.1007/978-3-030-83274-2",
    semanas: [3, 4, 5, 6, 7, 8, 9, 10],
    nivel: "intermedio",
    idioma: "EN",
    descripcion: "Enfoque práctico con código Qiskit, Cirq y otros frameworks. Excelente para desarrolladores.",
    gratis: false,
  },
  {
    titulo: "Introduction to Classical and Quantum Computing",
    autor: "Thomas Wong",
    tipo: "libro",
    url: "https://www.thomaswong.net/introduction-to-classical-and-quantum-computing-1e3p.pdf",
    semanas: [1, 2, 3, 4, 5],
    nivel: "básico",
    idioma: "EN",
    descripcion: "PDF gratuito con excelente pedagogía. Parte desde álgebra de Boole hasta algoritmos cuánticos de forma gradual.",
    gratis: true,
  },
  // CURSOS ONLINE
  {
    titulo: "Qiskit Textbook (IBM Quantum Learning)",
    autor: "IBM Quantum",
    tipo: "curso",
    url: "https://learning.quantum.ibm.com/",
    semanas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    nivel: "básico",
    idioma: "EN",
    descripcion: "El recurso oficial de IBM. Cubre Qiskit desde fundamentos hasta aplicaciones avanzadas. Gratuito y con ejercicios interactivos.",
    gratis: true,
  },
  {
    titulo: "Quantum Computing — Coursera (St Andrews)",
    autor: "University of St Andrews",
    tipo: "curso",
    url: "https://www.coursera.org/learn/quantum-computing",
    semanas: [1, 2, 3, 4, 5],
    nivel: "básico",
    idioma: "EN",
    descripcion: "Curso introductorio con buenas visualizaciones. Ideal como complemento teórico en las primeras semanas.",
    gratis: true,
  },
  {
    titulo: "Quantum Machine Learning — edX (MIT)",
    autor: "MIT",
    tipo: "curso",
    url: "https://www.edx.org/course/quantum-machine-learning",
    semanas: [9, 10, 11, 12],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "Intersección entre ML e informática cuántica. QSVM, VQE, QAOA y aplicaciones en optimización.",
    gratis: false,
  },
  {
    titulo: "The Coding Train — Quantum Computing",
    autor: "Daniel Shiffman",
    tipo: "video",
    url: "https://www.youtube.com/@TheCodingTrain",
    semanas: [1, 2, 3],
    nivel: "básico",
    idioma: "EN",
    descripcion: "Explicaciones visuales e intuitivas de conceptos cuánticos. Perfecto para consolidar intuición antes de las matemáticas.",
    gratis: true,
  },
  // VIDEOS / CANALES
  {
    titulo: "Quantum Computing con Qiskit (Canal IBM)",
    autor: "IBM Research",
    tipo: "video",
    url: "https://www.youtube.com/@IBMQuantum",
    semanas: [3, 4, 5, 6, 7, 8],
    nivel: "intermedio",
    idioma: "EN",
    descripcion: "Canal oficial de IBM Quantum con tutoriales Qiskit, seminarios y demos de hardware real.",
    gratis: true,
  },
  {
    titulo: "Quantum Mechanics and Quantum Computation — UC Berkeley",
    autor: "Umesh Vazirani",
    tipo: "curso",
    url: "https://archive.org/details/ucberkeley-webcast-PL74Rei7F44Y",
    semanas: [1, 2, 3, 4, 5, 6],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "Curso formal de Berkeley. Matemáticamente riguroso. Ideal para profundizar en la semana 6 y siguientes.",
    gratis: true,
  },
  {
    titulo: "Qiskit YouTube (tutoriales prácticos)",
    autor: "Qiskit",
    tipo: "video",
    url: "https://www.youtube.com/@qiskit",
    semanas: [3, 4, 5, 6, 7, 8, 9, 10],
    nivel: "intermedio",
    idioma: "EN",
    descripcion: "Playlist de tutoriales de código con Qiskit 1.x. Incluye Qiskit Patterns, Runtime y circuitos optimizados.",
    gratis: true,
  },
  {
    titulo: "3Blue1Brown — Álgebra lineal (Essence of Linear Algebra)",
    autor: "3Blue1Brown",
    tipo: "video",
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
    semanas: [1],
    nivel: "básico",
    idioma: "EN",
    descripcion: "La mejor visualización de álgebra lineal. Vectores, matrices, transformaciones. Prerequisito matemático.",
    gratis: true,
  },
  // PAPERS
  {
    titulo: "A fast quantum mechanical algorithm for database search (Grover 1996)",
    autor: "Lov K. Grover",
    tipo: "paper",
    url: "https://arxiv.org/abs/quant-ph/9605043",
    semanas: [10],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "Paper original del algoritmo de Grover. Imprescindible leer en la semana 10 para entender la derivación.",
    gratis: true,
  },
  {
    titulo: "Polynomial-Time Algorithms for Prime Factorization (Shor 1995)",
    autor: "Peter W. Shor",
    tipo: "paper",
    url: "https://arxiv.org/abs/quant-ph/9508027",
    semanas: [9],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "El paper que lo cambió todo. Factorización en tiempo polinómico cuántico. Base del algoritmo de Shor.",
    gratis: true,
  },
  {
    titulo: "Post-Quantum Cryptography — NIST",
    autor: "NIST",
    tipo: "paper",
    url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
    semanas: [12],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "Estándares FIPS 203-206 de NIST: CRYSTALS-Kyber (ML-KEM), CRYSTALS-Dilithium (ML-DSA). Criptografía post-cuántica oficial.",
    gratis: true,
  },
  {
    titulo: "Quantum Key Distribution (BB84 original)",
    autor: "Bennett & Brassard",
    tipo: "paper",
    url: "https://arxiv.org/abs/2003.06557",
    semanas: [12],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "Paper original del protocolo BB84 de distribución cuántica de claves. Base de la criptografía cuántica.",
    gratis: true,
  },
  {
    titulo: "Quantum approximate optimization algorithm (QAOA)",
    autor: "Farhi, Goldstone, Gutmann",
    tipo: "paper",
    url: "https://arxiv.org/abs/1411.4028",
    semanas: [11],
    nivel: "avanzado",
    idioma: "EN",
    descripcion: "QAOA para problemas de optimización combinatoria. Relevante para el proyecto final.",
    gratis: true,
  },
  // HERRAMIENTAS
  {
    titulo: "IBM Quantum Platform",
    autor: "IBM",
    tipo: "herramienta",
    url: "https://quantum.ibm.com/",
    semanas: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    nivel: "básico",
    idioma: "EN",
    descripcion: "Acceso a hardware cuántico real de IBM. Circuit Composer visual, IBM Quantum Lab (Jupyter), cola de trabajos.",
    gratis: true,
  },
  {
    titulo: "Quirk — Circuit Simulator (online)",
    autor: "Craig Gidney",
    tipo: "herramienta",
    url: "https://algassert.com/quirk",
    semanas: [2, 3, 4, 5],
    nivel: "básico",
    idioma: "EN",
    descripcion: "Simulador de circuitos cuánticos en el navegador. Ideal para entender visualmente puertas y estados.",
    gratis: true,
  },
  {
    titulo: "Qiskit 1.4 Documentation",
    autor: "IBM / Qiskit Community",
    tipo: "herramienta",
    url: "https://docs.quantum.ibm.com/",
    semanas: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    nivel: "básico",
    idioma: "EN",
    descripcion: "Documentación oficial completa de Qiskit 1.x. API reference, tutoriales, guías de migración.",
    gratis: true,
  },
  {
    titulo: "Quantum Inspire (QuTech)",
    autor: "QuTech / TU Delft",
    tipo: "herramienta",
    url: "https://www.quantum-inspire.com/",
    semanas: [3, 4, 5, 6],
    nivel: "intermedio",
    idioma: "EN",
    descripcion: "Alternativa a IBM: hardware cuántico holandés con 17 y 26 qubits. Interfaz gráfica y API.",
    gratis: true,
  },
  {
    titulo: "PhET Quantum Wave Interference",
    autor: "University of Colorado",
    tipo: "herramienta",
    url: "https://phet.colorado.edu/en/simulations/quantum-wave-interference",
    semanas: [2],
    nivel: "básico",
    idioma: "EN",
    descripcion: "Simulación interactiva de interferencia cuántica. Excelente para entender dualidad onda-partícula.",
    gratis: true,
  },
];

const TIPOS = ["todos", "libro", "curso", "video", "paper", "herramienta"] as const;
type FiltroTipo = (typeof TIPOS)[number];

export default function Biblioteca() {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("todos");
  const [filtroSemana, setFiltroSemana] = useState<number>(0);
  const [filtroNivel, setFiltroNivel] = useState<string>("todos");
  const [soloCopados, setSoloCopados] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const filtrados = RECURSOS.filter((r) => {
    if (filtroTipo !== "todos" && r.tipo !== filtroTipo) return false;
    if (filtroSemana > 0 && !r.semanas.includes(filtroSemana)) return false;
    if (filtroNivel !== "todos" && r.nivel !== filtroNivel) return false;
    if (soloCopados && !r.gratis) return false;
    if (busqueda && !r.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
        !(r.descripcion.toLowerCase().includes(busqueda.toLowerCase()))) return false;
    return true;
  });

  const iconoTipo = {
    libro: "📚",
    curso: "🎓",
    video: "▶️",
    paper: "📄",
    herramienta: "🛠️",
  };

  const colorNivel = {
    básico: "text-green-400 bg-green-900/30",
    intermedio: "text-yellow-400 bg-yellow-900/30",
    avanzado: "text-red-400 bg-red-900/30",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white">Biblioteca</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📚 Biblioteca de Recursos</h1>
          <p className="text-gray-400">{RECURSOS.length} recursos curados para dominar la computación cuántica</p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Tipo */}
          <div className="flex gap-2 flex-wrap">
            {TIPOS.map((t) => (
              <button
                key={t}
                onClick={() => setFiltroTipo(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filtroTipo === t
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                {t === "todos" ? "Todos" : `${iconoTipo[t as keyof typeof iconoTipo]} ${t.charAt(0).toUpperCase() + t.slice(1)}s`}
              </button>
            ))}
          </div>

          {/* Semana */}
          <select
            value={filtroSemana}
            onChange={(e) => setFiltroSemana(Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
          >
            <option value={0}>Todas las semanas</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Semana {i + 1}</option>
            ))}
          </select>

          {/* Nivel */}
          <select
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
          >
            <option value="todos">Todos los niveles</option>
            <option value="básico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>

          {/* Solo gratis */}
          <button
            onClick={() => setSoloCopados(!soloCopados)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              soloCopados
                ? "bg-green-900/30 border-green-700 text-green-400"
                : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
            }`}
          >
            Solo gratuitos
          </button>
        </div>

        {/* Contador */}
        <p className="text-sm text-gray-500 mb-4">{filtrados.length} recursos encontrados</p>

        {/* Grid de recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrados.map((r) => (
            <a
              key={r.titulo}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 bg-gray-800 border border-gray-700 rounded-xl hover:border-purple-600 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{iconoTipo[r.tipo]}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorNivel[r.nivel]}`}>
                    {r.nivel}
                  </span>
                  {r.gratis && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium text-green-400 bg-green-900/30">
                      gratis
                    </span>
                  )}
                  <span className="text-xs text-gray-600 font-mono">{r.idioma}</span>
                </div>
                <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
              </div>

              <h3 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {r.titulo}
              </h3>
              {r.autor && <p className="text-xs text-gray-500 mb-2">{r.autor}</p>}
              <p className="text-sm text-gray-400 mb-3">{r.descripcion}</p>

              <div className="flex flex-wrap gap-1">
                {r.semanas.map((s) => (
                  <span key={s} className="text-xs px-1.5 py-0.5 bg-gray-700 rounded text-gray-400 font-mono">
                    S{s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <p>No hay recursos con esos filtros</p>
            <button
              onClick={() => { setFiltroTipo("todos"); setFiltroSemana(0); setFiltroNivel("todos"); setSoloCopados(false); setBusqueda(""); }}
              className="mt-4 text-purple-400 hover:text-purple-300 text-sm"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
