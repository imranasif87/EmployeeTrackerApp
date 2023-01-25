<?php
include('dbcon.php');
$gname= $_POST['grpname'];
$districtId = $_POST['districts'];
$Id = $_POST['hidId'];

$SQl= "update app_group set Name = '$gname', DistrictsId = '$districtId' Where Id = $Id";
$updated = mysqli_query($con,$SQl);
echo 'success';
?>