//Verify Connection with the Controller
var connection_status = 1;
$(function () {
    $("#verify_connection").click(function () {
        if (connection_status === 0) {
            connection_status = 1;
            $("VerifyConnection").hide();
            clearDiv("#VerifyConnection");
            return;
        }
        connection_status = 0;
        verifyConnection();
    });
});


function verifyConnection() {
    $("#VerifyConnection").show();
    $("#VerifyConnection").draggable();
    $("#VerifyConnection").html("<b>Enter URI:</b><br> <form name='vericonnOption'> URI: <input type='text' name='URIField'><br/> <input type='button' value='OK' onclick='setURI()'> </form>");
    $("#VerifyConnection").css("border-style", "solid");
    $("#VerifyConnection").css("border-width", 5);
    $("#VerifyConnection").css("width", 300);
    $("#VerifyConnection").css("height", 100);
}

function setURI() {
    var uriAddress = $('input[name=URIField]', "#Verify_Connection").val();
    if (uriAddress.charAt(0) === '/' || uriAddress === "") {
        $.when(callGetAjax(uriAddress + "%")).done(function (received) {
            alert(received);
            $("#VerifyConnection").hide();
            connection_status = 1;
        });
    } else {
        alert("Invalid URI!\n");
    }
}
