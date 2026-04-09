"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const SEMANAS = Array.from({ length: 12 }, (_, i) => ({
  num: i + 1,
  titulo: [
    "Fundamentos matemáticos",
    "Superposición y medición",
    "El qubit e instalación Qiskit",
    "Puertas de un solo qubit",
    "Multi-qubit y entrelazamiento",
    "Circuitos completos + Evaluación",
    "Qiskit profundo",
    "IBM Quantum y ruido",
    "Algoritmos cuánticos pt. 1",
    "Grover + preparación proyecto",
    "Proyecto final — desarrollo",
    "Proyecto final — cierre",
  ][i],
}));

export default function Dashboard() {
  const [progreso, setProgreso] = useState<Record<string, { pct: number }>>({});

  useEffect(() => {
    // En MVP: datos de ejemplo hasta conectar el backend
    const mock: Record<string, { pct: number }> = {};
    SEMANAS.forEach((s, i) => {
      mock[`semana_${String(s.num).padStart(2, "0")}`] = { pct: i === 0 ? 40 : 0 };
    });
    setProgreso(mock);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-400">Tu progreso en el programa de 12 semanas</p>
        </div>

        {/* Resumen global */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Semanas completadas", value: "1 / 12" },
            { label: "Progreso total", value: "8%" },
            { label: "Hitos verificados", value: "1 / 12" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 bg-gray-800 rounded-xl border border-gray-700">
              <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Grid de semanas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEMANAS.map((s) => {
            const key = `semana_${String(s.num).padStart(2, "0")}`;
            const pct = progreso[key]?.pct ?? 0;
            const status = pct === 100 ? "done" : pct > 0 ? "active" : "pending";
            return (
              <Link href={`/semanas/${s.num}`} key={s.num}>
                <div className={`p-5 rounded-xl border transition-colors cursor-pointer
                  ${status === "done"   ? "bg-green-900/30 border-green-700 hover:border-green-500" :
                    status === "active" ? "bg-purple-900/30 border-purple-700 hover:border-purple-500" :
                                          "bg-gray-800 border-gray-700 hover:border-gray-500"}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono text-gray-500">Semana {s.num}</span>
                    <span className="text-xs font-semibold text-gray-400">{pct}%</span>
                  </div>
                  <p className="text-sm font-medium">{s.titulo}</p>
                  <div className="mt-3 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Accesos rápidos */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/biblioteca", label: "Biblioteca", icon: "📚" },
            { href: "/laboratorio", label: "Laboratorio", icon: "🔬" },
            { href: "/documentos", label: "Documentos", icon: "📄" },
            { href: "/podcasts", label: "Podcasts", icon: "🎙️" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 p-4 bg-gray-800 border border-gray-700 hover:border-gray-500 rounded-xl transition-colors">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
