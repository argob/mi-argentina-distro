import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'

Template.modalfirstlogin.rendered = function () {
  $("body").addClass("modal-open");
  $('#myModal').modal('show')
}

Template.modalfirstlogin.events({
  'click .ContinuarFirstLogin': function () {
    $("#myModal").modal("hide")
    $("div").removeClass("modal-backdrop fade in")
    $("body").removeClass("modal-open");
    Meteor.call('FirstLogin', 'continuar', function (error, response) {
      if (!error) {
        Router.go('/')
      }
    })
  },
})
