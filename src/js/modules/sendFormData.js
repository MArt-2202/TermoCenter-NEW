export default function sendFormData({
	closeBtn,
	hiddenNodes,
	hasFormMessage,
	formMessageNode,
	formWrapper,
	formSubmitBtn,
	dataAttr,
	requiredSelector,
	requiredClass,
	dataModal,
}) {
	if (document.querySelector(formWrapper)) {
		const form = document.querySelector(formWrapper),
			url = form.dataset?.action,
			sendData = {},
			formData = new FormData(),
			formMessage = form.querySelector(formMessageNode),
			selectList = [];

		if (form.querySelectorAll('select')) {
			form.querySelectorAll('select').forEach((el) => {
				const selectData = {
					id: el.getAttribute('id'),
					value: el.value,
				};

				selectList.push(selectData);
			});
		}

		if (form.querySelector(formSubmitBtn)) {
			form.querySelector(formSubmitBtn).addEventListener('click', function (e) {
				if (requiredSelector && form.querySelector(requiredSelector)) {
					form.classList.add(requiredClass);
				}
			});
		}

		form.addEventListener('submit', function (e) {
			e.stopPropagation();
			e.preventDefault();

			if (form.querySelector(dataAttr)) {
				form.querySelectorAll(dataAttr).forEach((el) => {
					const key = dataAttr.match(/[^data\-\[\]]/gi).join('');

					if (el.dataset[key] !== '') {
						sendData[el.dataset[key]] = el.value;
					}
				});
			}

			formData.append('json', JSON.stringify(sendData));

			// console.log(sendData, formData);

			fetch(url, {
				method: 'POST',
				body: formData,
			})
				.then(() => {
					document.body.style.overflowY = '';
					document.body.style.paddingRight = '';

					if (!hasFormMessage && dataModal !== '') {
						const modal = document.querySelector(`[data-modal=${dataModal}]`);

						modal.classList.remove('dn');
						modal.classList.add('show');
					}
					if (hasFormMessage && formMessage) {
						formMessage.style.display = 'block';

						if (closeBtn !== '') {
							form.querySelector(closeBtn).classList.add('show');
						}
					}

					form.classList.remove('has-required');

					if (form.querySelector('input')) {
						form.querySelectorAll('input').forEach((el) => {
							if (el.type !== 'radio') {
								el.value = '';
							}
							if (el.type === 'checkbox' && el.checked) {
								el.checked = false;
							}
						});
					}

					if (selectList.length) {
						selectList.forEach((el) => {
							if (document.querySelector(`#${el.id}`)) {
								document.querySelector(`#${el.id}`).value = `${el.value}`;
							}
						});
					}

					if (hiddenNodes !== '') {
						if (document.querySelector(`[data-modal="${dataModal}"]`)) {
							const wrapper = document.querySelector(`[data-modal="${dataModal}"]`);
							wrapper.querySelectorAll(hiddenNodes).forEach((el) => {
								el.classList.add('hidden');
							});
						} else {
							form.querySelectorAll(hiddenNodes).forEach((el) => {
								el.classList.add('hidden');
							});
							if (
								closeBtn !== '' &&
								form.querySelector(closeBtn).classList.contains('show')
							) {
								form.querySelector(closeBtn).addEventListener('click', function (e) {
									e.preventDefault();
									e.stopPropagation();

									form.querySelector(closeBtn).classList.remove('show');
									if (formMessage) {
										formMessage.style.display = 'none';
									}
									form.querySelector(hiddenNodes).classList.remove('hidden');
								});
							}
						}
					}
				})
				.catch((error) => {
					console.error(error?.message);
				});
		});
	}
}
