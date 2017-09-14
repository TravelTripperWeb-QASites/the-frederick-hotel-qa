/*
   jQuery plugin settings and other scriptds
   ========================================================================== */ 
$(document).ready(function(){

    $(".special-item").hover(function(){
      $(this).find(".overlay").slideDown(100);
      $(this).find(".offer-bottom").addClass("active");
    }, function(){
      $(this).find(".overlay").slideUp(100);
      $(this).find(".offer-bottom").removeClass("active");
    }); 
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
     //main nav scroll resize
  function changeHeader(){
    if($( window ).width() > 991){
    if($(window).scrollTop() > 200) {
      $(".navbar").addClass("shrink-nav"); 
       $(".navbar").css({'top':'0px','opacity':'1'}); 
       $('body').css('margin-top','115px');
    }
    else {
      $(".navbar").removeClass("shrink-nav");
      $('body').css('margin-top','');
    }
    }
  }   
   $(window).on("load resize scroll",function(e){
    changeHeader();
   });
  //end main nav scroll resize 
    // global variables for widget
   if($("#typetext").length){ 
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
    }  


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


//gallery filter
 
$(".filter").on("click", function () {
         var $this = $(this);
         // if we click the active tab, do nothing
         if (!$this.hasClass("active")) {
           $(".filter").removeClass("active");
           $this.addClass("active"); // set the active tab
           var $filter = $this.data("rel"); // get the data-rel value from selected tab and set as filter
           $filter == 'all' ? // if we select "view all", return to initial settings and show all
             $(".fancybox").attr("data-fancybox-group", "gallery").not(":visible").fadeIn()
             : // otherwise
             $(".fancybox").fadeOut(0).filter(function () {
               return $(this).data("filter") == $filter; // set data-filter value as the data-rel value of selected tab
             }).attr("data-fancybox-group", $filter).fadeIn(1000); // set data-fancybox-group and show filtered elements
         } // if
       }); // on

          $('#lightgallery').lightGallery({
           selector: '.item',
           counter: false,
           thumbnail: false
         });


/*Date picket js*/

      // $("#input_8").datepicker();
      // $("#input_9").datepicker();

      $("#input_8").datepicker({
        dateFormat: "yy-mm-dd",
  altField  : '#input_8',
  altFormat : 'yy-mm-dd',
        minDate: 0,
        onSelect: function (date) {
            var date2 = $('#input_8').datepicker('getDate');
            date2.setDate(date2.getDate() + 1);
            $('#input_9').datepicker('setDate', date2);
            //sets minDate to dt1 date + 1
            $('#input_9').datepicker('option', 'minDate', date2);
        }
    });
    $('#input_9').datepicker({
        dateFormat: "yy-mm-dd",
  altField  : '#input_9',
  altFormat : 'yy-mm-dd',
        onClose: function () {
            var dt1 = $('#input_8').datepicker('getDate');
            console.log(dt1);
            var dt2 = $('#input_9').datepicker('getDate');
            if (dt2 <= dt1) {
                var minDate = $('#input_9').datepicker('option', 'minDate');
                $('#input_9').datepicker('setDate', minDate);
            }
        }
    });
  
 /*Date picket js end*/

  //plus minus
  $(".incr-btn").on("click", function (e) {
    var $button = $(this);
    var oldValue = $button.parent().find('.quantity').val();
    $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
    if ($button.data('action') == "increase") {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        // Don't allow decrementing below 1
        if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 1;
            $button.addClass('inactive');
        }
    }
    $button.parent().find('.quantity').val(newVal);
    e.preventDefault();
  });
}); 
//end ready