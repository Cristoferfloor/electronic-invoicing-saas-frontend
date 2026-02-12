# 📘 DOCUMENTACIÓN DE CONFIGURACIÓN - Frontend Angular
## Sistema de Facturación Electrónica SaaS Multitenant

**Tecnología:** Angular 21.1.0 (última versión)
**Estilos:** SCSS
**Fecha de inicio:** 12 de Febrero 2026

---

## 📋 ÍNDICE DE PASOS

| # | Paso | Estado | Descripción |
|---|------|--------|-------------|
| 0 | Creación del proyecto Angular | ✅ HECHO | Proyecto base creado con Angular CLI |
| 1 | Estructura de carpetas | ✅ HECHO | Carpetas organizadas por módulos |
| 2 | Environments | ⬜ PENDIENTE | Variables de entorno (dev/prod) |
| 3 | Modelos/Interfaces | ⬜ PENDIENTE | Tipos TypeScript del sistema |
| 4 | Constantes | ⬜ PENDIENTE | Endpoints API, roles, IVA |
| 5 | Servicio HTTP base | ⬜ PENDIENTE | Servicio centralizado para llamadas API |
| 6 | Servicio de Storage | ⬜ PENDIENTE | Manejo de localStorage |
| 7 | Servicio de Token | ⬜ PENDIENTE | Manejo de JWT tokens |
| 8 | Servicio de Auth | ⬜ PENDIENTE | Login, registro, logout |
| 9 | Servicio de Loading | ⬜ PENDIENTE | Estado de carga global |
| 10 | Servicio de Alertas | ⬜ PENDIENTE | Notificaciones toast |
| 11 | Guard de Autenticación | ⬜ PENDIENTE | Proteger rutas privadas |
| 12 | Guard de Roles | ⬜ PENDIENTE | Proteger rutas por rol |
| 13 | Interceptor de Auth | ⬜ PENDIENTE | Agregar JWT a requests |
| 14 | Interceptor de Errores | ⬜ PENDIENTE | Manejo global de errores HTTP |
| 15 | Interceptor de Loading | ⬜ PENDIENTE | Mostrar/ocultar carga |
| 16 | Validadores Ecuador | ⬜ PENDIENTE | Validación cédula/RUC ecuatoriano |
| 17 | Estilos globales SCSS | ⬜ PENDIENTE | Paleta de colores, tipografía, variables |
| 18 | app.config.ts | ⬜ PENDIENTE | Configurar HttpClient + interceptores |
| 19 | Layout (Header) | ⬜ PENDIENTE | Barra superior de la app |
| 20 | Layout (Sidebar) | ⬜ PENDIENTE | Menú lateral de navegación |
| 21 | Layout (Footer) | ⬜ PENDIENTE | Pie de página |
| 22 | Layout (Main Layout) | ⬜ PENDIENTE | Contenedor principal |
| 23 | Componentes UI base | ⬜ PENDIENTE | Card, Modal, Loader, Alert, Pagination |
| 24 | Rutas principales | ⬜ PENDIENTE | Routing con lazy loading |
| 25 | Verificación final | ⬜ PENDIENTE | Compilar y correr en localhost:4200 |

---

## ✅ PASO 0 - CREACIÓN DEL PROYECTO ANGULAR (YA HECHO)

### ¿Qué se hizo?
Se creó el proyecto Angular usando Angular CLI con la última versión disponible (21.1.4).

### Comando ejecutado:
```bash
npx -y @angular/cli@latest new electronic-invoicing-saas \
  --directory ./ \
  --style scss \
  --routing \
  --standalone \
  --strict \
  --prefix app \
  --skip-git \
  --ssr false \
  --interactive false \
  --package-manager npm \
  --file-name-style-guide 2016 \
  --force
```

