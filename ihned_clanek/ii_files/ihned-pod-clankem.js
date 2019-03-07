(function() {
    var num = Math.random();
    var params = _satellite.parseQueryParams(document.location.search);
    if (params.utm_source === 'www.seznam.cz' && params.utm_medium === 'sekce-z-internetu') {
            //console.log("1_utm chyceno");
        if (document.cookie.indexOf("yieldPPC_sez") < 0) {
            var c_name = "yieldPPC_sez";
            var c_value = 1;
            var exp = new Date();
                exp.setMinutes(exp.getMinutes() + 10);
            var c_expires = "expires="+ exp.toUTCString();
            var c_domain = "domain=.ihned.cz; ";
            document.cookie = c_name + "=" + c_value + ";" + c_expires + ";" + c_domain + ";path=/";
            //console.log("2_cookie ulozena");
       }    
    }
    if (document.cookie.indexOf("yieldPPC_sez") < 0) {
         //console.log("3_cookie nenalezena - mathrnd");
         if (num < 0.9) {
           var src = 'https://i0.cz/reklama/bo/ads/ABtesting/ihned-testB.js'; 
         } else {
           var src = 'https://i0.cz/reklama/bo/ads/ABtesting/ihned-testA.js'; 
         }
    } else {
         //console.log("3_cookie nalezena - sklik");
         var src = 'https://i0.cz/reklama/bo/ads/ABtesting/ihned-test-utm.js';
    }
    document.write('<script type="text/javascript" src="'+src+'"></script>');
})();