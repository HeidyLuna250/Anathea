# 🧬 ANATHEA

**Atlas Anatómico Humano 3D Interactivo**

Plataforma educativa de anatomía humana que permite explorar el cuerpo humano de forma interactiva mediante modelos 3D, información anatómica detallada y referencias bibliográficas.

## 🏗️ Arquitectura

Monorepo con npm workspaces:

```
anathea/
├── client/    → Frontend (React + TypeScript + Vite + Tailwind CSS + Three.js)
├── server/    → Backend (Express + TypeScript + Prisma + PostgreSQL)
└── shared/    → Tipos TypeScript compartidos
```

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env con tu contraseña de PostgreSQL

# Desarrollo
npm run dev
```

## 📦 Tecnologías

| Área | Stack |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS v4, Three.js, React Three Fiber |
| Backend | Node.js, Express, TypeScript, Prisma ORM |
| Base de datos | PostgreSQL 18 |
| Estado | Zustand, TanStack Query |
| 3D | Three.js, React Three Fiber, Drei |

## 📄 Licencia

MIT
