class Api::UpdatesController < ApplicationController
  def create
    @update = Api::Update.new(update_params)
    if @update.save
      render :show
    else
      @errors = @update.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def update
    @update = Api::Update.find(params[:id])
    if @update.update(update_params)
      render :show
    else
      @errors = @update.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def destroy
    @update = Api::Update.find(params[:id])
    @update.destroy!
    render :show
  end

  def index
    @updates = Api::Update.where(campaign_id: params[:campaign_id])
    render :index
  end

  def show
    @update = Api::Update.find(params[:id])
    render :show
  end

  private

  def update_params
    params.require(:update).permit(:user_id, :campaign_id, :title, :body)
  end
end
