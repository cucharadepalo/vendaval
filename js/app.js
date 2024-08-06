var debounce = function (func, threshold, execAsap) {
	var timeout
	return function debounced () {
			var obj = this, args = arguments
			function delayed () {
					if (!execAsap)
							func.apply(obj, args)
					timeout = null
			}

			if (timeout)
					clearTimeout(timeout)
			else if (execAsap)
					func.apply(obj, args)

			timeout = setTimeout(delayed, threshold || 100)
	}
}

function smoothScrollers() {
	const els = document.querySelectorAll('.smooth-scroller')
	els.forEach( el => {
		el.addEventListener('click', e => {
			e.preventDefault()
			const des = new URL(el.href)
			const tar = document.querySelector(des.hash)
			const offset = tar.getBoundingClientRect().top + window.scrollY
			console.log(offset);
			window.scrollTo({
				top: offset, 
				left: 0, 
				behavior: 'smooth' 
			});
		})
	})
}

function initTabs() {
	const tabBtns = document.querySelectorAll('button[role="tab"]')
	const panels = document.querySelectorAll('[role="tabpanel"]')
	let activeIndex = 0
	
	tabBtns.forEach( (tab, index) => {
		tab.addEventListener('click', event => {
			setActiveTab(index)
		})
	})

	function setActiveTab(index) {
		tabBtns[activeIndex].setAttribute('aria-selected', 'false')
		tabBtns[activeIndex].tabIndex = -1
		tabBtns[index].setAttribute('aria-selected', 'true')
		tabBtns[index].tabIndex = 0
		tabBtns[index].focus()
	
		setActivePanel(index)
		activeIndex = index
	}

	function setActivePanel(index) {
		panels[activeIndex].setAttribute('hidden', '')
		panels[activeIndex].tabIndex = -1
		panels[index].removeAttribute('hidden')
		panels[index].tabIndex = 0
	}

	tabBtns.forEach(function (tab, index) {

		tab.addEventListener('keydown', function (event) {
			const lastIndex = tabBtns.length - 1;

			if (event.code === 'ArrowLeft' || event.code === 'ArrowUp') {
				event.preventDefault()

				if (activeIndex === 0) {
					setActiveTab(lastIndex)
				} else {
					setActiveTab(activeIndex - 1)
				}
			} else if (event.code === 'ArrowRight' || event.code === 'ArrowDown') {
				event.preventDefault()

				if (activeIndex === lastIndex) {
					setActiveTab(0)
				} else {
					setActiveTab(activeIndex + 1)
				}
			} else if (event.code === 'Home') {
				event.preventDefault()

				setActiveTab(0)
			} else if (event.code === 'End') {
				event.preventDefault()

				setActiveTab(lastIndex)
			}
		})
	})
}

function openDetails(screenWidth) {
	const size = 1024
	const details = document.querySelectorAll('details')
	if (screenWidth >= size) {
		details.forEach( el => {
			if (el.name){ 
				el.dataset.name = el.name
				el.name = ''
			}
			el.open = true
		})
	} else {
		details.forEach ( el => {
			if (el.dataset.name) {
				el.name = el.dataset.name
			}
			el.open = false
		})
	}
}

function initModals() {
	const btns = document.querySelectorAll('.event-more')
	const modal = document.querySelector('.info-modal')
	
	btns.forEach( btn => {
		btn.addEventListener('click', event => {
			const id = btn.dataset.target
			const tpl = document.getElementById(id)
			fillModalContent(tpl)
			openModal()
		})
	})

	document.addEventListener('click', event => {
		if (event.target.classList.contains('info-modal') || event.target.classList.contains('modal-wrapper')) {
			closeModal();
		}
	})

	document.addEventListener('keydown', event => {
		if (modal.classList.contains('open') && event.code == 'Escape') {
			closeModal()
		}
	})
}

function fillModalContent(template) {
	const wrapper = document.querySelector('.modal-content')
	const clone = template.content.cloneNode(true)
	wrapper.appendChild(clone)
}

function openModal() {
	const modal = document.getElementById('modal')
	const main = document.querySelector('main')
	const modalContent = document.querySelector('.modal-content');

	modal.classList.remove('hidden')
	modal.setAttribute('aria-hidden', 'false')
	main.setAttribute('aria-hidden', 'true')

	setTimeout( () => {
		modal.classList.add('open')
		document.body.classList.add('overflow-hidden')
		bodyScrollLock.disableBodyScroll(modalContent);
	}, 100)
}

function closeModal() {
	const modal = document.getElementById('modal')
	const modalContent = document.querySelector('.modal-content')
	const main = document.querySelector('main')

	modal.classList.remove('open')
	modal.setAttribute('aria-hidden', 'true')
	main.setAttribute('aria-hidden', 'false')

	setTimeout( () => {
		modal.classList.add('hidden')
		document.body.classList.remove('overflow-hidden')
		bodyScrollLock.enableBodyScroll(modalContent)
		modalContent.innerHTML = ''
	}, 500)
}

// openDetails(window.innerWidth)
initTabs()
smoothScrollers()
initModals()
window.addEventListener('resize', debounce(function (e) {
	openDetails(window.innerWidth)
}, 250, false))
