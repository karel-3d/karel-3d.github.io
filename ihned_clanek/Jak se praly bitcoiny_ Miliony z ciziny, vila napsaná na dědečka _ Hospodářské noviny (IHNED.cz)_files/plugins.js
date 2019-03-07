if (!String.prototype.trim) {//for IE8
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	};
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		if ( this === undefined || this === null ) {
			throw new TypeError( '"this" is null or not defined' );
		}
		var length = this.length >>> 0; // Hack to convert object.length to a UInt32
		fromIndex = +fromIndex || 0;
		if (Math.abs(fromIndex) === Infinity) {
			fromIndex = 0;
		}
		if (fromIndex < 0) {
			fromIndex += length;
			if (fromIndex < 0) {
				fromIndex = 0;
			}
		}
		for (;fromIndex < length; fromIndex++) {
			if (this[fromIndex] === searchElement) {
				return fromIndex;
			}
		}
		return -1;
	};
}

/*
 * Nahrazovani klicu v retezci z pole dat
 *
 *	- pouzitim . v nazvu klice se lze dostat hloubeji do zdroje dat
 *		napr: image.url najde obsah url v {image: {url: '-- adresa obrazku --'}}
 *
 *	mask 	- RegExp
 *	data	- pole/object s daty
 *
 */
String.prototype.fillTpl = function(mask, data) {

	return this.replace(mask, function(match, p1, p2, p3, offset, string) {

		if(!p1.indexOf('.')) return data[p1] ? data[p1] : '';

		var parts = p1.split('.');
		var buff = data[parts[0]];
		for(var i = 1; i<parts.length; i++) buff = buff[parts[i]];
		return buff ? buff : '';

	});

};

//same in more js files!
var hn_subscriptions = ['10025270','10020670','10025870','10023690','10026070','10023670','10023680','10021070','10000435','10000355','10031270','10031470','10030470','10030670'];
var ek_subscriptions = hn_subscriptions.concat(['7','10025470','10029470','10029270','10027870']);//HN+Ekonom Web
var mam_subscriptions = ['5','10000355'];

