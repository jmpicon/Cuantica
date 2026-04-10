"""
Servicio RAG: extracción de texto, chunking, embeddings con OpenAI, almacenamiento en ChromaDB.
"""
from __future__ import annotations
import json
import os


# ---------------------------------------------------------------------------
# Extracción de texto
# ---------------------------------------------------------------------------

def extract_text(file_path: str, file_type: str) -> str:
    if file_type == "pdf":
        from pypdf import PdfReader
        reader = PdfReader(file_path)
        return "\n\n".join(p.extract_text() or "" for p in reader.pages)

    if file_type in ("md", "txt"):
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

    if file_type == "ipynb":
        with open(file_path, "r", encoding="utf-8") as f:
            nb = json.load(f)
        parts = []
        for cell in nb.get("cells", []):
            if cell.get("cell_type") in ("markdown", "code"):
                parts.append("".join(cell.get("source", [])))
        return "\n\n".join(parts)

    return ""


# ---------------------------------------------------------------------------
# Chunking manual (sin dependencia extra de langchain-text-splitters)
# ---------------------------------------------------------------------------

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """Divide el texto en trozos con solapamiento."""
    chunks: list[str] = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        start += chunk_size - overlap
    return chunks


# ---------------------------------------------------------------------------
# ChromaDB helpers
# ---------------------------------------------------------------------------

def _get_collection(collection_name: str, openai_api_key: str):
    import chromadb
    from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

    from app.core.config import settings

    client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
    ef = OpenAIEmbeddingFunction(
        api_key=openai_api_key,
        model_name="text-embedding-3-small",
    )
    return client.get_or_create_collection(collection_name, embedding_function=ef)


# ---------------------------------------------------------------------------
# Tarea en background: procesar documento
# ---------------------------------------------------------------------------

def process_document(doc_id: int) -> None:
    """
    Extrae texto, genera chunks, los embede con OpenAI y los guarda en ChromaDB.
    Actualiza el estado del documento en la BD.
    """
    from app.core.database import SessionLocal
    from app.core.config import settings
    from app.models.user import Document
    from openai import OpenAI

    db = SessionLocal()
    doc = None
    try:
        doc = db.query(Document).filter(Document.id == doc_id).first()
        if not doc:
            return

        doc.status = "processing"
        db.commit()

        # 1. Extraer texto
        text = extract_text(doc.file_path, doc.file_type)
        if not text.strip():
            doc.status = "error"
            db.commit()
            return

        # 2. Chunk
        chunks = chunk_text(text)

        # 3. ChromaDB (usa embedding function de OpenAI internamente)
        collection_name = f"doc_{doc_id}"
        collection = _get_collection(collection_name, settings.OPENAI_API_KEY)

        batch = 100
        for i in range(0, len(chunks), batch):
            slice_ = chunks[i : i + batch]
            ids = [f"{doc_id}_{j}" for j in range(i, i + len(slice_))]
            collection.add(ids=ids, documents=slice_)

        # 4. Resumen con GPT
        oai = OpenAI(api_key=settings.OPENAI_API_KEY)
        summary_resp = oai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Genera un resumen conciso en español (3-4 frases) del siguiente texto "
                        "sobre computación cuántica. Solo el resumen, sin preámbulo."
                    ),
                },
                {"role": "user", "content": text[:6000]},
            ],
            max_tokens=300,
        )

        doc.status = "ready"
        doc.chunk_count = len(chunks)
        doc.collection_name = collection_name
        doc.summary = summary_resp.choices[0].message.content.strip()
        db.commit()

    except Exception:
        if doc:
            doc.status = "error"
            db.commit()
        raise
    finally:
        db.close()


# ---------------------------------------------------------------------------
# Query RAG
# ---------------------------------------------------------------------------

def query_document(doc_id: int, question: str) -> str:
    """Búsqueda semántica + respuesta con GPT."""
    from app.core.database import SessionLocal
    from app.core.config import settings
    from app.models.user import Document
    from openai import OpenAI

    db = SessionLocal()
    try:
        doc = db.query(Document).filter(Document.id == doc_id).first()
        if not doc or doc.status != "ready" or not doc.collection_name:
            return "El documento aún no está procesado. Espera a que el estado sea 'listo'."

        collection = _get_collection(doc.collection_name, settings.OPENAI_API_KEY)
        results = collection.query(query_texts=[question], n_results=5)
        context = "\n\n---\n\n".join(results["documents"][0])

        oai = OpenAI(api_key=settings.OPENAI_API_KEY)
        resp = oai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Eres un tutor experto en computación cuántica. Responde en español "
                        "de forma clara y pedagógica basándote exclusivamente en el siguiente "
                        "contexto extraído del documento del usuario. Si la información no está "
                        "en el contexto, indícalo honestamente.\n\n"
                        f"Contexto:\n{context}"
                    ),
                },
                {"role": "user", "content": question},
            ],
            max_tokens=800,
        )
        return resp.choices[0].message.content.strip()
    finally:
        db.close()
