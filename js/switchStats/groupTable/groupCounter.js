var group_counter_status = 1; // Table Turned OFF
//Group Table-----------------------------------------------------
$(function () {
    $("#group_counter").click(function () {
        if (group_counter_status === 0) {
            group_counter_status = 1;
            $("#GroupCounter").empty();
            $("#GroupCounterBuckets").empty();
            return;
        }
        group_counter_status = 0; // Table Turned On
        var filterClick = ["groupNumber", "bucketCounters"];// The last element will be the choosen attribute;
        var filterClickDivs = ["GroupCounterBuckets", "bucketsList"];
        var uri = "/wm/core/switch/all/group/json";
        var div = "GroupCounter";
        var divList = "groupsList";
        var notWanted = ["bucketCounters"];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs); //Inserir um parâmetro quando for uma tabela de seleção.
    });
});
