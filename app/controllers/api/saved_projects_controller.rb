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
    if @saved_project.update(project_params)
      render :show
    else
      @errors = @saved_project.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def destroy
    @saved_project = Api::SavedProject.find(params[:id])
    @saved_project.destroy!
    redirect_to root_url
  end

  def index
    @saved_projects = current_user.saved_projects
    render :index
  end

  def show
    @saved_project = Api::SavedProject.find(params[:id])
    render :show
  end

  private

  def project_params
    params.require(:saved_project).permit(
      :title, :content, :author_id, :category_id,
      :goal, :project_mgg_urls, :project_due_date
    )
  end
end
