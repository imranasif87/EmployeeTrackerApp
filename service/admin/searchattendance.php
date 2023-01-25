<?php

include('dbcon.php');

$empId = $_POST["empid"];
$dateto = $_POST["dateto"];
$datefrom = $_POST["datefrom"];

$employees=array();

$where = "empId = " . $empId;

if($dateto!="" && $datefrom!="")
{
   $where .= " AND (STR_TO_DATE(attDate, '%d/%m/%Y') >=  STR_TO_DATE('$dateto', '%d/%m/%Y') AND STR_TO_DATE(attDate, '%d/%m/%Y') <=  STR_TO_DATE('$datefrom', '%d/%m/%Y'))";
}

$sql="SELECT DISTINCT attDate, attTime,  ROUND(latitude, 2) as 'latitude',  ROUND(longitude, 2) as 'longitude' FROM app_employee_attendance where " . $where . " order by attDate DESC";

if($record=mysqli_query($con,$sql)){
        while($row=mysqli_fetch_assoc($record)){
	$employees[]=$row;
   }
}

echo json_encode($employees);

?>