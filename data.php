<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
/* header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");*/ 
 header("Cache-Control: no-store, no-cache, must-revalidate"); 
 header("Cache-Control: post-check=0, pre-check=0", false);
 header("Pragma: no-cache");
	$conn_array = array (
				"UID" => "group6@fujo6u7aay", 
				"PWD" => "info343-monsters-app", 
				"Database" => "group6-db1",
				"Encrypt" => 1,
				"TrustServerCertificate" => 1) ;
	
	$conn = sqlsrv_connect('tcp:fujo6u7aay.database.windows.net,1433' , $conn_array);
	if(!$conn){
		echo("db error");
	}
	if($_GET['a'] == "search"){
		if(isset($_GET['searchby'])){
			$by = $_GET['searchby'];
		} else {
			$by = "name";
		}
		$searchTerm = $_GET['q'];
		if($by == "name"){
			//$results = sqlsrv_query($conn, "SELECT id,name FROM monsters WHERE CONTAINS(".$by.",'".$searchTerm."');");
			$results = sqlsrv_query($conn, "SELECT id,name FROM monsters WHERE ".$by." LIKE '%".$searchTerm."%';");
		} else {
			$results = sqlsrv_query($conn, "SELECT id,name FROM monsters WHERE ".$by."='".$searchTerm."';");
		}
		$i = 0;
		$monsterArray = array();
		while($row = sqlsrv_fetch_array($results,SQLSRV_FETCH_ASSOC)){
			$monsterArray[$i]["name"] = $row['name'];
			$monsterArray[$i]["id"] = $row['id'];
			$i ++;
		}
		$returnData = array("list"=>$monsterArray);
		echo(json_encode($returnData));
		
	} else if($_GET['a'] == "list"){
		$results = sqlsrv_query($conn, "SELECT id,name FROM monsters;");
		$i = 0;
		$monsterArray;
		while($row = sqlsrv_fetch_array($results,SQLSRV_FETCH_ASSOC)){
			$monsterArray[$i]["name"] = $row['name'];
			$monsterArray[$i]["id"] = $row['id'];
			$i ++;
		}
		$returnData = array("data"=>$monsterArray);
		echo(json_encode($returnData));
	}
	
	
	else if($_GET['a'] == "details"){
		
		function getLast($k,$c){
			$results = sqlsrv_query($c,"SELECT evolveFrom FROM evolveFrom WHERE owner=".$k.";");
			$result = sqlsrv_fetch_array($results,SQLSRV_FETCH_ASSOC);
			if($result){
				$ar = getLast($result['evolveFrom'],$c);
				
				$mats = array();
				$rows = sqlsrv_query($c,"SELECT * FROM materials WHERE evolveId=".$result['evolveFrom'].'999'.$k.";");
				while($row = sqlsrv_fetch_array($rows,SQLSRV_FETCH_ASSOC)){
					$mats[] = $row['material'];
				}
				$ob['mats'] = $mats;
				$ob['name'] = sqlsrv_fetch_array(sqlsrv_query($c,"SELECT * FROM monsters WHERE id=".$result['evolveFrom'].";"),SQLSRV_FETCH_ASSOC)['name'];
				$ob['id'] = $result['evolveFrom'];
				$ar[] = $ob;
				return $ar;
			}
			$ar = array();
			return $ar;
		}
		
		function getNext($k,$c){
			$r = $k;
			$ar = array();
			$results = sqlsrv_query($c,"SELECT evolveTo FROM evolveTo WHERE owner=".$r.";");
			while($result=sqlsrv_fetch_array($results,SQLSRV_FETCH_ASSOC)){
				
				$mats = array();
				$rows = sqlsrv_query($c,"SELECT * FROM materials WHERE evolveId=".$r.'999'.$result['evolveTo'].";");
				while($row = sqlsrv_fetch_array($rows,SQLSRV_FETCH_ASSOC)){
					$mats[] = $row['material'];
				}
				$ob['mats'] = $mats;
				$ob['name'] = sqlsrv_fetch_array(sqlsrv_query($c,"SELECT * FROM monsters WHERE id=".$result['evolveTo'].";"),SQLSRV_FETCH_ASSOC)['name'];
				$ob['id'] = $result['evolveTo'];
				$ob['prev'] = $r;
				$ar[] = $ob;
				$r = $result['evolveTo'];
			}
			return $ar;
		}
		$j;
		$results = sqlsrv_query($conn, "SELECT * FROM monsters WHERE id='".$_GET['id']."';");
		if($result = sqlsrv_fetch_array($results,SQLSRV_FETCH_ASSOC)){
			foreach($result as $col=>$val){
				$j[$col] = $val;
			}
			$j['prevo'] = getLast($_GET['id'],$conn);
			$j['evo'] = getNext($_GET['id'],$conn);
			echo(json_encode($j));
		}
	} else if($_GET['a'] == "materials"){
		//get from and to
		$materials = array();
		$results2 = sqlsrv_query($conn,"SELECT evolveFrom FROM evolveFrom WHERE owner=".$_GET['to'].";");
		$result2 = sqlsrv_fetch_array($results2,SQLSRV_FETCH_ASSOC);
		$results = sqlsrv_query($conn,"SELECT evolveId FROM evolveTo WHERE owner=".$result2['evolveFrom']." AND evolveTo=".$_GET['to'].";");
		$result = sqlsrv_fetch_array($results,SQLSRV_FETCH_ASSOC);
		if($result){
			$results = sqlsrv_query($conn,"SELECT * FROM materials WHERE evolveId=".$result['evolveId'].";");
			while($row = sqlsrv_fetch_array($results,SQLSRV_FETCH_ASSOC)){
				$results3 = sqlsrv_query($conn,"SELECT name FROM monsters WHERE id=".$row['material'].";");
				$result3 = sqlsrv_fetch_array($results3,SQLSRV_FETCH_ASSOC);
				$ma['id'] = $row['material'];
				$ma['name'] = $result3['name'];
				$materials[] = $ma;
			}
		}
		$j['materials'] = $materials;
		echo(json_encode($j));
		
	}
	sqlsrv_close($conn);
?>