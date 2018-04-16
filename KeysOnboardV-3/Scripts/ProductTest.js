//currency symbol 
function formatCurrency(value) {
    return "$ " + value.toFixed(2);
}

function ProductViewModel() {

    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("");
    self.Price = ko.observable("");

    var Product = {
        Id: self.Id,
        Name: self.Name,
        Price: self.Price,
    };

    self.Product = ko.observable();
    self.ProductList = ko.observableArray(); // Contains the list of products

    // Initialize the view-model
    $.ajax({
        url: 'Product/List',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.ProductList(data); //Put the response in ObservableArray
            /*self.ProductList = ko.observableArray([
                {
                    "Id": 1,
                    "Name": "Ford",
                    "Price": 1,
                },
                {
                    "Id": 2,
                    "Name": "Ford2",
                    "Price": 2,
                }
            ]);*/
            console.log(self.ProductList());
        }
    });

    //Add New Item
    self.create = function () {
        if (Product.Name() != "" &&
            Product.Price() != "") {
            $.ajax({
                url: 'Product/Add',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Product),
                success: function (data) {
                    self.ProductList.push(data);
                    self.Name("");
                    self.Price("");
                }
            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            alert('Name and Price can not be empty.');
        }
    }
    // Delete product details
    self.delete = function (Product) {
        if (confirm('Are you sure you want to delete this Record?')) {
            var id = Product.Id;

            $.ajax({
                url: 'Product/DeleteProduct/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (data) {
                    self.ProductList.remove(Product);
                }
            }).fail(
                function (xhr, textStatus, err) {
                    self.status(err);
                });
        }
    }

    // Edit product details --> Can I delete this?
    self.edit = function (Product) {
        self.Product(Product);
    }

    // Update product details
    self.update = function () {
        var Product = self.Product();

        $.ajax({
            url: 'Product/Update',
            cache: false,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(Product),
            success: function (data) {
                self.ProductList.removeAll();
                self.ProductList(data); //Put the response in ObservableArray
                self.Product(null);
                alert("Record Updated.");
            }
        })
            .fail(
            function (xhr, textStatus, err) {
                alert(err);
            });
    }
}
var viewModel = new ProductViewModel();
ko.applyBindings(viewModel);