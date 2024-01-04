Rails.application.routes.draw do
  get 'home/index'
	root 'home#index'

  resources :monitoring_data, only: [] do
    collection do
      get 'create', to: 'monitoring_data#create'
      get 'temperature', to: 'monitoring_data#temperature_data'
      get 'humidity', to: 'monitoring_data#humidity_data'
      get 'lux', to: 'monitoring_data#lux_data'
    end
  end
end
