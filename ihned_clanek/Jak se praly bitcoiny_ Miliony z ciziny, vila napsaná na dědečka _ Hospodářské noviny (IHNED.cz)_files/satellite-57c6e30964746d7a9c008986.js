(function() {
	try {
		// New Facebook Tracker
		! function(t) {
			var n = function(t) {
					var n = [];
					for (var e in t) t.hasOwnProperty(e) && n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t[e]));
					return n.join("&")
				},
				e = function(t) {
					(new Image).src = t
				};
			t.fbq_create = function(o, r) {
				if (!r) return t["fbq_opt_" + o] = function() {}, _satellite.notify("FB tracker called with incorrect parameters", 1);
				t["fbq_opt_" + o] = function(t, o, i) {
					if ("track" == t && "string" == typeof o) {
						var c = {
							id: r || "1800107230226386",
							ev: o,
							dl: window.document.location,
							rl: "",
							if: "false",
							ts: (new Date).getTime(),
							v: "2.5.0",
							pv: "visible"
						};
						if (i && "object" == typeof i)
							for (var f in i) c["cd[" + f + "]"] = i[f];
						var a = "https://www.facebook.com/tr/?" + n(c);
						e(a)
					}
				}
			}
		}(window);

		fbq_create('1', _satellite.getVar('FacebookPixelID'));
		fbq_opt_1('track', "PageView");
		fbq_opt_1('track', 'ViewContent');

		var hostname = _satellite.getVar('pagehostname');

		if (hostname == 'predplatne.ihned.cz') {
			return _satellite.track('fb_pixel_predplatne_fire');
		}
		if (_satellite.isSubdomainOf(hostname, 'ihned.cz') && _satellite.parseQueryParams(window.location.search)['p'] == '000000_news') {
			return _satellite.track('fb_pixel_newsletter_fire');
		}
		if (hostname == 'ekonom.ihned.cz' && window.location.pathname == '/') {
			return _satellite.track('fb_pixel_newsletter_fire');
		}
	} catch (e) {
		_satellite.notify("Facebook setter failed", 4);
	}
})();
// Additional Facebook Tracker part - Aktuálně
(function() {
	try {
		var hostname = _satellite.getVar('pagehostname');
		if (!_satellite.isSubdomainOf(hostname, 'aktualne.cz') || hostname === 'zena.aktualne.cz') {
			return;
		}

		fbq_create('2', '882631201901339');
		fbq_opt_2('track', "PageView");
		fbq_opt_2('track', 'ViewContent');
		
		fbq_create('4', '830748163790583');
		fbq_opt_4('track', "PageView");

		var template = _satellite.getVar('pageTemplate');
		if (hostname == 'video.aktualne.cz' && _satellite.indexOf(['article', 'gallery'], _satellite.getVar('bbxtype')) != -1) {
			fbq_opt_2('track', 'Purchase', {
				value: '2.00',
				currency: 'CZK'
			});
			_satellite.notify("Track FB PVs value video", 1);
			return;
		}
		if (_satellite.indexOf(['gallery', 'graphicscode', 'graphics'], template) != -1) {
			fbq_opt_2('track', 'Purchase', {
				value: '0.30',
				currency: 'CZK'
			});
			_satellite.notify("Track FB PVs value " + template, 1);
			return;
		}
		if (hostname != 'video.aktualne.cz') {
			fbq_opt_2('track', 'Purchase', {
				value: '1.00',
				currency: 'CZK'
			});
			_satellite.notify("Track FB PVs value _article + other", 1);
			return;
		}
	} catch (e) {
		_satellite.notify("Facebook setter failed", 4);
	}
})();
// dane.aktualne.cz

// Additional Facebook Tracker part - Dane
(function() {
	try {
		var hostname = _satellite.getVar('pagehostname');
		if (hostname !== 'dane.aktualne.cz') {
			return;
		}

		fbq_create('3', '2003732306565176');
		fbq_opt_3('track', "PageView");
		fbq_opt_3('track', 'ViewContent');

		if (window.location.pathname.indexOf('/dpfo/success') === 0) {
			fbq_opt_3('track', 'Purchase', {
				value: Dpfo.price_total,
				currency: 'CZK'
			});
			_satellite.notify("Track Dane FB PVs value dpfo/success", 1);
			return;
		}

	} catch (e) {
		_satellite.notify("Facebook setter failed", 4);
	}
})();

