class ProjectsController < ApplicationController

  ALLOWED_STATUSES = [:live, :future, :ended, :not_set]
  DEFAULT_PER_PAGE = 10

  def index
    respond_to do |format|
      format.html
      format.json do
        base = params[:archived] == "true" ? Project.archived : Project.active

        statuses = Array(params[:statuses]).reject(&:blank?).map(&:to_sym)
        statuses = statuses.select { |status| ALLOWED_STATUSES.include?(status) }

        # Filter relation data based on lifecycle statuses
        base = apply_status_filter(base, statuses)

        # Filter relation data based on search term
        base = base.search(project_params[:search]) if project_params[:search].present?

        # Apply ordering based on user input
        base = base.ordered_by(project_params.dig(:order_by, :field), project_params.dig(:order_by, :order))

        # Default ordering by lifecycle status
        base = base.ordered_by_lifecycle

        total_count = base.count
        @number_of_pages = (total_count / DEFAULT_PER_PAGE.to_f).ceil

        @projects = base
          .limit(DEFAULT_PER_PAGE)
          .offset(paginate_offset)
      end
    end
  end

  private

  def apply_status_filter(scope, statuses)
    return scope if statuses.blank?

    scopes = statuses.map { |s| Project.public_send(s) }
    scopes.reduce(:or)
  end

  def paginate_offset
    [(project_params[:page].to_i - 1), 0].max * DEFAULT_PER_PAGE
  end

  def project_params
    params.permit(:archived, :format, :page, :search, statuses: [], order_by: [:field, :order])
  end
end
