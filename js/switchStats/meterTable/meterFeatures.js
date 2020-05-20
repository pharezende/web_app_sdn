var meter_features_status = 1; // Table Turned OFF
//Meter Table-----------------------------------------------------
$(function () {
    $("#meter_features").click(function () {
        if (meter_features_status === 0) {
            meter_features_status = 1;
            $("#MeterFeatures").empty();
            //$("#GroupCounterBuckets").empty();
            return;
        }
        meter_features_status = 0; // Table Turned On
        var filterClick = null;// The last element will be the choosen attribute;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/meter-features/json";
        var div = "MeterFeatures";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs); //Inserir um parâmetro quando for uma tabela de seleção.
    });
});