/**** LOGIN ***/
function _ECO_LOGIN(){//objekt pro login
	this.server = 'ihned.cz';
	this.server_url  = 'https://ssl.' + this.server;
	this.updateUserInfoCallback = [];
	this._loadInfoTries = 0;
	this.logged = false;
	this.user_name = '';
	this.user_image = '';
	this.hasHN = false;
	this.hasMM = false;
	this.hasEK = false;

	this.parseApiResponse = function(data){
		var api_status = 0;
		var api_content = {};
		if(typeof(data)=='string'){
			api_status = 200;
			api_content = jQuery.parseJSON(data);
		}else{
			api_status = parseInt(data.status);
			api_content = jQuery.parseJSON(data.responseText);
		}
		if(api_status>=300){
			this.showErrors(api_content);
		}else{
			this.showErrors(null);
		}
		return {
			status: api_status,
			data: api_content
		}
	};

	this.showErrors = function(err) {
		if(err != null) {
			//translate
			$.each(err, function(key,val){
				switch (val) {
					case 'login':
					case 'login: This field is required.':		err[key]='Zadejte uživatelské jméno.';		break;
					case 'password':
					case 'password: This field is required.':	err[key]='Zadejte&nbsp;heslo.';			break;
					case 'Špatný login nebo heslo':			err[key]='Špatné uživatelské jméno nebo heslo.';break;
				}
			});

			$('.login-message').html('<span>' + err.join(' ') + '</span>').slideDown();
		} else {
			$('.login-message').empty().slideUp();
		}
	};

	this.detectSubscriptions = function() {
		var cookie_options = { path: '/', domain: '.'+this.server };
		var cts = (new Date().getTime())/1000;

		this.hasHN = this.hasSubscription(hn_subscriptions,true);
		cookie_options.expires = Math.ceil((this.hasHN - cts) / 86400);
		$.cookie('user__has_hn', !!this.hasHN, cookie_options);

		this.hasMM = this.hasSubscription(mam_subscriptions,true);
		cookie_options.expires = Math.ceil((this.hasMM - cts) / 86400);
		$.cookie('user__has_mam', !!this.hasMM, cookie_options);

		this.hasEK = this.hasSubscription(ek_subscriptions,true);
		cookie_options.expires = Math.ceil((this.hasEK - cts) / 86400);
		$.cookie('user__has_ek', !!this.hasEK, cookie_options);
	};

	this.updateUserInfo = function(login) {
		this.user_name = '';
		var subscriptions;
		var cookie_options = { path: '/', domain: '.'+this.server };
		var today = new Date().toJSON().slice(0,13);//vcetne hodin

		this.logged = ($.cookie('user__login_id') != undefined && $.cookie('user__login_security') != undefined);

		if(login != undefined && login.user != undefined) {
			var em = login.user.email;
			if ((!em || em.indexOf('@')<1) && location.hostname.indexOf('ucet')<0) {
				location.href = "https://ucet.ihned.cz/";
				return;
			}

			this.user_name = login.user.name || login.user.login;
			if(login.user != undefined && login.user.image != undefined) this.user_image = login.user.image.url;

			subscriptions = $.cookie('user__aamhash') + ',' + today + ',';
			$.each(login.user.current_subscriptions, function(key,item){
				subscriptions += item.id + ',' + item.date_to + ',';
				if (item.line_info) {
					var info = $('<div>').addClass('subscription-line-info none subscription-line-' + item.line_id).appendTo('body');
					info.click(function(){ $('.subscription-line-' + item.line_id).css('display','none'); });
					info.html(item.line_info);
				}
			});
			$.cookie('user__subscriptions', subscriptions, cookie_options);
			$.cookie('user__name', this.user_name, cookie_options);
			$.cookie('user__image', this.user_image, cookie_options);

			this.detectSubscriptions();
		} else {
			if (this.logged) {
				subscriptions = $.cookie('user__subscriptions');
				if(subscriptions && subscriptions.indexOf($.cookie('user__aamhash')) === 0 && subscriptions.indexOf(today) === 41) {
					this.user_name = $.cookie('user__name');
					this.user_image = $.cookie('user__image');
					this.hasHN = $.cookie('user__has_hn');
					this.hasMM = $.cookie('user__has_mam');
					this.hasEK = $.cookie('user__has_ek');
				} else {
					if (this._loadInfoTries < 10) {
						this._loadInfoTries++;
						this.loadUserInfo();
						return;
					}
				}
			} else {
				for (var susenka in $.cookie()) { if (susenka.indexOf('user_')===0) $.removeCookie(susenka,cookie_options); }
			}
		}

		for(var index in this.updateUserInfoCallback) {
			if (typeof this.updateUserInfoCallback[index] === 'function') {
				try {
					this.updateUserInfoCallback[index](this);
				} catch(err) { console.log(err.message); }
			}
		}
	};

	this.userLogin = function(callback) {
		var callback = callback || null;
		var that = this;
		var form = $("#login-form");
		var ln = $("#l-n").val();
		var pw = $("#l-p").val();
		var expire = $('#l-e').is(':checked') ? 'permanent' : 'onclose';

		if (!ln || !pw) {
			var err = [];
			if (!ln) err.push('login');
			if (!pw) err.push('password');
			this.showErrors(err);
			form.addClass('has-errors');
			return false;
		}

		form.addClass('in-progress');
		$.ajax({
			type: 'POST',
			url: this.server_url+'/site/api/cs/logins/create_new/',
			data: {
				login: ln,
				password: pw,
				expire: expire
			},
			xhrFields: {
				withCredentials: true
			}
		}).always(function(data) {
			form.removeClass('in-progress');
			var res = that.parseApiResponse(data);
			if(res.status<300) {
				that.loadUserInfo(false);
				if(typeof callback === 'function') callback(that, res);
			} else that.updateUserInfo();
		});
		return false;
	};

	this.userLogout = function(callback) {
		var callback = callback || null;
		var that = this;
		var cookie_options = { path: '/', domain: '.'+this.server };
		$.ajax({
			type: 'POST',
			url: this.server_url+'/site/api/cs/logins/destroy/',
			xhrFields: {
				withCredentials: true
			}
		}).always(function(data){
			that.updateUserInfo();
			if(typeof callback === 'function') callback(that);
		});
		return false;
	};

	this.loadUserInfo = function(async) {
		async = typeof async !== 'undefined' ? async : true;
		var that = this;
		$.ajax({
			type: 'GET',
			async: async,
			data: { 'format': 'json' },
			url: this.server_url+'/site/api/cs/logins/detail/?dump_basic_data=on&dump_current_subscriptions=on&dump_subscription_line=on',
			xhrFields: {
				withCredentials: true
			}
		}).always(function(data) {
			var res = that.parseApiResponse(data);
			if(res.data != null) {
				that.updateUserInfo(res.data);
			} else {
				that.updateUserInfo();
			}
		});
	};

	//Hleda, jestli ma uzivatel aktivni subscription id. Pokud je predano pole, vraci true pri prvnim nalezu.
	//Pokud return_expiration_timestamp==true, vraci se misto true timestamp expirace prvniho nalezu.
	this.hasSubscription = function(id,return_expiration_timestamp) {
		var subscriptions = $.cookie('user__subscriptions');
		if (!subscriptions) return false;
		return_expiration_timestamp = typeof return_expiration_timestamp !== 'undefined' ? return_expiration_timestamp : false; //default value
		var found = false;
		if (typeof id === 'object') {//array
			$.each(id, function(key,val){
				found = subscriptions.indexOf(','+val.toString()+',');
				if (found !== -1) {//nalezeno
					if (return_expiration_timestamp) {
						var spos = found + 2 + val.toString().length;
						var exlen = subscriptions.indexOf(' ',spos) - spos;
						found = subscriptions.substr(spos, exlen).split('-');
						found = (new Date(found[1]+'/'+found[2]+'/'+found[0]).getTime())/1000;

					} else {
						found = true;
					}
					return false;
				}
				found = false;
			});
			return found;
		}

		found = subscriptions.indexOf(','+id.toString()+',');
		if (found !== -1) {
			if (return_expiration_timestamp) {
				var spos = found + 2 + id.toString().length;
				var exlen = subscriptions.indexOf(' ',spos) - spos;
				found = subscriptions.substr(spos, exlen).split('-');
				found = (new Date(found[1]+'/'+found[2]+'/'+found[0]).getTime())/1000;
				return found;
			} else {
				return true;
			}
		}

		return false;
	};

	this.hasSomeSubscription = function() {
		var subscriptions = $.cookie('user__subscriptions');
		if (!subscriptions) return false;
		if (subscriptions.lastIndexOf(',')>52) return true;
		return false;
	};
}

