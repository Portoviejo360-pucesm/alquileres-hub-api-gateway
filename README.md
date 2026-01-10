# Estructura del API Gateway - Sistema de Gestión de Alquileres

## 📁 Estructura Completa del Proyecto

```
rental-api-gateway/
│
├── src/
│   │
│   ├── config/                          # Configuraciones
│   │   ├── index.js                     # Config general (puerto, env, etc)
│   │   ├── services.js                  # URLs de los 4 microservicios
│   │   ├── roles.js                     # Roles y permisos
│   │   ├── database.js                  # Config de BD (si aplica)
│   │   └── redis.js                     # Config de cache
│   │
│   ├── middleware/                      # Middlewares
│   │   ├── auth.js                      # Autenticación JWT
│   │   ├── roleCheck.js                 # Verificación de roles
│   │   ├── rateLimiter.js               # Rate limiting
│   │   ├── validator.js                 # Validación de requests
│   │   ├── logger.js                    # Logging personalizado
│   │   ├── errorHandler.js              # Manejo global de errores
│   │   ├── upload.js                    # Manejo de archivos
│   │   └── cors.js                      # CORS personalizado
│   │
│   ├── routes/                          # Rutas del Gateway
│   │   │
│   │   ├── index.js                     # Router principal que une todo
│   │   │
│   │   ├── auth.js                      # Autenticación
│   │   │                                # - POST /register
│   │   │                                # - POST /login
│   │   │                                # - POST /logout
│   │   │                                # - POST /refresh-token
│   │   │                                # - POST /forgot-password
│   │   │                                # - PUT /reset-password
│   │   │
│   │   ├── propiedades.js               # Módulo 1: Propiedades
│   │   │                                # Arrendadores:
│   │   │                                # - GET /landlords
│   │   │                                # - GET /landlords/:id
│   │   │                                # - POST /landlords
│   │   │                                # - PUT /landlords/:id
│   │   │                                # - DELETE /landlords/:id
│   │   │                                # Propiedades:
│   │   │                                # - GET /properties
│   │   │                                # - GET /properties/:id
│   │   │                                # - POST /properties
│   │   │                                # - PUT /properties/:id
│   │   │                                # - DELETE /properties/:id
│   │   │                                # - PATCH /properties/:id/status
│   │   │                                # - POST /properties/:id/photos
│   │   │                                # - DELETE /properties/:id/photos/:photoId
│   │   │
│   │   ├── inquilinos.js                # Módulo 2: Inquilinos y Contratos
│   │   │                                # Inquilinos:
│   │   │                                # - GET /tenants
│   │   │                                # - GET /tenants/:id
│   │   │                                # - POST /tenants
│   │   │                                # - PUT /tenants/:id
│   │   │                                # - DELETE /tenants/:id
│   │   │                                # - GET /tenants/:id/history
│   │   │                                # Contratos:
│   │   │                                # - GET /contracts
│   │   │                                # - GET /contracts/:id
│   │   │                                # - POST /contracts
│   │   │                                # - PUT /contracts/:id
│   │   │                                # - DELETE /contracts/:id
│   │   │                                # - GET /contracts/:id/pdf
│   │   │                                # - POST /contracts/:id/sign
│   │   │                                # - GET /contracts/expiring
│   │   │                                # - GET /contracts/active
│   │   │
│   │   ├── reportes.js                  # Módulo 3: Reportes y Mantenimiento
│   │   │                                # Reportes:
│   │   │                                # - GET /reports
│   │   │                                # - GET /reports/:id
│   │   │                                # - POST /reports
│   │   │                                # - PUT /reports/:id
│   │   │                                # - DELETE /reports/:id
│   │   │                                # - PATCH /reports/:id/status
│   │   │                                # - POST /reports/:id/photos
│   │   │                                # Seguimiento:
│   │   │                                # - POST /reports/:id/comments
│   │   │                                # - GET /reports/:id/timeline
│   │   │                                # - POST /reports/:id/assign
│   │   │                                # Notificaciones:
│   │   │                                # - POST /reports/:id/notify
│   │   │                                # - GET /reports/notifications
│   │   │
│   │   ├── disponibilidad.js            # Módulo 4: Disponibilidad y Búsqueda
│   │   │                                # Búsqueda:
│   │   │                                # - GET /search
│   │   │                                # - POST /search/advanced
│   │   │                                # Disponibilidad:
│   │   │                                # - GET /calendar/:propertyId
│   │   │                                # - GET /dashboard
│   │   │                                # - GET /statistics
│   │   │                                # Favoritos:
│   │   │                                # - POST /favorites/:propertyId
│   │   │                                # - DELETE /favorites/:propertyId
│   │   │                                # - GET /favorites
│   │   │                                # Recomendaciones:
│   │   │                                # - GET /recommendations
│   │   │                                # - GET /similar/:propertyId
│   │   │
│   │   └── aggregation.js               # Endpoints que combinan datos
│   │                                    # - GET /landlord/dashboard
│   │                                    # - GET /tenant/dashboard
│   │                                    # - GET /property/:id/full
│   │                                    # - GET /admin/statistics
│   │
│   ├── services/                        # Servicios auxiliares
│   │   ├── proxy.js                     # Proxy HTTP a microservicios
│   │   ├── aggregator.js                # Agregación de datos
│   │   ├── cache.js                     # Gestión de cache (Redis)
│   │   └── notification.js              # Notificaciones (emails, push)
│   │
│   ├── utils/                           # Utilidades
│   │   ├── response.js                  # Respuestas estandarizadas
│   │   ├── validators.js                # Validadores personalizados
│   │   ├── errors.js                    # Clases de error personalizadas
│   │   └── helpers.js                   # Funciones auxiliares
│   │
│   └── app.js                           # Aplicación Express principal
│
├── tests/                               # Tests
│   ├── unit/                            # Tests unitarios
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── integration/                     # Tests de integración
│   │   ├── propiedades.test.js
│   │   ├── inquilinos.test.js
│   │   ├── reportes.test.js
│   │   └── desponibilidad.test.js
│   │
│   └── e2e/                            # Tests end-to-end
│       └── full-flow.test.js
│
├── docs/                                # Documentación
│   ├── api/
│   │   ├── swagger.json                 # Spec OpenAPI/Swagger
│   │   └── postman-collection.json      # Colección Postman
│   │
│   └── guides/
│       ├── setup.md                     # Guía de instalación
│       ├── deployment.md                # Guía de despliegue
│
├── scripts/                             # Scripts auxiliares
│   ├── seed.js                          # Datos de prueba
│   ├── migrate.js                       # Migraciones
│   └── health-check.js                  # Health check externo
│
├── .env.example                         # Ejemplo de variables de entorno
├── .env                                 # Variables de entorno (no versionar)
├── .gitignore                           # Archivos ignorados por git
├── .dockerignore                        # Archivos ignorados por Docker
├── Dockerfile                           # Imagen Docker del Gateway
├── docker-compose.yml                   # Orquestación con Docker Compose
├── package.json                         # Dependencias Node.js
├── package-lock.json                    # Lock de dependencias
├── README.md                            # Documentación principal
└── LICENSE                              # Licencia del proyecto
```

