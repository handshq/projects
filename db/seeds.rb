# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

25.times do |num|
  FactoryBot.create(:project, name: "live #{num}", start_date: 14.day.before, end_date: 14.day.from_now )
  FactoryBot.create(:project, name: "future #{num}", start_date: 14.day.from_now, end_date: 21.day.from_now)
  FactoryBot.create(:project, name: "ended #{num}", start_date: 21.day.before, end_date: 14.day.before)
  FactoryBot.create(:project, name: "no_dates #{num}", start_date: nil, end_date: nil)
end
