
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}

function loadPrev(element) {
    var url = element.getAttribute('qtp');
    var boxid = getParentBoxId2(element);

    $.getJSON(url, function (data) {
        $("#" + boxid).html(data.html);
    });
}
function loadNext(element) {
    var url = element.getAttribute('qtn');
    var boxid = getParentBoxId2(element);

    $.getJSON(url, function (data) {

        $("#" + boxid).html(data.html);
    });
}
function moreWebResults(btn, url) {
    $.ajax({
        url: ajaxOptions.subSearchAjax + url,
        success: function (data) {
            var div = btn.parentElement.parentElement.firstElementChild;
            div.innerHTML = div.innerHTML + data;
        }
    });

}
function onOptionClick(li) {
    $(".smallUp").each(function (index, cli) {
        if (cli !== li) {
            cli.className = '';
            var child = cli.children[0];
            if (child) child.style.display = 'none';
            cli.setAttribute('isselected', 'false');
        }
    });
    var isSelected = li.getAttribute('isselected') === 'true';
    var dv = li.children[0];
    if (isSelected) {
        li.className = '';
        if (dv) dv.style.display = 'none';
    } else {
        li.className = 'smallUp';
        if (dv) dv.style.display = 'block';
    }
    li.setAttribute('isselected', (!isSelected).toString())
}
function onOptionItemClick(oi) {
    var boxid = getParentBoxId(oi);
    var qtf = oi.getAttribute('qtf');
    updateBox(boxid, qtf, true);
}
function updateBox(boxid, qtf, enfore) {
    var ggg = getGeoCode();
    var url = "q=" + qtf + "&boxid=" + boxid + "&" + ggg;

    $.getJSON(url, function (data) {
        if (!enfore && data.html.length == 0) {
            $box.attr("contentLength", "0");
            return;
        }

        $box = $("#" + data.boxid);
        $box.html(data.html);
        $box.css("display", "block");

        if (data.menuOptions) {
            $li = $("li[boxid='" + data.boxid + "']");
            $("ul.sideMenuItemOptions", $li).remove();
            $li.append(data.menuOptions);
        }
    });
}
function getParentBoxId(element) {
    var parent = element;
    while (parent != null) {
        var boxid = parent.getAttribute("boxid");
        if (boxid !== null && boxid !== undefined) {
            return boxid;
        }
        parent = parent.parentElement;
    }
}
function getParentBoxId2(element) {
    var parent = element;
    while (parent != null) {
        var id = parent.getAttribute("id");
        if (id !== null && id.startsWith('tab') && id !== undefined) {
            return id;
        }
        parent = parent.parentElement;
    }
}

function showFlipCorner(imgId) {
    var _imgCornder = document.getElementById(imgId);
    var _disableShowOnce = _imgCornder.getAttribute("disableShowOnce");

    if (_disableShowOnce === "true") {
        _imgCornder.style.display = '';
    }
    _imgCornder.setAttribute("disableShowOnce", "true");
}

function hideFlipCorner(imgId) {
    document.getElementById(imgId).style.display = 'none';
}

function doFlipClick(imgId, div2facesId, divBackId, divFrontId) {
    var _div2faces = document.getElementById(div2facesId);
    var _divBack = document.getElementById(divBackId);
    var _divFront = document.getElementById(divFrontId);
    var _imgCornder = document.getElementById(imgId);
    var onfront = _imgCornder.getAttribute("onfront");
    _imgCornder.setAttribute("disableShowOnce", "true");

    if (onfront == null || onfront === "true") {
        _imgCornder.style.display = 'none';
        _div2faces.className = 'flipCard flip';

        if (!isChrome()) {
            _div2faces.className = 'flipCard flip flipShadow';
            _divBack.style.display = 'none';
            _divFront.style.display = '';
            _divFront.className = 'face front flipShadow';
            _divFront.style.height = '170px';
            _divFront.style.width = '628px';
        }
        _imgCornder.setAttribute("onfront", "false");
    }
    else {
        _imgCornder.style.display = 'none';
        _div2faces.className = 'flipCard flipShadow';
        if (!isChrome()) {
            _divBack.style.display = '';
            _divFront.style.display = 'none';
            _divFront.className = 'face front flipShadow';
            _divFront.style.height = '170px';
            _divFront.style.width = '628px';
        }
        _imgCornder.setAttribute("onfront", "true");
    }
}

