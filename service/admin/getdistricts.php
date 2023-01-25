<?php

include('dbcon.php');
$dis=array();

$sql="SELECT * From Districts ORDER BY Name ASC";
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$dis[]=$row;
   }
}
echo json_encode($dis);
?>