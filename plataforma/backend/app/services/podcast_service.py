"""
Servicio de generación de podcasts con OpenAI GPT-4o-mini.
"""
from __future__ import annotations

ESTILOS: dict[str, str] = {
    "conversacional": (
        "Tono amigable y accesible con analogías del mundo real. "
        "Como si explicaras a un colega programador."
    ),
    "academico": (
        "Terminología técnica precisa, tono académico riguroso. "
        "Apropiado para audiencia con base en física o matemáticas."
    ),
    "debate": (
        "Formato de debate entre dos perspectivas: una pro-cuántica y otra escéptica. "
        "Explora ventajas, limitaciones y controversias."
    ),
    "resumen": (
        "Resumen ejecutivo ultra-conciso. Exactamente 5 puntos clave, "
        "cada uno máximo 90 segundos. Sin divagaciones."
    ),
}


def generate_script(
    titulo: str,
    estilo: str,
    duracion_minutos: int,
    context: str = "",
) -> str:
    """Genera un guión de podcast con GPT-4o-mini."""
    from app.core.config import settings
    from openai import OpenAI

    if not settings.OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY no está configurada en el .env")

    estilo_desc = ESTILOS.get(estilo, ESTILOS["conversacional"])
    context_block = f"\n\nMaterial de referencia (úsalo como base):\n{context[:4000]}" if context else ""

    prompt = f"""Genera un guión completo de podcast educativo en español sobre computación cuántica.

TÍTULO: {titulo}
DURACIÓN OBJETIVO: aproximadamente {duracion_minutos} minutos cuando se narre
ESTILO: {estilo_desc}{context_block}

Estructura obligatoria del guión:
[INTRO] — Enganche inicial, presenta el tema y por qué es importante (≈1 min)
[BLOQUE 1] — Primer concepto principal con explicación detallada y ejemplo
[BLOQUE 2] — Segundo concepto o profundización del anterior
[BLOQUE 3] — Aplicación práctica, código Qiskit o caso de uso real
[CONEXIÓN] — Relación con ciberseguridad, IA u otras áreas relevantes
[OUTRO] — 3 puntos clave para recordar y siguiente paso concreto para el oyente

Reglas:
- El guión debe poder narrarse directamente en audio
- Incluye [PAUSA] donde convenga respirar
- Usa transiciones fluidas entre bloques
- Incluye al menos un ejemplo de código Qiskit (como si lo describieras verbalmente)
- Responde solo con el guión, sin metadatos ni explicaciones adicionales"""

    oai = OpenAI(api_key=settings.OPENAI_API_KEY)
    response = oai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=3000,
        temperature=0.75,
    )
    return response.choices[0].message.content.strip()
