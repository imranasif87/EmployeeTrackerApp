<?php

include('dbcon.php');
$adminInfo=array();

$gId=$_GET['gId'];

$sql="SELECT *, e.Id As EmpId FROM  app_employee e INNER JOIN app_group g ON e.groupId = g.Id WHERE e.groupId = '$gId' and e.isAdmin <> 1";

    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$adminInfo[]=$row;
   }
}
echo json_encode($adminInfo);
?>