;(function($) {	
	
	var defaults = {
		infinite: true,
		index: 1,
		showSlides: 1,
		slidesToScroll: 1,
		arrows: true,
		swipeAble: true,
		pagination: true,
		autoplay: true,
		autoplaySpeed: true
	};	

	$.fn.slider = function(options) {
		
		var config = $.extend({}, defaults, options);
		
		var jfirst = this.first();

		jfirst.init = function(){
			
			//accessing all needed DOM elements (making jquery obj)
		  var $slider = $(this),
		  		$sliderItems = $(this.children()),
		  		$sliderFirstItem = $(this.children()[0]),
		  		$sliderNav = $(this.children()[this.children().length-1]),
		  		$sliderNavLeft = $(this.children()[this.children().length-1].children[0]),
		  		$sliderNavRight = $(this.children()[this.children().length-1].children[this.children.length-1]);
		  		
		  //getting all variables that need (15 is __item.css(margin-right))
		  var	slidesToScroll = config.slidesToScroll,
		  		step = ($sliderFirstItem.width() + 15)*slidesToScroll,
		  		showSlides = config.showSlides,
		  		timesScrolled = 0,
		  		itemPosition = 0; 
		  	 
		  $slider.css("max-width", ($sliderFirstItem.width() + 15)*showSlides);
		  $sliderNavLeft.hide();
		  if (config.arrows === false){
		  	$sliderNav.hide();
		  };
		 
		  if (showSlides === $sliderItems.length){
		  	$sliderNavLeft.hide();
		  	$sliderNavRight.hide();
		  };

		  var slideNext = function() {
		  	if (itemPosition <= -($sliderItems.length - 1 - showSlides)*$sliderFirstItem.width()){
				  itemPosition = 0;
				  timesScrolled = 0;
				  $sliderFirstItem.css("margin-left", itemPosition + "px");
		  	}else{
		  		timesScrolled += slidesToScroll;
		  		itemPosition -= step;
		  		$sliderFirstItem.css("margin-left", itemPosition + "px");
		  		$sliderNavLeft.show();
		  		$sliderNav.css("flex-direction", "row");
		  		if (config.infinite === false && timesScrolled >= $sliderItems.length - 1 - showSlides){
		  			$sliderNavRight.hide();
		  			clearInterval(autoplay);
		  		};
		  	};
		  };

		  var slidePrev = function() {
		  	if (itemPosition >= 0){
			  	itemPosition = -($sliderItems.length - 1 - showSlides)*($sliderFirstItem.width() + 10);
		  		$sliderFirstItem.css("margin-left", itemPosition + "px");
		  	}else{
		  		timesScrolled -= slidesToScroll;
		  		itemPosition += step;
		  		$sliderFirstItem.css("margin-left", itemPosition + "px");
		  		$sliderNavRight.show();
		  		if (config.infinite === false && timesScrolled <= 0){
		  			$sliderNavLeft.hide();
		  			$sliderNav.css("flex-direction", "row-reverse");
		  		};
		  	};
		  };

		  if (config.autoplay){
		  	var sliderSpeed = 2000;
			  var autoplay = setInterval(function() {	
			  	slideNext();
			  },sliderSpeed);
		  	
		  	//mouseLeave
		  	$slider.mouseleave(function(e){
		  		autoplay = setInterval(function() {	
			  		slideNext();
			 		},sliderSpeed);
		  	});
		  	//mouseEnter
		  	$slider.mouseenter(function(e){
		  		clearInterval(autoplay);
		  	});
		  };

		  $sliderNavLeft.click(function(e){
		  	slidePrev();
		  });
		  $sliderNavRight.click(function(e){	
		  	slideNext();
		  });
		};

		jfirst.init();	

	};

})(jQuery);
