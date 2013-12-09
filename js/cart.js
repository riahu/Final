
var cart = {items: []};

function removeCartItem(idx) {
	for (i=0; i < cart.items.length; i++) {
		if (cart.items[i].id === idx) {
			cart.items.splice(i,1);
			break;
		}
	}
	
	buildCart();
}

function add(namex, idx, prevnamex, previdx, matsx){
	var cItem = {
		name: namex,
		id: idx,
		prevname: prevnamex,
		previd: previdx,
		matlist: matsx
	};

	cart.items.push(cItem);
	
	buildCart();
}
		
function totalCart(cartPage) {
	document.querySelector("#cart-total .panel-body").innerHTML="<div class='list-group-item'><h3>No items in the cart right now.</h3></div>";
	if (cart.items.length > 0) {
		document.querySelector("#cart-total .panel-body").innerHTML="";
	}
	countMaterials();
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
		var rembtn = temp.find(".remove-btn")[0].setAttribute("onclick","removeCartItem("+item.id+")");
        temp.removeClass("ctemp");
        sidebar.append(temp);
    }
	
	localStorage.setItem('group6cart', JSON.stringify(cart));
}

var mats = new Array();

function countMaterials(){
	var matDex = 0;
	var prevoList = document.querySelector("#cart-total .panel-body");
	mats = new Array();
	for (i=0; i<cart.items.length; ++i){
		item = cart.items[i];
		// getMaterials(item.id, item.previd, matCall);
		var template = document.querySelector(".evo-template").cloneNode(true);
		template.querySelector("#prev-name").innerHTML = cart.items[i].prevname;
		var prevIcon = template.querySelector("#prev-icon");
		var prevId = item.previd;
		prevIcon.setAttribute("style", "background-image: url(img/"+prevId+".png);");
		prevIcon.appendChild(document.querySelector(".monster-link").cloneNode(false));
		prevIcon.querySelector(".monster-link").setAttribute("onclick","displayDetails("+prevId+")");
		template.querySelector("#current-name").innerHTML = item.name;
		var currIcon = template.querySelector("#current-icon");
		var currId = item.id;
		currIcon.setAttribute("style", "background-image: url(img/"+currId+".png);");
		currIcon.appendChild(document.querySelector(".monster-link").cloneNode(false));
		currIcon.querySelector(".monster-link").setAttribute("onclick","displayDetails("+currId+")");
		for (var j=0; j < item.matlist.length; ++j) {
			template.querySelector(".mat"+(j+1)).setAttribute("style", "background-image: url(img/"+item.matlist[j]+".png);");
			var t = item.matlist[j];
			if(mats[t] == null){
				mats[t] = {
					id: t,
					count: 1
				};
			}
			else {
				++mats[t].count;
			}
		}
		var matTog = template.querySelector(".mat-toggle");
		matTog.setAttribute("data-target", matTog.getAttribute("data-target")+"c"+matDex);
		template.querySelector("#materials").id = "materialsc"+matDex;
		matDex++;
		template.className = template.className.replace("template" , "");
		prevoList.appendChild(template);
	}

	
	var matTable = document.querySelector("#material-total tbody");
	matTable.innerHTML = "<tr class='mat-total-row template'><td><div class='monster-icon'></div></td><td><h3></h3></td></tr>";
	for(i=0; i<mats.length; ++i){
		if(mats[i] != null){
			//create new element for material
			var template = document.querySelector(".mat-total-row").cloneNode(true);
			template.querySelector(".monster-icon").setAttribute("style", "background-image: url(img/"+mats[i].id+".png);");
			template.querySelector("h3").innerHTML = "x " + mats[i].count;
			template.className = template.className.replace("template" , "");
			matTable.appendChild(template);
		}
	}
}

function matCall(data){
	for(j=0; j<data.materials.length; ++j){
		var t = data.materials[j].id;
		if(mats[t] == null){
			mats[t] = {
				id: t,
				count: 1
			};
		}
		else {
			++mats[t].count;
		}
	}
}

$(function(){
	var cartJSON = localStorage.getItem('group6cart');
	if (cartJSON && cartJSON.length > 0) {
		cart = JSON.parse(cartJSON);
	}
	//update the cart now? Or after each addition?
	$('.tog-cart').click(function(){
		var sidebar = $('.sidebar');
		sidebar.toggle("fast");
	});

	buildCart();

	countMaterials();
});