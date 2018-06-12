jQuery(document).ready(function($) {
	$('#slider-1').slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
  	autoplaySpeed: 2000,
    dots: false,
    swipe:false,
    arrows: true,
    draggable: false,
    infinite: true,
    mobileFirst: true,
    responsive: [
    {
     		breakpoint: 767,
     		settings: {
     			 slidesToShow: 3
     		}
    },
    {
     		breakpoint: 991,
     		settings: {
     			 slidesToShow: 3
     		}
     },
     {
     		breakpoint: 1200,
     		settings: {
     			 slidesToShow: 4
     		}
     }
    ]
	});
	$('.accordion-item .accordion-item__head').on('click', function(e){
		$(this).closest('.accordion-item').toggleClass('open');
		e.preventDefault();
	})

	$('form.validate').validate();

    $("#phone, .phone-field, .enterphone input").mask("(999) 999-9999");

});
// get current year
;(function() {
  var now = new Date();
  var year = now.getUTCFullYear();
  var yearHolder = document.getElementById('currentYear');
  yearHolder.innerText = year;
})()

// scroll
;(function() {
window.addEventListener('scroll', function(e) {
  var header = document.getElementById('sticky-header');
  var last_known_scroll_position = window.scrollY;

  if(last_known_scroll_position>0){
    header.classList.add('sticky');
  }
  else {
    header.classList.remove('sticky');
  }
  
});
})()