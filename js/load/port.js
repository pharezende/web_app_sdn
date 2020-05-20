//Tráfego das Portas----------------------------------------------
var bloqueia_portas = 0; // Não chamar uma função mais de uma vez.
var show_ports_pid = 0; // Pid do SetInterval
var show_ports_status = 1; // Quando é 1, a porta está inativa.
$(function () {
    $("#load_ports").click(function () {
        if (show_ports_status === 0) {
            clearInterval(show_ports_pid); // Matar o processo!
            show_ports_status = 1;
            for (i = 0; i < switch_counter; i++) {
                $("#TrafficSw" + i).empty();
            }
            return;
        }
        show_ports_status = 0;
        show_ports_pid = setInterval(show_ports, 1000);
    });
});


function show_ports() {
    var switchMapping = new Array();
    $.when(callGetAjax("/wm/linkparameters/json#" + appendMechanism(""))).done(function (received) {
        var data = JSON.parse(received);
        for (i = 0; i < data.length; i++) {
            var obj = data[i];
            for (var key in obj) {
                var name = key;
                var currentbandwidth = obj[key];
                name = name.replace(",", " ");
                var parms = name.split(" ");
                var switch_dpid = parms[0];
                var switch_interface = parms[1];
                if (TotalBandwidthPort[name] === undefined) {
                    name = Neighbor[name];
                    var total_bandwidth = TotalBandwidthPort[name];
                } else {
                    total_bandwidth = TotalBandwidthPort[name];
                }
                var target = switchMapping[switch_dpid];
                if (target === undefined) {
                    var description = switch_interface + "," + currentbandwidth + "," + total_bandwidth + "||";
                    switchMapping[switch_dpid] = description;
                } else {
                    description = target + switch_interface + "," + currentbandwidth + "," + total_bandwidth + "||";
                    switchMapping[switch_dpid] = description;
                }

            }
        }
        for (map in switchMapping) {
            var desc = switchMapping[map];
            var swPos = HashMap[map];
            $("#TrafficSw" + swPos).empty();
            var dataArray = desc.split("||");
            for (var i = 0; i < dataArray.length - 1; i++) {
                var parmsArray = dataArray[i].split(",");
                switch_interface = "" + parmsArray[0];
                currentbandwidth = parmsArray[1];
                total_bandwidth = parmsArray[2];
                var total_band_value = total_bandwidth.replace("Mbps", "");
                if (currentbandwidth < 1) { // Mudar se for usar banda menor que 1 Mbps. Mostrar porta acima de 1Mbps.
                    continue;
                }
                if ((currentbandwidth / total_band_value) * 100 > 90) {
                    var color = "red";
                } else if ((currentbandwidth / total_band_value) * 100 > 50) {
                    color = "orange";
                } else {
                    color = "green";
                }

                var value = switch_interface + ":" + currentbandwidth + "|" + total_bandwidth;
                $("#TrafficSw" + swPos).append("<font size='3' color='" + color + "'>" + value + "</font><br>"); // Tirei o "p" e coloquei "br".
            }
        }


    });


}

