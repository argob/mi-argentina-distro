.. _configuracion:

Configuración
#############

Configurar settings.json
========================

| **1) Configurar OpenId 'oidc'**.
| Configurar los Endpoints correspondientes según el ambiente donde se esté desarrollando.
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
| Esta configuración es de uso interno de la aplicación para lograr un correcto flujo de rutas.

- public::

    {
      "id": "http://project-id.gob.ar",
      "miargentina": "http://project-mi-argentina.gob.ar",
    }

| **3) Configurar 'webApp'**.
| Setear el ambiente que corresponda: 'LOCAL' / 'QA' / 'PROD'.

- webApp::

    {
      "ambiente": "AMBIENTE DE EJECUCION DEL PROYECTO",
      "session": {
        "expire": {
          "time": 50,
          "attr": "minutes"
        },
        "revoke": {
          "time": 5,
          "attr": "hours"
        }
      }
    }

| **4) Configurar 'apiGateway'**.
| Configurar los Endpoints de APIGateway junto con las credenciales correspondientes.

- apiGateway::

    {
      "urlEndpoint": "http://URL-API",
      "tokenEndpoint": "/auth/login",
      "username": false,
      "password": false
    }

| **5) Configurar 'mailgun' y 'sentry'** *(Opcional)*
| Estas aplicaciones son opcionales. Mailgun es para envío de mails y Sentry para reporte de errores.

| En caso de utilizar alguna otra herramienta de terceros hay que hacerlo de la misma manera:

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
