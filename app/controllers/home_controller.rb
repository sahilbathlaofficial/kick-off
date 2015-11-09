require 'net/http'
require 'uri'

class HomeController < ApplicationController
	def index
		@channels = Channels.all
	end

	def send_notification
	  	uri = URI(params[:url])
		req = Net::HTTP::Post.new(uri.path)
		req.set_form_data(params[:data].as_json)
		req['Authorization'] = 'key=4543f34ad6ce3dd895b1291372bcf732'
		http = Net::HTTP.new(uri.host, uri.port)
		http.use_ssl = true if uri.scheme == 'https'

		http.start do |h|
		  h.request(req)
		end

		# case res
		# 	when Net::HTTPSuccess, Net::HTTPRedirection
		# 		Rails.logger.info 'done'
		# 	else
		# 	  Rails.logger.info res.value
		# 	end


	  respond_to do |format|
	    format.json  { render json: { success: true } }
	  end
	end
end