var ajaxOptions = {
    autocompleteBaseUrl: "http://" + window.location.host + "/QuerySuggestion.ashx?in=q&q=",
    searchBaseUrl: "http://" + window.location.host + "/SearchAjax.ashx?",
    subSearchAjax: "http://" + window.location.host + "/SubSearchAjax.ashx?"
};
var options;
var auto, auto2;
jQuery(function () {
    var url = ajaxOptions.autocompleteBaseUrl;
    options = { serviceUrl: url,
        onSelect: function () {
            document.getElementById("btnKnow").click();
        }
    };
    var options2 = { serviceUrl: url,
        onSelect: function () {
            document.getElementById("btnKnow2").click();
        }
    };
    auto = $('#txtKnow').autocomplete(options);
    auto2 = $('#txtUpperQuery').autocomplete(options2);

    load();

    callResponsiveElements();
    var id;
    $(window).resize(function () {
        clearTimeout(id);
        id = setTimeout(callResponsiveElements, 1);
    });

});
var x = $(".tabBar li").click(function () {
    onTabSelected(this);
});

var selectedTabOrder;
function onMenuItemSelected(menuItem) {
    var boxid = menuItem.getAttribute("boxid");
    var radioboxes = menuItem.getAttribute("radioboxes");
    var friendboxes = menuItem.getAttribute("friendboxes");
    if (friendboxes !== null && friendboxes.length > 0) {
        friendboxes = friendboxes.replace(/,/g, ",#");
    }
    if (radioboxes !== null && radioboxes.length > 0) {
        var $item = $(menuItem);
        $item.siblings().removeClass("header");
        $item.addClass("header");

        var ids = radioboxes.split(",");
        var i;
        for (i = 0; i < ids.length; i++) {
            $("#" + ids[i]).css("display", "none");
        }
        $("#" + boxid).css("display", "block");

    } else {
        if (menuItem.getAttribute("isselected") === "false") {
            var qtf = menuItem.getAttribute("qtf");
            var boxid = menuItem.getAttribute("boxid");
            var boxLoaded = menuItem.getAttribute("boxLoaded");
            if (boxLoaded === null && qtf !== null && qtf.length > 0) {
                updateBox(boxid, qtf, false);
                menuItem.setAttribute("boxLoaded", "true");
            } else {
                var box = $("#" + boxid);

                if (box.attr("contentLength") !== "0") {
                    box.css("display", "block");
                    var boxTop = box.offset().top;
                    var $_window = $(window);
                    var windowBottom = $_window.scrollTop() + $_window.height();
                    var goto = boxTop - 12;
                    var visiblePercent = ((windowBottom - boxTop) / box.height()) * 100;

                    if ((boxTop > windowBottom) || visiblePercent < 50)
                        $("html, body").animate({ scrollTop: goto }, 1000, "swing"); //
                }
            }

            $("#" + friendboxes).css("display", "block");

            toggleClass(menuItem);

            menuItem.setAttribute("isselected", "true");
            menuItem.children[0].style.display = "block";
        } else {
            $("#" + boxid).css("display", "none");
            $("#" + friendboxes).css("display", "none");

            toggleClass(menuItem);

            menuItem.setAttribute("isselected", "false");
            menuItem.children[0].style.display = "none";
            fixLeftMenuPosition();
        }
    }
}
function fixLeftMenuPosition() {
    var $window = $(window);
    var $menu = $(".menuContainer");
    var thisTop = $menu.offset().top;
    var current = $window.scrollTop();
    var left = $window.scrollLeft();
    if (left > 0) {
        $menu.css("left", (-left) + 6 + "px");
    }
    else $menu.css("left", "");

    if (current >= 150) {
        $menu.css("position", "fixed");
    } else if (current < 150) {
        $menu.css("position", "");
    }

    var windowBottom = $window.scrollTop() + $window.height();

    if (thisTop > windowBottom)
        $window.scrollTop(thisTop - 12);
}
function viewMoreLess(elmnt, parentId) {
    $('tr[viewmore=' + parentId + ']').toggle();
    var $elmnt = $(elmnt);

    elmnt.innerHTML = elmnt.innerHTML === 'View More' ? 'View Less' : 'View More';

    if (elmnt.innerHTML === 'View More') {
        var $window = $(window);
        var elmntTop = $elmnt.offset().top;
        if (elmntTop < $window.scrollTop())
            $window.scrollTop(elmntTop - 45);
    }
}
function toggleClass(elmt) {
    var toggleClass = elmt.getAttribute("toggleClass");
    elmt.setAttribute("toggleClass", elmt.className);
    elmt.className = toggleClass;
}
function onTabSelected(tabCab) {
    var prevTabOrder = -1;
    var tabs = $(".tabBar li");
    tabs.each(function (i, e) {
        if (e.className === "tabSelected")
            prevTabOrder = parseInt(e.getAttribute("tabnumber"));
        if (tabCab !== e)
            e.className = "";
        if (prevTabOrder > 0)
            return;

    });
    tabCab.className = "tabSelected";
    var tabNumber = parseInt(tabCab.getAttribute("tabnumber"));
    currentSelectedTabNumber = tabNumber;
    switchContent(tabNumber, prevTabOrder);
    onTabClick();

}
function switchContent(tabOrder, prevTabOrder) {
    selectedTabOrder = tabOrder;
    $("#tab" + prevTabOrder).css("display", "none"); //.slideUp(displayTabContent); //
    $("#tab" + prevTabOrder + "menu1").css("display", "none"); //.slideUp(displayTabContent); //

    displayTabContent();
}
function displayTabContent() {
    $("#tab" + selectedTabOrder).css("display", "block"); //.slideDown(100); //
    $("#tab" + selectedTabOrder + "menu1").css("display", "block");
}

