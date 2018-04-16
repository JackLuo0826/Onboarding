ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);

function StoreViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("").extend({ required: true });
    self.Address = ko.observable("").extend({ required: true });

    var Store = {
        Id: self.Id,
        Name: self.Name,
        Address: self.Address,
    };

    //self.Store = ko.observable();
    self.Stores = ko.observableArray(); // Contains the list of stores

    // Initialize the view-model
    $.ajax({
        url: 'Store/List',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (result) {
            self.Stores(result); //Put the response in ObservableArray
        }
    });

    //Add New Item
    self.create = function () {
        if (viewModel.errors().length === 0) {
            $.ajax({
                url: '/Store/Add',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Store),
                success: function (result) {
                    self.Stores.push(result);
                    self.Name("");
                    self.Address("");
                    $('#myModalAdd').modal('hide');
                }
            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            alert('Name and Address can not be empty.');
            viewModel.errors.showAllMessages();
        }
    }

    // Edit store details
    self.edit = function (Store) {
        self.Id(Store.Id);
        self.Name(Store.Name);
        self.Address(Store.Address);
        $('#myModalUpdate').modal('show');
    }

    self.update = function () {
        if (viewModel.errors().length === 0) {
            $.ajax({
                url: '/Store/Update',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Store),
                success: function (result) {
                    self.Stores.removeAll();
                    self.Stores(result); //Put the response in ObservableArray
                    self.reset();
                    $('#myModalUpdate').modal('hide');
                }
            })
                .fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        } else {
            alert('Name and Address can not be empty.');
            viewModel.errors.showAllMessages();
        }
    }

    // Delete store details
    self.delete = function (Store) {
        if (confirm('Are you sure you want to delete "' + Store.Name + '" ?')) {
            var id = Store.Id;

            $.ajax({
                url: 'Store/Delete/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (result) {
                    if (result == true) {
                        self.Stores.remove(Store);
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

    // Reset store details
    self.reset = function () {
        self.Id("");
        self.Name("");
        self.Address("");
    }
}
var viewModel = new StoreViewModel();
viewModel.errors = ko.validation.group(viewModel);
ko.applyBindings(viewModel);