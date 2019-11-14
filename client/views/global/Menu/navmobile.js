Template.navmobile.onRendered(()=> {
  let currentPath = Router.current().url.replace(Meteor.settings.public.miargentina, '')
  if (window.innerWidth < 750 && currentPath === '/'){
    document.getElementById('primaryContent').classList.toggle('forMenuMobile')
    document.querySelector('.dashboard-sidebar').classList.toggle('hidden')
  }
})

Template.navmobile.events({
  'click [data-id="inicio-mobile"]': function (event) {
    Meteor.setTimeout(function () {
      $('#navMobile').addClass('hidden')
      $('#primaryContent').removeClass('forMenuMobile')
    },2)
  },
  'click [data-id*="-mobile"]': function (event) {
    let currentPath = Router.current().url.replace(Meteor.settings.public.miargentina, '')
    let hrefPath = event.currentTarget.firstElementChild.href.replace(Meteor.settings.public.miargentina, '')
    if (currentPath === hrefPath && hrefPath !== '/') {
      Meteor.setTimeout(function () {
        document.getElementById('primaryContent').classList.toggle('forMenuMobile')
        document.querySelector('.dashboard-sidebar').classList.toggle('hidden')
      })
    }
  }
})