var TimeToFade = 500, x = 0;
if (isGecko()) {
    $(".resultView").each(function () {
        //        $(this).css("margin-top", "27px")
    });
}
if (isAndroid()) {
    $(".searchButton").each(function () {
        $(this).css("top", "-35px");
    });
}

function load() {

    var t = document.getElementById('txtKnow');
    if (t) {
        t.focus();
        $(t).attr("isfocused", "true");
    }
    var e = document.getElementById("addbut");

    setTimeout("mouse();", 1000);
    if (!e)
        return;
    if (isIE7() || isIE8())
        e.innerHTML = "<a href='http://kngine.com/FAQs2_3.htm'>Add Kngine to Internet Explorer</a>  &nbsp;&nbsp; ";
    else if (isChrome())
        e.innerHTML = "<a href='http://kngine.com/FAQs2_2.htm'>Add Kngine to Chrome</a>  &nbsp;&nbsp; ";
    else if (isGecko())
        e.innerHTML = "<a href='http://kngine.com/FAQs2_1.htm'>Add Kngine to Firefox</a>  &nbsp;&nbsp; ";
}


function xf1(eId) {
    //    var e = document.getElementById(eId);
    //    e.className = "searchBox_focus dropShadow2";
    //            e.style.background = "url('content/txt.png') no-repeat";
}
function xf2(eId) {
    //    var e = document.getElementById(eId);
    //    e.className = "searchBox";
    // var e = document.getElementById(eId); e.style.background = ""; 
}
function Switch() {
    var d = document.getElementById("Div1");
    var ex = document.getElementById("EXAMPLE");
    var ch = document.getElementById("CHECK");
    if (d.innerHTML == ex.innerHTML)
        d.innerHTML = ch.innerHTML;
    else
        d.innerHTML = ex.innerHTML;
    d.style.opacity = 0.10;
    startBase("Div1");
}
var toggled = false;
var running = false;

