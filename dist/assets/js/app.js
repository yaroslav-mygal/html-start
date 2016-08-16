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

  $('#slider-company').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('#team li').removeClass('active');
    $('#team li:eq('+nextSlide+')').addClass('active');
  }); 

  $('[data-team-slide]').on('click', function(){
    var elem = $(this);
    $('#team li ').removeClass('active');
    elem.closest('li').addClass('active');
    var _slide = elem.attr('data-team-slide');
    $("#slider-company").slick( "slickGoTo", _slide);
    Waypoint.refreshAll();
    return false;
  })

  $('select.selectTabs').on('change', function(e) {
    var _tab = $(this).val();
    $('a[href="'+_tab+'"]').tab('show');
  });

  $('.mob-slide-triggger').on('click', function(){
    var _el = $(this);
    _el.toggleClass('opened');
    _el.next('.slide-block').toggleClass('open');
  })

  $('#trigger-contact').on('change', function(){
    $('#sub-form').show();
  })

  // found slider

  $('#slide-found').slick({
    draggable: true,
    adaptiveHeight: true,
    dots: false,
    mobileFirst: true,
    arrows: true
  })

  // news slider

  $('#slick-vertical-slider').slick({
    draggable: true,
    adaptiveHeight: true,
    dots: false,    
    mobileFirst: true,
    arrows: true,
    responsive: [
      {breakpoint: 992,
            settings : {
              vertical: true
            }}
    ]
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

   // timeline

 
  var timeline = $('#timeline');
  if(timeline.size()>0) {
    var timelineTempHeight = 0;

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      Waypoint.refreshAll();
    })


    $(window).on('scroll', function(){
      var timelineOffset = timeline.offset().top;
      var tempOffset = timelineOffset-$(window).height()*0.75;
      var tempHeight = $(window).scrollTop() - tempOffset;
      if($(window).scrollTop() > tempOffset&&$('#timeline-scroll').height()<tempHeight) {
        $('#timeline-scroll').height(tempHeight);
      }

    })


    $('.history-box').waypoint(function(direction) {
      $(this.element).addClass('active');
    }, {
      offset: '80%'
    })
  }
  

  // stick bar

    jQuery('a.scrollTo').on('click',function(){
        _top=jQuery(jQuery(this).attr('href')).offset().top;
        jQuery("html, body").animate({ scrollTop: _top });
        return false;
    })

   $('#sticky-bar').waypoint(function(direction) {
    if (direction == 'down') {
      $('body').addClass('active-sticky-bar');
    }
    else {
      $('body').removeClass('active-sticky-bar');
    }
    }, {
      offset: '0'
    })

   if($('.scroll-section').size()>0) {
      $('.scroll-section').waypoint(function(direction) {

        var navItem = $(this.element).attr('id');
        var currentMenuText = $('#waypoints-nav a[href="#'+navItem+'"]').text();
        $('#waypoints-nav li').closest('li').removeClass('active');
        $('#waypoints-nav a[href="#'+navItem+'"]').closest('li').addClass('active');
        $('.top-menu>.current-slide').text(currentMenuText);

      }, {
        offset: '20%'
      })
   }


});