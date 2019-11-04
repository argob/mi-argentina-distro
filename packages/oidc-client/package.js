Package.describe({
  name: 'id:oidc-client',
  version: '0.0.1',
  summary: 'ID Argentina OpenID Connect RP implementation for Meteor Accounts',
  git: '',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.use('ecmascript');
  api.use('accounts-base', ['client', 'server'])
  api.use('accounts-oauth', ['client', 'server'])
  api.use('oauth', ['client', 'server'])
  api.use('oauth2', ['client', 'server'])
  api.use('http', 'server')
  api.use('templating', 'client')
  api.use('underscore', 'client')
  api.use('random', 'client')
  api.use('service-configuration', ['client', 'server'])
  api.export('OIDC')
  api.addFiles('oidc_server.js', 'server')
  api.addFiles('oidc_client.js', 'client')
})