//////////////////////////////////////////////////////////////////////////////
function showAfter(id, ms) {
    var xpr = "document.getElementById('" + id + "').style.display=''";
    setTimeout(xpr, 3);
}
function hideAfter(id, ms) {
    var xpr = "document.getElementById('" + id + "').style.display='none'";
    setTimeout(xpr, 3);
}
function getSearchCommand(url) {
    if (url.length > 0 && url.indexOf("!q=") > -1) {
        var q = url.toLowerCase();
        var sw = q.substring(0, "know".length + 1);
        if (sw == "#know") {
            var s = url.toString().indexOf("!");
            if (s > -1) {
                q = url.substring((s + 1));
                return q;
            }
        }
    }
    return "";
} function getGeoCode() {
    var qxs = "";
    try {
        var Country = geoplugin_countryName();
        var Region = geoplugin_regionName();
        var City = geoplugin_city();
        var Currency_Code = geoplugin_currencyCode();
        var Currency_Symbol = geoplugin_currencySymbol();
        var lat = geoplugin_latitude();
        var long = geoplugin_longitude();

        qxs = "country=" + Country;
        qxs += "&region=" + Region;
        qxs += "&city=" + City;
        qxs += "&currency_Code=" + Currency_Code;
        qxs += "&lat=" + lat;
        qxs += "&long=" + long;
        qxs += "&currency_Symbol=" + Currency_Symbol;
    } catch (err) {
    }
    return qxs;
}
function resetAuto() {
    if (auto != undefined)
        auto.killSuggestions();

    if (auto2 != undefined)
        auto2.killSuggestions();
}
function showResultView(jq) {
    resetAuto();
    if (jq != undefined) {
        var txtUpperQuery1 = document.getElementById("txtUpperQuery");
        txtUpperQuery1.value = jq;
    }
    var divC1 = document.getElementById("divResult");
    divC1.innerHTML = "<div class='kLoading'></div>";

    var df = document.getElementById("defaultView");
    if (df) {
        df.className = "fade hide"; //.style.display = 'none';
        hideAfter("defaultView", 700);
    }


    var rv = document.getElementById("resultView");
    if (rv) {
        rv.className = "resultView fade show";
        showAfter("resultView", 700);
    }

}

var gqs = getSearchCommand(window.location.hash);
if (gqs.length > 0) {
    loadResult(gqs, true);
}
else {
    var df1 = document.getElementById("defaultView");
    if (df1) df1.className = "fade show";

}

