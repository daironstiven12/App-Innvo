# APP-Innova

Aplicación móvil académica con React Native (Expo Router) y backend FastAPI + MySQL.

---

## Arquitectura

```
┌──────────────────────┐      HTTP/JSON       ┌──────────────────────┐
│   React Native App   │ ◄──────────────────► │   FastAPI Backend    │
│   (Expo Router)      │    localhost:8000     │   (Python 3)        │
│                      │                       │                      │
│  Frontend/           │                       │  backend/            │
│    app/              │                       │    app/              │
│    components/       │                       │      core/           │
│    services/         │                       │      models/         │
└──────────────────────┘                       │      routes/         │
                                               │      services/       │
                                               └──────────┬───────────┘
                                                          │
                                                          ▼
                                               ┌──────────────────────┐
                                               │      MySQL           │
                                               │  academico_app       │
                                               └──────────────────────┘
```

## Flujo de datos

1. **Frontend** → `services/api.js` → `fetchDashboard()` → GET `/api/dashboard`
2. **Backend** → `routes/dashboard.py` → `services/dashboard_service.py` → SQLAlchemy queries
3. **Backend** → Construye JSON con todos los datos → Responde al frontend
4. **Frontend** → Cada screen extrae los datos que necesita del JSON unificado

---

## Base de datos

### Tablas actuales (7 tablas)

| Tabla | Tipo | Propósito | Datos |
|---|---|---|---|
| `estudiantes` | **Real** | Datos del estudiante | 1 registro |
| `periodos` | **Real** | Periodos académicos | 3 registros |
| `materias` | **Real** | Catálogo de materias | 25 registros |
| `horario` | **Real** | Clases por día y hora | 25 registros |
| `calificaciones` | **Real** | Notas por materia y periodo | 29 registros |
| `comparativas` | **Real** | Datos de referencia (Salón/Institución) | 18 registros |
| `comunicados` | **Real** | Comunicados y anuncios | 15 registros |

### Tablas eliminadas (datos derivados)

| Tabla | Motivo |
|---|---|
| `metricas` | Datos calculables: Materias (COUNT), Aprobadas/Reprobadas/Promedio (AVG desde calificaciones), Puesto/Fallas (valores estáticos sin fuente) |
| `desempeno` | Datos calculables: distribución Alto/Básico/Bajo desde notas en calificaciones |

### Datos calculados dinámicamente

**Métricas** (`_get_metricas`):
- `Materias` → `COUNT(materias)`
- `Aprobadas` → `COUNT(calificaciones WHERE nota >= 3.0)`
- `Reprobadas` → `COUNT(calificaciones WHERE nota < 3.0)`
- `Promedio` → `AVG(calificaciones.nota)`
- `Puesto` → valor estático "5°" (sin fuente de datos)
- `Fallas` → valor estático "8" (sin fuente de datos)

**Desempeño** (`_get_desempeno`):
- `Alto` → `COUNT(calificaciones WHERE nota >= 4.1)`
- `Básico` → `COUNT(calificaciones WHERE 3.0 <= nota < 4.1)`
- `Bajo` → `COUNT(calificaciones WHERE nota < 3.0)`
- Porcentajes calculados sobre el total del periodo activo

**Comparativas** (`_get_comparativas`):
- `Estudiante` → valor desde `calificaciones` + `materias` (con mapeo categoría→materia)
- `Salón` / `Institución` → desde tabla `comparativas` (datos de referencia externos)

---

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Info de la API |
| GET | `/health` | Health check |
| GET | `/api/dashboard` | Todos los datos de la app en una respuesta JSON |
| GET | `/docs` | Documentación Swagger (FastAPI) |

### Formato respuesta `/api/dashboard`

```json
{
  "estudiante": { "nombre": "...", "carrera": "...", "institucion": "...", ... },
  "metricas": [ { "id": "1", "titulo": "Materias", "valor": "25", ... }, ... ],
  "horario": [ { "dia": "Lunes", "inicio": "07:00", "fin": "08:00", ... }, ... ],
  "calificaciones": [ { "materia": "Programación", "nota": 4.5 }, ... ],
  "desempeno": { "niveles": [ { "label": "Alto", "valor": 8, ... } ], "comparativa": [...] },
  "comparativas": { "categorias": [...], "grupos": [ { "label": "Estudiante", ... } ] },
  "comunicados": [ { "id": 1, "titulo": "...", ... } ],
  "periodos": [ { "id": "1", "nombre": "Periodo 1", "activo": false }, ... ]
}
```

---

## Optimizaciones realizadas

### 1. Eliminación de tablas redundantes
**Archivos modificados:**
- `backend/database/schema.sql` — Eliminadas tablas `metricas` y `desempeno`
- `backend/database/seed.sql` — Eliminados INSERTs de `metricas` y `desempeno`

**Archivos eliminados:**
- `backend/app/models/metricas.py`
- `backend/app/models/desempeno.py`

**Archivos modificados:**
- `backend/app/models/__init__.py` — Eliminados imports de Metrica y Desempeno

### 2. Cálculo dinámico en servicios
**Archivo modificado:**
- `backend/app/services/dashboard_service.py`

Cambios:
- `_get_metricas()` ahora calcula desde `materias` y `calificaciones` usando agregaciones SQL
- `_get_desempeno()` ahora calcula distribución desde `calificaciones` con thresholds (>= 4.1 Alto, >= 3.0 Básico, < 3.0 Bajo)
- `_get_comparativas()` ahora calcula valores "Estudiante" dinámicamente usando `CATEGORIA_MATERIA_MAP`
- Eliminados imports de modelos `Metrica` y `Desempeno`
- Agregado import de `func` de SQLAlchemy para agregaciones

### 3. Limpieza de archivos sin uso
- `Frontend/data/` — Eliminado (datos JSON hardcodeados reemplazados por API)
- `Frontend/App.js` — Eliminado (entry point de Expo Router es `app/`)
- `Frontend/components/ChartCard.jsx` — Eliminado (componente no utilizado)
- `Frontend/Estudiante.pdf` — Eliminado (archivo no relacionado)

### 4. Base de datos actualizada
- Tablas `metricas` y `desempeno` eliminadas de MySQL (DROP TABLE)

---

## Cómo ejecutar

### Backend
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0
```

### Frontend
```bash
cd Frontend
npm start
```

### Base de datos (si aplica schema desde cero)
```bash
mysql -u root -p < backend/database/schema.sql
mysql -u root -p < backend/database/seed.sql
```

---

## Recomendaciones futuras

1. **Puesto y Fallas**: Son valores estáticos. Si en el futuro se rastrea asistencia o ranking, crear tablas dedicadas (`asistencia`, `ranking`) y calcular desde allí.
2. **Salón/Institución en comparativas**: Actualmente almacenados como referencia. Con múltiples estudiantes, calcular promedios reales de grupo.
3. **Caché**: Si el volumen de datos crece, agregar Redis para cachear `GET /api/dashboard` con invalidación por periodo.
4. **Endpoints granularizados**: Separar `/api/dashboard` en endpoints por recurso (`/api/metricas`, `/api/desempeno`, etc.) para reducir payload.
5. **Esquema de migraciones**: Usar Alembic para versionar cambios de esquema en lugar de SQL manual.
