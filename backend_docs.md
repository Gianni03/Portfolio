# Documentación del Backend y Arquitectura

Este documento detalla la arquitectura, tecnologías y patrones de implementación utilizados en el backend de la aplicación de Portafolio. Ha sido diseñado para servir como referencia técnica y defensa del proyecto.

## 1. Visión General de la Arquitectura

La aplicación sigue una arquitectura **Serverless / BaaS (Backend as a Service)** utilizando **Supabase**. Esto permite que el frontend (React) interactúe directamente con la base de datos y los servicios de autenticación y almacenamiento sin necesidad de un servidor intermedio dedicado (como Node.js o Express) para estas tareas.

Excepción: El envío de correos electrónicos se maneja a través de un script **PHP** tradicional alojado en el servidor, proporcionando una solución simple y robusta para el formulario de contacto.

### Diagrama de Flujo de Datos

- **React Client** <--> **Supabase JS Client** <--> **PostgreSQL / Storage**
- **React Client** --> **PHP Script** --> **Servidor SMTP (Email)**

## 2. Tecnologías Clave

- **Supabase**: Plataforma Open Source alternativa a Firebase. Provee:
  - **Base de Datos**: PostgreSQL.
  - **API**: API RESTful generada automáticamente (accedida vía `@supabase/supabase-js`).
  - **Storage**: Almacenamiento de objetos para imágenes.
  - **Auth**: Gestión de usuarios (utilizado para el panel de administración).
- **PHP**: Utilizado exclusivamente para el endpoint de envío de emails (`mail.php`).
- **Axios / Fetch**: Utilizado implícitamente por el cliente de Supabase y para llamar al script PHP.

## 3. Esquema de Base de Datos (Supabase)

La base de datos relacional PostgreSQL contiene las siguientes tablas principales:

### `projects`

Almacena la información de los proyectos mostrados en el portafolio.

- `id`: UUID (Primary Key).
- `created_at`: Timestamp.
- `title`: Texto (Título del proyecto).
- `description`: Texto (Detalle del proyecto).
- `stack`: Array (Lista de tecnologías usadas).
- `image`: Texto (URL pública de la imagen en Supabase Storage).
- `demo_url`: Texto (Link al deploy).
- `repo_url`: Texto (Link al repositorio).

### `studies`

Almacena la información académica y cursos.

- `id`: UUID (Primary Key).
- `created_at`: Timestamp.
- `title`: Texto (Nombre del estudio/curso).
- `institution`: Texto (Lugar de estudio).
- `year`: Texto/Numérico (Año de cursada).
- `description`: Texto (Detalles adicionales).
- `image`: Texto (URL pública del certificado o logo).

## 4. Estructura de la API (`src/api`)

La lógica de interacción con Supabase está encapsulada en módulos específicos dentro de `src/api` para mantener el código limpio y separado de la UI.

### `projects.supabase.js`

- **`getProjects()`**: Obtiene todos los proyectos ordenados por fecha de creación.
- **`addProject(data)`**:
  1. Sube la imagen al bucket `projects`.
  2. Obtiene la URL pública.
  3. Inserta el registro en la tabla `projects` con la URL de la imagen.
- **`updateProject(id, updates)`**: Actualiza campos específicos de un proyecto.
- **`deleteProject(id)`**: Elimina un proyecto por ID.

### `studies.supabase.js`

- **`getStudies()`**: Recupera el historial de estudios.
- **`addStudy(data)`**:
  1. Valida campos requeridos.
  2. Sube imagen al bucket `studies` (si existe).
  3. Inserta el registro en la DB.
- **`updateStudy(id, updates)`**: Actualiza un estudio.
- **`deleteStudy(id)`**: Elimina un estudio.

## 5. Estrategia de Almacenamiento (Storage)

Se utilizan **Buckets** de Supabase para almacenar archivos estáticos (imágenes).

- **Bucket `projects`**: Imágenes de portada de los proyectos.
- **Bucket `studies`**: Certificados o logos de instituciones.

El flujo de subida implementado en el código:

1. El archivo se recibe desde el formulario en el frontend.
2. Se genera un nombre único: `tipo-${Date.now()}-${nombre_archivo}`.
3. Se sube usando `supabase.storage.from(...).upload(...)`.
4. Se obtiene la URL pública con `getPublicUrl(...)` y se guarda esa referencia en la SQL, no el archivo binario.

## 6. Variables de Entorno y Seguridad

La conexión se maneja mediante variables de entorno en el archivo `.env` (no incluido en el repositorio por seguridad):

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica-anonima
```

> **Nota de Seguridad**: La `ANON_KEY` es segura para exponer en el navegador siempre y cuando se configuren las políticas **RLS (Row Level Security)** en Supabase para restringir las escrituras/borrados solo a usuarios autenticados (Admin).

## 7. Keep-alive de Supabase

El plan Free de Supabase pausa los proyectos que no registran **actividad de base de datos** durante 7 días. Los sitios de portafolio reciben visitas esporádicas, así que sin intervención el proyecto se pausa y el sitio queda sin contenido dinámico.

Ubicación: `netlify/functions/keep-alive.mjs`

Es una **Netlify Scheduled Function** que corre cada 6 horas y ejecuta un `GET` contra PostgREST:

```
GET {VITE_SUPABASE_URL}/rest/v1/projects?select=id&limit=1
```

Detalle importante: el ping va a PostgREST y no a `/auth/v1/health`. El endpoint de health responde sin consultar PostgreSQL, por lo que **no reinicia el contador de inactividad**. Una lectura vía PostgREST evalúa las políticas RLS y ejecuta una query real, que es lo que Supabase mide.

Respuestas de la función:

- `200`: la query se ejecutó correctamente.
- `500`: faltan `VITE_SUPABASE_URL` o `VITE_SUPABASE_ANON_KEY` en el entorno de Netlify.
- `502`: Supabase respondió con error o la petición falló. El detalle queda en los logs de la función, sin exponer la key.

No requiere configuración adicional en el dashboard: la función reutiliza las mismas variables de entorno que ya usa el build. Los logs se consultan en Netlify → Functions → `keep-alive`.

## 8. Sistema de Correo Contacto

Ubicación: `/php/mail.php`

- Recibe peticiones POST desde el formulario de contacto.
- Sanitiza los inputs (`strip_tags`, `filter_var`) para prevenir inyecciones.
- Utiliza la función nativa `mail()` de PHP para el envío.
- Retorna códigos de estado HTTP (200, 400, 500) para que el frontend pueda mostrar feedback (Success/Error).
