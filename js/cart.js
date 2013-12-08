$(function(){
	//update the cart now? Or after each addition?
	$('.tog-cart').click(function(){
		var sidebar = $('.sidebar');
		sidebar.toggle("fast");
	});


});

var cart = [];


function add(string name, int id){
	var cItem = [name, id];

	cart.push(cItem);
}