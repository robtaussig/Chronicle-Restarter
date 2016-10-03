class Api::CommentsController < ApplicationController

  def create
    @comment = Api::Comment.new(comment_params)
    if @comment.save
      render :show
    else
      @errors = @comment.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def update
    @comment = Api::Project.find(params[:id])
    if @comment.update(comment_params)
      render :show
    else
      @errors = @comment.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def destroy
    @comment = Api::Project.find(params[:id])
    @comment.destroy!
    render :show
  end

  def index
    @comments = Api::Comment.where(campaign_id: params[:campaign_id])
    render :index
  end

  def show
    @comment = Api::Comment.find(params[:id])
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :campaign_id, :title, :body)
  end
end
