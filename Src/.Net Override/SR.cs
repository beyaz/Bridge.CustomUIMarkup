using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    class SR
    {
        internal const string ObservableCollectionReentrancyNotAllowed = "ObservableCollectionReentrancyNotAllowed";
        public static string GetString(string name, params object[] args)
        {
            return name;
        }
    }
}
