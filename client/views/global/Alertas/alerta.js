Template.alerta.events({
  "click .fa-close": function (event) {
    event.preventDefault()
    let dataID = event.currentTarget.dataset.id
    $('[id="' + dataID + '"]').addClass('hidden')
  }
})
