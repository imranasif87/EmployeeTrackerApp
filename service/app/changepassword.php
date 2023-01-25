<?php

include('dbcon.php');  

$oldpass = $_POST['oldpassword'];
$newpass = $_POST['newpassword'];
$id = $_POST['id'];

$SQl= "Update app_employee set password = '$newpass' Where password = '$oldpass' and Id = '$id'";

$updated = mysqli_query($con, $SQl);

echo 'success';

?>