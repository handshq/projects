json.projects do
  json.array! @projects, :id, :name, :start_date, :end_date, :lifecycle_status
end

json.number_of_pages @number_of_pages