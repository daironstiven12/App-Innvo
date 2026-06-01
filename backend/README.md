# Académico App — Backend

Backend REST API para la aplicación móvil académica construido con **FastAPI**, **SQLAlchemy** y **MySQL**.

---

## Requisitos

- Python 3.10+
- MySQL 8.0+
- pip

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd backend
```

### 2. Crear entorno virtual

```bash
python -m venv venv
```

**Windows:**
```bash
venv\Scripts\activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

---

## Base de datos

### 1. Crear la base de datos y tablas

Abre MySQL (Workbench, terminal o cualquier cliente) y ejecuta:

```sql
source database/schema.sql
```

### 2. Poblar con datos de prueba

```sql
source database/seed.sql
```

O desde la terminal:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

> Nota: Si tu MySQL no tiene contraseña, omite `-p`.

---

## Configuración de conexión

Edita `app/core/database.py` si tu configuración MySQL es diferente:

```python
DB_USER = "root"
DB_PASSWORD = ""
DB_HOST = "localhost"
DB_PORT = "3306"
DB_NAME = "academico_app"
```

---

## Iniciar servidor

```bash
uvicorn app.main:app --reload
```

El servidor se iniciará en:

- **API**: http://localhost:8000
- **Documentación Swagger**: http://localhost:8000/docs
- **Health check**: http://localhost:8000/health

---

## Endpoints

| Método | Ruta             | Descripción                          |
|--------|------------------|--------------------------------------|
| GET    | `/`              | Información básica de la API         |
| GET    | `/health`        | Health check                         |
| GET    | `/api/dashboard` | JSON completo para la app móvil      |

### GET /api/dashboard

Devuelve la estructura:

```json
{
  "estudiante": { ... },
  "metricas": [ ... ],
  "horario": [ ... ],
  "calificaciones": [ ... ],
  "desempeno": { "niveles": [...], "comparativa": [...] },
  "comparativas": { "categorias": [...], "grupos": [...] },
  "comunicados": [ ... ],
  "periodos": [ ... ]
}
```

---

## Conectar React Native

Desde la app móvil (Expo / React Native), consume el endpoint:

```js
const response = await fetch("http://<IP-DEL-SERVIDOR>:8000/api/dashboard");
const data = await response.json();
```

En desarrollo local usa `localhost`. En dispositivo físico usa la IP local de tu máquina (ej. `192.168.x.x`).

---

## Estructura del proyecto

```
backend/
├── app/
│   ├── main.py                  # FastAPI entry point
│   ├── core/
│   │   └── database.py          # SQLAlchemy connection
│   ├── models/                  # SQLAlchemy models
│   │   ├── estudiante.py
│   │   ├── materias.py
│   │   ├── calificaciones.py
│   │   ├── horario.py
│   │   ├── metricas.py
│   │   ├── desempeno.py
│   │   ├── comparativas.py
│   │   ├── comunicados.py
│   │   └── periodos.py
│   ├── routes/
│   │   └── dashboard.py         # API routes
│   ├── services/
│   │   └── dashboard_service.py # Business logic
│   └── schemas/                 # (reserved)
├── database/
│   ├── schema.sql               # Database schema
│   └── seed.sql                 # Test data
├── requirements.txt
└── README.md
```
