var fdb = new ForerunnerDB();

var db = fdb.db("todoDB");
var todos = db.collection("todos", {autoCreate: true}); //make the actual database

/*
Data structure:
	Subject
	Name
	Date (): new Date(2018, 11, 24, 10, 33); //year, month, day, hour, min
	isDone (if true then remove this item
*/


$("#btn-left").click(function(){
  alert("hello");
});

function run(){
	res = todos.find();
	for(var i = 0 ; i < res.length; i++){
		$("#toDoList").append('<p class="list-group-item">' + res[i].name + '<input type="checkbox" class="checkbox" id = item_' + i + '></p>');
	}
}

function changePer(n){
	$("#turtle").css("clip", "rect(" + 280*(1 - (n)/100) +", 454px, 284px, 0)"); //PLEASE DO NOT CHANGE THE NUMBERS IT TOOK HALF AN HOUR TO GET THE RIGHT NUMBERS
	//console.log(n);
}


$(document).on('change', '.checkbox', function() {
    if(this.checked) {
        // checkbox is checked
        var id = this.id;
        id = parseInt(id.substring(5));
        res = todos.find()[id];
        todos.updateById(id, {isDone, !(res.isDone)});
	    console.log(!res.isDone);
    }
});

for(var i = 0 ; i < 10; i++){
	todos.insert({
	subject: "math",
	name: "AIME",
	date: new Date(),
	isDone: false
	});
}

run();

