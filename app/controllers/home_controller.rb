require 'net/http'

class HomeController < ApplicationController
	def index
		@channels = Channels.all
	end

	def send_notification
	  	uri = URI(params[:url])
		req = Net::HTTP::Post.new(params[:url])
		req.set_form_data(params[:data])
		req['Authorization'] = 'key=4543f34ad6ce3dd895b1291372bcf732'

		res = Net::HTTP.start(uri.hostname, uri.port) do |http|
		  http.request(req)
		end

		case res
when Net::HTTPSuccess, Net::HTTPRedirection
Rails.logger.info 'done'
else
  Rails.logger.info res.value
end


	  respond_to do |format|
	    format.json  { render :json => { success: true } }
	  end
	end
end
