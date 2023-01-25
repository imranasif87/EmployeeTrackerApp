<?php
include('dbcon.php');
$pass = $_POST['pass'];
$eId = $_POST['eId'];
$SQl= "update app_employee set password = '$pass' Where Id = $eId";
$updated = mysqli_query($con,$SQl);
echo 'success';
?>