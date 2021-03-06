//google map filter based on category
//developed by Traveltripper

// mapstyler
var mapstyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2efea"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ecf5fc"
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
    ['0', 'THE FREDERICK HOTEL <br/>95 West Broadway, <br/> New York, NY 10007', 40.715475, -74.008909, 'hotel', '1','https://goo.gl/maps/xPhho9uYHnD2'],  //property marker which can't be hidden on filter
    ['1', 'National September 11 Memorial & Museum, 180 Greenwich St,<br/> New York, NY 10007', 40.711415, -74.012479, 'attractions', '1',''],
    ['2', 'HOTEL CHANDLER, <br /> 12 E 31st St,<br /> New York, NY 10016, USA ', 40.745934, -73.985187, 'hotels', '2','https://goo.gl/maps/9PVDjN4sAZx'],
    ['3', 'Jackson Square', 29.957444, -90.062935, 'restaurants', '1',''],
    ['4', 'Original French Market ', 29.959283, -90.060688, 'shops','3', ''], 
    ['6', 'Grand Central Station ', 40.752726, -73.977229, 'transport','1','https://goo.gl/maps/nZBLhVsZCqL2'],
    ['7', 'WALL STREET STOCK EXCHANGE,<br>  New York, NY 10005', 40.706877, -74.011265, 'attractions','1','https://goo.gl/maps/PEewaqiETfz'],
    ['8', 'TRINITY CHURCH,<br>  75 Broadway, New York, NY 10006', 40.708062, -74.012185, 'attractions','1','https://goo.gl/maps/qgFPaAYkaLr'],
    ['9', 'BROOKLYN BRIDGE,<br>  New York, NY 10038', 40.706086, -73.996864, 'attractions','1','https://goo.gl/maps/NtGNzH963tG2'],
    ['10','SOUTH STREET SEAPORT MUSEUM,<br>  12 Fulton St, <br/> New York, NY 10038', 40.706562, -74.003710, 'attractions','1','https://goo.gl/maps/BcANXCKz1mv'],
    ['11', 'WJ Hotel, <br />318 W 51st St, New York, <br /> NY 10019 ', 40.763309, -73.986814, 'hotels', '2','https://goo.gl/maps/A7k6NYaG3c12'],
    ['12', 'Hotel Edison,<br />228 W 47th St, <br /> New York, NY 10036 ', 40.759648, -73.986132, 'hotels', '2','https://goo.gl/maps/WR2sym1X8ts'],
    ['13', 'Salaam Bombay,<br>319 Greenwich St<br>New York, NY 10013 ', 40.717044, -74.010526, 'restaurants', '1','https://goo.gl/maps/XrscnR4Whzt'],
    ['14', 'Landmarc Tribica,<br>179 W Broadway,<br> New York,NY 10013 ', 40.717901, -74.007085, 'restaurants', '1','https://goo.gl/maps/CeZUQXEMFUt'],
    ['15', 'The Odeon,<br>145 W Broadway,<br>New York, NY 10013 ', 40.716980, -74.007834, 'restaurants', '1','https://goo.gl/maps/6H3zDLnRsH62'],
    ['16', 'Khe-Yo,<br>157 Duane St,<br>New York, NY 10013 ', 40.716826, -74.008605, 'restaurants', '1','https://goo.gl/maps/FGCuWZNzgV52'],
    ['17', 'Marc Forgione,<br>134 Reade St,<br>New York, NY 10013 ', 40.716494, -74.009607, 'restaurants', '1','https://goo.gl/maps/PYrJiPsxmMp'],
    ['18', 'Nobu Fifty Seven,<br>40 W 57th St,<br>New York, NY 10019 ', 40.763575, -73.976455, 'restaurants', '1','https://goo.gl/maps/nQXvKRVB6mx'],
    ['19', 'Ecco,<br>40 124 Chambers St,<br>New York, NY 10007 ', 40.715184, -74.008808, 'restaurants', '1','https://goo.gl/maps/nH7LL5FdwxT2'],
    ['20', 'Gran Morsi,<br>22 Warren St,<br>New York, NY 10007 ', 40.714323, -74.007767, 'restaurants', '1','https://goo.gl/maps/SHQAQk8tsjs'],
    ['21', 'Kaffe1668 South,<br>275 Greenwich St,<br>New York, NY 10007 ', 40.715139, -74.011089, 'shops', '3','https://goo.gl/maps/zPmKvPh3BWr'],
    ['22', 'Laughing Man Coffee & Tea,<br>184 Duane St,<br>New York, NY 10007 ', 40.717273, -74.010125, 'shops', '3','https://goo.gl/maps/7hDyb6P5xFE2'],
    ['23', 'Zuckers Bagels & Smoked Fish,<br>146 Chambers St,<br>New York, NY 10007 ', 40.715619, -74.009838, 'shops', '3','https://goo.gl/maps/rYwYxQfMTFF2'],
    ['24', 'Tribeca Treats,<br>94 Reade St # 1,<br>New York, NY 10013 ', 40.715732, -74.007864, 'shops', '3','https://goo.gl/maps/LJpDixeU1S62'],
    ['25', 'Starbucks,<br>125 Chambers St,<br>New York, NY 10007 ', 40.715570, -74.008868, 'shops', '3','https://goo.gl/maps/LFRqGoDhWaJ2'],
    ['26', 'Le Pain Quotidien,<br>81 W Broadway,<br>New York, NY 10007 ', 40.714993, -74.009324, 'shops', '3','https://goo.gl/maps/v72X3eDrHHK2'],
    ['27', 'Penn Station,<br> New York, NY 10119', 40.750568, -73.993519, 'transport','1','https://goo.gl/maps/4pkCTGrRaVv'],
    
    
];

/**
 * Function to init map
 */

function initialize() {
    var center = new google.maps.LatLng(40.715475, -74.008909);
    var mapOptions = {
        zoom: 12,
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

actionMarkers = function (markerID) { 
    $('.attraction-list a').removeClass('active');
       google.maps.event.trigger(gmarkers1[markerID], 'click'); 
       $(this).addClass('active');
      return false; 
    }
