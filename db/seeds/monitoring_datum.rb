50.times do |i|
  MonitoringDatum.create(
    temperature: rand(-10.0..40.0),
    humidity: rand(0.0..100.0),
    lux: rand(0.0..1000.0),
    recorded_at: 50.minutes.ago + i.minutes
  )
end
