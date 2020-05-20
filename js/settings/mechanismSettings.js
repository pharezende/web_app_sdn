//Define Mechanism
var mechanism_status = 1;
$(function () {
    $("#mechanism").click(function () {
        if (mechanism_status === 0) {
            mechanism_status = 1;
            $("#MechanismSettings").hide();
            return;
        }
        mechanism_status = 0;
        defineMechanism();
    });
});

function defineMechanism() {
    $("#MechanismSettings").draggable();
    $("#MechanismSettings").show();
    $("#MechanismSettings").html("<div id='mechanismSettings'><b>Type:</b><br> <form name='mOption'> <input type='radio' name='m_option' value='POLLING'> Polling<br> <input type='radio' name='m_option' value='SFLOW'>Sflow<br> <input type='button' value='Send' onclick='choosenMechanism()'> </form> </div>");
}

function choosenMechanism() {
    var option = $('input[name=m_option]:checked', '#MechanismSettings').val();
    if (option === "POLLING") {
        mechanismOption = 0;
    } else if (option === "SFLOW") {
        mechanismOption = 1;
    }
    clearDiv("#MechanismSettings");
    mechanism_status = 1;
    alert(option + " loaded!");
}

function appendMechanism(target) {
    return mechanismOption + "@" + target;
}
