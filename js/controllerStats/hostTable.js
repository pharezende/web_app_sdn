var hosts_table_status = 1; // Table Turned OFF
//Hosts Table-----------------------------------------------------
$(function () {
    $("#hosts_table").click(function () {
        if (hosts_table_status === 0) {
            hosts_table_status = 1;
            $("#HostTable").empty();
            return;
        }
        hosts_table_status = 0; // Table Turned On
        hosts_table();
    });
});

function hosts_table() {

    var MAC_IP_Mapping = new Array();
    $.when(callGetAjax("/wm/device/")).done(function (received) {
        var res = "";
        var data = JSON.parse(received);
        $("#HostTable").empty();
        $("#HostTable").draggable();
        for (var i = 0; i < data.length; i++) {
            if (data[i].attachmentPoint.length === 0) {
                continue;
            } else {
                if (data[i].attachmentPoint[0].port === -2) {
                    continue;
                } else {
                    var mac_address = data[i].mac;
                    if (data[i].ipv4.length === 0) {
                        var ip_address = "undefined";
                    } else {
                        ip_address = data[i].ipv4;
                        if (ip_address.length === 2) {
                            ip_address = ip_address[1];
                        }
                    }
                    var row = "<tr> <td>" + mac_address + "</td> <td>" + ip_address + "</td> </tr> ";
                    res += row;
                }
            }
        }
        var value = "<table id='hostsList'> <thead> <tr> <th class='MAC'>MAC ADDRESS</th> <th class='IP'>IP ADDRESS</th></tr> </thead> <tbody>" + res + "</tbody> </table>";
        $('#HostTable').html(value);
    });
}
