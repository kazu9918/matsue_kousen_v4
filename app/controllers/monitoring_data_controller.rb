class MonitoringDataController < ApplicationController
  def create
    @monitoring_data = MonitoringData.new(monitoring_data_params)
    if @monitoring_data.save
      render json: @monitoring_data, status: :created
    else
      render json: @monitoring_data.errors, status: :unprocessable_entity
    end
  end

  def temperature_data
    @temperature_data = MonitoringData.select(:recorded_at, :temperature)
    render json: @temperature_data
  end

  def humidity_data
    @humidity_data = MonitoringData.select(:recorded_at, :humidity)
    render json: @humidity_data
  end

  def lux_data
    @lux_data = MonitoringData.select(:recorded_at, :lux)
    render json: @lux_data
  end

  private

  def monitoring_data_params
    params.permit(:temperature, :humidity, :lux, :recorded_at)
  end
end
