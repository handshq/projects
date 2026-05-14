class Project < ApplicationRecord

  ORDERABLE_FIELDS = ['name'].freeze
  LIVE_CLAUSE = "start_date IS NOT NULL AND end_date IS NOT NULL AND NOW() BETWEEN start_date AND end_date".freeze
  FUTURE_CLAUSE = "start_date IS NOT NULL AND NOW() < start_date".freeze
  ENDED_CLAUSE = "end_date IS NOT NULL AND NOW() >= end_date".freeze

  has_many :personnels

  scope :active, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
  scope :search, ->(term) { where("name ILIKE ?", "%#{term}%") }
  scope :live, -> { where(Arel.sql(LIVE_CLAUSE)) }
  scope :future, -> { where(Arel.sql(FUTURE_CLAUSE)) }
  scope :ended, -> { where(Arel.sql(ENDED_CLAUSE)) }
  scope :not_set, -> { where(start_date: nil, end_date: nil) }

  scope :ordered_by_lifecycle, -> {
    order(Arel.sql(<<~SQL))
      CASE
        WHEN #{LIVE_CLAUSE} THEN 0
        WHEN #{FUTURE_CLAUSE} THEN 1
        WHEN #{ENDED_CLAUSE} THEN 2
        ELSE 3
      END
    SQL
  }

  scope :ordered_by, ->(field, direction) {
    return all unless field.present?

    direction = direction == "desc" ? :desc : :asc
    order(field => direction)
  }

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
    end_date.present? && Date.current >= end_date
  end

  def not_set?
    start_date.blank? && end_date.blank?
  end
end
