<?php
include('dbcon.php');
$gname= $_POST['grpname'];
$districtId = $_POST['districts'];


$SQl= "insert into app_group(Name,DistrictsId) VALUES ('$gname', '$districtId')";

$inserted = mysqli_query($con,$SQl);

echo 'success';
?>