<?php

include('dbcon.php');
$empId = $_GET["empId"];
$employees=array();

$sql="SELECT * FROM  app_cutomer_image_detail order by createdOn DESC";
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$employees[]=$row;
   }
}
echo json_encode($employees);
?>