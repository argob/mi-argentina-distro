Template.panel.events({
  "click .fa-close": function (event) {
    event.preventDefault()
    let dataID = event.currentTarget.dataset.id
    let dataAction = event.currentTarget.dataset.action
    $( "#" +  dataID).addClass('hidden')
    if($('[data-id="' + dataID + '"]').length > 0) {
      $('[data-id="' + dataID + '"]').remove()
    }
    Meteor.call("SaveViewConfig", dataID, 'panel', dataAction, function(error, response){
      if(error){
        //console.log(error)
        $( "#" +  dataID).before('<div data-id="' + dataID + '" class="alert alert-danger">No se pudo realizar la acción solicitada, intenta de nuevo.</div>')
        $( "#" +  dataID).removeClass('hidden')
      }
    })
  }
})
