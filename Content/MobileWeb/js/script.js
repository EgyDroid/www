/*
Author: Vladimir Kharlampidi, The iDangero.us
*/
$(function(){
	/* Main Slider */
	swiper = new Swiper('.swiper1', {
		pagination : '.pagination1'
	});

	var swiperMControl = $('.mc-control').swiper({
		mode : "horizontal", 
		freeMode: true,
		freeModeFluid:true,
		speed:1000
	});
	$('.mc-control img').bind('mousedown',function(e){
		e.preventDefault()
	})
	$('.mc-control img').bind('click',function(e){
		e.preventDefault()
		var index = $(this).index() + $(this).parent().index()*8
		swiperMovies.swipeTo ( index )
	})
	
	
})

