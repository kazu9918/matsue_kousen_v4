class MonitoringDatum < ApplicationRecord
  # validation
  validates :temperature, :humidity, :lux, presence: true
end
