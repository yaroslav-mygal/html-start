jQuery(document).ready(function($) {

if(!Modernizr.touch) {
   myParaxify = paraxify('.paraxify', {
    speed: 0.5,
    boost: 0
 });
}

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

 $('.tabs-container').tabs();

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



});