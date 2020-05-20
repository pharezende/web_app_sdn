var other_features_status = 1; // Table Turned OFF
$(function () {
    $("#other_features").click(function () {
        if (other_features_status === 0) {
            other_features_status = 1;
            $("#FeaturesTable").empty();
            return;
        }
        other_features_status = 0; // Table Turned On
        var filterClick = null;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/features/json";
        var div = "FeaturesTable";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs);
    });
});

