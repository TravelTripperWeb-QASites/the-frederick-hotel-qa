/*
   jQuery plugin settings and other scriptds
   ========================================================================== */ 
$(document).ready(function(){

  // FitVids init
  $("#main").fitVids();

  // init smooth scroll
  $("a").smoothScroll({offset: -20});


  //hero auto image widnow height
    function setHeight() {
      windowHeight = $(window).innerHeight();
      $('.hero-slider .carousel-item, .hero-slider .carousel-inner').css('min-height', windowHeight - 113);
    }
    setHeight();
    
    $(window).resize(function() {
      setHeight();
    }); 
      
   $('.homeintro').fadeIn('slow');
   $('.close-icon').click(function(){
     $('.homeintro').fadeOut('slow');
   });
     
    // global variables for widget
    var text =  $("#typetext").attr('data-content'), t = [];
    $p = $("#typetext");
     var speed = 150;
    // main 'typer' function.
      function type (text) { 
      $.each(text.split(''), function(i, letter){
         setTimeout(function(){
        t.push(setTimeout ( function () {
          if ( letter[0] === "^") {
            $p.append("<br>");
          } else {
            $p.append(letter[0]);
          }
          if ( !letter.slice(1) ) {
            return 1;
          } else {
            type(letter.slice(1));
          }
        },20)); 
      }, speed*i); 
        });
        
      }
    setTimeout ( function () {
      type(text);
    },2000); 
       
    AOS.init({
      offset: 60,
      duration: 900,
      easing: 'ease-in-sine',
      delay: 100,
    }); 
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top + 160;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
   
    $(window).on('scroll', function(){
        $('.banner-title').each(function () {  
            if (isScrolledIntoView(this) === true) {  
                $(this).find('u').addClass('active') 
            }
              
       });
    });
  
}); 

function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('mapDiv'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }


//end ready

//
