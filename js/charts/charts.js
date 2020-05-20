var chart_status = 1; // Botão do gráfico liberado.
//Generate Charts
$(function () {
    $("#charts").click(function () {
        var url = "generate_charts.html?mechanism=" + mechanismOption;
        var win = window.open(url, '_blank');
    });
});
