function _PAYMENT(settings) {
	var defaults = {
		api: '/site/api/cs/payments/',
		logged: false,
		initPayground: function() { return $("#payground"); },
		hooks: {}
	};

	this.email_reg = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

	this.cfg = $.extend({}, defaults, settings);
	this.wrapper = null;

};

_PAYMENT.prototype = {

	init: function(ev) {
		this.wrapper = this.cfg.initPayground();
		this._set_article_id(
			this.wrapper.find('.article_id').val()
		);

		var email = this.wrapper.find('input[name="email"]');
		email.bind('focusout', $.proxy(function(e) {
				var t = $(e.currentTarget);
				t.parent().removeClass('error invalid used');
				var val = t.val();
				if(!val || !this.email_reg.test(val)) {
					if(!t.parent().hasClass('invalid')) t.parent().addClass('error invalid');
					return;
				}
				t.parent().removeClass('error invalid used');
		}, this));

		this.wrapper.find('.why-email-trigger').click($.proxy(function(e) {
			this.wrapper.find('.why-email.'+(this.cfg.logged ? 'for-logged-users' : 'for-new-users')).show();
			$(e.currentTarget).remove();
		}, this));

		$.ajax({
			type: "GET",
			url: this.cfg.api+"info",
			data: { product: $(ev.currentTarget).data("product"), article_id: $(ev.currentTarget).data("article") },
			dataType: 'json',
		}).done($.proxy(this.start, this));

	},

	start: function(data) {
		var email = this.wrapper.find('input[name="email"]');

		this._set_product_id(data.product.id);
		if(data.email) {
			email.val(data.email);
			email.parent().removeClass('error invalid used');
		}

		this.cfg.logged = data.logged || false;

		this.wrapper.find('.method-wrapper .list').empty();

		var card = this.wrapper.find('.method-card .list');
		card.hide();
		if(data.methods.card) {
			$("<img>", { 'class': 'cardType pay-button pay-action', src: data.methods.card.imageUrl, title: 'Visa / MasterCard / Maestro' })
				.data({ type: 'card' })
				.appendTo(card)
			;
			if(data.methods.card.tokens) {

				var cards = [];

				for(var tok_key in data.methods.card.tokens) {
					var tok = data.methods.card.tokens[tok_key];
					cards.push($('<tr>', { id: "token-"+tok_key })
						.append($('<td>', { 'class': 'cardBrand'}).append($("<img>", { src: tok.cardBrandImage })))
						.append($('<td>', { 'class': 'cardNumber'}).html(tok.cardNumberMasked))
						.append($('<td>', { 'class': 'cardExpire'}).html(tok.cardExpirationMonth + "/" + tok.cardExpirationYear))
						.append($('<td>', { 'class': 'cardActions'})
							.append($('<a>', { 'class': 'saved_card_action action_use pay-action btn btn-default', href: "javascript:;", title: "Zaplatit touto uloženou kartou" }).data({ type: 'card', value: tok_key }).html("Zaplatit"))
							.append(
									$('<a>', { 'class': 'saved_card_action action_delete btn btn-default', href: "javascript:;", title: "Odstranit uloženou kartu" })
										.data({ value: tok_key })
										.html("&times;")
										.click($.proxy(this.remove_token, this))
							)
						)
					);

				}

				$("<div>", { 'class': "saved_cards" })
					.append($("<table>").append(cards))
					.appendTo(card)
				;

			}
			card.show();
		}

		var online = this.wrapper.find('.method-online .list');
		online.hide();

		if(data.methods.online) {

			for(var type_key in data.methods.online) {
				var type = data.methods.online[type_key];
				$('<img>', { src: type.brandImageUrl, title: type.name, 'class': 'onlineType pay-button pay-action' })
					.data({ type: 'online', value: type.value })
					.appendTo(online)
				;
			}
			online.show();
		}

		$.proxy(this._fire_hook, this, ['afterStart', data]);

		this.wrapper.find('.pay-action').click($.proxy(this.select_payment_type, this));
		this.wrapper.find('.visible-on-load, .hidden-on-load').removeClass('visible-on-load hidden-on-load');
	},

	select_payment_type: function(e) {
		var orig = $(e.currentTarget);
		var email = this.wrapper.find('input[name="email"]');
		var err = false;

		// rychla kontrola na email
		if (!this.email_reg.test(email.val())) {
			email.parent().addClass('error invalid');
			err = true;
		}
		if(err) return;

		email.parent().removeClass('error invalid used');

		this.hide_error_dialog();
		this.show_wait_dialog();

		var data = {
			type: orig.data('type'),
			value: orig.data('value'),
			token: orig.data('token'),
			article_id: this.articleId,
			product: this.productId,
			email: email.val()
		};

		$.ajax({
			url: this.cfg.api+'check',
			type: 'post',
			data: data,
			dataType: 'json'
		}).done($.proxy(this.handle_payment, this));
	},

	handle_payment: function(response) {
		window.PayU = undefined; // nutny reset objektu

		if(response.status == true) {

			this.show_wait_dialog();

			switch(response.type) {
				case 'card': {
						if(!response.widget || !response.token) return;

						this.paymentToken = response.token;

						window._payu_success = $.proxy(this.callback_card_ok, this);

						var id = 'gate'+Math.ceil(Math.random()*100000);
						var trg = $('<a>', { id: id });
						var gate = $(response.widget);
						gate
							.attr("pay-button", "#"+id)
							.attr('success-callback', '_payu_success')
						;

						this.wrapper.find('.gate_container').empty().append(trg, gate),
						this.trigger_gate();
						break;
				}

				case "stored_card":
				case 'online': {

					$.ajax({
						url: this.cfg.api+"create_order",
						type: 'POST',
						data: response.pay_data,
						dataType: 'json'
					}).done($.proxy(this.create_order_callback, this));

				}
			}
		} else {
			if(response.errors.email != undefined) {
				var email = this.wrapper.find('input[name="email"]');
				email.parent().addClass("error "+ response.errors.email)
			}
			this.hide_wait_dialog();
		}

	},

	trigger_gate: function() {

		if(window.PayU == undefined) {
			setTimeout($.proxy(this.trigger_gate, this), 150);
			return;
		}

		setTimeout($.proxy(function() {
			this.wrapper.find('.gate_container > a').each(function() { this.click(); });
			this.hide_wait_dialog();
			$("#payuFrame").parent().css({ zIndex: 999999999999 });
		}, this), 100);

	},

	callback_card_ok: function(data) {
		data.token = this.paymentToken;
		window._payu_success = undefined;
		this.show_wait_dialog();
		$.ajax({
			url: this.cfg.api+"create_order",
			type: 'POST',
			data: data,
			dataType: 'json'
		}).done($.proxy(this.create_order_callback, this));
	},

	create_order_callback: function(data) {
		if(data.status) {
			if(data.redirect) window.location.href = data.redirect;
		} else {
			this.hide_wait_dialog();
			this.show_error_dialog(data.errors);
			// console.log("Error occurked :)", data);
		}
	},

	remove_token: function(e) {
		$.ajax({
			url: this.cfg.api+"remove_token",
			type: 'POST',
			data: { token: $(e.currentTarget).data('value') },
			dataType: 'json'
		}).done(function(data) {
			$(".saved_cards .token-status").remove();
			if(data.status) {

				$("<tr>", { 'class': "token-delete-success token-status" })
					.append($('<td>', { colspan: 4}).html("<span>&check;</span> Karta smazána."))
					.insertAfter($("#token-"+data.token))
					.fadeIn(function() { $(this).delay(1500).fadeOut(function() { $(this).remove(); }); })
				;
				$("#token-"+data.token).remove();
			} else {

				var sts = $("<tr>", { 'class': "token-delete-fail token-status" })
					.append($('<td>', { colspan: 4}).html("<span>&cross;</span> Kartu se nepodaøilo smazat."))
					.fadeIn()
				;

				if(data.token) {
					sts.insertAfter($("#token-"+data.token));
				} else {
					$(".saved_cards tbody").append(sts);
				}
			}
		});
	},

	_fire_hook: function(hook_name, data) {

		if(this.cfg.hooks[hook_name] == undefined || !this.cfg.hooks[hook_name].length) return;
		var hooks = this.cfg.hooks[hook_name];
		if(typeof hooks == 'function') hooks = [hooks];
		for(var a in hooks) {
			if(typeof hooks[a] != 'function') continue;
			$.proxy(hooks[a], this, data);
		}

	},

	show_wait_dialog: function() {
		this.wrapper.find('.waitforit').show();
	},

	hide_wait_dialog: function() {
		this.wrapper.find('.waitforit').hide();
	},

	show_error_dialog: function(errs) {
		var errs = errs || [];
		var ed = this.wrapper.find('.payment-error');
		$(errs).each(function(itm) { ed.find('.'+itm).show(); });
		ed.show();
	},

	hide_error_dialog: function() {
		var ed = this.wrapper.find('.payment-error');
		ed.hide();
		ed.find("span").hide();
	},


	error: function() {
		this.show_error_dialog();
		console.log("PAYMENT ERROR");
	},

	_set_article_id: function(article_id) {
		this.articleId = article_id;
	},

	_set_product_id: function(product_id) {
		this.productId = product_id;
	}

};
