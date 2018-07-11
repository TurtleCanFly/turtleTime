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
        //console.log(res[i]);
        var date = new Date(res[i].date);
		$("#toDoList").append('<p class="list-group-item"><span id="subject">' + res[i].subject + '</span> - - <span id="name">' + res[i].name + '</span><span id = "date">     ' + (date.getMonth()+1) + '/' + date.getDate() + '</span><input type="checkbox" class="checkbox" id = item_' + res[i]._id + '></p>');
	}
}

function changePer(n){
	$("#turtle").css("clip", "rect(" + 445*(1 - (n)/100) +", 800px, 500px, 0)"); //PLEASE DO NOT CHANGE THE NUMBERS IT TOOK HALF AN HOUR TO GET THE RIGHT NUMBERS
	//console.log(n);
}


$(document).on('change', '.checkbox', function() {
    var id = this.id;
    id = id.substring(5);
    var res = todos.find(id);
    //console.log("change!!");
    todos.updateById(id, {isDone: this.checked});
    //console.log(res.isDone);
    var doneCounter = 0;
    res = todos.find();
    console.log(res);
    var doneCounter = 0
    for(var i = 0 ; i < res.length; i++){
    	if(res[i].isDone){
    		doneCounter += 1;
    	}
    		
    }
    var perc = doneCounter/res.length * 100;
    changePer(perc);
    
});

var dte = new Date();

for(var i = 0 ; i < 10; i++){
	todos.insert({
	subject: "Mathematics",
	name: "AIME " + i,
	date: dte.getTime() + 86400000*i,
	isDone: false
	});
}

window.onload = function () { run(); }
run();

