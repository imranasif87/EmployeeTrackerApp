<?php
include('dbcon.php');
$Id = $_GET['empId'];

$SQl= "Delete from app_employee Where Id = $Id";
$deleted = mysqli_query($con,$SQl);
echo 'success';
?>