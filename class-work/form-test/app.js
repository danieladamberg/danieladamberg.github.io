$(document).ready(function () {

$('#myForm').submit(function (event){
	event.preventDefault()
	var myInput = ('#name-input').val()

	$('#target').text(myInput)
})


})
