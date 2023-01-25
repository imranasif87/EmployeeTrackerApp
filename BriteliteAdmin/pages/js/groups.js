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
    /////////// Get all Groups and districts
    function BindDistricts()
    {
        $('#page-wrapper').mask();
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/getdistricts.php';
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: {},
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                var record = JSON.parse(data);
                if (record.length > 0) {
                    $.each(record, function (index, elem) {
                        $("#ddlDistricts").append(
                        $("<option />").val(elem.Id).text(elem.Name)
                        );
                    });
                    $('.selectpicker').selectpicker('refresh');
                    $('#page-wrapper').unmask();
                }
                else {
                    $('#page-wrapper').unmask();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#page-wrapper').unmask();
                $('container').unmask();
            }
        });
    }
    function GetAllGroups() {
        $('#page-wrapper').mask();
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/getgroups.php';
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
                        tbody += '<tr class="odd gradeX">'
                                      + '<td>' + record[i].Id + '</td>'
                                      + '<td>' + record[i].GroupName + '</td>'
                                      + '<td>' + record[i].DistrictName + '</td>'
                                      + '<td><a href="AddGroup.html?gId=' + record[i].Id + '"><i class="fa fa-edit fa-fw"></i></a> &nbsp;'
                                      + '<i class="fa fa-trash fa-fw" gid="' + record[i].Id + '" onclick="assignId(this)" data-toggle="modal" data-target="#myModalt"></i></td>'
                                  + '</tr>';
                    }
                    $('#tbAll').html(tbody);
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
    }
    /////
    BindDistricts();
    GetAllGroups();
    ////////////////////////////////////////////////////////////////////
    //////
    if (GetQueryStringParams('gId') != undefined) {
        $('#page-wrapper').mask();
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/getgroup.php?gId=' + GetQueryStringParams('gId');
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: {},
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                var record = JSON.parse(data);
                if (record.length > 0) {
                    $("input[name=grpname]").val(record[0].Name);
                    $("#ddlDistricts").val(record[0].DistrictsId);
                    $('input[name="hidId"]').val(record[0].Id);
                    $('#btnAdd').html('Update Group');
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
    }
    /////////////////////////////////////////////////////////////////////
    /// Add/update Employee form
    //alert(GetQueryStringParams('empId'));
    $("#frmGroups").submit(function (e) {
        //prevent Default functionality
        e.preventDefault();
        if ($('#ddlDistricts').val() == "")
        {
            $('.bootstrap-select').attr('style', 'border:2px solid red;');
            return;
        }
        $('#page-wrapper').mask("");
        var formURL;
        if (GetQueryStringParams('gId') == undefined) {
            formURL = 'http://www.slamslogic.com/britelite/service/admin/addgroup.php';
        }
        else {
            formURL = 'http://www.slamslogic.com/britelite/service/admin/updategroup.php';
        }

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
                    GetAllGroups();
                    document.location.href = "AddGroup.html";
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
    
    ////////////////////////////////////////////////////////////////////////
    ///// Delete Employee
    $('#btnDelete').click(function () {
        $('#myModalt').mask();
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/deletegroup.php?gId=' + $('#hidId').val();
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: {},
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                if (data == 'success') {
                    $('#myModalt').unmask();
                    document.location.href = "AddGroup.html";
                }
                else {
                    alert('Error in Delete Group.');
                    $('#myModalt').unmask();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#myModalt').unmask();
            }
        });
    });

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

function assignId(control) {
    $('#hidId').val($(control).attr('gid'));
}