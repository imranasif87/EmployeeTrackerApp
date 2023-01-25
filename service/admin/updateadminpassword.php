<?php

include('dbcon.php');  

$oldpass = $_POST['oldpassword'];
$newpass = $_POST['newpassword'];
$id = $_POST['hidId'];

$SQl= "Update AppAdmin set password = '$newpass' Where password = '$oldpass' and Id = '$id'";

$updated = mysqli_query($con, $SQl);

echo 'success';

?>