//Tráfego Fluxo.
flow_aux = "";
var povoa_fluxo_status = 1;
var pid_povoa_fluxo = 0;
$(function () {
    $("#load_flows").click(function () {
        if (povoa_fluxo_status === 0) {
            flow_aux = "";
            clearInterval(pid_povoa_fluxo);
            povoa_fluxo_status = 1;
            clearLabels(AllSLinks);
            $("#RTFlowsTable").empty();
            return;
        } else {
            pid_povoa_fluxo = setInterval(show_fluxos, 2000); // Executar de 2 em 2 segundos.
            povoa_fluxo_status = 0;
        }
    });
});

function get_flows_processa(received) {
    var data = JSON.parse(received);
    var rows = "";
    for (i = 0; i < data.length; i++) {
        var flow = data[i];
        rows += "<tr> <td>" + flow.sourceIP + "</td> <td>" + flow.destinationIP + "</td> <td>" + flow.sourcePort + "</td> <td>" + flow.destinationPort + "</td> <td>" + flow.transportProtocol + "</td> </tr> ";
    }
    return rows;
}


function show_fluxos(res) {
    $.when(callGetAjax("/wm/monitoring/polling/flowsList/json")).done(function (a1) { //Iniciar a requesição e processamento e esperar até o seu término para executar o código abaixo.
        res = get_flows_processa(a1);
        $("#RTFlowsTable").empty();
        $("#RTFlowsTable").draggable();
        html = "<table id='flowsList'> <thead> <tr> <th class='SRC_IP'>SRC IP</th> <th class='DST_IP'>DST IP</th> <th class='SRC_PORT'>SRC PORT</th> <th class='DST_PORT'>DST PORT</th> <th class='PROTOCOLO'>PROTOCOL</th>   </tr> </thead> <tbody>" + res + "</tbody> </table>";
        $("#RTFlowsTable").html(html);
        //-Seleciona o item.
        var table = document.getElementsByTagName("table")[0];
        var tbody = table.getElementsByTagName("tbody")[0];
        tbody.onclick = function (e) {
            e = e || window.event;
            var data = [];
            var target = e.srcElement || e.target;
            while (target && target.nodeName !== "TR") {
                target = target.parentNode;
            }
            var ascii = 0;
            if (target) {
                var cells = target.getElementsByTagName("td");
                for (var i = 0; i < cells.length; i++) {
                    data.push(cells[i].innerHTML);
                    if (i < 4) {
                        var value = cells[i].innerHTML;
                        for (j = 0; j < value.length; j++)
                            ascii += cells[i].innerHTML.charCodeAt(j);
                    }
                }
            }
            //-------------------------------------------------------
            flow_aux = new String(ascii); // Tem que criar o objeto, senão num da certo.
            povoa_fluxo();
            clearLabels(AllSLinks);
        }
    });
}


//#################################################Retorna o Fluxo Requisitado do Controlador############################################
function povoa_fluxo() {
    if (flow_aux === "") {
        return;
    }
    $.when(callGetAjax("/wm/monitoring/polling/" + flow_aux + "/flowTraffic/json")).done(function (received) {
        if (received === "") {
            clearLabels(AllSLinks);
            flow_aux = "";
        }
        var data = JSON.parse(received);
        povoa_fluxo_aux(data);
        for (i = 0; i < data.length; i++) { //Percorrer cada registro do JSON
            var sw = data[i]["switch"];
            sw = sw.replace(",", " ");
            var match_sw_p = sw;
            var limpeza = 0; //Só quando da match.
            if (Connections[match_sw_p] === undefined) {
                var aux_s = match_sw_p;
                var switch_data = match_sw_p.split(" ");
                match_sw_p = Neighbor[match_sw_p];
                var flag_s = 1;
            } else {
                switch_data = match_sw_p.split(" ");
            }
            var label = Connections[match_sw_p].getOverlay(match_sw_p);
            var value = data[i].value;
            value += "Mbs";
            label.setLabel("" + value); // Colocar aqui o tráfego
        }
    });
}


function povoa_fluxo_aux(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var sw = key;
            for (var i in data[key]) {
                var elem = data[key][i];
                var match_sw_p = sw + " " + elem.portNumber;
                if (Connections[match_sw_p] === undefined) {
                    match_sw_p = Neighbor[match_sw_p];
                }
                var label = Connections[match_sw_p].getOverlay(match_sw_p);
                var value = elem.rate;
                value += "Mbs";
                label.setLabel("" + value); // Colocar aqui o tráfego
            }
        }
    }
}




