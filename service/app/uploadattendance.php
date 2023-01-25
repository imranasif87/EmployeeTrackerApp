<?php

include('dbcon.php');

$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];
$empId = $_POST["empId"];
$attDate = $_POST["attDate"];
$attTime = $_POST["attTime"];

$SQl= "insert into app_employee_attendance(latitude, longitude, empId, attDate, attTime) VALUES('$latitude', '$longitude', '$empId', '$attDate', '$attTime')";

$inserted = mysqli_query($con, $SQl);

echo 'success';
?>