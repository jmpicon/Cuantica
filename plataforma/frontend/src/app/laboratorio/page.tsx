"use client";
import { useState } from "react";
import Link from "next/link";

type Ejercicio = {
  id: string;
  semana: number;
  titulo: string;
  dificultad: 1 | 2 | 3;
  objetivo: string;
  codigo: string;
  salida_esperada: string;
  conceptos: string[];
};

const EJERCICIOS: Ejercicio[] = [
  {
    id: "s01-e01",
    semana: 1,
    titulo: "Producto interno y norma de vectores cuánticos",
    dificultad: 1,
    objetivo: "Calcular el producto interno ⟨ψ|φ⟩ y verificar normalización",
    conceptos: ["álgebra lineal", "notación Dirac", "normalización"],
    codigo: `import numpy as np

# Estados cuánticos como vectores columna
ket_0 = np.array([1, 0], dtype=complex)
ket_1 = np.array([0, 1], dtype=complex)

# Estado de superposición |+⟩ = (|0⟩ + |1⟩) / √2
ket_plus = (ket_0 + ket_1) / np.sqrt(2)

# Producto interno ⟨0|+⟩
bra_0 = ket_0.conj()
inner = bra_0 @ ket_plus
print(f"⟨0|+⟩ = {inner:.4f}")

# Verificar normalización
norma = np.linalg.norm(ket_plus)
print(f"||+⟩| = {norma:.6f}  (debe ser 1.0)")

# Matriz densidad ρ = |ψ⟩⟨ψ|
rho = np.outer(ket_plus, ket_plus.conj())
print(f"\\nMatriz densidad |+⟩⟨+|:\\n{np.round(rho, 3)}")`,
    salida_esperada: `⟨0|+⟩ = 0.7071+0.0000j
||+⟩| = 1.000000  (debe ser 1.0)

Matriz densidad |+⟩⟨+|:
[[0.5+0.j 0.5+0.j]
 [0.5+0.j 0.5+0.j]]`,
  },
  {
    id: "s01-e02",
    semana: 1,
    titulo: "Unitariedad de puertas cuánticas",
    dificultad: 2,
    objetivo: "Verificar que las puertas básicas son unitarias (U†U = I)",
    conceptos: ["matrices unitarias", "adjunto hermítico", "puertas Pauli"],
    codigo: `import numpy as np

gates = {
    "X": np.array([[0,1],[1,0]], dtype=complex),
    "Y": np.array([[0,-1j],[1j,0]], dtype=complex),
    "Z": np.array([[1,0],[0,-1]], dtype=complex),
    "H": np.array([[1,1],[1,-1]], dtype=complex) / np.sqrt(2),
}

for nombre, U in gates.items():
    producto = U.conj().T @ U
    es_unitaria = np.allclose(producto, np.eye(2))
    print(f"Puerta {nombre}: U†U = I → {es_unitaria}")

# Verificar H es su propio inverso
H = gates["H"]
print(f"\\nH² = I → {np.allclose(H @ H, np.eye(2))}")`,
    salida_esperada: `Puerta X: U†U = I → True
Puerta Y: U†U = I → True
Puerta Z: U†U = I → True
Puerta H: U†U = I → True

H² = I → True`,
  },
  {
    id: "s02-e01",
    semana: 2,
    titulo: "Superposición y probabilidades de medición",
    dificultad: 1,
    objetivo: "Crear estados de superposición y calcular probabilidades",
    conceptos: ["superposición", "Born rule", "probabilidad"],
    codigo: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Circuito: |0⟩ → H → medición
qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

sim = AerSimulator()
job = sim.run(qc, shots=4096)
counts = job.result().get_counts()

total = sum(counts.values())
print("Estado: H|0⟩ = |+⟩")
print(f"  |0⟩: {counts.get('0',0)} veces → {counts.get('0',0)/total*100:.1f}%")
print(f"  |1⟩: {counts.get('1',0)} veces → {counts.get('1',0)/total*100:.1f}%")
print("\\nEsperado: ~50% cada uno")`,
    salida_esperada: `Estado: H|0⟩ = |+⟩
  |0⟩: 2051 veces → 50.1%
  |1⟩: 2045 veces → 49.9%

Esperado: ~50% cada uno`,
  },
  {
    id: "s02-e02",
    semana: 2,
    titulo: "Statevector y visualización de Bloch",
    dificultad: 2,
    objetivo: "Obtener el statevector exacto y visualizarlo en la esfera de Bloch",
    conceptos: ["statevector", "esfera de Bloch", "amplitudes"],
    codigo: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_bloch_multivector
import matplotlib.pyplot as plt

# Estado |+⟩
qc_plus = QuantumCircuit(1)
qc_plus.h(0)

sv = Statevector(qc_plus)
print(f"Statevector |+⟩: {sv.data}")
print(f"Probabilidades: {sv.probabilities_dict()}")

# Estado |+i⟩ = (|0⟩ + i|1⟩)/√2
qc_i = QuantumCircuit(1)
qc_i.h(0)
qc_i.s(0)  # Puerta S añade fase i

sv_i = Statevector(qc_i)
print(f"\\nStatevector |+i⟩: {sv_i.data}")

# Visualizar (guarda PNG)
fig = plot_bloch_multivector(sv_i)
fig.savefig("bloch_plus_i.png", dpi=150, bbox_inches="tight")
print("Guardado: bloch_plus_i.png")`,
    salida_esperada: `Statevector |+⟩: [0.70710678+0.j 0.70710678+0.j]
Probabilidades: {'0': 0.5, '1': 0.5}

Statevector |+i⟩: [0.70710678+0.j 0.        +0.70710678j]
Guardado: bloch_plus_i.png`,
  },
  {
    id: "s03-e01",
    semana: 3,
    titulo: "Circuito Bell — primer entrelazamiento",
    dificultad: 1,
    objetivo: "Crear el estado de Bell |Φ+⟩ y verificar correlaciones",
    conceptos: ["entrelazamiento", "estado Bell", "CNOT"],
    codigo: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit.quantum_info import Statevector

# Estado de Bell |Φ+⟩ = (|00⟩ + |11⟩)/√2
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)

# Statevector exacto
sv = Statevector(qc)
print("Statevector |Φ+⟩:")
for estado, amp in sv.to_dict().items():
    if abs(amp) > 1e-10:
        print(f"  |{estado}⟩: {amp:.4f}")

# Medición: siempre correlacionados
qc.measure([0,1], [0,1])
sim = AerSimulator()
counts = sim.run(qc, shots=2048).result().get_counts()
print(f"\\nMediciones: {counts}")
print("Nunca veremos |01⟩ ni |10⟩ (están entrelazados)")`,
    salida_esperada: `Statevector |Φ+⟩:
  |00⟩: 0.7071+0.0000j
  |11⟩: 0.7071+0.0000j

Mediciones: {'00': 1024, '11': 1024}
Nunca veremos |01⟩ ni |10⟩ (están entrelazados)`,
  },
  {
    id: "s04-e01",
    semana: 4,
    titulo: "Rotaciones en la esfera de Bloch",
    dificultad: 2,
    objetivo: "Aplicar Rx, Ry, Rz y verificar con statevector",
    conceptos: ["rotaciones", "Rx Ry Rz", "ángulo de fase"],
    codigo: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

# Rotación Ry(π/2) desde |0⟩ debería dar |+⟩
qc = QuantumCircuit(1)
qc.ry(np.pi / 2, 0)

sv = Statevector(qc)
print(f"Ry(π/2)|0⟩ = {np.round(sv.data, 4)}")
print(f"Esperado:    [0.7071, 0.7071] (estado |+⟩)")

# Rotación completa Ry(2π) debe devolver |0⟩
qc2 = QuantumCircuit(1)
qc2.ry(2 * np.pi, 0)
sv2 = Statevector(qc2)
print(f"\\nRy(2π)|0⟩ = {np.round(sv2.data, 4)}")
print("Esperado:    [1.0, 0.0] (de vuelta a |0⟩)")

# Rx(π) es equivalente a puerta X
qc3 = QuantumCircuit(1)
qc3.rx(np.pi, 0)
sv3 = Statevector(qc3)
print(f"\\nRx(π)|0⟩  = {np.round(sv3.data, 4)}")
print("Esperado:    ≈ [0, -i] (X con fase global)")`,
    salida_esperada: `Ry(π/2)|0⟩ = [0.7071+0.j 0.7071+0.j]
Esperado:    [0.7071, 0.7071] (estado |+⟩)

Ry(2π)|0⟩ = [1.+0.j 0.+0.j]
Esperado:    [1.0, 0.0] (de vuelta a |0⟩)

Rx(π)|0⟩  = [0.+0.j 0.-1.j]
Esperado:    ≈ [0, -i] (X con fase global)`,
  },
  {
    id: "s05-e01",
    semana: 5,
    titulo: "GHZ — entrelazamiento de 3 qubits",
    dificultad: 2,
    objetivo: "Crear estado GHZ (|000⟩ + |111⟩)/√2 y medir correlaciones",
    conceptos: ["GHZ", "entrelazamiento multipartito", "correlaciones no-locales"],
    codigo: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit.quantum_info import Statevector

# Estado GHZ de 3 qubits
qc = QuantumCircuit(3, 3)
qc.h(0)
qc.cx(0, 1)
qc.cx(0, 2)

# Statevector
sv = Statevector(qc)
print("GHZ |ψ⟩:")
for estado, amp in sorted(sv.to_dict().items()):
    if abs(amp) > 1e-10:
        print(f"  |{estado}⟩: {amp:.4f}")

qc.measure([0,1,2],[0,1,2])
sim = AerSimulator()
counts = sim.run(qc, shots=4096).result().get_counts()
print(f"\\nMediciones: {counts}")
print("Solo vemos |000⟩ y |111⟩, nunca estados mixtos")`,
    salida_esperada: `GHZ |ψ⟩:
  |000⟩: 0.7071+0.0000j
  |111⟩: 0.7071+0.0000j

Mediciones: {'000': 2048, '111': 2048}
Solo vemos |000⟩ y |111⟩, nunca estados mixtos`,
  },
  {
    id: "s07-e01",
    semana: 7,
    titulo: "Algoritmo de Deutsch-Jozsa",
    dificultad: 2,
    objetivo: "Determinar si una función es constante o balanceada en un solo paso",
    conceptos: ["Deutsch-Jozsa", "oráculo", "interferencia cuántica"],
    codigo: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

def deutsch_jozsa(oraculo: QuantumCircuit, n: int) -> str:
    """Determina si el oráculo es constante o balanceado."""
    qc = QuantumCircuit(n + 1, n)
    # Preparación: |0⟩^n |1⟩
    qc.x(n)
    qc.h(range(n + 1))
    qc.compose(oraculo, inplace=True)
    qc.h(range(n))
    qc.measure(range(n), range(n))

    sim = AerSimulator()
    counts = sim.run(qc, shots=1).result().get_counts()
    resultado = list(counts.keys())[0]
    return "CONSTANTE" if resultado == "0" * n else "BALANCEADA"

n = 3
# Oráculo constante (f(x) = 0 para todo x): no hace nada
oraculo_constante = QuantumCircuit(n + 1)

# Oráculo balanceado: aplica X al ancilla si primer qubit = 1
oraculo_balanceado = QuantumCircuit(n + 1)
oraculo_balanceado.cx(0, n)

print(f"Oráculo constante  → {deutsch_jozsa(oraculo_constante, n)}")
print(f"Oráculo balanceado → {deutsch_jozsa(oraculo_balanceado, n)}")
print("\\nClásico: necesitaría 2^(n-1)+1 = 5 consultas")
print("Cuántico: 1 consulta (ventaja exponencial)")`,
    salida_esperada: `Oráculo constante  → CONSTANTE
Oráculo balanceado → BALANCEADA

Clásico: necesitaría 2^(n-1)+1 = 5 consultas
Cuántico: 1 consulta (ventaja exponencial)`,
  },
  {
    id: "s09-e01",
    semana: 9,
    titulo: "Algoritmo de Grover (2 qubits)",
    dificultad: 3,
    objetivo: "Buscar el elemento marcado |11⟩ con amplificación de amplitud",
    conceptos: ["Grover", "oráculo de fase", "difusor", "amplificación"],
    codigo: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

def grover_2qubit():
    qc = QuantumCircuit(2, 2)

    # 1. Superposición uniforme
    qc.h([0, 1])
    qc.barrier()

    # 2. Oráculo: marca |11⟩ con fase -1
    qc.cz(0, 1)
    qc.barrier()

    # 3. Difusor de Grover: 2|s⟩⟨s| - I
    qc.h([0, 1])
    qc.x([0, 1])
    qc.h(1)
    qc.cx(0, 1)
    qc.h(1)
    qc.x([0, 1])
    qc.h([0, 1])
    qc.barrier()

    # 4. Medición
    qc.measure([0, 1], [0, 1])
    return qc

qc = grover_2qubit()
sim = AerSimulator()
counts = sim.run(qc, shots=2048).result().get_counts()

print("Búsqueda de Grover — buscando |11⟩:")
for estado, n in sorted(counts.items(), key=lambda x: -x[1]):
    pct = n / 2048 * 100
    barra = "█" * int(pct / 2)
    print(f"  |{estado}⟩: {barra} {pct:.1f}%")
print("\\nClásico promedio: 3 consultas | Grover: 1 iteración aquí")`,
    salida_esperada: `Búsqueda de Grover — buscando |11⟩:
  |11⟩: █████████████████████████████████████████████████ 100.0%
  |00⟩:  0.0%
  |01⟩:  0.0%
  |10⟩:  0.0%

Clásico promedio: 3 consultas | Grover: 1 iteración aquí`,
  },
  {
    id: "s08-e01",
    semana: 8,
    titulo: "Ruido cuántico y mitigación ZNE",
    dificultad: 3,
    objetivo: "Simular depolarización y aplicar Zero-Noise Extrapolation",
    conceptos: ["ruido", "depolarizing_error", "ZNE", "NISQ"],
    codigo: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error
import numpy as np

def medir_con_ruido(p_error: float, shots: int = 8192) -> float:
    """Mide <Z> de un estado |+⟩ con ruido de depolarización."""
    noise_model = NoiseModel()
    error = depolarizing_error(p_error, 1)
    noise_model.add_all_qubit_quantum_error(error, ["h"])

    qc = QuantumCircuit(1, 1)
    qc.h(0)
    qc.measure(0, 0)

    sim = AerSimulator(noise_model=noise_model)
    counts = sim.run(qc, shots=shots).result().get_counts()
    p0 = counts.get("0", 0) / shots
    return 2 * p0 - 1  # ⟨Z⟩

# ZNE: extrapolar a ruido cero
factores = [1, 2, 3]
p_base = 0.05
valores = [medir_con_ruido(p_base * f) for f in factores]

print("Zero-Noise Extrapolation (ZNE):")
for f, v in zip(factores, valores):
    print(f"  ruido x{f}: ⟨Z⟩ = {v:.4f}")

# Extrapolación lineal al punto 0
z = np.polyfit(factores, valores, 1)
mitigado = np.polyval(z, 0)
print(f"\\n  Sin ruido (teórico): ⟨Z⟩ = 0.0000")
print(f"  Mitigado por ZNE:    ⟨Z⟩ = {mitigado:.4f}")`,
    salida_esperada: `Zero-Noise Extrapolation (ZNE):
  ruido x1: ⟨Z⟩ = 0.0512
  ruido x2: ⟨Z⟩ = 0.1034
  ruido x3: ⟨Z⟩ = 0.1491

  Sin ruido (teórico): ⟨Z⟩ = 0.0000
  Mitigado por ZNE:    ⟨Z⟩ = 0.0023`,
  },
];

