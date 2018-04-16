using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Data;
using Data.Models;
using KeysOnboardV_3.Repositories;

namespace KeysOnboardV_2.Controllers
{
    public class ProductController : Controller
    {
        static readonly ProductRepository productRepository = new ProductRepository();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(productRepository.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            return Json(productRepository.GetById(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Products product)
        {
            return Json(productRepository.Add(product), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Products product)
        {
            if (productRepository.Update(product))
            {
                return Json(productRepository.ListAll(), JsonRequestBehavior.AllowGet);
            }

            return Json(null);
        }

        public JsonResult Delete(int id)
        {
            return Json(productRepository.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
