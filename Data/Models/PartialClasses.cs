using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Data.Models
{
    class PartialClasses
    {
        [MetadataType(typeof(CustomersMetaData))]
        public partial class Customers
        {
        }

        [MetadataType(typeof(ProductsMetaData))]
        public partial class Products
        {
        }

        [MetadataType(typeof(StoresMetaData))]
        public partial class Stores
        {
        }
    }
}
