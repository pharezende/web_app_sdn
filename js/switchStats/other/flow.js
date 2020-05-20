var other_flow_status = 1; // Table Turned OFF
$(function () {
    $("#other_flow").click(function () {
        if (other_flow_status === 0) {
            other_flow_status = 1;
            $("#FlowTable").empty();
            return;
        }
        other_flow_status = 0; // Table Turned On
        var filterClick = null;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/flow/json";
        var div = "FlowTable";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs);
    });
});

