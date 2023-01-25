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
    /// Get All Districts
    function BindDistricts() {
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
                        $("<option/>").val(elem.Id).text(elem.Name)
                        );
                       
                    });

                    $('.selectpicker').selectpicker('refresh');

                    if (GetQueryStringParams('empId') == undefined) {
                        if (readCookie("rname") == "admin") {
                            $("#ddlDistricts").val(readCookie("districtId"));
                            $("#ddlDistricts").trigger("change");
                        }
                        else {
                            PopulateFields(1);
                        }
                    }
                    else {
                        PopulateFields(1);
                    }
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

    if (getPageName() == "AddEmployee")
    {
        BindDistricts();
    }
    ///////////////////////////////////////////////
    /// Get all Groups by District Id
    $('#ddlDistricts').change(function () {
        if ($('#ddlDistricts').val() != "") {
            $('#page-wrapper').mask();
            var formURL = 'http://www.slamslogic.com/britelite/service/admin/getgroupsbydistrict.php?disId=' + $('#ddlDistricts').val();
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
                            $("#ddlGroups").append(
                            $("<option/>").val(elem.Id).text(elem.Name)
                            );
                        });
                        if (readCookie("rname") == "admin") {
                            $("#ddlGroups").val(readCookie("groupId"));
                            $('#divHidGrp').html('<input type="hidden" name="group" value="' + readCookie("groupId") + '" />');
                            $("#ddlGroups").attr("disabled", "disabled")
                            $("#ddlDistricts").attr("disabled", "disabled")
                        }
                        else {
                            PopulateFields(0);
                        }

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
    });
    /////////////////////////////////////////////////////
    /////////// populate fields
    function PopulateFields(state) {
        $('#page-wrapper').mask();
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
                    $("input[name=fname]").val(record[0].fname);
                    $("input[name=lname]").val(record[0].lname);
                    $("input[name=designation]").val(record[0].designation);
                    $("input[name=qualification]").val(record[0].qualification);
                    $("input[name=experience]").val(record[0].experience);
                    $("input[name=email]").val(record[0].email);
                    $("input[name=joining]").val(record[0].joining);
                    $("input[name=department]").val(record[0].department);
                    $("input[name=phone]").val(record[0].phone);
                    $("input[name=mobile]").val(record[0].mobile);
                    $("textarea[name=address]").html(record[0].address);
                    $("input[name=rdoStatus][value='" + record[0].status + "']").prop('checked', true);
                    $("input[name=image]").val(record[0].photo);
                    $("#ddlDistricts").val(record[0].DistrictsId);
                    if (state == 1) {
                        $("#ddlDistricts").trigger("change");
                    }
                    else {
                        $("#ddlGroups").val(record[0].groupId);
                    }
                    if (record[0].CanUploadImage == "1") {
                        $("input[value='Can Upload Image']").prop('checked', true);
                    }
                    if (record[0].AutoAttendanceRequire == "1") {
                        $("input[value='Auto attendance require']").prop('checked', true);
                    }
                    if (record[0].CanEditProfile == "1") {
                        $("input[value='Can edit profile']").prop('checked', true);
                    }
                    if (record[0].TrackEmployee == "1") {
                        $("input[value='Track employee']").prop('checked', true);
                    }
                    $('input[name="hidId"]').val(record[0].EmpId);
                    $('#btnAdd').html('Update Employee');
                    $('#page-wrapper').unmask();
                }
                else {
                   // alert('There is no record to show.');
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
    $("#frmAddCustomer").submit(function (e) {
        //prevent Default functionality
        e.preventDefault();
        if ($('#ddlDistricts').val() == "") {
            $('.bootstrap-select').attr('style', 'border:2px solid red;');
            return;
        }
        $('#page-wrapper').mask("");
        if ($('.image-preview-filename').val() != "") {
            var formURL = 'http://www.slamslogic.com/britelite/service/admin/uploademployeeimg.php';
            var formdata = new FormData(this);
            /////////
            // upload image
            $.ajax({
                url: formURL,
                type: "POST",
                data: formdata,
                mimeTypes: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                    if (data != 'error') {
                    }
                    else {
                        alert('Error: Image not uploaded.');
                        $('#page-wrapper').unmask();
                    }
                }
            });
        }

        if (GetQueryStringParams('empId') == undefined) {
            formURL = 'http://www.slamslogic.com/britelite/service/admin/addemployee.php';
        }
        else {
            formURL = 'http://www.slamslogic.com/britelite/service/admin/updateemployee.php';
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
                    document.location.href = "Employees.html";
                }
                else {
                    alert('Server Error');
                    //$('#errMsgLogin').html('username or password is invalid.');
                    $('#page-wrapper').unmask();
                    e.preventDefault();	//STOP default action
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //$('#errMsgLogin').html('');
                alert(errorThrown);
                $('#page-wrapper').unmask();
            }
        });

        e.preventDefault();	//STOP default action
    });
    ////////////////////////////////////////////////
    ///// Show All Employees
    var pageName = getPageName();
    if (pageName === "Employees") {
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
                    var tbody = '';
                    $("#dataTables-example").dataTable().fnDestroy();
                    for (var i = 0; i < record.length; i++) {
                        tbody += '<tr class="odd gradeX">'
                                      + '<td>' + record[i].EmpId + '</td>'
                                      + '<td><img src="http://www.slamslogic.com/britelite/images/employee/' + record[i].photo + '" class="img-circle" width="40" /></td>'
                                      + '<td>' + record[i].fname + ' ' + record[i].lname + '</td>'
                                      + '<td>' + record[i].mobile + '</td>'
                                      + '<td class="center">' + record[i].designation + '</td>'
                                      + '<td class="center">' + record[i].email + '</td>'
                                      + '<td><a href="AddEmployee.html?empId=' + record[i].EmpId + '"><i class="fa fa-edit fa-fw"></i></a> &nbsp;'
                                      + '<a href="EmployeeDetail.html?empId=' + record[i].EmpId + '"><i class="fa fa-list-alt fa-fw"></i></a>&nbsp;'
                                      + '<i class="fa fa-trash fa-fw" empid="' + record[i].EmpId + '" onclick="assignId(this)" data-toggle="modal" data-target="#myModalt"></i></td>'
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
    }

    ////////////////////////////////////////////////////////////////////////
    ///// Delete Employee
    $('#btnDelete').click(function () {
        $('#myModalt').mask();
        var formURL = 'http://www.slamslogic.com/britelite/service/admin/deleteemployee.php?empId=' + $('#hidEmpId').val();
        $.ajax(
        {
            url: formURL,
            type: "POST",
            data: {},
            datatype: "json",
            success: function (data, textStatus, jqXHR) {
                if (data == 'success') {
                    $('#myModalt').unmask();
                    document.location.href = "Employees.html";
                }
                else {
                    alert('Error in Delete Employee.');
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
    $('#hidEmpId').val($(control).attr('empid'));
}