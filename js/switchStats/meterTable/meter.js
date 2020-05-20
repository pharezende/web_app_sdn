var meter_status = 1; // Table Turned OFF
//Meter Table-----------------------------------------------------
$(function () {
    $("#meter").click(function () {
        if (meter_status === 0) {
            meter_status = 1;
            $("#Meter").empty();
            //$("#GroupCounterBuckets").empty();
            return;
        }
        meter_status = 0; // Table Turned On
        var filterClick = null;// The last element will be the choosen attribute;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/meter/json";
        var div = "Meter";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs); //Inserir um parâmetro quando for uma tabela de seleção.
    });
});

