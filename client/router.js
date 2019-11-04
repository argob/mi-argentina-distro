import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { moment } from 'meteor/momentjs:moment'
import { Router } from 'meteor/iron:router'
import { _ } from 'meteor/underscore'

Router.configure({
  layoutTemplate: function () {
    return Session.get('status') ? 'base_layout' : 'loading';
  },
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  waitOn: function () {
    return Meteor.subscribe('userInfo');
  }
})

Router.onBeforeAction(function () {
  if (!Meteor.userId() && !Meteor.loggingIn()) {
    if (Session.get('email_verified') === false) {
      window.location.href = Meteor.settings.public.id + '/activar-email/enviar/'
    } else {
      if (Session.get('idLogout')) {
        let location = window.location.href
        window.location.href = Meteor.settings.public.id + '/salir/?next=' + (location ? location : Meteor.settings.public.miargentina)
      } else {
        Meteor.loginWithOIDC({ requestPermissions: ['profile', 'email', 'optional'] })
        window.sessionStorage.setItem('login', true)
      }
    }
  } else {
    if (Session.get('status') !== 'expired' && Session.get('status') !== 'logout') {
      if (Meteor.user().services !== undefined) {
        if (Meteor.user().services.oidc.email_verified === false) {
          Meteor.logout(function (err) { if (!err) { Session.set('email_verified', false) } })
        } else {
          Meteor.call('UserStatus', function (error, response) {
            if (error) {
              Session.delete('status')
              Meteor.logout(function (err) { if (!err) { Session.set('idLogout', true) } })
            } else {
              if (response === 'expired') {
                $('body').attr('class', 'sticky-footer')
                Session.set('status', 'expired')
                Meteor.logout()
                Router.go('expired')
              } else {
                Session.set('status', 'OK')
                if (response === 'update') {
                  sessionClear(response)
                }
              }
            }
          })
        }
      }
    }
  }
  this.next()
}, { except: ['home', 'salir', 'logout', 'expired'] })

Router.route('/', {
  name: 'home',
  action: function () {
    Router.go('inicio')
  }
})

Router.route('/inicio', {
  name: 'inicio',
  action: function () {
    if (this.ready()) {
      this.render('inicio')
      this.render('inicioTitle', { to: 'titleSection' })
      this.render('inicioPanelSecondary', { to: 'secondaryPanel' })
    } else {
      this.render('loading')
    };
    document.title = 'Inicio | Mi Argentina'
  }
})

Router.route('/sesion-expirada', {
  name: 'expired',
  action: function () {
    document.title = 'Sesión expirada | Mi Argentina'
    if (Session.get('status') === 'expired') {
      $('body').attr('class', 'sticky-footer')
      window.sessionStorage.removeItem('lastRoute')
      if (!Meteor.user() && !Meteor.loggingIn()) {
        this.render('expired', { to: 'status' })
      } else {
        this.render('loading', { to: 'status' })
      }
    } else {
      Router.go('inicio')
    }
  }
})

Router.route('/sesion-cerrada', {
  name: 'logout',
  action: function () {
    document.title = 'Sesión cerrada | Mi Argentina'
    if (Session.get('status') === 'logout') {
      $('body').attr('class', 'sticky-footer')
      window.sessionStorage.removeItem('lastRoute')
      if (!Meteor.user() && !Meteor.loggingIn()) {
        this.render('logout', { to: 'status' })
      } else {
        this.render('loading', { to: 'status' })
      }
    } else {
      Router.go('inicio')
    }
  }
})

Router.route('/salir', {
  name: 'salir',
  action: function () {
    $('body').attr('class', 'sticky-footer')
    Session.set('status', 'logout')
    this.render('loading', { to: 'status' })
    Meteor.logout()
    Router.go('logout')
  }
})

Router.route('/(.*)', function () {
  if (this.ready()) {
    this.render('notFound')
  } else {
    this.render('loading')
  }
})
