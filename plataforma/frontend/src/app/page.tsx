import Link from "next/link";

const features = [
  { icon: "⚛️", title: "Plan de 12 semanas", desc: "Ruta estructurada desde álgebra lineal hasta algoritmos cuánticos con Qiskit." },
  { icon: "📄", title: "NotebookLM propio", desc: "Sube PDFs, apuntes y papers. Chatea con ellos, genera resúmenes y flashcards automáticas." },
  { icon: "🎙️", title: "Podcasts automáticos", desc: "Convierte cualquier material en un episodio de audio educativo personalizado." },
  { icon: "🔬", title: "Laboratorio Qiskit", desc: "Ejecuta circuitos en el simulador o en hardware real de IBM Quantum." },
  { icon: "📊", title: "Seguimiento de progreso", desc: "Hitos semanales verificables, métricas de completitud y evaluación intermedia." },
  { icon: "🔐", title: "Conexión con ciberseguridad", desc: "Shor, Grover, QKD y post-quantum cryptography integrados en el plan." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="mb-4 text-sm font-mono text-purple-400 tracking-widest uppercase">
          Ecosistema de aprendizaje autodidacta
        </div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          CUÁNTICA
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-4">
          Aprende computación cuántica desde cero con Qiskit e IBM Quantum.
          Estudia con una plataforma que procesa tus documentos y genera podcasts educativos a partir de ellos.
        </p>
        <p className="text-sm text-gray-500 mb-10">
          Diseñado para programadores con base en Python e IA.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/dashboard" className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">
            Entrar al dashboard →
          </Link>
          <Link href="/semanas" className="px-8 py-3 border border-gray-700 hover:border-gray-500 rounded-lg font-semibold transition-colors">
            Ver plan de 12 semanas
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-xl bg-gray-800 border border-gray-700">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
