Template.paginacion.onRendered(() => {
  const paginationName = Template.currentData().paginationName
  const list = Template.currentData().list
  const cantidad = getCantidad()
  let index = 1;
  setPagination(index, list, paginationName, cantidad)
})

Template.paginacion.helpers({
  first: function () {
    let data = getData()
    return Number(data.index) === 1
  },
  last: function () {
    let data = getData()
    return (data.totalList/getCantidad()) <= Number(data.index)
  },
  paginacion: function () {
    let data = getData()
    let cantidad = getCantidad()
    if (data) {
      return contadorPaginas(data.totalList, data.index, cantidad)
    } else {
      return []
    }
  },
  isActive: function (id) {
    let data = getData()
    return data && data.index.toString() === id.toString()
  }
});

Template.paginacion.events({
  "click #first": function(event) {
    paginationMove('first')
  },
  "click #previous": function(event) {
    paginationMove('previous')
  },
  "click #next": function(event) {
    paginationMove('next')
  },
  "click #last": function(event) {
    paginationMove('last')
  },
  "click .pageSelector": function(event) {
    paginationMove(event.currentTarget.id)
  }
});

const paginationMove = (action) => {
  let paginationName = Template.currentData().paginationName
  let cantidad = getCantidad()
  let data = getData()
  let list = Template.currentData().list

  switch(action) {
    case 'first':
      data.index = 1
      break;
    case 'previous':
      data.index = (parseInt(data.index)-1)
      break;
    case 'next':
      data.index = (parseInt(data.index)+1)
      break;
    case 'last':
      let last = data.totalList/cantidad
      if (last > parseInt(last)) {
        last = parseInt(last) + 1
      }
      data.index = last
      break;
    default:
      data.index = action
      break;
  }

  setPagination(data.index, list, paginationName, cantidad)
}

const contadorPaginas = (totalList, index, cantidad) => {
  if (totalList && index && cantidad) {
    index = Number(index)
    let pagination = totalList/cantidad
    let start = 0
    let end = 5

    if (index >= 4) {
      start = index - 3
      end = index + 2
    }
    if (index + 2 >= pagination) {
      start = pagination - 4
      end = pagination + 1
    }

    if (totalList <= cantidad) {
      return false
    }

    if (start < 0) {
      start = 0
    }

    return _.range(1, pagination + 1).slice(parseInt(start), end)
  } else {
    return false
  }
}

let setPagination = function (index, list, paginationName, cantidad) {
  if (list) {
    if (index === 1) {
      Session.set(paginationName, { data: list.slice(index - 1, index + (cantidad-1)), totalList: list.length, index: index})
    } else {
      Session.set(paginationName, { data: list.slice((index * cantidad) - cantidad, index * cantidad), totalList: list.length, index: index })
    }
  }
}

let getData = function () {
  return Session.get(Template.currentData().paginationName)
}

let getCantidad = function () {
  return Template.currentData().cantidad
}
