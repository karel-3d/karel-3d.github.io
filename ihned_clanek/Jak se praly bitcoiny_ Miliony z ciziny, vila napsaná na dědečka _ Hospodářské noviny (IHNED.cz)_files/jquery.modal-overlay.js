;(function($, window, document, undefined) {

	var pluginName = 'ModalOverlay',
		defaults = {
			'overlayClass': '',
			'backgroundTarget': '#brand-a',
			'backgroundClass': 'blur',
			'closeButton': 'close' // css třída nebo konstrukční funkce
		};

	function Plugin( element, options ) {

		this.element = element;
		this.options = $.extend( {}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this._frame = null;
		this._header = null;
		this._content = null;
		this._close = null;

		this.init();
	}

	Plugin.prototype = {
		init: function () {

			$(this.options.backgroundTarget)
				.css({ top: -1 * $(window).scrollTop(), left: -1 * (this._getScrollBarWidth()/2) })
				.addClass(this.options.backgroundClass)
			;

			// main frame
			this._frame = $('<div>').addClass('modal-overlay-frame');

			// close button
			if(typeof this.options.closeButton == 'function') {
				this._close = this.options.closeButton();
			} else {
				this._close = $('<button>')
					.html('&times;')
					.addClass(this.options.closeButton)
				;
			}
			this._close
				.addClass('modal-overlay-close')
				.on('click', $.proxy(this.close, this))
			;

			this._header = $('<div>')
				.addClass('modal-overlay-header')
			;

			// content
			this._content = $('<div>')
				.addClass('modal-overlay-content')
			;

			// final append
			this._frame
				.append(this._close, this._header, this._content)
			;

			$(this.element)
				.addClass('modal-overlay ' + this.options.overlayClass)
				.append(this._frame)
			;

			$(document).keydown( $.proxy(function(event) {
				if (event.keyCode == 27) { this.close(); return; }
			}, this));

			$(this.element).show();
		},

		close: function() {
			var b = $(this.options.backgroundTarget);
			var st = -1 * parseInt(b.css('top'));
			b.removeClass(this.options.backgroundClass);
			window.scrollTo(0,st);
			$(this.element).remove();
		},

		addContent: function(html) {
			this._content.append(html);
		},

		clearContent: function() {
			this._content.empty();
		},

		addHeader: function(html) {
			this._header.append(html);
		},
		clearHeader: function() {
			this._header.empty();
		},

		_getScrollBarWidth: function() {
			var inner = document.createElement('p');
			inner.style.width = "100%";
			inner.style.height = "200px";

			var outer = document.createElement('div');
			outer.style.position = "absolute";
			outer.style.top = "0px";
			outer.style.left = "0px";
			outer.style.visibility = "hidden";
			outer.style.width = "200px";
			outer.style.height = "150px";
			outer.style.overflow = "hidden";
			outer.appendChild (inner);

			document.body.appendChild (outer);
			var w1 = inner.offsetWidth;
			outer.style.overflow = 'scroll';
			var w2 = inner.offsetWidth;
			if (w1 == w2) w2 = outer.clientWidth;

			document.body.removeChild (outer);

			return (w1 - w2);
		}
	};

	$.fn[pluginName] = function (option, settings) {
		if(option == undefined) option = {};
		if(settings == undefined) settings = [];
		return this.each(function() {

			if(typeof option === 'object') {

				if(!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin( this, option ));
				}

			} else if(typeof option === 'string') {

				if($.data(this, 'plugin_' + pluginName) === undefined) return false;
				var obj = $.data(this, 'plugin_' + pluginName);

				var func = obj[option];
				if(typeof func === 'function') return func.apply(obj, [settings]);

				if(settings) {
					obj.options[option] = settings;
					return true;
				} else {
					return obj.options[option];
				}

			}

		});

	};

})(jQuery,window,document);
