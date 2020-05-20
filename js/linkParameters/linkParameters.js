//Links Parameters
var enable_labels = 1;
var link_parameters_status = 1; // Link Parameters turned  ff
$(function () {
    $("#links_band_delay").click(function () {
        enable_labels = 0;
        link_parameters();
    });
});

function link_parameters() {
    if (link_parameters_status === 0) {
        enable_labels = 1;
        link_parameters_status = 1;
        clearLabels(AllLinks);
        AllLinks = [];
        return;
    }
    link_parameters_status = 0;
    $.when(callGetAjax("/wm/linkparameters/features/json")).done(function (received) {
        var data = JSON.parse(received);
        for (i = 0; i < data.length; i++) {
            var ifs = data[i];
            var key = Object.keys(ifs);
            var jsonObject = ifs[key];
            var keyS = key.toString();
            try {
                if (enable_labels === 0) {
                    var label = Connections[keyS].getOverlay(keyS);
                    label.setLabel(jsonObject.bandwidth + " || " + jsonObject.delay);
                    AllLinks.push(keyS);
                } else {
                    TotalBandwidthPort[keyS] = jsonObject.bandwidth;
                }
            } catch (err) { //Depois tirar caso nunca chegue nesse escopo.
                if (enable_labels === 0) {
                    AllLinks.push(keyS);
                    key = Neighbor[keyS];
                    label = Connections[key].getOverlay(key);
                    label.setLabel(jsonObject.bandwidth + " || " + jsonObject.delay);
                } else {
                    TotalBandwidthPort[keyS] = jsonObject.bandwidth;
                }
            }
        }
    });
}
