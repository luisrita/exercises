$(document).ready(function() {
	$('.js-change').on('click', function(e) {
		e.preventDefault();
		$('.intro').fadeOut();
		$('.quiz').fadeIn();
	});

	$('.js-start').on('click', function(e) {
		e.preventDefault();
		$('.step-one').fadeOut();
		$('.step-two').fadeIn();
	});

	$('.js-next-2').on('click', function(e) {
		e.preventDefault();
		$('.step-two').fadeOut();
		$('.step-three').fadeIn();
		$('.botao-quiz').css('opacity', '0');
	});

	$('.js-next-3').on('click', function(e) {
		e.preventDefault();
		$('.step-three').fadeOut();
		$('.step-four').fadeIn();
		$('.botao-quiz').css('opacity', '0');
	});

	$('.js-next-4').on('click', function(e) {
		e.preventDefault();
		$('.step-four').fadeOut();
		$('.step-five').fadeIn();
	});

	$('.js-ans a').on('click', function(e){
		e.preventDefault();

		if($(this).hasClass('js-correct')) {
			$('.js-box-correct').fadeIn();
			setTimeout(function(){
			  $('.js-box-correct').fadeOut();
				$('.botao-quiz').css('opacity', '1');
			}, 2000);
		} else {
			$('.js-box-wrong').fadeIn();
			setTimeout(function(){
			  $('.js-box-wrong').fadeOut();
			}, 2000);
		}
	});
});	