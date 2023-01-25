<?php
include('dbcon.php');
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$designation = $_POST['designation'];
$qualification = $_POST['qualification'];
$experience = $_POST['experience'];
$email = $_POST['email'];
$photo = $_POST['image'];
$department= $_POST['department'];
$phone = $_POST['phone'];
$mobile = $_POST['mobile'];
$address = $_POST['address']; 
$joining= $_POST['joining'];
$status = $_POST['rdoStatus'];
$groupId = $_POST['group'];
$username = explode("@", $email);
$CanUploadImage = 0;
$AutoAttendanceRequire = 0;
$CanEditProfile = 0;
$TrackEmployee= 0;
$isAdmin = 0;

 foreach($_POST['emp_type'] as $selected){
        if($selected == 'Can Upload Image')
          $CanUploadImage = 1;
        if($selected == 'Auto attendance require')
          $AutoAttendanceRequire = 1;
        if($selected == 'Can edit profile')
          $CanEditProfile = 1;
        if($selected == 'Track employee')
          $TrackEmployee= 1;
    }
if (isset($_POST['isadmin'])) {
 $isAdmin = 1;
}

$SQl= "insert into app_employee(fname,lname, username, designation, qualification, experience, email, photo, department, phone, mobile, address, CanUploadImage, AutoAttendanceRequire, CanEditProfile, TrackEmployee, joining, status, groupId, isAdmin) VALUES ('$fname', '$lname','$username[0]', '$designation', '$qualification', '$experience', '$email', '$photo', '$department','$phone','$mobile','$address','$CanUploadImage','$AutoAttendanceRequire','$CanEditProfile','$TrackEmployee','$joining', '$status', '$groupId', '$isAdmin')";
$inserted = mysqli_query($con,$SQl);
echo 'success';
?>