var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }
}
function modifyBroswerHistory() {
    if (typeof window.history.pushState == 'function') {
        var stateObj = {
            title: "HomeEmpty"
        };

        history.pushState(stateObj, 'Kngine - Results', "http://www.kngine.com/know%20final%20-%20first%20time.html");
    }
}
function beforeAjax() {

}
function afterAjax(isIpad) {
    $("div[qtf]").each(function (index, element) {
        var geoqs = getGeoCode();
        var boxid = getParentBoxId2(element);
        var qs = ajaxOptions.subSearchAjax + "boxid=" + boxid + "&q=" + element.getAttribute("qtf") + "&" + geoqs;
        var loading = "<div align=center    > <img src='content/images/spiral.gif' width='20px' height='20px'/></div>";
        $("#" + boxid).html(loading);

        $.getJSON(qs, function (data) {
            if (data.html.length == 0)
                return;
            $box = $("#" + data.boxid);
            $box.html(data.html);
            $box.css("display", "block");
            afterSubAjax();
        });


    });
    if (!isIpad) {
        var w = $(".resultViewTable").width();
        $("#resultView").css("min-width", w + "px");
        $("#pgFooter").css("min-width", w + "px");
    }

    onTabClick();
    $("#txtUpperQuery").focus();
    try {
        starrating();
    } catch (ex) { }
}
function afterSubAjax() {
    evalExternalResources();
}
function onTabClick() {
    $(".flipContainer").each(function (index, element) {
        var front = $("[id$='divCardFront']", element)[0];
        var back = $("[id$='divCardBack']", element)[0];
        var maxH = front.offsetHeight > back.offsetHeight ? front.offsetHeight : back.offsetHeight;

        element.style.height = (maxH + 35) + "px";
        back.style.height = (maxH + 10) + "px";
        front.style.height = (maxH + 10) + "px";
    });
    $(document).ready(function () {
        $('.sortableTable').tablesorter();
    });
    starrating();
    ImageResizeAndVideo();
    responsiveTabBottom();

    try {
        displayAllMaps();
    } catch (ex) { }
}
function ImageResizeAndVideo() {
    //Scroll Image Resizer  ---- start
    $('div.jTscroller a div img').each(function () {
        var MaxPreviewWidth = $(this).parent().css('width');
        var MaxPreviewHeight = $(this).parent().css('height');

        $(this).one("load", function () {
            if ($(this).width() > $(this).height()) {
                $(this).css('height', MaxPreviewHeight);
                $(this).css('min-width', MaxPreviewWidth);
            } else {
                $(this).css('width', MaxPreviewWidth);
                $(this).css('min-hight', MaxPreviewHeight);
            }
        }).each(function () {
            if (this.complete) $(this).trigger("load");
        });
    });
    //Scroll Image Resizer  ---- end
    //video Player  ---- start
    $("div#videoPlayer").each(function () {
        $(this).children("#player").children("iframe").attr("src", $(this).children().children().children().children("a:first-child").attr("rel"));
        $(this).children().children().children().children("a:first-child").addClass("nowPlaying");
    });
    $(".videoScroll .jTscroller a").each(function () {
        $(this).click(function () {
            $(this).parent().parent().parent().parent().children("#player").children("iframe").attr("src", $(this).attr("rel"));
            $(this).parent().children().removeClass("nowPlaying");
            $(this).addClass("nowPlaying");
        });
    });
    //video Player  ---- end
    try {
        $(".jThumbnailScroller").thumbnailScroller();
        $(".jTscrollerContainer").each(function (index, element) {
            var $el = $(element);
            $el.css("width", $el.width() + 3 + "px");
        });
    } catch (exx) {
    }
}
function submitStarComment(btn) {
    var $feedback = $('#feedback');
    var comment = document.getElementById('feedcommentbox').value;
    var query = $("#txtUpperQuery").val();
    query = escape(query);
    comment = escape(comment);
    var id = document.getElementById('sRating').value;
    if (id === "0" && comment === "")
        return;
    else if (id === "0")
        id = "1";
    var url = 'QFeedback.ashx?q=' + query + '&rating=' + id + '&comment=' + comment;
    //var msg = $feedback.attr('msg');
    var thanksMsg = document.getElementById('feedbackThanks' + id); // <div class=\'feedbackThanks\'>' + msg + '</div>';
    thanksMsg.style.display = '';

    $feedback.remove();

    $('#feedbackcontainer').append(thanksMsg);

    setTimeout("kClose();", 2 * 1000);
    $.post(url);

}

