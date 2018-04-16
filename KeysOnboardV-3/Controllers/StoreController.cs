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
    public class StoreController : Controller
    {
        static readonly StoreRepository storeRepository = new StoreRepository();

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(storeRepository.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            return Json(storeRepository.GetById(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Stores store)
        {
            return Json(storeRepository.Add(store), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Stores store)
        {
            if (storeRepository.Update(store))
            {
                return Json(storeRepository.ListAll(), JsonRequestBehavior.AllowGet);
            }

            return Json(null);
        }

        public JsonResult Delete(int id)
        {
            return Json(storeRepository.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
