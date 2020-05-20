var port_description_status = 1; // Table Turned OFF
//Group Table-----------------------------------------------------
$(function () {
    $("#port_desc").click(function () {
        if (port_description_status === 0) {
            port_description_status = 1;
            $("#PortDescription").empty();
            return;
        }
        port_description_status = 0; // Table Turned On
        callPopulateTable("/wm/core/switch/all/port-desc/json", "PortDescription", 'portsList', ["advertisedFeatures", "supportedFeatures", "peerFeatures", "maxSpeed"], null, null);
    });
});

