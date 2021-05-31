// window._ = require('lodash')
// window.axios = require('axios')
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

import 'alpinejs'
import barba from '@barba/core'
import gsap from 'gsap'
import { query, disableRightClick, scrollToTop } from './components/Utils'
import { runBubbles, distortBubble } from './components/common/Bubbles'
import { Gallery } from './components/main/Gallery'
import { triggerModal } from './components/main/Modal'
import LinkDistortionCircle from './components/common/LinkDistortionCircle'
import initCarousel from './components/main/Swiper'
import LocomotiveScroll from 'locomotive-scroll'
// import runTransition from './components/main/PageTransitions'
import SectionRipple from './components/main/SectionRipple'
import Cursor from './components/main/Cursor'

// transition effect on page leave
// window.onload = () => {
// 	runTransition()
// }

barba.init({
	transitions: [{
		name: 'opacity-transition',
	    leave(data) {
	      	return gsap.to(data.current.container, {
	        	opacity: 0
	     	 });
	    },
	    enter(data) {
	      	return gsap.from(data.next.container, {
	        	opacity: 0
	      	});
	    }
	}]
})

document.addEventListener(
	'DOMContentLoaded',
	() => {
		/**
		 * * * * * * * * * * * * * * * * * *
		 * * Common function are listed below.
		 *
		 * * These functions will be invoked on
		 * * every page.
		 */
		// init custom cursor
		Cursor()

		// Locomotive scroll
		const scroll = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true,
			tablet: { smooth: false },
			smartphone: { smooth: false },
			multiplier: 1.2,
			lerp: 0.15
		})

		setTimeout(() => {
			scroll.update()
		})

		/* Back to top button */
		const backToTopBtn = document.getElementById('back-to-top')

		if (window.matchMedia('(min-width: 1024px)')) {
			backToTopBtn.addEventListener('click', () => {
				scroll.scrollTo('top')
			})
		} else {
			backToTopBtn.addEventListener('click', scrollToTop)
		}

		// Distortion links (circle on hover)
		const distortedLinks = [...document.querySelectorAll('a.circle-link')]
		distortedLinks.forEach(el => {
			const elPosition = [...el.parentNode.children].indexOf(el)
			const fxObj = LinkDistortionCircle[elPosition]
			fxObj && new fxObj(el)
		})

		// Trigger modal (contact)
		triggerModal()

		/**
		 * * Disables right click for all images.
		 * * It's the first measure for preventing download.
		 * * The second one is using images as css backgrounds.
		 */
		disableRightClick()

		/**
		 *
		 * Main pages listed below.
		 * Functions will be invoked based on current page.
		 */
		const currentPage = document.body.getAttribute('data-page').trim()

		// | =========================================================
		// | Home
		// | =========================================================
		if (currentPage === 'home') {
			// SectionRipple()
			// distortBubble()
		}

		// | =========================================================
		// | Gallery
		// | =========================================================
		if (currentPage === 'gallery') {
			Gallery()
		}

		// | =========================================================
		// | Pomeranians
		// | =========================================================
		if (currentPage === 'poms-index') {
			// ...
		}

		// Single pom
		if (currentPage === 'poms-show') {
			document.body.classList.add('no-arr')

			initCarousel()

			// Bubbles on header
			// setTimeout(() => {
			// 	runBubbles('.show__header', 1500)
			// }, 1500)
		}
	},
	false
)
