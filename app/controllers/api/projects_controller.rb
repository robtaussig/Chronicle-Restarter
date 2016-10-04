class Api::ProjectsController < ApplicationController

  def create
    if project_params[:image] === 'null' ||
      project_params[:image] === "/assets/default_pic.png"
      @project = Api::Project.new(no_image_params)
    else
      @project = Api::Project.new(project_params)
    end
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
      :author_full_name, :risks, :website, :total, :image
    )
  end

  def no_image_params
    params.require(:project).permit(
      :title, :content, :author_id, :category_id, :blurb, :duration,
      :goal, :project_due_date, :location, :saved_project_id,
      :author_full_name, :risks, :website, :total
    )
  end
end
