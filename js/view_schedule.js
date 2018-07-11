var d = 0;
function run(){
    s = schedule.find();
    for(var i = 0 ; i < s.length; i++) {
        //console.log(res[i]);
        var date = new Date(s[i].date);
        if(new Date().setHours(0,0,0,0)+(d*86400000) == date.setHours(0,0,0,0)) {
        // Date equals today's date  
            $("#dataList").append('<tr><td style="font-size:50px;">' + s[i].name + '</td></tr>');
        } else {
            d++;
            $("#dataList").append('<li class="date">' + d + '</li>' + '<tr><td style="font-size:50px;">' + s[i].name + '</td></tr>');
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