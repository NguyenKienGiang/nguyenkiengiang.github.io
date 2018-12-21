'use strict';

(function ($) {
"use strict";

	

	/**
   * [isMobile description]
   * @type {Object}
   */
	window.isMobile = {
		Android: function Android() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function any() {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
		}
	};
	window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
	window.windowHeight = window.innerHeight;
	window.windowWidth = window.innerWidth;

	/**
   * Match height 
   */
	$('.row-eq-height > [class*="col-"]').matchHeight();

	var myEfficientFn = debounce(function () {
		$('.row-eq-height > [class*="col-"]').matchHeight();
	}, 400);

	myEfficientFn();
	$(window).on('resize', myEfficientFn);

	// Wow js
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 100,
		mobile: false,
		live: false
	});
	$(window).on('load', function () {
		wow.init();
	});

	/**
   * [debounce description]
   * @param  {[type]} func      [description]
   * @param  {[type]} wait      [description]
   * @param  {[type]} immediate [description]
   * @return {[type]}           [description]
   */
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				    args = arguments;
			var later = function later() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
	/**
   * Countdown
   */
	$('.countdown__module').each(function () {
		var self = $(this),
			    _date = self.attr('data-date'),
			    _strf = self.html();
		self.countdown(_date, function (event) {
			self.html(event.strftime(_strf));
		}).removeClass("hide");
	});

	/**
   * Countdown Circle
   */
	$('.countdown__circle').each(function () {
		var self = $(this);

		self.TimeCircles({
			"animation": "smooth",
			"bg_width": 0.7,
			"fg_width": 0.013333333333333334,
			"circle_bg_color": "#ccc",
			"time": {
				"Days": {
					"text": "Days",
					"color": "#000",
					"show": true
				},
				"Hours": {
					"text": "Hours",
					"color": "#000",
					"show": true
				},
				"Minutes": {
					"text": "Minutes",
					"color": "#000",
					"show": true
				},
				"Seconds": {
					"text": "Seconds",
					"color": "#000",
					"show": true
				}
			}

		});
	});

	/**
  * Popup
  */
	$('[data-init="magnificPopup"]').each(function (index, el) {
		var $el = $(this);

		var magnificPopupDefault = {
			removalDelay: 500, //delay removal by X to allow out-animation
			closeOnContentClick: false,
			closeBtnInside: false,
			callbacks: {
				beforeOpen: function beforeOpen() {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.


			// Merge settings.
		};var settings = $.extend(true, magnificPopupDefault, $el.data('options'));

		$el.magnificPopup(settings);
	});

	/**
   * Swiper
   */

	function swiperSlide() {
		$('.swiper').each(function () {
			var self = $(this),
				    wrapper = $('.swiper-wrapper', self),
				    optData = eval('(' + self.attr('data-options') + ')'),
				    optDefault = {
				speed: 700,
				paginationClickable: true,
				pagination: {
					el: self.find('.swiper-pagination-custom')
				},
				navigation: {
					nextEl: self.find('.swiper-button-next-custom'),
					prevEl: self.find('.swiper-button-prev-custom')
				},
				spaceBetween: 30
			};
			options = $.extend(true, optDefault, optData);

			wrapper.children().wrap('<div class="swiper-slide"></div>');
			var swiper = new Swiper(self, options);

			function thumbnails(selector) {

				if (selector.length > 0) {
					var wrapperThumbs = selector.children('.swiper-wrapper'),
						    optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
						    optDefaultThumbs = {
						spaceBetween: 10,
						centeredSlides: true,
						slidesPerView: 3,
						touchRatio: 0.3,
						slideToClickedSlide: true,
						pagination: {
							el: selector.find('.swiper-pagination-custom')
						},
						navigation: {
							nextEl: selector.find('.swiper-button-next-custom'),
							prevEl: selector.find('.swiper-button-prev-custom')
						},
						loop: true,
						loopedSlides: 4
					},
						    optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
					wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
					var swiperThumbs = new Swiper(selector, optionsThumbs);
					swiper.controller.control = swiperThumbs;
					swiperThumbs.controller.control = swiper;
				}
			}
			thumbnails(self.next('.swiper-thumbnails'));
		});
	}

	$(window).on('load', function () {
		swiperSlide();
	});

	function galleryItem() {
		function hoverdir() {
			var module = $('.gallery-item');

			module.hoverdir({
				speed: 250,
				hoverElem: '.gallery-item__body'
			});
		}
		hoverdir();

		function popupGallery() {
			var item = $('.gallery-item');
			item.magnificPopup({
				delegate: 'a',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				removalDelay: 500, //delay removal by X to allow out-animation
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1], // Will preload 0 - before current, and 1 after the current image,
					tCounter: '<span class="mfp-counter"><a>%curr%</a> / %total%</span>' // markup of counter
				},
				image: {
					markup: '<div class="mfp-figure">' + '<div class="mfp-title"></div>' + '<div class="mfp-image">' + '<div class="mfp-img"></div>' + '</div>' + '<div class="mfp-counter"></div>' + '</div>', //

					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function titleSrc(item) {
						var title = '<span>' + item.el.find('.gallery-item__cat').text() + '</span>' + '<p>' + item.el.find('.gallery-item__title').text() + '</p>';
						return title;
					}
				},
				showCloseBtn: true,
				closeOnContentClick: false,
				closeBtnInside: false,
				callbacks: {
					beforeOpen: function beforeOpen() {
						this.st.mainClass = this.st.el.attr('data-effect');
					},

					buildControls: function buildControls() {
						// re-appends controls inside the main container
						this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
					}
				},
				midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			});
		}
		popupGallery();
	}
	galleryItem();

	function gridJs() {
		/**
    * Masonry
    */
		$('.grid__inner').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer'
		});
		/**
    * grid css
    */
		function work() {
			$('.grid-css').each(function () {
				var workWrapper = $(this),
					    workContainer = $('.grid__inner', workWrapper),
					    filters = $('.filter', workWrapper),
					    filterCurrent = $('.current a', filters),
					    filterLiCurrent = $('.current', filters),
					    duration = 0.3;
				workContainer.imagesLoaded(function () {
					workContainer.isotope({
						layoutMode: 'masonry',
						itemSelector: '.grid-item',
						transitionDuration: duration + 's',
						masonry: {
							columnWidth: '.grid-sizer'
						}
						// hiddenStyle: {},
						// visibleStyle: {}
					});
				});
				filters.on('click', 'a', function (e) {
					e.preventDefault();
					var $el = $(this);
					var selector = $el.attr('data-filter');
					filters.find('.current').removeClass('current');
					$el.parent().addClass('current');
					workContainer.isotope({
						filter: selector
					});
				});
			});
		}
		work();
		/**
    * Match height 
    */
		$('.grid__inner > .grid-item.normal').matchHeight();
		var fixheight = debounce(function () {
			$('.grid__inner > .grid-item.normal').matchHeight();
		}, 400);
		fixheight();
		$(window).on('resize', fixheight);
	}

	$(window).on('load', function () {
		// fix dev
		gridJs();
	}); // fix dev


	/**
  * Popup
  */
	$('[data-init="magnificPopup"]').each(function (index, el) {
		var $el = $(this);

		var magnificPopupDefault = {
			removalDelay: 500, //delay removal by X to allow out-animation
			closeOnContentClick: false,
			closeBtnInside: false,
			callbacks: {
				beforeOpen: function beforeOpen() {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.


			// Merge settings.
		};var settings = $.extend(true, magnificPopupDefault, $el.data('options'));

		$el.magnificPopup(settings);
	});

	/**
   * Swiper
   */
	function swiperSlides() {
		$('.swiper__module').each(function () {
			var self = $(this),
				    wrapper = $('.swiper-wrapper', self),
				    optData = eval('(' + self.attr('data-options') + ')'),
				    optDefault = {
				effect: 'slide',
				paginationClickable: true,
				pagination: {
					el: self.find('.swiper-pagination-custom'),
					clickable: true
				},
				navigation: {
					nextEl: self.find('.swiper-button-next-custom'),
					prevEl: self.find('.swiper-button-prev-custom')
				},
				spaceBetween: 30
			},
				    options = $.extend(optDefault, optData);
			wrapper.children().wrap('<div class="swiper-slide"></div>');
			var swiper = new Swiper(self, options);

			function thumbnails(selector) {

				if (selector.length > 0) {
					var wrapperThumbs = selector.children('.swiper-wrapper'),
						    optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
						    optDefaultThumbs = {
						spaceBetween: 10,
						centeredSlides: true,
						slidesPerView: 3,
						touchRatio: 0.3,
						slideToClickedSlide: true,
						pagination: {
							el: selector.find('.swiper-pagination-custom')
						},
						navigation: {
							nextEl: selector.find('.swiper-button-next-custom'),
							prevEl: selector.find('.swiper-button-prev-custom')
						}
					},
						    optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
					wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
					var swiperThumbs = new Swiper(selector, optionsThumbs);
					swiper.controller.control = swiperThumbs;
					swiperThumbs.controller.control = swiper;
				}
			}
			thumbnails(self.next('.swiper-thumbnails__module'));
		});
	}

	$(window).on('load', function () {
		// fix dev
		swiperSlides();
	}); // fix dev
	// footer.js

	$(".backtotop").click(function () {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	function dropdowMenu() {
		$('.page-nav').dropdownMenu({
			menuClass: 'page-menu',
			breakpoint: 1200,
			toggleClass: 'active',
			classButtonToggle: 'navbar-toggle',
			subMenu: {
				class: 'sub-menu',
				parentClass: 'menu-item-has-children',
				toggleClass: 'active'
			}
		});
	};
	dropdowMenu();

	function header() {
		var header = $('.header');

		function handleFix() {
			var fixheader = 'header__fixheight';
			var appendFix = debounce(function () {
				if (header.length) {

					var hHeader = header.outerHeight();
					var headerFix = '<div class="fixheight-header"></div>';

					if (header.hasClass(fixheader)) {
						if ($('.fixheight-header').length === 0) header.closest('.page-wrap').prepend(headerFix);
						$('.fixheight-header').css('height', hHeader + 'px');
					}
				}
			}, 300);
			appendFix();
			$(window).on('resize', appendFix);
			// $(window).on('scroll', appendFix);
		}
		handleFix();

		function handleScroll() {
			var scroll = function scroll() {
				var scrollTop = $(window).scrollTop();
				var bgClass = 'header__bg';
				var fixedheader = 'header__fixedheader';
				var scrollOffset = header.offset().top + header.outerHeight();

				if (header.hasClass(fixedheader)) {
					if (scrollTop > scrollOffset) {
						header.addClass(bgClass);
					} else {
						header.removeClass(bgClass);
					}
				} else {
					if (scrollTop > 30) {
						header.addClass(bgClass);
					} else {
						header.removeClass(bgClass);
					}
				}
			};
			$(window).on('scroll', scroll);
		}
		handleScroll();
	}
	header();

	if ($(window).scrollTop() > 0) {
		$('.header').addClass('header__bg');
	}

	$(window).on('load', function () {});

	$(".header__iconsearch").click(function () {
		$(".header__box").addClass("show");
		$('.header__click').show();
	});

	$('.header__click').click(function () {
		$(".header__box").removeClass("show");
		$('.header__click').hide();
	});

	$(".header__iconclose").click(function () {
		$(".header__box").removeClass("show");
		$('.header__click').hide();
	});

	var lastScroll = 0;
	$(window).scroll(function (event) {
		var x = $(window).scrollTop();
		var st = $(this).scrollTop();
		if (st > lastScroll) {
			$('header').addClass('header__bg');
			$('header').removeClass('header__bg__white');
			$('.header__transparent').css({
				'top': '-100px'
			});
			$(".header__box").removeClass("show");
			$('.header__click').hide();
		} else if (x + st == 0) {
			$('header').removeClass('header__bg__white');
		} else {
			$('header').removeClass('header__bg');
			$('header').addClass('header__bg__white');
			$('.header__transparent').css({
				'top': '0px'
			});
		}
		lastScroll = st;
	});

	// $(window).on('load', function() {
	//     // A $( document ).ready() block.
	//     $( document ).ready(function() {
	//         setTimeout(function(){
	//             var x = $('.header__fixedheader').outerHeight();
	//             $('.header__fixedheader').after( "<div class='header-block'></div>" )
	//             $('.header-block').css({
	//                 'height': x
	//             })
	//         }, 500);
	//     });
	// });
	// hero js

	if ($(window).width() < 767) {
		$(".hero__icon_scroll").click(function () {
			var cls = $(this).closest(".hero").next().offset().top;
			var header = $('header').outerHeight();
			var sub = cls - header + 20;
			$("html, body").animate({ scrollTop: sub }, "slow");
		});
	} else {
		$(".hero__icon_scroll").click(function () {
			var cls = $(this).closest(".hero").next().offset().top + 5;
			$("html, body").animate({ scrollTop: cls }, "slow");
		});
	}

	$('.hero').find('.swiper-button-custom').addClass('container');

	$('.animation-wrapper').each(function () {
		var self = $(this),
			    item = self.find('.animation-item');

		var getdate = self.attr('data-aos');

		self.mouseover(function () {
			item.addClass('animated ' + getdate);
		});

		self.mouseleave(function () {
			item.removeClass('animated ' + getdate);
		});
	});
	
})(jQuery);