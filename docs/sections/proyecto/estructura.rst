.. _estructura:

Estructura
##########

Carpetas
========

| El root del proyecto cuenta con 7 carpetas principales con sus correspondientes subcarpetas como se ve en el siguiente gráfico:

::

  .
  ├── client
  │   └── views
  │       ├── global
  │       │   ├── Alertas
  │       │   ├── Botones
  │       │   ├── Errores
  │       │   ├── Loading
  │       │   ├── Menu
  │       │   ├── Modals
  │       │   ├── Paginacion
  │       │   ├── Panels
  │       │   └── TitleSection
  │       ├── secciones
  │       └── servicios
  ├── imports
  │   ├── client
  ├── lib
  ├── packages
  │   ├── mailgun
  │   ├── miar-moment-locale-es
  │   ├── oidc-client
  │   └── sentry
  ├── private
  ├── public
  │   ├── css
  │   ├── fonts
  │   ├── img
  │   │   └── logos
  │   ├── js
  └── server
      └── methods
          └── User

| Al descargar el repositorio se podrán encontrar algunos ejemplos de vistas y métodos.

| **Recomendaciones**:

  - Generar componentes que permitan reutilizarse en distintos templates en la carpeta `client/views/global/`
  - En las secciones se recomienda utilizar templates padres que contengan más de un servicio.
  - Agrupar los servicios nuevos en subcarpetas de la carpeta `client/views/servicios/`
  - Si el servicio usa alguna funcionalidad del backend o consume algún servicio externo crear una subcarpeta con el nombre del servicio en la carpeta `server/methods/`

Archivos
========

| Para mantener un código homogéneo, se recomienda usar el mismo nombre para el html que contenga el template como para su respectivo js, siempre y cuando el contenido sea dinámico o haya eventos en el mismo.
| En el caso de que exista un método que realizara una acción en el Backend, se recomienda poner esta función en un archivo nuevo, especialmente si esa función se reutilizará.

::

  .
  ├── ejemplo.html
  ├── ejemplo.js
  └── method.js