### ¿Por qué estas opciones?
| Opción | Valor | Razón |
|--------|-------|-------|
| `--style scss` | SCSS | Preprocesador CSS con variables, nesting, mixins |
| `--routing` | sí | El sistema necesita navegación entre páginas |
| `--standalone` | sí | Componentes independientes (sin NgModules), patrón moderno de Angular |
| `--strict` | sí | TypeScript estricto = menos bugs |
| `--skip-git` | sí | Ya teníamos un .git en la carpeta |
| `--ssr false` | no SSR | No necesitamos Server Side Rendering |
| `--file-name-style-guide 2016` | 2016 | Nombres de archivo con sufijo tipo: `app.component.ts` (más claro) |
| `--prefix app` | app | Los selectores de componentes empiezan con `app-` |

### Resultado - Archivos generados por Angular CLI:
```
📁 Raíz del proyecto
├── angular.json          ← Configuración del proyecto Angular
├── package.json          ← Dependencias npm
├── tsconfig.json         ← Configuración TypeScript base
├── tsconfig.app.json     ← Configuración TS para la aplicación
├── tsconfig.spec.json    ← Configuración TS para tests
├── .editorconfig         ← Reglas de formato del editor
├── .gitignore            ← Archivos ignorados por git
├── README.md             ← Documentación inicial
│
📁 src/
├── index.html            ← HTML principal (punto de entrada)
├── main.ts               ← Archivo principal que arranca Angular
├── styles.scss           ← Estilos globales
│
📁 src/app/
├── app.component.ts      ← Componente raíz de la app
├── app.component.html    ← Template del componente raíz
├── app.component.scss    ← Estilos del componente raíz
├── app.component.spec.ts ← Test del componente raíz
├── app.config.ts         ← Configuración de providers (interceptores, router, etc.)
├── app.routes.ts         ← Definición de rutas principales
```

### Versiones instaladas:
- **Angular:** 21.1.0
- **TypeScript:** 5.9.2
- **Node.js:** 20.19.6
- **npm:** 10.8.2
- **Test runner:** Vitest 4.0.8

---

## ✅ PASO 1 - ESTRUCTURA DE CARPETAS (YA HECHO)

### ¿Qué se hizo?
Se crearon las carpetas que organizan el código del proyecto. La estructura sigue el patrón recomendado por Angular: **core**, **shared**, **features**.

### Comando ejecutado:
```bash
mkdir -p src/app/core/{services,guards,interceptors,models,constants}
mkdir -p src/app/shared/{components/{button,card,modal,table,pagination,loader,alert},pipes,directives,validators}
mkdir -p src/app/features/{auth/components/{login,register-tenant},dashboard/components,tenants/components/{tenant-settings,onboarding},users/components/{user-list,user-form,user-profile},clientes/components/{clientes-list,cliente-form,cliente-detail},productos/components/{productos-list,producto-form},facturas/components/{factura-create,facturas-list,factura-detail},reportes/components}
mkdir -p src/app/layout/{header,sidebar,footer,main-layout}
mkdir -p src/environments
```

### ¿Por qué esta estructura?

