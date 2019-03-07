function IObjects( options ) {

	var defaults = {
		defaultAction: 'popup', // vychozi akce, pokud neni nastaveny trigger
		autoTriggerSelector: '.io-trigger',

		// uzivatelske akce pro jednotlive triggery:
		// 'akce': function(iobject, trigger, event) {}
		// podporovane akce: popup, replace
		// eventy: init (pouze after a bez parametru)
		before: {},
		after: {},
		autoplay: false,
		showTitle: true,
		galleryItemsWraps: true
	};

	this.options = $.extend(true, {}, defaults, options);
	this._defaults = defaults;

	// iobject servirovac
	this._ObSer = new IObject();

	// kolekce dat pro iobjekty sesbirana pri skladani stranky
	this._iobjData = {};

	// kolekce instanci iobject
	this._iobj = {};

	this.init();
}

IObjects.prototype = {
	init: function () {
		//console.log("inicializovan");
		this._userAction('after', 'init');
	},

	initEntrypoints: function() {
		$("[data-io]").each($.proxy(this.setAction, this));
	},

	addIobjectData: function(id, data) {
		this._iobjData[id] = data;
	},

	addIobjectsData: function(collection) {
		this._iobjData = $.extend({}, this._iobjData, collection);
	},

	isAdsDisabled: function() {
		var response = JSON.parse($.ajax({
			type: 'GET',
			url: '/site/api/cs/logins/detail/?dump_basic_data=on&dump_current_subscriptions=on&format=json',
			async: false
		}).responseText);
		return response.user != undefined && response.user.current_subscriptions.length > 0;
	},

	reload_iobjects_data: function(article, callback) {
		var that = this;
		$.ajax({
			url: 'https://ihned.cz/?m=io&article[id]=' + article,
			type: 'get',
			dataType: 'script'
		}).done(function(){
			that.addIobjectsData(iobjects);
			if (typeof callback === 'function') callback();
		});
	},

	show: function(id, options) {
		options = $.extend(true, {}, {
			showTitle: true,
			autoplay: false,
			action: this.options.defaultAction,
			container: undefined
		}, options);

		var c = $('<span>');
		if(options.container != undefined) {
			var c = typeof options.container == 'object' ? options.container : $(options.container);
			if(!c.length) return;
		}
		c.attr('data-io', id).attr('data-io-action', options.action);
		this.setAction(null, c);
		this._iobj[id].setOptions({
			showTitle: options.showTitle,
			autoplayEnabled: options.autoplay,
			galleryItemsWraps: options.galleryItemsWraps
		});
		this._iobj[id]._triggers[0].trigger('click');
	},

	setAction: function(i, target) {
		var t = $(target);
		var _id = t.data('io');

		var iobj = this._ObSer.getInstance(this._iobjData[_id], t);
		if(!iobj) return;

		iobj.setOptions({
			showTitle: this.options.showTitle,
			autoplayEnabled: this.options.autoplay,
			galleryItemsWraps: this.options.galleryItemsWraps
		});

		triggers = t.find("[data-io-action]");
		t.find(this.options.autoTriggerSelector).each(function() {
			triggers.push(this);
		});

		if(t.data('io-action') != undefined) triggers.push(t);

		if(triggers.length) {
			for(i=0;i<triggers.length;i++) {
				var trg = $(triggers[i]);
				var action = trg.data('io-action');
				if(!action) action = this.options.defaultAction;
				trg.bind('click', $.proxy(this['_action_'+action], this, iobj, trg));
				iobj.addTrigger(trg);
			}
		} else { // nejsou triggery, tedy se vytvori click vrstva

			var trg = $("<a>")
				.attr('href', 'javascript:void(0);')
				.addClass('iobject-trigger-layer')
				.appendTo(t)
			;

			trg.bind('click', $.proxy(this['_action_'+this.options.defaultAction], this, iobj, trg));
			iobj.addTrigger(trg);

		}
		this._iobj[_id] = iobj;
	},

	_action_popup: function(iobj, trigger, e) {
		e.preventDefault();
		e.stopPropagation();
		this._userAction('before', 'popup', [iobj, trigger, e]);

		// console.log("-------- POPUP -------");
		// console.log(this);
		// console.log(iobj);
		// console.log(trigger);
		// console.log(e);
		// console.log("----------------------");

		var overlay = $('<div>')
			.addClass('iobject-popup-'+iobj.type)
			.appendTo('body')
			.ModalOverlay({
				'closeButton': function() {
					return $('<button>')
						.addClass('media-button')
						.attr('title','Zavřít')
						.append($('<span>')
							.addClass('ico-close')
						)
					;
				}
			})
		;

		overlay.ModalOverlay('addContent', iobj.createStructure());

		iobj.runHook('structure.after', this); // pro potreby inicializace

		this._userAction('after', 'popup', [iobj, trigger, e]);
	},

	_action_replace: function(iobj, trigger, e) {
		e.preventDefault();
		e.stopPropagation();
		this._userAction('before', 'replace', [iobj, trigger, e]);

		// console.log("------ REPLACE -------");
		// console.log(this);
		// console.log(iobj);
		// console.log(trigger);
		// console.log(e);
		// console.log("----------------------");

		iobj._target.empty().html(
			iobj.createStructure()
		);

		iobj.runHook('structure.after', this); // pro potreby inicializace

		this._userAction('after', 'replace', [iobj, trigger, e]);
	},

	_userAction: function(type, action, parameters) {
		if(typeof this.options[type][action] == 'function') {
			(this.options[type][action]).apply(this, parameters);
		}
	}

};


