using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Onboarding.Models;
using System.Data.Entity;

namespace Onboarding.Data_Access_Layer
{
    public class BusinessContext : DbContext
    {
        public BusinessContext() : base("BConnectionString")
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<ProductSold> ProductSold { get; set; }
    }
}