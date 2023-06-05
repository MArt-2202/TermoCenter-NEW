export default function blocksStyles() {
	if (document.querySelector('.map-wrapper')) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.dataset.src) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
									<iframe src="${entry.target.dataset.src}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
								`
						);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
		document.querySelectorAll('.map-wrapper').forEach((item) => observer.observe(item));
	}

	if (document.querySelector('.video-wrapper')) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.dataset.youtube) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<iframe src="${entry.target.dataset.youtube}" title="YouTube video player"
								allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen></iframe>
							`
						);
						observer.unobserve(entry.target);
					}
					if (
						entry.isIntersecting &&
						entry.target.dataset.video &&
						entry.target.dataset.poster &&
						entry.target.dataset.controls === 'yes'
					) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<video controls muted playsinline poster="${entry.target.dataset.poster}">
									<source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' src="${entry.target.dataset.video}">
								</video>
							`
						);
						observer.unobserve(entry.target);
					}
					if (
						entry.isIntersecting &&
						entry.target.dataset.video &&
						entry.target.dataset.poster &&
						entry.target.dataset.controls === 'no'
					) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<video autoplay loop muted playsinline poster="${entry.target.dataset.poster}">
									<source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' src="${entry.target.dataset.video}">
								</video>
							`
						);
						observer.unobserve(entry.target);
					}
					if (
						(entry.isIntersecting &&
							entry.target.dataset.video &&
							!entry.target.dataset.poster) ||
						entry.target.dataset.poster === ''
					) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<video controls muted playsinline>
									<source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' src="${entry.target.dataset.video}">
								</video>
							`
						);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
		document.querySelectorAll('.video-wrapper').forEach((item) => observer.observe(item));
	}

	if (document.querySelector('[data-decor]')) {
		document.querySelectorAll('[data-decor]').forEach((el) => {
			const index = +el.dataset.decor;

			if (el.textContent !== '') {
				if (index > 0) {
					el.innerHTML = `${el.textContent.slice(
						0,
						index
					)}<span class="decor-title">${el.textContent.slice(
						index,
						index + 1
					)}</span>${el.textContent.slice(index + 1)}`;
				} else if (index === 0) {
					el.innerHTML = `<span class="decor-title">${el.textContent.slice(
						index,
						index + 1
					)}</span>${el.textContent.slice(index + 1)}`;
				}
			}
		});
	}
}
