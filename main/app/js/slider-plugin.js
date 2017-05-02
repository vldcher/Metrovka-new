;(function($) {	
	
	var defaults = {
			infinite: true,
			index: 0,
			bgColorIndex: 'white', //bad practicies -_-
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
		  		$sliderIndex = $(this.children()[this.children().length-2]),
		  		$sliderNav = $(this.children()[this.children().length-1]),
		  		$sliderNavLeft = $(this.children()[this.children().length-1].children[0]),
		  		$sliderNavRight = $(this.children()[this.children().length-1].children[this.children.length-1]);
		  		
		  //getting all variables that need 
		  var	slidesToScroll = config.slidesToScroll,
		  		sliderItemMarginRight = +$sliderFirstItem.css("margin-right").slice(0,-2),
		  		step = ($sliderFirstItem.width() + sliderItemMarginRight)*slidesToScroll,
		  		showSlides = config.showSlides,
		  		timesScrolled = 0,
		  		bgColorIndex = config.bgColorIndex,
		  		sliderTransition = $sliderFirstItem.css("transition"),
		  		itemPosition = 0; 
		   
		  $slider.css("max-width", ($sliderFirstItem.width() + sliderItemMarginRight)*showSlides-sliderItemMarginRight);
		  $sliderNavLeft.hide();
		  
		  if (config.arrows === false){
		  	$sliderNav.hide();
		  };
		 
		  if (showSlides === $sliderItems.length-1){
		  	$sliderNavLeft.hide();
		  	$sliderNavRight.hide();
		  };

		  //index positioning at the init
		  itemPosition = -config.index*step; 
		  timesScrolled = config.index;
		  $sliderFirstItem.css("margin-left", itemPosition + "px");
		  for (var i = 0; i < $sliderItems.length - 2; i++) {
		  		if (i === timesScrolled){
		  			$($sliderIndex.children()[i]).css('background-color',bgColorIndex);
		  		}else{	
		 				$($sliderIndex.children()[i]).css('background-color','white');
		 			};
		 	};
		 			
		  var slideNext = function() {
		  	if (itemPosition <= -($sliderItems.length - 2 - showSlides)*$sliderFirstItem.width()){
				  itemPosition = 0;
				  timesScrolled = 0;
				  $sliderFirstItem.css("margin-left", itemPosition + "px");
		  	}else{
		  		timesScrolled += slidesToScroll;
		  		itemPosition -= step;
		  		$sliderFirstItem.css("margin-left", itemPosition + "px");
		  		$sliderNavLeft.show();
		  		$sliderNav.css("flex-direction", "row");
		  		
		  		if (config.infinite === false && timesScrolled >= $sliderItems.length - 2 - showSlides){
		  			$sliderNavRight.hide();
		  			clearInterval(autoplay);
		  		};
		  	};
		  	for (var i = 0; i < $sliderItems.length - 2; i++) {
		  		if (i === timesScrolled){
		  			$($sliderIndex.children()[i]).css('background-color',bgColorIndex);
		  		}else{	
		 				$($sliderIndex.children()[i]).css('background-color','white');
		 			};
	  		};
		  };

		  var slidePrev = function() {
		  	if (itemPosition >= 0){
			  	itemPosition = -($sliderItems.length - 2 - showSlides)*($sliderFirstItem.width() + sliderItemMarginRight);
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
		  	for (var i = 0; i < $sliderItems.length - 2; i++) {
		  		if (i === timesScrolled){
		  			$($sliderIndex.children()[i]).css('background-color',bgColorIndex);
		  		}else{	
		 				$($sliderIndex.children()[i]).css('background-color','white');
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
		  
		  for (var i = 0; i < $sliderItems.length - 2; i++) {
		  	var startingX;
		  	var change;
		  	$($sliderItems[i]).on("touchstart", function(e){
		  		startingX = e.touches[0].clientX;
		  		clearInterval(autoplay);
		  		console.log(startingX);
		  	});
		  	$($sliderItems[i]).on("touchmove", function(e){
		  		var touch = e.touches[0];
		  		change = startingX - touch.clientX;
		  		console.log(change);
		  		$sliderFirstItem.css("transition", "none");
		  		$sliderFirstItem.css("margin-left", itemPosition - change + "px");
		  	});
		  	$($sliderItems[i]).on("touchend", function(e){
		  		$sliderFirstItem.css("transition", sliderTransition);
			  	if (change >= 0) {	
			  		if (change%(step/slidesToScroll) >= (step/slidesToScroll)*0.5){
			  			$sliderFirstItem.css("margin-left", itemPosition - change - (step/slidesToScroll) + change%(step/slidesToScroll) + "px");
			  			itemPosition = itemPosition - change - (step/slidesToScroll) + change%(step/slidesToScroll);
			  		}else if (change%(step/slidesToScroll) <= (step/slidesToScroll)*0.5){
			  			$sliderFirstItem.css("margin-left", itemPosition - change + change%(step/slidesToScroll) + "px");
			  			itemPosition = itemPosition - change + change%(step/slidesToScroll);
			  		};
		  		} else if (change < 0){
		  			if ((-change)%(step/slidesToScroll) >= (step/slidesToScroll)*0.5){
			  			$sliderFirstItem.css("margin-left", itemPosition - change + (step/slidesToScroll) - (-change)%(step/slidesToScroll) + "px");
			  			itemPosition = itemPosition - change + (step/slidesToScroll) - (-change)%(step/slidesToScroll); 
			  		}else if ((-change)%(step/slidesToScroll) <= (step/slidesToScroll)*0.5){
			  			$sliderFirstItem.css("margin-left", itemPosition - change - (-change)%(step/slidesToScroll) + "px");
			  			itemPosition = itemPosition - change - (-change)%(step/slidesToScroll);
			  		};
		  		};
		  		
		  	});
		  };
		
		};

		jfirst.init();	

	};

})(jQuery);
