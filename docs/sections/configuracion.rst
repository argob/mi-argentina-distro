.. _configuracion:

Configuración
#############

Configurar settings.json
========================

| **1) Configurar OpenId 'oidc'**.
| Configurar los Endpoints correspondientes segun el ambiente donde se este desarrollando.
| Para este paso es muy importante haber completado la configuracion del entorno de ID.

- oidc::

    {
      "authEndpoint": "http://project-id.gob.ar/authorize/",
      "tokenEndpoint": "http://project-id.gob.ar/token/",
      "userinfoEndpoint": "http://project-id.gob.ar/userinfo/",
      "clientId": "your-client-id",
      "secret": "your-secret-id"
    }

| **2) Configurar 'public'**.
| Esto es para uso interno de la aplicacion, para lograr un correcto flujo de rutas.

- public::

    {
      "id": "http://project-id.gob.ar",
      "miargentina": "http://project-mi-argentina.gob.ar",
    }

| **3) Configurar 'globalInfo'**.
| Setear el ambiente q corresponda: 'LOCAL' / 'QA' / 'PROD'.
| Configurar los Endpoints de APIGateway junto con las credenciales correspondientes.

- globalInfo::

    {
      "ambiente": "AMBIENTE DE EJECUCION DEL PROYECTO",
      "apiGateway": {
        "urlEndpoint": "http://URL-API",
        "tokenEndpoint": "/auth/login",
        "username": false,
        "password": false
      }
    }

| **4) Configurar 'mailgun' y 'sentry'** *(Opcional)*
| Estas aplicaciones son opcionales, mailgun es para envio de mails y sentry para reporte de errores.
| En caso de utilizar alguna herramienta de terceros hay que hacerlo de la siguiente manera:

- mailgun::

    {
      "key": "key",
      "domain": "domain",
      "from": "MiArgentina"
    }

- sentry::

    {
      "key": "key",
      "domain": "domain"
    }