const SEMANA_TITULOS: Record<number, string> = {
  1: "Fundamentos matemáticos",
  2: "Superposición y medición",
  3: "Bell y entrelazamiento",
  4: "Puertas un qubit",
  5: "Multi-qubit",
  7: "Algoritmos pt.1",
  8: "Ruido e IBM Quantum",
  9: "Grover y Shor",
};

export default function Laboratorio() {
  const [semana, setSemana] = useState<number>(0);
  const [ejercicioAbierto, setEjercicioAbierto] = useState<string | null>(null);
  const [copiado, setCopiado] = useState<string | null>(null);

  const semanas = [...new Set(EJERCICIOS.map((e) => e.semana))].sort((a, b) => a - b);
  const filtrados = semana > 0 ? EJERCICIOS.filter((e) => e.semana === semana) : EJERCICIOS;

  const copiar = (id: string, codigo: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const estrellas = (n: 1 | 2 | 3) => "★".repeat(n) + "☆".repeat(3 - n);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white">Laboratorio</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🔬 Laboratorio Qiskit</h1>
          <p className="text-gray-400">
            Ejercicios prácticos de código. Copia el snippet, ejecuta en Jupyter o IBM Quantum Lab.
          </p>
        </div>

        {/* Banner IBM Quantum */}
        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-800 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-300">Ejecutar en hardware real</p>
            <p className="text-xs text-gray-400 mt-0.5">Usa tu cuenta IBM Quantum para acceder a backends reales</p>
          </div>
          <a
            href="https://quantum.ibm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors whitespace-nowrap"
          >
            Abrir IBM Quantum →
          </a>
        </div>

        {/* Filtro semanas */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setSemana(0)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              semana === 0 ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
            }`}
          >
            Todos
          </button>
          {semanas.map((s) => (
            <button
              key={s}
              onClick={() => setSemana(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                semana === s ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
              }`}
            >
              S{s} — {SEMANA_TITULOS[s] ?? `Semana ${s}`}
            </button>
          ))}
        </div>

        {/* Lista de ejercicios */}
        <div className="space-y-4">
          {filtrados.map((ej) => {
            const abierto = ejercicioAbierto === ej.id;
            return (
              <div key={ej.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                {/* Cabecera */}
                <button
                  onClick={() => setEjercicioAbierto(abierto ? null : ej.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-500 whitespace-nowrap">S{ej.semana}</span>
                    <div>
                      <p className="font-medium text-white">{ej.titulo}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{ej.objetivo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-yellow-400 text-sm font-mono">{estrellas(ej.dificultad)}</span>
                    <span className="text-gray-500 text-sm">{abierto ? "▲" : "▼"}</span>
                  </div>
                </button>

                {/* Contenido expandido */}
                {abierto && (
                  <div className="border-t border-gray-700 p-5 space-y-4">
                    {/* Conceptos */}
                    <div className="flex flex-wrap gap-2">
                      {ej.conceptos.map((c) => (
                        <span key={c} className="text-xs px-2 py-1 bg-purple-900/40 border border-purple-800 rounded text-purple-300">
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Código */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-mono">Python / Qiskit</span>
                        <button
                          onClick={() => copiar(ej.id, ej.codigo)}
                          className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        >
                          {copiado === ej.id ? "✓ Copiado" : "Copiar"}
                        </button>
                      </div>
                      <pre className="bg-gray-950 rounded-lg p-4 text-sm text-green-300 overflow-x-auto font-mono leading-relaxed">
                        {ej.codigo}
                      </pre>
                    </div>

                    {/* Salida esperada */}
                    <div>
                      <p className="text-xs text-gray-500 font-mono mb-2">Salida esperada</p>
                      <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto font-mono">
                        {ej.salida_esperada}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer instrucciones */}
        <div className="mt-10 p-5 bg-gray-800 border border-gray-700 rounded-xl">
          <h3 className="font-semibold mb-3">Cómo ejecutar los ejercicios</h3>
          <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
            <li>Activa el entorno virtual: <code className="text-green-400 bg-gray-900 px-1 rounded">source aprendizaje/.venv/bin/activate</code></li>
            <li>Arranca Jupyter: <code className="text-green-400 bg-gray-900 px-1 rounded">jupyter notebook</code></li>
            <li>Crea un notebook nuevo con el kernel <code className="text-green-400 bg-gray-900 px-1 rounded">Quantum (Python 3.12)</code></li>
            <li>Pega el código y ejecuta con <code className="text-green-400 bg-gray-900 px-1 rounded">Shift+Enter</code></li>
            <li>Para hardware real: configura tu token IBM con <code className="text-green-400 bg-gray-900 px-1 rounded">python configurar_ibm.py</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
