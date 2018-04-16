var Customer = function (id, name) {
    this.id = id;
    this.name = name;
}

var Product = function (id, name) {
    this.id = id;
    this.name = name;
}

var Store = function (id, name) {
    this.id = id;
    this.name = name;
}

function SaleViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.CustomerId;
    self.CustomerName;
    self.ProductId;
    self.ProductName;
    self.StoreId;
    self.StoreName;
    self.DateSold = ko.observable("").extend({
        required: true,
        date: true
    });
    self.DateSoldString;

    var Sale = {
        Id: self.Id,
        CustomerId: self.CustomerId,
        CustomerName: self.CustomerName,
        ProductId: self.ProductId,
        ProductName: self.ProductName,
        StoreId: self.StoreId,
        StoreName: self.StoreName,
        DateSold: self.DateSold,
        DateSoldString: self.DateSoldString
    };

    //can not put more objects inside this viewmodel?
    //var Customer = {
    //    Id: self.CustomerId,
    //    Name: self.CustomerName
    //};

    //var Product = {
    //    Id: self.ProductId,
    //    Name: self.ProductName
    //};

    //var Store = {
    //    Id: self.StoreId,
    //    Name: self.StoreName
    //};

    //self.Sale = ko.observable();
    self.Sales = ko.observableArray(); // Contains the list of sales
    customersList = ko.observableArray(); // Contains the list of customers for dropdown menu
    productsList = ko.observableArray(); // Contains the list of products for dropdown menu
    storesList = ko.observableArray(); // Contains the list of stores for dropdown menu
    selectedCustomer = ko.observable(); // Selected customer from dropdown menu
    selectedProduct = ko.observable(); // Selected product from dropdown menu
    selectedStore = ko.observable(); // Selected store from dropdown menu

    // Initialize the sales view-model
    $.ajax({
        url: 'Sale/List',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (result) {
            self.Sales(result); // Put the response in ObservableArray
        }
    });

    // Initializing the dropdown menu
    $.ajax({
        url: "/Customer/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                var c = new Customer(item.Id, item.Name);
                customersList.push(c);
            });
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
            $.each(result, function (key, item) {
                var p = new Product(item.Id, item.Name);
                productsList.push(p);
            });
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
            $.each(result, function (key, item) {
                var s = new Store(item.Id, item.Name);
                storesList.push(s);
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    //Add New Item
    self.create = function () {
        //question: why can't I use self.CustomerId here??
        Sale.CustomerId = selectedCustomer().id;
        Sale.CustomerName = selectedCustomer().name;
        Sale.ProductId = selectedProduct().id;
        Sale.ProductName = selectedProduct().name;
        Sale.StoreId = selectedStore().id;
        Sale.StoreName = selectedStore().name;

        //console.log(selectedCustomer());
        //console.log(selectedCustomer().id + " lalala " + selectedCustomer().name);
        //console.log(Sale.CustomerId + " " + Sale.CustomerName);

        if (viewModel.errors().length === 0) {
            $.ajax({
                url: '/Sale/Add',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Sale),
                success: function (result) {
                    self.Sales.push(result);
                    $('#myModalAdd').modal('hide');
                    self.reset();
                }
            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            alert('Please check date format!');
            viewModel.errors.showAllMessages();
        }
    }

    // Edit sale details
    self.edit = function (Sale) {
        //self.Sale(Sale);

        self.Id(Sale.Id);
        self.DateSold(Sale.DateSoldString); // assign so that input box prefills with human readable date format
        $('#myModalUpdate').modal('show');
    }

    self.update = function () {
        //var saleObj = {
        //    Id: selectedCustomer().id,
        //    CustomerId: selectedCustomer().id,
        //    ProductId: selectedProduct().id,
        //    StoreId: selectedStore().id,
        //    DateSold: $('#DateSoldUpdate').val(),
        //};

        //var saleObj = {
        //    Id: $('#IdUpdate').val(),
        //    CustomerId: $('#CustomerIdUpdate').val().id,
        //    ProductId: $('#ProductIdUpdate').val().id,
        //    StoreId: $('#StoreIdUpdate').val().id,
        //    DateSold: $('#DateSoldUpdate').val(),
        //};

        //self.Sale().CustomerId = selectedCustomer().id;
        //self.Sale().CustomerName = selectedCustomer().name;
        //self.Sale().ProductId = selectedProduct().id;
        //self.Sale().ProductName = selectedProduct().name;
        //self.Sale().StoreId = selectedStore().id;
        //self.Sale().StoreName = selectedStore().name;
        Sale.CustomerId = selectedCustomer().id; //     can not use self.CustomerId = selectedCustomer().id here? why?
        Sale.CustomerName = selectedCustomer().name; // maybe because these properties are not observables? so Sale object
        Sale.ProductId = selectedProduct().id; //       is not updated automatically with self.CustomerId is updated?
        Sale.ProductName = selectedProduct().name;//    Actually it might be because Sale is not instantiated automatically,
        Sale.StoreId = selectedStore().id;//            it only instantiates when it is used, so it will contain its default 
        Sale.StoreName = selectedStore().name;//        attribute value when its constructor is called.

        //Sale.Id = $('#IdUpdate').text();
        //Sale.CustomerId = selectedCustomer().id;
        //Sale.CustomerName = selectedCustomer().name; // can not leave customer name empty?!!
        //Sale.ProductId = selectedProduct().id;
        //Sale.ProductName = selectedProduct().name;
        //Sale.StoreId = selectedStore().id;
        //Sale.StoreName = selectedStore().name;
        //Sale.DateSoldString = $('#DateSoldUpdate').val();

        //console.log(selectedCustomer().id + '----' + self.Sale.CustomerId);
        //console.log('lalalala' + self.Sale.CustomerId);
        //console.log(self.Sale() + '-----');

        //console.log(Sale.Id + ' ----- ' + Sale.CustomerId + 'DateSold: ' + Sale.DateSoldString);

        if (viewModel.errors().length === 0) {
            $.ajax({
                url: '/Sale/Update',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                //data: ko.toJSON(self.Sale()),    // self.Sale() works only when its properties are all populated?!
                data: ko.toJSON(Sale),
                success: function (result) {
                    self.Sales.removeAll();
                    self.Sales(result); //Put the response in ObservableArray
                    $('#myModalUpdate').modal('hide');
                    self.reset();
                }
            })
                .fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        } else {
            alert('Please check date format!');
            viewModel.errors.showAllMessages();
        }
    }

    // Delete sale details
    self.delete = function (Sale) {
        if (confirm('Are you sure you want to delete transaction ID "' + Sale.Id + '" ?')) {
            var id = Sale.Id;

            $.ajax({
                url: 'Sale/Delete/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (result) {
                        self.Sales.remove(Sale);
                }
            }).fail(
                function (xhr, textStatus, err) {
                    self.status(err);
                });
        }
    }

    // Reset sale details
    self.reset = function () {
        self.Id("");
        self.DateSold("");
    }
}
var viewModel = new SaleViewModel();
viewModel.errors = ko.validation.group(viewModel);
ko.applyBindings(viewModel);

//Valdidation using jquery  
//function validate() {
//    var isValid = true;
//    var regExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
//    var dateSold = $('#DateSold').val().trim();

//    //console.log(regExp.test(dateSold));
//    if (!regExp.test(dateSold)) {
//        $('#DateSold').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#DateSold').css('border-color', 'lightgrey');
//    }

//    return isValid;
//}

//function validateUpdate() {
//    var isValid = true;
//    var regExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
//    var dateSold = $('#DateSoldUpdate').val().trim();

//    //console.log(regExp.test(dateSold));
//    if (!regExp.test(dateSold)) {
//        $('#DateSoldUpdate').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#DateSoldUpdate').css('border-color', 'lightgrey');
//    }

//    return isValid;
//}