<?php

###For more information about HTTP Status Code, see: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

$url = $_POST['parameter'];
$response = "";
if (strpos($url,'#') !== false) {//Verify if is POST
	//POST
	$data = substr($url, strpos($url, "#")+1);
	$options = array(
    		'http' => array(
        	'header'  => "Content-type: application/json\r\n", "Accept: application/json\r\n",
        	'method'  => 'POST',
        	'content' => $data,
    		),
	);
	$context  = stream_context_create($options);
	$response = file_get_contents($url, false, $context);
}

elseif (strpos($url,'%') !== false){//Verify the Code Status
	ini_set('default_socket_timeout', 10); //Define the socket timeout to 10 seconds.
	$target = substr($url, 0, strpos($url, "%"));
	set_error_handler("warningHandler", E_WARNING);
	$header = null;
	$header = get_headers($target);
	if($header === false){
		print "Can't connect! \nVerify if the Controller is ON.";
		return;
	}
	print "Status Code: ".substr($header[0], 9);
	return;
}

else{
	//GET
	$response = file_get_contents($url);
}
print $response;



function warningHandler($errno, $errstr) { 
	// Process Warning
	return true;
}

?>
