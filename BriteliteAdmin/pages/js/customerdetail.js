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

    /////////////////////////////////////////////////////
    /////////// populate fields
    if (GetQueryStringParams('empId') != undefined) {
        $('#eid').val(GetQueryStringParams('empId'));
        $('#page-wrapper').mask("");
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/getemployee.php?empId=' + GetQueryStringParams('empId');
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: {},
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                var record = JSON.parse(data);
                if (record.length > 0) {
                    $("label[name=Id]").html(record[0].EmpId);
                    $("input[name=eId]").val(record[0].EmpId);
                    $("label[name=fname]").html(record[0].fname);
                    $("label[name=lname]").html(record[0].lname);
                    $("label[name=designation]").html(record[0].designation);
                    $("label[name=email]").html(record[0].email);
                    $("label[name=joining]").html(record[0].joining);
                    $("label[name=mobile]").html(record[0].mobile);
                    $("label[name=address]").html(record[0].address);
                    $("#imgPic").attr('src', 'http://www.slamslogic.com/britelite/images/employee/' + record[0].photo);

                    $('#page-wrapper').unmask();
                }
                else {
                    alert('There is no record to show.');
                    $('#page-wrapper').unmask();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#page-wrapper').unmask();
                $('container').unmask();
            }
        });
        /////////////////////////////////////////////////////////////////
        //// Get all customer images
        $('#page-wrapper').mask("");
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/getcustomerdetail.php?empId=' + GetQueryStringParams('empId');
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
                        tbl += '<tr data-toggle="modal" onclick="getImages(' + record[i].cusImageId + ')" data-target="#mark">'
                                  + '<td>' + (++sr) + '</td>'
                                  + '<td>' + record[i].name + '</td>'
                                  + '<td>' + record[i].createdOn + '</td>'
                                + '</tr>';
                    }
                    $('#tbCusDetail').html(tbl);
                    $('#page-wrapper').unmask();
                }
                else {
                    $('#tbCusDetail').html('<tr><td colspan="3">There is no record to show</td></tr>');
                    $('#page-wrapper').unmask();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#page-wrapper').unmask();
            }
        });
        /////////////////////////////////////
        /// call today attendance
        getTodayAttendance();
    }
    ////////////////////////////////////////////////////////
    ///// Change password
    $('#spChange').click(function () {
        if ($('#spChange').html() == 'Change') {
            $('#spChange').html('Save');
            $('#spPassword').html('<input type="text" style="width:50%;height:2%;" name="pass" />');
        }
        else {
            $('#empDetail').mask("");
            var postData = $('#frmPass').serializeArray();
            var formURL = 'http://www.slamslogic.com/britelite/service/admin/employeechangepassword.php';
            $.ajax(
           {
               url: formURL,
               type: "POST",
               data: postData,
               datatype: "json",
               success: function (data, textStatus, jqXHR) {
                   if (data === 'success') {
                       $('#empDetail').unmask();
                       $('#spChange').html('Change');
                       $('#spPassword').html('*********');
                   }
                   else {
                       alert('Server Error');
                       $('#empDetail').unmask();
                   }
               },
               error: function (jqXHR, textStatus, errorThrown) {
                   alert(errorThrown);
                   $('#empDetail').unmask();
               }
           });
        }
    });
    ///////////////////////////////////////////////////////////////////////////////
    ///// get today attendance for map
    function getTodayAttendance() {
        var todayDate = new Date();
        var date = todayDate.toLocaleDateString("en-US").split("/");
        //alert(date);
        date = date[1] + '/' + date[0] + '/' + date[2];
        $('#dp1').val(date);
        $('#dp2').val(date);

        $('#map-body').mask("");
        var postData = $('#frmAtt').serializeArray();
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/searchattendance.php';
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: postData,
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                var record = JSON.parse(data);
                //if (record.length > 0) {
                var records = [];
                for (var i = 0; i < record.length; i++) {
                    records.push(record[i]);
                }
                drawGoogleMapAtt(records);
                // }
                //else {
                //    $('#map-body').unmask();
                //}
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#map-body').unmask();
            }
        });
    }
    /////////////////////////////////////
    $("#frmAtt").submit(function (e) {
        e.preventDefault();	//STOP default action
        $('#map-body').mask("");
        var postData = $(this).serializeArray();
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/searchattendance.php';
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: postData,
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                var record = JSON.parse(data);
                if (record.length > 0) {
                    var records = [];
                    for (var i = 0; i < record.length; i++) {
                        records.push(record[i]);
                    }
                    drawGoogleMapAtt(records);

                }
                else {
                    $('#map-body').unmask();
                    e.preventDefault();	//STOP default action
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#map-body').unmask();
            }
        });
        e.preventDefault();	//STOP default action
    });
    ///////////////////////////////////////////////////////////
    /// Show attendance on map
    function drawGoogleMapAtt(records) {
        var gm = google.maps;
        var map;
        var bounds = new google.maps.LatLngBounds();
        var lat = 30.3753, lng = 69.3451;
        if (records.length > 0)
        {
            lat = parseFloat(records[0].latitude);
            lng = parseFloat(records[0].longitude);
        }
        var mapOptions = {
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng()
        };
        // Display a map on the page
        map = new google.maps.Map($("#map-canvas")[0], mapOptions);
        var iw = new gm.InfoWindow();
        var oms = new OverlappingMarkerSpiderfier(map,
          { markersWontMove: true, markersWontHide: true });
        var usualColor = 'ed2323';
        var spiderfiedColor = 'ed2323';
        var iconWithColor = function (color) {
            return 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|+|' +
              color + '|000000|ffff00';
        }
        var shadow = new gm.MarkerImage(
          'https://www.google.com/intl/en_ALL/mapfiles/shadow50.png',
          new gm.Size(37, 34),  // size   - for sprite clipping
          new gm.Point(0, 0),   // origin - ditto
          new gm.Point(10, 34)  // anchor - where to meet map location
        );

        oms.addListener('click', function (marker) {
            iw.setContent(marker.desc);
            iw.open(map, marker);
        });
        oms.addListener('spiderfy', function (markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon(iconWithColor(spiderfiedColor));
                markers[i].setShadow(null);
            }
            iw.close();
        });
        oms.addListener('unspiderfy', function (markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon(iconWithColor(usualColor));
                markers[i].setShadow(shadow);
            }
        });

        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;
        var times = [];
        // Loop through our array of markers & place each one on the map  
        for (i = 0; i < records.length; i++) {
            var record = records[i];
            var position = new google.maps.LatLng(parseFloat(record.latitude), parseFloat(record.longitude));
            bounds.extend(position);
            times[i] = record.attTime;

            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: "Attendance"
            });

            marker.desc = "Time: " + times[i]
            oms.addMarker(marker);
        }

        map.fitBounds(bounds);
        // for debugging/exploratory use in console
        window.map = map;
        window.oms = oms;

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
            this.setZoom(10);
            google.maps.event.removeListener(boundsListener);
        });

        $('#map-body').unmask();
    }
    ////////////////////////////////////////////////////////////////////////////////
    ///// Utility Functions
    function getPageName() {
        var pageURL = $(location).attr("href");
        var splitPage = pageURL.split("/");
        var pageName = splitPage[splitPage.length - 1].split(".");
        return pageName[0];
    }
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
    ///////////////////////////////////////////////////////////////////////////
});

function getImages(imgId) {
    $('#mark').mask("");
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
