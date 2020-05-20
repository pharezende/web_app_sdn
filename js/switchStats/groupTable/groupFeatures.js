var group_feat_status = 1; // Table Turned OFF
//Group Table-----------------------------------------------------
$(function () {
    $("#group_feat").click(function () {
        if (group_feat_status === 0) {
            group_feat_status = 1;
            $("#GroupFeatures").empty();
            return;
        }
        group_feat_status = 0; // Table Turned On
        var filterClick = null;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/group-features/json";
        var div = "GroupFeatures";
        var divList = "groupsList";
        var notWanted = ["actionsAll", "actionsSelect", "actionsIndirect", "actionsFf"];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs);
    });
});
