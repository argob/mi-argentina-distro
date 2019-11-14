import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { Router } from 'meteor/iron:router'
import { _ } from 'meteor/underscore'
import { $ } from 'meteor/jquery'
import './Layout.html'
import '/public/css/bootstrap-switch.min.css'
import '/public/css/poncho.min.css'
import '/public/css/icono-arg.css'
import '/public/css/droid-serif.css'
import '/public/css/roboto-fontface.css'
import '/public/css/miargentina.css'
import '/public/css/watermarked.css'

const routes = ['/', '/salir', '/sesion-cerrada', '/sesion-expirada']

Template.base_layout.onRendered(() => {
  //AGREGAR LOGO DESARROLLO EN AMBIENTES NO PRODUCTIVOS
  // if (document.location.host !== 'mi.argentina.gob.ar') {
  //   $('#logo').attr('class', 'watermarked')
  // }
})

Template.tooltip.onRendered(() => {
  $('[data-toggle="tooltip"]').tooltip()
})

Template.base_layout.helpers({
  status: function () {
    return Session.get('status') && Session.get('status') !== 'OK'
  }
})

Template.base_layout.events({
  'keypress .hash': function (event) {
    window.location.hash = 'mainContent'
    $(window).scrollTop(0)
  },
  'click [data-id="inicioButton"]': function (event) {
    document.getElementById('primaryContent').classList.toggle('forMenuMobile')
    document.querySelector('.dashboard-sidebar').classList.toggle('hidden')
  },
  'click [data-toggle="collapse"]': function (event) {
    if ($(event.currentTarget).parents('.panel-default').find('.fa-chevron-up').attr("class").indexOf('collapseGira') < 0) {
      $(event.currentTarget).parents('.panel-default').find('.fa-chevron-up').addClass('collapseGira')
    } else {
      $(event.currentTarget).parents('.panel-default').find('.fa-chevron-up').removeClass('collapseGira')
    }
  }
})
