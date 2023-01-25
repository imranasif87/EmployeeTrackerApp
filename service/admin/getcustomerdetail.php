<?php

include('dbcon.php');
$empId = $_GET["empId"];
$employees=array();
$sql="";
if (isset($_POST['empId']))
{
       $sql="SELECT * FROM  app_cutomer_image_detail cd inner join app_employee e ON cd.empId = e.empId where cd.empId = " . $empId . " order by  createdOn DESC";
}
else
{
     $sql="SELECT * FROM  app_cutomer_image_detail cd inner join app_employee e ON cd.empId = e.Id order by createdOn DESC";
}
if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$employees[]=$row;
   }
}
echo json_encode($employees);
?>