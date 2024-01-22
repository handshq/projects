class Personnel < ApplicationRecord
  belongs_to :project, optional: true
end
