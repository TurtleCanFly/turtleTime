var fdb = new ForerunnerDB();
var db = fdb.db("todoDB");
var todos = db.collection("todos"); //make the actual database
var schedule = db.collection("schedule"); //make the actual database

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
        $(".codingComp").show();    
     } else {
        //return error
     }
     
});

$(document).on('click', "#scheduleSubmit", function(e){
    schedule.remove();
    $("#dataList").empty();
    var examName = $("#examName").val();
    var examDate = new Date($("#datepicker").val());
    //console.log(examDate);
    var subjects = $("#subjectPicker").val(); //is an array :)
    var today = new Date();
    var diffDate = examDate - today;
    var timeDiff = Math.abs(examDate.getTime() - today.getTime());
    //console.log(timeDiff);
    var days = Math.ceil(timeDiff/1000/60/60/24);
    console.log(days);
    var nOfSubjects = subjects.length;
    var subsPerDay = Math.max(Math.ceil(nOfSubjects/days) ,2);
    //console.log(subsPerDay);
    //console.log(subsPerDay);
    var currentIndex = 0;
    var gT = today.getTime();
    console.log("BB: " + gT);
    for(var i = 0; i < days; i++){
        for(var j = 0; j < subsPerDay; j++){
            schedule.insert({
                name: subjects[currentIndex],
                date: (gT + i* 86400000),
                isDone: false
            });
            console.log("AA: " + (gT + i* 86400000));
            currentIndex += 1;
            currentIndex %= nOfSubjects;
        }
        console.log(schedule.find());
    }

    schedule.save(function(err, tableStats, metaStats){
        if(!err) run();
    });
    
});

function run(){
    var d = 0;
    s = schedule.find();
    $("#dataList").empty();
    if(s.length <= 0){
        return;
    }
    var today = new Date(s[0].date);
    $("#dataList").append('<ul class="date">' + (today.getMonth()+1) + "/" + today.getDate() + '</li>');
    for(var i = 0 ; i < s.length; i++) {
        //console.log(s[i]);
        var date = new Date(s[i].date);
        /*
        console.log("hh");
        console.log(new Date(today.setHours(0,0,0,0)+ d*86400000));
        console.log(new Date(date.setHours(0,0,0,0)));
        console.log("gg");
        */
        if(new Date(today.setHours(0,0,0,0)+ d*86400000).getTime() == new Date(date.setHours(0,0,0,0)).getTime()) {
<<<<<<< Updated upstream
        // Date equals today's date 
            //console.log(date); 
            $("#dataList").append('<tr><td style="font-size:25px;">' + s[i].name + '<button type = "button" class="scheduleBtn" id = "id_'+ s[i]._id + '"><span class = "glyphicon glyphicon-minus"></span></button></td></tr>');
        } else {
            d++;
            //console.log(date);
            $("#dataList").append('<li class="date">' + (date.getMonth()+1) + "/" + date.getDate() + '</li>');
            $("#dataList").append('<tr><td style="font-size:25px;">' + s[i].name + '<button type = "button" class="scheduleBtn" id = "id_'+ s[i]._id + '"><span class = "glyphicon glyphicon-minus"></span></button></td></tr>');
=======
            // Date equals today's date 
            $("#dataList").append('<li class="list-group-item">' + '<span id="subName">' + s[i].name + '</span><span id = "btn-sche"><button type = "button" class="scheduleBtn" id = "id_' + s[i]._id + '"><span class="glyphicon glyphicon-minus"></span></button></span></li>');
        } else {
            d++;
            $("#dataList").append('</ul><ul class="date">' + (date.getMonth()+1) + "/" + date.getDate() + '</li>');
            $("#dataList").append('<li class="list-group-item">' + '<span id="subName">' + s[i].name + '</span><span id = "btn-sche"><button type = "button" class="scheduleBtn" id = "id_' + s[i]._id + '"><span class="glyphicon glyphicon-minus"></span></button></span></li>');
>>>>>>> Stashed changes
        }
        //$("#dataList").append('</ul>');
    }
}

$(document).on('click', '.scheduleBtn', function(){
    var id = this.id;
    id = id.substring(3);
    console.log(id);
    schedule.remove({
        _id: id
    });
    schedule.save(function(err,tableStats, metaStats){
        run();
    });
})


window.onload = function () { 
    todos.load(function (err, tableStats, metaStats) {
        if (!err) {
            schedule.load(function (err, tableStats, metaStats) {
                if (!err) {
                    // Load was successful
                    run(); 
                }
            });
            // Load was successful
        }
    });
}
run(); 