function IObject (config, target, triggers) {
	this.type = 'generic';
	this._options = {};
	this._config = config || {};
	this._target = target || null;
	this._actualTarget = this._target;
	this._triggers = triggers || [];
	this._firedTrigger = null;
	this._hooks = {};
}
IObject.prototype = {
	getInstance: function(config, target, triggers) {
		if(typeof window["IO_"+config.type] == 'function') {
			return new window["IO_"+config.type](config, target, triggers);
		}
		console.log('Unknown IObject type:', config.type);
		return;
	},
	setOptions: function(options) {
		this._options = $.extend(true, {}, this._options, options);
	},
	setTarget: function(target) {
		this._target = target;
	},
	addTrigger: function(trigger) {
		this._triggers.push(trigger);
	},
	registerHook: function(name, handler, persistent) {
		if(name == undefined || typeof handler != 'function') return; // neni to funkce, takze pech

		if(this._hooks[name] == undefined) this._hooks[name] = [];
		this._hooks[name].push({ handler: handler, persistent: persistent || false });
	},
	runHook: function(name, caller) {
		if(name == undefined || this._hooks[name] == undefined) return;
		for(var i in this._hooks[name]) {
			this._hooks[name][i]['handler'].apply(this, [caller]);
			if(!this._hooks[name][i]['persistent']) this._hooks[name].splice(i,1);
		}
	},
	createStructure: function() {}
}

// Gallery object
function IO_gallery (config, target, triggers) { IObject.call(this, config, target, triggers); this.type = 'gallery'; }
IO_gallery.prototype = new IObject();
IO_gallery.prototype.constructor = IO_gallery;
IO_gallery.prototype.createStructure = function() {

	var wrapper = $('<div>').addClass('gallery-wrapper');
	var gallery = $('<div>').addClass('gallery');
	if(this._config.name.length) gallery.attr('data-name', this._config.name);

	var pager = $('<div>').addClass('gallery-pager');

	var button_prev = $('<a>').attr('href', 'javascript:;').addClass('gallery-button-previous').attr('title','Předchozí fotka').append($('<span>').addClass('ico-prev'));
	var button_next = $('<a>').attr('href', 'javascript:;').addClass('gallery-button-next').attr('title','Další fotka').append($('<span>').addClass('ico-next'));

	var item_descr = $('<div>').addClass('gallery-item-descr');

	var photo_items = [];
	var gi,d;
	for(var i in this._config.items) {
		d = this._config.items[i];
		if (this._options.galleryItemsWraps) {
			gi = $('<div>');
			$('<img>').attr('src', d.large_image.url).appendTo(gi);
		} else {
			gi = $('<img>').attr('src', d.large_image.url);
		}
		gi.addClass('gallery-item')
			.attr('data-name', d.name)
			.attr('data-descr', d.description)
			.attr('data-author', d.author)
			.attr('data-portrait', d.large_image.width < d.large_image.height)
		;
		photo_items.push(gi);
	}

	if (this._options.galleryItemsWraps) {
		var photo_frame = $('<div>').addClass('gallery-frame');
		photo_frame.append(button_prev, button_next);
		photo_frame.append(photo_items);
		gallery.append(pager, photo_frame, item_descr);
	} else {
		gallery.append(pager, button_prev, button_next, photo_items, item_descr);
	}
	gallery.appendTo(wrapper);

	gallery.Gallery({
		finalPreview: true,
		linkable: true,
		constructors: {
			descr: function() {
				var hasDescr = this._activeItem.descr != undefined;
				return '<div>' +
					(this._activeItem.name != undefined ? '<span class="item-name'+(hasDescr ? ' thick' : '')+'">' +this._activeItem.name+ '</span>' : '' ) +
					(hasDescr ? '<span class="item-descr">'+this._activeItem.descr+'</span>' : '' ) +
					(this._activeItem.author != undefined ? ' <div class="author"><span>Autor&nbsp;/&nbsp;zdroj:</span>&nbsp;' + this._activeItem.author + '</div>' : '') +
					'</div>'
				;
			}
		},
		targets: { items: this._options.galleryItemsWraps ? '.gallery-frame > div' : 'img' }
	});

	return wrapper;
};


