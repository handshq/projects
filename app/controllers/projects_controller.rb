class ProjectsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        render json: Project.all, status: :ok
      end
    end
  end
end
