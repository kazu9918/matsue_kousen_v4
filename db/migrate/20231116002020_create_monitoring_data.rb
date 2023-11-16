class CreateMonitoringData < ActiveRecord::Migration[6.1]
  def change
    create_table :monitoring_data do |t|
      t.float :temperature
      t.float :humidity
      t.float :lux
      t.datetime :recorded_at

      t.timestamps
    end
  end
end
