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
$Id = $_POST['hidId'];
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


$SQl= "update app_employee set fname = '$fname', lname = '$lname', username = '$username[0]', designation = '$designation', qualification = '$qualification', experience = '$experience', email = '$email', photo = '$photo', department = '$department', phone = '$phone', mobile = '$mobile', address = '$address', CanUploadImage = '$CanUploadImage', AutoAttendanceRequire = '$AutoAttendanceRequire', CanEditProfile = '$CanEditProfile', TrackEmployee = '$TrackEmployee', joining = '$joining', status = '$status', groupId = '$groupId', isAdmin = '$isAdmin' Where Id = $Id";
$updated = mysqli_query($con,$SQl);
echo 'success';
?>