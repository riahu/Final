//PUBLIC FUNCTIONS

//searches by name
//term: term to search by
//callback: function to call on load (one json data parameter will be sent)
//data: {"list":[{"name":"Angeling","id":593}]}
function getSearch(term, callback){
	getData("a=search&searchby=name&q="+term,callback);
};

//term: term to search/filter by
//filterby: what field you want to search (name,element,etc..)
//callback: function to call on load (one json data parameter will be sent)
//data: {"list":[{"name":"Angeling","id":593}]}
function getFilter(term, filterby, callback){
	getData("a=search&searchby="+filterby+"&q="+term,callback);
};

//to:what you are evolving into
//from:what you are evolving from
//callback:function to call on load (one data parameter)
//data: {"materials":[153,155]}
function getMaterials(to, from, callback){
	getData("a=materials&to="+to+"&from="+from,callback);
};

function getDetails(id,callback){
	getData("a=details&id="+id,callback);
};














//PRIVATE FUNCTIONS


/*window.onload = function(){
	//getDetails(6,g);
	document.getElementById("searchBtn").onclick = function(){
	getSearch(document.getElementById("searchText").value,populate);
	};
};*/
function getData(urlAppend,returnFunc){
		var req = new XMLHttpRequest();
		var tim = new Date();
		req.open("GET","data.php?"+urlAppend+"&rand="+tim.getTime());
		req.onload = function() {
			var jsonRet = JSON.parse(req.responseText);
			returnFunc(jsonRet);
		};
		req.send();
}
function g(js){
	alert(js.name);
}
function populate(js){
	var ul = document.getElementById("list");
	ul.innerHTML = "";
	for(var i=0;i<js.list.length;i++){
		var newLi = document.createElement("li");
		newLi.innerHTML = js.data[i].name;
		ul.appendChild(newLi);
	}
}