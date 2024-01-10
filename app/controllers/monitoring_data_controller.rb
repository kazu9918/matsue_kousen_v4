class MonitoringDataController < ApplicationController
  before_action :authenticate, only: [:create]

  def create
    @monitoring_data = MonitoringDatum.new(monitoring_data_params)
    if @monitoring_data.save
      render json: @monitoring_data, status: :created
    else
      render json: @monitoring_data.errors, status: :unprocessable_entity
    end
  end

  def temperature_data
    first_record = MonitoringDatum.order(:recorded_at).first
    last_record = MonitoringDatum.order(:recorded_at).last
    return render json: [] unless first_record && last_record
  
    start_time = first_record.recorded_at
    end_time = last_record.recorded_at
    averages = []
  
    while start_time < end_time
      next_time = start_time + 10.minutes
      average_temperature = MonitoringDatum.where('recorded_at >= ? AND recorded_at < ?', start_time, next_time).average(:temperature)
      averages.push({ period_start: start_time, period_end: next_time, average_temperature: average_temperature })
      start_time = next_time
    end
  
    render json: averages
  end

  def humidity_data
    @humidity_data = MonitoringDatum.select(:recorded_at, :humidity)
    render json: @humidity_data
  end

  def lux_data
    @lux_data = MonitoringDatum.select(:recorded_at, :lux)
    render json: @lux_data
  end

  private

  def monitoring_data_params
    params.permit(:temperature, :humidity, :lux, :recorded_at)
  end

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == "expected_username" && password == "expected_password"
    end
  end
end
