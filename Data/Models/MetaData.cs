using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Data.Models
{
    public class CustomersMetaData
    {
        [Required]
        [MaxLength(40)]
        public string Name;
    }

    public class ProductsMetaData
    {
        [Required]
        [MaxLength(40)]
        public string Name;
    }

    public class StoresMetaData
    {
        [Required]
        [MaxLength(40)]
        public string Name;
    }
}
