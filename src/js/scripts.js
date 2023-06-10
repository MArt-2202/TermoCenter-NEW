'use strict';

import debounce from './modules/debounce';
import blocksStyles from './modules/blocksStyles';
import blockPosition from './modules/blockPosition';
import lightbox from './modules/lightbox';
import masketInput from './modules/masketInput';
import sendFormData from './modules/sendFormData';

if ('ontouchstart' in document.documentElement) {
	document.body.classList.add('touchdevice');
}

function isMobile(agent) {
	if (agent === void 0) agent = navigator.userAgent;

	return /Android|iPhone|iPad|iPod/i.test(agent);
}

if (isMobile()) {
	document.body.classList.remove('desktop-user-agent');
	document.body.classList.add('mobile-user-agent');
} else {
	document.body.classList.remove('mobile-user-agent');
	document.body.classList.add('desktop-user-agent');
}

document.addEventListener('DOMContentLoaded', () => {
	masketInput();
	debounce(function () {
		blockPosition();
		blocksStyles();
	}, 200);
	lightbox({
		container: '#portfolio-lightbox',
		selector: '.portfolio-lightbox__item',
		plugins: [lgZoom],
		speed: 500,
		zoom: true,
		download: false,
		mode: 'lg-fade',
	});
	lightbox({
		container: '.product-details__main',
		selector: '.product-details__img',
		plugins: [lgZoom],
		speed: 500,
		zoom: true,
		download: false,
		mode: 'lg-fade',
	});
	sendFormData({
		closeBtn: '#order-form__close-btn',
		hiddenNodes: '.order-form__content',
		hasFormMessage: true,
		formMessageNode: '.form__message',
		formWrapper: '#order-form',
		formSubmitBtn: '#order-form__submit',
		dataAttr: '[data-key]',
		requiredSelector: '[required]',
		requiredClass: 'has-required',
		dataModal: '',
	});
}); // END READY

window.addEventListener('resize', () => {
	debounce(function () {
		blockPosition();
	}, 200);
});

window.addEventListener('load', () => {});
