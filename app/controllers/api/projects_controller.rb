class Api::ProjectsController < ApplicationController
  expires_in 5.minutes, :public => true

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
    render :show
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
    :goal, :project_due_date, :location, :saved_project_id,
    :author_full_name, :risks, :website, :image, :total
    )
  end
end
