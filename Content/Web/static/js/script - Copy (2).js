
if(document.body.offsetWidth < 1000 && $('#mobSlider').length){
	$('#mobSlider').addClass('small');
	$('.mb30').css('margin-bottom' , 0);
	}
window.onresize = function() {
if(document.body.offsetWidth < 1000 && $('#mobSlider').length){
	$('#mobSlider').addClass('small');
	$('.mb30').css('margin-bottom' , 0);
	}
if(document.body.offsetWidth > 1000 && $('#mobSlider').length){
	$('#mobSlider').removeClass('small');
	$('.mb30').css('margin-bottom' , 30);
	}

}
$('body img').each(function () {
    var $li = $(this);
    $li.hide();
    var image = $('<img />').attr('src', $(this).attr('src')).load(function () {
        $li.fadeIn();
    });
});
//////////////////////////////////fadeslider
if ($('#mobSlider').length) {
    $('#mobSlider').hide();
    var image1 = $('<img />').attr('src', 'Content/static/images/Iphone.png').load(function () {
		$('#mobSlider').fadeIn('slow');
        slide('#mobSlider');
    });
}

if ($('#lapSlider').length) {
    $('#lapSlider').hide();
    var image1 = $('<img />').attr('src', 'Content/static/images/laptop.png').load(function () {
        $('#lapSlider').fadeIn('slow');
        slide('#lapSlider');
    });
}
if ($('#textslider').length) {
    slidetext('#textslider');
}

if ($('#halfmobSlider').length) {
    slidehalfmob();
}

function slide(id) {
    ///////////////////////////////////////////////start loading first image
    var visible;
    var elenum = $(id + ' li').length;
    var $ind = 0;

    $(id + ' li').eq($ind).find('img').one("load", function () {

        visible = $(this).parent();
        visible.addClass('visible');

        $(this).parent().show();
    }).each(function () {
        if (this.complete) $(this).trigger("load");
    });
    ///////////////////////////////////////////////end loading first image
    $(function showNextImage() {

        $ind = $ind < (elenum - 1) ? ($ind + 1) : 0;
        //alert($ind);
        ///////////////////////////////////////////////start loading next image
        $(id + ' li').eq($ind).find('img').one("load", function () {
            var currentLi = $(this).parent();
            currentLi.fadeIn('fast', function () {
                visible.delay(5000).fadeOut('slow', function () {
                    $(this).removeClass('visible');
                    currentLi.addClass('visible');
                    visible = currentLi;
                    showNextImage();
                });

            });

        }).each(function () {
            if (this.complete) $(this).trigger("load");
        });
        /////////////////////////////////////////////end loading next image
    });
}
//////////////////////////////////fadeslider


function slidetext(id) {
    $(id + ' li').show();
    $(id + ' ul').css('width', 985 * $(id + ' ul li').length)
    var $ind = 0,
        $len = $(id + ' ul li').length;
    var pelem = '<li class=""><a href="#{id}">{nu}</a></li>';
    for (var index = 0; index < $len; index++) {
        $(id + 'pagination').append(pelem.replace("{id}", index).replace("{nu}", index + 1));
    }
    $(id + 'pagination li').eq(0).addClass('active');

    $(function showNext() {
        $ind = $ind < ($len - 1) ? ($ind + 1) : 0;

        $(id + ' ul').delay(7000).animate({
            left: (-982 * $ind)
        }, 'slow', 'swing', function () {
            $(id + 'pagination li').removeClass('active').eq($ind - 1).addClass('active');
            showNext();
        });
    });

    $(id + 'pagination li a').each(function (index, element) {
        $(this).click(function (e) {
            $(this).parent().parent().children().removeClass('active');
            $(this).parent().addClass('active');
            $(id + ' ul').stop(true, false).animate({
                left: (-982 * $(this).parent().index())
            }, 'slow', 'swing');

            e.preventDefault();
        });
    });



}

