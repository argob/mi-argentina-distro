import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'

Template.nav.events({
  'click #collapseExample': function (event) {
    $('#collapseExample').attr('class', 'collapse')
    $('#collapseExample').attr('aria-expanded', 'false')
  }
})

Template.menuElement.helpers({
  current: function (section) {
    let currentPath = Router.current().url.replace(Meteor.settings.public.miargentina, '').split('/')
    if (currentPath[0] === '') {
      currentPath.splice(0, 1)
    }
    return section === _.first(currentPath)
  }
})
