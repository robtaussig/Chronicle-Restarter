const AppDispatcher = require('../dispatcher/dispatcher.js');
const ErrorConstants = require('../constants/error_constants.js');

const ErrorActions = {

  mismatchedBoth () {
    AppDispatcher.dispatch({
      actionType:ErrorConstants.SIGNUP_ERROR_RECEIVED,
      form: 'signup',
      message: "Neither your email nor your password match"
    });
  },

  projectDeleted () {
    AppDispatcher.dispatch({
      actionType:ErrorConstants.PROJECT_DELETED,
      form: 'finalizeProject',
      message: "Project successfully deleted"
    });
  },

  mismatchedPasswords () {
    AppDispatcher.dispatch({
      actionType:ErrorConstants.SIGNUP_ERROR_RECEIVED,
      form: 'signup',
      message: "Your password doesn't match"
    });
  },

  mustBeSignedIn (pendingAction) {
    AppDispatcher.dispatch({
      actionType:ErrorConstants.SIGNUP_ERROR_RECEIVED,
      form: 'signup',
      pendingAction: pendingAction,
      message: "Please sign up (or log in) to continue."
    });
  },

  mismatchedEmails () {
    AppDispatcher.dispatch({
      actionType:ErrorConstants.SIGNUP_ERROR_RECEIVED,
      form: 'signup',
      message: "Your email doesn't match"
    });
  },

  receiveError (form, data) {
    AppDispatcher.dispatch({
      actionType:ErrorConstants.ERROR_RECEIVED,
      form: form,
      data: data
    });
  },

  clearErrors () {
    AppDispatcher.dispatch({
      actionType:ErrorConstants.CLEAR_ERRORS,
    });
  }

};

module.exports = ErrorActions;
