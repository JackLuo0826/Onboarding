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
    public class ProductController : Controller
    {
        private BusinessDatabaseEntities db = new BusinessDatabaseEntities();
        string ErrorMessage = "Unable to delete as this product is used in an existing row in ProductSolds table.";

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            List<Products> _list = db.Products.ToList();
            var result = (from c in _list
                          select new Product
                          {
                              Id = c.Id,
                              Name = c.Name,
                              Price = c.Price,
                          }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Products product)
        {
            return Json(DbAdd(product), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int Id)
        {
            Products p = db.Products.Find(Id);
            Product product = new Product
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price
            };
            return Json(product, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Products product)
        {
            return Json(DbUpdate(product), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int Id)
        {
            if (db.ProductSolds.FirstOrDefault(x => x.ProductId == Id) != null)
            {

                return Json(new { Success = "False", responseText = ErrorMessage }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(DbDelete(Id), JsonRequestBehavior.AllowGet);
            }
        }

        private Products DbAdd([Bind(Include = "Id,Name,Price")] Products product)
        {
            db.Products.Add(product);
            db.SaveChanges();
            return product;
        }

        private object DbUpdate([Bind(Include = "Id,Name,Price")] Products product)
        {
            db.Entry(product).State = EntityState.Modified;
            db.SaveChanges();
            return new { Message = "Update complete." };
        }

        private object DbDelete(int Id)
        {
            Products product = db.Products.Find(Id);
            db.Products.Remove(product);
            db.SaveChanges();
            return new { Success = "True" };
        }
    }
}
