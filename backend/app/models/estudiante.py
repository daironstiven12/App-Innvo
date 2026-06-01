from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Estudiante(Base):
    __tablename__ = "estudiantes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    carrera = Column(String(255), nullable=False)
    institucion = Column(String(255), nullable=False)
    iniciales = Column(String(10), nullable=False)
    correo = Column(String(255))
    telefono = Column(String(50))
    direccion = Column(String(255))
    ingreso = Column(String(50))
