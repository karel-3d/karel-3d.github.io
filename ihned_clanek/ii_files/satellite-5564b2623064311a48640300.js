/*
       CPEX - Audience Manager
     Developed by Optimics s.r.o.
        https://optimics.cz
Technical Support: jakub.kriz@optimics.cz
*/

// settings for Economia
var cpex_AAM_conf = {    
    "partner"  :"cpex",
    "publisher":"Eco",
    "state"    :"publisher", // advertiser
    "private"  :"www.sw.centrum.cz,amplion.centrum.cz,eshop.ihned.cz", 
    "namespace":1,
    "settings":{
      "behavior": {
        "autofire" : true
      },
    "extensions" : {
      "cpex_network" : {
        release: "1432745643240",
        period: 0.000001*24*60*60*1000,
        min: 20,
        max: 100
      }
    }
    },
    "shortener":true, // true for production
    "debug"    :false, // false for production
  	"behavior": {
        "trackLinks": false // click tracker - default set on true 
    }
};

// Async loader
(function script(url){
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var x = document.getElementsByTagName('head')[0];
    x.appendChild(s);
})("https://cdn.cpex.cz/aam/cpex_universal.js");

