window.onscroll = function () {
	if (document.documentElement.scrollTop > 200) {
		document.querySelector('.go-top-container').classList.add('show');
	} else {
		document.querySelector('.go-top-container').classList.remove('show');
	}
}

if (document.querySelector('.go-top-container')) {
	document.querySelector('.go-top-container').addEventListener('click', () => {
		window.scroll({
			top: 0,
			behavior: 'smooth'
		})
	})
}