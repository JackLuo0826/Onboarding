using System;

namespace Data.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }
        public DateTime DateSold { get; set; }
    }
}
