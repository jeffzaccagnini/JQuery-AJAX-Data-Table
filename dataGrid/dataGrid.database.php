<?php
class DB {
	
	protected $host;
	protected $user;
	protected $pass;
	protected $name;
	protected $conn;
	
	
	function __construct($db_config) 
	{ 

        $this->host =  $db_config['host'];  
        $this->user =  $db_config['user'];  
        $this->pass =  $db_config['pass']; 
		$this->name =  $db_config['name']; 
		
		$this->conn = self::connect();
    }
	
	function connect() 
	{
		try 
		{
			$conn = new PDO('mysql:host='.$this->host.';dbname='.$this->name, $this->user, $this->pass);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $conn;	
		} 
		catch(PDOException $e) 
		{  	
  			echo "database connection error";  
    		file_put_contents('PDOErrors.txt', $e->getMessage(), FILE_APPEND); 
		}
	}
	
	function insert($item) 
	{
		$count = count($item);
	
		foreach($item as $k => $v) {
			$i++;
			$str1 .= $k;
			$str2 .= ':'.$k;
		
			if ($i < ($count - 0)) {
     			$str1 .= ', ';
				$str2 .= ', ';
 			}
		}
		
		$query = "INSERT INTO inventory ( ". $str1." ) VALUE (  ". $str2." )";
		
		$STH = $this->conn->prepare($query);
		
		$STH->execute((array) $item);
		
		$STH = $this->conn->query('SELECT * from inventory');  
		$rows_affected = $STH->rowCount();  
		
		$response = array('status' => 1, 'msg' => 'Success!', 'count' => $rows_affected);
		
		echo json_encode($response);	
	}
	
	function resultArray($result) 
	{
		$res_array = array();
		
		
		for ($count=0; $row = $row = $result->fetch(); $count++) {
     		$res_array[$count] = $row;
   		}

   		return $res_array;
	}
		
	
	function getCount() {	
		$result = $this->conn->query('SELECT * FROM '.$this->table.'');  
		$this->count = $result->rowCount();  
		return $this->count;
	}
	
}