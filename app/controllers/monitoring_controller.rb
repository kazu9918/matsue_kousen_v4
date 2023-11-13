class MonitoringController < ApplicationController
    def show
        # リクエストからパラメータを取得
        hostname = params[:hostname]
        time = params[:time]
    
        # パラメータをコンソールに出力
        puts "Received hostname: #{hostname}"
        puts "Received time: #{time}"
    
        # 応答を送る
        render json: { status: 'Success', message: 'Received' }
      end
  end
  