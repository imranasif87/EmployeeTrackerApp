<?php

include('dbcon.php');
$adminInfo=array();

$username=$_POST['username'];
$password=$_POST['password'];
$sql="SELECT * FROM  AppAdmin WHERE username =  '$username' AND password =  '$password'";
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$adminInfo[]=$row;
   }
}
echo json_encode($adminInfo);
?>