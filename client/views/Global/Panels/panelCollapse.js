Template.panelCollapse.events({
  'click .panel-heading': function (event) {
    let currentTarget = $(event.currentTarget)
    if(currentTarget.attr('aria-expanded') === 'false') {
      $(currentTarget).parents('.panel-default').find('.fa-chevron-up').removeClass('collapseGira');
    } else {
      $(currentTarget).parents('.panel-default').find('.fa-chevron-up').addClass('collapseGira');
    }
  }
})