function starrating() {
    $('.star').click(function () {
        var rating = this.getAttribute("sindex");
        $('#rating').val(rating);

        var id = this.id;
        var $feedback = $('#feedback');
        var whattodo = $feedback.attr('whattodo');

        var i;
        for (i = 1; i <= 3; i++) {
            var $starButton = $('#feedstar' + i);
            $starButton.css('background-position', '-15px 0px');
            $starButton.removeClass('starclicked');
            $starButton.addClass('star');

        }

        if (whattodo == 'coloronly') {
            document.getElementById('sRating').value = rating;

            var i;
            for (i = 1; i <= rating; i++) {
                var $starButton = $('#feedstar' + i);
                $starButton.css('background-position', '0px 0px');
                $starButton.removeClass('star');
                $starButton.addClass('starclicked');
            }
        } else {
            var query = $("#txtUpperQuery").val();
            query = escape(query);
            var url = 'QFeedback.ashx?q=' + query + '&rating=' + rating;
            $.post(url);

            var msg = $feedback.attr('msg');
            $feedback.remove();
            var x = '<div class=\'feedbackThanks\'>' + msg + '</div>';
            $('#feedbackcontainer').append(x);
        }

    });

    $('.star').mouseover(function () {
        var sindex = $(this).attr('sindex');
        var i;
        for (i = 1; i <= sindex; i++) {
            $('#feedstar' + i).css('background-position', '0px 0px');
        }
    });
    $('.star').mouseout(function () {

        $('.star').css('background-position', '-15px 0px');

        $(this).blur();  //remove dotted outline 
    });
}
var footerHtml = ""; var xxxxxxxxxxxxxx = "<div id=\"pgFooter2\" align=\"center\"  class=\"kFooter shadow3\">" +
                    "<a target=\"_blank\" href=\"http://facebook.com/KngineSearch\">" +
                        "<img src=\"content/images/SocialFB.png\" /></a> &nbsp; <a target=\"_blank\" href=\"http://twitter.com/KngineSearch\">" +
                            "<img src=\"content/images/SocialTW.png\" /></a> &nbsp; <a target=\"_blank\" href=\"http://Blog.Kngine.com\">" +
                                "<img src=\"content/images/SocialBLOG.png\" /></a><br />" +
                    "&copy; Kngine LLC | <a href=\"About.htm\">About</a> | <a href=\"Tour.htm\">Tour</a>" +
                    "| <a href=\"Goodness.htm\">Goodness</a> | <a href=\"http://Blog.Kngine.com\">Blog</a>" +
                    "| <a href=\"http://feedback.kngine.com\">Feedback</a> | <a href=\"Privacy.htm\">Privacy</a>" +
                "</div>";

