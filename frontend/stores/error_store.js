const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ErrorConstants = require('../constants/error_constants.js');
const ErrorStore = new Store(AppDispatcher);

let _errors = [];

ErrorStore.currentError = () => {
  return _errors;
};

function _resetError (form, errorInfo) {
  let message = errorInfo.responseJSON[0];
  _errors = [form, message];
  ErrorStore.__emitChange();
}

function _clearErrors () {
  _errors = [];
  ErrorStore.__emitChange();
}

function _handleSignUpError (form, message) {
  _errors = [form, message];
  ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case ErrorConstants.ERROR_RECEIVED:
      _resetError(payload.form, payload.data);
      break;
    case ErrorConstants.SIGNUP_ERROR_RECEIVED:
      _handleSignUpError(payload.form, payload.message);
      break;
    default: _clearErrors();
  }
};

module.exports = ErrorStore;
