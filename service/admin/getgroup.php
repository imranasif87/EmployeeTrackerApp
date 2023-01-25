<?php

include('dbcon.php');
$gId = $_GET["gId"];
$group=array();

$sql="SELECT * FROM  app_group where Id = " . $gId;
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$group[]=$row;
   }
}
echo json_encode($group);
?>