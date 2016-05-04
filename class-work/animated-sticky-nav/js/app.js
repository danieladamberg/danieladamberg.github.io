$(document).ready(function () {

	$(window).scroll(function (){
		var scrollTop = $(window).scrollTop()

		if (scrollTop > 20) {
			$('header').addClass('scrolled')
		} else {
			$('header').removeClass('scrolled')
		}

		console.log(scrollTop)
	})

})
