function displayAllMaps() {

    $(".geoMap").each(function (index, element) {
        var parent = $(element).parent().parent();
        var $pnts = $("pnt", parent);
        var addressOnlyCount = 0;
        $pnts.each(function (index, pnt) {
            if (pnt.getAttribute('address') != null && pnt.getAttribute('address') != "") {
                addressOnlyCount++;
            }
        });

        element.setAttribute("pntAdrsCount", addressOnlyCount);
        element.setAttribute("pntAdrsDoneCount", 0)
        $pnts.each(function (index, pnt) {
            if (pnt.getAttribute('address') != null && pnt.getAttribute('address') != "") {
                getLatAndLon(pnt, element);
            } else
                displayMap(element.getAttribute('id'));
        });

    });

}
function getLatAndLon(pnt, element) {
    var user1Location = pnt.getAttribute('address');
    var yahooApiKey = 'rej13PjV34EnzusA_moownkb4_f4tfZPYjweylt_iarDYdEsyARO6FCzPHsJv4EkXAE-';
    var url = 'http://where.yahooapis.com/geocode?location=' + user1Location + '&flags=J&appid=' + yahooApiKey + '&callback=anyword';

    $.getJSON(url, function (resultSet) {

        if (resultSet.Result !== null) {
            var r = resultSet.ResultSet.Results[0];
            var lng1 = r.latitude;
            var lat1 = r.longitude;
            pnt.setAttribute('lat', lat1);
            pnt.setAttribute('lng', lng1);
            addressLocationReceived(pnt, element);
        }
    });

}
function addressLocationReceived(pnt, element) {
    var adrsCount = parseInt(element.getAttribute("pntAdrsCount"));
    var pntAdrsDoneCount = parseInt(element.getAttribute("pntAdrsDoneCount"));

    if (adrsCount == 0 || (pntAdrsDoneCount + 1 >= adrsCount)) {
        displayMap(element.getAttribute('id'));
    }
    else {
        element.setAttribute("pntAdrsDoneCount", (adrsCount + 1));
        return;
    }

}
function displayMap(id) {
    try {
        if (typeof currentSelectedTabNumber === "undefined" || currentSelectedTabNumber === null)
            currentSelectedTabNumber = 1;

        var element = document.getElementById(id)
        var parentBox = getParentBoxId3(element);
        if (parentBox.getAttribute("id").indexOf("tab" + currentSelectedTabNumber) < 0)
            return;
        if (element.className.indexOf("leaflet") > -1)
            return;

        var map = new L.Map(id);


        var $pnts = $("pnt", $("#" + id).parent().parent());
        if ($pnts.size() === 0)
            return;


        var lat = parseFloat($pnts[0].getAttribute('lng'));
        var lng = parseFloat($pnts[0].getAttribute('lat'));
        var zoom = parseInt($pnts[0].getAttribute('zoom'));
        if (isNaN(zoom))
            zoom = 1;

        var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
			cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			cloudmade = new L.TileLayer(cloudmadeUrl, { maxZoom: 18, attribution: cloudmadeAttribution });

        map.setView(new L.LatLng(lat, lng), zoom).addLayer(cloudmade);

        var i = 0;
        for (i = 0; i < $pnts.size(); i++) {
            var pnt = $pnts[i];
            var xpointTip = pnt.getAttribute('pointTip');
            var xlat = parseFloat(pnt.getAttribute('lng'));
            var xlng = parseFloat(pnt.getAttribute('lat'));

            appendMapTag(element,map, xlat, xlng, xpointTip);

        }
    } catch (ex) {

        setTimeout("displayMap('" + id + "');", 50);
    }
}
function appendMapTag(mapDiv,map, xlat, xlng, xpointTip) {

    if (!mapDiv.pointsArray)
        mapDiv.pointsArray = new Array();
    
    var xmarkerLocation = new L.LatLng(xlat, xlng);
    var xmarker = new L.Marker(xmarkerLocation);

    if (xpointTip.length > 0)
        xmarker.bindPopup(xpointTip)

    xmarker.on('mouseover', function (e) {
        xmarker.openPopup();
    });

    xmarker.on('mouseout', function (e) {
        xmarker.closePopup();
    });

    map.addLayer(xmarker);
}
function getParentBoxId3(element) {
    var parent = element;
    while (parent != null) {
        var id = parent.getAttribute("id");
        if (id !== null && (id.indexOf('tab') == 0) && id !== undefined) {
            return parent;
        }
        parent = parent.parentElement;
    }
}
displayAllMaps();

//map.on('click', onMapClick);

//var popup = new L.Popup();

//function onMapClick(e) {
//    var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';

//    popup.setLatLng(e.latlng);
//    popup.setContent("You clicked the map at " + latlngStr);
//    map.openPopup(popup);
//}
//var circleLocation = new L.LatLng(51.508, -0.11),
//			circleOptions = { color: '#f03', opacity: 0.7 },
//			circle = new L.Circle(circleLocation, 500, circleOptions);

//circle.bindPopup("I am a circle.");
//map.addLayer(circle);


//var p1 = new L.LatLng(51.509, -0.08),
//			p2 = new L.LatLng(51.503, -0.06),
//			p3 = new L.LatLng(51.51, -0.047),
//			polygonPoints = [p1, p2, p3],
//			polygon = new L.Polygon(polygonPoints);

//polygon.bindPopup("I am a polygon.");
//map.addLayer(polygon);