jQuery.support.cors = true;
var ecoLogin = new _ECO_LOGIN();



// exponea init function
var exponea_enabled = true;
window.exponea_initialization = { inprogress: false, done: false };
var exponeaInit = function(with_ecoLogin) {
	if (window.exponea_initialization.inprogress) return;
	with_ecoLogin = typeof with_ecoLogin !== 'undefined' ? with_ecoLogin : true;

	window.user_logged = false;
	window.exponeaObject = { logged_in: false, subscription: false, expires: 0 };

	if (with_ecoLogin && ecoLogin.logged) {
		window.user_logged = true;
		window.exponeaObject.logged_in = true;
		$.each(hn_subscriptions, function(key,val){
			var exp = ecoLogin.hasSubscription(val,true);
			if (exp && exp > window.exponeaObject.expires){
				window.exponeaObject.subscription = true;
				window.exponeaObject.expires = exp;
				if (val == '10021070') {
					window.exponeaObject.subscription_type = 'HN Premium';
				} else if (val == '10025270') {
					window.exponeaObject.subscription_type = 'HN Web';
				} else if (val == '10000435' || val == '10000355') {
					window.exponeaObject.subscription_type = 'HN Print';
				} else {
					window.exponeaObject.subscription_type = 'HN Digital';
				}
			}
		});
	}

	if(window.exponea_initialization.done) {
		if (typeof exponea === 'object') exponea.update(window.exponeaObject);
		return;
	}

	if (typeof exponea === 'object') {
		window.exponea_initialization.inprogress = true;
		exponea.initialize({ token: 'a672906a-f5c8-11e5-81ad-14187733e19e', ping: { enabled: true }, track: { visits: true, default_properties: { medium_name: "Ihned" } }, modify: { enabled: true } });
		exponea.update(window.exponeaObject);
		window.exponea_initialization.inprogress = false;
		window.exponea_initialization.done = true;
	}
};



/**** PULLDOWNS ****/

