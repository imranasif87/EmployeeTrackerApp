<?php

include('dbcon.php');
$adminInfo=array();

$username=$_POST['username'];
$password=$_POST['password'];

$sql="SELECT *, e.Id EmpId FROM  app_employee e INNER JOIN app_group g ON e.groupId = g.Id WHERE (email = '$username' OR username = '$username') AND password =  '$password' AND isAdmin = 1";

    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$adminInfo[]=$row;
   }
}
echo json_encode($adminInfo);
?>