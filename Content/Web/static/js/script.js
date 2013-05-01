if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
$('#nav li').css("padding-top", 18);
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
if ($('.fadeslider#tinyMobSlider').length) {
		$('.fadeslider#tinyMobSlider').each(function(index, element) {
			$(this).hide();
			$(this).fadeIn('slow');
         slider($(this));
		});  
}
function slider(id) {
    ///////////////////////////////////////////////start loading first image
    var visible;
    var elenum = id.find('li').length;
    var $ind = 0;

    id.find('li').eq($ind).find('img').one("load", function () {
        visible = $(this).parent();
        visible.addClass('visible');
        $(this).parent().show();
    }).each(function () {
        if (this.complete) $(this).trigger("load");
    });
    ///////////////////////////////////////////////end loading first image
    $(function showNextImage() {

        $ind = $ind < (elenum - 1) ? ($ind + 1) : 0;
        ///////////////////////////////////////////////start loading next image
        id.find('li').eq($ind).find('img').one("load", function () {
            var currentLi = $(this).parent();
			currentLi.fadeIn('slow', function () {
                visible.delay(2000).fadeOut('slow', function () {
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
        ///////////////////////////////////////////////start loading next image
        $(id + ' li').eq($ind).find('img').one("load", function () {
            var currentLi = $(this).parent();
            currentLi.fadeIn('fast', function () {
                visible.delay(3000).fadeOut('slow', function () {
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
//////////////////////////////////tourslider
if ($('#tourSlider').length) {
$('#tourSlider').hide();
var image1 = $('<img />').attr('src', 'Content/static/images/features-iphone.png').load(function () {
    $('#tourSlider').fadeIn('slow');
    var visible;
    $('#tourSlider>li').eq(0).find('img').one("load", function () {
        visible = $('#tourSlider>li').eq(0);
        visible.addClass('visible');
        $(this).parent().fadeIn();
    }).each(function () {
        if (this.complete) $(this).trigger("load");
    });
    $('#snaky').css('height', $('#ani.list-features li').eq(0).height());
   $('#snaky').css('margin-top', $('#ani.list-features li').eq(0).offset().top - $('#snaky').parent().offset().top);
    $('#snaky').show();
    $('#ani.list-features li').each(function (index, element) {
        $(this).click(function () {
            if (visible.index() != $(this).index()) {
				var newElem = $('#tourSlider>li').eq($(this).index());
				if(newElem.find('#tinyMobSlider').length)
				{
					 newElem.addClass('visibler').fadeIn("slow", function () {
						visible.removeClass('visible').fadeOut("slow");
						newElem.removeClass('visibler').addClass('visible');
                        visible = $(this);
                    });
				}else{
					newElem.find('img').one("load", function () {
                    newElem.addClass('visible').fadeIn("slow", function () {
                        visible.removeClass('visible');
						visible.fadeOut();
                        visible = $(this);
                    });
                }).each(function () {
                    if (this.complete) $(this).trigger("load");
                });
					}
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
		simpleslider.parent().parent('section').find('#links').children('a').each(function(index, element) {
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
	
	//////////////////////////////////Fancy Box
	if($('a.zoom').length){
		$("a.zoom").click(function() {
    $.fancybox({
        'type' : 'iframe',
        // hide the related video suggestions and autoplay the video
        'href' : this.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '?rel=0&autoplay=1',
        'overlayShow' : true,
        'centerOnScroll' : true,
        'speedIn' : 100,
        'speedOut' : 50,
        'width' : 853,
        'height' : 480
    });
    return false;
});
	}//end if
    //////////////////////////////////Fancy Box
	if($('.social').length){
	$(".facebook").parent('a').attr('href', $(".facebook").parent('a').attr('href').replace('{PAGE-URL}',window.location) );
	$(".twitter").parent('a').attr('href', $(".twitter").parent('a').attr('href').replace('{PAGE-URL}',window.location) );
	}
    clickIphone();

    function clickAndroid() {
        $('#androidbg').addClass('grayclicked');
        $('#iphonebg').removeClass('grayclicked');
		
		$('#tourSlider').find('img').each(function(index, element) {
            $(this).attr('src', $(this).attr('src').replace('ios', 'android')+"?timestamp=" + new Date().getTime());
        });
        
		var android = $('<img />').attr('src', 'Content/static/images/android.png').load(function () {
            $('#tourSlider>li').animate({
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
		
		$('#tourSlider').find('img').each(function(index, element) {
            $(this).attr('src', $(this).attr('src').replace('android', 'ios')+"?timestamp=" + new Date().getTime());
			
        });
		
        var iphone = $('<img />').attr('src', 'Content/static/images/features-iphone.png').load(function () {
            $('#tourSlider>li').animate({
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



});