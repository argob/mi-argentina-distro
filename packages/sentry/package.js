Package.describe({
  name: 'miar:sentry',
  version: '0.0.1',
  summary: 'Sentry',
  git: '',
  documentation: 'README.md'
})

Npm.depends({
  'raven': '2.6.2',
  'raven-js': '3.27.2'
});

Package.onUse(function (api) {
  api.use('ecmascript');
  api.versionsFrom('METEOR@1.0');
  api.export('Sentry');
  api.addFiles('./raven.js', 'server');
})
