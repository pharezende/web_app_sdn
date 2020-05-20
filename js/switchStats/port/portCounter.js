var port_counter_status = 1; // Table Turned OFF
//Group Table-----------------------------------------------------
$(function () {
    $("#port_counter").click(function () {
        if (port_counter_status === 0) {
            port_counter_status = 1;
            $("#PortCounter").empty();
            return;
        }
        port_counter_status = 0; // Table Turned On
        callPopulateTable("/wm/core/switch/all/port/json", "PortCounter", 'portsList', ["receiveErrors", "transmitErrors", "receiveFrameErrors", "receiveOverrunErrors", "receiveCRCErrors", "collisions", "durationNsec"], null, null);
    });
});

