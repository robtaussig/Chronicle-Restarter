class Api::ProjectsController < ApplicationController

  def create
    @project = Api::Project.new(project_params)
    if @project.save
      render :show
    else
      @errors = @project.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def update
    @project = Api::Project.find(params[:id])
    if @project.update(project_params)
      render :show
    else
      @errors = @project.errors.full_messages
      render json: @errors, status: 401
    end
  end

  def destroy
    @project = Api::Project.find(params[:id])
    @project.destroy!
    redirect_to root_url
  end

  def index
    @projects = Api::Project.all()
    render :index
  end

  def show
    @project = Api::Project.find(params[:id])
    render :show
  end

  private

  def project_params
    params.require(:project).permit(
    :title, :content, :author_id, :category_id, :blurb, :duration,
    :goal, :project_img_urls, :project_due_date, :location
    )
  end
end
