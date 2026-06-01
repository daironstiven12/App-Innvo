from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.dashboard_service import build_dashboard

router = APIRouter()


@router.get("/api/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    try:
        data = build_dashboard(db)
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(
            content={"error": str(e), "type": type(e).__name__},
            status_code=500,
        )
