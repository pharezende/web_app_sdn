var switch_table_status = 1; // Table Turned OFF
//Switches Table-----------------------------------------------------
$(function () {
    $("#switches_table").click(function () {
        if (switch_table_status === 0) {
            switch_table_status = 1;
            $("#SwitchTable").empty();
            return;
        }
        switch_table_status = 0; // Table Turned On
        switch_table();
    });
});

function switch_table() {

    $.when(callGetAjax("/wm/core/controller/switches/json")).done(function (received) {
        var data = JSON.parse(received);
        $("#SwitchTable").empty();
        $("#SwitchTable").draggable();
        var html = "<table id='otherList'> <thead> <tr> <th>InetAddress</th><th>ConnectedSince</th><th>SwitchDPID</th></tr> </thead> <tbody>";
        for (var i in data) {
            var object = data[i];
            var inetAddress = object["inetAddress"];
            var connectedSince = object["connectedSince"];
            var switchDPID = object["switchDPID"];
            var row = "<tr> <td>" + inetAddress + "</td><td>" + msToDate(connectedSince) + "</td><td>" + switchDPID + "</td></tr>";
            html += row;
        }
        html += "</tbody> </table>";
        $("#SwitchTable").html(html);
    });
}

function msToDate(connectedSince) {
    var date = new Date(connectedSince);
    return date.toString();
}

