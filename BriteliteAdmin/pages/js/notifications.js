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
    }
    else {
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
    /////////// Get all notifications
    function GetAllNotifications() {
        $('#page-wrapper').mask();
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
                    var tbody = '';
                    for (var i = 0; i < record.length; i++) {
                        tbody += '<a href="#" class="list-group-item">'
                                   + ' <i class="fa fa-bars fa-fw"></i>' + record[i].Description + '</span>'
                                   + ' <span class="pull-right text-muted small">'
                                   + '   <em>' + record[i].createdOn + '</em>'
                                   + ' </span></a>';
                    }
                    $('.list-group').html(tbody);
                    $('#page-wrapper').unmask();
                }
                else {
                    $('.list-group').html('There is no notifications to show.');
                    $('#page-wrapper').unmask();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#page-wrapper').unmask();
                $('container').unmask();
            }
        });
    }
    /////
    GetAllNotifications();
    ////////////////////////////////////////////////////////////////////
    /// Add Notification form
    $("#frmNotification").submit(function (e) {
        //prevent Default functionality
        e.preventDefault();
        $('#page-wrapper').mask("");
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/addnotification.php';

        var postData = $(this).serializeArray();
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: postData,
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                if (data === 'success') {
                    $('#page-wrapper').unmask();
                    GetAllNotifications();
                    document.location.href = "Notifications.html";
                }
                else {
                    alert('Server Error');
                    $('#page-wrapper').unmask();
                    e.preventDefault();	//STOP default action
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
                $('#page-wrapper').unmask();
            }
        });

        e.preventDefault();	//STOP default action
    });
    ////////////////////////////////////////////////
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
});
