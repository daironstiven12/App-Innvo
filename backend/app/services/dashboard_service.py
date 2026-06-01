from sqlalchemy.orm import Session
from sqlalchemy import asc, func

from app.models.estudiante import Estudiante
from app.models.horario import Horario
from app.models.calificaciones import Calificacion
from app.models.comparativas import Comparativa
from app.models.comunicados import Comunicado
from app.models.periodos import Periodo
from app.models.materias import Materia


def build_dashboard(db: Session) -> dict:
    periodo_activo = db.query(Periodo).filter(Periodo.activo == True).first()
    if not periodo_activo:
        periodo_activo = db.query(Periodo).order_by(Periodo.id.desc()).first()
    periodo_id = periodo_activo.id if periodo_activo else 1

    return {
        "estudiante": _get_estudiante(db),
        "metricas": _get_metricas(db, periodo_id),
        "horario": _get_horario(db),
        "calificaciones": _get_calificaciones(db, periodo_id),
        "desempeno": _get_desempeno(db, periodo_id),
        "comparativas": _get_comparativas(db, periodo_id),
        "comunicados": _get_comunicados(db),
        "periodos": _get_periodos(db),
    }


def _get_estudiante(db: Session) -> dict:
    estudiante = db.query(Estudiante).first()
    if not estudiante:
        return {}
    return {
        "nombre": estudiante.nombre,
        "carrera": estudiante.carrera,
        "institucion": estudiante.institucion,
        "iniciales": estudiante.iniciales,
        "correo": estudiante.correo,
        "telefono": estudiante.telefono,
        "direccion": estudiante.direccion,
        "ingreso": estudiante.ingreso,
    }


def _get_metricas(db: Session, periodo_id: int) -> list:
    total_materias = db.query(Materia).count()

    cal_base = db.query(Calificacion).filter(Calificacion.periodo_id == periodo_id)
    aprobadas = cal_base.filter(Calificacion.nota >= 3.0).count()
    reprobadas = cal_base.filter(Calificacion.nota < 3.0).count()
    promedio = cal_base.with_entities(func.avg(Calificacion.nota)).scalar() or 0

    return [
        {"id": "1", "titulo": "Materias", "valor": str(total_materias), "icono": "book", "color": "#3B82F6"},
        {"id": "2", "titulo": "Aprobadas", "valor": str(aprobadas), "icono": "check-circle", "color": "#10B981"},
        {"id": "3", "titulo": "Reprobadas", "valor": str(reprobadas), "icono": "x-circle", "color": "#EF4444"},
        {"id": "4", "titulo": "Puesto", "valor": "5°", "icono": "award", "color": "#F59E0B"},
        {"id": "5", "titulo": "Fallas", "valor": "8", "icono": "alert-triangle", "color": "#EF4444"},
        {"id": "6", "titulo": "Promedio", "valor": f"{promedio:.1f}", "icono": "bar-chart", "color": "#8B5CF6"},
    ]


def _get_horario(db: Session) -> list:
    horarios = (
        db.query(Horario)
        .join(Materia, Horario.materia_id == Materia.id)
        .order_by(asc(Horario.id))
        .all()
    )
    return [
        {"dia": h.dia, "inicio": h.inicio, "fin": h.fin, "materia": h.materia.nombre, "docente": h.materia.docente}
        for h in horarios
    ]


def _get_calificaciones(db: Session, periodo_id: int) -> list:
    calificaciones = (
        db.query(Calificacion)
        .join(Materia, Calificacion.materia_id == Materia.id)
        .filter(Calificacion.periodo_id == periodo_id)
        .order_by(asc(Calificacion.id))
        .all()
    )
    return [{"materia": c.materia.nombre, "nota": float(c.nota)} for c in calificaciones]


def _get_desempeno(db: Session, periodo_id: int) -> dict:
    calificaciones = (
        db.query(Calificacion)
        .filter(Calificacion.periodo_id == periodo_id)
        .all()
    )
    total = len(calificaciones) or 1

    alto = sum(1 for c in calificaciones if c.nota >= 4.1)
    basico = sum(1 for c in calificaciones if 3.0 <= c.nota < 4.1)
    bajo = sum(1 for c in calificaciones if c.nota < 3.0)

    niveles = []
    if alto > 0:
        niveles.append({"label": "Alto", "valor": alto, "porcentaje": round(alto / total * 100), "color": "#10B981"})
    if basico > 0:
        niveles.append({"label": "Básico", "valor": basico, "porcentaje": round(basico / total * 100), "color": "#F59E0B"})
    if bajo > 0:
        niveles.append({"label": "Bajo", "valor": bajo, "porcentaje": round(bajo / total * 100), "color": "#3B82F6"})

    comparativa = _get_promedio_general(db, periodo_id)

    return {"niveles": niveles, "comparativa": comparativa}


def _get_promedio_general(db: Session, periodo_id: int) -> list:
    registros = (
        db.query(Comparativa)
        .filter(Comparativa.periodo_id == periodo_id, Comparativa.categoria == "Promedio General")
        .all()
    )
    return [
        {"label": r.grupo_label, "valor": float(r.valor), "color": r.color}
        for r in registros
    ]


def _get_comparativas(db: Session, periodo_id: int) -> dict:
    registros = (
        db.query(Comparativa)
        .filter(Comparativa.periodo_id == periodo_id, Comparativa.categoria != "Promedio General")
        .order_by(asc(Comparativa.id))
        .all()
    )

    categorias_set: list[str] = []
    grupos_map: dict[str, dict] = {}

    for r in registros:
        if r.categoria not in categorias_set:
            categorias_set.append(r.categoria)
        if r.grupo_label not in grupos_map:
            grupos_map[r.grupo_label] = {"label": r.grupo_label, "color": r.color, "valores": []}

    for grupo in grupos_map.values():
        grupo["valores"] = [0.0] * len(categorias_set)

    for r in registros:
        cat_idx = categorias_set.index(r.categoria)
        if r.grupo_label == "Estudiante":
            valor = _calcular_estudiante_valor(db, periodo_id, r.categoria)
        else:
            valor = float(r.valor)
        grupos_map[r.grupo_label]["valores"][cat_idx] = valor

    return {"categorias": categorias_set, "grupos": list(grupos_map.values())}


CATEGORIA_MATERIA_MAP = {
    "AGRÍCOLA": "Agrícola",
    "ANÁLISIS": "Análisis",
    "COMPORTAMIENTO": "Comportamiento",
    "ECONOMÍA": "Economía",
    "EDUCACIÓN": "Educación Ética",
}


def _calcular_estudiante_valor(db: Session, periodo_id: int, categoria: str) -> float:
    nombre_materia = CATEGORIA_MATERIA_MAP.get(categoria, categoria)
    materia = db.query(Materia).filter(Materia.nombre == nombre_materia).first()
    if not materia:
        return 0.0
    calificacion = (
        db.query(Calificacion)
        .filter(Calificacion.materia_id == materia.id, Calificacion.periodo_id == periodo_id)
        .first()
    )
    return float(calificacion.nota) if calificacion else 0.0


def _get_comunicados(db: Session) -> list:
    comunicados = db.query(Comunicado).order_by(Comunicado.fecha.desc()).limit(20).all()
    return [
        {"id": c.id, "titulo": c.titulo, "mensaje": c.mensaje, "fecha": c.fecha.isoformat(), "tipo": c.tipo}
        for c in comunicados
    ]


def _get_periodos(db: Session) -> list:
    periodos = db.query(Periodo).order_by(asc(Periodo.id)).all()
    return [{"id": str(p.id), "nombre": p.nombre, "activo": bool(p.activo)} for p in periodos]
