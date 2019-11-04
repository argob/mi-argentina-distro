import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { moment } from 'meteor/momentjs:moment'
import './inicio.html'

Template.inicio.onRendered(() => {
  if (window.location.hash) {
    document.getElementById(window.location.hash.substring(1)).scrollIntoView()
  }
})
