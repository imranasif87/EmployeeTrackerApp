<?php

include('dbcon.php');
$empId = $_GET["empId"];
$employees=array();

$sql="SELECT *, e.Id As EmpId FROM  app_employee e INNER JOIN app_group g ON e.groupId = g.Id where e.Id = " . $empId;
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$employees[]=$row;
   }
}
echo json_encode($employees);
?>