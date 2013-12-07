$(function(){
	//update the cart now? Or after each addition?
	$('.tog-cart').click(function(){
		var sidebar = $('.sidebar');
		sidebar.toggle("fast");
	});
});