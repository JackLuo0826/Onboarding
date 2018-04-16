﻿ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);

function formatCurrency(value) {
    return "$ " + value.toFixed(2);
}

function ProductViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("").extend({ required: true });
    self.Price = ko.observable("").extend({
        required: true,
        pattern: {
            message: 'Please enter numbers(with no decimal) only.',
            params: '^[+]?[0-9]{1,3}(?:,?[0-9]{3})*?$'
        }
    });

    var Product = {
        Id: self.Id,
        Name: self.Name,
        Price: self.Price,
    };

    //self.Product = ko.observable();
    self.Products = ko.observableArray(); // Contains the list of products

    // Initialize the view-model
    $.ajax({
        url: 'Product/List',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (result) {
            self.Products(result); //Put the response in ObservableArray
        }
    });

    // Calculate Total of Price After Initialization
    self.Total = ko.computed(function () {
        var sum = 0;
        var arr = self.Products();
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i].Price;
        }
        return sum;
    });

    //Add New Item
    self.create = function () {
        //console.log(Product.Name() + Product.Price() + "lala");
        if (viewModel.errors().length === 0) {
            $.ajax({
                url: '/Product/Add',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Product),
                success: function (result) {
                    self.Products.push(result);
                    self.Name("");
                    self.Price("");
                    $('#myModalAdd').modal('hide');
                }
            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            alert('Name and Price(numbers with no decimal only) can not be empty!');
            viewModel.errors.showAllMessages();
        }
    }

    // Edit product details
    self.edit = function (Product) {
        //console.log(Product.Name + "lala");
        //self.Product(Product);
        self.Id(Product.Id);
        self.Name(Product.Name);
        self.Price(Product.Price);
        $('#myModalUpdate').modal('show');
    }

    self.update = function () {
        //var product = self.Product();

        /*if (self.Product().name != "" &&
            self.Product().price != "") {
            alert(self.Product().name + self.Product().price);
        } else {
            alert("empty");
        }*/

        //var product = {
        //    Id: $('#IdUpdate').text(),
        //    Name: $('#NameUpdate').val(),
        //    Price: $('#PriceUpdate').val(),
        //};
        if (viewModel.errors().length === 0) {
            $.ajax({
                url: '/Product/Update',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Product),
                success: function (result) {
                    self.Products.removeAll();
                    self.Products(result); //Put the response in ObservableArray
                    //self.Product(null);
                    self.reset();
                    $('#myModalUpdate').modal('hide');
                }
            })
                .fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        } else {
            alert('Name and Price(numbers only) can not be empty!');
            viewModel.errors.showAllMessages();
        }
    }

    // Delete product details
    self.delete = function (Product) {
        if (confirm('Are you sure you want to delete "' + Product.Name + '" ?')) {
            var id = Product.Id;

            $.ajax({
                url: 'Product/Delete/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (result) {
                    if (result == true) {
                        self.Products.remove(Product);
                    } else {
                        alert("Unable to delete as this item is referenced in an existing row in Sales table.");
                    }
                }
            }).fail(
                function (xhr, textStatus, err) {
                    self.status(err);
                });
        }
    }

    // Reset product details
    self.reset = function () {
        self.Id("");
        self.Name("");
        self.Price("");
    }

    // Cancel product details
    /*self.cancel = function () {
        self.Product(null);
    }*/
}
var viewModel = new ProductViewModel();
viewModel.errors = ko.validation.group(viewModel);
ko.applyBindings(viewModel);