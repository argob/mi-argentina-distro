import { Meteor } from 'meteor/meteor'
import { Router } from 'meteor/iron:router'

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
  if (!Meteor.loggingIn()) {
    if (!Meteor.userId()) {
      Meteor.loginWithOIDC({ requestPermissions: ['profile', 'email', 'optional'] })
    }
  }
  this.next()
}, { except: ['logout', 'expired'] })

Router.route('/', {
  name: 'home',
  action: function () {
    if (this.ready()) {
      this.render('inicio')
    } else {
      this.render('loading')
    };
    document.title = 'Inicio | Mi Argentina'
  }
})

Router.route('/seccion-generica', {
  name: 'seccionGenerica',
  action: function () {
    if (this.ready()) {
      this.render('seccionGenerica')
    } else {
      this.render('loading')
    };
    document.title = 'Sección Genérica | Mi Argentina'
  }
})

Router.route('/salir', {
  name: 'salir',
  layoutTemplate: 'baseLayoutID',
  action: function () {
    Session.set('status', 'logout')
    Router.go('logout')
  }
})

Router.route('/sesion-expirada', {
  name: 'expired',
  layoutTemplate: 'baseLayoutID',
  action: function () {
    document.title = 'Sesión expirada | Mi Argentina'
    this.render('expired')
  }
})

Router.route('/sesion-cerrada', {
  name: 'logout',
  layoutTemplate: 'baseLayoutID',
  action: function () {
    document.title = 'Sesión cerrada | Mi Argentina'
    this.render('logout')
  }
})

Router.route('/inicio', function () {
  Router.go('/')
})

Router.route('/(.*)', function () {
  if (this.ready()) {
    this.render('notFound')
  } else {
    this.render('loading')
  }
})
