import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'
import { Router } from 'meteor/iron:router'

Template.volver.rendered = function () {
  if (Session.get('otherLocation') !== undefined) {
    $('.volver').attr('href', Session.get('otherLocation'))
    Session.delete('otherLocation')
  }
}

Template.volver.events({
  'click .volver': function (event) {
    event.preventDefault()
    let paginaAnterior = window.sessionStorage.getItem('PaginaAnterior')
    window.sessionStorage.removeItem('PaginaAnterior')
    window.sessionStorage.removeItem('PaginaActual')
    if (paginaAnterior === null) {
      let pathURL = Router.current().url.replace(Meteor.settings.public.miargentina, '')

      let arrayPath = pathURL.split('/')

      if (arrayPath[0] === '') {
        arrayPath.splice(0, 1)
      }

      if (arrayPath.length > 1) {
        Router.go('/' + arrayPath[0])
      } else {
        Router.go('/')
      }
    } else {
      Router.go(paginaAnterior)
      // window.history.back()
    }
  }
})
