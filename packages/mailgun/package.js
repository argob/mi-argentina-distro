Package.describe({
  name: 'miar:mailgun',
  version: '0.0.1',
  summary: 'MiArgentina Mailgun',
  git: '',
  documentation: 'README.md'
})

Npm.depends({
    'mailgun-js': '0.6.9'
});

Package.onUse(function(api) {
    api.versionsFrom('METEOR@1.0');
    api.export('Mailgun');
    api.addFiles('lib/mailgun.js', 'server');
});
