var group_desc_status = 1; // Table Turned OFF
//Group Table-----------------------------------------------------
$(function () {
    $("#group_desc").click(function () {
        if (group_desc_status === 0) {
            group_desc_status = 1;
            $("#GroupDescription").empty();
            $("#GroupDescriptionBuckets").empty();
            return;
        }
        group_desc_status = 0; // Table Turned On
        var filterClick = ["groupNumber", "buckets"];// The last element will be the choosen attribute;
        var filterClickDivs = ["GroupDescriptionBuckets", "bucketsList"];
        var uri = "/wm/core/switch/all/group-desc/json";
        var div = "GroupDescription";
        var divList = "groupsList";
        var notWanted = ["buckets"];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs); //Inserir um parâmetro quando for uma tabela de seleção.
    });
});
