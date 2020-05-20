var settings_status = 1;
//Image Configurations
$(function () {
    $("#topology_settings").click(function () {
        if (settings_status === 0) {
            settings_status = 1;
            $("#TopologySettings").hide();
            return;
        }
        settings();
        settings_status = 0;
    });
});


function settings() {
    $("#TopologySettings").draggable();
    $("#TopologySettings").show();
    $('#TopologySettings').html("<div id='topologySettings'> <b>Settings</b><br>Type a value between 60 <br> and 200 (default:142) <br> <form name='sett' onsubmit='defineSettings()' method='get'> Hosts Size: <input type='text' name='host_size' id='teste'><br>  Switches Size: <input type='text' name='switch_size'><br> Labels Size: <input type='text' name='labels_size'><br> <input type='submit' value='Submit'> </form> </div>");
}

function defineSettings() {
    var hostSize = $("input[name=host_size]", "#topologySettings").val();
    var switchSize = $("input[name=switch_size]", "#topologySettings").val();
    var labelSize = $("input[name=labels_size]", "#topologySettings").val();
    if (hostSize !== "" || switchSize !== "" || labelSize !== "") { // Verificar se não é NULL
        if (isNaN(hostSize) === false && isNaN(switchSize) === false && isNaN(labelSize) === false) { //Verificar se é número
            alert("Parameters inserted!");
        } else {
            alert("All parameters must be numbers! Otherwise will be used the default configuration.");
        }

    } else {
        alert("All parameters must be filled out! Otherwise will be used the default configuration.");
    }
}
