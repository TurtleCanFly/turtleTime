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
    schedule.save();
    console.log("h");
});