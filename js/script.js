var currentImage = $(".startImage")[0];
var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd transitionend';
var topBar = $('.topbar')
var topBarHeight = topBar.height();  
var wrap = $('.wrap');
var location_slider = $('.sliderWindow').offset();

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

	newImage.css('z-index',-1);
	fadeImage.css('z-index',0);

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

$(window).scroll(function(){
	// console.log($('.topbar').height());
	var scrollTop = $(window).scrollTop();
	if (scrollTop > topBarHeight ){
		$('.topbar').height(50);		
	} 
	else{
		$('.topbar').height(topBarHeight);
	}

});

