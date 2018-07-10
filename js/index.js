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




function run(){
	res = todos.find();
	for(var i = 0 ; i < res.length; i++){
		$("#toDoList").append('<p class="list-group-item">' + res[i].name + '</p>');
	}
}
