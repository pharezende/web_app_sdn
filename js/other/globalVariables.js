var URL = "http://192.168.1.3:8080"; //Location of the Controller's server. Default IP and Port.
//--------------------------------------------------------
var mechanismOption = 0; //Mecanismo escolhido, default é o POLLING(0).
var host_counter = 0; //Contador de Hosts
var switch_counter = 0; // Contador de Switches
var host_left_counter = 100; // Contador do Host à Esquerda
var switch_left_counter = 100; // Contador de Switch à Direita
var ultimo_linkado = 0; // Ultimo host ligado.
var last_left_counter = 100; // Contador da última linha à esqueda.
var flow_aux; // Ultimo fluxo escolhido
var Gl_host_size = "142"; // Tamanho da imagem do host.
var Gl_switch_size = "142"; // Tamanho da imagem do switch.
//------------------------------------------------------------------
var PIDs_List = new Array();
// Armazenar os PIDs dos Switches.
var MACs_List = new Array();
// Armazenar os MACs dos Hosts.
var Nb_Hosts_Switch = new Array();
// Número de Hosts de cada Switch.
var Hosts_Switch = new Array();
// Hosts ligados no Switch.
var Ports_Switch = new Array();
// Portas dos Switches
var Links = new Array();
//Mapear todos os links do Switch.
var Connections = new Array();
//Mapear todas as conexões.
var Switch_Links = new Array();
//Número de Links ligado nesse Switch, excluindo Hosts.
var Proxima_Posicao_Switch = new Array();
//Próxima posição que será colocado o link.
var Neighbor = new Array();
//Vizinho desse Switch
var AllSLinks = new Array();
//Todos os links da topologia, exceto Hosts
var AllLinks = new Array();
//Todos os links da topologia
var TotalBandwidthPort = new Array();
// Porta total daquela banda.
var HashMap = new Array();
// Mapear Switch-> Div
//------------------------------------------------------------
