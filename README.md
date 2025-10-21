# 📌 Task Management API

Task Management API es un backend profesional inspirado en herramientas como **Trello** y **Asana**, diseñado para gestionar proyectos, tareas y colaboradores dentro de un entorno seguro con autenticación, autorización por roles y estadísticas de uso.  

Este proyecto fue desarrollado con el objetivo de demostrar habilidades backend con **Node.js, TypeScript, Prisma, PostgreSQL, JWT y Docker**, ideal para entornos productivos y escalables.

---

## 🚀 Demo en Producción

API disponible en Railway:

🔗 https://tasking-production.up.railway.app

Documentación Swagger:

🔗 https://tasking-production.up.railway.app/api/docs

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
- Dashboard de estadísticas
- Validaciones con Zod
- Documentación con Swagger
- Arquitectura modular y mantenible

---

## 🛠️ Tecnologías utilizadas

| Área | Tecnología |
|--------|------------|
| **Runtime** | Node.js |
| **Lenguaje** | TypeScript |
| **Framework** | Express |
| **ORM** | Prisma |
| **Base de datos** | PostgreSQL |
| **Autenticación** | JWT + bcrypt |
| **Validación** | Zod |
| **Infraestructura** | Docker + Railway |
| **Docs** | Swagger UI |

---

## 🧱 Arquitectura del Proyecto

El backend sigue una arquitectura modular con las siguientes capas:

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

| Grupo | Path base |
|---------|----------|
| Auth | `/api/auth` |
| Projects | `/api/projects` |
| Tasks | `/api/tasks` |
| Dashboard | `/api/dashboard` |

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
