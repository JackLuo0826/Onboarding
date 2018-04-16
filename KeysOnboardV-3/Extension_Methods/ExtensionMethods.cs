using Data;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KeysOnboardV_3.Extension_Methods
{
    public static class ExtensionMethods
    {
        public static Customer ConvertToCustomer(this Customers c)
        {
            Customer customer = new Customer
            {
                Id = c.Id,
                Name = c.Name,
                Address = c.Address
            };
            return customer;
        }

        public static Product ConvertToProduct(this Products c)
        {
            Product product = new Product
            {
                Id = c.Id,
                Name = c.Name,
                Price = c.Price
            };
            return product;
        }

        public static Store ConvertToStore(this Stores c)
        {
            Store store = new Store
            {
                Id = c.Id,
                Name = c.Name,
                Address = c.Address
            };
            return store;
        }
    }
}