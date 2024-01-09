50.times do
  MonitoringDatum.create(
    temperature: rand(-10.0..40.0),
    humidity: rand(0.0..100.0),
    lux: rand(0.0..1000.0),
    recorded_at: rand(1.year).seconds.ago
  )
end