function _PULLDOWN () {
	this.data = { menu_login: '', menu_login_logged: '' };
	this.menu_login_callbacks = [];
};
_PULLDOWN.prototype = {
	_overlay: function(content, with_header, overlayClass, title) {
		with_header = with_header || false;
		overlayClass = overlayClass || '';
		var over = $('<div>')
			.appendTo('body')
			.ModalOverlay({
				'closeButton': function() {
					return $('<button>')
						.addClass('media-button media-button-nobg')
						.attr('title','Zavřít')
						.append($('<span>')
							.addClass('ico-close')
						).click(function(){
							if (window.innerWidth < 1024 && $(this).parent().parent().hasClass('modal-menu-login') && $(".user-info-screen #myhned-heart").length) {
								$("#myhned-heart span").remove();
								$("#myhned-heart").detach().prependTo(".hdr-login");
								$(".user-info-screen .links li:first-child").remove();
							}
						});
					;
				},
				'overlayClass': overlayClass
			})
		;

		if(title != undefined) {
			var h2 = $('<h2>').html(title);
			over.ModalOverlay('addContent', h2);
		}

		over.ModalOverlay('addContent', content);
		if(with_header) over.ModalOverlay('addHeader', this._makeHeader());
		return over;
	},
	_makeHeader: function() {
		var hdr = $('<div>')
			.addClass('header')
		;

		$('<img>')
			.attr('src', 'https://ihned.cz/img/v2/logo_hn.svg')
			.addClass('overlay-logo')
			.appendTo(hdr)
		;

		return hdr;
	},
	_close: function() {
		$('.modal-overlay').ModalOverlay('close');
	},
	_error: function(message) {

		var data = $("<div>")
			.addClass('error-message')
			.html(message)
		;
		pulldown._overlay(data, true, '', "Chybka :-/");
	},
	set_submenu_actions: function(){
		$('.site-menu .expandable').click(function(e){
			if (window.innerWidth > 1023 || $(this).parent().hasClass('expanded')) return true;
			e.preventDefault();
			$(this).parent().addClass('expanded').find('.level-3').slideDown();
		});
		if (ecoLogin.logged) $('.site-menu-scrolldown').addClass('logged');
		if (window.innerWidth < 1024 && $("#myhned-heart").length) {
			$(".user-info-screen .links").prepend('<li></li>');
			$("#myhned-heart").detach().prependTo(".user-info-screen .links li:first-child").append('<span>'+$("#myhned-heart").attr("title")+'</span>');
		}
	},
	exec_menu_login_callback: function(){
		if(this.menu_login_callbacks != undefined && this.menu_login_callbacks.length) {
			for(var i in this.menu_login_callbacks) {
				if(typeof this.menu_login_callbacks[i] != 'function' ) continue;
				this.menu_login_callbacks[i].call();
			}
		}
	},

	menu: function(page) {
		var overlayClass = 'modal-menu-login';
		if(page == undefined || page == '') var page = false;

		if (window.innerWidth > 1023) overlayClass = 'modal-menu';

		if (ecoLogin.logged && !this.data.menu_login_logged) {
			var photo = '';
			if (ecoLogin.user_image) {
				photo = $('<div>').addClass('photo').append(
					$('<img>').attr('src', ecoLogin.user_image)
				);
			}
			var lbl = $('<h2>').html('Účet');
			var name = $('<h3>').html(ecoLogin.user_name);

			var links = $('<ul>').addClass('links');
			links.append('<li><a href="https://ucet.ihned.cz/" onclick="pulldown._close();"><span class="ico-profile"></span>Můj profil</a></li>');
			links.append('<li><a href="javascript:;" onclick="return ecoLogin.userLogout(logout_callback);" class="logout"><span class="ico-logout"></span>Odhlásit se</a></li>');

			var all = $('<div>').addClass('user-info-screen').append(lbl, photo, name, links);
		}

		if (this.data.menu_login) {
			if (ecoLogin.logged) {
				if (!this.data.menu_login_logged) {
					this.data.menu_login_logged = $(this.data.menu_login);
					this.data.menu_login_logged.append(all).find('.login-form').remove();
				}
				pulldown._overlay(this.data.menu_login_logged, true, overlayClass);
			} else {
				pulldown._overlay(this.data.menu_login, true, overlayClass);
			}
			this.set_submenu_actions();
			this.exec_menu_login_callback();
		} else {
			that = this;
			$.ajax({
				url: 'https://ihned.cz/?p=000000_modalMenuLogin'+(page != false ? '&sub='+page : ''),
			}).done(function(data) {
				that.data.menu_login = data;
				if (ecoLogin.logged && !that.data.menu_login_logged) {
					that.data.menu_login_logged = $(that.data.menu_login);
					that.data.menu_login_logged.append(all).find('.login-form').remove();
					pulldown._overlay(that.data.menu_login_logged, true, overlayClass);
				} else {
					pulldown._overlay(that.data.menu_login, true, overlayClass);
				}
				that.set_submenu_actions();
				that.exec_menu_login_callback();
			});
		}
	},
	login: function() {
		var overlayClass = 'modal-menu-login';
		if (window.innerWidth > 1023) {
			overlayClass = 'modal-login';
			if (ecoLogin.logged && location.hostname.indexOf('ucet')<0) {
				location.href = "https://ucet.ihned.cz/";
				return;
			}
		}

		if (ecoLogin.logged) {
			if (this.data.menu_login_logged) {
				pulldown._overlay(this.data.menu_login_logged, true, overlayClass);
				return false;
			} else {
				var photo = '';
				if (ecoLogin.user_image) {
					photo = $('<div>').addClass('photo').append(
						$('<img>').attr('src', ecoLogin.user_image)
					);
				}
				var lbl = $('<h2>').html('Účet');
				var name = $('<h3>').html(ecoLogin.user_name);

				var links = $('<ul>').addClass('links');
				links.append('<li><a href="https://ucet.ihned.cz/" onclick="pulldown._close();"><span class="ico-profile"></span>Můj profil</a></li>');
				links.append('<li><a href="javascript:;" onclick="return ecoLogin.userLogout(logout_callback);" class="logout"><span class="ico-logout"></span>Odhlásit se</a></li>');

				var all = $('<div>').addClass('user-info-screen').append(lbl, photo, name, links);
			}
		}

		if (this.data.menu_login) {
			if(ecoLogin.logged) {
				this.data.menu_login_logged = $(this.data.menu_login);
				this.data.menu_login_logged.append(all).find('.login-form').remove();
				pulldown._overlay(this.data.menu_login_logged, true, overlayClass);
			} else {
				pulldown._overlay(this.data.menu_login, true, overlayClass);
			}
			this.set_submenu_actions();
			this.exec_menu_login_callback();
		} else {
			that = this;
			$.ajax({
				url: 'https://ihned.cz/?p=000000_modalMenuLogin',
			}).done(function(data) {
				that.data.menu_login = data;
				if(ecoLogin.logged) {
					that.data.menu_login_logged = $(data);
					that.data.menu_login_logged.append(all).find('.login-form').remove();
					pulldown._overlay(that.data.menu_login_logged, true, overlayClass);
				} else {
					pulldown._overlay(data, true, overlayClass);
				}
				that.set_submenu_actions();
				that.exec_menu_login_callback();
			});
		}
	},
	addQuestion: function() {}
};
var pulldown = new _PULLDOWN();

