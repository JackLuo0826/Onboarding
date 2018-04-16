using System.Web.Mvc;
using Data;
using Data.Models;
using KeysOnboardV_3.Repositories;

namespace KeysOnboardV_3.Controllers
{
    public class SaleController : Controller
    {
        static readonly SaleRepository saleRepository = new SaleRepository();

        // GET: Sale
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(saleRepository.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            return Json(saleRepository.GetById(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(ProductSold sale)
        {
            return Json(saleRepository.Add(sale), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProductSold sale)
        {
            if (saleRepository.Update(sale))
            {
                return Json(saleRepository.ListAll(), JsonRequestBehavior.AllowGet);
            }

            return Json(null);
        }

        public JsonResult Delete(int id)
        {
            return Json(saleRepository.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}