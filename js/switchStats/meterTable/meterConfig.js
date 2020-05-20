var meter_config_status = 1; // Table Turned OFF
//Meter Table-----------------------------------------------------
$(function () {
    $("#meter_config").click(function () {
        if (meter_config_status === 0) {
            meter_config_status = 1;
            $("#MeterConfig").empty();
            //$("#GroupCounterBuckets").empty();
            return;
        }
        meter_config_status = 0; // Table Turned On
        var filterClick = null;// The last element will be the choosen attribute;
        var filterClickDivs = null;
        var uri = "/wm/core/switch/all/meter-config/json";
        var div = "MeterConfig";
        var divList = "otherList";
        var notWanted = [];
        callPopulateTable(uri, div, divList, notWanted, filterClick, filterClickDivs); //Inserir um parâmetro quando for uma tabela de seleção.
    });
});