/***** SAS ***/
//<SAS
//almost same code in 7/7.js
function _SAS_ECO_PARAMS(){//objekt s parametry pro SAS
	this.site='';
	this.area='';
	this.enabled_positions=[];//Pokud je naplněno, queue_push kontroluje, které pozice může naplnit. Plní se idčky elementů např: 'a-leader' (ne size, protože unikátní je size+pos).
	this.keywords=[];
	this.targets={device:'u', template:'list'};//v detail.js se mění template TODO

	this.manual_callbacks = {};

	// definice podle eventType
	this.callbacks = {
		cleanup: function(e) {
			var p = e.position.options.element.parentNode; // wrapper
			_saseco.removeClass(p,['a-visible', p.id+'-visible']);
			if(_saseco.get_size(e) == 'commercial' && p.parentNode.id == 'r-ht') {
				p.parentNode.style.display = 'none';
			}
			// clear DOM elements
			while (e.position.options.element.firstChild) {
				e.position.options.element.removeChild(e.position.options.element.firstChild);
			}
			_saseco.exec_manual_callback('recalculate');
		},
		insert: function(e) {
			var p = e.position.options.element.parentNode; // wrapper
			switch(_saseco.get_size(e)) {
				case 'commercial': {
					// zviditelneni wrapperu hypertextu
					if(!_saseco.targets.ap && !e.is_empty && p.parentNode.id == 'r-ht') p.parentNode.style.display = 'block';
				}
				default: {
					if(!_saseco.targets.ap && !e.is_empty) _saseco.addClass(p, ['a-visible', p.id+'-visible']);
				}
			}
			// user callback
			_saseco.user_callback(e);
			_saseco.exec_manual_callback('recalculate');
		}
	};

	this.exec_manual_callback = function(type) {
		if(this.manual_callbacks[type] != undefined) {

			for(var i in this.manual_callbacks[type]) {
				if(typeof this.manual_callbacks[type][i] != 'function' ) continue;
				this.manual_callbacks[type][i].call();
			}

		}
	};

	this.add_manual_callback = function(type, callback) {
		if(this.manual_callbacks[type] == undefined) {
			this.manual_callbacks[type] = [];
		}
		this.manual_callbacks[type].push(callback);
	};

	this.get_size = function(e) {
		return e.position.options.size.slice(0,1).pop();
	};

	// default callback
	this.callback = function(e) {
		if(typeof _saseco.callbacks[e.type] != 'function') return;
		return _saseco.callbacks[e.type](e);
	};

	this.user_callback = function(e) {
		var call_name = _saseco.get_size(e) + (e.position.options.pos != undefined ? '_'+e.position.options.pos : '') + '_call';
		if(typeof window[call_name] === 'function') return window[call_name].call(e.position.options.element,window.jQuery);
		return false;
	};

	// pridani css trid k DOM elementu
	// pro class_list povoleno string nebo array
	this.addClass = function(element, class_list) {
		if(typeof element != 'object' || class_list == undefined) return;

		var classes = element.className != undefined ? element.className.trim().split(' ') : [];
		if(!classes) {
			element.className = class_list;
			return;
		}
		if(typeof class_list == 'string') class_list = class_list.split(' ');
		for(var i in class_list) {
			if(typeof class_list[i] != 'string') continue;
			if(classes.indexOf(class_list[i]) == -1) classes.push(class_list[i]);
		}

		element.className = classes.join(' ');
	};

	// odebrani css trid z DOM elementu
	// pro class_list povoleno string nebo array
	this.removeClass = function(element, class_list) {
		if(typeof element != 'object' || class_list == undefined) return;
		if(element.className == undefined) return;
		class_list = (typeof class_list == 'string' ? class_list.split(' ') : class_list);
		if(!class_list) return;
		element.className = element.className.replace(new RegExp(class_list.join("|"), 'gi'), '');
	};

	// pomocna funkce pro sanitovani keywords
	this.parse = function(str) {

		// kontrola na obsah
		if(str === undefined) return undefined;
		str = str.trim().toLowerCase();
		if(str == '') return undefined;

		// odstraneni diakritiky
		var search  = "áäčçďéěëíňóöřšťúůüýž _=+%'/&*()][{}!<>:?;,#$";
		var replace = "aaccdeeeinoorstuuuyz--_";

		var result = '';
		for(var i=0;i<str.length;i++) {
			var k = search.indexOf(str[i]);
			if(k == -1) {
				result += str.charAt(i);
				continue;
			}
			result += replace.charAt(k);
		}
		//odstraneni duplicitnich -
		result = result.replace(/([-]{2,})/g,'-');
		return result.replace('"','');
	};

	// nastaveni keywords s moznosti nahrazeni predchoziho
	this.push_keywords = function(keywords,replace) {
		replace = replace || false; //je-li true keywords se přepisují
		if(keywords == undefined) return;

		//string with keywords separated by ";"
		if (typeof keywords === 'string') {
			if(keywords.trim() == '' && !replace) return;
			keywords = keywords.split(';');
		}

		// aplikovano nahrazeni
		if(replace) this.keywords = [];

		// zpracovani jednotlivych kw a pridani do pole
		for(var k=0;k<keywords.length;k++) {
			var $kw = this.parse(keywords[k]);
			if($kw === undefined || this.keywords.indexOf($kw) != -1) continue;
			this.keywords.push($kw);
		}
	};

	// nastaveni ciloveho webu (site)
	this.set_site = function(str) {
		if (str) this.site = str;//vždy se přepisuje
	};

	// nastaveni cilove oblasti (area)
	this.set_area = function(str) {
		if (str) this.area = str;
	};

	// ID clanku
	this.set_targets_id = function(str) {
		if (str) this.targets.id = str;
	};

	// ziskani aktualni site
	this.get_site = function() {
		if (!this.site) return 'ihned';
		return this.site;
	};

	// ziskani aktualni oblasti
	this.get_area = function() {
		if (!this.area) return 'default';
		return this.area;
	};

	// push do _sashec_queue
	this.queue_push = function(arr){
		if ((arr[0] == 'position') && (this.enabled_positions.length > 0) && ($.inArray(arr[1], this.enabled_positions) == -1)) return;
		_sashec_queue.push(arr);
	};
};

