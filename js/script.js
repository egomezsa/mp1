
// Global variables used to access important DOM elements.
var currentImage = $(".startImage")[0];
var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd transitionend';
var topBar = $('.topbar')
var topBarHeight = topBar.height();  
var wrap = $('.wrap');
var navChildren = $('.topbar ul').children();
var locations = [];
var topbarColor = '-webkit-linear-gradient(#AAAAAA, #999999) -o-linear-gradient(#AAAAAA, #999999) -moz-linear-gradient(#AAAAAA, #999999) linear-gradient(#AAAAAA, #999999)';
var topbarHighlight = '#BABABA';

// Functions used to trigger events
function highlightThis(){
	var a=this.style.backgroundColor;
	this.style.backgroundColor="yellow",
	alert(this.className),
	this.style.backgroundColor=a
}

function navbarClick () {
	// body...
	alert(this.innerHTML)
	event.stopPropagation()
}

function arrowClick(step){

	var MININDX = 2;
	var imgs = $(".rightArrow").siblings();
	var currentIndx = imgs.index(currentImage);

	var activeIndx = currentIndx + step;
	var nextIndx = currentIndx + 2 * step;

	if (activeIndx < MININDX - 1){
		activeIndx = imgs.length - 1;
	}

	if (activeIndx > imgs.length -1){
		activeIndx = MININDX - 1;
	}

	if (nextIndx < MININDX - 1){
		nextIndx = imgs.length - 1;
	}

	if (nextIndx > imgs.length -1){
		nextIndx = MININDX - 1;
	}


	if (imgs[activeIndx].className.indexOf("leftArrow") > -1){
		activeIndx = (activeIndx + step) % imgs.length;
	}

	var fadeImage = $(imgs[currentIndx]);
	var newImage  = $(imgs[activeIndx]);

	for (var i = 0 ; i < imgs.length ; i++){
		if (i >= MININDX && i != activeIndx){
			$(imgs[i]).css('z-index',-2);
		}
	}

	newImage.css('z-index',0);
	fadeImage.css('z-index',1);

	newImage.removeClass("hiddenImage").show();

	fadeImage.fadeOut(400,function(){
		$(this).removeClass('fadeImage');
		$(this).addClass('hiddenImage');
	});

	newImage.addClass("nextImage");

	currentImage = $(imgs[activeIndx]);

}

function rightArrow () {
	arrowClick(1);
}

function leftArrow() {
	arrowClick(-1);
}


// Populating the locations that will be used position indications
for (var a = 0 ; a < navChildren.length; a++){
	var tar = '.'.concat(navChildren[a].id);
	if ($(tar).length > 0){
		locations.push($(tar).offset());
	} 
}

// Navbar resizing and position indication.
$(window).scroll(function(){
	// console.log($('.topbar').height());
	var scrollTop = $(window).scrollTop();
	var current = locations[0];

	for (var indx = 0 ; indx < locations.length ; indx ++){
		
		$(navChildren[indx]).css('background','');
		if (locations[indx].top - 200 < scrollTop ){
			current = indx;

		}
	}

	$(navChildren[current]).css('background',topbarHighlight);

	if (scrollTop > topBarHeight ){
		$('.topbar').height(70);		
	} 
	else{
		$('.topbar').height(topBarHeight);
	}

});

$( ".popup_bar i"  ).click(function() {
	$(".background_color").css("visibility","hidden");
	$(".popup").css("visibility","hidden");

	$(".popup").find(".popup_body").find('.svgImage').remove();
	$(".popup").find(".popup_body").find('.popup_text').empty();
});

$(window).on('resize', function () {
// your code here
	$(document).reload();
});





