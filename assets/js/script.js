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
		slidesToShow: 1,
		slidesToScroll: 1,
		scrollLock: true,
		duration: 0.7,
		rewind: true,
		arrows: {
			prev: prev,
			next: next,
		},
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 4,
				},
			},
		],
	});

	let autoplayDelay = 3000;

	let timeout = -1;
	let hovering = false;
	function startTimeout() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (!hovering)
				glider.scrollItem((glider.slide + 1) % glider.slides.length);
		}, autoplayDelay);
	}

	let animID = 0;
	const isAnimating = () => glider.animate_id !== animID;
	slides.addEventListener("glider-animated", () => {
		animID = glider.animate_id;
		if (!hovering) startTimeout();
	});

	slides.addEventListener("mouseover", () => {
		hovering = true;
		clearTimeout(timeout);
	});

	slides.addEventListener("mouseout", () => {
		hovering = false;
		if (!isAnimating()) startTimeout();
	});

	startTimeout();
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
