$(document).ready(function () {

	// form submit
	$('#get-solar').submit(function (event) {
		// prevent submit default
		event.preventDefault();

		var API_KEY = 'YOUR_API_KEY_HERE'
		var zipcode = $('#zipcode').val()

		// url (or endpoint) of our ajax request - the address on the web the network request is made to
		var url = 'https://developer.nrel.gov/api/solar/open_pv/installs/index?zipcode=' + zipcode + '&api_key=' + API_KEY

		// ajax request (makes behind-the-scenes network request)
		$.ajax({
			url: url,
			type: 'GET',
			success: function (response) {
				parseResponse(response)
			},
			error: function (xhr) {
				console.log(xhr)
			}
		})

	})

	// log out the response from the above ajax request
	function parseResponse (data) {
		console.log(data)
	}
})
