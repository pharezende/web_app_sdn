//Gerar a topologia-------------------------------------------
$(function () {
    $("#generate_topology").click(function () {
        start();
    });
});

function start() {
    var url = document.URL;
    if (url.indexOf("switch_size") >= 0) {
        if (isNaN(parseInt(getParameterByName("host_size", url))) === false) {
            Gl_host_size = getParameterByName("host_size", url);
        }
        if (isNaN(parseInt(getParameterByName("switch_size", url))) === false) {
            Gl_switch_size = getParameterByName("switch_size", url);
        }
    }
    saida();
}

function getParameterByName(name, href) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(href);
    if (results === null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

function saida() {
    //Quantidade de Swtiches e Hosts
    link_parameters();
    $.when(callGetAjax("/wm/core/controller/summary/json")).done(function (received) {
        received = received.replace(/# /g, "");
        var jsonObject = JSON.parse(received);
        var numberOfHosts = jsonObject.hosts;
        var numberOfSwitches = jsonObject.Switches;
        generateHostDivs(numberOfHosts);
        generateSwitchDivs(numberOfSwitches);
        //Gerar Imagens e Linkar Hosts<-> Switches
        $.when(callGetAjax("/wm/device/")).done(function (received) {
            var jsonData = JSON.parse(received);
            var k = 0;
            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].attachmentPoint.length === 0) { //Modificado
                    continue;
                } else {
                    if (jsonData[i].attachmentPoint[0].port === -2) { //Modificado
                        continue;
                    } else {
                        var local_par = new Array();
                        var ipObject = jsonData[i].ipv4;
                        if (ipObject.length === 2) {
                            var ipObject = new Array(ipObject[1]);
                        }
                        if (!(validateIPaddress(ipObject))) { // Verificar se o controlador descobriu o IPv4. Uma forma é usar o pingall.
                            //local_par[0] = jsonData[i].mac; //Comentado
                            continue;
                        } else {
                            local_par[0] = ipObject;
                        }
                        local_par[1] = jsonData[i].attachmentPoint[0].switchDPID;
                        local_par[2] = jsonData[i].attachmentPoint[0].port;
                        gera_imagem(k, local_par);
                        k++;
                    }

                }
            }
            for (var i = 0; i < switch_counter; i++) {
                conecta_hosts(i, PIDs_List[i]);
            }
            //Linkar Switch<->Switch
            $.when(callGetAjax("/wm/topology/links/json")).done(function (received) {
                var jsonData_l = JSON.parse(received);
                //Generate the rest of image
                for (i = 0; i < jsonData_l.length; i++) {
                    numero_links(received, jsonData_l[i]["src-switch"], jsonData_l[i]["dst-switch"])
                    gera_imagem_resto(jsonData_l[i]["src-switch"]);
                    gera_imagem_resto(jsonData_l[i]["dst-switch"]);
                }
                //Connect switches.
                for (i = 0; i < jsonData_l.length; i++) {
                    conecta_switches(jsonData_l[i]["src-switch"], jsonData_l[i]["src-port"] + "", jsonData_l[i]["dst-switch"], jsonData_l[i]["dst-port"] + "");
                }
                var intervalID = setInterval(povoa_fluxo, 1000); // Chamar a função de tempo em tempo.
            });
        });
    });
}


function generateHostDivs(nHosts) {
    var height = ((Gl_host_size * 125) / 142);
    var width = ((Gl_switch_size * 90) / 142);
    for (i = 0; i < nHosts; i++) {
        $("#Images").append("<div id='Host" + i + "'></div>");
        $("#Host" + i).css("float", "right");
        $("#Host" + i).css("left", "100px");
        $("#Host" + i).css("top", "100px");
        $("#Host" + i).css("height", height);
        $("#Host" + i).css("width", width);
        $("#Host" + i).css("margin", "10px");
        $("#Host" + i).css("position", "absolute");
    }
}

function generateSwitchDivs(nSwitches) {

    //142 --- 125
    //100 --- x
    var height = ((Gl_switch_size * 125) / 142);
    var width = ((Gl_switch_size * 90) / 142);


    for (var i = 0; i < nSwitches; i++) {
        $("#Images").append("<div id='Switch" + i + "'></div>");
        $("#Switch" + i).css("float", "right");
        $("#Switch" + i).css("left", "100px");
        $("#Switch" + i).css("top", "300px");
        $("#Switch" + i).css("height", height);
        $("#Switch" + i).css("width", width);
        $("#Switch" + i).css("margin", "10px");
        $("#Switch" + i).css("position", "absolute");
    }

}

function validateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}


function gera_imagem(k, dados) {
    var e0;
    var e1;
    var mac = dados[0];
    var dpid = dados[1];
    var port = dados[2];
    if ($.inArray(mac, MACs_List) === -1) { // Host
        if (Nb_Hosts_Switch[dpid] === undefined) { // Não existir o índice com o valor do alterado;
            Nb_Hosts_Switch[dpid] = 1; // Iniciar a contagem deste switch.
            Hosts_Switch[dpid] = mac;
            Ports_Switch[dpid] = port;
        } else {
            Nb_Hosts_Switch[dpid] = Nb_Hosts_Switch[dpid] + 1;
            Hosts_Switch[dpid] = Hosts_Switch[dpid] + "," + mac;
            Ports_Switch[dpid] = Ports_Switch[dpid] + "," + port;
        }
        MACs_List.push(mac);
        //$("#Host"+host_counter).append(mac + "<img src='imagens/icone_pc.png' height="+Gl_host_size+"  width="+Gl_host_size+"/></div><br/>");
        jsPlumb.draggable($("#Host" + host_counter));
        $("#Host" + host_counter).css("left", host_left_counter); // Movimentar o Host.
        host_counter++; //Aumentar a Quantidade de Hosts.
        host_left_counter = host_left_counter + 250; // Incrementar o movimento.
    }

    if ($.inArray(dpid, PIDs_List) === -1) { // Switch
        PIDs_List.push(dpid);
        html = "<img src='../imagens/icone_switch.png' height=" + Gl_switch_size + " width=" + Gl_switch_size + "/>" + "<p style='display:inline' id='host_switch_Text' >" + dpid + "</p>";
        $("#Switch" + switch_counter).html(html);
        jsPlumb.draggable($("#Switch" + switch_counter));
        HashMap[dpid] = switch_counter;
        $("#Switch" + switch_counter).append("<div id='TrafficSw" + switch_counter + "'></div>");
        $("#Switch" + switch_counter).css("left", switch_left_counter); // Movimentar o switch.
        switch_counter++; // Aumentar a quantidade de Switches.
        switch_left_counter = switch_left_counter + 250; //Incrementar o movimento.
    }

}

function gera_imagem_resto(sw) {
    if ($.inArray(sw, PIDs_List) === -1) { // Verificar se esse switch existe na lista.
        PIDs_List.push(sw);
        $("#Switch" + switch_counter).append("<img src='../imagens/icone_switch.png' height='" + Gl_switch_size + "' width='" + Gl_switch_size + "'/><p style='display:inline' id='host_switch_Text' >" + sw + "</p></div><br/>");
        $("#Switch" + switch_counter).append("<div id='TrafficSw" + switch_counter + "'></div>");
        jsPlumb.draggable($("#Switch" + switch_counter));
        HashMap[sw] = switch_counter;
        $("#Switch" + switch_counter).css("top", 500);
        $("#Switch" + switch_counter).css("left", last_left_counter); // Movimentar o switch.
        switch_counter++; // Aumentar a quantidade de Switches.
        last_left_counter = last_left_counter + 250; //Incrementar o movimento.
    }
}

