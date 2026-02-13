# Arquitectura Frontend - Facturación Electrónica SaaS

Esta arquitectura está basada en el patrón **Core/Shared/Features**, diseñada para ser escalable y multitenant.

## Estructura de Carpetas

### `core/`
Contiene los elementos singleton de la aplicación (solo se instancian una vez).
- `services/`: Servicios globales como `AuthService`, `TokenService`.
- `interceptors/`: Lógica para procesar peticiones HTTP (auth, errores).
- `guards/`: Protección de rutas.
- `models/`: Interfaces TypeScript globales.

### `shared/`
Contiene componentes, directivas y pipes reutilizables en múltiples módulos.
- `components/`: Botones, inputs, tablas genéricas.
- `pipes/`: Formateo de moneda, fechas SRI, etc.

### `features/`
Módulos funcionales de la aplicación (Lazy Loaded).
- `auth/`: Login y registro de empresas.
- `dashboard/`: Resumen ejecutivo.
- `clientes/`: Gestión de clientes.
- `productos/`: Catálogo de productos.
- `facturas/`: Emisión y listado de facturas.

### `layout/`
Componentes que definen la estructura visual global.
- `MainLayout`: Contenedor principal con header y sidebar.

## Flujo de Autenticación
1. El usuario inicia sesión -> `AuthService.login()`.
2. Se guardan tokens en `localStorage` vía `TokenService`.
3. El `authInterceptor` agrega el token a cada petición.
4. Si un token expira (401), el `errorInterceptor` intenta renovarlo con el `refreshToken`.
