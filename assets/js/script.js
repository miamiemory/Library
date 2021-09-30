import Menu from './components/menu.js';
import './components/glider.js';

const menuElements = document.querySelectorAll('.menu');
menuElements.forEach((menuElement) => {
	new Menu(menuElement);
});

// category Sliders
const highlightSliders = document.querySelectorAll('.highlight-slider');

highlightSliders.forEach((slider) => {
	const prev = slider.querySelector('.slider-prev');
	const next = slider.querySelector('.slider-next');
	const slides = slider.querySelector('.slides');

	// required for accessibility
	slider.setAttribute('role', 'tablist');

	let glider = new Glider(slides, {
		slidesToShow: 2,
		slidesToScroll: 1,
		scrollLock: true,
		duration: 0.7,
		arrows: {
			prev: prev,
			next: next,
		},
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
				},
			},
		],
	});
	setTimeout(function () {
		glider.refresh();
	}, 0);
});

const isFirefox = /firefox/i.test(navigator.userAgent);
const scrollbarHeight = 17;

document.addEventListener('glider-loaded', hideFFScrollBars);
document.addEventListener('glider-refresh', hideFFScrollBars);
function hideFFScrollBars(e) {
	// Currently 17, may change with updates
	if (isFirefox) {
		console.log('loaded');
		// We only need to appy to desktop. Firefox for mobile uses
		// a different rendering engine (WebKit)
		if (window.innerWidth > 575) {
			e.target.parentNode.style.height = e.target.offsetHeight - scrollbarHeight + 'px';
		} else {
			e.target.parentNode.removeAttribute('style');
		}
	}
}

const dateObj = new Date();
const weekday = dateObj.toLocaleString('default', { weekday: 'long' });
const weekdayLabels = document.querySelectorAll('[data-weekday]');
weekdayLabels.forEach((weekdayLabel) => {
	if (weekdayLabel.dataset.weekday == weekday) {
		weekdayLabel.classList.add('today');
	}
});
