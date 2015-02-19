
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

// Handles the logic for transitioning images
function arrowClick(step){

	var MININDX = 2;
	var imgs = $(".rightArrow").siblings();
	var currentIndx = imgs.index(currentImage);

	var activeIndx = currentIndx + step;
	var nextIndx = currentIndx + 2 * step;


	// Avoid overflowing.

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


	// Push all hidden images to index - 2

	for (var i = 0 ; i < imgs.length ; i++){
		if (i >= MININDX && i != activeIndx){
			$(imgs[i]).css('z-index',-2);
		}
	}


	// Place background image and the fading image 
	// one behind the other.
	newImage.css('z-index',0);
	fadeImage.css('z-index',1);


	// Display the next image and fade the current one.
	newImage.removeClass("hiddenImage").show();
	fadeImage.fadeOut(400,function(){
		$(this).removeClass('fadeImage');
		$(this).addClass('hiddenImage');
	});


	// Update classes and the current Image
	newImage.addClass("nextImage");
	currentImage = $(imgs[activeIndx]);

}

// Bridging functions that pass in the step for arrowClick
function rightArrow () {
	arrowClick(1);
}

function leftArrow() {
	arrowClick(-1);
}

// Respond to click event by calling above functions.
$( ".rightArrow"  ).click(function() {
	rightArrow();
});

$( ".leftArrow"  ).click(function() {
	leftArrow();
});


// Populating the locations that will be used position indications
for (var a = 0 ; a < navChildren.length; a++){
	var tar = '.'.concat(navChildren[a].id);
	if ($(tar).length > 0){
		locations.push($(tar).offset());
	} 
}

// Trying to respond to resizing. Not sure if it makes a difference.
$(window).on('resize', function () {
	$(document).reload();
});

// Navbar resizing and position indication based on window position.
$(window).scroll(function(){

	var scrollTop = $(window).scrollTop();
	var current = locations[0];

	// Find which section we are on based on the windows
	// position relative to top of segments.
	for (var indx = 0 ; indx < locations.length ; indx ++){	
		$(navChildren[indx]).css('background','');
		if (locations[indx].top - 200 < scrollTop ){
			current = indx;
		}
	}

	// Highlight the current location on the navbar.
	$(navChildren[current]).css('background',topbarHighlight);

	// Modify 
	if (scrollTop > topBarHeight ){
		$('.topbar').height(70);		
	} 
	else{
		$('.topbar').height(topBarHeight);
	}

});

// Responding to navbar clicks.

$( ".topbar li"  ).click(function() {
	var tar = '.'.concat($(this).attr('id'));
	var location = $(tar);
	console.log(tar);
	if (location.length > 0){
        $('html,body').animate({
          scrollTop: location.offset().top - 100
        }, 1000);
	}
});


	

$( ".popup_bar i"  ).click(function() {
	$(".background_color").css("visibility","hidden");
	$(".popup").css("visibility","hidden");

	$(".popup").find(".popup_body").find('.svgImage').remove();
	$(".popup").find(".popup_body").find('.popup_text').empty();
});


$( ".popup_bar i"  ).click(function() {
	$(".background_color").css("visibility","hidden");
	$(".popup").css("visibility","hidden");
	$(".popup").find(".popup_body").find('.svgImage').remove();
	$(".popup").find(".popup_body").find('.popup_text').empty();


});


// Functions related to modal.

$(".svgImage").click(function(){
	var diag = $(this).siblings()[0];
	var pop = $(".popup");
	var img = $(this).clone();
	var bod = pop.find(".popup_body");
	var txt = bod.find('.popup_text');

	$(".background_color").css("visibility","visible");

	console.log([img.height(),img.width()])
	pop.css("visibility","visible");
	pop.height(($(window).height()/2) + 100);
	pop.width(($(window).height()/2) + 500);
	bod.append(img);
	img.css("margin-top","-40px")
	txt.html(diag.innerHTML);

	console.log(diag.innerHTML);
});





