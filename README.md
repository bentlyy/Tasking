# 📌 Task Management API

Task Management API es un backend profesional inspirado en herramientas como **Trello** y **Asana**, diseñado para gestionar proyectos, tareas y colaboradores dentro de un entorno seguro con autenticación, autorización por roles, estadísticas y capacidades de IA (mock por ahora).

Este proyecto fue desarrollado con el objetivo de demostrar habilidades backend con **Node.js, TypeScript, Prisma, PostgreSQL, JWT y Docker**, ideal para entornos productivos y escalables.

---

## 🚀 Demo en Producción

| Recurso | URL |
|---------|-----|
| 🌍 API Deploy | https://tasking-production.up.railway.app |
| 📌 Swagger Docs | https://tasking-production.up.railway.app/api/docs |

---

## 🖥️ Captura (Swagger UI)

<img width="1102" height="576" alt="image" src="https://github.com/user-attachments/assets/485a7642-3280-4ac5-9590-8c0005ddefee" />

---

## ✅ Características principales

- Registro e inicio de sesión con JWT
- Gestión de proyectos
- Gestión de tareas
- Estados de tarea (Pendiente, En progreso, Completada)
- Asignación de tareas a otros usuarios
- Roles y permisos (Owner / Collaborator)
- Dashboard con estadísticas
- Validaciones con **Zod**
- Documentación con **Swagger**
- Arquitectura modular y mantenible
- **IA lista para conectar (mock actual)** → resumir tareas, generar subtareas y priorizarlas

---

## 🤖 IA Integrada (Mock Ready)

La API incluye endpoints listos para IA:

| Método | Endpoint | Descripción |
|---------|---------|-------------|
| `POST` | `/ai/summarize` | Genera un resumen corto basado en el texto |
| `POST` | `/ai/subtasks` | Sugiere subtareas automáticas |
| `GET` | `/ai/prioritize/:projectId` | Ordena tareas por prioridad |

> Actualmente funciona con **Mock**. Cuando quieras activamos **OpenAI, Gemini o IA local**, sin cambiar controladores ni rutas.

---

## 🛠️ Tecnologías utilizadas

| Área | Tecnología |
|--------|------------|
| **Runtime** | Node.js |
| **Lenguaje** | TypeScript |
| **Framework** | Express |
| **ORM** | Prisma |
| **Base de datos** | PostgreSQL |
| **Auth** | JWT + Bcrypt |
| **Validación** | Zod |
| **Infraestructura** | Docker + Railway |
| **Docs** | Swagger UI |

---

## 🧱 Arquitectura del Proyecto

```bash
src/
├─ routes/
├─ controllers/
├─ services/
├─ middlewares/
├─ dtos/
├─ config/
└─ prisma/

yaml
Copiar código

- `routes`: rutas de la API  
- `controllers`: lógica HTTP  
- `services`: lógica de negocio  
- `middlewares`: autenticación, validación y errores  
- `dtos`: validaciones Zod  
- `prisma`: ORM y schema

---

## 📌 Endpoints principales

🛠️ Endpoints Principales
Método	Endpoint	Descripción
POST	/auth/register	Crear usuario
POST	/auth/login	Login y obtención de token
GET	/auth/profile	Perfil (requiere JWT)
POST	/projects	Crear proyecto
GET	/projects	Listar proyectos
PUT	/projects/:id	Editar proyecto
DELETE	/projects/:id	Eliminar proyecto
POST	/tasks	Crear tarea
GET	/tasks/by-project/:projectId	Listar tareas

📌 *Endpoints completos en Swagger:*  
https://tasking-production.up.railway.app/api/docs

---

## 🧪 Ejecutar localmente (sin Docker)

```bash
git clone https://github.com/tuuser/Tasking.git
cd Tasking
npm install
npm run dev
Asegúrate de configurar tu .env:

env
Copiar código
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskdb"
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
🐳 Ejecutar con Docker (local)
bash
Copiar código
docker compose up --build
La API quedará disponible en:

arduino
Copiar código
http://localhost:3000
🔧 Scripts disponibles
Script	Acción
npm run dev	desarrollo con ts-node
npm run build	compila a JS
npm start	ejecuta la versión compilada
npx prisma studio	administra la BD visualmente

🧭 Roadmap
 Tests con Jest

 Roles avanzados (Admin / Owner / Collaborator)

 Notificaciones en tiempo real (WebSockets)

 Frontend en React

👤 Autor
Alejandro Muñoz Garay
🔗 LinkedIn: https://www.linkedin.com/in/alejandro-mu%C3%B1oz-garay-668324347/

📄 Licencia
MIT — libre para uso y modificación