// Video object
function IO_embedded_video (config, target, triggers) { IObject.call(this, config, target, triggers); this.type = 'embedded_video'; }
IO_embedded_video.prototype = new IObject();
IO_embedded_video.prototype.constructor = IO_embedded_video;
IO_embedded_video.prototype.createStructure = function() {

	var fnc;
	var type = 'default';
	var regs = {
		aktualne: 'video.aktualne.cz',
		youtube: 'youtube.com',
		itunes: 'itunes.apple.com',
		vimeo: 'vimeo.com'
	};

	this._actualTarget = 'embedded_video_'+ this._config.iobject_id + '_'+ Math.round(Math.random() * 100000);

	for(var i in regs) {
		if(this._config.url.indexOf(regs[i]) > 0) {
			fnc = this['insert_'+i];
			type = i;
			break;
		}
	}

	if(typeof fnc != 'function') {
		fnc = this.insert_default;
	}

	var wrapper = $('<div>')
		.addClass('embedded-video-wrapper')
		.addClass('type-'+type)
	;

	if(this._options.showTitle) {
		wrapper
			.append( $('<div>').addClass('name').append(
				$('<h2>').text( this._config.name )
			))
		;
	}
	wrapper.append( $('<div>')
			.addClass('embedded-video-insert-target-wrapper')
			.append( fnc.apply(this) )
		)
	;

	return wrapper;
};

IO_embedded_video.prototype.insert_default = function() {

	var w = 640;
	var h = 360;

	if(this._config.preview_image != undefined) {
		w = this._config.preview_image.width;
		h = this._config.preview_image.height;
	}

	var embed = $('<div>')
		.addClass('embedded-video-insert-target')
		.attr('id', this._actualTarget)
	;

	var k = Math.round((h / w) * 10000) / 100;
	embed.css('paddingTop', k+'%');
	w = '100%';
	h = '100%';

	embed.css('position', 'relative');

	var ifr = $(this._config.embed)
		.attr('width', w).attr('height', h)
		.css({position: "absolute", top: 0})
		.appendTo(embed)
	;

	console.log(ifr);

	return embed;
};

IO_embedded_video.prototype.insert_aktualne = function() {

	this.registerHook('structure.after', function(caller) {
		var options = {
			url: ('https:' == document.location.protocol ? this._config.url.replace('http','https') : this._config.url),
			id: this._actualTarget,
			autoplay:(!!this._config.primary && this._options.autoplayEnabled),
			skipads: caller.isAdsDisabled()
		};
		_bbx_embed.insert(options);
	});

	return $('<div>').addClass('embedded-video-insert-target').attr('id', this._actualTarget);
};


IO_embedded_video.prototype.insert_vimeo = function() {

	var url_parts = this._config.url.split("/");
	var id = 0;
	while(url_parts.length > 0 && !(id = parseInt(url_parts.pop()))) continue;

	var target_url = '//player.vimeo.com/video/'+ id + '/?autoplay=' + (!!this._config.primary ? 1 : 0) +'&color=fff&byline=0&portrait=0'

	var embed = this.insert_default();
	$('iframe', embed).attr('src', target_url);
	return embed;

};

// Infographic object
function IO_info_graphic (config, target, triggers) { IObject.call(this, config, target, triggers); this.type = 'info_graphic'; }
IO_info_graphic.prototype = new IObject();
IO_info_graphic.prototype.constructor = IO_info_graphic;
IO_info_graphic.prototype.createStructure = function() {

	var embed = $('<div>')
		.addClass('info_graphic-content')
	;

	$('<img>')
		.attr('src', this._config.image.url)
		.appendTo(embed)
	;

	if(this._config.description != null && this._config.description.trim() != '') {
		var sub_desc = $('<div>').append(this._config.description);
		var desc = $('<div>')
			.addClass('infographic-description')
			.append(sub_desc)
			.appendTo(embed)
		;
	}

	var btn = $('<button>')
		.addClass('media-button')
		.attr('title','Zvětšit / zmenšit')
		.append($('<span>').addClass('ico-search'))
		.bind('click', function() {
			$(this).parent().find('.info_graphic-content').toggleClass('full-preview');
		})
	;


	this.registerHook('structure.after', function() {
		var trg = $('.info_graphic-content .infographic-description');
		trg
			.css('minHeight', trg.outerHeight() + 'px')
			.addClass('infographic-description-fixed')
		;
	});

	return $('<div>')
		.addClass('info_graphic-wrapper')
		.append(embed, btn)
	;

};