## 🎯 Mapeo de Rutas a Microservicios

```
┌─────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY :8000                            │
└────┬────────────┬────────────┬────────────┬─────────────────────────┘
     │            │            │            │
     │            │            │            │
     ▼            ▼            ▼            ▼
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────────┐
│Module 1 │  │Module 2 │  │Module 3 │  │  Module 4    │
│         │  │         │  │         │  │              │
│Properties│ │Tenants &│  │Reports &│  │Availability  │
│Service  │  │Contracts│  │Maintena.│  │& Search      │
│         │  │         │  │         │  │              │
│:8001    │  │:8002    │  │:8003    │  │:8004         │
└─────────┘  └─────────┘  └─────────┘  └──────────────┘
```

## 📋 Resumen de Responsabilidades

### API Gateway (Puerto 8000)
- ✅ Punto de entrada único
- ✅ Autenticación y autorización
- ✅ Rate limiting
- ✅ Logging centralizado
- ✅ Enrutamiento a microservicios
- ✅ Agregación de datos
- ✅ Cache de respuestas
- ✅ Transformación de requests/responses

### Módulo 1: Properties Service (Puerto 8001)
- Gestión de arrendadores
- Gestión de propiedades
- Almacenamiento de fotos
- Estados de propiedades
- Características y servicios

### Módulo 2: Tenants & Contracts Service (Puerto 8002)
- Gestión de inquilinos
- Historial de alquileres
- Gestión de contratos
- Generación de PDFs
- Control de fechas

### Módulo 3: Reports & Maintenance Service (Puerto 8003)
- Registro de incidentes
- Seguimiento de reparaciones
- Sistema de notificaciones
- Estados de casos
- Timeline de eventos

### Módulo 4: Availability & Search Service (Puerto 8004)
- Motor de búsqueda
- Filtros inteligentes
- Disponibilidad en tiempo real
- Recomendaciones
- Sistema de favoritos

## 🔄 Flujo de Datos Típico

```
1. Cliente hace request → API Gateway
2. Gateway valida JWT
3. Gateway verifica permisos
4. Gateway aplica rate limit
5. Gateway enruta a microservicio(s)
6. Microservicio(s) procesa(n)
7. Gateway agrega respuestas (si es necesario)
8. Gateway devuelve respuesta al cliente
```

## 🔐 Niveles de Seguridad

1. **Autenticación**: JWT en header Authorization
2. **Autorización**: Verificación de roles y permisos
3. **Rate Limiting**: Por IP y por usuario
4. **Validación**: Esquemas Joi/express-validator
5. **Sanitización**: Limpieza de inputs
6. **CORS**: Orígenes permitidos
7. **Helmet**: Headers de seguridad
8. **HTTPS**: En producción (obligatorio)

## 📊 Monitoreo y Logs

### Estructura de Logs
```
logs/
├── access.log       # Todas las peticiones
├── error.log        # Errores del servidor
├── gateway.log      # Logs del gateway
└── combined.log     # Todos los logs
```

### Métricas a Recopilar
- Requests por segundo
- Tiempo de respuesta promedio
- Tasa de errores
- Cache hit/miss ratio
- Uso de memoria y CPU
- Latencia de microservicios

---
