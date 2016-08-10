class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :redirect_unless_logged_in, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= Api::User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    user.reset_session_token
    session[:session_token] = user.session_token
  end

  def logout(user)
    user.reset_session_token
    session[:session_token] = nil
  end

  def redirect_unless_logged_in
    redirect_to root_url unless logged_in?
  end

  def require_current_user
    redirect_to new_user_url unless current_user
  end


end
