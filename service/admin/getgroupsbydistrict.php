<?php

include('dbcon.php');
$dId = $_GET["disId"];
$group=array();

$sql="SELECT * FROM  app_group where DistrictsId = " . $dId ;
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$group[]=$row;
   }
}
echo json_encode($group);
?>