function trimText(str) {
    var str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

function loadResult(q, rq) {

    $(window).scrollTop(0);
    if (q === undefined || trimText(q) === "q=" || trimText(q).length === 0)
        return;

    if (rq === undefined)
        rq = false;

    // $('#resultView').css('margin-top','0px');
    showResultView();
    $(".tabBar").removeClass("hide");
    $(".navSplitter").removeClass("hide");
    $("#divCommands").removeClass("hide");

    q = q.replace(/\+/g, " ")

    var jq = "";
    var qs = "";
    var qsToPost = '';
    qs = q;
    jq = qs.substring(0);
    var jqp = jq.substring(0, jq.indexOf("&"));
    if (jqp !== null && jqp.length > 0)
        jq = jqp;


    jq = decodeURIComponent(jq);
    $('#txtUpperQuery').val(jq);
    document.title = jq + " - Kngine";
    if (rq) {
        qs = q;
        jq = qs.substring(2);
        var jqp = jq.substring(0, jq.indexOf("&"));
        if (jqp !== null && jqp.length > 0)
            jq = jqp;
        jq = unescape(jq);
        $('#txtUpperQuery').val(jq);
        document.title = jq + " - Kngine";


        var geoqs = getGeoCode();
        qsToPost = qs + "&" + geoqs

    } else {
        jq = q; //document.getElementById('txtKnow').value;
        qs = "q=" + encodeURIComponent(jq);
        var geoqs = getGeoCode();
        qsToPost = qs + "&" + geoqs
    }
    var strQuery = ajaxOptions.searchBaseUrl + qsToPost;

    var c;
    if (XMLHttpRequest)
        c = new XMLHttpRequest;
    else if (window.ActiveXObject)
        c = new ActiveXObject("Microsoft.XMLHTTP");
    else return false;

    var txtUpperQuery1 = document.getElementById("txtUpperQuery");
    txtUpperQuery1.value = jq;

    lastSubmittedQuery = jq.replace(/'/g, '\'');
    beforeAjax();

    c.onreadystatechange = function () {

        if (c.readyState == 4) {
            // $('#resultView').css('margin-top', '-105px', 1);
            if (c.responseText.length > 4) {
                var userQueryIndex = c.responseText.indexOf("kuq='");
                var userQueryIndexEnd = c.responseText.indexOf("kuqend=");
                if (userQueryIndex >= 0 || userQueryIndexEnd >= 0) {

                    userQueryIndex += "kuq='".length;
                    var userQuery = c.responseText.substring(userQueryIndex, userQueryIndexEnd);
                    userQuery = userQuery.substring(0, userQuery.lastIndexOf("'"));
                    if (lastSubmittedQuery != userQuery)
                        return;
                }
                else if (c.responseText.indexOf("err") < 0) {
                    return;
                }
                var divC = document.getElementById("divResult");
                var html = c.responseText + footerHtml;
                var txtUpperQuery = document.getElementById("txtUpperQuery");
                divC.setAttribute("fetched", "true");
                divC.innerHTML = html;

                evalExternalResources();
                setTimeout("evalStateScript();", 200);
                afterAjax();
            }
        }
    };
    c.open("GET", strQuery, true);
    c.send(null);

    //modifyBroswerHistory();

    window.location.hash = "Know!" + qs;
    lasthash = "#Know";
    lastQuery = window.location.hash;
    //document.getElementById("agoToFirst").click();
    //modifyBroswerHistory();
}
function evalExternalResources() {
    $(".externalResources").each(function (index) {
        for (var i = 0; i < this.children.length; i++) {
            if (arrayContains(externalResourcesLoaded, this.children[i].src))
                continue;

            if (this.children[i].nodeName === "SCRIPT") {

                if (this.children[i].src === null || this.children[i].src.length == 0) {
                    if (this.children[i].getAttribute("delay") !== null) {
                    } else {
                        eval(this.children[i].innerHTML);
                    }
                } else {
                    loadjscssfile(this.children[i].src, "js");
                }
            }
            else if (this.children[i].nodeName === "LINK") {
                loadjscssfile(this.children[i].href, "css");
            }
            else if (this.children[i].nodeName === "HTMLSNIPPET") {
                var idx = this.children[i].getAttribute("id");
                var isLoadedBeforex = arrayContains(externalResourcesLoaded, idx);
                if (isLoadedBeforex) {
                    this.removeChild(this.children[i]);
                }
                externalResourcesLoaded.push(idx);
            }
        }

    });
    externalResourcesLoaded = new Array();
}
function evalStateScript() {
    try {
        $("script[displayName='statScript']").each(function (index, element) {
            eval(element.innerHTML);
        });

    } catch (e) {

        setTimeout("evalStateScript();", 200);
    }

}
function arrayContains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

var externalResourcesLoaded = new Array();

function loadjscssfile(filename, filetype) {
    var fileref;
    if (filetype == "js") { //if filename is a external JavaScript file
        fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename);
        externalResourcesLoaded.push(filename);
    }
    else if (filetype == "css") { //if filename is an external CSS file
        fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename);
        externalResourcesLoaded.push(filename);
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
function onEnter(evt, element) {
    var keyCode = null;

    if (evt.which) {
        keyCode = evt.which;
    } else if (evt.keyCode) {
        keyCode = evt.keyCode;
    }
    if (13 == keyCode) {
        element.click();
        return false;
    }
    return true;
}
var lasthash = '';
var lastQuery;
function checkhash() {
    var obj = window.location.hash;
    if (obj) {
        if (lastQuery && lastQuery != window.location.hash) {
            var sc = getSearchCommand(window.location.hash);
            if (sc.length > 0) {
                loadResult(sc, true);
            }

        }
    } else if (lasthash == "#Know") {
        resetUI('');
    }
}
function resetUI(v) {
    resetAuto();
    $(".navSplitter").addClass("hide");
    $(".tabBar").addClass("hide");
    var divC1 = document.getElementById("divResult");
    divC1.innerHTML = "";
    document.getElementById("resultView").style.display = 'none';
    window.location.hash = "";
    lasthash = "";
    lastQuery = "-";
    document.title = "Kngine²" + " - Kngine";
    $('#txtUpperQuery').val('');
    $('#txtKnow').val('');
    document.getElementById("resultView").className = "resultView hide";
    //hideAfter("resultView", 700);
    document.getElementById("defaultView").className = "fade show"; //.style.display = 'none';
    showAfter("defaultView", 700);
    $("pgFooter").css("display", "");
}
window.onload = function () {
    setInterval("checkhash()", 400);
}

function callResponsiveElements() {
    responsiveTabs();
}

function responsiveTabs() {
    var $tabBar = $(".tabBar");
    var tabBarHeight = $tabBar.height();
    var tabBarWidth = $tabBar.width();
    var windowWidth = $(window).width();


    var tabsTitleCharsCount = 0;
    var tabsTitleWidth = 0;
    var singleTabMaxTitleLength = 0;
    var tabsCount = 0;
    $(".tabBar>ul>li>span").each(function (index, element) {
        tabsTitleCharsCount += $(element).text().length;
        tabsCount++;
    })


    var tabsPaddingsAndMargins = tabsCount * 7;
    var maxtabsTitleLength = windowWidth / 10
    maxtabsTitleLength -= tabsPaddingsAndMargins;

    tabsTitleWidth = tabsTitleCharsCount * 7;
    tabsTitleWidth += tabsPaddingsAndMargins;
    var tabsTitlesNeedTruncate = tabsTitleWidth > windowWidth;


    var currentWidth = 0;
    $(".tabBar>ul>li").each(function (index, li) {
        var $li = $(li);
        currentWidth += $li.width();
    });

    if (tabsTitlesNeedTruncate) {
        singleTabMaxTitleLength = parseInt(maxtabsTitleLength / tabsCount);
        $(".tabBar>ul>li>span").each(function (index, span) {
            var $span = $(span);
            title = $span.text();

            var titleEl = $span.children("ktl").first();
            var title = $(titleEl).text();

            var shortText = jQuery.trim(title).substring(0, singleTabMaxTitleLength)
                              .split(" ").slice(0, -1).join(" ") + "...";
            var html = shortText + "<ktl>" + title + "</ktl>";
            $span.html(html);

        })
    } else {
        $(".tabBar>ul>li>span").each(function (index, span) {
            var $span = $(span);
            var $ktl = $span.children("ktl").first();
            var title = $ktl.html();
            var html = $span.attr("title") + "<ktl>" + title + "</ktl>";
            $span.html(html);
        })
    }
    responsiveTabBottom();


    //    alert("maxtabsTitleLength = " + maxtabsTitleLength + "\nsingleTabMaxTitleLength = " + singleTabMaxTitleLength + "\nall tabs text lenght = " + tabsTitleCharsCount + " estimated width = " + (tabsTitleCharsCount * 7));
    //    alert("tabs count = " + tabsCount + "\nwindow width = " + $(window).width() + " \ntab bar width = " + tabBarWidth + " \ntab bar height = " + tabBarHeight);
}
function responsiveTabBottom() {

    if (!__isIpad)
        return;

    $(".tabBar>ul>li>span").each(function (index, span) {
        var $span = $(span);
        var $li = $($span.parent());
        if ($li.hasClass("tabSelected")) {
            var $d = $li.find("div");
            $d.addClass("tabSelectedBottom");
            if ($d.width() < 100)
                $d.width("130%");
            else
                $d.width("110%");
        } else {
            var $d = $li.find("div");
            $d.removeClass("tabSelectedBottom");
            $d.width(0);
        }
    })


}
function callYoutubePlayer(frameId, method, arguments) {
    if (window.jQuery && frameId instanceof jQuery) frameId = frameId.get(0).id;
    var iframe = document.getElementById(frameId);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }
    if (iframe) {
        var message = JSON.stringify({
            "event": "command",
            "func": method,
            "args": arguments || [],
            "id": frameId
        });
        iframe.contentWindow.postMessage(message, "*");
    }
}