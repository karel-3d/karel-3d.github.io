(function(){
    function createIframe(src) {
        var iframe = document.createElement("iframe");
        iframe.width=1;
        iframe.height=1;
        iframe.frameBorder=0
        iframe.setAttribute("style", "position:absolute; top:-1px;left:-1px;visibility:hidden;");
        iframe.src = src;
        document.body.insertBefore(iframe,document.body.firstChild);
    }
    /*synchronizace adformu */
    //createIframe("//h.imedia.cz/static/html/adform_sync.html");

    /*synchronizace pubmaticu */
    createIframe("//ads.pubmatic.com/AdServer/js/user_sync.html?p=49307&predirect=" + encodeURIComponent("//"+ sssp.conf.server + "/static/html/sync/pub_sync.html?pmId="));

    /*synchronizace apnexuxu */
    createIframe("//secure.adnxs.com/getuid?//" + sssp.conf.server + "/static/html/sync/apn_sync.html?uid=" + "$UID");

    /* GDPR souhlas CMP */
    /*createIframe("https://ssp.imedia.cz/static/html/cmp.html");*/

    /*synchronizace xaxisu
        createIframe("//static-tagr.gd1.mookie1.com/s1/sas/lv1/sync.html?cc=CZ");
        var xaxisImg = new Image();
        xaxisImg.src = "//cz-gmtdmp.mookie1.com/t/v2/learn?tagid=V2_179707&src.rand=" + (+(new Date()));
    */
})()
