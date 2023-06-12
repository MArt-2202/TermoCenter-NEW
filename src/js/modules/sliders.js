import Swiper, { Navigation, Pagination } from 'swiper';

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
}
