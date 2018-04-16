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
    public class CustomerController : Controller
    {
        private BusinessDatabaseEntities db = new BusinessDatabaseEntities();
        //string ErrorMessage = "Unable to delete as this customer is used in an existing row in ProductSolds table.";

        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            List<Customers> _list = db.Customers.ToList();
            var result = (from c in _list
                         select new Customer
                         {
                             Id = c.Id,
                             Name = c.Name,
                             Address = c.Address
                         }).ToList();
        
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Customers customer)
        {
            return Json(DbAdd(customer), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetbyId(int Id)
        {
            Customers c = db.Customers.Find(Id);
            Customer customer = new Customer
            {
                Id = c.Id,
                Name = c.Name,
                Address = c.Address
            };
            return Json(customer, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Customers customer)
        {
            return Json(DbUpdate(customer), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int Id)
        {
            if (db.ProductSolds.FirstOrDefault(x => x.CustomerId == Id) != null)
            {
                
                //return Json(new { Success = "False", responseText = ErrorMessage }, JsonRequestBehavior.AllowGet);
                return Json(0, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(DbDelete(Id), JsonRequestBehavior.AllowGet);
            }
        }

        private Customers DbAdd([Bind(Include = "Id,Name,Address")] Customers customer)
        {
            db.Customers.Add(customer);
            db.SaveChanges();
            return customer;
        }

        private object DbUpdate([Bind(Include = "Id,Name,Address")] Customers customer)
        {
            db.Entry(customer).State = EntityState.Modified;
            db.SaveChanges();
            return new { Message = "Update complete." };
        }

        private object DbDelete(int Id)
        {
            Customers customer = db.Customers.Find(Id);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return new { Success = "True" };
        }
    }
}
