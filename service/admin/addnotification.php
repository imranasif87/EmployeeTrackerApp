<?php
include('dbcon.php');
$noti = $_POST['noti'];

$SQl= "insert into app_notification(Description) VALUES ('$noti')";

$inserted = mysqli_query($con,$SQl);

echo 'success';
?>