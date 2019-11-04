import { StatusViews } from '/lib/collection.js'

Meteor.methods({
  SaveViewConfig: function (id, element, action) {
    this.unblock()
    let user = Meteor.user()
    if (user !== null && user !== undefined) {
      let myjson = JSON.parse(Assets.getText('paneles_alertas.json'))
      let settingView = StatusViews.findOne({'_id': user._id})
      let enableElements = ["panel", "alert"]
      let enableActions = ["close", "collapse"]

      if (enableElements.includes(element) && enableActions.includes(action) && myjson[element][action].includes(id)) {
        if (!settingView) {
          StatusViews.insert({"_id": user._id, [element]: {
            [action]: [id]
          }})
        } else {
          if (!settingView[element][action].includes(id)) {
            settingView[element][action].push(id)
            StatusViews.update({"_id": user._id},{$set: { [element + '.' + action]: settingView[element][action]}})
          } else {
            throw new Meteor.Error(500, "Duplicate element")
          }
        }
      } else {
        throw new Meteor.Error(500, "Dato invalido")
      }
    } else {
      throw new Meteor.Error(500, "Invalid User")
    }
  }
})
