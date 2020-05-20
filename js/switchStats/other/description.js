var description_status = 1; // Table Turned OFF
$(function () {
    $("#other_description").click(function () {
        if (description_status === 0) {
            description_status = 1;
            $("#DescriptionTable").empty();
            return;
        }
        description_status = 0; // Table Turned On
        var filterClick = null;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/desc/json";
        var div = "DescriptionTable";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs);
    });
});
