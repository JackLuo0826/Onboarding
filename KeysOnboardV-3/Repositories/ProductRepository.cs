using Data;
using Data.Models;
using KeysOnboardV_3.Interface;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeysOnboardV_3.Repositories
{
    public class ProductRepository:IRepository
    {
        BusinessDatabaseEntities db = new BusinessDatabaseEntities();

        public IEnumerable<object> ListAll()
        {
            List<Products> _list = db.Products.ToList();
            var productList = (from p in _list
                          select new Product
                          {
                              Id = p.Id,
                              Name = p.Name,
                              Price = p.Price,
                          }).ToList();
            return productList;
        }

        public object GetById(int id)
        {
            Products p = db.Products.Find(id);
            Product product = new Product
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price
            };
            return product;
        }

        public object Add(object productO)
        {
            Products product = (Products)productO;

            if (product == null)
            {
                throw new ArgumentNullException("productO");
            }

            db.Products.Add(product);
            db.SaveChanges();
            return product;
        }

        public bool Update(object productO)
        {
            Products product = (Products)productO;

            if (product == null)
            {
                return false;
            }

            //db.Entry((Products)product).State = EntityState.Modified;
            //db.SaveChanges();

            var p = db.Products.FirstOrDefault(a => a.Id == product.Id);
            p.Name = product.Name;
            p.Price = product.Price;
            db.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            if (db.ProductSolds.FirstOrDefault(x => x.ProductId == id) != null)
            {
                return false;
            }
            else
            {
                Products product = db.Products.Find(id);
                db.Products.Remove(product);
                db.SaveChanges();
                return true;
            }
        }
    }
}