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
      $('.fullscreen-wrapper').css('min-height', windowHeight - 26);
    }
    setHeight();
    
    $(window).resize(function() {
      setHeight();
    });

});
