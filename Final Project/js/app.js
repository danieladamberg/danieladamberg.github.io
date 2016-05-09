$(document).ready(function () {
  initMap() // start google maps

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    scrollwheel: true,
    center: {lat: 39.5, lng: -98.35}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('zipcode').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


    // form submit
  $('#get-solar').submit(function (event) {
    // prevent submit default
    event.preventDefault();

    var API_KEY = 'ZXhPtYdXVkmVbxen2DrfrMDQKXlvTP4om43OHZwl'
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
  }) // end form submit


  // log out the response from the above ajax request
  function parseResponse (data) {
    console.log(data)

    if (data.result.length) {
    numSystems(data.result.length)
    costPerWatt(data.result)
    capacity(data.result)
    }else {
      $('#capacity').text(''),
      $('#costWatt').text(''),
      $('#results').text(''),
      alert('There are no installations within this ZIP')
    }
  }

  function numSystems (num) {
    $('#results').text(num)
  }

  function costPerWatt (installs) {
    console.log(installs)
    var cost = 0
    var size = 0
 
    installs.forEach(function(install){
      console.log(install)

       if (install.cost && install.size_kw) {
       cost += install.cost
       size += (install.size_kw)*1000
       }

    })
      $('#costWatt').text('$' + (cost/size).toFixed(2))
   }

    function capacity (installs) {
   
    var size = 0
 
    installs.forEach(function(install){
      console.log(install)

      size += install.size_kw

    })

      $('#capacity').text(size.toFixed(2))
  }

  // show the pop ups (about, references, the author) and closes them
  $('#about-click').click(function (event) {
    event.preventDefault()
    if ($('#references').css("display") == "none" && $('#author').css('display') == "none"){
    $('#about').css('display', 'block');
  }
  })

  $('#x-about').click(function (event) {
    event.preventDefault()
    $('#about').css('display', 'none')
  })

    $('#references-click').click(function (event) {
    event.preventDefault()
    if ($('#about').css("display") == "none" && $('#author').css('display') == "none"){
    $('#references').css('display', 'block');
  }
  })

  $('#x-references').click(function (event) {
    event.preventDefault()
    $('#references').css('display', 'none')
  })

   $('#author-click').click(function (event) {
    event.preventDefault()
    if ($('#references').css("display") == "none" && $('#about').css('display') == "none"){
    $('#author').css('display', 'block');
  }
  })

  $('#x-author').click(function (event) {
    event.preventDefault()
    $('#author').css('display', 'none')
  })


})// end doc ready