/////////////////////////////////////////////end text text
function slidehalfmob() {
    $('#halfmobSlider li').show();


    $('#halfmobSlider  ul').css('width', 350 * $('#halfmobSlider  ul li').length)
    var $ind = 0,
        $len = $('#halfmobSlider ul li').length;
    $len = $len / 3;
    var pelem = '<li class=""><a href="#{id}">{nu}</a></li>';

    for (var index = 0; index < $len; index++) {
        $('#halfmobSliderpagination').append(pelem.replace("{id}", index).replace("{nu}", index + 1));
    }
    $('#halfmobSliderpagination li').eq(0).addClass('active');

    //$(function showNext() {
    //	$ind = $ind < ($len-1) ? ($ind+1) : 0;
    //	$('#halfmobSlider ul').delay(5000).animate(
    //{
    //left: (-329*3 * $ind)
    //}
    //	,'slow', 'easeOutBack', function(){
    //			$('#halfmobSliderpagination li').removeClass('active').eq($ind-1).addClass('active');
    //				showNext();});
    //}
    // );
    $('#halfmobSliderpagination li a').each(function (index, element) {
        $(this).click(function (e) {
            $(this).parent().parent().children().removeClass('active');
            $(this).parent().addClass('active');
            $('#halfmobSlider ul').stop(true, false).animate({
                left: (-329 * 3 * $(this).parent().index())
            }, 'slow', 'easeOutBack');

            e.preventDefault();
        });
    });


};
/////////////////////////////////////////////end halfmob text
//////////////////////////////////tourslider
if ($('#tourSlider').length) {
$('#tourSlider').hide();
var image1 = $('<img />').attr('src', 'Content/static/images/features-iphone.png').load(function () {
    $('#tourSlider').fadeIn('slow');
    var visible;
    ////////////////////////////////////''
    $('#tourSlider li').hide().eq(0).find('img').one("load", function () {
        //	$('#tourSlider li').eq(0).addClass('visible');
        visible = $('#tourSlider li').eq(0);
        visible.addClass('visible');
        $(this).parent().show();
    }).each(function () {
        if (this.complete) $(this).trigger("load");
    });

    $('#snaky').css('height', $('#ani.list-features li').eq(0).height());
   $('#snaky').css('margin-top', $('#ani.list-features li').eq(0).offset().top - $('#snaky').parent().offset().top);
    $('#snaky').show();
    $('#ani.list-features li').each(function (index, element) {
        $(this).click(function () {

            if (visible.index() != $(this).index()) {
                $('#tourSlider li').eq($(this).index()).find('img').one("load", function () {
                    visible.parent().children('li').removeClass('visible');
                    $(this).parent().addClass('visible').fadeIn("slow", function () {
                        visible.hide();
                        visible = $(this);
                    });

                }).each(function () {
                    if (this.complete) $(this).trigger("load");
                });
            }
            $('#snaky').stop(false, true).animate({
                'height': $(this).height(),
                'marginTop': $(this).offset().top - $('#snaky').parent().offset().top
            }, 'slow', 'easeOutBack');

        });
    });
    ////////////////////////////////////
});
}
//////////////////////////////////tourslider


/////////////////////////////////////////////////simpleSlider

$('ul#simpleSlider').each(function(index, element) {
	var simpleslider = $(this);
	simpleslider.hide();
	
	var image1 = $('<img />').attr('src', 'Content/static/images/half.png').load(function () {
    simpleslider.fadeIn('slow');
    var visible;
	   simpleslider.find('li').hide().eq(0).find('img').one("load", function () {
        visible = simpleslider.find('li').eq(0);
        visible.addClass('visible');
        $(this).parent().show();
    }).each(function () {
        if (this.complete) $(this).trigger("load");
    });
		simpleslider.parent().parent('section').children().children('#links').children('a').each(function(index, element) {
        $(this).click(function(e) {
			if (visible.index() != $(this).index()) {
				 simpleslider.find('li').eq($(this).index()).find('img').one("load", function () {
					 visible.parent().children('li').removeClass('visible');
					 $(this).parent().addClass('visible').fadeIn("slow", function () {
                        visible.hide();
                        visible = $(this);
                    });
					 }).each(function () {if (this.complete) $(this).trigger("load");});
				}
            e.preventDefault();
        });
    });
	
	
	});

});