```
src/app/
│
├── 📁 core/                ← Código que se usa EN TODA la app (solo se carga 1 vez)
│   ├── services/           ← Servicios globales (HTTP, Auth, Token, Storage)
│   ├── guards/             ← Protectores de rutas (¿está logueado? ¿es admin?)
│   ├── interceptors/       ← Interceptan TODAS las peticiones HTTP
│   ├── models/             ← Interfaces/tipos TypeScript (Tenant, User, Factura, etc.)
│   └── constants/          ← Valores fijos (URLs de API, IVA 15%, roles)
│
├── 📁 shared/              ← Componentes REUTILIZABLES en cualquier parte
│   ├── components/         ← Componentes UI genéricos
│   │   ├── button/         ← Botón estilizado reutilizable
│   │   ├── card/           ← Tarjeta/contenedor visual
│   │   ├── modal/          ← Ventana emergente (diálogo)
│   │   ├── table/          ← Tabla de datos
│   │   ├── pagination/     ← Paginación (Anterior 1 2 3 Siguiente)
│   │   ├── loader/         ← Indicador de carga (spinner)
│   │   └── alert/          ← Notificaciones toast
│   ├── pipes/              ← Transformadores de datos en templates
│   ├── directives/         ← Directivas personalizadas
│   └── validators/         ← Validadores personalizados (cédula, RUC Ecuador)
│
├── 📁 features/            ← MÓDULOS DE NEGOCIO (cada Sprint agrega aquí)
│   ├── auth/               ← Sprint 1: Login y Registro
│   │   └── components/
│   │       ├── login/
│   │       └── register-tenant/
│   ├── dashboard/          ← Sprint 6: Dashboard con KPIs y gráficas
│   │   └── components/
│   ├── tenants/            ← Sprint 2: Configuración de empresa
│   │   └── components/
│   │       ├── tenant-settings/
│   │       └── onboarding/
│   ├── users/              ← Sprint 2: Gestión de usuarios
│   │   └── components/
│   │       ├── user-list/
│   │       ├── user-form/
│   │       └── user-profile/
│   ├── clientes/           ← Sprint 3: CRUD de clientes
│   │   └── components/
│   │       ├── clientes-list/
│   │       ├── cliente-form/
│   │       └── cliente-detail/
│   ├── productos/          ← Sprint 3: Catálogo de productos
│   │   └── components/
│   │       ├── productos-list/
│   │       └── producto-form/
│   ├── facturas/           ← Sprint 4: Facturación core
│   │   └── components/
│   │       ├── factura-create/
│   │       ├── facturas-list/
│   │       └── factura-detail/
│   └── reportes/           ← Sprint 6: Reportes
│       └── components/
│
├── 📁 layout/              ← Estructura visual de la app (esqueleto)
│   ├── header/             ← Barra superior (logo, usuario, logout)
│   ├── sidebar/            ← Menú lateral de navegación
│   ├── footer/             ← Pie de página
│   └── main-layout/        ← Contenedor que une header + sidebar + contenido
│
└── 📁 environments/        ← Variables por ambiente
    ├── environment.ts              ← Desarrollo (localhost:3000)
    └── environment.production.ts   ← Producción (dominio real)
```

### ¿Cómo se relaciona con los Sprints?

| Carpeta | Sprint | Módulo |
|---------|--------|--------|
| `core/` | Sprint 0.2 | Configuración base |
| `shared/` | Sprint 0.2 | Componentes reutilizables |
| `layout/` | Sprint 0.2 | Estructura visual |
| `features/auth/` | Sprint 1 | Autenticación y Registro |
| `features/tenants/` | Sprint 2 | Gestión de empresa |
| `features/users/` | Sprint 2 | Gestión de usuarios |
| `features/clientes/` | Sprint 3 | CRUD Clientes |
| `features/productos/` | Sprint 3 | Catálogo Productos |
| `features/facturas/` | Sprint 4 | Facturación Core |
| `features/reportes/` | Sprint 6 | Dashboard y Reportes |

---

## ⬜ PASO 2 - ENVIRONMENTS (SIGUIENTE PASO)

### ¿Qué vamos a hacer?
Crear los archivos de variables de entorno para diferenciar entre:
- **Desarrollo:** API en `localhost:3000`
- **Producción:** API en el dominio real

### ¿Para qué sirven?
Cuando el frontend necesita llamar al backend, necesita saber la URL.
En desarrollo es `http://localhost:3000/api` pero en producción será diferente.
Los environments permiten cambiar estas variables automáticamente según el ambiente.

### Archivos a crear:
- `src/environments/environment.ts` (desarrollo)
- `src/environments/environment.production.ts` (producción)

---

*📌 Para continuar con el Paso 2, dime "siguiente" o "paso 2" y lo implementamos juntos.*
