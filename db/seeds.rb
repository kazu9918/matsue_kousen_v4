Dir[Rails.root.join('db/seeds/*.rb')].each do |file|
  load file
end
