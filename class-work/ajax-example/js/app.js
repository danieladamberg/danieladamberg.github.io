$(document).ready(function () {

	var citiBike = 'http://api.citybik.es/citi-bike-nyc.json'
	// var omdb = 'http://www.omdbapi.com/?s=point+break'

	$.ajax({
		type: 'GET',
		url: citiBike,
		success: function (response) {
			parseCitiBike(response)
		},
		error: function (xhr) {
			console.log(xhr)
		}
	})

	function parseCitiBike (data) {
		console.log(data)

		data.forEach(function (station){

			var h3 = '<h3>' + station.name + '<h3>'
			var p1 = '<p>' + station.bikes + '<p>'
			var p2 = '<p>' + station.free + '<p>'

			$('body').append(h3+p1+p2+'<hr>')

		})
	}

})
