/// <reference path="E:\Projects\Jquery_Mobile\Britelite\SFMobile\BriteliteApp\BriteliteAdmin\js/jquery-1.11.3.min.js" />

function logout() {
    eraseCookie("uname");
    eraseCookie("rname");
    eraseCookie("uId");
    eraseCookie("groupId");
    eraseCookie("districtId");
    document.location.href = "../index.html";
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

$(document).ready(function () {

    //alert(readCookie("uname"));
    // check for cookies
    if (readCookie("uname") == null) {
        document.location.href = "../index.html";
    } else {
        if (readCookie("rname") == "admin") {
            $('.liadmin').hide();
            $('#lnkProfile').attr('href', 'Profile.html?empId=' + readCookie("uId"));
            $('#divIsAdmin').hide();
        }
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    /////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    ///// Show All Employees
    $('#page-wrapper').mask("");
    var formURL;
    if (readCookie("rname") == "admin") {
        formURL = 'http://www.slamslogic.com/britelite/service/admin/allemployeesbygroup.php?gId=' + readCookie("groupId");
    }
    else {
        formURL = 'http://www.slamslogic.com/britelite/service/admin/getcustomerdetail.php';
    }
    $.ajax(
    {
        url: formURL,
        type: "POST",
        data: {},
        datatype: "json",
        success: function (data, textStatus, jqXHR) {
            var record = JSON.parse(data);
            if (record.length > 0) {
                var tbody = '';
                var sr = 0;
                $("#dataTables-example").dataTable().fnDestroy();
                for (var i = 0; i < record.length; i++) {
                    tbody += '<tr>'
                                  + '<td>' + (++sr) + '</td>'
                                  + '<td>' + record[i].fname + ' ' + record[i].lname + '</td>'
                                  + '<td>' + record[i].name + '</td>'
                                  + '<td>' + record[i].serial + '</td>'
                                  + '<td>' + record[i].createdOn + '</td>'
                                  + '<td><a href="EmployeeDetail.html?empId=' + record[i].empId + '"><i class="fa fa-list-alt fa-fw"></i></a>&nbsp;'
                                  + '<i class="glyphicon glyphicon-picture" onclick="getImages(' + record[i].cusImageId + ')" data-toggle="modal" data-target="#mark"></i>'
                                  + '<i class="glyphicon glyphicon-map-marker" style="margin-left:7px;" onclick="getCoordinates(' + record[i].Latitude + ', ' + record[i].Longitude + ')" data-toggle="modal" data-target="#mapModal"></i></td>'
                              + '</tr>';
                }

                $('#tbAll').html(tbody);
                $('#dataTables-example').DataTable();
                $('#page-wrapper').unmask();
            }
            else {
                $('#tbAll').html('<tr><td colspan="7">There is no record to show.</td></tr>');
                $('#page-wrapper').unmask();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#page-wrapper').unmask();
            $('container').unmask();
        }
    });
    ////////////////////////////////////////////////////////////////////////////////
    ///// Utility Functions
    function GetQueryStringParams(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
});

var map;
var lat, lng;
function getCoordinates(latitude, longitude) {
    lat = parseFloat(latitude);
    lng = parseFloat(longitude);
}
$('#mapModal').on('shown.bs.modal', function (e) {
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLatlng
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Images"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
});

function getImages(imgId) {
    $('#mark').mask();
    var formURL = 'http://www.slamslogic.com/britelite/service/admin/getimagedetail.php?imgId=' + imgId;
    $.ajax(
    {
        url: formURL,
        type: "POST",
        data: {},
        datatype: "json",
        success: function (data, textStatus, jqXHR) {
            var record = JSON.parse(data);
            if (record.length > 0) {
                var tbl = '';
                var sr = 0;
                for (var i = 0; i < record.length; i++) {
                    tbl += '<div class="col-lg-4">'
                            + '        <img src="http://www.slamslogic.com/britelite/images/product/' + record[i].imgName + '" alt="img" width="150" height="215" />'
                            + '    </div>';
                }
                $('#rowImages').html(tbl);
                $('#mark').unmask();
            }
            else {
                $('#rowImages').html('<div class="col-lg-4">There is no images to show</div>');
                $('#mark').unmask();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#mark').unmask();
        }
    });
}