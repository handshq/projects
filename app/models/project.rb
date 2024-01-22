class Project < ApplicationRecord
  has_many :personnels

  scope :active, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }

  def lifecycle_status
    [:live, :future, :ended].find {|method| send(:"#{method}?") } || :not_set
  end

  private

  def live?
    [start_date, end_date].all?(&:present?) && DateTime.now.between?(end_date, start_date)
  end

  def future?
    start_date.present? && DateTime.now < start_date
  end

  def ended?
    end_date.present? && Date.today > end_date
  end
end
