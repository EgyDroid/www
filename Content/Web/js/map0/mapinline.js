var kothic = new L.TileLayer.Kothic({
        minZoom: 8,
        styles: ['osmosnimki']
    });

    var map = new L.Map('map', {
        center: new L.LatLng(53.9, 27.55), // Minsk
        zoom: 12
    });

    var marker = new L.Marker(new L.LatLng(53.9, 27.55));
    map.addLayer(marker);

    // attach a given HTML content to the marker and immediately open it
    marker.bindPopup("A pretty CSS3 popup.<br />Easily customizable.").openPopup();
    var count = 0;
    MapCSS.onImagesLoad = function () {
        count += 1;
        if (count >= 2) {
            map.addLayer(kothic);
        }
    };

    MapCSS.preloadSpriteImage("osmosnimki", "http://osmosnimki.ru/leaf/icons/osmosnimki.png");
    MapCSS.preloadSpriteImage("mapnik", "content/js/map/mapnik.png");

    $("#renderer").change(function () {
        switch ($("#renderer").val()) {
            case 'osmosnimki':
                map.removeLayer(mapnik);
                kothic.enableStyle('osmosnimki');
                kothic.disableStyle('mapnik');
                break;
            case 'mapnik':
                map.removeLayer(mapnik);
                kothic.enableStyle('mapnik');
                kothic.disableStyle('osmosnimki');
                break;
            case 'tiles':
                //kothic.disableStyle('mapnik');
                //kothic.disableStyle('osmosnimki');
                map.addLayer(mapnik);
                break;
        }
    });
    $("#overlay").change(function () {
        if ($("#overlay").attr('checked')) {
            kothic.enableStyle('surface');
        } else {
            kothic.disableStyle('surface');
        }
    });