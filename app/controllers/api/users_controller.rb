class Api::UsersController < ApplicationController

  def create
    @user = Api::User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      @errors = @user.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def update
    @user = Api::User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      @errors = @user.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def index
    @users = Api::User.includes(:projects).all
    render :index
  end

  def show
    @user = Api::User.find(params[:id])
    render :show
  end

  def destroy
    @user = Api::User.find(params[:id])
    logout(@user)
    @user.destroy!
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :location,
    :website, :pic_url, :biography, :image, :full_name, :verified, :verification_status)
  end

end
