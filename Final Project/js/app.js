$(document).ready(function () {

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.5, lng: -98.35},
    scrollwheel: true,
    zoom: 3
  });
}

  function codeAddress() {
    var address = document.getElementById("zip").value;
    var parsedZip = parseInt(zip)
    geocoder.geocode( { 'parsedZip': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

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

  // when click on "about" creates popup
  $("#about").on("click",function(){
    $("#overlay").css("display","block");
    $("#popup").css("display","block");
  });
  // when click on "x" in about window, closes window
  $("#x-about").on("click", function(){
    $("#overlay").css("display","none");
    $("#popup").css("display","none");      
  });
  // when click on "your trips" or "invite a friend" creates popup
  $(".nope").on("click",function(){
    $("#overlay").css("display","block");
    $("#sorry").css("display","block");
  });
  // when click on "x" in sorry window, closes window
  $("#x-sorry").on("click", function(){
    $("#overlay").css("display","none");
    $("#sorry").css("display","none");      
  });
  

})