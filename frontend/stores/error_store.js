const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ErrorConstants = require('../constants/error_constants.js');
const ErrorStore = new Store(AppDispatcher);

let _errors = [];

ErrorStore.currentError = () => {
  let returnErrors = _errors;
  return _errors;
};

function _resetError (form, errorInfo) {
  if (errorInfo.responseJSON) {
    let message = errorInfo.responseJSON[0];
    _errors = [form, message];
  } else {
    let message = _parseError(form);
    _errors = [form, message];
  }
  ErrorStore.__emitChange();
}

function _parseError (form) {
  if (form === "finalizeProject") {
    return "Saved Project not found.";
  }
}

function _clearErrors () {
  if (_errors.length === 3) {
    _errors[0] = "";
    _errors[1] = "";
  } else {
    _errors = [];
  }
  ErrorStore.__emitChange();
}

function _handleSignUpError (form, message, pendingAction) {
  _errors = [form, message, pendingAction];
  ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case ErrorConstants.ERROR_RECEIVED:
      _resetError(payload.form, payload.data);
      break;
    case ErrorConstants.SIGNUP_ERROR_RECEIVED:
      _handleSignUpError(payload.form, payload.message, payload.pendingAction);
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _clearErrors();
      break;
    case ErrorConstants.PROJECT_DELETED:
      _resetError(payload.form, payload.data);
      break;
  }
};

module.exports = ErrorStore;
