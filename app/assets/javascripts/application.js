// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//


// var segments = {
// 	'wingify': 5,
// 	'olympics':  6,
// 	'counterstrikemaverick': 7,
// 	'indiahikes': 8
// }

var AUTH_TOKEN = 'key=4543f34ad6ce3dd895b1291372bcf732';

function showChannels() {
	var channels = JSON.parse(localStorage.channels || '[]');
	$('.subscribed-channels-list').children().remove();
	for (var i = 0; i < channels.length; i++) {
		$('.subscribed-channels-list').append('<li>' + channels[i] + '</li>');
	}
}

$(function() {
	var channels = JSON.parse(localStorage.channels || '[]');
	showChannels();
	$('#subscribe').click(function() {
		if (channels.indexOf($('select option:selected').text()) === -1) {
			channels.push($('select option:selected').text());
			localStorage.channels = JSON.stringify(channels);
			showChannels();
			_pcq.push(['addSubscriberToSegment', $('select option:selected').text()]);
		}
	});

	//Send notification to segment
	$('#send-notification').click(function() {
		$.ajax({
			url: '/send-notification',
			data: {
				url: 'https://pushcrew.com/api/v1/send/segment/' + (parseInt($('select').val(), 10) + 4),
				data: { title: $('select option:selected').text() + ' kicked off an event', message: $('#event-desc').val(), url: $('#event-url').val() },
			},
			type: 'POST'
	     });
	});
})