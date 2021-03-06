// helper.js: helper/utility function
/* global gsap */

// wait
// TODO: make this compatible with babel runtime
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

// gsap default animation
const animate = {
	fadeIn: (element, duration, delay = 0) => {
		gsap.set(element, { display: `block`, autoAlpha: 1, duration: duration/1000, delay: delay });
		gsap.from(element, { autoAlpha: 0, duration: duration/1000, delay: delay });
	},
	fadeOut: (element, duration, delay = 0) => {
		gsap.to(element, { display: `none`, autoAlpha: 0, duration: duration/1000, delay: delay });
	},
	slideDown: (element, duration, delay = 0) => {
		gsap.set(element, { display: `block`, overflow: `visible`, autoAlpha: 1, height: `auto` });
		gsap.from(element, { overflow: `hidden`, autoAlpha: 0, height: 0, duration: duration/1000, delay: delay });
	},
	slideUp: (element, duration, delay = 0) => {
		gsap.to(element, { display: `none`, overflow: `hidden`, autoAlpha: 0, height: 0, duration: duration/1000, delay: delay });
	}
};

// scroll to targeted id
function smoothScroll(event, element) {
	const target = element.dataset.scrollTarget || element.hash || ``;
	const targetEl = document.querySelector(`[id='${target.substring(1)}']`);
	const duration = element.dataset.scrollDuration || 0.4;
	const offsetEl = document.querySelector(element.dataset.scrollOffset) || ``;
	const offsetY = offsetEl.offsetHeight || 0;

	if (targetEl) {
		gsap.to(window, {duration: duration, scrollTo:{ y: target, offsetY: offsetY } });
		event.preventDefault();
	}
}

// get parameter in url
function getParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[[\]]/g, `\\$&`);
	const regex = new RegExp(`[?&]` + name + `(=([^&#]*)|&|#|$)`),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return ``;
	return decodeURIComponent(results[2].replace(/\+/g, ` `));
}

// check if element has child
function hasChild(element, child) {
	let node = child.parentNode;
	while (node !== null) {
		if (node == element) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

// get mouse position (http://www.window.org/js/events_properties.html#position)
function mousePos(event) {
	let posX = 0,
		posY = 0;
	if (!event) event = window.event;
	if (event.pageX || event.pageY) {
		posX = event.pageX;
		posY = event.pageY;
	} else if (event.clientX || event.clientY) {
		posX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return {
		x: posX,
		y: posY
	};
}
