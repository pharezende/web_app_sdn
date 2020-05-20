var other_table_status = 1; // Table Turned OFF
$(function () {
    $("#other_table").click(function () {
        if (other_table_status === 0) {
            other_table_status = 1;
            $("#TTable").empty();
            return;
        }
        other_table_status = 0; // Table Turned On
        var filterClick = null;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/table/json";
        var div = "TTable";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs);
    });
});

