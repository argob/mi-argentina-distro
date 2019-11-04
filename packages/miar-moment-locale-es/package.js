Package.describe({
  name: 'miar:moment-locale-es',
  version: '0.0.1',
  summary: 'MiArgentina load español',
  git: '',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.use('momentjs:moment', ['client', 'server'])
  api.addFiles('client.js', ['client', 'server'])
  api.addFiles('es.js', ['client', 'server'])
  api.imply('momentjs:moment', ['client', 'server'])
})
