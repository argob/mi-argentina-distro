import { Meteor } from 'meteor/meteor'
import '/imports/client/userStatus'

Meteor.startup(function () {
  $('head').prepend('<!-- Google Analytics --><script src="/js/GA.js"></script><!-- End Google Analytics -->')
  $('head').prepend('<!-- Google Tag Manager --><script src="/js/GTM.js"></script><!-- End Google Tag Manager -->')

  //Example GA event handler
  // ga('create', Meteor.settings.public.google.analytics , 'auto');
  // ga('send', 'event', 'Pageview / event Name', 'section / service', 'data');

  //Example GTM event handler
  // window.dataLayer.push({
  //   'event': 'Pageview',
  //   'virtualPageURL': Router.current().url,
  //   'virtualHostname': window.location.hostname,
  //   'virtualTitle': document.title
  // })
})
