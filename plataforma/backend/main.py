from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine, SessionLocal
from app.api.routes import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
def create_demo_user():
    """Crea el usuario demo (id=1) si no existe. Necesario para MVP sin login."""
    import bcrypt as _bcrypt
    from app.models.user import User

    db = SessionLocal()
    try:
        if not db.query(User).filter(User.id == 1).first():
            hashed = _bcrypt.hashpw(b"demo1234", _bcrypt.gensalt()).decode()
            demo = User(
                email="demo@cuantica.local",
                username="demo",
                hashed_password=hashed,
                is_active=True,
            )
            db.add(demo)
            db.commit()
    finally:
        db.close()


@app.get("/")
def root():
    return {"status": "ok", "app": settings.APP_NAME, "version": settings.APP_VERSION}


@app.get("/health")
def health():
    return {"status": "healthy"}
