var myObject = [{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'},{'Title':'Ali Elewa','Description':'Ay Kalam wa khalas','DateDay':'27','DateSuffix':'TH','DateMonth':'Feb'}]




$(document).ready(function () {
var $ind;


$('.fadeR').click(function(e){
	if( $ind < $('.KngineOfTheDay .box').length - 1 && !($('.KngineOfTheDay').is(':animated')) ){
		$ind++;
		$('.KngineOfTheDay').animate({
            left: (parseInt($('.KngineOfTheDay').css('left').replace('px', ''))-$('.KngineOfTheDay .box').outerWidth(true))
        }, 'slow', 'swing', function () {});
		}
		});	
			
$('.fadeL').click(function(e){
	if( $ind > 0 && !($('.KngineOfTheDay').is(':animated'))){
		$ind--;
		$('.KngineOfTheDay').animate({
            left: (parseInt($('.KngineOfTheDay').css('left').replace('px', ''))+$('.KngineOfTheDay .box').outerWidth(true))
        }, 'slow', 'swing', function () {});
		}
		});
		
		
var box = "<div class='box'><div class='KngineOfTheDayHead'><div class='KngineOfTheDayHeadTitle'>{TITLE}</div><div class='KngineOfTheDayHeadDate'><div class='num'>{DAY}</div><div class='mon'>{MONTH}</div><div class='sig'>{SUFFIX}</div></div></div><div class='KngineOfTheDayTxt'>{DESCRIPTION}</div></div>";
				
				
$(function () {
	
	if (myObject.length == 0) {
			   $('.KngineOfTheDayWrap').html("<p>No Entries Found</p>");
            }else{
            	for (var index = 0; index < myObject.length ; index++) {	
				$('.KngineOfTheDay').append(box.replace("{TITLE}", myObject[index].Title).replace("{DESCRIPTION}", myObject[index].Description).replace("{DAY}", myObject[index].DateDay).replace("{MONTH}", myObject[index].DateMonth).replace("{SUFFIX}", myObject[index].DateSuffix));
				}
			
				$ind = $('.KngineOfTheDay .box').length-1;
				$('.KngineOfTheDay').css('width' , ($('.KngineOfTheDay .box').length * $('.KngineOfTheDay .box').outerWidth(true)))
				var x = - $('.KngineOfTheDay').outerWidth(true) + ($('.KngineOfTheDay').parent().outerWidth(true) - 272) ;
				$('.KngineOfTheDay').animate({
            									left: x
        									}, 'slow', 'swing', function () {});
				$('.KngineOfTheDay').fadeIn();
				
          }
});

		
		
});