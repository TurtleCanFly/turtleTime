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
        /*
        console.log("hh");
        console.log(new Date().setHours(0, 0, 0, 0));
        console.log(date.setHours(0, 0, 0, 0));
        console.log("gg");
        */
        if(new Date().setHours(0,0,0,0) == date.setHours(0,0,0,0)) {
        // Date equals today's date  
        $("#toDoList").append('<li class="list-group-item ind"><span style = "font-size:20px;">' + res[i].name + '</span><span style="font-size:20px;"></span><span style="font-size:20px;">  ' + (date.getMonth()+1) + '/' + date.getDate() + '<span><button class = "doneBtn indexBtn btn" id = irm_' + res[i]._id + '><span class="glyphicon glyphicon-ok"><span><button class = "removeBtn indexBtn btn" id = iid_' + res[i]._id + '><span class="glyphicon glyphicon-trash"></span></button></span>');
        //$("#toDoList").append('<span style="font-size:20px;">' + res[i].name + '</span><span style="font-size:20px;">    ' + (date.getMonth()+1) + '/' + date.getDate());
        //$("#toDoList").append('<li class="list-group-item">' + '<span style="font-size:25px;">' + res[i].name + '</span><span style="font-size:20px;">    ' + (date.getMonth()+1) + '/' + date.getDate() + '</span><span id = "indexCheck"><input type="checkbox" class="checkbox" id = item_' + res[i]._id + '></span></li>');

        //$("#toDoList").append('<li><span id = "name"' + res[i].name + )
        //$("#toDoList").append('<li>' + '<span id="name">' + res[i].name + '</span><span id = "date">    ' + (date.getMonth()+1) + '/' + date.getDate() + '</span><span id = "indexCheck"><a href="#" class = "delItem">' +
          //'<span class="glyphicon glyphicon-minus"></span></a><input type="checkbox" class="checkbox" id = item_' + res[i]._id + '></span></li>');

        }
	}
    for(var i = 0 ; i < s.length; i++){
        console.log(s[i]);
        var date = new Date(s[i].date);
        if(new Date().setHours(0,0,0,0) == date.setHours(0,0,0,0)) {
        // Date equals today's date  
        $("#toDoList").append('<li class="list-group-item ind"><span style = "font-size:20px;">' + s[i].name + '</span><span style="font-size:20px;"></span><span style="font-size:20px;">  ' + (date.getMonth()+1) + '/' + date.getDate() + '<span><button class = "doneBtn indexBtn btn" id = srm_' + s[i]._id + '><span class="glyphicon glyphicon-ok"><span><button class = "removeBtn indexBtn btn" id = sid_' + s[i]._id + '><span class="glyphicon glyphicon-trash"></span></button></span>');
            //$("#toDoList").append('<li class="list-group-item">' + '<span id="name">' + s[i].name + '</span><span id = "date">     ' + (date.getMonth()+1) + '/' + date.getDate() + '</span><a href="#" class="delItem">'
         // + '<span class="glyphicon glyphicon-minus"></span></a><span id = "indexCheck"><input type="checkbox" class="checkbox" id = item_' + s[i]._id + '></span></li>');
        }
    }
}

function changePer(n){
	$("#turtle").css("clip", "rect(" + 188*(1 - (n)/100) +", 300px, 188px, 0)"); //PLEASE DO NOT CHANGE THE NUMBERS IT TOOK HALF AN HOUR TO GET THE RIGHT NUMBERS
	//console.log(n);
}


function calcPerc(){
    //console.log(res.isDone);
    var doneCounter = 0;
    var todayTasks = 0;
    res = todos.find();
    s = schedule.find();
    //console.log(res);
    var doneCounter = 0
    for(var i = 0 ; i < res.length; i++){
        if(res[i].isDone){
            doneCounter += 1;
        }
        var date = new Date(res[i].date);
        //console.log(date);
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
    console.log("Tasks: " + todayTasks);
    var perc = doneCounter/todayTasks * 100;
    changePer(perc);
}

$(document).on('click', '.doneBtn', function() {
    //console.log("hey");
    var id = this.id;
    $("#" + id).css("color", "green");
    var opt = id[0];
    id = id.substring(4);
    console.log(id);
    var res, s;
    //console.log("change!!");
    if(opt[0] == 'i'){
        todos.updateById(id, {isDone: true});
        console.log("one by one");
    } else {
        schedule.updateById(id, {isDone: true});
        console.log("schedule");
    }
    
    calcPerc();
    //console.log(todayTasks);
    //console.log(doneCounter);
});

$(document).on('click', '.removeBtn', function() {
    //console.log("hey");
    var id = this.id;
    var opt = id[0];
    id = id.substring(4);
    console.log(id);
    var res, s;
    //console.log("change!!");
    if(opt[0] == 'i'){
        todos.remove({_id: id});
        console.log("one by one");
        todos.save(function(err){
            run();
        });
    } else {
        schedule.remove({_id: id});
        console.log("schedule");
        schedule.save(function(err){
            run();
        });
    }

    calcPerc();
    //console.log(todayTasks);
    //console.log(doneCounter);
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
    calcPerc();
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

