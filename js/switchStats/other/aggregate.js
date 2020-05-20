var aggregate_status = 1; // Table Turned OFF
$(function () {
    $("#other_aggregate").click(function () {
        if (aggregate_status === 0) {
            aggregate_status = 1;
            $("#AggregateTable").empty();
            return;
        }
        aggregate_status = 0; // Table Turned On
        var filterClick = null;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/aggregate/json";
        var div = "AggregateTable";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs);
    });
});
