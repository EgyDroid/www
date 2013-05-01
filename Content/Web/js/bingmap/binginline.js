var Map = null;

function LoadMap() {
    //Load a hidden map using the Bing Maps SDK
    Map = new VEMap('map');
    var lat;
    var lng;

    var mapElement = document.getElementById('map');
    var lat = mapElement.getAttribute('lat');
    var lng = mapElement.getAttribute('lng');
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    map.LoadMap(new VELatLong(lat, lng, 0, VEAltitudeMode.RelativeToGround), 10, VEMapStyle.Road, false, VEMapMode.Mode2D, true, 1);
}

LoadMap();