/////////////////////////////////////////////////simpleSlider end
$(document).ready(function () {
    clickIphone();

    function clickAndroid() {
        $('#androidbg').addClass('grayclicked');
        $('#iphonebg').removeClass('grayclicked');
        var android = $('<img />').attr('src', 'Content/static/images/android.png').load(function () {
            $('#tourSlider li').animate({
                'marginTop': 102,
                'marginLeft': 29,
            }, 0, 'swing', function () {
                $('#tourSliderbg').css('background', 'url(Content/static/images/android.png) no-repeat center');
            });
        });
    }

    function clickIphone() {
        $('#iphonebg').addClass('grayclicked');
        $('#androidbg').removeClass('grayclicked');
        var iphone = $('<img />').attr('src', 'Content/static/images/features-iphone.png').load(function () {
            $('#tourSlider li').animate({
                'marginTop': 121,
                'marginLeft': 30
            }, 0, 'swing', function () {
                $('#tourSliderbg').css('background', 'url(Content/static/images/features-iphone.png) no-repeat center');
            });
        });
    }

    $('#changebg a').each(function (index, element) {
        $(this).click(function (e) {
            e.preventDefault();
            if ($(this).attr('id') == 'iphonebg') {
                clickIphone();
            } else if ($(this).attr('id') == 'androidbg') {
                clickAndroid();
            }
        });
    });


    $('.list-features li a').each(function (index, element) {
        $(this).click(function (e) {
            e.preventDefault();
        });
    });


    //////////////////////////////////Fancy Box
    $("a.zoom").fancybox({
        'opacity': true,
        'overlayColor': '#000',
        'overlayOpacity': 0.8,
        'centerOnScroll': false,
        'titlePosition': 'over',
        'onComplete': function () {
            $("#fancybox-title").hide();
            $("#fancybox-wrap").hover(function () {
                $("#fancybox-title").show();
            }, function () {
                $("#fancybox-title").hide();
            });
        }
    });
    //////////////////////////////////Fancy Box

    //////////////////////////////////Text Inputs Vals
    $('#name, #email, #message, #subscribtion').focus(function () {
        if ($(this).val() == $(this).attr('ov')) {
            $(this).val('');
        }
    });

    $('#name, #email, #message, #subscribtion').focusout(function () {
        if ($(this).val() == '') {
            $(this).val($(this).attr('ov'));
        }
    });
    //////////////////////////////////Text Inputs Vals
    //////////////////////////////////Forms Submit and Validation
    $('#contact_form').submit(function () {
        $('.name_error, .email_error, .message_error').remove();
        var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        var emailaddressVal = $("#email").val();

        if ($("#name").val() == '' || $("#name").val() == $("#name").attr('ov')) {
            $("#name").after('<span class="name_error">*</span>');
            return false;
        } else {
            $('.name_error').remove();
        }
        //
        if (emailaddressVal == '' || emailaddressVal == $("#email").attr('ov')) {
            $("#email").after('<span class="email_error">*</span>');
            return false;
        } else if (!emailReg.test(emailaddressVal)) {
            $("#email").after('<span class="email_error">*</span>');
            return false;
        } else {
            $('.email_error').remove();
        }
        //
        if ($("#message").val() == '' || $("#message").val() == messageVal) {

            $("#message").after('<span class="message_error">*</span>');
            return false;
        } else {
            $('.message_error').remove();
        }
        $.ajax({
            type: "POST",
            cache: false,
            url: "contactform.php",
            data: $(this).serializeArray(),
            success: function (data) {
                $.fancybox(data, {
                    'opacity': true,
                    'overlayColor': '#000',
                    'overlayOpacity': 0.8,
                    'centerOnScroll': false,
                    'titlePosition': 'over'
                });
            }
        });
        return false;
    });

    $('#subscribe').submit(function () {

        var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        var emailaddressVal = $("#subscribtion").val();
        if (emailaddressVal == '') {
            hasError = true;
        } else if (!emailReg.test(emailaddressVal)) {
            hasError = true;
        }

        if (hasError == true) {
            $("#subscribtion").after('<span class="subscribe_error">*</span>');
            return false;
        }
    });
    //////////////////////////////////Forms Submit and Validation


});

$(document).ready(function () {
    //////////////////////////////////Image Filter
    //////////////////////////////////Image Filter
    //////////////////////////////////Fancy Box
    $("a.zoom").fancybox({
        'opacity': true,
        'overlayColor': '#000',
        'overlayOpacity': 0.8,
        'centerOnScroll': false,
        'titlePosition': 'over',
        'onComplete': function () {
            $("#fancybox-title").hide();
            $("#fancybox-wrap").hover(function () {
                $("#fancybox-title").show();
            }, function () {
                $("#fancybox-title").hide();
            });
        }
    });
    //////////////////////////////////Fancy Box
});