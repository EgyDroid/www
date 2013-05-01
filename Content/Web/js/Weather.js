function toggleTemperature(sender) {

    var cIndex = sender.innerHTML.indexOf('°C');
    var fIndex = sender.innerHTML.indexOf('°F');
    var from, to;
    if (cIndex != -1) {
        from = 'f';
        to = 'c'; sender.innerHTML = '(to °F)';

    } else if (fIndex != -1) {
        from = 'c';
        to = 'f';
        sender.innerHTML = '(to °C)';
    }

    $("tmp", sender.parentNode.parentNode).each(function (index, element) {

        replaceTemperHtml(element, from, to);
    });
}
function replaceTemperHtml(element, from, to) {
    var values = element.innerHTML.split(':');
    var i;
    var html = "";
    for (i = 0; i < values.length; i++) {
        var cIndex = values[i].indexOf('°');
        var degree = values[i].substring(0, cIndex);
        var appendSuffix = values[i].indexOf('°' + from.toUpperCase()) > -1;
        var suffix = appendSuffix ? to.toUpperCase() : "";
        var h = convertTemperature(degree, to) + '°' + suffix;
        if (html.length == 0 && values.length > 1)
            html += h + " : ";
        else
            html += h;
    }
    element.innerHTML = html;
}
function convertTemperature(degree, to) {
    var FromVal, ToVal, FromName, ToName, v1;
    /*0 celsius, 1 fahrenheit*/
    if (to.toLowerCase() === 'f') {
        FromVal = 0;
        ToVal = 1;
    } else {
        FromVal = 1;
        ToVal = 0;
    }

    degree = stripBad(degree);
    degree = parseFloat(degree);
    if (isNaN(degree))
        return "?";

    var ConvertedTemp = get_fact(degree, FromVal, ToVal);
    ConvertedTemp = ConvertedTemp.toString();
    if (ConvertedTemp.indexOf(".") > -1)
        ConvertedTemp = ConvertedTemp.split(".")[0];

    return ConvertedTemp;
}

function get_fact(ff, from_val, to_val) {
    // first convert to kelvin
    if (from_val == 0) {
        ff = ff + 273.15;
    } else if (from_val == 1) {
        ff = ((ff - 32) / 1.8) + 273.15;
    } else if (from_val == 2) {
        ff = ff / 1.8;
    } else if (from_val == 3) {
        ff = (ff * 1.25) + 273.15;
    }

    if (ff < 0) {
        // Below absolute zero
        return "Below Absolute Zero";
    }

    // now convert kelvin to unit
    if (to_val == 0) {
        ff = ff - 273.15;
    } else if (to_val == 1) {
        ff = (1.8 * (ff - 273.15)) + 32;
    } else if (to_val == 2) {
        ff = ff * 1.8;
    } else if (to_val == 3) {
        ff = (ff - 273.15) / 1.25;
    }

    // round it off
    if (Number.prototype.toFixed) {
        ff = ff.toFixed(7);
        ff = parseFloat(ff);
    }
    else {
        var leftSide = Math.floor(ff);
        var rightSide = ff - leftSide;
        ff = leftSide + Math.round(rightSide * 10000000) / 10000000;
    }

    return ff;
}

function stripBad(string) {
    for (var i = 0, output = '', valid = "eE-0123456789."; i < string.length; i++)
        if (valid.indexOf(string.charAt(i)) != -1)
            output += string.charAt(i)
return output;
} 