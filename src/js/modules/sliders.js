import Swiper, { Navigation, Pagination, EffectFade, Thumbs } from 'swiper';

export default function sliders() {
	if (
		document.querySelector('.reviews-slider') &&
		document.querySelector('.reviews-slider .swiper-wrapper')?.children.length
	) {
		new Swiper('.reviews-slider', {
			modules: [Navigation, Pagination],
			on: {
				init() {
					if (document.querySelector('.reviews-slider-wrapper')) {
						document.querySelector('.reviews-slider-wrapper').classList.remove('style-2');
					}
				},
			},
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.reviews-slider-wrapper .slider-btn--prev',
				nextEl: '.reviews-slider-wrapper .slider-btn--next',
			},
			forceToAxis: true,
			speed: 600,
			breakpoints: {
				576: { slidesPerView: 'auto', spaceBetween: 30, autoHeight: false },
				415: { slidesPerView: 1, spaceBetween: 20, autoHeight: true },
				360: { slidesPerView: 1, spaceBetween: 20, autoHeight: true },
				300: { slidesPerView: 1, spaceBetween: 15, autoHeight: true },
			},
		});
	} else if (document.querySelector('.reviews-slider-wrapper')) {
		document.querySelector('.reviews-slider-wrapper').classList.remove('style-2');
	}

	if (
		document.querySelector('.portfolio-details-slider') &&
		document.querySelector('.portfolio-details-slider .swiper-wrapper')?.children.length &&
		document.querySelector('.portfolio-details-carousel') &&
		document.querySelector('.portfolio-details-carousel .swiper-wrapper')?.children.length
	) {
		function carouselStyles() {
			if (document.querySelector('.portfolio-details-carousel')) {
				let itemTotalHeight = 0;

				const carousel = document.querySelector('.portfolio-details-carousel');

				document.querySelectorAll('.portfolio-details-carousel .list-img-2').forEach((el) => {
					itemTotalHeight += el.offsetHeight + 10;

					if (itemTotalHeight < carousel.clientHeight) {
						carousel.classList.add('portfolio-details-carousel-style-1');
					}
					if (itemTotalHeight >= carousel.clientHeight) {
						carousel.classList.remove('portfolio-details-carousel-style-1');
					}
				});

				carousel.style.opacity = 1;
			}
		}

		const carousel = new Swiper('.portfolio-details-carousel', {
			modules: [Navigation],
			loop: true,
			spaceBetween: 20,
			slidesPerView: 3,
			centeredSlides: true,
			centeredSlidesBounds: true,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: 'vertical',
			navigation: {
				prevEl: '.portfolio-details-carousel-wrapper .slider-btn--prev',
				nextEl: '.portfolio-details-carousel-wrapper .slider-btn--next',
			},
			on: {
				init(el) {
					setTimeout(() => {
						carouselStyles();
					}, 500);
				},
				resize() {
					setTimeout(() => {
						carouselStyles();
					}, 500);
				},
			},
			breakpoints: {
				576: { spaceBetween: 15 },
				360: { spaceBetween: 10 },
				300: { spaceBetween: 10 },
			},
		});

		new Swiper('.portfolio-details-slider', {
			modules: [EffectFade, Thumbs],
			setWrapperSize: true,
			loop: true,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventInteractionOnTransition: true,
			speed: 600,
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			thumbs: {
				swiper: carousel,
			},
			on: {
				init() {
					if (document.querySelector('.portfolio-details-slider-wrapper')) {
						document
							.querySelector('.portfolio-details-slider-wrapper')
							.classList.remove('style-3');
					}
				},
			},
		});
	} else if (document.querySelector('.portfolio-details-slider-wrapper')) {
		document.querySelector('.portfolio-details-slider-wrapper').classList.remove('style-3');
	}
}
