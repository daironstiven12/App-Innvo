from sqlalchemy import Column, Integer, String, Text, Date
from app.core.database import Base


class Comunicado(Base):
    __tablename__ = "comunicados"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String(255), nullable=False)
    mensaje = Column(Text)
    fecha = Column(Date, nullable=False)
    tipo = Column(String(50), nullable=False, default="general")
