var fdb = new ForerunnerDB();
var db = fdb.db("todoDB");
var todos = db.collection("todos", {autoCreate: true}); //make the actual database
var schedule = db.collection("schedule", {autoCreate: true}); //make the actual database

/*
Data structure:
	Subject
	Name
	Date (): new Date(2018, 11, 24, 10, 33); //year, month, day, hour, min
	isDone (if true then remove this item
*/


$(document).on('change', '#examPicker', function(e) {
     //e.preventDefault();
     var sub = $(".selectpicker").val();
     $("#subjectPicker option:selected").removeAttr("selected");
     console.log("Hey")
     $(".subO").hide();
     if(sub == "一般科目"){
        $(".singleExam").show();
     } else if(sub == "數學競賽"){
        $(".mathComp").show();    
     } else if(sub == "資訊競賽"){

     } else {
        //return error
     }
     
});


function run(){
    $("#toDoList").empty();
	res = todos.find();
    s = schedule.find();
	for(var i = 0 ; i < res.length; i++){
        console.log(res[i]);
        var date = new Date(res[i].date);
        if(new Date().setHours(0,0,0,0) == date.setHours(0,0,0,0)) {
        // Date equals today's date  
        $("#toDoList").append('<p class="list-group-item">' + '<span id="name">' + res[i].name + '</span><span id = "date">    ' + (date.getMonth()+1) + '/' + date.getDate() + '</span><input type="checkbox" class="checkbox" id = item_' + res[i]._id + '></p>');
        }
	}
    for(var i = 0 ; i < s.length; i++){
        //console.log(res[i]);
        var date = new Date(s[i].date);

        if(new Date().setHours(0,0,0,0) == date.setHours(0,0,0,0)) {
        // Date equals today's date  
            $("#toDoList").append('<p class="list-group-item">' + '<span id="name">' + s[i].name + '</span><span id = "date">     ' + (date.getMonth()+1) + '/' + date.getDate() + '</span><input type="checkbox" class="checkbox" id = item_' + s[i]._id + '></p>');
        }
    }
}

function changePer(n){
	$("#turtle").css("clip", "rect(" + 188*(1 - (n)/100) +", 300px, 188px, 0)"); //PLEASE DO NOT CHANGE THE NUMBERS IT TOOK HALF AN HOUR TO GET THE RIGHT NUMBERS
	//console.log(n);
}


$(document).on('change', '.checkbox', function() {
    var id = this.id;
    id = id.substring(5);
    var res = todos.find(id);
    //console.log("change!!");
    todos.updateById(id, {isDone: this.checked});
    schedule.updateById(id, {isDone: this.checked});
    //console.log(res.isDone);
    var doneCounter = 0;
    var todayTasks = 0;
    res = todos.find();
    s = schedule.find();
    console.log(res);
    var doneCounter = 0
    for(var i = 0 ; i < res.length; i++){
    	if(res[i].isDone){
    		doneCounter += 1;
    	}
        var date = new Date(res[i].date);
        console.log(date);
        if(new Date().setHours(0,0,0,0) == date.setHours(0,0,0,0)) {
            // Date equals today's date  
            todayTasks += 1;
        }
    		
    }
    for(var i = 0 ; i < s.length; i++){
        if(s[i].isDone){
            doneCounter += 1;
        }
        var date = new Date(s[i].date);
        console.log(date);
        if(new Date().setHours(0,0,0,0) == date.setHours(0,0,0,0)) {
            // Date equals today's date  
            todayTasks += 1;
        }
            
    }
    console.log(todayTasks);
    var perc = doneCounter/todayTasks * 100;
    changePer(perc);
});
function submitSingle(){
    var name = $("#itemName").val();
    var bR = $("#beforeRemind").val();
    var date = $("#datepicker").val();
    date = new Date(date);
    //console.log(new Date(date.getDate() - bR));
    if(name != "" && bR != ""){
        todos.insert({
            name: name,
            date: date  - bR * 86400000,
            isDone: false
        });
        console.log(todos.find());
        todos.save(function (err) {
            if (err) {
                console.log("Oh nooooo! Something went wrong: " + err);
            }
        });
    }
    run();
    console.log($("#itemName").val() + ": " + $("#beforeRemind").val() + ", " + $("#datepicker").val());

}


window.onload = function () { 
    todos.load(function (err, tableStats, metaStats) {
        if (!err) {
            schedule.load(function (err, tableStats, metaStats) {
                if (!err) {
                    // Load was successful
                    run();
                    changePer(0);
                }
            });
            // Load was successful
        }
    });
    
    
}

