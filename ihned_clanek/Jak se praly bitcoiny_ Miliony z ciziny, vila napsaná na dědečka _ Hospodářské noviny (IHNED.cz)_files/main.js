//<SAS
var _saseco = new _SAS_ECO_PARAMS();

window._ecohec = {};
window._ecohec.renderPrAnnotation = function(pr){
	if (typeof pr !== 'object' || pr === null) return;

	pr.url = pr.url || ''; pr.title = pr.title || ''; pr.perex = pr.perex || '';
	//var title_length = pr.title.length;
	var perex_length = 145;
	/*if (title_length>45) {
		if (title_length>82) {
			perex_length = 50;
		} else {
			perex_length = 100;
		}
	}*/
	if (pr.perex.length > perex_length) {
		pr.perex = pr.perex.substring(0,perex_length);
		perex_length = pr.perex.lastIndexOf(' ');
		if (perex_length>0) pr.perex = pr.perex.substring(0,perex_length) + '...';
	}

	var htm = [];
	htm.push(pr.commentTop || '');
	htm.push('<div class="ow-default pr-article border-before-simple cf"><article>');

	if (pr.image && pr.image['default'] && pr.image['default'].url) {
		htm.push('<div class="article-media"><a href="');
		htm.push(pr.url);
		htm.push('"><img alt="" src="');
		htm.push(pr.image['default'].url);
		htm.push('"></a></div>');
	}

	htm.push('<h2 class="article-title"><a href="');
	htm.push(pr.url);
	htm.push('">');
	htm.push(pr.title);
	htm.push('</a></h2><div class="article-perex"><span class="lbl">Komerční prezentace</span><span>');
	htm.push(pr.perex);
	htm.push('</span></div></article></div>');
	htm.push(pr.commentBottom || '');

	$('#a-pr-'+pr.pos).html(htm.join(''));
};
//SAS>



function carousel_init(selector) {
	if (typeof selector === 'undefined') selector = '.carousel';
	$(selector).each(function () {
		var target = $(this);
		var content = target.children('.carousel-items');
		var items = content.children();
		var prev = target.children('.carousel-move.prev');
		var next = target.children('.carousel-move.next');

		var itemsCount = items.length;
		if (itemsCount === 0) { target.hide(); return; }
		content.css('width', (100*itemsCount) + '%').css('display','flex').data('activeItem',1);
		prev.css('opacity','0.5');

		prev.click(function(e){
			e.preventDefault();
			var item = content.data('activeItem');
			if (item === 1) return;
			if (item === itemsCount) next.css('opacity','1');

			item--; content.data('activeItem', item);
			content.animate({ left: '+=100%' });

			if (item === 1) prev.css('opacity','0.5');
			$(this).blur();
		});
		next.click(function(e){
			e.preventDefault();
			var item = content.data('activeItem');
			if (item === itemsCount) return;
			if (item === 1) prev.css('opacity','1');

			item++; content.data('activeItem', item);
			content.animate({ left: '-=100%' });

			if (item === itemsCount) next.css('opacity','0.5');
			$(this).blur();
		});
	});
}

var onScrollResponse;

var _IO = new IObjects({galleryItemsWraps: false});
var iobjects;
var pocket_enabled = true;

//<LOGIN
var logout_callback = function() {
	pulldown._close();
	location.reload(true);
};

ecoLogin.updateUserInfoCallback.push(function(el) {

	var target = $('#user_info');
	if(el.logged) {
		target.empty().addClass('logged');
		if(el.user_image) {
			target.append($('<img>').attr('src', el.user_image));
		}
		target.append(el.user_name);

		if (!$('#hdr-user-logout').length) target.parent().append('<a href="javascript:;" onclick="return ecoLogin.userLogout(logout_callback);" id="hdr-user-logout">Odhlásit se</a>');

		if (el.hasHN) {
			$('#hdr-hn-offer').hide();
			$('.article-body .social-buttons.feedback-after').after('<div class="user-article-feedback" style="margin-top: 24px;"><p>Nalezli jste v článku chybu? Nebo máte zajímavou informaci, která v článku chybí? <a href="#" onclick="this.href=\'mai\'+\'lto:hn@economia.cz\'">Napište redakci</a> nebo přímo <a href="https://ucet.ihned.cz/napiste-sefredaktorovi/">šéfredaktorovi</a>. Děkujeme.</p>');
		} else {
			$('#hdr-hn-offer').after('&nbsp; &bull; &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" style="top: 3px; position: relative;"><path fill="#ff0" stroke="#000" d="M8.5 1 L16 15.5 L1 15.5 Z M8 7.5 L9 7.5 L8.5 12 Z M8.5 13 L8.5 14"></path></svg> <a href="https://ucet.ihned.cz/predplatne/" style="font-size: 11px;" title="Pro tento web nemáte aktivní předplatné">NEMÁTE PŘEDPLACENO</a>');
		}

		if (ecoLogin.hasSomeSubscription()) {
			$('body').append($('<script>',{ src: '//ihned.cz/js/v2/pocket.min.js?190115', charset: 'UTF-8'}));
		}
	} else {
		$('#hdr-user-logout').remove();
		target.removeClass('logged').html('Přihlaste se');
	}
	target.parent().fadeIn(500);
});
//LOGIN>


