from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Horario(Base):
    __tablename__ = "horario"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    dia = Column(String(20), nullable=False)
    inicio = Column(String(10), nullable=False)
    fin = Column(String(10), nullable=False)
    materia_id = Column(Integer, ForeignKey("materias.id", ondelete="CASCADE"), nullable=False)

    materia = relationship("Materia")
