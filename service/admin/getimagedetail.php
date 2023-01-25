<?php

include('dbcon.php');
$imgId = $_GET["imgId"];
$employees=array();

$sql="SELECT * FROM  app_image_detail where cusImageId = " . $imgId;
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$employees[]=$row;
   }
}
echo json_encode($employees);
?>