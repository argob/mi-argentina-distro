var Raven = Npm.require('raven');
Raven.config('https://' + Meteor.settings.sentry.key + '@' + Meteor.settings.sentry.domain + '/2', {
  environment: Meteor.settings.webApp.ambiente
}).install();

Sentry = {
  captureError: function (obj) {
    try {
      let formatError = obj.error

      if (formatError.response) {
        obj.statusCode = formatError.response.statusCode
        obj.message = formatError.response.content
      } else {
        if (formatError.code) {
          obj.statusCode = formatError.code
          obj.message = JSON.stringify(formatError)
        } else {
          obj.statusCode = formatError.name ? formatError.name : formatError.message;
          obj.message = formatError.message
        }
      }

      obj.error.name = obj.service
      obj.error.message = obj.statusCode + (formatError && formatError.response && formatError.response.data.userMessage ? '-' + obj.error.response.data.userMessage: '')

      Raven.captureException(obj.error,
        {
          user: { id: obj.user },
          tags: {
            status_code: obj.statusCode,
            service: obj.service
          },
          extra: {
            file: obj.file,
            platform: obj.platform,
            userMessage: formatError && formatError.response? formatError.response.data.userMessage : '',
            developerMessage: formatError && formatError.response? formatError.response.data.developerMessage : '',
            params: obj.params
          }
        }
      )
    } catch (e) {
      Raven.captureException(e)
    }
  }
}
