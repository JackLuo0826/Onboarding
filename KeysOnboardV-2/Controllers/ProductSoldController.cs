using Data;
using Data.Models;
using System;
using System.Data;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace KeysOnboardV_2.Controllers
{
    public class ProductSoldController : Controller
    {
        private BusinessDatabaseEntities db = new BusinessDatabaseEntities();

        // GET: ProductSold
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            List<ProductSolds> _list = db.ProductSolds.ToList();
            var result = (from c in _list
                          select new ProductSold
                          {
                              Id = c.Id,
                              CustomerId = c.CustomerId,
                              CustomerName = c.Customers.Name,
                              ProductId = c.ProductId,
                              ProductName = c.Products.Name,
                              StoreId = c.StoreId,
                              StoreName = c.Stores.Name,
                              DateSold = c.DateSold
                          }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(ProductSolds productSold)
        {
            db.ProductSolds.Add(productSold);
            db.SaveChanges();
            return Json("Added", JsonRequestBehavior.AllowGet);
        }

        public JsonResult update(ProductSolds productSold)
        {
            db.Entry(productSold).State = EntityState.Modified;
            db.SaveChanges();
            return Json("Update complete.", JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int Id)
        {
            ProductSolds productSold = db.ProductSolds.Find(Id);
            db.ProductSolds.Remove(productSold);
            db.SaveChanges();
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
    }
}