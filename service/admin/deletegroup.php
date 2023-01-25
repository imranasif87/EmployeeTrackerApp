<?php
include('dbcon.php');
$Id = $_GET['gId'];

$SQl= "Delete from app_group Where Id = $Id";
$deleted = mysqli_query($con,$SQl);
echo 'success';
?>