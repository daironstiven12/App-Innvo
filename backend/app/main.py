from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.dashboard import router as dashboard_router

app = FastAPI(
    title="Académico App - Backend",
    description="API REST para la aplicación móvil académica",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "Académico App API",
        "docs": "/docs",
        "endpoints": ["GET /api/dashboard"],
    }


@app.get("/health")
def health():
    return {"status": "ok"}
