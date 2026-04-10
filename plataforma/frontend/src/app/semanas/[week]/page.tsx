import Link from "next/link";

type Recurso = { nombre: string; tipo: string; url: string; prioridad: string };
type SemanaData = {
  titulo: string;
  objetivo: string;
  porQueImporta: string;
  dificultad: number;
  horas: string;
  conceptos: string[];
  recursos: Recurso[];
  ejercicios: string[];
  refuerzo: string[];
  hito: string;
  checklist: string[];
  errores: { error: string; correccion: string }[];
  preguntas: string[];
  entregable: string;
};

const SEMANAS: Record<number, SemanaData> = {
  1: {
    titulo: "Fundamentos matemáticos",
    objetivo: "Dominar el álgebra lineal mínima para representar estados cuánticos: vectores complejos, matrices, producto interno y matrices unitarias.",
    porQueImporta: "Sin estos fundamentos, los capítulos siguientes son manipulación ciega de símbolos. Esta semana es la diferencia entre entender computación cuántica y solo ejecutar código que alguien más escribió. Para alguien con NumPy, el 70% será formalizar intuición que ya tienes.",
    dificultad: 2,
    horas: "10-13 horas",
    conceptos: [
      "Espacio vectorial complejo",
      "Números complejos (módulo, conjugado)",
      "Producto interno ⟨u|v⟩",
      "Base ortonormal {|0⟩, |1⟩}",
      "Matrices unitarias U†U = I",
      "Notación bra-ket: |ψ⟩ y ⟨ψ|",
    ],
    recursos: [
      { nombre: "3Blue1Brown — Essence of Linear Algebra (caps. 1,2,3,7)", tipo: "Vídeo YouTube", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", prioridad: "Imprescindible" },
      { nombre: "IBM Quantum Learning — Mathematical Prerequisites", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Quantum Country — Capítulo 1", tipo: "Ensayo con spaced repetition", url: "https://quantum.country", prioridad: "Imprescindible" },
      { nombre: "Khan Academy — Álgebra Lineal", tipo: "Ejercicios interactivos", url: "https://www.khanacademy.org/math/linear-algebra", prioridad: "Opcional (si 3B1B es muy rápido)" },
    ],
    ejercicios: [
      "Crear |0⟩=[1,0] y |1⟩=[0,1] en NumPy y verificar ortogonalidad con producto interno",
      "Construir |ψ⟩ = α|0⟩ + β|1⟩ con α=β=1/√2 y verificar norma = 1",
      "Crear estado con amplitudes complejas: α=(1+i)/2, β=(1-i)/2 — verificar validez",
      "Verificar que la puerta Hadamard es unitaria: calcular H†H y comparar con I",
      "Implementar es_valido_estado(v) y probarla con 5 vectores distintos",
    ],
    refuerzo: [
      "Dado |ψ⟩=(√3/2)|0⟩+(1/2)|1⟩, calcula la norma. ¿Cuánto vale P(|0⟩)?",
      "Construye manualmente una matriz unitaria 2×2 distinta de H y verifica U†U=I",
      "Calcula ⟨ψ|φ⟩ para dos estados en superposición distintos. ¿Qué significa ese valor?",
      "Explica con tus palabras por qué las amplitudes deben ser complejas",
    ],
    hito: "Puedes crear cualquier estado |ψ⟩ = α|0⟩ + β|1⟩ en NumPy, verificar su validez, calcular probabilidades de medición, verificar unitaridad de una matriz, y explicar por qué las amplitudes son complejas.",
    checklist: [
      "Capítulos 1, 2, 3 y 7 de Essence of Linear Algebra vistos",
      "Quantum Country capítulo 1 completado (incluidas las preguntas de retención)",
      "IBM Quantum Learning prerequisites completado",
      "Ejercicios 1.1 a 1.5 ejecutados y comentados en Jupyter",
      "Mini reto es_valido_estado() implementado y probado con 5 casos",
      "Preguntas de autoevaluación respondidas por escrito en el notebook",
      "Notebook semana01 guardado y nombrado correctamente",
    ],
    errores: [
      { error: "Usar H.T en lugar de H.conj().T para el dagger (†)", correccion: "El dagger es conjugado Y transpuesto. Siempre: H.conj().T" },
      { error: "No verificar la normalización del estado", correccion: "Añade assert abs(np.linalg.norm(s)-1) < 1e-10 en todo tu código esta semana" },
      { error: "Confundir amplitud con probabilidad", correccion: "Post-it en el monitor: P(x) = |amplitud|² — no la amplitud directamente" },
      { error: "No entender por qué las amplitudes son complejas", correccion: "Lee la sección de interferencia en Quantum Country antes de continuar" },
    ],
    preguntas: [
      "¿Qué condición matemática debe cumplir un vector para ser un estado cuántico válido?",
      "¿Por qué necesitamos números complejos en computación cuántica y no bastan los reales?",
      "¿Qué propiedad define una matriz unitaria y qué implica físicamente?",
      "¿Qué significa ⟨ψ|φ⟩ = 0 en términos físicos?",
      "¿Cuál es la diferencia entre la amplitud α y la probabilidad de medir |0⟩?",
    ],
    entregable: "semana01_fundamentos_matematicos.ipynb con los 5 ejercicios resueltos y comentados, el mini reto implementado, y una celda Markdown de reflexión explicando con tus palabras qué es un estado cuántico válido y por qué las amplitudes son complejas.",
  },

  2: {
    titulo: "Superposición y medición",
    objetivo: "Establecer el puente entre álgebra lineal y los conceptos cuánticos reales: superposición, postulado de medición, colapso e incertidumbre.",
    porQueImporta: "Esta es la semana más conceptualmente desafiante del programa — no matemáticamente, sino filosóficamente. La mecánica cuántica desafía la intuición clásica de formas irreducibles. Comprender esto con rigor es lo que separa a quien puede usar Qiskit de quien entiende por qué hace lo que hace.",
    dificultad: 3,
    horas: "9-11 horas",
    conceptos: [
      "Superposición cuántica (sin el gato de Schrödinger)",
      "Postulado de medición: P = |⟨resultado|ψ⟩|²",
      "Colapso de la función de onda",
      "Principio de indeterminación de Heisenberg",
      "Esfera de Bloch: θ y φ",
      "Estado puro vs mezcla estadística",
    ],
    recursos: [
      { nombre: "Quantum Country — Capítulos 1 y 2", tipo: "Ensayo con spaced repetition", url: "https://quantum.country", prioridad: "Imprescindible" },
      { nombre: "IBM Quantum Learning — Basics of Quantum Information: Single Systems", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Quantum Computing for Computer Scientists — Microsoft Research", tipo: "Vídeo YouTube (80 min)", url: "https://www.youtube.com/watch?v=F_Riqjdh2oM", prioridad: "Imprescindible" },
      { nombre: "PBS Space Time — Quantum Measurement", tipo: "Vídeo YouTube", url: "https://www.youtube.com/watch?v=GkvvS8Y8nAw", prioridad: "Recomendado" },
      { nombre: "Looking Glass Universe — Superposition Explained", tipo: "Vídeo YouTube", url: "https://www.youtube.com/c/LookingGlassUniverse", prioridad: "Recomendado" },
    ],
    ejercicios: [
      "Implementar medir_qubit(alpha, beta, n) que simula n mediciones con numpy.random.choice",
      "Visualizar la Esfera de Bloch en 3D con matplotlib y localizar 5 estados clave",
      "Implementar conversion: ángulos (θ,φ) → amplitudes (α,β) usando |ψ⟩=cos(θ/2)|0⟩+e^{iφ}sin(θ/2)|1⟩",
      "Verificar que la norma siempre es 1 para cualquier θ∈[0,π] y φ∈[0,2π)",
    ],
    refuerzo: [
      "Si α=√3/2 y β=1/2, ¿cuál es P(medir |0⟩)?",
      "¿Puede un qubit estar en el estado 0.9|0⟩ + 0.9|1⟩? ¿Por qué?",
      "¿Cuál es la diferencia entre 'el qubit está en superposición' y 'no sé en qué estado está'?",
      "¿Qué ocurre al medir |0⟩ repetidas veces? ¿Y |+⟩ repetidas veces?",
    ],
    hito: "Puedes describir la superposición cuántica sin usar la analogía del gato de Schrödinger, calcular P(resultado) para cualquier estado y base de medición, y localizar cualquier estado puro de 1 qubit en la Esfera de Bloch.",
    checklist: [
      "Quantum Country capítulos 1 y 2 completados con todas las preguntas respondidas",
      "IBM Quantum Learning 'Single Systems' completado",
      "Vídeo de Microsoft Research visto completo (80 min)",
      "Función medir_qubit() implementada y probada con 10.000 shots",
      "Esfera de Bloch visualizada con matplotlib 3D mostrando |0⟩,|1⟩,|+⟩,|-⟩,|i⟩",
      "Conversión ángulos→amplitudes implementada y verificada",
      "Preguntas de autoevaluación respondidas por escrito",
    ],
    errores: [
      { error: "Pensar que superposición = 'estar en los dos estados a la vez'", correccion: "La superposición ES el estado del sistema. No hay dos estados simultáneos." },
      { error: "Pensar que el colapso depende del observador", correccion: "El colapso es un proceso físico real, no epistémico. El observador no importa." },
      { error: "Confundir base de medición con estado", correccion: "Se puede medir en cualquier base. La base computacional {|0⟩,|1⟩} es solo la más común." },
      { error: "Creer que la incertidumbre es por imprecisión del instrumento", correccion: "La indeterminación es intrínseca al sistema físico, no al instrumento de medida." },
    ],
    preguntas: [
      "¿Qué significa que el estado cuántico sea la descripción completa del sistema?",
      "Dado |ψ⟩=(1+i)/2·|0⟩+(1-i)/2·|1⟩, ¿cuál es P(medir 0)?",
      "¿En qué punto de la Esfera de Bloch está |+⟩=(|0⟩+|1⟩)/√2?",
      "¿Por qué |α|²+|β|²=1 es una condición física y no solo matemática?",
      "¿Qué ocurre si mides un qubit en estado |0⟩ repetidas veces? ¿Y si está en |+⟩?",
    ],
    entregable: "semana02_superposicion_medicion.ipynb con función de medición, Esfera de Bloch interactiva con 5 estados, y una celda Markdown que explique la diferencia entre superposición cuántica e incertidumbre clásica.",
  },

  3: {
    titulo: "El qubit: física, representación e instalación de Qiskit",
    objetivo: "Anclar los conceptos matemáticos en sistemas físicos reales, entender implementaciones del qubit, dominar la Esfera de Bloch como herramienta operacional, instalar Qiskit y ejecutar el primer circuito.",
    porQueImporta: "Hasta aquí has trabajado con vectores abstractos. Esta semana aterrizas esos conceptos en fotones, electrones e iones. Entender los sistemas físicos te da intuición sobre por qué el ruido y la decoherencia son problemas fundamentales — que verás en la semana 8.",
    dificultad: 2,
    horas: "10-12 horas",
    conceptos: [
      "Qubit superconductor (IBM Quantum)",
      "Qubit de ion atrapado",
      "Qubit fotónico",
      "Decoherencia y tiempo de coherencia T1/T2",
      "Era NISQ (Noisy Intermediate-Scale Quantum)",
      "AerSimulator: primer simulador",
    ],
    recursos: [
      { nombre: "IBM Quantum Learning — What is a Qubit? + Hardware", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Veritasium — How do quantum computers work?", tipo: "Vídeo YouTube (18 min)", url: "https://www.youtube.com/watch?v=jHoEjvuPoB8", prioridad: "Imprescindible" },
      { nombre: "Documentación Qiskit — Getting Started", tipo: "Documentación oficial", url: "https://docs.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "IBM Quantum Composer", tipo: "Simulador visual online", url: "https://quantum.ibm.com/composer", prioridad: "Recomendado" },
      { nombre: "Quirk — Quantum Circuit Simulator", tipo: "Simulador visual online", url: "https://algassert.com/quirk", prioridad: "Recomendado" },
    ],
    ejercicios: [
      "Instalar Qiskit: pip install qiskit qiskit-aer qiskit-ibm-runtime matplotlib pylatexenc",
      "Verificar instalación: import qiskit; print(qiskit.__version__)",
      "Crear un circuito de 1 qubit, medirlo y ejecutarlo con AerSimulator (1000 shots)",
      "Aplicar puerta X al qubit y verificar que el resultado cambia de |0⟩ a |1⟩",
      "Visualizar el estado |0⟩ y |+⟩ en la Esfera de Bloch con plot_bloch_multivector",
    ],
    refuerzo: [
      "¿Cuál es la diferencia entre un qubit superconductor y uno fotónico?",
      "¿Por qué el tiempo de coherencia limita la profundidad máxima de un circuito?",
      "Predice matemáticamente el resultado de medir |+⟩. Luego verifica con Qiskit.",
      "¿Qué significa NISQ y por qué importa para los algoritmos que diseñamos hoy?",
    ],
    hito: "Qiskit instalado y funcionando, primer circuito ejecutado en el simulador, visualización de estados en la Esfera de Bloch operativa, y capacidad de explicar al menos 3 implementaciones físicas de qubits.",
    checklist: [
      "Qiskit instalado correctamente (sin errores de importación)",
      "AerSimulator ejecutando circuitos sin errores",
      "Kernel 'Quantum (Python 3.12)' disponible en Jupyter",
      "Circuito básico con medición ejecutado y resultados analizados",
      "Puerta X aplicada y resultado verificado",
      "Esfera de Bloch visualizada para |0⟩, |1⟩ y |+⟩",
      "Vídeo de Veritasium visto",
    ],
    errores: [
      { error: "Instalar Qiskit en el entorno global en lugar del venv", correccion: "Siempre activar el venv antes: source .venv/bin/activate" },
      { error: "Confundir qiskit con qiskit-aer", correccion: "Qiskit es el framework; Aer es el simulador. Necesitas ambos instalados." },
      { error: "No entender por qué el simulador da exactamente {'0': 1000}", correccion: "El estado inicial es siempre |0⟩. Sin puertas, siempre mides 0." },
      { error: "Decoherencia confundida con error de medición", correccion: "Decoherencia = pérdida del estado cuántico por interacción con el entorno (distinto al error de lectura)." },
    ],
    preguntas: [
      "¿Cuáles son las 3 principales tecnologías de implementación de qubits y sus trade-offs?",
      "¿Qué es T1 y T2? ¿Cuál limita la profundidad del circuito?",
      "¿Por qué el simulador AerSimulator da resultados perfectos que el hardware real no da?",
      "¿Qué ocurre si aplicas la puerta X dos veces seguidas? ¿Por qué?",
      "¿Cómo se representa |+⟩ en la Esfera de Bloch? ¿Y |-⟩?",
    ],
    entregable: "semana03_qubit_qiskit.ipynb con instalación verificada, circuito básico ejecutado, puerta X aplicada y verificada, y Esfera de Bloch con 3 estados distintos.",
  },

  4: {
    titulo: "Puertas cuánticas de un solo qubit",
    objetivo: "Dominar el conjunto completo de puertas de un qubit: representación matricial, interpretación geométrica en la Esfera de Bloch, y aplicación fluida en Qiskit.",
    porQueImporta: "Las puertas de un qubit son el vocabulario básico de la computación cuántica. Sin dominarlas con fluidez, los algoritmos de las semanas 9-10 serán incomprensibles. Además, las relaciones entre puertas (HZH=X, H²=I) revelan la estructura algebraica profunda del sistema.",
    dificultad: 3,
    horas: "10-12 horas",
    conceptos: [
      "Puertas Pauli: X (NOT), Y, Z",
      "Puerta Hadamard H: crea superposición",
      "Puertas de fase: S (π/2) y T (π/4)",
      "Puertas de rotación: Rx(θ), Ry(θ), Rz(θ)",
      "Universalidad: {H, T, CNOT} es suficiente",
      "Identidades: HZH=X, H²=I, S²=Z, T²=S",
    ],
    recursos: [
      { nombre: "IBM Quantum Learning — Single-Qubit Gates", tipo: "Curso interactivo con Esfera animada", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Qiskit Textbook — Chapter 2: Quantum Circuits", tipo: "Documentación interactiva", url: "https://qiskit.org/learn", prioridad: "Imprescindible" },
      { nombre: "IBM Quantum Composer — explorar puertas visualmente", tipo: "Simulador visual", url: "https://quantum.ibm.com/composer", prioridad: "Recomendado" },
      { nombre: "Quirk — visualizar efectos de puertas en tiempo real", tipo: "Simulador visual", url: "https://algassert.com/quirk", prioridad: "Recomendado" },
    ],
    ejercicios: [
      "Aplicar X, Y, Z, H al estado |0⟩ y visualizar cada resultado en la Esfera de Bloch",
      "Verificar algebraicamente HZH=X: calcular con matrices NumPy y comparar",
      "Implementar rotaciones Rx(θ) para θ=0, π/4, π/2, π y visualizar la trayectoria",
      "Crear secuencia H→S→H y verificar qué puerta equivale a esa composición",
      "Encontrar 5 secuencias distintas de puertas que transformen |0⟩ en |1⟩",
    ],
    refuerzo: [
      "Verifica algebraicamente H·X·H = Z",
      "¿Cuántas veces hay que aplicar S para obtener Z?",
      "¿Cuántas veces hay que aplicar T para obtener S?",
      "Implementa con Qiskit una secuencia que lleve |0⟩ al polo sur usando solo {H, Z}",
    ],
    hito: "Puedes implementar cualquier puerta de un qubit en Qiskit, visualizar su efecto en la Esfera de Bloch, y demostrar algebraicamente relaciones entre puertas (HZH=X, S²=Z, etc.).",
    checklist: [
      "IBM Quantum Learning 'Single-Qubit Gates' completado",
      "Todas las puertas Pauli (X,Y,Z) aplicadas y visualizadas",
      "Puerta Hadamard comprendida geométricamente",
      "Puertas S y T aplicadas y entendidas como fracciones de Z",
      "Identidad HZH=X verificada algebraicamente",
      "5 secuencias distintas que llevan |0⟩ a |1⟩ implementadas",
      "Rotaciones Rx(θ) para 4 ángulos distintos visualizadas",
    ],
    errores: [
      { error: "Pensar que la puerta Z no hace nada visible al medir en la base {|0⟩,|1⟩}", correccion: "Z cambia la fase relativa. Invisible en base Z, crucial en base X (después de Hadamard)." },
      { error: "Confundir H² con 2H", correccion: "H²=I (aplicar H dos veces = identidad). No es multiplicar la matriz por 2." },
      { error: "No entender por qué importan las fases complejas", correccion: "Las fases no afectan las probabilidades de medición directa, pero sí crean interferencia en circuitos más largos." },
    ],
    preguntas: [
      "¿Qué hace geométricamente la puerta Hadamard en la Esfera de Bloch?",
      "¿Por qué HZH = X? Explica geométricamente sin usar matrices.",
      "¿Cuál es la diferencia entre una puerta de fase y una puerta de bit-flip?",
      "¿Por qué el conjunto {H, T, CNOT} es universal para la computación cuántica?",
      "Si aplicas Rx(π) al estado |0⟩, ¿qué obtienes? ¿Es igual a X?",
    ],
    entregable: "semana04_puertas_un_qubit.ipynb con todas las puertas aplicadas y visualizadas, identidades algebraicas verificadas, y las 5 secuencias distintas para llevar |0⟩ a |1⟩.",
  },

  5: {
    titulo: "Sistemas multi-qubit, producto tensorial y entrelazamiento",
    objetivo: "Extender el formalismo a múltiples qubits, dominar el producto tensorial, implementar CNOT y los estados de Bell, y comprender el entrelazamiento como recurso computacional.",
    porQueImporta: "La ventaja cuántica no viene de un qubit solo. Viene de múltiples qubits entrelazados. Esta semana introduce el concepto más 'cuánticamente' no clásico del programa: el entrelazamiento. Sin él no hay ventaja cuántica. Además, el teorema de no-clonación es la base de la seguridad en QKD.",
    dificultad: 4,
    horas: "11-14 horas",
    conceptos: [
      "Producto tensorial ⊗ y np.kron()",
      "Espacio de 2 qubits: dimensión 2²=4",
      "Estado separable vs estado entrelazado",
      "Los 4 estados de Bell (máximo entrelazamiento)",
      "Puerta CNOT (controlled-NOT)",
      "Teorema de no-clonación cuántica",
      "Teleportación cuántica (concepto)",
    ],
    recursos: [
      { nombre: "IBM Quantum Learning — Multiple Systems", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Qiskit Textbook — Bell States y Entanglement", tipo: "Documentación con notebooks", url: "https://qiskit.org/learn", prioridad: "Imprescindible" },
      { nombre: "PBS Space Time — Entanglement", tipo: "Vídeo YouTube", url: "https://www.youtube.com/watch?v=ZuvK-od647c", prioridad: "Recomendado" },
      { nombre: "Open Quantum Safe — BB84 QKD intro", tipo: "Repositorio educativo", url: "https://openquantumsafe.org", prioridad: "Recomendado (ciberseguridad)" },
    ],
    ejercicios: [
      "Calcular manualmente |00⟩, |01⟩, |10⟩, |11⟩ usando np.kron()",
      "Crear el estado de Bell |Φ+⟩=(|00⟩+|11⟩)/√2 y demostrar que no es separable",
      "Implementar los 4 estados de Bell en Qiskit y verificar con Statevector",
      "Simular |Φ+⟩ con 10.000 shots: verificar que solo salen '00' y '11'",
      "Mini proyecto: implementar teleportación cuántica completa de un estado arbitrario",
    ],
    refuerzo: [
      "¿Es separable el estado (|00⟩+|01⟩+|10⟩+|11⟩)/2? Justifica.",
      "Crea el estado |GHZ₃⟩=(|000⟩+|111⟩)/√2 con 3 qubits en Qiskit.",
      "¿Por qué el teorema de no-clonación hace segura la QKD?",
      "¿Cuál es el estado de Bell |Ψ-⟩? ¿Cómo se crea con Qiskit?",
    ],
    hito: "Puedes crear los 4 estados de Bell en Qiskit, demostrar que no son separables (no factorizables), explicar el teorema de no-clonación y su relevancia para ciberseguridad, e implementar teleportación cuántica completa.",
    checklist: [
      "Producto tensorial con np.kron() implementado y comprendido",
      "4 estados de Bell creados y verificados con Statevector",
      "Demostración algebraica de no-separabilidad de |Φ+⟩",
      "Simulación de |Φ+⟩ con 10.000 shots — solo '00' y '11'",
      "Estado GHZ de 3 qubits implementado",
      "Teleportación cuántica implementada y verificada",
      "Conexión con QKD documentada en celda Markdown",
    ],
    errores: [
      { error: "Pensar que el entrelazamiento permite comunicación instantánea", correccion: "Las correlaciones son instantáneas, pero no se puede transmitir información más rápido que la luz." },
      { error: "Confundir estado entrelazado con dos qubits correlacionados clásicamente", correccion: "Las correlaciones cuánticas violan las desigualdades de Bell — son fundamentalmente distintas de las clásicas." },
      { error: "Error con el orden de qubits en Qiskit (little-endian)", correccion: "Qiskit usa little-endian: el qubit 0 es el bit menos significativo del resultado medido." },
    ],
    preguntas: [
      "¿Qué es el producto tensorial y cómo se relaciona con np.kron()?",
      "¿Cuál es la diferencia entre un estado separable y uno entrelazado?",
      "¿Por qué |Φ+⟩=(|00⟩+|11⟩)/√2 no puede escribirse como |a⟩⊗|b⟩?",
      "¿Qué establece el teorema de no-clonación y por qué es relevante para ciberseguridad?",
      "En la teleportación cuántica, ¿por qué son necesarios 2 bits clásicos de comunicación?",
    ],
    entregable: "semana05_entrelazamiento.ipynb con los 4 estados de Bell implementados y verificados, demostración de no-separabilidad, estado GHZ generalizado, y teleportación cuántica completa documentada.",
  },

  6: {
    titulo: "Circuitos cuánticos completos y evaluación intermedia",
    objetivo: "Construir circuitos cuánticos completos con múltiples qubits, entender la medición parcial y las puertas controladas generales. Completar la evaluación intermedia del programa.",
    porQueImporta: "Esta es la semana de síntesis. Los conceptos de S1-S5 confluyen en circuitos cuánticos reales. La evaluación intermedia no es punitiva: es una herramienta de calibración. Si no llegas al 70%, el programa te dice exactamente qué reforzar.",
    dificultad: 3,
    horas: "10-14 horas (incluye 3-4h de evaluación)",
    conceptos: [
      "Circuito cuántico: init → operación → medición",
      "Medición parcial de un subconjunto de qubits",
      "Puerta Toffoli (CCX): controlada por 2 qubits",
      "Estado GHZ generalizado a n qubits",
      "Barreras y visualización profesional de circuitos",
      "Evaluación intermedia: teoría + cálculo + código",
    ],
    recursos: [
      { nombre: "IBM Quantum Learning — Quantum Circuits (módulo completo)", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Qiskit Textbook — Chapter 2 completo", tipo: "Documentación con notebooks", url: "https://qiskit.org/learn", prioridad: "Imprescindible" },
      { nombre: "Qiskit docs — QuantumCircuit API Reference", tipo: "Documentación oficial", url: "https://docs.quantum.ibm.com", prioridad: "Recomendado" },
    ],
    ejercicios: [
      "Crear estado GHZ generalizado para n=2,3,4,5 qubits",
      "Aplicar medición parcial: medir solo el qubit 0 de un estado GHZ₃",
      "Usar la puerta Toffoli (CCX) en un circuito de 3 qubits",
      "Evaluación Sección A (Teoría): 3 preguntas, 30 puntos — 1h",
      "Evaluación Sección B (Cálculo): 3 problemas, 40 puntos — 1h",
      "Evaluación Sección C (Código): 2 circuitos, 30 puntos — 1.5h",
    ],
    refuerzo: [
      "¿Qué ocurre al medir solo el qubit 0 de |Φ+⟩? ¿En qué estado queda el qubit 1?",
      "Implementa la puerta SWAP usando solo puertas CNOT (necesitas 3 CNOTs)",
      "Crea un circuito que prepare el estado |W₃⟩=(|001⟩+|010⟩+|100⟩)/√3",
    ],
    hito: "Evaluación intermedia completada con ≥70%. Puedes construir circuitos de 3+ qubits, aplicar medición parcial, usar la puerta Toffoli y explicar el colapso parcial del estado.",
    checklist: [
      "Estado GHZ implementado para n=3,4,5 correctamente",
      "Medición parcial implementada y resultado analizado",
      "Puerta Toffoli (CCX) usada en al menos un circuito",
      "Evaluación Sección A completada (teoría)",
      "Evaluación Sección B completada (cálculo)",
      "Evaluación Sección C completada (código)",
      "Puntuación total ≥70 puntos sobre 100",
    ],
    errores: [
      { error: "Avanzar a S7 sin completar la evaluación intermedia", correccion: "La evaluación es un check de calibración. Si no llegas al 70%, identifica las secciones más débiles y refuérzalas antes de continuar." },
      { error: "No entender la medición parcial", correccion: "Al medir un qubit de un estado entrelazado, el estado del resto colapsa. Practica con |Φ+⟩." },
    ],
    preguntas: [
      "¿Qué ocurre con el estado del qubit 1 cuando mides el qubit 0 de |Φ+⟩ y obtienes 0?",
      "¿Cuál es la diferencia entre la puerta CNOT y la puerta Toffoli?",
      "¿Cómo implementarías la puerta SWAP usando solo CNOTs?",
      "Describe la estructura general de un circuito cuántico completo.",
    ],
    entregable: "semana06_evaluacion_intermedia.ipynb con los 3 ejercicios principales implementados y el notebook de evaluación completado con las 3 secciones respondidas y puntuación calculada.",
  },

  7: {
    titulo: "Qiskit profundo: simulación, transpilación y herramientas avanzadas",
    objetivo: "Dominar el ecosistema Qiskit completo: simulación en sus 3 modos, transpilación con optimización, circuitos parametrizados y análisis de estados con qiskit.quantum_info.",
    porQueImporta: "Esta semana transforma conocimiento conceptual en habilidad técnica real. Qiskit es el estándar de facto para computación cuántica práctica. A partir de aquí, el código es el principal medio de aprendizaje. Aprender a navegar la documentación oficial vale más que cualquier tutorial.",
    dificultad: 3,
    horas: "10-12 horas",
    conceptos: [
      "AerSimulator: modos statevector, QASM, unitary",
      "Statevector: simulación exacta sin shots",
      "Transpilación: niveles de optimización 0-3",
      "Circuitos parametrizados con Parameter y ParameterVector",
      "DensityMatrix y partial_trace",
      "Entropía de entrelazamiento",
      "Operadores y matrices unitarias de circuitos",
    ],
    recursos: [
      { nombre: "Documentación oficial Qiskit — API Reference completo", tipo: "Documentación oficial", url: "https://docs.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "IBM Quantum Learning — Advanced Quantum Circuits", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "GitHub: qiskit/qiskit-tutorials", tipo: "Repositorio de notebooks", url: "https://github.com/qiskit/qiskit-tutorials", prioridad: "Recomendado" },
      { nombre: "Qiskit YouTube — Coding with Qiskit series", tipo: "Vídeos", url: "https://www.youtube.com/@qiskit", prioridad: "Recomendado" },
    ],
    ejercicios: [
      "Simular el estado Bell con los 3 modos: Statevector, QASM (10k shots), Operator",
      "Crear un circuito parametrizado con Parameter('θ') y asignar 4 valores distintos",
      "Transpilar un circuito con Toffoli a puertas básicas — comparar profundidad con niveles 0,1,2,3",
      "Calcular la entropía de entrelazamiento de |Φ+⟩ usando DensityMatrix y partial_trace",
      "Medir el tiempo de ejecución de distintos modos de simulación con timeit",
    ],
    refuerzo: [
      "¿Cuándo usar Statevector vs QASM simulator? ¿Cuáles son los trade-offs?",
      "Crea un ParameterVector de 3 ángulos y úsalo para un circuito variacional simple",
      "Transpila el estado GHZ de 5 qubits y analiza qué puertas básicas usa el backend",
    ],
    hito: "Puedes usar los 3 modos de simulación de Aer, crear circuitos parametrizados y asignarles valores, transpilar con distintos niveles de optimización, y analizar el entrelazamiento con DensityMatrix.",
    checklist: [
      "3 modos de simulación de Aer usados y diferenciados",
      "Circuito parametrizado implementado con Parameter",
      "Transpilación ejecutada con niveles 0,1,2,3 y profundidades comparadas",
      "DensityMatrix y partial_trace usados para analizar entrelazamiento",
      "Entropía de entrelazamiento calculada para al menos 2 estados distintos",
      "Documentación oficial de Qiskit navegada de forma autónoma",
    ],
    errores: [
      { error: "Buscar en Google antes que en la documentación oficial", correccion: "La documentación oficial en docs.quantum.ibm.com es la fuente de verdad. Úsala como primer recurso." },
      { error: "Confundir transpilación con compilación clásica", correccion: "La transpilación descompone puertas de alto nivel a las puertas nativas del backend y optimiza la profundidad del circuito." },
      { error: "No entender la diferencia entre Statevector y QASM", correccion: "Statevector da el vector exacto (sin ruido, sin shots). QASM simula mediciones con shots finitos." },
    ],
    preguntas: [
      "¿Cuándo usarías Statevector simulator vs QASM simulator?",
      "¿Qué es la transpilación y por qué es necesaria para ejecutar en hardware real?",
      "¿Qué información extra da DensityMatrix respecto a Statevector?",
      "¿Qué significa una entropía de entrelazamiento de 1.0 entre dos qubits?",
      "¿Por qué los circuitos parametrizados son importantes para algoritmos variacionales (VQE, QAOA)?",
    ],
    entregable: "semana07_qiskit_profundo.ipynb con los 3 modos de simulación demostrados, circuito parametrizado implementado, análisis de transpilación con 4 niveles, y entropía de entrelazamiento calculada.",
  },

  8: {
    titulo: "IBM Quantum real: hardware, ruido y mitigación de errores",
    objetivo: "Ejecutar circuitos en hardware cuántico real de IBM, entender los tipos de ruido en sistemas NISQ, simular ruido realista con Aer y aplicar Zero-Noise Extrapolation (ZNE) básico.",
    porQueImporta: "El hardware cuántico actual es ruidoso e imperfecto. Entender esto es esencial para diseñar circuitos que funcionen en hardware real, evaluar de forma realista las capacidades actuales, y entender por qué la corrección de errores cuánticos es un campo de investigación activo.",
    dificultad: 3,
    horas: "10-12 horas",
    conceptos: [
      "IBM Quantum Platform: acceso gratuito a hardware real",
      "Tipos de ruido: T1 (relajación), T2 (decoherencia de fase)",
      "Error de puerta (gate error) y error de medición (readout error)",
      "NoiseModel con depolarizing_error y thermal_relaxation_error",
      "Zero-Noise Extrapolation (ZNE): mitigación básica",
      "Fidelidad del circuito",
      "Qiskit Runtime: nueva API para hardware IBM",
    ],
    recursos: [
      { nombre: "IBM Quantum Platform — Cuenta gratuita + API Token", tipo: "Plataforma cloud", url: "https://quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "IBM Quantum Learning — Noise in Quantum Computers", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Qiskit Runtime Documentation", tipo: "Documentación oficial", url: "https://docs.quantum.ibm.com/api/qiskit-ibm-runtime", prioridad: "Imprescindible" },
      { nombre: "IBM Research Blog — Quantum Computing", tipo: "Blog técnico", url: "https://research.ibm.com/blog/quantum", prioridad: "Recomendado" },
    ],
    ejercicios: [
      "Configurar IBM Quantum: QiskitRuntimeService.save_account(token='TU_TOKEN')",
      "Listar backends disponibles y seleccionar el menos ocupado con service.least_busy()",
      "Crear un NoiseModel con depolarizing_error y comparar resultados con el ideal",
      "Aplicar Zero-Noise Extrapolation (ZNE) básico con 3 niveles de ruido escalado",
      "Ejecutar el estado de Bell en hardware real de IBM y comparar con el simulador",
    ],
    refuerzo: [
      "¿Cuál es la diferencia entre T1 y T2? ¿Cuál limita más la profundidad del circuito?",
      "Simula un circuito con readout_error=5% y compara los resultados",
      "¿Por qué la puerta CNOT tiene mayor error que las puertas de 1 qubit?",
    ],
    hito: "Cuenta IBM Quantum activa y configurada, al menos un circuito ejecutado en hardware real, modelo de ruido creado con NoiseModel, y ZNE básico aplicado con mejora medible.",
    checklist: [
      "Cuenta IBM Quantum creada en quantum.ibm.com",
      "API Token obtenido y configurado con QiskitRuntimeService.save_account()",
      "Backends disponibles listados y analizados",
      "NoiseModel con depolarizing_error creado y aplicado",
      "Comparación ideal vs ruidoso documentada con métricas",
      "ZNE aplicado con 3 niveles de ruido y resultado extrapolado",
      "Al menos 1 circuito ejecutado en hardware real de IBM",
    ],
    errores: [
      { error: "No tener el token de IBM Quantum configurado", correccion: "Ve a quantum.ibm.com → Account Settings → API Token → Copy. Luego ejecuta configurar_ibm.py" },
      { error: "Esperar resultados instantáneos del hardware real", correccion: "Los trabajos en hardware real tienen cola. Pueden tardar minutos u horas. Guarda el job_id." },
      { error: "Comparar un circuito no transpilado con el hardware real", correccion: "Siempre transpilar antes de enviar al hardware: qc_t = transpile(qc, backend, optimization_level=1)" },
    ],
    preguntas: [
      "¿Qué es el error de depolarización y cómo lo modela NoiseModel?",
      "¿Por qué los resultados en hardware real difieren del simulador ideal?",
      "¿Qué es Zero-Noise Extrapolation y cómo reduce el efecto del ruido?",
      "¿Cuándo usarías el simulador con noise_model vs el hardware real?",
      "¿Qué información da el 'calibration data' de un backend de IBM Quantum?",
    ],
    entregable: "semana08_ibm_quantum_ruido.ipynb con configuración IBM verificada, comparación ideal vs ruidoso con métricas, ZNE implementado y resultados de hardware real documentados.",
  },

  9: {
    titulo: "Algoritmos cuánticos parte 1: Deutsch-Jozsa, Bernstein-Vazirani y Simon",
    objetivo: "Implementar los primeros algoritmos cuánticos con ventaja demostrada sobre la computación clásica y entender el concepto de oráculo cuántico.",
    porQueImporta: "Estos algoritmos no son ejercicios académicos: son la demostración más limpia de la ventaja cuántica. El speedup se vuelve concreto y verificable. Además, son los predecesores directos del algoritmo de Shor — entender Simon es entender la lógica de por qué Shor puede romper RSA.",
    dificultad: 4,
    horas: "11-14 horas",
    conceptos: [
      "Oráculo cuántico: implementar funciones clásicas en superposición",
      "Deutsch-Jozsa: O(1) vs O(2^(n-1)+1) clásico (ventaja exponencial)",
      "Bernstein-Vazirani: O(1) vs O(n) clásico (ventaja lineal)",
      "Algoritmo de Simon: ventaja exponencial sobre cualquier clásico",
      "Kick-back de fase (phase kickback)",
      "Paralelismo cuántico mediante superposición",
    ],
    recursos: [
      { nombre: "IBM Quantum Learning — Quantum Algorithms module", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Qiskit Textbook — Quantum Query Algorithms", tipo: "Documentación con notebooks", url: "https://qiskit.org/learn", prioridad: "Imprescindible" },
      { nombre: "Qiskit Tutorials — Deutsch-Jozsa, BV, Simon notebooks", tipo: "Repositorio GitHub", url: "https://github.com/qiskit/qiskit-tutorials", prioridad: "Recomendado" },
      { nombre: "Preskill Lecture Notes — Chapter 1-3", tipo: "Apuntes universitarios gratuitos", url: "https://theory.caltech.edu/~preskill/ph219/", prioridad: "Opcional (profundidad formal)" },
    ],
    ejercicios: [
      "Implementar Deutsch-Jozsa completo para n=3: oráculo constante y oráculo balanceado",
      "Verificar que Deutsch-Jozsa clasifica correctamente en 1 sola consulta",
      "Implementar Bernstein-Vazirani y recuperar el string secreto de 5 bits",
      "Probar BV con 5 strings secretos distintos — verificar 100% de acierto",
      "Implementar la estructura de Simon y explicar el sistema de ecuaciones resultante",
    ],
    refuerzo: [
      "Crea un oráculo para Deutsch-Jozsa que sea balanceado para los inputs con número par de 1s",
      "¿Cuántas consultas necesitaría un algoritmo clásico determinístico para Deutsch-Jozsa?",
      "¿Por qué el algoritmo de Simon requiere múltiples queries (a diferencia de BV)?",
      "Implementa BV para n=8 y verifica que sigue siendo 1 sola consulta",
    ],
    hito: "Puedes implementar Deutsch-Jozsa y Bernstein-Vazirani desde cero, crear oráculos cuánticos para funciones arbitrarias, y explicar matemáticamente por qué estos algoritmos son más eficientes que cualquier algoritmo clásico posible.",
    checklist: [
      "Deutsc-Jozsa implementado para oráculos constante y balanceado",
      "Verificación: DJ clasifica correctamente con 1 consulta en todos los casos",
      "Bernstein-Vazirani implementado y probado con 5 strings secretos distintos",
      "Concepto de oráculo cuántico documentado en Markdown",
      "Phase kickback explicado en el notebook",
      "Conexión con criptografía (Simon→Shor) documentada",
    ],
    errores: [
      { error: "No entender por qué el ancilla empieza en |1⟩", correccion: "El ancilla en |1⟩ + Hadamard = |−⟩ = (|0⟩−|1⟩)/√2. Esto activa el phase kickback que marca el estado objetivo." },
      { error: "Invertir el orden de los bits en el oráculo BV", correccion: "Qiskit usa little-endian. reversed(secret) en el loop del oráculo BV corrige el orden." },
      { error: "Pensar que Deutsch-Jozsa tiene aplicaciones prácticas directas", correccion: "DJ es teóricamente importante (demuestra ventaja cuántica) pero no tiene aplicación práctica directa. Simon sí es precursor de Shor." },
    ],
    preguntas: [
      "¿Qué es un oráculo cuántico y cómo se implementa en Qiskit?",
      "¿Cuál es la ventaja cuántica de Deutsch-Jozsa? ¿Exponencial, cuadrática o lineal?",
      "¿Qué es el phase kickback y por qué es central en estos algoritmos?",
      "¿Por qué el algoritmo de Bernstein-Vazirani solo necesita 1 consulta?",
      "¿Cuál es la conexión entre el algoritmo de Simon y el algoritmo de Shor?",
    ],
    entregable: "semana09_algoritmos_parte1.ipynb con Deutsch-Jozsa y Bernstein-Vazirani implementados desde cero, 5 oráculos distintos probados, y documentación de la conexión Simon→Shor para criptografía.",
  },

  10: {
    titulo: "Grover, Shor conceptual y preparación del proyecto final",
    objetivo: "Implementar el algoritmo de Grover, comprender Shor a nivel de bloques funcionales, y definir el proyecto final que se desarrollará en S11-S12.",
    porQueImporta: "Grover es el algoritmo de búsqueda más importante de la computación cuántica, con aplicación directa en ciberseguridad: reduce la seguridad de AES-128 a AES-64. Shor hace obsoleto RSA con hardware cuántico suficiente. Esta semana conecta directamente con las motivaciones de ciberseguridad del programa.",
    dificultad: 4,
    horas: "11-14 horas",
    conceptos: [
      "Grover: amplificación de amplitud (O(√N) vs O(N) clásico)",
      "Oráculo de Grover: marca el estado objetivo con signo −",
      "Operador de difusión: 2|ψ⟩⟨ψ|−I",
      "Iteraciones óptimas: ≈ π/4·√N",
      "Shor: Transformada de Fourier Cuántica (QFT) + estimación de fase",
      "Implicaciones de Shor para RSA y criptografía asimétrica",
      "Post-quantum cryptography: CRYSTALS-Kyber/Dilithium (NIST)",
    ],
    recursos: [
      { nombre: "IBM Quantum Learning — Grover's Algorithm", tipo: "Curso interactivo", url: "https://learning.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Qiskit Textbook — Grover's Algorithm", tipo: "Documentación con notebooks", url: "https://qiskit.org/learn", prioridad: "Imprescindible" },
      { nombre: "NIST Post-Quantum Cryptography Standards (FIPS 203-206)", tipo: "Estándares gratuitos", url: "https://csrc.nist.gov/projects/post-quantum-cryptography", prioridad: "Recomendado (ciberseguridad)" },
      { nombre: "Biamonte et al. — Quantum Machine Learning (arXiv:1611.09347)", tipo: "Paper de revisión", url: "https://arxiv.org/abs/1611.09347", prioridad: "Opcional (dirección QML)" },
    ],
    ejercicios: [
      "Implementar Grover para N=4 (2 qubits) buscando los 4 estados posibles",
      "Implementar Grover para N=8 (3 qubits) y verificar el número óptimo de iteraciones",
      "Analizar el efecto de demasiadas/pocas iteraciones en la probabilidad de éxito",
      "Estudiar la estructura de Shor: QFT + period finding (conceptual, no implementación completa)",
      "Definir y documentar el plan del proyecto final (ver opciones en la tabla)",
    ],
    refuerzo: [
      "¿Cuántas iteraciones óptimas necesita Grover para N=16? ¿Y para N=1024?",
      "¿Cómo afecta Grover a la seguridad de AES-128 y AES-256?",
      "¿Cuántos qubits lógicos necesitaría Shor para factorizar RSA-2048?",
      "¿Qué es CRYSTALS-Kyber y por qué lo adoptó el NIST en 2024?",
    ],
    hito: "Grover implementado para N=4 y N=8, número óptimo de iteraciones verificado, estructura de Shor entendida a nivel de bloques, y plan de proyecto final documentado con criterios de éxito explícitos.",
    checklist: [
      "Grover para N=4: los 4 estados posibles buscados y verificados",
      "Grover para N=8: número óptimo de iteraciones calculado y verificado",
      "Análisis de over/under-rotation documentado con gráfica de probabilidades",
      "Estructura de Shor (QFT + period finding) explicada en Markdown",
      "Implicaciones de Shor para RSA documentadas",
      "Post-quantum crypto: CRYSTALS-Kyber mencionado como mitigación",
      "Plan del proyecto final aprobado con criterios de éxito",
    ],
    errores: [
      { error: "Implementar demasiadas iteraciones en Grover", correccion: "El número óptimo es ≈ π/4·√N. Más iteraciones reduce la probabilidad de éxito (el estado 'pasa de largo')." },
      { error: "Pensar que Shor ya puede romper RSA hoy", correccion: "Shor requiere ~4000 qubits lógicos para RSA-2048. Con corrección de errores, eso equivale a millones de qubits físicos. El hardware actual tiene ~1000 qubits físicos con mucho ruido." },
    ],
    preguntas: [
      "¿Qué hace geométricamente el operador de difusión de Grover?",
      "¿Cuántas iteraciones necesita Grover para N=100? ¿Y para N=10.000?",
      "¿Cómo afecta Grover a la seguridad de las funciones hash criptográficas?",
      "¿Por qué RSA es vulnerable a Shor pero AES no (al menos no tan directamente)?",
      "¿Qué es la Transformada de Fourier Cuántica y en qué se diferencia de la DFT clásica?",
    ],
    entregable: "semana10_grover_shor_proyecto.ipynb con Grover implementado y analizado para N=4 y N=8, análisis de implicaciones criptográficas, y documento de planificación del proyecto final con objetivo, estructura, métricas de éxito y plan de implementación.",
  },

  11: {
    titulo: "Proyecto final — desarrollo",
    objetivo: "Desarrollar el 70% del proyecto final, documentar el proceso técnico y superar los obstáculos de implementación reales.",
    porQueImporta: "Un proyecto personal es el mejor indicador de comprensión real. Los conceptos solo se consolidan cuando los aplicas para resolver un problema que tú mismo has definido. El proceso de depuración y refinamiento es tan valioso como el resultado final.",
    dificultad: 4,
    horas: "12-15 horas (más repaso acumulativo)",
    conceptos: [
      "Integración de conceptos de S1-S10 en un proyecto cohesivo",
      "Diseño de circuitos cuánticos para un problema real",
      "Testing y verificación de circuitos cuánticos",
      "Documentación técnica de código cuántico",
      "Repaso acumulativo de todo el programa",
      "Debug de errores en circuitos cuánticos",
    ],
    recursos: [
      { nombre: "Qiskit docs — referencia completa durante el desarrollo", tipo: "Documentación oficial", url: "https://docs.quantum.ibm.com", prioridad: "Imprescindible" },
      { nombre: "Stack Exchange Quantum Computing — preguntas técnicas", tipo: "Foro Q&A", url: "https://quantumcomputing.stackexchange.com", prioridad: "Recomendado" },
      { nombre: "Qiskit Community Slack — soporte en tiempo real", tipo: "Comunidad Slack", url: "https://ibm.co/joinqiskitslack", prioridad: "Recomendado" },
      { nombre: "GitHub qiskit-tutorials — ejemplos similares", tipo: "Repositorio", url: "https://github.com/qiskit/qiskit-tutorials", prioridad: "Recomendado" },
    ],
    ejercicios: [
      "Lunes: Setup del repositorio GitHub, entorno, estructura del proyecto",
      "Martes: Implementación del núcleo del algoritmo cuántico principal",
      "Miércoles: Testing, debugging y primeros resultados verificables",
      "Jueves: Refinamiento, optimización y análisis de resultados",
      "Viernes: Documentación del progreso y actualización del plan",
      "Fin de semana: Repaso acumulativo — revisar notebooks S1-S10 e identificar lagunas",
    ],
    refuerzo: [
      "Revisa los notebooks de S1-S10 e identifica los 3 conceptos que sientes menos sólidos",
      "Dedica 30 minutos a cada concepto débil con los ejercicios de refuerzo de esa semana",
      "Verifica que tu circuito principal funciona correctamente en el simulador antes de pasar al hardware",
    ],
    hito: "El 70% del proyecto está implementado, documentado y genera resultados verificables. Has resuelto al menos 2 problemas técnicos no triviales durante el desarrollo.",
    checklist: [
      "Repositorio GitHub creado con README básico",
      "Entorno del proyecto configurado (requirements.txt, .gitignore)",
      "Núcleo del algoritmo cuántico implementado",
      "Primeros resultados verificables obtenidos (aunque sean parciales)",
      "Al menos 2 problemas técnicos identificados y resueltos",
      "Progreso documentado en el notebook",
      "Repaso acumulativo de S1-S10 completado (2 horas mínimo)",
    ],
    errores: [
      { error: "Intentar implementar todo de golpe sin verificar por partes", correccion: "Divide el circuito en componentes. Verifica cada componente por separado antes de integrarlos." },
      { error: "No documentar las decisiones de diseño", correccion: "Añade celdas Markdown que expliquen por qué elegiste cada enfoque. En una semana no recordarás el razonamiento." },
      { error: "Buscar ayuda inmediatamente al primer obstáculo", correccion: "Dedica al menos 30 minutos a debug autónomo antes de buscar ayuda. El proceso de depuración consolida más que encontrar la respuesta directamente." },
    ],
    preguntas: [
      "¿Qué parte del proyecto fue más difícil de implementar y por qué?",
      "¿Qué conceptos de las semanas anteriores resultaron más relevantes para tu proyecto?",
      "¿Cómo verificas que tu circuito cuántico hace lo que se supone que debe hacer?",
      "¿Qué cambiarías en el diseño del proyecto si pudieras empezar de nuevo?",
    ],
    entregable: "Repositorio GitHub con el 70% del proyecto implementado: directorio del proyecto con notebooks, README actualizado, y al menos un resultado verificable documentado con análisis.",
  },

  12: {
    titulo: "Proyecto final — cierre y consolidación",
    objetivo: "Finalizar el proyecto final, completar la evaluación final del programa, consolidar el aprendizaje global y diseñar el plan de los próximos 3 meses.",
    porQueImporta: "El cierre de un proyecto de aprendizaje es tan importante como el inicio. Reflexionar sobre lo aprendido, documentar los resultados y planificar los próximos pasos consolida el conocimiento y abre la puerta a la siguiente fase. Este es el punto de inflexión entre 'estudiante' y 'practicante'.",
    dificultad: 4,
    horas: "12-15 horas",
    conceptos: [
      "Cierre técnico del proyecto: testing, documentación, README",
      "Evaluación final: correctitud, comprensión, calidad, análisis",
      "Reflexión metacognitiva sobre el aprendizaje",
      "Rutas de profundización: algoritmos avanzados, QML, ciberseguridad cuántica",
      "Estado del arte de la computación cuántica (2025-2026)",
      "Planificación de los próximos 3 meses de estudio",
    ],
    recursos: [
      { nombre: "IBM Quantum Learning — Advanced Algorithms (para proximos pasos)", tipo: "Curso", url: "https://learning.quantum.ibm.com", prioridad: "Próximos pasos" },
      { nombre: "PennyLane QML Tutorials (dirección Quantum ML)", tipo: "Curso gratuito", url: "https://pennylane.ai/qml", prioridad: "Próximos pasos (QML)" },
      { nombre: "NIST Post-Quantum Standards FIPS 203-206 (dirección ciberseguridad)", tipo: "Estándares", url: "https://csrc.nist.gov/projects/post-quantum-cryptography", prioridad: "Próximos pasos (cripto)" },
      { nombre: "Nielsen & Chuang QCQI — lectura completa (dirección teoría)", tipo: "Libro de referencia", url: "https://www.cambridge.org/core/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE", prioridad: "Próximos pasos (teoría)" },
    ],
    ejercicios: [
      "Lunes: Finalizar implementación del 30% restante del proyecto",
      "Martes: Testing completo — al menos 3 casos de prueba que validen el circuito",
      "Miércoles: Documentación profesional: README, comentarios, análisis de resultados",
      "Jueves: Evaluación final autónoma (ver rúbrica abajo)",
      "Viernes: Reflexión + plan de próximos 3 meses documentado",
    ],
    refuerzo: [
      "Evaluación final (30%) — Correctitud técnica: ¿el circuito hace lo que debe?",
      "Evaluación final (25%) — Comprensión: ¿el código y comentarios revelan entendimiento?",
      "Evaluación final (20%) — Calidad: ¿es legible, modular, bien documentado?",
      "Evaluación final (15%) — Análisis: ¿los resultados se analizan con rigor?",
      "Evaluación final (10%) — Reflexión: ¿identificas lo aprendido y lo que mejorarías?",
    ],
    hito: "Proyecto cuántico completo publicado en GitHub con README profesional, 3+ tests, análisis de resultados documentado, y plan de próximos 3 meses con recursos y objetivos específicos.",
    checklist: [
      "Proyecto 100% implementado y funcionando",
      "Al menos 3 tests que validan el comportamiento del circuito",
      "README profesional con descripción, instrucciones y resultados",
      "requirements.txt actualizado con todas las dependencias",
      "Análisis de resultados documentado en el notebook",
      "Reflexión escrita: qué aprendiste, qué fue difícil, qué harías diferente",
      "Plan de próximos 3 meses con recursos específicos y objetivos concretos",
      "Repositorio GitHub público con el proyecto completo",
    ],
    errores: [
      { error: "No reflexionar sobre el proceso de aprendizaje", correccion: "La reflexión metacognitiva consolida más que la revisión del código. Dedica al menos 1 hora a escribir honestamente sobre el proceso." },
      { error: "No publicar el proyecto por perfeccionismo", correccion: "Un proyecto publicado con imperfecciones es infinitamente más valioso que uno perfecto en local. Publícalo y mejóralo después." },
      { error: "No planificar los próximos pasos antes de cerrar", correccion: "Sin un plan específico para las próximas semanas, el conocimiento se dispersa. Elige UNA dirección y define los primeros 3 recursos concretos." },
    ],
    preguntas: [
      "¿Qué es lo más sorprendente que aprendiste durante las 12 semanas?",
      "¿Qué concepto sientes que todavía no dominas completamente?",
      "¿Qué parte de la computación cuántica te genera más curiosidad para profundizar?",
      "¿Cómo explicarías la ventaja cuántica a alguien con base en programación pero sin física?",
      "¿Cuáles son las 3 cosas más importantes que necesitas estudiar en los próximos 3 meses?",
    ],
    entregable: "Repositorio GitHub público con: main.ipynb (proyecto completo), README.md profesional, requirements.txt, tests/ (mínimo 3 tests), docs/reflexion.md (1-2 páginas), docs/proximos_pasos.md (plan de 3 meses con recursos específicos).",
  },
};

function getSemanaData(num: number): SemanaData {
  return SEMANAS[num] ?? {
    titulo: "En construcción",
    objetivo: "Contenido de esta semana disponible próximamente.",
    porQueImporta: "Cada semana tiene un rol específico en la progresión del programa.",
    dificultad: 3, horas: "9-12 horas",
    conceptos: [], recursos: [], ejercicios: [], refuerzo: [],
    hito: "Ver el plan de estudios completo.", checklist: [],
    errores: [], preguntas: [], entregable: "Notebook de la semana.",
  };
}

export default async function SemanaPage({ params }: { params: Promise<{ week: string }> }) {
  const { week } = await params;
  const num = parseInt(week, 10);

  if (isNaN(num) || num < 1 || num > 12) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Semana no válida</p>
          <Link href="/semanas" className="text-purple-400 hover:underline">← Volver al plan</Link>
        </div>
      </div>
    );
  }

  const s = getSemanaData(num);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        {/* Nav */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/semanas" className="text-sm text-gray-500 hover:text-gray-300">← Plan de 12 semanas</Link>
          <div className="flex gap-3">
            {num > 1  && <Link href={`/semanas/${num-1}`}  className="text-sm text-gray-500 hover:text-gray-300">← S{num-1}</Link>}
            {num < 12 && <Link href={`/semanas/${num+1}`}  className="text-sm text-gray-500 hover:text-gray-300">S{num+1} →</Link>}
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-purple-400 mb-2">SEMANA {num} DE 12</div>
          <h1 className="text-3xl font-bold mb-3">{s.titulo}</h1>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>{"⭐".repeat(s.dificultad)}{"☆".repeat(5-s.dificultad)}</span>
            <span>·</span><span>{s.horas}</span>
          </div>
        </div>

        {/* Objetivo */}
        <section className="mb-5 p-5 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wide">Objetivo principal</h2>
          <p className="text-gray-200">{s.objetivo}</p>
        </section>

        {/* Por qué importa */}
        <section className="mb-5 p-5 bg-gray-900 rounded-xl border border-gray-700">
          <h2 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Por qué importa</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{s.porQueImporta}</p>
        </section>

        {/* Conceptos */}
        {s.conceptos.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Conceptos clave</h2>
            <div className="flex flex-wrap gap-2">
              {s.conceptos.map((c) => (
                <span key={c} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300">{c}</span>
              ))}
            </div>
          </section>
        )}

        {/* Recursos */}
        {s.recursos.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Recursos</h2>
            <div className="flex flex-col gap-2">
              {s.recursos.map((r) => (
                <a key={r.nombre} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-purple-600 rounded-lg transition-all group">
                  <div>
                    <p className="text-sm font-medium group-hover:text-white transition-colors">{r.nombre}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.tipo}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-3 ${
                    r.prioridad === "Imprescindible" ? "bg-purple-900 text-purple-300" :
                    r.prioridad === "Recomendado"    ? "bg-blue-900 text-blue-300" :
                                                       "bg-gray-700 text-gray-400"
                  }`}>{r.prioridad}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Ejercicios */}
        {s.ejercicios.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Ejercicios prácticos</h2>
            <div className="flex flex-col gap-2">
              {s.ejercicios.map((e, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-800 border border-gray-700 rounded-lg">
                  <span className="text-purple-400 font-mono text-sm shrink-0">{String(i+1).padStart(2,"0")}</span>
                  <p className="text-sm text-gray-300">{e}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Refuerzo */}
        {s.refuerzo.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Ejercicios de refuerzo</h2>
            <div className="flex flex-col gap-2">
              {s.refuerzo.map((r, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg">
                  <span className="text-blue-400 font-mono text-sm shrink-0">R{i+1}</span>
                  <p className="text-sm text-gray-400">{r}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hito */}
        <section className="mb-5 p-5 bg-green-900/20 border border-green-700/50 rounded-xl">
          <h2 className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wide">✅ Hito verificable</h2>
          <p className="text-gray-200 text-sm leading-relaxed">{s.hito}</p>
        </section>

        {/* Checklist */}
        {s.checklist.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Checklist de la semana</h2>
            <div className="flex flex-col gap-2">
              {s.checklist.map((item, i) => (
                <label key={i} className="flex gap-3 p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                  <input type="checkbox" className="mt-0.5 accent-purple-500 shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        {/* Errores frecuentes */}
        {s.errores.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Errores frecuentes y correcciones</h2>
            <div className="flex flex-col gap-3">
              {s.errores.map((e, i) => (
                <div key={i} className="p-4 bg-gray-900 border border-red-900/40 rounded-lg">
                  <p className="text-sm text-red-400 mb-1">❌ {e.error}</p>
                  <p className="text-sm text-green-400">✓ {e.correccion}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Preguntas */}
        {s.preguntas.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Preguntas de autoevaluación</h2>
            <div className="flex flex-col gap-2">
              {s.preguntas.map((p, i) => (
                <div key={i} className="p-3 bg-gray-800 border border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-300"><span className="text-purple-400 mr-2">{i+1}.</span>{p}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Entregable */}
        <section className="mb-8 p-5 bg-blue-900/20 border border-blue-700/40 rounded-xl">
          <h2 className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wide">📦 Entregable de la semana</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{s.entregable}</p>
        </section>

        {/* Navegación final */}
        <div className="flex justify-between pt-4 border-t border-gray-800">
          {num > 1
            ? <Link href={`/semanas/${num-1}`} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">← Semana {num-1}</Link>
            : <div />}
          {num < 12
            ? <Link href={`/semanas/${num+1}`} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors">Semana {num+1} →</Link>
            : <Link href="/dashboard" className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition-colors">¡Programa completado! → Dashboard</Link>}
        </div>
      </div>
    </div>
  );
}
