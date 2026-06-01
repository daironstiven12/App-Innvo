from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from app.core.database import Base


class Comparativa(Base):
    __tablename__ = "comparativas"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    categoria = Column(String(255), nullable=False)
    grupo_label = Column(String(50), nullable=False)
    valor = Column(Numeric(4, 2), nullable=False)
    color = Column(String(20), nullable=False)
    periodo_id = Column(Integer, ForeignKey("periodos.id", ondelete="CASCADE"), nullable=False)

    periodo = relationship("Periodo")
