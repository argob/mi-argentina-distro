Template.panel.events({
  "click .fa-close": function (event) {
    event.preventDefault()
    let dataID = event.currentTarget.dataset.id
    $('[data-id="' + dataID + '"]').addClass('hidden')
  }
})
