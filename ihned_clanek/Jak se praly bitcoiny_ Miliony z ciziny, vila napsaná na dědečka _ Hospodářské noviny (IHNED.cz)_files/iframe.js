/* eslint-disable camelcase */
/* globals _sashec, _bbx_embed_config, DisposableIframe */

/**
 * External iframe insert library for embed video into external pages
 *
 * Example:
 *
 *   <script type="text/javascript">_bbx_embed.insert({url:'https://video.aktualne.cz/embed_iframe/ve-zkratce-tomio-okamura/r~23aa8950ec3611e3b304005056bb386b/', width:480, height:270});</script>
 *
 *
 * @author	Vaclav Barta <vaclav.barta@economia.cz>
 * @version 	0.1 2014-10-21
 * @require	https://i0.cz/sashec/js/sashec.bundle.min.js or https://i0.cz/sashec/js/disposable-iframe.min.js (or unminifier version)
 */
(function (ns) {
	window[ns] = window[ns] || { };
	var _bbx_embed = window[ns];
	var log = function (arg) {
		try {
			// eslint-disable-next-line no-console
			console.log(arg);
		} catch (e) {
			// no catch
		}
	}

	_bbx_embed.parserUrl = _bbx_embed.parserUrl || document.createElement('a');

	_bbx_embed.fixURIProtocol = _bbx_embed.fixURIProtocol || function (url) {
		_bbx_embed.parserUrl.href = typeof url === 'string' ? url : '';
		_bbx_embed.parserUrl.protocol = 'https:';
		return _bbx_embed.parserUrl.href;
	};

	_bbx_embed.getUniq = _bbx_embed.getUniq || function () {
		return 'embed-uniq-' + (new Date()).getTime();
	};
	_bbx_embed.iframes = _bbx_embed.iframes || [];
	_bbx_embed.calcHeight = _bbx_embed.calcHeight || function (width) {
		return Math.floor(width * 9 / 16);
	};
	_bbx_embed.insert = _bbx_embed.insert || function (options) {
		if (typeof options !== 'object') {
			options = {};
		}
		/* if options.id exists it must have consistent width */
		if (!options.id || document.getElementById(options.id) === null) {
			options.id = _bbx_embed.getUniq();
			document.write('<div id="' + options.id +'" class="bbx-embed-wrapper"></div>');
		}
		var container = document.createElement('div'),
			cStyles = { position: 'relative', paddingBottom: '' + 9/16 * 100 + '%', height: '0', overflow: 'hidden' };

		for (var style in cStyles) {
			container.style[style] = cStyles[style];
		}
		var main = document.getElementById(options.id);
		if (main) {
			main.appendChild(container);
		} else {
			log('_bbx_embed error: cannot find element with id="' + options.id + '" to append embed block');
			return;
		}
		var target = container,
			urlSuffixes = { discovery: options.id },
			match = location.search.match(/(\?|&)bbxplayer-debug=(1|true|track)/),
			url = options.url,
			styles = {
				border: '0',
				overflow: 'hidden',
				/* intrinsic positioning */
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%'
			},
			attributes = {
				scrolling: 'no',
				allow: 'fullscreen; autoplay',
				style: Object.keys(styles).map(function (prop) {
					return prop + ':' + styles[prop];
				}).join('; ')
			},
			index = _bbx_embed.iframes.length,
			ifr,
			message = function (payload) {
				if (ifr.iframe.contentWindow === null) {
					log('_bbx_embed error: failed to postMessage, element with id="' + options.id + '" might be twice on the page"');
					return;
				}
				payload.index = index;
				ifr.iframe.contentWindow.postMessage(JSON.stringify(payload), '*');
			},
			definition = { options: options, message: message },
			init = function () {
				/**
				 * Option 1: using iframe without discovery
				 * Iframe triggers onload event, this function is the listener. It should send
				 * init post message and optionally a play postMessage as well. When navigation
				 * inside iframe occurs, it send a new onload event. This function should NOT
				 * run again for this event. Hence, setting definition ready to true and testing
				 * for it in each subsequent run
				 *
				 * Option 2: using iframe with discovery
				 * Iframe has a postMessage inside its body that is supposed to trigger discovery
				 * event listener before onload triggers, so discovery calls this init function.
				 * This only reason to do this is to speed up iframe loading for users - video
				 * setup does not have to wait for full load of iframe and can start while loading
				 * the rest of the page (eg. google analytics lazy loading).
				 * In some weird cases, onload event can come sooner that the postmessage, this
				 * should not cause any problesm.
				 *
				 */
				if (definition.ready) {
					return;
				}
				definition.ready = true;

				message({
					bbx_embed: 'init',
					id: options.id,
					page: encodeURIComponent(document.location.href),
					skipads: options.skipads
				});
				if (options.autoplay) {
					message({
						bbx_embed: 'play',
						mute: options.mute
					});
				}
			},
			discovery = function (event) {
				try {
					var data = JSON.parse(event.data);
					if (data.bbx_embed === 'discovery' && data.discovery === options.id) {
						init();
					}
				} catch (e) {
					// no catch
				}
			};

		window.addEventListener('message', discovery);

		if (match) {
			urlSuffixes['bbxplayer-debug'] = match[1];
		}
		if (typeof _sashec === 'object' && typeof _sashec.getGroupById('default') === 'object') {
			var _sashec_options = _sashec.getGroupById('default').options;
			if (typeof _sashec_options.site === 'string') {
				urlSuffixes.site = _sashec_options.site;
			}
			if (typeof _sashec_options.area === 'string') {
				urlSuffixes.area = _sashec_options.area;
			}
			if (_sashec_options.targets && typeof _sashec_options.targets.device === 'string') {
				/* Normalize df/dnf to d */
				var shortDevice = _sashec_options.targets.device.charAt(0);
				urlSuffixes.device = shortDevice;
			}
		}
		if (typeof _bbx_embed_config === 'object') {
			if (typeof _bbx_embed_config.psite === 'string') {
				urlSuffixes.site = _bbx_embed_config.psite;
			}
			if (typeof _bbx_embed_config.parea === 'string') {
				urlSuffixes.area = _bbx_embed_config.parea;
			}
			if (typeof _bbx_embed_config.pdevice === 'string') {
				urlSuffixes.device = _bbx_embed_config.pdevice;
			}
		}
		if (options.countdown) {
			urlSuffixes.countdown = true;
			options.autoplay = false;
		}
		var urlSuffixArr = [];
		for (var suffix in urlSuffixes) {
			urlSuffixArr.push(suffix +'='+ encodeURIComponent(urlSuffixes[suffix]));
		}
		if (urlSuffixArr.length) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + urlSuffixArr.sort().join('&');
		}
		ifr = new DisposableIframe({
			url: _bbx_embed.fixURIProtocol(url),
			width: null,
			height: null,
			target: target,
			onload: init,
			attributes: attributes,
			fullscreen: true
		});

		definition.ifr = ifr;
		_bbx_embed.iframes.push(definition);
		return definition;
	};
}('_bbx_embed'));
