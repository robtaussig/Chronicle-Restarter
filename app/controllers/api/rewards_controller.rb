class Api::RewardsController < ApplicationController
  def create
    @reward = Api::Reward.new(reward_params)
    if @reward.save
      render :show
    else
      @errors = @reward.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def update
    @reward = Api::Reward.find(params[:id])
    if @reward.update(reward_params)
      render :show
    else
      @errors = @reward.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def destroy
    @reward = Api::Reward.find(params[:id])
    @reward.destroy!
    render :show
  end

  def index
    @rewards = Api::Reward.all()
    render :index
  end

  def show
    @reward = Api::Reward.find(params[:id])
    render :show
  end

  private

  def reward_params
    params.require(:reward).permit(
      :title, :amount, :project_id, :project_reward_key,
      :quantity, :description
    )
  end
end
