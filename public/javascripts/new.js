$(document).ready(function() {

	const sol = {
		lat: 40.417080,
		lng: -3.703612
	};
	var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: sol
  });
	var markers = [];
  var geocoder = new google.maps.Geocoder();

	function placeMarker(location) {
		var indexTypeSelected = document.getElementsByName("kindOfEst")[0].selectedIndex;
		var charLabel = document.getElementsByName("kindOfEst")[0][indexTypeSelected].innerHTML[0];
		debugger
		var marker = new google.maps.Marker({
        position: location,
        map: map,
				label: charLabel,
				draggable: true
    });
		markers.push(marker);
	}

	function deleteMarkers() {
		for (var i = 0; i < markers.length; i++) {
	    markers[i].setMap(null);
	  }
  	markers = [];
	}

	google.maps.event.addListener(map,"click", function (event) {
		deleteMarkers();
		placeMarker(event.latLng);
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();

		var latlng = {lat: latitude, lng: longitude};

	  geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === 'OK') {
	      map.setCenter(latlng);
	      document.getElementById('latitude').value = latlng.lat;
	      document.getElementById('longitude').value = latlng.lng;
	    } else {
	      //alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	});
});
