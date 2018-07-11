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

     } else {
        //return error
     }
     
});

$(document).on('click', "#scheduleSubmit", function(e){
    schedule.remove();
    var examName = $("#examName").val();
    var examDate = new Date($("#datepicker").val());
    var subjects = $("#subjectPicker").val(); //is an array :)
    var today = new Date();
    var diffDate = examDate - today;
    var timeDiff = Math.abs(examDate.getTime() - today.getTime());
    //console.log(timeDiff);
    var days = Math.ceil(timeDiff/1000/60/60/24);
    console.log(days);
    var nOfSubjects = subjects.length;
    var subsPerDay = Math.max(Math.ceil(nOfSubjects/days) ,2);
    console.log(subsPerDay);
    var currentIndex = 0;
    for(var i = 0; i < days; i++){
        for(var j = 0; j < subsPerDay; j++){
            schedule.insert({
                name: subjects[currentIndex],
                date: today.getTime() + i* 86400000,
                isDone: false
            });
            currentIndex += 1;
            currentIndex %= nOfSubjects;
        }
        console.log(schedule.find());
    }

    schedule.save(function(err, tableStats, metaStats){
        if(!err) run();
    });
    
});

var d = 0;
function run(){
    s = schedule.find();
    var today = new Date();
    $("#dataList").empty();
    $("#dataList").append('<li class="date">' + (today.getMonth()+1) + "/" + today.getDate() + '</li>');
    for(var i = 0 ; i < s.length; i++) {
        //console.log(res[i]);
        var date = new Date(s[i].date);
        if(today.setHours(0,0,0,0)+(d*86400000) == date.setHours(0,0,0,0)) {
        // Date equals today's date  
            $("#dataList").append('<tr><td style="font-size:40px;">' + s[i].name + '<button type = "button" class="btn btn-danger" id = "id_'+ s[i]._id + '"><span class = "glyphicon glyphicon-minus"></span></button></td></tr>');
        } else {
            d++;
            $("#dataList").append('<li class="date">' + (date.getMonth()+1) + "/" + date.getDate() + '</li>');
            $("#dataList").append('<tr><td style="font-size:40px;">' + s[i].name + '<button type = "button" class="btn btn-danger" id = "id_'+ s[i]._id + '"><span class = "glyphicon glyphicon-minus"></span></button></td></tr>');
        }
    }
}

$(document).on('click', 'button', function(){
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