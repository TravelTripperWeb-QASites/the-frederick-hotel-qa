//google map filter based on category
//developed by Traveltripper

// mapstyler
var mapstyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c8d2d3"
            },
            {
                "lightness": 17
            }
        ]
    }
]; 


// category based map
var gmarkers1 = [];
var markers1 = []; 

// Our markers
markers1 = [
  //hint ['serial id','title', lat,long, 'category','Marker label','map direction link' ]
    ['0', 'THE FREDERICK HOTEL <br/>95 West Broadway, <br/> New York, NY 10007', 29.961781, -90.065895, 'hotel', '1','#'],  //property marker which can't be hidden on filter
    ['1', 'Louis Armstrong Park', 29.962761, -90.067763, 'hotels', '1',''],
    ['2', 'Bourbon Street ', 29.959248, -90.065091, 'hotels', '2',''],
    ['3', 'Jackson Square', 29.957444, -90.062935, 'restaurants', '1',''],
    ['4', 'Original French Market ', 29.959283, -90.060688, 'shops','3', ''],
    ['5', 'Esplanade Ave. Wharf ', 29.960339, -90.056938, 'attractions', '5',''],
    ['6', 'Coop\'s Place ', 29.960159, -90.059867, 'transport','1','']
];

/**
 * Function to init map
 */

function initialize() {
    var center = new google.maps.LatLng(29.961781, -90.065895);
    var mapOptions = {
        zoom: 16,
        center: center,
        styles: mapstyle, 
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    

   if(document.getElementById('map-canvas')){
   	   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
   	   for (i = 0; i < markers1.length; i++) { 
   	   		addMarker(markers1[i]); 
   	       
   	   }
       if($('.mapview').attr('data-mapfor') =='attractions'){
         filterMarkers('attractions'); 
       }else{
         filterMarkers('hotels');
       }
   	    // to load default category markers , remove this function if want to load all  
       google.maps.event.trigger(gmarkers1[0], 'click'); 
   }
   

}
  
/**
 * Function to add marker to map
 */

function addMarker(marker) {
    var category = marker[4];
    var title = marker[1];
    var pos = new google.maps.LatLng(marker[2], marker[3]);
    var content = marker[1]; 
    var icon = '/assets/images/marker.png';
    marker1 = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        icon: (category =='hotel') ? '/assets/images/marker-active.png' : icon
    }),
    boxText = document.createElement("div"),
    myOptions = {
                 content: boxText,
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(20, -30),
                zIndex: null, 
                closeBoxMargin: "12px 14px 2px 2px",
                closeBoxURL: "/assets/images/close_white_12x12.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };
    gmarkers1.push(marker1);
    boxText.innerHTML ='<p>' +marker[1] + ' </p><a href="'+marker[6]+'" class="btn-direction" title="Get Directions" target="_blank">Get Directions</a></strong>';
    var ib = new InfoBox(myOptions);
    // Marker click listener
    google.maps.event.addListener(marker1, 'click', (function (marker1, content) { 
        return function () {   
            for (var i = 0; i < gmarkers1.length; i++) {
                gmarkers1[i].setIcon('/assets/images/marker.png');
             }
            $(".infoBox").fadeOut(300);
            map.panTo(this.getPosition());
            map.setZoom(15);
            ib.open(map, this);
            this.setIcon('/assets/images/marker-active.png');
        };
    })(marker1, content));
}


       
/**
 * Function to filter markers by category
 */

filterMarkers = function (category) { 
      
      
    for (i = 0; i < markers1.length; i++) {
        marker = gmarkers1[i];
        // If is same category or category not picked
        if (marker.category == category || category.length === 0 || marker.category =='hotel') {
            marker.setVisible(true); 
        }
        // Categories don't match 
        else {
            marker.setVisible(false);
        }
    } 
};
$('.map-nav a').click(function(){
    $('.map-nav a').removeClass('active');
   $(this).addClass('active');
});
// Init map
initialize();
