var uptime_status = 1; // Table Turned OFF
//Hosts Table-----------------------------------------------------
$(function () {
    $("#uptime").click(function () {
        if (uptime_status === 0) {
            uptime_status = 1;
            $("#UpTime").empty();
            return;
        }
        uptime_status = 0; // Table Turned On
        uptime_table();
    });
});

function uptime_table() {
    $.when(callGetAjax("/wm/core/system/uptime/json")).done(function (received) {
        var res = "";
        var data = JSON.parse(received);
        $("#UpTime").empty();
        $("#UpTime").draggable();
        var key = "systemUptimeMsec";
        var value = data[key];
        var html = "<table id='otherList'> <thead> <tr> <th>UpTime(DD/HH/MM/SS/MS)</th></tr> </thead> <tbody> <tr> <td>" + msToTime(value) + " </td> </tr> </tbody> </table>";
        $("#UpTime").html(html);
    });
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24)
        , days = parseInt((duration / (1000 * 60 * 60 * 24)));

    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return days + ":" + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

