var other_queue_status = 1; // Table Turned OFF
$(function () {
    $("#other_queue").click(function () {
        if (other_queue_status === 0) {
            other_queue_status = 1;
            $("#QueueTable").empty();
            return;
        }
        other_queue_status = 0; // Table Turned On
        var filterClick = null;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/queue/json";
        var div = "QueueTable";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs);
    });
});

