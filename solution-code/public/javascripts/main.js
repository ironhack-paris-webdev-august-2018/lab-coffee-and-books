$(document).ready(function(){
  const sol = {
      lat: 40.417080,
      lng: -3.703612
    };

    let markers = [];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: sol
    });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      center = {
        lat: sol.lat, //position.coords.latitude,
        lng: sol.lng  //position.coords.longitude
      };

      //map.setCenter(center);
      getPlace();
    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }

  function deleteMarkers() {
    markers.forEach(function(marker) {
      marker.setMap(null);
      marker = null;
    });
    markers = [];
  }

  function getPlace() {
    $.ajax({
      url: "http://localhost:3000/api",
      method: 'GET',
      success: placePlaces,
      error: function(error) {
        console.log('error');
      }
    });
  }

  function placePlaces(places){
    console.log(places);
    places.forEach(function(place){
      var center = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0]
      };

  		var charLabel = place.kindOfEstablishment[0];
      var pin = new google.maps.Marker({
        position: center,
        map: map,
        label: charLabel,
        title: place.name
      });

      // pin.addListener('click', toggleBounce);

      function toggleBounce() {
        if (pin.getAnimation() !== null) {
          pin.setAnimation(null);
        } else {
          pin.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      markers.push(pin);
    });
  }

});
