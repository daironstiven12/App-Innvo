from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base


class Periodo(Base):
    __tablename__ = "periodos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    activo = Column(Boolean, nullable=False, default=False)
