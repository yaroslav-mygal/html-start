jQuery(document).ready(function($) {

$(".stick-column").stick_in_parent();
$("#stick-btns").stick_in_parent({
  offset_top: 66,
  bottoming: false
});

$('#slick-slider').owlCarousel({
    loop:true,
    items:1,
    dots: false,
    autoplay: true,
    autoplayTimeout: 7000,
    nav: true
  });


 $('#slick-splash').owlCarousel({
    loop:true,
    items:1,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut'
  });


 $('.owl-home-carousel').owlCarousel({
    loop:true,
    dots: false,
    nav: true,
    
    responsive: {
      0: {
        items:1,
        center: true,
        autoHeight:true
      },
      481: {
        autoWidth:true
      }
    }
})
 
 var owlMacbook = $("#owl-tab-macbook");

 owlMacbook.owlCarousel({
    items:1,
    dots: false,
    autoplay: false,
    animateOut: 'fadeOut',
    loop: true,
    mouseDrag: false,
    touchDrag: false
  });

 var owlMobilePowerText = $("#owlMobilePowerText");

 owlMobilePowerText.owlCarousel({
    items:1,
    dots: false,
    autoplay: false,
    animateOut: 'fadeOut',
    loop:false,
    URLhashListener:true,
    mouseDrag: false,
    touchDrag: false
  });

  var scheduleTabOwl = $("#schedule-tab-owl");

 scheduleTabOwl.owlCarousel({
    items:1,
    dots: false,
    autoplay: false,
    animateOut: 'fadeOut',
    loop:false,
    URLhashListener:true,
    mouseDrag: false,
    touchDrag: false
  });

 var powerMobileSlider = $("#powerMobileSlider");

  powerMobileSlider.owlCarousel({
      items:1,
      dots: false,
      autoplay: false,
      URLhashListener:true,
      loop:false,
      animateOut: 'fadeOut'
    });

  $('.scale-image').on('mouseover', function(){
    var slideHash = $(this).attr('href');
    window.location.hash = slideHash;
  })


 $('.tabs-container').easytabs({
  tabs: 'ul.tabs > li',
  updateHash: false
 });

 $('#tabs-industries').easytabs({
  tabs: 'ul.tabs > li',
  updateHash: false
 });

 $('#tab-container').easytabs({
  tabs: 'ul.tabs > li'
 });

 var _cahngeBgAnimation = 600;
 $('.trigger-link-service').hover(
  function(){
    var bg = $(this).attr('data-bg');

    $("#section-services .bg-fill:not(.active)").css({'background-image':'url("'+bg+'")'}).fadeIn(_cahngeBgAnimation,
      function(){
        $("#section-services .bg-fill").toggleClass('active');
      }
    );

  },
  function(){

  }
)


var toggleMenu = $('#toggle-nav') ;
var fadeMenuSpeed = 600;

 $('#btn-toggle').on('click', function() { 	
 	
 	if(toggleMenu.data('menu-status')!='opened') {
 		toggleMenu.data('menu-status', 'opened');
 		toggleMenu.fadeIn(fadeMenuSpeed);
 	}
 	else {
 		toggleMenu.data('menu-status', '');
 		toggleMenu.fadeOut(fadeMenuSpeed);
 	}
 	
 	return false;

 })


 jQuery('body').on('click', function(e) {    
    var container = toggleMenu;
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        toggleMenu.fadeOut(fadeMenuSpeed);
    } 
  })

 $('.fancybox').fancybox({
    padding: 50,
    margin: 0
  });

 $('#slick-nav').slick({
    infinite: true,
    slidesToShow: 5,
    vertical: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    verticalSwiping: true,
    arrows: false,
    focusOnSelect: true,
    responsive: [{
       breakpoint: 1200,
       settings: {
        vertical: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false,
        focusOnSelect: true
      }
    }]
  });

  $('.trigger2tabs').on('click', function(e) {
  var elem = $(this);
  $('.trigger2tabs').removeClass('active');
  setTimeout( function(){
    elem.addClass('active');
  }, 300)
 });

$('.schedule-control-area .schedule-app-button.prev').on('click', function(e){
  scheduleTabOwl.trigger('prev.owl.carousel');
  owlMacbook.trigger('prev.owl.carousel');
  return false;
})
$('.schedule-control-area .schedule-app-button.next').on('click', function(e){
  scheduleTabOwl.trigger('next.owl.carousel');
  owlMacbook.trigger('next.owl.carousel');
  return false;
})

$('.power-area .powerOwlLink.prev').on('click', function(e){
  owlMobilePowerText.trigger('prev.owl.carousel');
  powerMobileSlider.trigger('prev.owl.carousel');
  return false;
})
$('.power-area .powerOwlLink.next').on('click', function(e){
  owlMobilePowerText.trigger('next.owl.carousel');
  powerMobileSlider.trigger('next.owl.carousel');
  return false;
})

 if(!Modernizr.touch) {
   myParaxify = paraxify('.paraxify', {
    speed: 0.5,
    boost: 0
 });
}

});