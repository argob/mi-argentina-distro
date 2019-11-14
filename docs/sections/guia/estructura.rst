.. _estructura:

Estructura
##########

Carpetas
========

| Podemos encontrar en el root del proyecto 7 carpetas principales con sus correspondientes subcarpetas, como se ve en el siguiente gráfico:

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

| Al descargar en repositorio podran encontrar algunos ejemplos de vistas y metodos.

| **Recomendaciones**:

  - Generar componentes que permitan reutilizarse en distintos templates en la carpeta `client/views/global/`
  - En las secciones se suelen poner templates padres que contengan mas de un servicio.
  - Agrupar los servicios nuevos en subcarpetas de la carpeta `client/views/servicios/`
  - Si el servicio usa alguna funcionalidad del backend o consume algun servicio externo crear una subcarpeta con el nombre del servicio en la carpeta `server/methods/`

Archivos
========

| Para mantener un codigo homogéneo, se recomienda usar el mismo nombre para el html que contenga el template como para su respectivo js siempre y cuando el contenido sea dinamico o haya eventos en el mismo.
| En el caso de que exista un Metodo q realizara una accion en el Backend, se recomienda poner esta funcion en un archivo nuevo, especialmente si es una funcion que se reutilizara.

::

  .
  ├── ejemplo.html
  ├── ejemplo.js
  └── method.js
