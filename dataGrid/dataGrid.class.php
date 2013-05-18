<?php 

class dataGrid extends DB {
	
	function fetchAll($request) 
	{
		$this->table = $request['table'];
		$this->limit = getLimit($request['page'], $request['ipp']);
		$result1 = $this->conn->query('SELECT * from '.$this->table.' LIMIT '.$this->limit.'');  
		# setting the fetch mode  
		$result1->setFetchMode(PDO::FETCH_OBJ);
		# result to array function;
		$resultArr = self::resultArray($result1);
		# count;
		$count = self::getCount();
		
		$response = array('status' => 1, 'message' => 'success', 'count' => $count, 'rows' => $resultArr);
		echo json_encode($response);
	}
	
}


