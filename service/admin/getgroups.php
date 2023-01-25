<?php

include('dbcon.php');
$groups=array();

$sql="SELECT g.Id, g.Name As 'GroupName' , d.Name As 'DistrictName' FROM  app_group g INNER JOIN Districts d ON g.DistrictsId = d.Id";
    if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$groups[]=$row;
   }
}
echo json_encode($groups);
?>