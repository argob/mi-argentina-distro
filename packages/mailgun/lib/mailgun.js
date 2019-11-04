var mailgunKey = Meteor.settings.mailgun.key,
    mailgunDomain = Meteor.settings.mailgun.domain;

if (mailgunKey && mailgunDomain) {
    var mailgun = Npm.require('mailgun-js');
    Mailgun = new mailgun({apiKey: mailgunKey, domain: mailgunDomain});
} else {
    throw new Meteor.Error(404, 'Please add mailgun api key & domain in settings');
}
