/// <reference path="jquery-1.11.3.min.js" />
$(document).ready(function () {
    eraseCookie("username");
    eraseCookie("usrname");
    eraseCookie("rname");
    eraseCookie("uId");
    eraseCookie("groupId");
    eraseCookie("districtId");
    //alert(readCookie("username"));
    //alert(readCookie("usrname"));

    $("form input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#btnLogin').click();
            //alert('sdf');
            return false;
        } else {
            return true;
        }
    });
    ////////////////////////////////////
    ///// Login user
    $("#frmLogin").submit(function (e) {
        $('.container').mask("");
        var postData = $(this).serializeArray();
        var formURL;
        if ($('#username').val().indexOf("@") > -1) {
            formURL = 'http://www.slamslogic.com/britelite/service/admin/employeelogin.php';
        }
        else {
            formURL = 'http://www.slamslogic.com/britelite/service/admin/adminlogin.php';
        }
        //alert();
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: postData,
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                var record = JSON.parse(data);
                if (record.length > 0) {
                    createCookie("uId", record[0].Id, 1);
                    if ($('#username').val().indexOf("@") > -1) {
                        createCookie("rname", "admin", 1);
                        createCookie("uname", record[0].email, 1);
                        createCookie("groupId", record[0].groupId, 1);
                        createCookie("districtId", record[0].DistrictsId, 1);
                    }
                    else
                    {
                        createCookie("uname", record[0].username, 1);
                        createCookie("rname", "sadmin", 1);
                    }
                    $('.container').unmask();
                    document.location.href = "pages/dashboard.html";
                }
                else {
                    $('#errMsgLogin').html('username or password is invalid.');
                    $('.container').unmask();
                    eraseCookie("username");
                    eraseCookie("usrname");
                    e.preventDefault();	//STOP default action
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#errMsgLogin').html('');
                $('container').unmask();
            }
        });
        e.preventDefault();	//STOP default action
    });

    /////////////////////////////////////////////////
    ///// Create cookie
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
});