/***** STICKY BANNERS ***/
function _OnScrollResponse() {
	this.parts = {
		sticky: [],
		uncover: []
	};
	this.uncover_active = false;
	this.windowScrollTop = 0;
	this.windowHeight = 0;
	this.headerTop = 0;


	this.sticky = function(idx) {
		var o = this.parts.sticky[idx];
		if (o.target.is(':hidden')) return;

		if (!o.inited){
			o.paddingTop = 0;
			o.target.css('padding-top',0);

			o.height = o.target.outerHeight();

			o.offset_top = o.target.offset();
			o.offset_top = o.offset_top.top;

			o.in_parent_top = o.target.parent().offset();
			o.in_parent_top = o.offset_top - o.in_parent_top.top;

			o.in_parent_space = o.target.parent().height() - o.in_parent_top - o.height;

			o.inited = true;
		}

		var top = this.windowScrollTop - o.offset_top + 10;
		if (top > 0) {
			if (top > o.in_parent_space) {
				if (o.paddingTop !== o.in_parent_space) {
					top = o.in_parent_space;
				} else return;
			}
			o.paddingTop = top;
			o.target.css('padding-top',top+'px');
			return;
		}
		if (top < 0 && o.paddingTop > 0) {
			o.paddingTop = 0;
			o.target.css('padding-top',0);
		}
	};

	this.uncover = function(idx) {
		var o = this.parts.uncover[idx];
		if (o.target.is(':hidden')) return;

		if (!o.inited){
			o.paddingTop = 0;
			o.target.css('padding-top',0);

			o.height = o.target.outerHeight();

			o.offset_top = o.target.offset();
			o.offset_top = o.offset_top.top;

			o.inited = true;
		}

		var top = this.windowScrollTop - o.offset_top;
		if (top > 0 && top <= o.height) {
			o.paddingTop = top;
			o.target.css('padding-top',top+'px');
			if (o.coverOpacity) { o.target.children('.cover').css('opacity',(o.coverOpacity * top/o.height)); }
		}
		if (top < 0 && o.paddingTop > 0) {
			o.paddingTop = 0;
			o.target.css('padding-top',0);
			if (o.coverOpacity) o.target.children('.cover').css('opacity',0);
		}

		var height = this.windowScrollTop + (o.viewportPosition * this.windowHeight) - o.offset_top;
		if (height > 0 && height <= o.height) {
			o.actualHeight = height;
			o.target.height(height);
			return;
		}
		if (height < 0 && o.actualHeight > 0) {
			o.actualHeight = 0;
			o.target.height(0);
		}
	};

	this.response = function() {
		this.windowScrollTop = $(window).scrollTop();
		var that = this;

		var ht = $('.leader').outerHeight();
		if (ht != this.headerTop) {
			this.headerTop = ht;
			this.reinit();
			return;
		}

		$.each(this.parts.sticky, function(idx,data) { that.sticky(idx); });
		if (this.uncover_active) {
			this.windowHeight = $(window).height();
			$.each(this.parts.uncover, function(idx,data) { that.uncover(idx); });
		}
	};

	this.reinit = function() {
		var that = this;
		$.each(this.parts.sticky, function(idx,data) { that.parts.sticky[idx].inited = false; that.sticky(idx); });
		$.each(this.parts.uncover, function(idx,data) { that.parts.uncover[idx].inited = false; that.uncover(idx); });
	};

	this.partsCount = function() {
		if (this.parts.uncover.length) this.uncover_active = true;
		return (this.parts.sticky.length + this.parts.uncover.length);
	};
}

