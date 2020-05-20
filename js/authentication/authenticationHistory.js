var authentication_history_status = 1; //Botão do Histórico de Autenticação
//Authentication History
$(function () {
    $("#authentication_history").click(function () {
        if (authentication_history_status === 0) {
            authentication_history_status = 1;
            $("#AuthenticationHistory").empty();
            return;
        }
        authentication_history_status = 0; // Table Turned On
        authenticationHistory();
    });
});

function authenticationHistory() {
    $("#AuthenticationHistory").empty();
    $("#AuthenticationHistory").draggable();
    $.when(callGetAjax("/wm/authentication/history/json")).done(function (received) {
        var res = "";
        var data = JSON.parse(received);
        for (i = 0; i < data.length; i++) {
            var jObject = data[i];
            var user = jObject.user;
            var action = jObject.action;
            var ipAddress = user.ipAddress;
            var userName = user.userName;
            var dataRow = user.data;
            var time = user.time;
            res += "<tr> <td>" + ipAddress + "</td> <td>" + userName + "</td> <td>" + dataRow + "</td> <td>" + time + "</td><td>" + action + "</td> </tr> ";
        }
        $('#AuthenticationHistory').html("<table id='authenticationList'> <thead> <tr> <th>IP ADDRESS</th> <th>USERNAME</th>  <th>DATE</th>  <th>TIME</th> <th>ACTION</th> </tr> </thead> <tbody>" + res + "</tbody> </table>");
    });

}
