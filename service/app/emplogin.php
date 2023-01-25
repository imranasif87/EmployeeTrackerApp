<?php

include('dbcon.php');
$empInfo=array();

$username=$_POST['email'];
$password=$_POST['password'];

$sql="SELECT * FROM  app_employee WHERE (email = '$username' OR username = '$username') AND password = '$password' AND status = 1";
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$empInfo[]=$row;
   }
}
echo json_encode($empInfo);
?>