
var cart = {items: []};


function add(namex, idx, prevnamex, previdx){
	var cItem = {
		name: namex,
		id: idx,
		prevname: prevnamex,
		previd: idx
	};

	cart.items.push(cItem);
	
	buildCart();
}


function buildCart(){
	var sidebar = $('.sidebar').find(".panel-body");
	var ctemp = $('.ctemp');
	sidebar.empty();

    for (var idx = 0; idx < cart.items.length; ++idx) {
        var item = cart.items[idx];
        var temp = ctemp.clone();
        var icon = temp.find(".cIcon");
        icon.css("background-image", "url(img/"+item.id+".png)");
        var name = temp.find(".name");
        name.html(item.name);
        temp.removeClass("ctemp");
        sidebar.append(temp);
    }
}

var mats = new Array();

function countMaterials(){
	for (i=0; i<cart.items.length; ++i){
		item = cart.items[i];
		getMaterials(item.id, matCall);

	}

	for(i=0; i<mats.length; ++i){
		if(mats[i] != null){
			//create new element for material
			//use i as the ID of the material monster
			//use mats[i] as the quantity of that item
		}

	}
}

function matCall(data){
	for(j=0; j<data.materials.length; ++j){
		var t = data.materials[j].id;
		if(mats[t] == null){
			mats[t] = 1;
		}	else	{
			++mats[t];
		}
	}
}

$(function(){
	//update the cart now? Or after each addition?
	$('.tog-cart').click(function(){
		var sidebar = $('.sidebar');
		sidebar.toggle("fast");
	});

	buildCart();

	countMaterials();
});