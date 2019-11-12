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
      window.sessionStorage.setItem('LoginAttempt', moment().format('DD/MM/YYYY HH:mm:ss'))
      Meteor.loginWithOIDC({ requestPermissions: ['profile', 'email', 'optional'] })
    }
  }
  this.next()
}, { except: ['logout', 'expired', 'fail'] })

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

Router.route('/pais', {
  name: 'pais',
  action: function () {
    if (this.ready()) {
      this.render('pais')
    } else {
      this.render('loading')
    };
    document.title = 'Pais | Mi Argentina'
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

Router.route('/error', {
  name: 'fail',
  layoutTemplate: 'baseLayoutID',
  action: function () {
    document.title = 'Error | Mi Argentina'
    this.render('fail')
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
