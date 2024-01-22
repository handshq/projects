FactoryBot.define do
  factory :project do
    name { Faker::Company.name }
    start_date { Faker::Date.between(from: 1.year.ago, to: Date.yesterday) }
    end_date { Faker::Date.between(from: [start_date, Date.today].max + 1, to: 1.year.from_now) }

    trait :live do
      start_date { 2.days.ago }
      end_date { 2.days.from_now }
    end

    trait :future do
      start_date { 2.days.from_now }
      end_date { 10.days.from_now }
    end

    trait :ended do
      start_date { 10.days.ago }
      end_date { 2.days.ago }
    end

    trait :not_set do
      start_date { nil }
      end_date { nil }
    end
  end
end
