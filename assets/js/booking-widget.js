$(function() {
  var body = $('body');
  var sidebar = $('.ttweb-booking-widget');
  var closeButton = $('.ttweb-booking-widget__header__close');
  var showButtons = $('a[show-booking-widget]');
  var isselect=true;

  
  // Show booking sidebar events
  $.each(showButtons, function(i, item) {
    $(item).on('click', function(e) {
      e.preventDefault();
      if (!sidebar.hasClass('show')) {
        body.addClass('overflow');
        sidebar.addClass('show');
      }
    });
  });

  // Close sidebar event
  closeButton.on('click', function() {
    body.removeClass('overflow');
    sidebar.removeClass('show');
  });

  // View Special Rates
  var specialRates = $('.ttweb-booking-widget__body__specials');
  var specialRatesTitle = specialRates.find('.ttweb-booking-widget__body__specials__title');
  var specialRatesContent = specialRates.find('.ttweb-booking-widget__body__specials__rates');

  specialRatesTitle.on('click', function() {

    $(this).toggleClass('show');
    $(".ttweb-booking-widget__body__specials__title__icon--up").toggle();
    $(".ttweb-booking-widget__body__specials__title__icon--down").toggle();
    
    specialRatesContent.stop().slideToggle(400);
  });

  $("input[name='rate_code']").on("click", function(){
      var inputBoxId = $(this).val();
      $(".special_rate_input").css("display","none");
      $(".special_rate_input").prop("disabled", true);
      $("#"+inputBoxId).css("display","block");
      $("#"+inputBoxId).prop("disabled", false);
  });
});

$(document).ready(function(){

    	// Datepicker

    var new_date = new Date();
    var date_format = 'mm/dd/yy';
	var defaultformatteddate1 = $.datepicker.formatDate(date_format, new_date);
	var defaultformatteddate2 = $.datepicker.formatDate(date_format, new Date(new_date.setDate(new_date.getDate() + 1)));

    var arrival_input = $("#arrival_input");
    var departure_input = $("#departure_input");

    arrival_input.text(defaultformatteddate1);
	departure_input.text(defaultformatteddate2);




  $.datepicker._defaults.dateFormat = date_format;

  $(".date-widget").datepicker({
    minDate: 0,
    numberOfMonths: [1,1],
    //changeMonth: true,

    beforeShowDay: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, arrival_input.text());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, departure_input.text());
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
    },

    beforeShowMonth: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, arrival_input.text());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, departure_input.text());
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(dateText, inst) {
      $(".booking-widget_calendar_error-text").css("display", "none");
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, arrival_input.text());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, departure_input.text());
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);


      var reztripFormattedDate = $.datepicker.formatDate(date_format, selectedDate);


       if (!date1 || date2) {
         arrival_input.text(dateText);
         $("#arrival_dates").val(reztripFormattedDate);

         $("#departure_dates").val("");
         departure_input.text("");

         $("#departure_dates").trigger("input");
         $("#arrival_dates").trigger("input");

         $(".booking-widget-calendar-wrap li").removeClass('active');
         $(".booking-widget-calendar-wrap li:first-child").addClass('active');

         $(this).datepicker();
     } else if( selectedDate.getTime() < date1.getTime() ) {

         $("#arrival_dates").val(arrival_input.text());
         $("#departure_dates").val($.datepicker.formatDate(date_format, date1));

         arrival_input.text(dateText );
         $("#arrival_dates").val(reztripFormattedDate);

         $("#arrival_dates").trigger("input");
         $("#departure_dates").trigger("input");

         $(".booking-widget-calendar-wrap li").removeClass('active');
         $(".booking-widget-calendar-wrap li:nth-child(2)").addClass('active');
         $(this).datepicker();
       } else if( selectedDate.getTime() != date1.getTime() ){
         departure_input.text(dateText);
         $("#departure_dates").val(reztripFormattedDate);

         $("#departure_dates").trigger("input");
         $("#arrival_dates").trigger("input");

         $(".booking-widget-calendar-wrap li").removeClass('active');
         $(".booking-widget-calendar-wrap li:nth-child(2)").addClass('active');
         $(this).datepicker();
       }



      	var minDate = $(this).datepicker('getDate');
	    minDate.setDate(minDate.getDate()+1);
	    $(this).datepicker('option','defaultDate',minDate);
	    var newMin = $(this).datepicker('option','defaultDate');
	    var formattedDatee = $.datepicker.formatDate(date_format, newMin);

    }
  });

  $("#booking-form").on("submit", function(){
      if($("#departure_input").val() == ''){
          $(".booking-widget_calendar_error-text").css("display", "block");
          return false;

      }
  });

});