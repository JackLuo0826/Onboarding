using Data;
using Data.Models;
using KeysOnboardV_3.Interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace KeysOnboardV_3.Repositories
{
    public class CustomerRepository : IRepository
    {
        BusinessDatabaseEntities db = new BusinessDatabaseEntities();

        public IEnumerable<object> ListAll()
        {
            List<Customers> _list = db.Customers.ToList();
            var customerList = (from p in _list
                               select new Customer
                               {
                                   Id = p.Id,
                                   Name = p.Name,
                                   Address = p.Address,
                               }).ToList();
            return customerList;
        }

        public object GetById(int id)
        {
            Customers p = db.Customers.Find(id);
            Customer customer = new Customer
            {
                Id = p.Id,
                Name = p.Name,
                Address = p.Address
            };
            return customer;
        }

        public object Add(object customerO)
        {
            Customers customer = (Customers)customerO;

            if (customer == null)
            {
                throw new ArgumentNullException("customerO");
            }

            db.Customers.Add(customer);
            db.SaveChanges();
            return customer;
        }

        public bool Delete(int id)
        {
            if (db.ProductSolds.FirstOrDefault(x => x.CustomerId == id) != null)
            {
                return false;
            }
            else
            {
                Customers customer = db.Customers.Find(id);
                db.Customers.Remove(customer);
                db.SaveChanges();
                return true;
            }
        }

        public bool Update(object customerO)
        {
            Customers customer = (Customers)customerO;

            if (customer == null)
            {
                return false;
            }

            var p = db.Customers.FirstOrDefault(a => a.Id == customer.Id);
            p.Name = customer.Name;
            p.Address = customer.Address;
            db.SaveChanges();
            return true;
        }
    }
}