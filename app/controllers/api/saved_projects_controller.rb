class Api::SavedProjectsController < ApplicationController

  def create
    @project = Api::SavedProject.new(project_params)
    if @project.save
      render :show
    else
      @errors = @project.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def update
    @project = Api::SavedProject.find(params[:id])
    if @project.update(project_params)
      render :show
    else
      @errors = @project.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def destroy
    @project = Api::SavedProject.find(params[:id])
    @project.destroy!
    redirect_to root_url
  end

  def index
    @projects = current_user.saved_projects
    render :index
  end

  def show
    @project = Api::SavedProject.find(params[:id])
    render :show
  end

  private

  def project_params
    params.require(:project).permit(
      :title, :content, :author_id, :category_id,
      :goal, :project_mgg_urls, :project_due_date
    )
  end
end

end
