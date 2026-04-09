import Link from "next/link";

const SEMANAS = [
  { num: 1,  titulo: "Fundamentos matemáticos",          dificultad: 2, icono: "∑" },
  { num: 2,  titulo: "Superposición y medición",         dificultad: 3, icono: "ψ" },
  { num: 3,  titulo: "El qubit e instalación Qiskit",    dificultad: 2, icono: "⚛" },
  { num: 4,  titulo: "Puertas de un solo qubit",         dificultad: 3, icono: "H" },
  { num: 5,  titulo: "Multi-qubit y entrelazamiento",    dificultad: 4, icono: "⊗" },
  { num: 6,  titulo: "Circuitos completos + Evaluación", dificultad: 3, icono: "≡" },
  { num: 7,  titulo: "Qiskit profundo",                  dificultad: 3, icono: "Q" },
  { num: 8,  titulo: "IBM Quantum y ruido",              dificultad: 3, icono: "∿" },
  { num: 9,  titulo: "Algoritmos cuánticos pt. 1",       dificultad: 4, icono: "D" },
  { num: 10, titulo: "Grover + preparación proyecto",    dificultad: 4, icono: "G" },
  { num: 11, titulo: "Proyecto final — desarrollo",      dificultad: 4, icono: "⌥" },
  { num: 12, titulo: "Proyecto final — cierre",          dificultad: 4, icono: "✦" },
];

export default function SemanasPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-300 mb-6 inline-block">
          ← Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Plan de 12 semanas</h1>
        <p className="text-gray-400 mb-8">
          Ruta de aprendizaje desde álgebra lineal hasta algoritmos cuánticos con Qiskit.
        </p>

        <div className="flex flex-col gap-3">
          {SEMANAS.map((s) => (
            <Link href={`/semanas/${s.num}`} key={s.num}>
              <div className="flex items-center gap-4 p-5 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-purple-600 rounded-xl transition-all group">
                <div className="w-12 h-12 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center text-lg font-mono text-purple-400 shrink-0">
                  {s.icono}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-gray-500">Semana {s.num}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{"⭐".repeat(s.dificultad)}{"☆".repeat(5 - s.dificultad)}</span>
                  </div>
                  <p className="font-medium text-gray-100 group-hover:text-white transition-colors">
                    {s.titulo}
                  </p>
                </div>
                <span className="text-gray-600 group-hover:text-purple-400 transition-colors text-lg">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
