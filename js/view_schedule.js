var d = 0;
function run(){
    s = schedule.find();
    var today = new Date();
    $("#dataList").append('<li class="date">' + (today.getMonth()+1) + "/" + today.getDate() + '</li>');
    for(var i = 0 ; i < s.length; i++) {
        //console.log(res[i]);
        var date = new Date(s[i].date);
        if(today.setHours(0,0,0,0)+(d*86400000) == date.setHours(0,0,0,0)) {
        // Date equals today's date  
            $("#dataList").append('<tr><td style="font-size:40px;">' + s[i].name + '</td></tr>');
        } else {
            d++;
            $("#dataList").append('<li class="date">' + (date.getMonth()+1) + "/" + date.getDate() + '</li>');
            $("#dataList").append('<tr><td style="font-size:40px;">' + s[i].name + '</td></tr>');
        }
    }
}

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