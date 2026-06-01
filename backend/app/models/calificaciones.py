from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from app.core.database import Base


class Calificacion(Base):
    __tablename__ = "calificaciones"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    materia_id = Column(Integer, ForeignKey("materias.id", ondelete="CASCADE"), nullable=False)
    nota = Column(Numeric(4, 2), nullable=False)
    periodo_id = Column(Integer, ForeignKey("periodos.id", ondelete="CASCADE"), nullable=False)

    materia = relationship("Materia")
    periodo = relationship("Periodo")
