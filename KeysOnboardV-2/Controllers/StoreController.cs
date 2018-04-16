using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Data;
using Data.Models;

namespace KeysOnboardV_2.Controllers
{
    public class StoreController : Controller
    {
        private BusinessDatabaseEntities db = new BusinessDatabaseEntities();
        string ErrorMessage = "Unable to delete as this store is used in an existing row in ProductSolds table.";

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            List<Stores> _list = db.Stores.ToList();
            var result = (from c in _list
                          select new Store
                          {
                              Id = c.Id,
                              Name = c.Name,
                              Address = c.Address,
                          }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Stores store)
        {
            return Json(DbAdd(store), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int Id)
        {
            Stores s = db.Stores.Find(Id);
            Store store = new Store
            {
                Id = s.Id,
                Name = s.Name,
                Address = s.Address
            };
            return Json(store, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Stores store)
        {
            return Json(DbUpdate(store), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int Id)
        {
            if (db.ProductSolds.FirstOrDefault(x => x.StoreId == Id) != null)
            {

                return Json(new { Success = "False", responseText = ErrorMessage }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(DbDelete(Id), JsonRequestBehavior.AllowGet);
            }
        }

        private Stores DbAdd([Bind(Include = "Id,Name,Address")] Stores store)
        {
            db.Stores.Add(store);
            db.SaveChanges();
            return store;
        }

        private Object DbUpdate([Bind(Include = "Id,Name,Address")] Stores store)
        {
            db.Entry(store).State = EntityState.Modified;
            db.SaveChanges();
            return new { Message = "Update complete." };
        }

        private object DbDelete(int Id)
        {
            Stores store = db.Stores.Find(Id);
            db.Stores.Remove(store);
            db.SaveChanges();
            return new { Success = "True" };
        }
    }
}
