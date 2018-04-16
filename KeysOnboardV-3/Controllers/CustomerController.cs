using System.Web.Mvc;
using Data;
using KeysOnboardV_3.Repositories;

namespace KeysOnboardV_2.Controllers
{
    public class CustomerController : Controller
    {
        static readonly CustomerRepository customerRepository = new CustomerRepository();

        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(customerRepository.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            return Json(customerRepository.GetById(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Customers customer)
        {
            return Json(customerRepository.Add(customer), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Customers customer)
        {
            if (customerRepository.Update(customer))
            {
                return Json(customerRepository.ListAll(), JsonRequestBehavior.AllowGet);
            }

            return Json(null);
        }

        public JsonResult Delete(int id)
        {
            return Json(customerRepository.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