function conecta_hosts(k, pid_switch) {
    var nb = Nb_Hosts_Switch[pid_switch];
    var jump = (1.2 - 0.3) / nb;
    var calc = 0.3;
    if (Hosts_Switch[pid_switch].indexOf(",") > 0) {
        var dados = Hosts_Switch[pid_switch].split(",");
    } else {
        dados = Hosts_Switch[pid_switch];
    }
    var comp = Ports_Switch[pid_switch] + "";
    if (comp.indexOf(",") > 0) {
        var ports = comp.split(",");
    } else {
        ports = comp;
    }
    // O Range máximo e mínimo permitido dividido pela quantidade de hosts por switches.
    for (var i = 0; i < nb; i++) {
        if (nb === 1) { //M
            calc = 0.75;
        }
        if (i > 0) {
            calc = calc + jump;
        }
        var match = pid_switch + " " + ports[i];
        AllSLinks.push(match);
        var result = dados[i] + "<img src='../imagens/icone_pc.png' height=" + Gl_host_size + " width=" + Gl_host_size + "/>";
        $("#Host" + ultimo_linkado).html(result);
        Connections[match] = jsPlumb.connect({
            source: "Host" + ultimo_linkado,
            target: "Switch" + HashMap[pid_switch],
            endpoint: "Blank",
            paintStyle: {
                lineWidth: 5,
                strokeStyle: 'rgb(0,0,0)'
            },
            // O Primeiro: Movimenta pro lado direito || O Segundo: Movimenta para baixo (Incremento)
            anchors: [
                [1.5, 1.15, 0, 0],
                [calc, 0.35, 0, 0]
            ], // Do Switch o Primeiro varia de 0.3 até 1.2 para ficar OK.
            overlays: [
                ["Label", {
                    cssClass: "Label_JSPLUMB",
                    label: ports[i],
                    location: 1,
                    id: "myPORT"
                }],
                ["Label", {
                    cssClass: "Label_JSPLUMB",
                    label: "",
                    location: 0.5,
                    id: match
                }]
            ]

        });
        Links[match] = "myID";
        ultimo_linkado++;
    }
}

function conecta_switches(sw1, src_port, sw2, dst_port) { //Verificar depois tempo de aparecimento.
    //Conecta os dispositivos
    if (HashMap[sw1] > HashMap[sw2]) { // Quer dizer que o SW1 tá na frente.
        var aux = sw2;
        var aux2 = sw1;
        var im1 = HashMap[sw2];
        var im2 = HashMap[sw1];
        var im1_port = dst_port;
        var im2_port = src_port;
    } else {
        aux = sw1;
        aux2 = sw2;
        im1 = HashMap[sw1];
        im2 = HashMap[sw2];
        im1_port = src_port;
        im2_port = dst_port;
    }
    var match = sw1 + " " + src_port;
    var pos_aux = sw2 + " " + dst_port;
    Neighbor[pos_aux] = match;
    proxima_posicao(aux);
    proxima_posicao(aux2);
    AllSLinks.push(match);
    Connections[match] = jsPlumb.connect({
        source: "Switch" + im1,
        target: "Switch" + im2,
        endpoint: "Blank",
        paintStyle: {
            lineWidth: 5,
            strokeStyle: 'rgb(0,0,0)'
        },
        // O Primeiro: Movimenta pro lado direito || O Segundo: Movimenta para baixo (Incremento)
        anchors: [
            [1.2, Proxima_Posicao_Switch[aux], 0, 0],
            [0.3, Proxima_Posicao_Switch[aux2], 0, 0]
        ], // Do Switch o Primeiro varia de 0.3 até 1.2 para ficar OK.
        overlays: [
            ["Label", {
                cssClass: "Label_JSPLUMB",
                label: im1_port,
                location: 0,
                id: "myPORT1"
            }],
            ["Label", {
                cssClass: "Label_JSPLUMB",
                label: im2_port,
                location: 1,
                id: "myPORT2"
            }],
            ["Label", {
                cssClass: "Label_JSPLUMB",
                label: "",
                location: 0.5,
                id: match
            }],
            ["Label", { // Acho que não está usando
                cssClass: "Label_JSPLUMB",
                label: "",
                location: 0.7,
                id: match + "op"
            }]

        ]

    });
}


function numero_links(information, sw1, sw2) {
    // the g in the regular expression says to search the whole string
    // rather than just find the first occurrence
    var re;
    var count;
    if ($.inArray(sw1, Switch_Links) === -1) {
        re = new RegExp(sw1, 'g');
        count = (information.match(re) || []).length;
        Switch_Links[sw1] = count;
        Proxima_Posicao_Switch[sw1] = 0;
    }

    if ($.inArray(sw2, Switch_Links) === -1) {
        re = new RegExp(sw2, 'g');
        count = (information.match(re) || []).length;
        Switch_Links[sw2] = count;
        Proxima_Posicao_Switch[sw2] = 0;
    }

}

function proxima_posicao(sw) {
    //Alterei de 0.3 para 0.22
    var res = (1.2 - 0.22) / Switch_Links[sw];
    Proxima_Posicao_Switch[sw] = Proxima_Posicao_Switch[sw] + res;
}

