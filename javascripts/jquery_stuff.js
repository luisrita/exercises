$(document).ready(function() {

	$('.background').each(function() {
		var $secObj = $(this);
		var $artObj = $secObj.find('article');

		$(window).scroll(function() {
			var secYPos = - $(window).scrollTop() / $secObj.data('speed');
			var secCoors = '50% ' +secYPos+ 'px';
			var winHeight = $(window).height();
			var startMove = 200;

			$secObj.css({backgroundPosition: secCoors});
			console.log($secObj.offset().top, startMove);

			$('section').each(function() {
				if($(this).offset().top <= startMove) {
					var artYPos = $(window).scrollTop() / $artObj.data('speed');
					var artCoors = 100 + artYPos+ 'px';
					console.log(artCoors);
					$artObj.css({top: artCoors});
				}
			});
		});
	});
});	

