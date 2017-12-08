using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    //public class NotSupportedException : SystemException
    //{
    //    #region Constructors
    //    public NotSupportedException(string message = null, Exception innerException = null) : base(message, innerException)
    //    {

    //    }
    //    #endregion
    //}
    public class ArrayTypeMismatchException : SystemException
    {
        #region Constructors
        public ArrayTypeMismatchException(string message = null, Exception innerException = null) : base(message, innerException)
        {
        }
        #endregion
    }
    
   
    public class ObjectDisposedException : SystemException
    {
        readonly string objectName;
        public string ObjectName
        {
            get
            {
                return this.objectName;
            }
        }
        #region Constructors
        public ObjectDisposedException(string message = null, Exception innerException = null) : base(message, innerException)
        {
        }
        public ObjectDisposedException(string objectName, string message) : base(message)
        {
            this.objectName = objectName;
        }
        #endregion
    }

    public class UnauthorizedAccessException : SystemException
    {
        #region Constructors
        public UnauthorizedAccessException(string message = null, Exception innerException = null) : base(message, innerException)
        {
        }
        #endregion
    }
    
    namespace Security
    {
        public class SecurityException : SystemException
        {
            #region Constructors
            public SecurityException(string message = null, Exception innerException = null) : base(message, innerException)
            {
            }
            #endregion
        }

    }

    namespace Runtime.Serialization
    {
        public class SerializationException : SystemException
        {
            #region Constructors
            public SerializationException(string message = null, Exception innerException = null) : base(message, innerException)
            {
            }
            #endregion
        }
    }
}
