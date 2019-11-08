import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'
import { Router } from 'meteor/iron:router'

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
        Router.go('/inicio')
      }
    } else {
      Router.go(paginaAnterior)
    }
  }
})
