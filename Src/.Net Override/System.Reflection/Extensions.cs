using System.Text;

namespace System.Reflection
{
    public static class Extensions
    {
        #region Public Methods
        public static string GetResource(this Assembly assembly, string name, bool throwOnError)
        {
            var resource = assembly.GetManifestResourceDataAsBase64(name);

            if (resource == null)
            {
                if (throwOnError)
                {
                    throw new InvalidOperationException("ResourceNotFound:" + name);
                }

                return null;
            }

            return EncodingHelper.Base64Decode(resource);
        }
        #endregion
    }
}