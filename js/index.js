var ForerunnerDB = require("forerunnerdb");
var fdb = new ForerunnerDB();

var db = fdb.db("todoDB");
var todos = db.collection("todos", {autoCreate: true}); //make the actual database

/*
Data structure:
	Name
	Date (): new Date(2018, 11, 24, 10, 33); //year, month, day, hour, min
	isDone (if true then remove this item
*/

todos.insert(
	{
		name: "蕭梓宏",
		date: new Date(2018, 11, 24)
	}
);

todos.insert(
	{
		name: "王政祺",
		date: new Date(2018, 11, 24)
	}
);


res = todos.find({
	name: $exists
});


function run(){
	for(var i = 0 ; i < res.length(); i++){
		$(".list-group").append('<li class="list-group-item">' + res[i].name + '</li>');
	}
}
