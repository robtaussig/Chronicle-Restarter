class Api::SavedProjectsController < ApplicationController

  def create
    @saved_project = Api::SavedProject.new(project_params)
    if @saved_project.save
      render :show
    else
      @errors = @saved_project.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def update
    @saved_project = Api::SavedProject.find(params[:id])
    if project_params[:image] === 'null' ||
      project_params[:image] === "/assets/default_pic.png"
      if @saved_project.update(no_image_params)
        render :show
      else
        @errors = @saved_project.errors.full_messages
        render json: @errors, status: 401
      end
    else
      if @saved_project.update(project_params)
        render :show
      else
        @errors = @saved_project.errors.full_messages
        render json: @errors, status: 401
      end
    end
  end

  def destroy
    @saved_project = Api::SavedProject.find(params[:id])
    @saved_project.destroy!
    render :show
  end

  def index
    @user = Api::User.find(params[:user_id])
    @saved_projects = @user.saved_projects.includes(:author)
    render :index
  end

  def show
    @saved_project = Api::SavedProject.find(params[:id])
    render :show
  end

  private

  def project_params
    params.require(:saved_project).permit(
      :title, :content, :author_id, :category_id, :blurb, :duration,
      :goal, :project_due_date, :location, :risks, :image
    )
  end

  def no_image_params
    params.require(:saved_project).permit(
      :title, :content, :author_id, :category_id, :blurb, :duration,
      :goal, :project_due_date, :location, :risks
    )
  end
end
