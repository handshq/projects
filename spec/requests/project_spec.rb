require 'rails_helper'

RSpec.describe 'Projects', type: :request do

  describe 'GET /projects' do
    let!(:project_1) { create(:project, name: 'Cassin Group - Live', start_date: 1.week.ago, end_date: 1.week.from_now) }
    let!(:project_2) { create(:project, name: 'Kub and West - Ended', start_date: 2.weeks.ago, end_date: 1.week.ago) }
    let!(:project_3) { create(:project, name: 'Auer Group - Future', start_date: 1.week.from_now, end_date: 2.weeks.from_now) }
    let!(:project_4) { create(:project, name: 'Auer Group - Not set', start_date: nil, end_date: nil) }

    context 'when requesting HTML' do
      it "renders the index page" do
        get projects_path
        expect(response).to have_http_status(:success)
      end
    end

    context "when requesting JSON" do
      context "without order_by params" do
        it "returns projects as JSON" do
          get projects_path, headers: { "ACCEPT" => 'application/json' }
          expect(response.content_type).to include('application/json')

          json = JSON.parse(response.body)["projects"]
          expect(json.length).to eq(4)
        end
      end

      context "with order_by ascending param" do
        it "returns projects in ascending order" do
          get_json_projects(order_by: { field: :name, order: :asc })
          json = JSON.parse(response.body)["projects"]

          expect(json.map { |p| p["name"] }).to eq([
            "Auer Group - Future",
            "Auer Group - Not set",
            "Cassin Group - Live",
            "Kub and West - Ended"
          ])
        end
      end

      context 'with order_by descending param' do
        it "return projects in descending order" do
          get_json_projects(order_by: { field: :name, order: :desc })
          json = JSON.parse(response.body)["projects"]

          expect(json.map { |p| p["name"] }).to eq([
            "Kub and West - Ended",
            "Cassin Group - Live",
            "Auer Group - Not set",
            "Auer Group - Future"
          ])
        end
      end
    end

    context "with statuses filter" do
      context "when filtering by live status" do
        it "returns only live projects" do
          get_json_projects(statuses: [:live])
          json = JSON.parse(response.body)["projects"]

          expect(json.length).to eq(1)
          expect(json.first["name"]).to eq("Cassin Group - Live")
        end
      end

      context 'when filtering by future status' do
        it "returns only future projects" do
          get_json_projects(statuses: [:future])
          json = JSON.parse(response.body)["projects"]

          expect(json.length).to eq(1)
          expect(json.first["name"]).to eq("Auer Group - Future")
        end
      end

      context 'when filtering by ended status' do
        it "returns only ended projects" do
          get_json_projects(statuses: [:ended])
          json = JSON.parse(response.body)["projects"]

          expect(json.length).to eq(1)
          expect(json.first["name"]).to eq("Kub and West - Ended")
        end
      end

      context 'when filtering by not_set statuses' do
        it "returns only projects with not_set lifecycle status" do
          get_json_projects(statuses: [:not_set])
          json = JSON.parse(response.body)["projects"]

          expect(json.length).to eq(1)
          expect(json.first["name"]).to eq("Auer Group - Not set")
        end
      end

      context 'when filtering by multiple statuses' do
        it "returns projects that match any of the specified statuses" do
          get_json_projects(statuses: [:live, :future])
          json = JSON.parse(response.body)["projects"]

          expect(json.length).to eq(2)
          expect(json.map { |p| p["name"] }).to contain_exactly(
            "Cassin Group - Live",
            "Auer Group - Future"
          )
        end
      end
    end
  end

  def get_json_projects(params)
    get projects_path,
      params: params,
      headers: {
        "ACCEPT" => "application/json"
      }
  end
end