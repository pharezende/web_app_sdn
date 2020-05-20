var controller_setting_status = 1;
//Configure Controller location
$(function () {
    $("#controller_settings").click(function () {
        if (controller_setting_status === 0) {
            controller_setting_status = 1;
            $("#ControllerSettings").hide();
            return;
        }
        controller_setting_status = 0;
        controllerSettings();
    });
});

function controllerSettings() {
    $("#ControllerSettings").html("<div id='controllerSettings'> <b>Controller Location</b><br> <form name='contsettOption'> IP Address: <input type='text' name='ipField'> <br/ >Port Number: <input type='text' name='portField'> <br/> <input type='button' value='OK' onclick='setURL()'> </form> </div>");
    $("#ControllerSettings").draggable();
    $("#ControllerSettings").show();
}

function setURL() {
    var ipAddress = $('input[name=ipField]', "#controllerSettings").val();
    var portField = $('input[name=portField]', "#controllerSettings").val();
    if (validateIPaddress(ipAddress) === true) {
        if (!isNaN(parseInt(portField))) {
            URL = "http://" + ipAddress + ":" + portField;
            alert("Done!\n This is the URL:\n" + URL);
            $("#ControllerSettings").hide();
            controller_setting_status = 1;
            return;
        } else {
            alert("The Port Address should be an Integer Number");
            return;
        }
        return;
    }
    alert("Invalid IP Address");
}
