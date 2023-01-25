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
    ////////////////////////////////////
    ///// Search attendance
    $("#frmAtt").submit(function (e) {
        e.preventDefault();	//STOP default action

        var divLeft = '';
        var divRight = '';
        var td = '';
        $('#page-wrapper').mask("");
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
                    var date = '';
                    var counter = 0;
                    for (var i = 0; i < record.length; i++)
                    {
                        if (date != record[i].attDate) {
                            var splitDate = record[i].attDate.split("/");
                            var month = getMonthName(splitDate[1]);
                            if (divLeft == '') {
                                divLeft = '<li class="post"><div class="post_left">'
                                            + '<span class="day">' + splitDate[0] + '</span>'
                                            + '<span class="month">' + month + '</span>'
                                         + '</div>'
                                         + '<div class="post_right_reveal">'
                                            + '<table>';
                            }
                            else {
                                if (counter <= 3) {
                                    divRight += '<tr>' + td + '</tr>';
                                }
                                divLeft += divRight + '</table></div></li>';
                                divLeft += '<li class="post"><div class="post_left">'
                                            + '<span class="day">' + splitDate[0] + '</span>'
                                            + '<span class="month">' + month + '</span>'
                                         + '</div>'
                                         + '<div class="post_right_reveal">'
                                            + '<table>';
                                divRight = '';
                                td = '';
                                counter = 0;
                            }
                            td += '<td>' + record[i].attTime + '</td>';
                            counter++;
                            date =  record[i].attDate;
                        }
                        else {
                            if (counter <= 3) {
                                td += '<td>' + record[i].attTime + '</td>';
                                counter++;
                            }
                            else {
                                counter = 0;
                                divRight += '<tr>' + td + '</tr>';
                                td = '<td>' + record[i].attTime + '</td>';

                            }
                        }
                    }
                    if (record.length > 0) {
                        if (counter <= 3 || counter >= 3) {
                            divRight += '<tr>' + td + '</tr>';
                        }
                        divLeft += divRight + '</table></div></li>';
                        $('#ulAtt').html(divLeft);
                    }
                    $('#page-wrapper').unmask();
                }
                else {
                    $('#page-wrapper').unmask();
                    e.preventDefault();	//STOP default action
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#page-wrapper').unmask();
            }
        });
        e.preventDefault();	//STOP default action
    });

    function getMonthName(m) {
        switch (m) {
            case '1':
                return 'January';
                break;
            case '2':
                return 'February';
                break;
            case '3':
                return 'March';
                break;
            case '4':
                return 'April';
                break;
            case '5':
                return 'May';
                break;
            case '6':
                return 'June';
                break;
            case '7':
                return 'July';
                break;
            case '8':
                return 'August';
                break;
            case '9':
                return 'September';
                break;
            case '10':
                return 'October';
                break;
            case '11':
                return 'November';
                break;
            case '12':
                return 'December';
                break;
        }
    }
});