using System.Reflection;

namespace System.ComponentModel
{
    public class ReflectionHelper
    {
        #region Public Methods
        public static EventInfo FindEvent(object instance, string eventName)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            if (eventName == null)
            {
                throw new ArgumentNullException(nameof(eventName));
            }

            var type = instance.GetType();
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            return type.GetEvent(eventName);
        }

        public static MethodInfo FindMethodInfo(object instance, string methodName)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            if (methodName == null)
            {
                throw new ArgumentNullException(nameof(methodName));
            }

            var type = instance.GetType();
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            return type.GetMethod(methodName);
        }

        public static BindingFlags AllBindings => BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static;

        public static MethodInfo FindMethodInfo(object instance, string methodName,params  Type[]parameterTypes)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            if (methodName == null)
            {
                throw new ArgumentNullException(nameof(methodName));
            }

            var type = instance.GetType();
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            return type.GetMethod(methodName, AllBindings, parameterTypes);
        }
        public static PropertyInfo FindProperty(object instance, string propertyName)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            if (propertyName == null)
            {
                throw new ArgumentNullException(nameof(propertyName));
            }

            var type = instance.GetType();
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            return type.GetProperty(propertyName);
        }

        public static object GetPropertyValue(object instance, string propertyName)
        {
            

            var propertyInfo = FindProperty(instance, propertyName);

            if (propertyInfo == null)
            {
                var bag = instance as Bag;
                if (bag != null)
                {
                    return bag.GetValue(propertyName);
                }

                throw new MissingMemberException(instance.GetType().FullName + "->" + propertyName);
            }

            return propertyInfo.GetValue(instance);
        }

        public static object Invoke(object instance, string methodName)
        {
            var methodInfo = FindMethodInfo(instance, methodName);
            if (methodInfo == null)
            {
                throw new MissingMemberException(instance.GetType().FullName + "->" + methodName);
            }

            return methodInfo.Invoke(instance);
        }

        public static object Invoke(object instance, string methodName, params object[] parameters)
        {
            var methodInfo = FindMethodInfo(instance, methodName);
            if (methodInfo == null)
            {
                throw new MissingMemberException(instance.GetType().FullName + "->" + methodName);
            }

            return methodInfo.Invoke(instance, parameters);
        }

        public static void SetPropertyValue(object instance, string propertyName, object value)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            if (propertyName == null)
            {
                throw new ArgumentNullException(nameof(propertyName));
            }

           

            var type = instance.GetType();
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            var propertyInfo = FindProperty(instance, propertyName);

            if (propertyInfo == null)
            {
                var bag = instance as Bag;
                if (bag != null)
                {
                    bag.SetValue(propertyName, value);
                    return;
                }

                throw new MissingMemberException(type.FullName + "->" + propertyName);
            }

            propertyInfo.SetValue(instance, value);
        }
        #endregion

        public static MethodInfo GetMethodInfo(object instance, string methodName)
        {
            var methodInfo = FindMethodInfo(instance, methodName);
            if (methodInfo == null)
            {
                throw new MissingMemberException("MethodNotFound: "+ instance.GetType().FullName + " -> "+ methodName);
            }
            return methodInfo;
        }
    }
}