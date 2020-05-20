function clearLabels(Links) {
    for (i = 0; i < Links.length; i++) {
        try {
            mt = Links[i];
            label = Connections[mt].getOverlay(mt);
            label.setLabel("");
        } catch (err) {
        }
    }
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


function callGetAjax(target) { //Não posso processar o result do AJAX aqui.
    return $.ajax({
        type: "POST",
        data: {
            parameter: URL + target
        },
        url: "../php/connectController.php"
    });
}

function clearDiv(div) {
    $(div).html("");
    $(div).css("border-style", "");
    $(div).css("border-width", 0);
    $(div).css("width", 0);
    $(div).css("height", 0);
}
