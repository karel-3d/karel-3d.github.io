;(function($, window, document, undefined) {

	var pluginName = 'Gallery',
		defaults = {
			targets: {
				pager: '.gallery-pager',
				descr: '.gallery-item-descr',
				prev: '.gallery-button-previous',
				next: '.gallery-button-next',
				items: '.gallery-frame > div'
			},
			afterMove: function() {},
			activeItemClass: 'gallery-item-active',
			items: [],
			startIndex: 0,
			continous: false,
			finalPreview: false,
			linkable: false,
			constructors: {
				// urlHash: function() {}, // for linkable variant
				// descr: function() {},
				// pager: function() {}
			}
		};

	function Plugin( element, options ) {

		this.element = element;
		this.options = $.extend(true, {}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this._items = [];
		this._activeItem = null;
		this._activeIndex = 0;

		this._init();
	}

	Plugin.prototype = {
		// public
		movePrevious: function(ev) {
			// var newIndex = this._activeIndex - 1;
			// if(newIndex < 0) {
			// 	if(!this.options.continous) return;
			// 	newIndex = this._items.length -1;
			// }
			// this.moveTo(newIndex);
			this.moveTo(this._activeIndex - 1);
		},

		moveNext: function(ev) {
			// var newIndex = this._activeIndex + 1;
			// if(newIndex >= this._items.length) {
			// 	if(!this.options.continous) {
			// 		if(this.options.finalPreview) this._showPreview();
			// 		return;
			// 	}
			// 	newIndex = 0;
			// }
			//
			// this.moveTo(newIndex);
			this.moveTo(this._activeIndex + 1);
		},
		moveTo: function(index) {
			this._setButtonsState(index);

			if(index < 0) {
				if(!this.options.continous) return;
				index = this._items.length - 1;
			}

			if(index >= this._items.length) {
				if(!this.options.continous) {
					if(this.options.finalPreview) this._showPreview();
					return;
				}
				index = 0;
			}

			this._activeItem = this._items[index];
			this._activeIndex = index;

			$(this.options.targets.items, this.element).removeClass(this.options.activeItemClass);
			$(this._activeItem.DOM).addClass(this.options.activeItemClass);

			this._descr.empty().html( this._makeDescr() );
			this._pager.html( this._makePager() );

			if(typeof this.options.afterMove == 'function') {
				this.options.afterMove.apply(this);
			}
		},

		// privátní
		_init: function () {

			this._initItems();
			if(!this._items.length) return;

			if(this.options.finalPreview && !this.options.continous) {
				this._preview = this._makePreview();
			}

			this._pager = $(this.options.targets.pager, this.element);
			this._descr = $(this.options.targets.descr, this.element);
			this._buttonPrevious = $(this.options.targets.prev, this.element);
			this._buttonNext = $(this.options.targets.next, this.element);

			this._buttonPrevious.bind('click', $.proxy(this.movePrevious, this));
			this._buttonNext.bind('click', $.proxy(this.moveNext, this));

			this.moveTo(parseInt(this.options.startIndex));

			$(document).keydown($.proxy(function(event) {
				if (event.keyCode == 37) { this.movePrevious(); return; }
				if (event.keyCode == 39) { this.moveNext(); }
			}, this));

		},
		_initItems: function() {
			var itms = [];

			if(this.options.items.length) {
				itms = this.options.items.toArray();
			}

			if(!itms.length && this.options.targets.items) {
				itms = $(this.options.targets.items, this.element).toArray();
			}

			for(var i in itms) {
				var itm = $(itms[i]);
				this._items.push({
					DOM: itms[i],
					name: itm.data('name'),
					descr: itm.data('descr'),
					author: itm.data('author'),
					portrait: this._determineProportions(itm)
				});
			}

		},

		_setButtonsState: function (index) {
			this._buttonPrevious.removeClass('inactive');
			this._buttonNext.removeClass('inactive');

			if(!this.options.continous && index <= 0) { this._buttonPrevious.addClass('inactive'); }
			if(!this.options.continous && !this.options.finalPreview && index >= (this._items.length - 1)) { this._buttonNext.addClass('inactive'); }
		},

		_determineProportions: function(item) {
			return (item.data('portrait') === true || item.data('portrait') == 'true' || parseInt(item.data('portrait')) == 1);
		},

		_makePager: function() {
			var content = '';
			if(typeof this.options.constructors.pager == 'function') {
				content = this.options.constructors.pager.call(this);
			}

			if(!content.length) { content =  (this._activeIndex + 1) + " / " + this._items.length }
			return content;
		},

		_makeDescr: function() {
			var content = '';
			if(typeof this.options.constructors.descr == 'function') {
				content = this.options.constructors.descr.call(this);
			}

			if(!content.length) { content = this._activeItem.descr; }
			return content;
		},

		_makePreview: function() {
			var preview = $('<div>')
				.addClass('gallery-preview')
			;

			var content = '';
			if(typeof this.options.constructors.preview == 'function') {
				content = this.options.constructors.preview.call(this);
			}

			if(content.length) {
				return preview.append(content);
			}


			if($(this.element).data('name') != undefined) {
				preview.append(
					$('<h2>').addClass('title').html($(this.element).data('name'))
				);
			}

			var list = $('<ul>');

			for(var i in this._items) {
				var itm = this._items[i];

				var a = $('<a>').attr('href','javascript:;').bind('click', $.proxy(function(index) {
					this._hidePreview();
					this.moveTo(parseInt(index));
				}, this, i));

				$('<img>')
					.attr('src', typeof itm.DOM.src === 'string' ? itm.DOM.src : $('img', itm.DOM).attr('src'))
					.appendTo(a)
				;

				$('<li>')
					.append(a)
					.appendTo(list)
				;
			}

			preview
				.append(list)
				.appendTo($(this.element))
			;

			return preview;
		},

		_showPreview: function() {
			if(!this.options.finalPreview) return;
			$(' > *:not(img)', this.element).hide();
			$(this.options.targets.items, this.element).removeClass(this.options.activeItemClass);
			this._preview.show();
		},

		_hidePreview: function() {
			if(!this.options.finalPreview) return;
			$(' > *:not(img)', this.element).show();
			this._preview.hide();
		}

	};

	$.fn[pluginName] = function (option, settings) {
		if(option == undefined) option = {};
		return this.each(function() {

			if(typeof option === 'object') {

				if(!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin( this, option ));
				}

			} else if(typeof option === 'string') {

				if($.data(this, 'plugin_' + pluginName) === undefined) return false;
				var obj = $.data(this, 'plugin_' + pluginName);

				var func = obj[option];
				if(typeof func === 'function') return func.apply(obj, settings);

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
