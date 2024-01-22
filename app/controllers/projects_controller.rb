class ProjectsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @projects = Project.all
      end
    end
  end
end
