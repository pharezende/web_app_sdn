var memory_status = 1; // Table Turned OFF
//Hosts Table-----------------------------------------------------
$(function () {
    $("#memory_usage").click(function () {
        if (memory_status === 0) {
            memory_status = 1;
            $("#MemoryUsage").empty();
            return;
        }
        memory_status = 0; // Table Turned On
        memory_usage_table();
    });
});

function memory_usage_table() {
    $.when(callGetAjax("/wm/core/memory/json")).done(function (received) {
        var data = JSON.parse(received);
        $("#MemoryUsage").empty();
        $("#MemoryUsage").draggable();
        var totalValue = data.total;
        var freeValue = data.free;
        var usedValue = totalValue - freeValue;
        var html = "<table id='otherList'> <thead> <tr> <th>TOTAL</th><th>FREE</th><th>USED</th></tr> </thead> <tbody> <tr> <td>" + totalValue + "</td><td>" + freeValue + "</td><td>" + usedValue + "</td></tr> </tbody> </table>";
        $("#MemoryUsage").html(html);
    });
}

