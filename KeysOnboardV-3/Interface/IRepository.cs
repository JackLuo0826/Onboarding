using System;
using System.Collections.Generic;

namespace KeysOnboardV_3.Interface
{
    interface IRepository
    {
        IEnumerable<Object> ListAll();
        Object GetById(int id);
        Object Add(Object item);
        bool Update(Object item);
        bool Delete(int id);
    }
}
