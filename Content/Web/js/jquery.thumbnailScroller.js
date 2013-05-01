(function ($) {
    $.fn.thumbnailScroller = function (options) {
        var defaults = { //default options
            scrollerType: "clickButtons", //values: "hoverPrecise", "hoverAccelerate", "clickButtons"
            scrollerOrientation: "horizontal", //values: "horizontal", "vertical"
            scrollEasing: "easeOutCirc", //easing type
            scrollEasingAmount: 800, //value: milliseconds
            acceleration: 2, //value: integer
            scrollSpeed: 600, //value: milliseconds
            noScrollCenterSpace: 1, //value: pixels
            autoScrollingSpeed: 8000, //value: milliseconds
            autoScrollingEasing: "easeOutBounce", //easing type
            autoScrollingDelay: 2500, //value: milliseconds
			swipe: 1 //mobile swip
        };
		

 
var startX =0;
    touch = "ontouchend" in document,
    startEvent = (touch) ? 'touchstart' : 'mousedown',
    moveEvent = (touch) ? 'touchmove' : 'mousemove',
    endEvent = (touch) ? 'touchend' : 'mouseup';
	
	
	
        var options = $.extend(defaults, options);
        return this.each(function () {
            //cache vars
            var $this = $(this);
            var $scrollerContainer = $this.children(".jTscrollerContainer");
            var $scroller = $this.children(".jTscrollerContainer").children(".jTscroller");
            var $scrollerNextButton = $this.children(".jTscrollerNextButton");
            var $scrollerPrevButton = $this.children(".jTscrollerPrevButton");
            //set scroller width
            if (options.scrollerOrientation == "horizontal") {
                $scrollerContainer.css("width", 999999);
                var totalWidth = $scroller.outerWidth(true);
                $scrollerContainer.css("width", totalWidth);
            } else {
                var totalWidth = $scroller.outerWidth(true);
            }
            var totalHeight = $scroller.outerHeight(true); //scroller height
            //do the scrolling
            if (totalWidth > $this.width() || totalHeight > $this.height()) { //needs scrolling		
                var pos;
                var mouseCoords;
                var mouseCoordsY;
                if (options.scrollerType == "hoverAccelerate") { //type hoverAccelerate
                    var animTimer;
                    var interval = 8;
                    $this.hover(function () { //mouse over
                        $this.mousemove(function (e) {
                            pos = findPos(this);
                            mouseCoords = (e.pageX - pos[1]);
                            mouseCoordsY = (e.pageY - pos[0]);
                        });
                        clearInterval(animTimer);
                        animTimer = setInterval(Scrolling, interval);
                    }, function () {  //mouse out
                        clearInterval(animTimer);
                        $scroller.stop();
                    });
                    $scrollerPrevButton.add($scrollerNextButton).hide(); //hide buttons
                } else if (options.scrollerType == "clickButtons") {
                    ClickScrolling();					
                }
				
				if (options.swipe == 1) {
                    SwipeScrolling();				
                } 
                //auto scrolling
                if (options.autoScrolling > 0) {
                    AutoScrolling();
                }
            } else {
                //no scrolling needed
                $scrollerPrevButton.add($scrollerNextButton).hide(); //hide buttons
            }
            //"hoverAccelerate" scrolling fn
            var scrollerPos;
            var scrollerPosY;
            function Scrolling() {
                if ((mouseCoords < $this.width() / 2) && ($scroller.position().left >= 0)) {
                    $scroller.stop(true, true).css("left", 0);
                } else if ((mouseCoords > $this.width() / 2) && ($scroller.position().left <= -(totalWidth - $this.width()))) {
                    $scroller.stop(true, true).css("left", -(totalWidth - $this.width()));
                } else {
                    if ((mouseCoords <= ($this.width() / 2) - options.noScrollCenterSpace) || (mouseCoords >= ($this.width() / 2) + options.noScrollCenterSpace)) {
                        scrollerPos = Math.round(Math.cos((mouseCoords / $this.width()) * Math.PI) * (interval + options.acceleration));
                        $scroller.stop(true, true).animate({ left: "+=" + scrollerPos }, interval, "linear");
                    } else {
                        $scroller.stop(true, true);
                    }
                }
                if ((mouseCoordsY < $this.height() / 2) && ($scroller.position().top >= 0)) {
                    $scroller.stop(true, true).css("top", 0);
                } else if ((mouseCoordsY > $this.height() / 2) && ($scroller.position().top <= -(totalHeight - $this.height()))) {
                    $scroller.stop(true, true).css("top", -(totalHeight - $this.height()));
                } else {
                    if ((mouseCoordsY <= ($this.height() / 2) - options.noScrollCenterSpace) || (mouseCoordsY >= ($this.height() / 2) + options.noScrollCenterSpace)) {
                        scrollerPosY = Math.cos((mouseCoordsY / $this.height()) * Math.PI) * (interval + options.acceleration);
                        $scroller.stop(true, true).animate({ top: "+=" + scrollerPosY }, interval, "linear");
                    } else {
                        $scroller.stop(true, true);
                    }
                }
            }
            //auto scrolling fn
            var autoScrollingCount = 0;
            function AutoScrolling() {
                $scroller.delay(options.autoScrollingDelay).animate({ left: -(totalWidth - $this.width()), top: -(totalHeight - $this.height()) }, options.autoScrollingSpeed, options.autoScrollingEasing, function () {
                    $scroller.animate({ left: 0, top: 0 }, options.autoScrollingSpeed, options.autoScrollingEasing, function () {
                        autoScrollingCount++;
                        if (options.autoScrolling > 1 && options.autoScrolling != autoScrollingCount) {
                            AutoScrolling();
                        }
                    });
                });
            }
            
			//click scrolling fn
            function ClickScrolling() {
                $scrollerPrevButton.hide();
                $scrollerNextButton.show();
				
				//next button
                $scrollerNextButton.click(function (e) { //next button
                    e.preventDefault();
                    var posX = $scroller.position().left;
                    var diffX = totalWidth + (posX - $this.width());
                    var posY = $scroller.position().top;
                    var diffY = totalHeight + (posY - $this.height());
                    $scrollerPrevButton.stop().show("fast");
                    if (options.scrollerOrientation == "horizontal") {
                        if (diffX >= $this.width()) {
                            $scroller.stop().animate({ left: "-=" + ($this.width()) }, options.scrollSpeed, options.scrollEasing, function () {
                                if (diffX == $this.width()) {
                                    $scrollerNextButton.stop().hide("fast");
                                }
                            });
                        } else {
                            $scrollerNextButton.stop().hide("fast");
                            $scroller.stop().animate({ left: $this.width() - totalWidth }, options.scrollSpeed, options.scrollEasing);
                        }
                    } else {
                        if (diffY >= $this.height()) {
                            $scroller.stop().animate({ top: "-=" + $this.height() }, options.scrollSpeed, options.scrollEasing, function () {
                                if (diffY == $this.height()) {
                                    $scrollerNextButton.stop().hide("fast");
                                }
                            });
                        } else {
                            $scrollerNextButton.stop().hide("fast");
                            $scroller.stop().animate({ top: $this.height() - totalHeight }, options.scrollSpeed, options.scrollEasing);
                        }
                    }
                });
				
				//previous button
                $scrollerPrevButton.click(function (e) { //previous button
                    e.preventDefault();
                    var posX = $scroller.position().left;
                    var diffX = totalWidth + (posX - $this.width());
                    var posY = $scroller.position().top;
                    var diffY = totalHeight + (posY - $this.height());
                    $scrollerNextButton.stop().show("fast");
                    if (options.scrollerOrientation == "horizontal") {
                        if (posX + $this.width() <= 0) {
                            $scroller.stop().animate({ left: "+=" + $this.width() }, options.scrollSpeed, options.scrollEasing, function () {
                                if (posX + $this.width() == 0) {
                                    $scrollerPrevButton.stop().hide("fast");
                                }
                            });
                        } else {
                            $scrollerPrevButton.stop().hide("fast");
                            $scroller.stop().animate({ left: 0 }, options.scrollSpeed, options.scrollEasing);
                        }
                    } else {
                        if (posY + $this.height() <= 0) {
                            $scroller.stop().animate({ top: "+=" + $this.height() }, options.scrollSpeed, options.scrollEasing, function () {
                                if (posY + $this.height() == 0) {
                                    $scrollerPrevButton.stop().hide("fast");
                                }
                            });
                        } else {
                            $scrollerPrevButton.stop().hide("fast");
                            $scroller.stop().animate({ top: 0 }, options.scrollSpeed, options.scrollEasing);
                        }
                    }
                });
            }//end of click scrolling fn
			
			//swipe scrolling fn
			function SwipeScrolling() {
				var maxTime = 1000, // allow movement if < 1000 ms (1 sec)
    			maxDistance = 50,  // swipe movement of 50 pixels triggers the swipe
    			target = $scrollerContainer,
    			startX = 0,
    			startTime = 0,
    			touch = "ontouchend" in document,
    			startEvent = (touch) ? 'touchstart' : 'mousedown',
   				moveEvent = (touch) ? 'touchmove' : 'mousemove',
    			endEvent = (touch) ? 'touchend' : 'mouseup';
				
				target.bind(startEvent, function(e){// prevent image drag (Firefox)
					e.preventDefault();
					startTime = e.timeStamp;
					startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
    			}).bind(endEvent, function(e){
						startTime = 0;
						startX = 0;
					}).bind(moveEvent, function(e){
							e.preventDefault();
							var currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
							currentDistance = (startX === 0) ? 0 : Math.abs(currentX - startX),
							// allow if movement < 1 sec
							currentTime = e.timeStamp;
							if (startTime !== 0 && currentTime - startTime < maxTime && currentDistance > maxDistance) {
							if (currentX < startX) {
								// swipe left code here
								var posX = $scroller.position().left;
									var diffX = totalWidth + (posX - $this.width());
									var posY = $scroller.position().top;
									var diffY = totalHeight + (posY - $this.height());
									$scrollerPrevButton.stop().show("fast");
									if (options.scrollerOrientation == "horizontal") {
										if (diffX >= $this.width()) {
											$scroller.stop().animate({ left: "-=" + ($this.width()) }, options.scrollSpeed, options.scrollEasing, function () {
												if (diffX == $this.width()) {
													$scrollerNextButton.stop().hide("fast");
												}
											});
										} else {
											$scrollerNextButton.stop().hide("fast");
											$scroller.stop().animate({ left: $this.width() - totalWidth }, options.scrollSpeed, options.scrollEasing);
										}
									} else {
										if (diffY >= $this.height()) {
											$scroller.stop().animate({ top: "-=" + $this.height() }, options.scrollSpeed, options.scrollEasing, function () {
												if (diffY == $this.height()) {
													$scrollerNextButton.stop().hide("fast");
												}
											});
										} else {
											$scrollerNextButton.stop().hide("fast");
											$scroller.stop().animate({ top: $this.height() - totalHeight }, options.scrollSpeed, options.scrollEasing);
										}
									}
							}
							if (currentX > startX) {
								// swipe right code here
								var posX = $scroller.position().left;
									var diffX = totalWidth + (posX - $this.width());
									var posY = $scroller.position().top;
									var diffY = totalHeight + (posY - $this.height());
									$scrollerNextButton.stop().show("fast");
									if (options.scrollerOrientation == "horizontal") {
										if (posX + $this.width() <= 0) {
											$scroller.stop().animate({ left: "+=" + $this.width() }, options.scrollSpeed, options.scrollEasing, function () {
												if (posX + $this.width() == 0) {
													$scrollerPrevButton.stop().hide("fast");
												}
											});
										} else {
											$scrollerPrevButton.stop().hide("fast");
											$scroller.stop().animate({ left: 0 }, options.scrollSpeed, options.scrollEasing);
										}
									} else {
										if (posY + $this.height() <= 0) {
											$scroller.stop().animate({ top: "+=" + $this.height() }, options.scrollSpeed, options.scrollEasing, function () {
												if (posY + $this.height() == 0) {
													$scrollerPrevButton.stop().hide("fast");
												}
											});
										} else {
											$scrollerPrevButton.stop().hide("fast");
											$scroller.stop().animate({ top: 0 }, options.scrollSpeed, options.scrollEasing);
										}
									}
							}
							startTime = 0;
							startX = 0;
						}
    					});
            }//end of swipe scrolling fn
			
        });
    };
})(jQuery);
//global js functions
//find element Position
function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
    }
    return [curtop, curleft];
}