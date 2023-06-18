import sliders from './sliders';

export default function lightbox({ container, selector, plugins, speed, zoom, download, mode }) {
	if (document.querySelector(container)) {
		if (document.querySelector('.desktop-user-agent')) {
			document.querySelector(container).addEventListener('lgInit', (event) => {
				sliders();
			});

			lightGallery(document.querySelector(container), {
				// licenseKey: '0000-0000-000-0000',
				selector,
				plugins,
				speed,
				zoom,
				download,
				mode,
				// counter: false,
			});
		}
		if (document.querySelector('.mobile-user-agent')) {
			sliders();
		}
	} else {
		sliders();
	}
}
