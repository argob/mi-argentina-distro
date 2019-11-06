Template.panel.events({
  "click .fa-close": function (event) {
    event.preventDefault()
    console.log(event)
    let dataID = event.currentTarget.dataset.id
    let dataAction = event.currentTarget.dataset.action
    $('[data-id="' + dataID + '"]').addClass('hidden')
  }
})
