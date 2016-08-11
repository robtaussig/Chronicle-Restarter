class Api::FundingController < ApplicationController

  def create
    @funding = Api::Funding.new(funding_params)
    if @funding.save
      render :show
    else
      @errors = @funding.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def show
    @funding = Api::Funding.find(params[:id])
    render :show
  end

  def index
    @reward = Api::Reward.find(params[:rewardId])
    @fundings = @reward.fundings
    render :index
  end

  def funding_params
    params.require(:funding).permit(:reward_id, :project_id)
  end

end
