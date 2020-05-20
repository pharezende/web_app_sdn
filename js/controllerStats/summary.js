var summary_status = 1; // Table Turned OFF
//Summary Table-----------------------------------------------------
$(function () {
    $("#summary").click(function () {
        if (summary_status === 0) {
            summary_status = 1;
            $("#Summary").empty();
            return;
        }
        summary_status = 0; // Table Turned On
        summary_table();
    });
});

function summary_table() {
    $.when(callGetAjax("/wm/core/controller/summary/json")).done(function (received) {
        var res = "";
        var data = JSON.parse(received);
        $("#Summary").empty();
        $("#Summary").draggable();
        var numberOfSwitches = data["# Switches"];
        var quarantinePorts = data["# quarantine ports"];
        var inter_switchLinks = data["# inter-switch links"];
        var numberOfHosts = data["# hosts"];
        var html = "<table id='otherList'> <thead> <tr> <th>Switches</th><th>Quarantine Ports</th><th>Inter-Switch Links</th><th>Hosts</th></tr> </thead> <tbody> <tr> <td>" + numberOfSwitches + "</td><td>" + quarantinePorts + "</td><td>" + inter_switchLinks + "</td><td>" + numberOfHosts + "</td></tr> </tbody> </table>";
        $("#Summary").html(html);
    });
}

