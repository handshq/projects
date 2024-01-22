class Project < ApplicationRecord
  has_many :personnels

  def lifecycle_status
    [:live, :future, :ended].find {|method| send(:"#{method}?") } || :not_set
  end

  private

  def live?
    [start_date, end_date].all?(&:present?) && DateTime.now.between?(start_date, end_date)
  end

  def future?
    start_date.present? && DateTime.now < start_date
  end

  def ended?
    end_date.present? && DateTime.now > end_date
  end
end
