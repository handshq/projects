25.times do
  FactoryBot.create(:project, start_date: 14.days.before, end_date: 14.days.from_now)
  FactoryBot.create(:project, start_date: 14.days.from_now, end_date: 21.days.from_now)
  FactoryBot.create(:project, start_date: 21.days.before, end_date: 14.days.before)
  FactoryBot.create(:project, start_date: nil, end_date: nil)
end

10.times do
  FactoryBot.create(:project, start_date: 60.days.before, end_date: 30.days.before, archived: true)
end
