//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    $.ajax({
        url: "/ProductSold/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                //var dateSold = new Date(parseInt(item.DateSold.substr(6)));
                html += '<tr>';
                html += '<td>' + item.CustomerName + '</td>';
                html += '<td>' + item.ProductName + '</td>';
                html += '<td>' + item.StoreName + '</td>';
                html += '<td>' + new Date(parseInt(item.DateSold.substr(6))) + '</td>';
                html += '<td><a href="#" onclick="return loadSelectList(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadSelectList(productSoldId) {
    $.ajax({
        url: "/Customer/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var customerHtml = '';
            $.each(result, function (key, item) {
                customerHtml += '<option value="' + item.Id + '">' + "ID" + item.Id + ": " + item.Name + '</option>'
            });
            $('#CustomerId').html(customerHtml);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    $.ajax({
        url: "/Product/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var productHtml = '';
            $.each(result, function (key, item) {
                productHtml += '<option value="' + item.Id + '">' + "ID" + item.Id + ": " + item.Name + '</option>'
            });
            $('#ProductId').html(productHtml);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    $.ajax({
        url: "/Store/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var storeHtml = '';
            $.each(result, function (key, item) {
                storeHtml += '<option value="' + item.Id + '">' + "ID" + item.Id + ": " + item.Name + '</option>'
            });
            $('#StoreId').html(storeHtml);

            if (productSoldId != 0) {
                $('#Id').val(productSoldId);
                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            } else {
                $('#btnUpdate').hide();
                $('#btnAdd').show();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    /*$.ajax({
        url: "/Customer/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            if (productSoldId == 0) {
                $.each(result, function (key, item) {
                    html += '<option value="' + item.Id + '">' + item.Name + '</option>'
                });
            }
            else {
                $.each(result, function (key, item) {
                    if (item.Id == customerId) {
                        $('#defaultCustomer').attr('value', item.Id);
                        $('#defaultCustomer').html('');
                        $('#defaultCustomer').append(item.Name);
                    };
                    html += '<option value="' + item.Id + '">' + item.Name + '</option>'
                });
            };
            if (productSoldId == 0) {
                $('#CustomerId').html(html);
            } else {
                $('#CustomerId').append(html);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    $.ajax({
        url: "/Product/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            if (productSoldId == 0) {
                $.each(result, function (key, item) {
                    html += '<option value="' + item.Id + '">' + item.Name + '</option>'
                });
            }
            else {
                $.each(result, function (key, item) {
                    if (item.name == productId) {
                        $('#defaultProduct').attr('value', item.Id);
                        $('#defaultProduct').html();
                        $('#defaultProduct').append(item.Name);
                    };
                    html += '<option value="' + item.Id + '">' + item.Name + '</option>'
                });
            };
            if (productSoldId == 0) {
                $('#ProductId').html(html);
            } else {
                $('#ProductId').append(html);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    $.ajax({
        url: "/Store/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            if (productSoldId == 0) {
                $.each(result, function (key, item) {
                    html += '<option value="' + item.Id + '">' + item.Name + '</option>'
                });
            }
            else {
                $.each(result, function (key, item) {
                    if (item.name == storeId) {
                        $('#defaultStore').attr('value', item.Id);
                        $('#defaultStore').append(item.Name);
                    };
                    html += '<option value="' + item.Id + '">' + item.Name + '</option>'
                });
            };
            if (productSoldId == 0) {
                $('#StoreId').html(html);
            } else {
                $('#StoreId').append(html);

            }
            $('#Id').val(productSoldId);   //fill modal Id input field with selected row Id
            //$('#dateSold').val(new Date(dateSold));  //fill modal DateSold field

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });*/
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var salesObj = {
        CustomerId: $('#CustomerId').val(),
        ProductId: $('#ProductId').val(),
        StoreId: $('#StoreId').val(),
        DateSold: $('#DateSold').val(),
    };
    $.ajax({
        url: "/ProductSold/Add",
        data: JSON.stringify(salesObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating sale's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var salesObj = {
        Id: $('#Id').val(),
        CustomerId: $('#CustomerId').val(),
        ProductId: $('#ProductId').val(),
        StoreId: $('#StoreId').val(),
        DateSold: $('#DateSold').val(),
    };
    $.ajax({
        url: "/ProductSold/Update",
        data: JSON.stringify(salesObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting sales's record  
function Delele(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/ProductSold/Delete/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Valdidation using jquery  
function validate() {
    var isValid = true;
    var regExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    var dateSold = $('#DateSold').val().trim();

    //console.log(regExp.test(dateSold));
    if (!regExp.test(dateSold)) {
        $('#DateSold').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateSold').css('border-color', 'lightgrey');
    }

    return isValid;
}