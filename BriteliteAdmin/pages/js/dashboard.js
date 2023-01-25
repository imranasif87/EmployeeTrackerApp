/// <reference path="E:\Projects\Jquery_Mobile\Britelite\SFMobile\BriteliteApp\BriteliteAdmin\js/jquery-1.11.3.min.js" />

function logout()
{
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
    }
    else {
        if(readCookie("rname") == "admin")
        {
            $('.liadmin').hide();
            $('#lnkProfile').attr('href', 'Profile.html?empId=' + readCookie("uId"));
            $('#notifications').hide();
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
    //////////////////////////////////////////
    // Total employee count
    $('#page-wrapper').mask("");
    var formURL;
    if (readCookie("rname") == "admin") {
        formURL = 'http://www.slamslogic.com/britelite/service/admin/allemployeesbygroup.php?gId=' + readCookie("groupId");
    }
    else {
        formURL = 'http://www.slamslogic.com/britelite/service/admin/allemployees.php';
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
                $('#divCount').html(record.length);
                $('#page-wrapper').unmask();
            }
            else {
                $('#divCount').html('0');
                $('#page-wrapper').unmask();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#page-wrapper').unmask();
            $('container').unmask();
        }
    });
    ///////////////////////////////////////////////
    //// all customer images
    $('#page-wrapper').mask("");
    var formURL = 'http://www.slamslogic.com/britelite/service/admin/getallcustomerdetail.php';
    $.ajax(
    {
        url: formURL,
        type: "POST",
        data: {},
        datatype: "json",
        success: function (data, textStatus, jqXHR) {
            var record = JSON.parse(data);
            if (record.length > 0) {
                $('#divCountCus').html(record.length);
                $('#page-wrapper').unmask();
            }
            else {
                $('#divCountCus').html('0');
                $('#page-wrapper').unmask();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#page-wrapper').unmask();
        }
    });
    //////////////////////////////////////////
    // Total employee count
    $('#page-wrapper').mask("");
    var formURL = 'http://www.slamslogic.com/britelite/service/admin/getnotifications.php';
    $.ajax(
    {
        url: formURL,
        type: "POST",
        data: {},
        datatype: "json",
        success: function (data, textStatus, jqXHR) {
            var record = JSON.parse(data);
            if (record.length > 0) {
                $('#divNoti').html(record.length);
                $('#page-wrapper').unmask();
            }
            else {
                $('#divNoti').html('0');
                $('#page-wrapper').unmask();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#page-wrapper').unmask();
            $('container').unmask();
        }
    });

});
