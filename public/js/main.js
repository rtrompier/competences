$(document).ready(function() {
	pagination();
});

function pagination(){
	var nbPage = $('.page:not(.first-page):not(.summary-page)').length;
	$('.page:not(.first-page)').each(function(index, el) {
		$(el).find('.pagination').html(index + "/" + nbPage);	
	});
}