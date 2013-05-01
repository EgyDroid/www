 var topRange      = 200,  // measure from the top of the viewport to N pixels down
     edgeMargin    = 150,   // margin above the top or margin from the end of the page
	 positioningOffset = 110;
     animationTime = 500, // time in milliseconds
     contentTop = [];
var isMatch = false
var isHeaderOpen = true;
var isFooterOpen = true;

$(document).ready(function(){
	//Social icons hover animation
	$('#social_icons li').hover(function() {
		$(this).stop().animate({ top: -17 }, 200);
	},
	function() {
		$(this).stop().animate({ top: 0 }, 200);
	})
	//---------------------------------------------------------------------
	$('.arrow_container').css( {backgroundPosition: "0px -36px"} );
	function enableFooterClick()
	{
		$('.footer_arrow').click(function(){
		//console.log(isFooterOpen);
			if(isFooterOpen == false)
			{
				$('.footer_arrow').animate({
					marginTop: 4
				}, 500);
				
				$('#footer').stop().animate({
					bottom: 0
				}, 500)
				isFooterOpen = true;
				$('.arrow_container').stop().animate({
					backgroundPosition: '0px -36px'
				}, 500);
			}else{
				$('.footer_arrow').delay(500).animate({
					marginTop: -25
				}, 500);
				
				$('#footer').stop().animate({
					bottom: -29
				}, 500)
				isFooterOpen = false;
				$('.arrow_container').stop().animate({
					backgroundPosition: '0px 0px'
				}, 500);
			}
		})
	}
	setTimeout(function()
	{
		$('#footer').stop().animate({
			queue: false,
			bottom: -29
		}, 500)
		$('.footer_arrow').delay(500).animate({
				marginTop: -25
			}, 500, function(){
				enableFooterClick();
			});
			
		$('.arrow_container').stop().animate({
			backgroundPosition: '0px 0px'
		}, 500)
		isFooterOpen = false;
	}, 1500);
	
	//================================
	$('body').mousemove(function(){
		if(isHeaderOpen == false)
		{
			$('#header').animate({
				top: 0
			}, 500, function(){
				//$('#header').stop();
			});
			positioningOffset = 120;
			isHeaderOpen = true;
			
			if($.browser.opera)
			{
				$("html:not(:animated)").stop().animate({ scrollTop: $(window).scrollTop() - 80}, animationTime );
			}
			else
			{
				$("html:not(:animated),body:not(:animated)").stop().animate({ scrollTop: $(window).scrollTop() - 80}, animationTime );
			}
		}
	});
	//===============================
		
	$("a.zoom").fancybox({
		'opacity'		: true,
		'overlayColor'	: '#000',
		'overlayOpacity' : 0.8,
		'centerOnScroll' : false,
		'titlePosition'	: 'over',
		'onComplete'	:	function() {
			$("#fancybox-title").hide();
			$("#fancybox-wrap").hover(function() {
				$("#fancybox-title").show();
			}, function() {
				$("#fancybox-title").hide();
			});
		}
	});
	
	var nameVal = $('#name').val();
	
	$('#name').focus(function(){
		if($(this).val() == nameVal)
		{
			$(this).val('');
		}
	});
	
	$('#name').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(nameVal);
		}
	});
	//==================================================================
	var emailVal = $('#email').val();
	
	$('#email').focus(function(){
		if($(this).val() == emailVal)
		{
			$(this).val('');
		}
	});
	
	$('#email').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(emailVal);
		}
	});
	//==================================================================
	var webVal = $('#website').val();
	
	$('#website').focus(function(){
		if($(this).val() == webVal)
		{
			$(this).val('');
		}
	});
	
	$('#website').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(webVal);
		}
	});
	//==================================================================
	var messageVal = $('#message').val();
	
	$('#message').focus(function(){
		if($(this).val() == messageVal)
		{
			$(this).val('');
		}
	});
	
	$('#message').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(messageVal);
		}
	});
	//------------------------------
	$('#contact_form').submit(function(){
		$('.name_error, .email_error, .message_error').remove();
		var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 
        var emailaddressVal = $("#email").val();
		
		if($("#name").val() == '' || $("#name").val() == nameVal) 
		{
			$("#name").after('<span class="name_error">*</span>');
			return false; 
        }else{
			$('.name_error').remove();
		}
		//
        if(emailaddressVal == '' || emailaddressVal == emailVal) 
		{
            $("#email").after('<span class="email_error">*</span>');
			return false; 
        }
        else if(!emailReg.test(emailaddressVal)) 
		{
            $("#email").after('<span class="email_error">*</span>');
			return false; 
        }else{
			$('.email_error').remove();
		}
		//
		if($("#message").val() == '' || $("#message").val() == messageVal) 
		{
			
            $("#message").after('<span class="message_error">*</span>');
			return false; 
        }else{
			$('.message_error').remove();
		}
		$.ajax({
			type        : "POST",
			cache       : false, 
			url         : "contactform.php",
			data        : $(this).serializeArray(),
			success: function(data) {
				$.fancybox(data,{
					'opacity'		: true,
					'overlayColor'	: '#000',
					'overlayOpacity' : 0.8,
					'centerOnScroll' : false,
					'titlePosition'	: 'over'
				});
			}
		});
		return false;
	});
	//==================================================================
	var subscribeVal = $('#subscribtion').val();
	
	$('#subscribtion').focus(function(){
		if($(this).val() == subscribeVal)
		{
			$(this).val('');
		}
	});
	
	$('#subscribtion').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(subscribeVal);
		}
	});
	
	var subscribeVal = $("#subscribtion").val();
	
	$('#subscribe').submit(function(){
	
		var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 
        var emailaddressVal = $("#subscribtion").val();
        if(emailaddressVal == '') 
		{
            hasError = true;
        }
 
        else if(!emailReg.test(emailaddressVal)) 
		{
            hasError = true;
        }
 
        if(hasError == true) { 
			$("#subscribtion").after('<span class="subscribe_error">*</span>');
			return false; 
		}
	});
	//==================================================================
	var matchArr = new Array();
	var n = 0;
	var selection = 'p, h1, h2, h3, h4, h5, ';
	var searchVal = $('#search').val();
	
	$('#search').focus(function(){
		if($(this).val() == searchVal)
		{
			$(this).val('');
			$(selection).highlightRegex();
		}
	});
	
	$('#search').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(searchVal);
		}
	});
	
	$('#search').keyup(function(){
		
		n = 0;
		matchArr = new Array();
		//
		$(selection).highlightRegex();
		//
		if($(this).val() != '' && $(this).val().length > 2) {
			
			$(selection).highlightRegex(new RegExp($(this).val(), 'ig'));

			
			$('.highlight').each(function(){
			
				if($(this).is(":visible") && $(this).parents().css('visibility') != 'hidden')
				{
					//console.debug($(this));
					var topOffset = $(this);
					matchArr.push(topOffset);
				}
			});
			
			for(var i = 0; i<matchArr.length; i++)
			{
				matchArr[i].removeAttr('id');
			}

			if(matchArr.length > 2)
			{
				matchArr[0].attr('id', 'current_match');
				$("#next").fadeIn("slow");
			}
			else
			{
				//$("#next").fadeOut("slow");
			}
			//=================================
			if(matchArr.length > 0)
			{
				animateScroll();
				isMatch = true;
			}
			if(matchArr.length < 1)
			{
				isMatch = false;
			}
			n = 1;
			//$('#trace').text(matchArr.length);
		}
		else
		{
			//$("#next").fadeOut("slow");
		}
	})
	
	if(!isMatch)
	{
		$('#next').css('cursor', 'pointer');
		$('#next').click(function(){

			setIdToMatch(n);
			animateScroll();
			
			//$('#trace').text(n + " : " + (matchArr.length - 1));
			
			n++;
			
			if(n > matchArr.length - 1)
			{
				n = 0;
			}
			
		});
		
		function setIdToMatch(num)
		{
			for(var i = 0; i<matchArr.length; i++)
			{
				matchArr[i].removeAttr('id');
			}
			
			matchArr[num].attr('id', 'current_match');
		}
	}else{
		$('#next').css('cursor', 'auto');
	}
	
	function animateScroll()
	{
		var MatchElement = matchArr[n];
   		var destination = $(MatchElement).offset().top - positioningOffset - 40;
		if($.browser.opera)
		{
			//$("html:not(:animated)").animate({scrollTop: destination},{queue:false, duration:500, easing:"quadEaseInOut"});
   			$("html:not(:animated)").animate({ queue:false, scrollTop: destination}, 500);
		}
		else
		{
			//$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination},{queue:false, duration:500, easing:"quadEaseInOut"});
			$("html:not(:animated),body:not(:animated)").animate({ queue:false, scrollTop: destination}, 500);
		}
	}
	//console.debug('ready')
})

//Innitiating Nivo slider
$(window).load(function(){ 	
	$('.nivoSlider').nivoSlider({
		directionNavHide:true,
		controlNav:false
	});
})
//zoomable images hover animation

$(function() {
	$('a.zoom').each(function() {
		
	});
});

//Social icons hover animation
$(function() {
	if(!$.browser.msie)
	{
	$('#footer img').each(function() {
		$(this).hover(
			function() {
				$(this).stop().animate({ opacity: 0.5 }, 500);
			},
			function() {
				$(this).stop().animate({ opacity: 1 }, 500);
			})
		});
	}
});

//Site scroll
$(function(){
	$('.inline_navigation').click(function(e){
   		var elementClicked = $(this).attr("href");
   		var destination = $(elementClicked).offset().top - positioningOffset;
		if($.browser.opera)
		{
   			$("html:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		else
		{
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		return false;
	});
});

//Scrolling the page when go up button is clicked
$(function(){
	$('.heading a').click(function(){
		var elementClicked = $(this).attr("href");
   		var destination = $(elementClicked).offset().top - positioningOffset;
		if($.browser.opera)
		{
   			$("html:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		else
		{
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		
		return false;
	});
});
