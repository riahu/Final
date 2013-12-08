

var cart = {items: []};




function add(namex, idx){
	var cItem = {name: namex, id: idx};

	cart.items.push(cItem);
}

function buildCart(){
	var sidebar = $('.sidebar');
	var ctemp = sidebar.find('.ctemp');

    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];
        var clone = ctemp;
        clone.find('.cIcon').css("background-image: url(img/" + item.id + ".png);");
        clone.removeClass("ctemp");
        sidebar.append(clone);
    }}

function testCart(){
	add("Pika", 2);
	add("Pika", 4);
	add("Pika", 3);

}



$(function(){
	//update the cart now? Or after each addition?
	$('.tog-cart').click(function(){
		var sidebar = $('.sidebar');
		sidebar.toggle("fast");
	});

	testCart();
	buildCart();


});