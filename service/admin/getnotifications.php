<?php

include('dbcon.php');
$noti=array();

$sql="SELECT * FROM  app_notification Order By createdOn desc";

    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$noti[]=$row;
   }
}
echo json_encode($noti);
?>