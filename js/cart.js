
var cart = {items: []};


function add(namex, idx){
	var cItem = {name: namex, id: idx};

	cart.items.push(cItem);
}


function buildCart(){
	var sidebar = $('.sidebar');
	var ctemp = $('.ctemp');


    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];
        temp = ctemp.clone();
        var icon = temp.find(".cIcon");
        icon.css("background-image", "url(img/"+item.id+".png)");
        var name = temp.find(".name");
        name.html(item.name);
        temp.removeClass("ctemp");
        sidebar.append(temp);


    }
}

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