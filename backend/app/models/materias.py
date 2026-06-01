from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Materia(Base):
    __tablename__ = "materias"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    docente = Column(String(255), nullable=False, default="")
