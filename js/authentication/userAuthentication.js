var authenticated_status = 1; //Botão dos Usuários authenticados liberado.
//Users Authenticated Table
$(function () {
    $("#users_authenticated").click(function () {
        if (authenticated_status === 0) {
            authenticated_status = 1;
            $("#Authenticated").empty();
            return;
        }
        authenticated_status = 0; // Table Turned On
        userAuthenticatedTables();
    });
});

function userAuthenticatedTables() {

    $("#Authenticated").empty();
    $("#Authenticated").draggable();
    $.when(callGetAjax("/wm/authentication/users/json")).done(function (received) {
        var res = "";
        var data = JSON.parse(received);
        var i;
        for (i = 0; i < data.length; i++) {
            var jObject = data[i];
            var ipAddress = jObject.ipAddress;
            var userName = jObject.userName;
            var dataRow = jObject.data;
            var time = jObject.time;
            res += "<tr> <td>" + ipAddress + "</td> <td>" + userName + "</td> <td>" + dataRow + "</td> <td>" + time + "</td> </tr> ";
        }
        $('#Authenticated').html("<table id='authenticationList'> <thead> <tr> <th>IP ADDRESS</th> <th>USERNAME</th>  <th>DATE</th>  <th>TIME</th> </tr> </thead> <tbody>" + res + "</tbody> </table>");
    });
}
