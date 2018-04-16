using Data;
using Data.Models;
using KeysOnboardV_3.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using KeysOnboardV_3.Extension_Methods;

namespace KeysOnboardV_3.Repositories
{
    public class SaleRepository : IRepository
    {
        BusinessDatabaseEntities db = new BusinessDatabaseEntities();

        public object Add(object item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            //define DateSoldString property
            ProductSold productSold = (ProductSold)item;
            //has to set its DateSoldString so we can pass it later to the display oberservable array to display
            productSold.DateSoldString = productSold.DateSold.ToString("dd/MM/yyyy");

            //convert to main database context ProductSolds table object and save to table
            ProductSolds sale = convertToProductSolds(productSold);
            db.ProductSolds.Add(sale);
            db.SaveChanges();

            //get ID of the sale row we just added from main database
            productSold.Id = sale.Id;
            return productSold;
        }

        public bool Delete(int id)
        {
            ProductSolds productSold = db.ProductSolds.Find(id);
            db.ProductSolds.Remove(productSold);
            db.SaveChanges();
            return true;
        }

        public IEnumerable<object> ListAll()
        {
            List<ProductSolds> _list = db.ProductSolds.ToList();
            var saleList = (from c in _list
                            select new ProductSold
                            {
                                Id = c.Id,
                                CustomerId = c.CustomerId,
                                CustomerName = c.Customers.Name,
                                ProductId = c.ProductId,
                                ProductName = c.Products.Name,
                                StoreId = c.StoreId,
                                StoreName = c.Stores.Name,
                                DateSold = c.DateSold,
                                DateSoldString = c.DateSold.ToString("dd/MM/yyyy")
                            }).ToList();

            //var saleList = (from c in _list
            //                select new Sale
            //                {
            //                    Id = c.Id,
            //                    Customer = c.Customers.ConvertToCustomer(),
            //                    Product = c.Products.ConvertToProduct(),
            //                    Store = c.Stores.ConvertToStore(),
            //                    DateSold = c.DateSold
            //                }).ToList();1
            return saleList;
        }

        public bool Update(object item)
        {
            if (item == null)
            {
                return false;
            }

            ProductSold i = (ProductSold)item;
            //i.DateSold = Convert.ToDateTime(i.DateSoldString); // this line is no longer needed as we are no longer binding DateSoldString
            ProductSolds sale = convertToProductSolds(i);

            var p = db.ProductSolds.FirstOrDefault(a => a.Id == sale.Id);
            p.CustomerId = sale.CustomerId;
            p.ProductId = sale.ProductId;
            p.StoreId = sale.StoreId;
            p.DateSold = sale.DateSold;
            db.SaveChanges();
            return true;
        }

        public object GetById(int id)
        {
            ProductSolds c = db.ProductSolds.Find(id);
            ProductSold sale = new ProductSold
            {
                Id = c.Id,
                CustomerId = c.CustomerId,
                CustomerName = c.Customers.Name,
                ProductId = c.ProductId,
                ProductName = c.Products.Name,
                StoreId = c.StoreId,
                StoreName = c.Stores.Name,
                DateSold = c.DateSold
            };
            return sale;
        }

        private ProductSolds convertToProductSolds(ProductSold p)
        {
            ProductSolds s = new ProductSolds
            {
                Id = p.Id,
                CustomerId = p.CustomerId,
                ProductId = p.ProductId,
                StoreId = p.StoreId,
                DateSold = p.DateSold
            };
            return s;
        }
    }
}