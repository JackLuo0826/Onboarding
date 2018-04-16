ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);

function CustomerViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("").extend({ required: true });
    self.Address = ko.observable("").extend({ required: true });

    var Customer = {
        Id: self.Id,
        Name: self.Name,
        Address: self.Address,
    };

    //self.Customer = ko.observable(); // self.Customer when initialised is a different object than the main Customer object of this viewModel
    self.Customers = ko.observableArray(); // Contains the list of customers

    // Initialize the view-model
    $.ajax({
        url: 'Customer/List',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (result) {
            self.Customers(result); //Put the response in ObservableArray
        }
    });

    //Add New Item
    self.create = function () {
        if (viewModel.errorsModalAdd().length === 0) {
            $.ajax({
                url: '/Customer/Add',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Customer),
                success: function (result) {
                    self.Customers.push(result);
                    $('#myModalAdd').modal('hide');
                    self.Name("");
                    self.Address("");
                }
            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            alert('Add: Name and Address can not be empty.');
            viewModel.errorsModalAdd.showAllMessages();
        }
    }

    // Edit customer details
    self.edit = function (Customer) {
        //self.Customer(Customer);
        self.Id(Customer.Id);
        self.Name(Customer.Name);
        self.Address(Customer.Address);
        
        //self.Customer().Name = ko.observable(Customer.Name).extend({ required: true });
        //self.Customer().Address = ko.observable(Customer.Address).extend({ required: true });
        //self.errorsModalUpdate = ko.validation.group({
        //    E1: self.Customer().Name,
        //    E2: self.Customer().Address
        //});

        $('#myModalUpdate').modal('show');
    }

    self.update = function () {
        if (self.errorsModalAdd().length === 0) {
            $.ajax({
                url: '/Customer/Update',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Customer),
                //data: ko.toJSON(self.Customer()),
                success: function (result) {
                    self.Customers.removeAll();
                    self.Customers(result); //Put the response in ObservableArray
                    $('#myModalUpdate').modal('hide');
                    self.reset();
                }
            })
                .fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        } else {
            alert('Update: Name and Address can not be empty!');
            self.errorsModalAdd.showAllMessages();
        }
    }

    // Delete customer details
    self.delete = function (Customer) {
        if (confirm('Are you sure you want to delete "' + Customer.Name + '" ?')) {
            var id = Customer.Id;

            $.ajax({
                url: 'Customer/Delete/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (result) {
                    if (result == true) {
                        self.Customers.remove(Customer);
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

    // Reset customer details
    self.reset = function () {
        //$('#myModalUpdate').modal('hide');
        
        self.Id("");
        self.Name("");
        self.Address("");

        //self.Customer(null);

        //self.Customer().Name = "";
        //self.Customer().Address = "";

        //self.Customer = ko.observable();
    }

    //self.resetValidation = function () {
    //    Object.keys(viewModel).forEach(function (name) {
    //        if (ko.isWritableObservable(viewModel[name])) {
    //            viewModel[name](undefined);
    //        }
    //    });
    //    if (ko.validation.utils.isValidatable(viewModel.location)) {
    //        viewModel.location.rules.removeAll();
    //    }
    //    viewModel.errors.showAllMessages(false);
    //}
}
var viewModel = new CustomerViewModel();
viewModel.errorsModalAdd = ko.validation.group({
    E1: viewModel.Name,
    E2: viewModel.Address
});
//viewModel.errorsModalUpdate = ko.validation.group({
//    E1: viewModel.Customer().Name,
//    E2: viewModel.Customer().Address
//});
ko.applyBindings(viewModel);