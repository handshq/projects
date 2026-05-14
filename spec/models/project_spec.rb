require 'rails_helper'

RSpec.describe Project, type: :model do
  describe '#lifecycle_status' do
    it 'returns :live when project is currently live' do
      project = create(:project, :live)
      expect(project.lifecycle_status).to eq(:live)
    end

    it 'returns :future when project is in the future' do
      project = create(:project, :future)
      expect(project.lifecycle_status).to eq(:future)
    end

    it 'returns :ended when project has ended' do
      project = create(:project, :ended)
      expect(project.lifecycle_status).to eq(:ended)
    end

    it 'returns :not_set when dates are not set' do
      project = create(:project, :not_set)
      expect(project.lifecycle_status).to eq(:not_set)
    end
  end

  describe '#live?' do
    it 'returns true if now is between start_date and end_date' do
      project = build(:project, :live)
      expect(project.send(:live?)).to be true
    end
    it 'returns false otherwise' do
      project = build(:project, :future)
      expect(project.send(:live?)).to be false
    end
  end

  describe '#future?' do
    it 'returns true if start_date is in the future' do
      project = build(:project, :future)
      expect(project.send(:future?)).to be true
    end
    it 'returns false otherwise' do
      project = build(:project, :live)
      expect(project.send(:future?)).to be false
    end
  end

  describe '#ended?' do
    it 'returns true if end_date is in the past' do
      project = build(:project, :ended)
      expect(project.send(:ended?)).to be true
    end
    it 'returns false otherwise' do
      project = build(:project, :live)
      expect(project.send(:ended?)).to be false
    end
  end

  describe 'scopes' do
    let!(:live_project) { create(:project, :live) }
    let!(:future_project) { create(:project, :future) }
    let!(:ended_project) { create(:project, :ended) }
    let!(:not_set_project) { create(:project, :not_set) }

    describe '.live' do
      it 'returns only live projects' do
        expect(Project.live).to eq([live_project])
      end
    end

    describe '.future' do
      it 'returns only future projects' do
        expect(Project.future).to eq([future_project])
      end
    end

    describe '.ended' do
      it 'returns only ended projects' do
        expect(Project.ended).to eq([ended_project])
      end
    end

    describe '.not_set' do
      it 'returns only projects with no dates set' do
        expect(Project.not_set).to eq([not_set_project])
      end
    end

    describe '.ordered_by_lifecycle' do
      it 'orders projects by lifecycle status' do
        expect(Project.ordered_by_lifecycle).to eq([live_project, future_project, ended_project, not_set_project])
      end
    end

    describe '.ordered_by' do
      it 'orders projects by specified field and direction' do
        project_a = create(:project, name: 'A')
        project_b = create(:project, name: 'B')

        ordered_projects = Project.ordered_by('name', 'asc').to_a
        expect(ordered_projects[0].id).to eq(project_a.id)
        expect(ordered_projects[1].id).to eq(project_b.id)
      end

      it 'returns all projects if field is not present' do
        expect(Project.ordered_by(nil, nil).to_a).to eq(Project.all.to_a)
      end
    end
  end
end
