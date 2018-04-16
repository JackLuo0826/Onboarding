using System;

namespace Data.Models
{
    public class ProductSold
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public string ProductName { get; set; }
        public string CustomerName { get; set; }
        public string StoreName { get; set; }
        public DateTime DateSold { get; set; }
        public string DateSoldString { get; set; }
    }
}