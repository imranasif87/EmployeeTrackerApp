<?php
header('Access-Control-Allow-Origin: *');
$target_dir = "../../images/employee/";
$target_file = $target_dir . basename($_FILES["fileupload"]["name"]);

if (move_uploaded_file($_FILES["fileupload"]["tmp_name"], $target_file)) {
        echo basename($_FILES["fileupload"]["name"]);
} else {
        echo "error";
}
?>