/***** ONLINE REPORT ***/
function _ONLINE_REPORT(options){

	var defaults = {
		api: 'https://ihned.cz/site/api/cs/online_reports/',
		refresh: 60000,
		article: null,
		main_container: null,
		update_info_container: null,
		next_button_container: null,
		last_item_date: null,
		next_item_date: null,
		next_items_limit: 11,
		reversed: 0,
		init: false,
		full_date: false,
		max_items: null,	// maximum najednou zobrazenych polozek (odebiraji se nejstarsi)
		class_item: "online-item",
		class_item_heading: "online-item-heading",
		class_item_content: "online-item-content"
	};

	this.append_in_progress = false;
	this.prepend_in_progress = false;

	this.options = $.extend(true, {}, defaults, options);

	if (this.options.init) this.init();
}
_ONLINE_REPORT.prototype = {
	add_items: function() {
		if (this.append_in_progress) return;
		this.append_in_progress = true;
		var that = this;
		$.ajax({
			url: this.options.api,
			type: 'get',
			data: {
				article_id: this.options.article,
				max_date: this.options.next_item_date,
				limit: this.options.next_items_limit,
				format: 'json'
			},
			dataType: 'json'
		}).done(function(data) {
			data = $.makeArray(data);
			if (data.length < that.options.next_items_limit) that.options.next_button_container.hide();
			that.put_item(data.slice(1),true,false);

		}).fail(function() {
			that.prepend_in_progress = false;
		});
	},

	reload_items: function() {
		if (this.options.reversed) {
			if (this.append_in_progress) return;
			this.append_in_progress = true;
		} else {
			if (this.prepend_in_progress) return;
			this.prepend_in_progress = true;
		}
		var that = this;
		$.ajax({
			url: this.options.api,
			type: 'get',
			data: {
				article_id: this.options.article,
				min_date: this.options.last_item_date,
				format: 'json'
			},
			dataType: 'json'
		}).done(function(data) {
			data = $.makeArray(data);
			var items_to_process = data.slice(0, -1);
			if(items_to_process.length > 10) location.reload();
			that.put_item(items_to_process,that.options.reversed,true);
			var d = new Date();
			if(that.options.update_info_container) {
				that.options.update_info_container.html('automaticky obnoveno v '+d.toLocaleTimeString('en-GB').substr(0,5)).fadeOut(0).fadeIn(4000);
			}
		}).fail(function() {
			that.prepend_in_progress = false;
		});
	},

	put_item: function(items_to_process,append,last) {
		if(!items_to_process.length) {
			if (append) {
				this.append_in_progress = false;
			} else {
				this.prepend_in_progress = false;
			}
			return;
		}
		var that = this;
		var iobject = false;

		if (append) {
			var item = items_to_process.shift();
		} else {
			var item = items_to_process.pop();
		}

		var dd = Date.parse(item.date);
		var rd = new Date(); // dnes
		rd = new Date(rd.getFullYear(), rd.getMonth(), rd.getDate(), 0, 0, 0);


		var tme = item.date_formated.time;
		// pokud plne datum nebo pro starsi, nez dnesni
		if(this.options.full_date || dd < rd) {
			tme = item.date_formated.date + " " + tme;
		}

		var strip = $('<div>')
			.addClass(this.options.class_item)
			.append(
				$('<div>')
					.addClass(this.options.class_item_heading)
					.append( $('<span>').addClass('time').text(
						tme
					))
					.append( item.title ? '<span class="separ">|</span>' : '' )
					.append( $('<span>', {class: 'title'}).html(item.title) )
			)
			.append(
				$('<div>').addClass(this.options.class_item_content).html(item.text)
			)
			.css({ display: 'none', opacity: 0/*, position: 'relative', left: '-100%'*/ })
		;

		if (append) {
			strip.appendTo(this.options.main_container);
		} else {
			strip.prependTo(this.options.main_container);
		}

		if (last) {
			this.options.last_item_date = item.date;
		} else {
			this.options.next_item_date = item.date;
		}

		console.log("Max items: ", this.options.max_items);
		if(this.options.max_items) {
			var items = this.options.main_container.find('.'+this.options.class_item).length;
			console.log("Pocet polozek:", items);
			if(items > this.options.max_items) {
				var index = 0;
				if(!append) index = items-1;
				console.log("index:", index);
				console.log(this.options.main_container.find("."+this.options.class_item).get(index));
				$(this.options.main_container.find("."+this.options.class_item).get(index)).slideUp(function() { $(this).remove(); });
			}
		}

		strip.delay(200).slideDown(function() {
			$(this).animate({ /*left: 0, */opacity: 1 }, 500, function(){ that.put_item(items_to_process,append,last); });
		});

		this.replace_iobjects(true);
	},

	replace_iobjects: function(reload_enabled){
		var that = this;
		if (typeof _IO !== 'object' || _IO === null) return;
		$('.ihned_object').each(function(){

			var ids = this.title.match(/[^\d]+(\d+)[^\d]+(\d+)$/);//o_id: [1], iobjects.id: [2]

			if (typeof _IO._iobjData[ids[2]] !== 'object') {
				if (reload_enabled) {
					_IO.reload_iobjects_data(that.options.article, function (){ that.replace_iobjects(false); });
					return false;
				} else {
					//unexists object
					$(this).removeClass('ihned_object');
					//remove from page?
					return;
				}
			}

			var obj = _IO._iobjData[ids[2]];

			var obj_html = $('<div>').addClass('media-placeholder inserted_iobject_' + ids[2])
						.data('target',ids[2]);
			var obj_cont = $('<div>').addClass('placeholder-content')
						.data('io',ids[2])
							.append(
								$('<img>',{src: obj.preview_image.url, 'class': 'io-trigger'})
							).append(
								$('<div>').addClass('content').html('<span class="type"></span><a href="javascript:void(0);" class="title">'+ obj.name +'</a><button class="media-button io-trigger"><span></span></button>')
							);
			if (obj.type === 'gallery'){
				obj_html.addClass('type-gallery no-auto-gallery');
				obj_cont.find('.type').text('Fotogalerie');
				obj_cont.find('.media-button span').addClass('ico-gallery');
			} else if (obj.type === 'embedded_video'){
				obj_html.addClass('type-video no-auto-video');
				obj_cont.find('.type').text('Video');
				obj_cont.find('.media-button span').addClass('ico-video');
			} else if (obj.type === 'info_graphic'){
				obj_html.addClass('type-infographic no-auto-infographic');
				obj_cont.find('.type').text('Infografika');
				obj_cont.find('.media-button span').addClass('ico-infographic');
			} else if (obj.type === 'embedded_map'){
				obj_cont.find('.content').html('<iframe src="'+ obj.url +'" frameborder="0" allowfullscreen></iframe>');
			} else {
				obj_html.addClass('type-'+ obj.type +' no-auto-'+ obj.type);
				obj_cont.find('.media-button span').addClass('ico-'+ obj.type);
			}

			$(this).replaceWith(obj_html.append( obj_cont ));

			_IO.setAction(null, obj_cont);
		});
	},

	init: function(){
		var that = this;
		$(document).ready(function() {
			that.reload_items(); // kontrola pro potlaceni cache
			setInterval(function(){ that.reload_items(); }, that.options.refresh);
		});
	}
}


// analytics article info
var IHNED_meta = {
	user: {
		logged: typeof $.cookie('user__login')!=='undefined' ? true : false,
		subscriber: typeof $.cookie('user__subscriptions')!=='undefined' ? true : false,
		subscriptions: typeof $.cookie('user__subscriptions')!=='undefined' ? $.cookie('user__subscriptions') : ''
	}
};
