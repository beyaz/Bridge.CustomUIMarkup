using System.Linq;
using System.Reflection;

namespace System.ComponentModel
{
    public class ReflectionHelper
    {
        #region Public Properties
        public static BindingFlags AllBindings => BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static;
        #endregion

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

        public static EventInfo FindEvent(object instance, string eventName, BindingFlags bindingFlags)
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

            return type.GetEvent(eventName, bindingFlags);
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

        public static MethodInfo FindMethodInfo(object instance, string methodName, params Type[] parameterTypes)
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

        public static PropertyInfo FindProperty(object instance, string propertyName, BindingFlags flags)
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

            return type.GetProperty(propertyName, flags);
        }

        public static MethodInfo GetMethodInfo(object instance, string methodName)
        {
            var methodInfo = FindMethodInfo(instance, methodName);
            if (methodInfo == null)
            {
                throw new MissingMemberException("MethodNotFound: " + instance.GetType().FullName + " -> " + methodName);
            }

            return methodInfo;
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

        /// <summary>
        ///     Invokes the public non static method.
        /// </summary>
        public static object InvokePublicNonStaticMethod(object instance, string methodName)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            if (methodName == null)
            {
                throw new ArgumentNullException(nameof(methodName));
            }

            var methodInfo = instance.GetType().GetMethod(methodName);
            if (methodInfo == null)
            {
                throw new MissingMemberException(instance.GetType().FullName + ":" + methodName);
            }

            return methodInfo.Invoke(instance, null);
        }

        public static void SetNonStaticField(object instance, string fieldName, object value)
        {
            AssertParameters(instance, fieldName);

            var type = instance.GetType();
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            var fieldInfo = type.GetField(fieldName, AllBindings);
            if (fieldInfo == null)
            {
                throw new MissingMemberException("FieldNotFound: " + instance.GetType().FullName + " -> " + fieldName);
            }

            fieldInfo.SetValue(instance, value);
        }

        public static void SetPropertyValue(object instance, string propertyName, object value)
        {
            AssertParameters(instance, propertyName);

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

        /// <summary>
        ///     Tries the get value.
        /// </summary>
        public static object TryGetPropertyValue(object instance, string propertyName)
        {
            var property = GetFirstNamedProperty(instance, propertyName);
            if (property == null)
            {
                return null;
            }

            return property.GetValue(instance);
        }
        #endregion

        #region Methods
        static void AssertParameters(object instance, string memberName)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            if (memberName == null)
            {
                throw new ArgumentNullException(nameof(memberName));
            }
        }

        /// <summary>
        ///     Gets the first named property.
        /// </summary>
        static PropertyInfo GetFirstNamedProperty(object instance, string propertyName)
        {
            if (instance == null)
            {
                return null;
            }

            return instance.GetType().GetProperties().FirstOrDefault(p => p.Name == propertyName);
        }
        #endregion
    }
}