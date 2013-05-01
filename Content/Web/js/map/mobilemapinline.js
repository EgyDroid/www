if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}

function showFullscreenMap(viewerid) {
    document.getElementById('mobilePage').style.display = 'none';
    var div = document.getElementById(viewerid);

    var mapObjectDiv = getChildBy(div, ".mapObject");
    var geoMap = getChildBy(mapObjectDiv, ".geoMap");
    if (geoMap != null) {
        geoMap.setAttribute("ignore", "false");
        geoMap.style.height = self.innerHeight + "px";
    }
    div.style.display = '';
    displayAllMaps();
}
function hideFullscreenMap(viewerid) {
    document.getElementById('mobilePage').style.display = '';
    document.getElementById(viewerid).style.display = 'none';
}
function getChildBy(parent, selector) {
    var compareClass = selector.startsWith(".");
    var compareId = selector.startsWith("#");
    var compareTag = false;
    var targetObj = null;

    var compareText = selector;
    if (compareClass || compareId) {
        compareText = selector.substring(1);
    } else {
        compareTag = true;
    }

    var childs = parent.childNodes;
    var i = 0;
    for (i = 0; i < childs.length; i++) {
        var current = childs[i];

        if (compareTag && current.tagName === compareText) {
            targetObj = childs[i];
        }
        else if (compareClass && current.className === compareText) {
            targetObj = childs[i];
        }
        else if (compareId && current.id === compareText) {
            targetObj = childs[i];
        }
    }
    return targetObj;
}

function displayAllMaps() {
    var geoMap = document.getElementsByName("geoMapElement");
    for (var i = 0; i < geoMap.length; i++) {
        var element = geoMap[i];
        displayMap(element.getAttribute('id'));

    }
}

function displayMap(id) {
    if (typeof currentSelectedTabNumber === "undefined" || currentSelectedTabNumber === null)
        currentSelectedTabNumber = 1;

    var element = document.getElementById(id);

    if (element.className.indexOf("leaflet") > -1 || element.getAttribute("ignore") === "true")
        return;

    var startAsfullScreen = element.getAttribute("startAsfullScreen");
    var fullscreendivid = element.getAttribute("fullscreendivid");

    if (startAsfullScreen !== null && startAsfullScreen === 'true') {
        element.style.width = (document.width - 20) + 'px';
        element.style.height = (document.height - 5) + 'px';
    }
    var map = new L.Map(id);


    var pnts = getPoints(element);
    if (pnts.lenght === 0)
        return;

    var lat = parseFloat(pnts[0].getAttribute('lat'));
    var lng = parseFloat(pnts[0].getAttribute('lng'));
    var zoom = parseInt(element.getAttribute('zoom'));

    if (isNaN(zoom))
        zoom = 1;

    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
			cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			cloudmade = new L.TileLayer(cloudmadeUrl, { maxZoom: 18, attribution: cloudmadeAttribution });

    map.setView(new L.LatLng(lat, lng), zoom).addLayer(cloudmade);

    if (fullscreendivid !== null && fullscreendivid.length > 0) {
        function onMapClick(e) {
            showFullscreenMap(fullscreendivid);
        }

        map.on('click', onMapClick);
    }
    var i = 0;
    for (i = 0; i < pnts.length; i++) {
        var pnt = pnts[i];
        var xpointTip = pnt.getAttribute('title');
        var xlat = parseFloat(pnt.getAttribute('lat'));
        var xlng = parseFloat(pnt.getAttribute('lng'));
        var xsubtitle = pnt.getAttribute('subtitle');
        var xinfourl = pnt.getAttribute('infourl');
        var pointOnClick = pnt.getAttribute('pointOnClick');

        if (xsubtitle !== null && xsubtitle.length > 0) {
            xpointTip += "<br/>" + xsubtitle;
        }

        if (xinfourl !== null && xinfourl.length > 0) {
            xpointTip += "&nbsp;<a href='" + xinfourl + "'>></a>";
        }

        appendMapTag(element, map, xlat, xlng, xpointTip, xinfourl, pointOnClick);

    }

}

function getPoints(element) {
    var parent = element.parentNode;
    var pnts = new Array();
    var i = 0;
    for (i = 0; i < parent.children.length; i++) {
        var child = parent.children[i];
        if (child.tagName == 'PNT') {
            pnts.push(child);
        }
    }
    return pnts;
}

function appendMapTag(mapDiv, map, xlat, xlng, xpointTip, xinfourl, pointOnClick) {


    if (!mapDiv.pointsArray)
        mapDiv.pointsArray = new Array();

    var xmarkerLocation = new L.LatLng(xlat, xlng);
    var xmarker = new L.Marker(xmarkerLocation);

    if (typeof xpointTip !== 'undifined' && xpointTip !== null && xpointTip.length > 0)
        xmarker.bindPopup(xpointTip)

    xmarker.on('mouseover', function (e) {
        xmarker.openPopup();
    });

    xmarker.on('click', function (e) {
        xmarker.openPopup();
        //        if (pointOnClick === null || pointOnClick === 'window.location=""' || pointOnClick === '') {
        //            if (xinfourl === null || xinfourl.length === 0) {
        //                return;
        //            }
        //            else {
        //                window.location = "" + xinfourl + "'";
        //            }
        //        }
        //        else
        //            eval(pointOnClick);
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