/* a settings */
function check_enabled_positions(){
	if (window.innerWidth > 1279) {
		_saseco.targets.device = 'd';
		_saseco.enabled_positions = ['a-leader','a-megaboard','a-pr-1','a-pr-2',
						'a-halfpage-1','a-halfpage-2',
						'a-wallpaper-1','a-wallpaper-2',
						'a-halfpage-3','a-halfpage-4','a-halfpage-5',
						'a-wallpaper-3','a-wallpaper-4','a-wallpaper-5',
						'a-commercial-1'];
	} else if (window.innerWidth > 1023) {
		_saseco.targets.device = 'd';
		_saseco.enabled_positions = ['a-leader','a-megaboard','a-pr-1','a-pr-2',
						'a-halfpage-1','a-halfpage-2',
						'a-wallpaper-1','a-wallpaper-2',
						'a-halfpage-3','a-halfpage-4','a-halfpage-5',
						'a-wallpaper-3','a-wallpaper-4','a-wallpaper-5',
						'a-commercial-1'];
	} else {
		_saseco.targets.device = 'm';
		_saseco.enabled_positions = ['a-strip-1','a-strip-2','a-pr-1','a-pr-2',
						'a-mediumrectangle-1','a-mediumrectangle-2','a-mediumrectangle-3','a-mediumrectangle-4','a-mediumrectangle-5'];
	}
}
check_enabled_positions();


$(document).ready(function() {
	ecoLogin.updateUserInfo(); // detekce prihlaseneho uzivatele

	//sticky header
	window.lastScrollTop = 0;
	window.header = {
		obj: $('header'),
		sticky: false,
		visible: false,
		effectComplete: true,
		height: 0,
		offsetTop: 0,
		afterTop: 0,
		resize: function(){
			if (window.header.sticky) {
				window.header.obj.fadeIn(0);
				window.header.obj.removeClass('sticky');
				window.header.obj.parent().css('padding-top','0');
			}

			window.header.height = window.header.obj.outerHeight();
			window.header.offsetTop = window.header.obj.offset();
			window.header.offsetTop = window.header.offsetTop.top;
			window.header.afterTop = window.header.offsetTop + window.header.height - $('.menu').outerHeight() + 1;

			if (window.header.sticky) {
				window.header.obj.parent().css('padding-top',window.header.height+'px');
				window.header.obj.addClass('sticky');
			}
		}
	};
	window.header.resize();

	$(window).bind("scroll.menusticky", function() {
		var top = $(window).scrollTop();
		if (top > window.header.afterTop) {
			if (!window.header.sticky){
				var hdrtop = window.header.obj.offset();
				if (window.header.offsetTop !== hdrtop.top) { window.header.resize(); return; }

				window.header.sticky = true;
				window.header.obj.parent().css('padding-top',window.header.height+'px');
				window.header.obj.addClass('sticky');
			}
			if (window.lastScrollTop > top) {
				if (!window.header.visible && window.header.effectComplete) {
						window.header.effectComplete = false;
					window.header.visible = true;
					window.header.obj.fadeIn(500,function(){
						window.header.effectComplete = true;
					});
				}
			} else {
				if (window.header.visible && window.header.effectComplete) {
						window.header.effectComplete = false;
					window.header.visible = false;
					window.header.obj.fadeOut(500,function(){
						window.header.effectComplete = true;
					});
				}
			}
		} else if (window.header.sticky) {
			window.header.obj.fadeIn(0);
			window.header.obj.removeClass('sticky');
			window.header.obj.parent().css('padding-top','0');
			window.header.sticky = false;
		}
		window.lastScrollTop = top;
	}).resize(function(){
		window.header.resize();
	});



	if ($('.onscroll-response').length) {
		onScrollResponse = new _OnScrollResponse();
		$('.onscroll-response').each(function () {
			var settings = $(this).data('onscroll-response');
			if (settings && typeof settings === 'object' && settings.type) {
				settings.target = $(this);
				onScrollResponse.parts[settings.type].push(settings);
			}
		});

		if (onScrollResponse.partsCount) {
			$(window).on('scroll', function() { onScrollResponse.response(); });
			$(window).on('resize', function() { onScrollResponse.reinit(); });
		}
	}

	$('.trigger-next-articles').click(function(e) {
		e.preventDefault();
		var button = $(this);
		if (button.data('in-progress')) return;
		button.data('in-progress','1').addClass('in-progress').blur();
		var target = $('#' + button.data('target-id'));
		var url = button.data('url');
		var amount = parseInt(button.data('amount')) || 10;
		var articles_from = button.data('from') ? parseInt(button.data('from'),10) : 0;
		$.ajax({
			url: url + '&article[from]=' + articles_from+'&article[max_amount]='+amount,
		}).done(function(data) {
			button.data('in-progress','').removeClass('in-progress');
			if (data.length < 50) button.remove();
			button.data('from',(articles_from + amount));
			target.append(data);
		});
	});

	if(iobjects !== undefined) {
		_IO.addIobjectsData(iobjects);
	}

	if ($('.detail-media-content').length) {
		$('.detail-media-content .media-item').each(function() {
			var target = $(this).data('target');
			if($('.inserted_iobject_'+target).length) $(this).remove();
		});
		if (!$('.detail-media-content .media-item').length) $('.detail-media-content').remove();
	}

	_IO.initEntrypoints();

	if(typeof primaryObject === 'object') {
		_IO.show(primaryObject.id, primaryObject.options);
	}

	if(typeof online_report === 'object') { online_report.replace_iobjects(); }

	if (ppc_1_enabled) {
		$('.a-wrapper:not(.jobs):not(.pr)').append('<span>&nbsp;| <a href="https://plus.ihned.cz/?utm_source=ihned&utm_medium=adblk&utm_term=economia-weby&utm_campaign=viteze">Předplatitelé mají web bez reklam.</a></span>');
		$('.a-wrapper > span').css({ "font-size": "12px", "float": "right"});
	}
});
