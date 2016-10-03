const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const UpdateConstants = require('../constants/update_constants.js');
const UpdateStore = new Store(AppDispatcher);

let _updates = [];
let _update = {};

function _resetUpdate(update) {
  _update = update;
  UpdateStore.__emitChange();
}

function _resetUpdates(updates) {
  _updates = updates;
  UpdateStore.__emitChange();
}

function _removeUpdate(update) {
  let newUpdate = _updates.filter(el=>el.id === update.id)[0];
  let idx = _updates.indexOf(newUpdate);
  _updates.splice(idx,1);
  UpdateStore.__emitChange();
}

function _updateUpdate(update) {
  let _toRemove = _updates.filter(oldUpdate => oldUpdate.id === update.id);
  _updates = _updates.slice(_updates.indexOf(_toRemove),1);
  _updates.push(update);
  UpdateStore.__emitChange();
}

UpdateStore.currentUpdate = () => {
  return _update;
};

UpdateStore.allUpdates = () => {
  return _updates;
};

UpdateStore.find = (updateId) => {
  return _updates.filter(update => update.id === updateId)[0];
};

UpdateStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case UpdateConstants.UPDATE_RECEIVED:
      _resetUpdate(payload.data);
    break;
    case UpdateConstants.UPDATES_RECEIVED:
      _resetUpdates(payload.data);
    break;
    case UpdateConstants.UPDATE_REMOVED:
      _removeUpdate(payload.data);
    break;
    case UpdateConstants.UPDATE_UPDATED:
      _updateUpdate(payload.data);
    break;
  }
};

module.exports = UpdateStore;
