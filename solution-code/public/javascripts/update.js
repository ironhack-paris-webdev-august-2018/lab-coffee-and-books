$(document).ready(function() {
	console.log(document.getElementsByName('kindOfEst'));
	//document.getElementsByName('kindOfEst').options[index].selected = true;
	latlng = {lat: parseFloat(document.getElementsByName('latitude')[0].value), lng: parseFloat(document.getElementsByName('longitude')[0].value)};
	var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: latlng
  });
	var indexTypeSelected = document.getElementsByName("kindOfEst")[0].selectedIndex;
	var charLabel = document.getElementsByName("kindOfEst")[0][indexTypeSelected].innerHTML[0];
  var markers = [new google.maps.Marker({
    map: map,
		position: latlng,
		label: charLabel,
		draggable: true
	})];

  var geocoder = new google.maps.Geocoder();

	function placeMarker(location) {
		var indexTypeSelected = document.getElementsByName("kindOfEst")[0].selectedIndex;
		var charLabel = document.getElementsByName("kindOfEst")[0][indexTypeSelected].innerHTML[0];
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
	      document.getElementsByName('latitude')[0].value = latlng.lat;
	      document.getElementsByName('longitude')[0].value = latlng.lng;
	    } else {
	      //alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	});

});
