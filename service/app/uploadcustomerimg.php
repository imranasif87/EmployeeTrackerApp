<?php

include('dbcon.php');  

$target_dir = "../../images/product/";

$imgs = $_POST['images'];
$cnic = $_GET['cnic'];
$name = $_GET['name'];
$address = $_GET['address'];
$serial = $_GET['serial'];
$type = $_GET['type'];
$latlng = explode(",", $_GET['latlng']);
$empId = $_GET['empid']; 

$SQl= "insert into app_cutomer_image_detail(cnic, name, address, serial, type, Latitude, Longitude, empId) VALUES('$cnic', '$name', '$address', '$serial', '$type', '$latlng[0]', '$latlng[1]', '$empId')";

$inserted = mysqli_query($con, $SQl);
$last_id = mysqli_insert_id($con);

foreach($imgs as $img){
   if( strpos($img, 'data:image/jpeg;base64') !== false )
   {
	$img = str_replace('data:image/jpeg;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
        $imgName = uniqid() . '.jpg';
	$file = $target_dir . $imgName;
	$success = file_put_contents($file, $data);
        $SQl= "insert into app_image_detail(imgName, cusImageId) VALUES('$imgName', '$last_id')";
        $inserted = mysqli_query($con, $SQl);
   }
  else
   {
        $img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
        $imgName = uniqid() . '.png';
	$file = $target_dir . $imgName;
	$success = file_put_contents($file, $data);
        $SQl= "insert into app_image_detail(imgName, cusImageId) VALUES('$imgName', '$last_id')";
        $inserted = mysqli_query($con, $SQl);
   }
}
echo 'success';

?>