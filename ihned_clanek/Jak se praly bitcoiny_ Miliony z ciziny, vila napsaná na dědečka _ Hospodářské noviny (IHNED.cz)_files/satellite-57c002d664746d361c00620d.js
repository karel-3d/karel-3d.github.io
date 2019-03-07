 (function(){ 
  try {
    // cool detection, no jQuery baby!
  	var isPayWall = document.getElementsByClassName('login-container');
    if (isPayWall.length > 0) {
   	 _satellite.notify("Paywall zapnuty",1);    
  		//var metricValue = '1';
  		//ga('set', 'metric1', metricValue); 
      if(ga){
        var trackerName = "paywallDetector";   
        ga('create', {
          trackingId: "UA-43079536-5",
          cookieDomain: 'auto',
          name: trackerName
        });
        // Track pageview into separate property
        ga(trackerName+'.send', 'pageview');
      }
      else {
      	_satellite.notify("generic ga() tracker not found",1);
      }
  	}
  }
  catch(e){}
})()

