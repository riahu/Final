

var cart = [];




function add(name, id){
	var cItem = [name, id];

	cart.push(cItem);
}

$(function(){
	//update the cart now? Or after each addition?
	$('.tog-cart').click(function(){
		var sidebar = $('.sidebar');
		sidebar.toggle("fast");
	});




});