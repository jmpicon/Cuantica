# CUÁNTICA — Ecosistema de Aprendizaje en Computación Cuántica

Proyecto personal para aprender computación cuántica desde cero con Qiskit e IBM Quantum,
construyendo en paralelo una plataforma web de autoaprendizaje con capacidades de
procesamiento documental (tipo NotebookLM) y generación de podcasts educativos.

## Estructura

```
Cuantica/
├── aprendizaje/          # Plan de 12 semanas + notebooks
│   ├── semanas/          # Un directorio por semana
│   │   ├── semana_01/    # Fundamentos matemáticos
│   │   ├── semana_02/    # Superposición y medición
│   │   └── ...
│   ├── proyectos/        # Proyecto final
│   ├── recursos/         # Materiales descargados
│   ├── .venv/            # Entorno virtual Python (Qiskit)
│   ├── requirements.txt
│   └── configurar_ibm.py
│
└── plataforma/           # Webapp
    ├── frontend/         # Next.js + TypeScript + Tailwind
    ├── backend/          # FastAPI + SQLAlchemy + ChromaDB
    └── docker-compose.yml
```

## Arrancar el entorno de aprendizaje

```bash
cd aprendizaje
source .venv/bin/activate
jupyter notebook semanas/semana_01/semana01_fundamentos_matematicos.ipynb
```

## Configurar IBM Quantum (una sola vez)

```bash
cd aprendizaje
source .venv/bin/activate
python configurar_ibm.py
# Obtén tu token en: https://quantum.ibm.com/ → Account Settings → API Token
```

## Arrancar la plataforma web

```bash
# Prerrequisito: Docker instalado
cd plataforma

# 1. Copiar y editar el .env del backend
cp backend/.env.example backend/.env

# 2. Levantar todos los servicios
docker-compose up -d

# Frontend:  http://localhost:3000
# Backend:   http://localhost:8000
# API docs:  http://localhost:8000/docs
```

## Sin Docker (desarrollo rápido)

```bash
# Terminal 1 — Backend
cd plataforma/backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload

# Terminal 2 — Frontend
cd plataforma/frontend
npm install
npm run dev
```

## Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS |
| Backend | FastAPI + SQLAlchemy + Alembic |
| Base de datos | PostgreSQL 16 |
| Vector store | ChromaDB |
| LLM | OpenAI / Anthropic (configurable) |
| Hardware cuántico | IBM Quantum via qiskit-ibm-runtime |
| Simulador | Qiskit Aer |
| Contenedores | Docker + docker-compose |
