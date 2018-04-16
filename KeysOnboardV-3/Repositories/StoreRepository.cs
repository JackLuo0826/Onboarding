using Data;
using Data.Models;
using KeysOnboardV_3.Interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace KeysOnboardV_3.Repositories
{
    public class StoreRepository : IRepository
    {
        BusinessDatabaseEntities db = new BusinessDatabaseEntities();

        public IEnumerable<object> ListAll()
        {
            List<Stores> _list = db.Stores.ToList();
            var storeList = (from p in _list
                                select new Store
                                {
                                    Id = p.Id,
                                    Name = p.Name,
                                    Address = p.Address,
                                }).ToList();
            return storeList;
        }

        public object GetById(int id)
        {
            Stores p = db.Stores.Find(id);
            Store store = new Store
            {
                Id = p.Id,
                Name = p.Name,
                Address = p.Address
            };
            return store;
        }

        public object Add(object storeO)
        {
            Stores store = (Stores)storeO;

            if (store == null)
            {
                throw new ArgumentNullException("storeO");
            }

            db.Stores.Add(store);
            db.SaveChanges();
            return store;
        }

        public bool Delete(int id)
        {
            if (db.ProductSolds.FirstOrDefault(x => x.StoreId == id) != null)
            {
                return false;
            }
            else
            {
                Stores store = db.Stores.Find(id);
                db.Stores.Remove(store);
                db.SaveChanges();
                return true;
            }
        }

        public bool Update(object storeO)
        {
            Stores store = (Stores)storeO;

            if (store == null)
            {
                return false;
            }

            var p = db.Stores.FirstOrDefault(a => a.Id == store.Id);
            p.Name = store.Name;
            p.Address = store.Address;
            db.SaveChanges();
            return true;
        }
    }
}