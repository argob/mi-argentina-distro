Template.baseLayoutID.onRendered(() => {
  $('body').addClass('sticky-footer bg-white')
})

Template.baseLayoutID.onDestroyed(() => {
  $('body').removeClass('sticky-footer bg-white')
})

Template.baseLayoutID.events({
  'click .login-button': function (event) {
    Session.delete('status')
    window.location.href = Meteor.settings.public.miargentina
  }
})
