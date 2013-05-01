$(document).ready(function () {
    var vscontents = $("ul#vscontents").html();
    var latlng = '';
    var textArray = ["Thinking", "Just a second", "I'm on it"];

$('#loadingTxt').loadText(textArray, 5000);

    $('.back').hide();

    var d = new Date();
    var time = d.getHours();
    if (time < 11) {
        $('#bubble-orangetxt').append("<img src='Content/MobileWeb/img/morning.png' />");
    } else if (time > 11 && time < 16) {
        $('#bubble-orangetxt').append("<img src='Content/MobileWeb/img/afternoon.png' />");
    } else {
        $('#bubble-orangetxt').append("<img src='Content/MobileWeb/img/evening.png' />");
    }


    triggerLiClick();

    function hideTop() {
        $('.hidetop').animate({
            'marginTop': '-' + 15 + 'em'
        }, 500);
        $('.blueb').animate({
            'marginTop': -0.9 + 'em'
        }, 500);
        $('#dynamicContainer').animate({
            'marginTop': 8.6 + 'em'
        }, 500);
        $('.hidetop').hide('fast');
        $('#bubble-blue').find('#inputTxt').css('left', 3 + 'em');
        $('#bubble-blue').find('#inputTxt').css('right', 3 + 'em');
        //$('#bubble-blue').find('#inputTxt').addClass('active');
        $('.back').show(200);
        $('body').scrollTop();
    }

    function showTop() {
        $('.hidetop').show();
        $('.hidetop').animate({
            'marginTop': -1 + 'em'
        }, 500);
        $('.blueb').animate({
            'marginTop': 9 + 'em'
        }, 500);
        $('#dynamicContainer').animate({
            'marginTop': 18.6 + 'em'
        }, 500);
        $('#bubble-blue').find('#inputTxt').css('left', 1.8 + 'em');
        $('#bubble-blue').find('#inputTxt').css('left', 1.8 + 'em');
        $('#bubble-blue').find('#inputTxt').removeClass('active');
        $('.back').hide(200);
        $('#bubble-blue').find('#inputTxt').val('e.g. Who is Barack Obama?');
        $("ul#vscontents").html(vscontents);
        triggerLiClick();
    }

    $('#bubble-blue').find('#inputTxt').click(function () {
        hideTop();
        if ($('#bubble-blue').find('#inputTxt').val() == 'e.g. Who is Barack Obama?') {
            $('#bubble-blue').find('#inputTxt').val('');
        }
    });
    $('#bubble-blue').find('#inputTxt').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#searchIcon').click();
        } else {
            if (!$('#bubble-blue').find('#inputTxt').hasClass('active')) {
                $('#bubble-blue').find('#inputTxt').addClass('active');
            }
            if ($('#bubble-blue').find('#inputTxt').val() == 'e.g. Who is Barack Obama?') {
                $('#bubble-blue').find('#inputTxt').val('');
            }
            if ($('#bubble-blue').find('#inputTxt').val() != ' ') {
                $('#searchIcon').show();
            }
            view($('#bubble-blue').find('#inputTxt').val());
        }
    });



    $('.back').click(function () {
        showTop();
        $('#searchIcon').hide();
        $('#webresults').empty();
    });

    function triggerLiClick() {
        $('ul#vscontents li').each(function (index, element) {
            $(this).click(function () {
                $('#bubble-blue').find('#inputTxt').addClass('active');
               // $('#bubble-blue').find('#inputTxt').focus();
                hideTop();
                $('#bubble-blue').find('#inputTxt').val($(this).find('#title').html() + " ");
                view($('#bubble-blue').find('#inputTxt').val());
                $('#searchIcon').show();
            });

        });
    }



    function view(val) {
        $("ul#vscontents").empty();
        $('#webresults').empty();

        var subscriptionUrl = "http://kngine.com/QuerySuggestion.ashx?q={" + val + "}&v=2";
        var content = " <li><div id='text'><div id='title'>{text}</div></div></li> ";


        $.ajax({
            url: subscriptionUrl,
            type: "GET",
            success: function (responseText) {
                var myObject = responseText.result;

                if (myObject == null) {
                    return;
                };
                if (myObject == "") {
                    return;
                };

                for (var index = 1; index < myObject.length && index < 12; index++) {
                    $("ul#vscontents").append(content.replace("{text}", myObject[index].text));
                }
                triggerLiClick();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                alert("ERROR " + textStatus, errorThrown);
            }
        });
    }

    $('#searchIcon').hide();
    $('#searchIcon').click(function () {
        getLocation();
    });


    function viewHTML(val, latlong) {
        var subscriptionUrl = "http://kngine.com/mobilewebsearchapi.ashx?q={" + val + "}" + latlong;
        $('#loadingTxt').show();
        $.ajax({
            url: subscriptionUrl,
            type: "GET",
            success: function (responseText) {
                var myObject = responseText;
                if (myObject == null) {return;};
                if (myObject == "") {return;};
$('#loadingTxt:visible').hide();
                $('#webresults').html(myObject);


            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                $('#loadingTxt').html('Error');
            },
            complete: function () {
                $('#loadingTxt:visible').hide();
            }
        }).done(function () {$('#loadingTxt:visible').hide();});;

    }




    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        latlng = "&lat=" + position.coords.latitude + "&long=" + position.coords.longitude;
        viewHTML($('#bubble-blue').find('#inputTxt').val(), latlng);
        $("ul#vscontents").empty();
    }


}); //end of Document Ready

$.fn.loadText = function (textArray, interval) {
    return this.each(function () {
        var obj = $(this);
        obj.empty().html(random_array(textArray));
        timeOut = setTimeout(function () {   obj.loadText(textArray, interval) }, interval);
    });
}

function random_array(aArray) {
    var rand = Math.floor(Math.random() * aArray.length + aArray.length);
    var randArray = aArray[rand - aArray.length];
    return randArray;
}