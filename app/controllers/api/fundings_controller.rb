class Api::FundingsController < ApplicationController
  expires_in 5.minutes, :public => true
  
  def create
    @funding = Api::Funding.new(funding_params)
    if @funding.save
      @reward = @funding.reward
      @fundings = @reward.fundings
      @amount = @fundings.length * @reward.amount
      render :show
    else
      @errors = @funding.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def show
    @funding = Api::Funding.find(params[:funding][:reward_id].to_i)
    @reward = Api::Reward.find(params[:rewardId])
    @fundings = @reward.fundings
    @amount = @fundings.length * @reward.amount
    render :show
  end

  def index
    @reward = Api::Reward.find(params[:rewardId])
    @fundings = @reward.fundings
    @amount = @fundings.length * @reward.amount
    render json @amount
  end

  def funding_params
    params.require(:funding).permit(:reward_id, :project_id, :user_id)
  end
end
