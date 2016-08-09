jQuery(document).ready(function($) {

  // company slider

  $('#slider-company').slick({
    draggable: true,
    adaptiveHeight: true,
    dots: false,
    vertical: true,
    mobileFirst: true,
    arrows: true
  })

  // mobile navigation

  $("#mmenu").mmenu(  {
      offCanvas: {
       position  : "right"
      }
    },
    {
      clone: true
  });


	var num_elem = $('#slider .slide').size();
	$('.home-slide-nav .slides-num .all').text(num_elem);

	var time = 7;
  var $bar,
      $slick,
      isPause,
      tick,
      percentTime;
  
  $slick = $('#slider');

  $slick.slick({
    draggable: true,
    adaptiveHeight: false,
    dots: false,
    mobileFirst: true,
    arrows: false
  }).on('afterChange', function(event, slick, currentSlide){
    	var currSlide = currentSlide+1;
    	$('.home-slide-nav .slides-num .current').text(currSlide);
  	});  

  $('.home-slide-nav .slide-prev').click(function(){  	
	  $slick.slick('slickPrev');
	  startProgressbar();
	})

	$('.home-slide-nav .slide-next').click(function(){
		$slick.slick('slickNext');
		startProgressbar();
	})
  
  $bar = $('.slider-progress .progress');
  
  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    isPause = false;
    tick = setInterval(interval, 10);
  }
  
  function interval() {
    if(isPause === false) {
      percentTime += 1 / (time+0.1);
      $bar.css({
        width: percentTime+"%"
      });
      if(percentTime >= 100)
        {
          $slick.slick('slickNext');
          startProgressbar();
        }
    }
  }
  
  
  function resetProgressbar() {
    $bar.css({
     width: 0+'%' 
    });
    clearTimeout(tick);
  }
  
  startProgressbar();

});