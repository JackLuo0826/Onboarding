using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Onboarding.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Name { get; set; }

        public string Address { get; set; }

        public virtual IList<ProductSold> ProductSold { get; set; }
    }
}