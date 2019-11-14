import { sessionClear } from '/imports/globalfunctions'

export let userStatus =  function (user) {
  if (!Session.get('status') || Session.get('status') === 'OK' ) {
    if (JSON.parse(window.sessionStorage.getItem('login')) === null  ) {
      Session.set('status', 'OK')
      window.sessionStorage.setItem('login', true)
    } else {
      if (!Session.get('status') || Session.get('status') === 'OK') {
        if (user.services.oidc.email_verified === false) {
          Session.set('status', 'email_verified')
          Router.go('expired')
        } else {
          Meteor.call('UserStatus', function (error, response) {
            if (error) {
              Session.set('status', 'idLogout')
              Router.go('expired')
            } else {
              if (response === 'expired') {
                Session.set('status', 'expired')
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
  } else {
    userLogout(Session.get('status'))
  }
}

export let userLogout = function (type) {
  let url = null
  switch (type) {
    case 'emailVerified':
      url = Meteor.settings.public.id + '/activar-email/enviar/'
      break
    case 'idLogout':
      if (JSON.parse(window.sessionStorage.getItem('login'))) {
        url = Meteor.settings.public.id + '/salir/?next=' + Meteor.settings.public.miargentina + window.sessionStorage.getItem('PaginaActual')
      }
      break
  }

  sessionClear('logout')
  Meteor.logout()

  if (url !== null) {
    window.location.href = url
  }
}

Tracker.autorun(() => {
  let currentRoute = Router.current()
  let user = Meteor.user()
  if (currentRoute && user && user.services) {
    Meteor.defer(() => {
      userStatus(user)
    })

    $(window).scrollTop(0)

    let except=['salir','logout','expired', 'fail'];
    if (except.indexOf(currentRoute.route.options.name) < 0) {
      let paginaActual = window.sessionStorage.getItem('PaginaActual')
      let currentPath = currentRoute.url.replace(Meteor.settings.public.miargentina, '')
      let rutaActual = currentPath
      if (paginaActual === null) {
        window.sessionStorage.setItem('PaginaActual', rutaActual)
      } else {
        if (paginaActual !== rutaActual) {
          window.sessionStorage.setItem('PaginaAnterior', paginaActual)
          window.sessionStorage.setItem('PaginaActual', rutaActual)
        }
      }
    }

  }
})

Accounts.onLoginFailure(function () {
  let logginAttempt = JSON.stringify(window.sessionStorage.getItem('LoginAttempt'))
  let lapse = moment().diff(moment(logginAttempt, 'DD/MM/YYYY HH:mm:ss'), 'seconds')
  let attempt = JSON.parse(window.sessionStorage.getItem('attempt') ? window.sessionStorage.getItem('attempt') : 0)
  if (attempt >= 1) {
    window.sessionStorage.removeItem('attempt')
    Session.set('status', 'fail')
    Router.go('fail')
  } else {
    if (lapse < 20) {
      attempt++
      window.sessionStorage.setItem('attempt', attempt)
    } else {
      window.sessionStorage.removeItem('attempt')
    }
  }
})
