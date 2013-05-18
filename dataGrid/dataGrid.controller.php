<?php

/* error reporting  */  
ini_set("error_reporting", "true");  
error_reporting(E_ALL^E_NOTICE);

require 'dataGrid.config.php'; 
require 'dataGrid.helpers.php';
require 'dataGrid.database.php';
require 'dataGrid.class.php';

$request = array(); 

if($_GET){
	
	 /* store $_GET date in the $data array() */
	foreach($_GET as $k => $v) {
		$$k = $v;
		$request[$k] = $v;
	}
	
	$g1 = new dataGrid($db1);
	$g1->fetchAll($request);

} else if ($_POST) {
	

} else {
	


}



?>