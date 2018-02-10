using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Security;

namespace System
{

    internal enum ExceptionResource
    {
        Argument_ImplementIComparable,
        Argument_InvalidType,
        Argument_InvalidArgumentForComparison,
        Argument_InvalidRegistryKeyPermissionCheck,
        ArgumentOutOfRange_NeedNonNegNum,
        Arg_ArrayPlusOffTooSmall,
        Arg_NonZeroLowerBound,
        Arg_RankMultiDimNotSupported,
        Arg_RegKeyDelHive,
        Arg_RegKeyStrLenBug,
        Arg_RegSetStrArrNull,
        Arg_RegSetMismatchedKind,
        Arg_RegSubKeyAbsent,
        Arg_RegSubKeyValueAbsent,
        Argument_AddingDuplicate,
        Serialization_InvalidOnDeser,
        Serialization_MissingKeys,
        Serialization_NullKey,
        Argument_InvalidArrayType,
        NotSupported_KeyCollectionSet,
        NotSupported_ValueCollectionSet,
        ArgumentOutOfRange_SmallCapacity,
        ArgumentOutOfRange_Index,
        Argument_InvalidOffLen,
        Argument_ItemNotExist,
        ArgumentOutOfRange_Count,
        ArgumentOutOfRange_InvalidThreshold,
        ArgumentOutOfRange_ListInsert,
        NotSupported_ReadOnlyCollection,
        InvalidOperation_CannotRemoveFromStackOrQueue,
        InvalidOperation_EmptyQueue,
        InvalidOperation_EnumOpCantHappen,
        InvalidOperation_EnumFailedVersion,
        InvalidOperation_EmptyStack,
        ArgumentOutOfRange_BiggerThanCollection,
        InvalidOperation_EnumNotStarted,
        InvalidOperation_EnumEnded,
        NotSupported_SortedListNestedWrite,
        InvalidOperation_NoValue,
        InvalidOperation_RegRemoveSubKey,
        Security_RegistryPermission,
        UnauthorizedAccess_RegistryNoWrite,
        ObjectDisposed_RegKeyClosed,
        NotSupported_InComparableType,
        Argument_InvalidRegistryOptionsCheck,
        Argument_InvalidRegistryViewCheck
    }


    internal enum ExceptionArgument
    {
        obj,
        dictionary,
        dictionaryCreationThreshold,
        array,
        info,
        key,
        collection,
        list,
        match,
        converter,
        queue,
        stack,
        capacity,
        index,
        startIndex,
        @value,
        count,
        arrayIndex,
        name,
        mode,
        item,
        options,
        view,
        sourceBytesToCopy
    }
    internal static class ThrowHelper
    {
        class Environment
        {
            internal static string GetResourceString(string key)
            {
                return key;
            }
        }

        internal static string GetArgumentName(ExceptionArgument argument)
        {
            string str = null;
            switch (argument)
            {
                case ExceptionArgument.obj:
                    {
                        str = "obj";
                        break;
                    }
                case ExceptionArgument.dictionary:
                    {
                        str = "dictionary";
                        break;
                    }
                case ExceptionArgument.dictionaryCreationThreshold:
                    {
                        str = "dictionaryCreationThreshold";
                        break;
                    }
                case ExceptionArgument.array:
                    {
                        str = "array";
                        break;
                    }
                case ExceptionArgument.info:
                    {
                        str = "info";
                        break;
                    }
                case ExceptionArgument.key:
                    {
                        str = "key";
                        break;
                    }
                case ExceptionArgument.collection:
                    {
                        str = "collection";
                        break;
                    }
                case ExceptionArgument.list:
                    {
                        str = "list";
                        break;
                    }
                case ExceptionArgument.match:
                    {
                        str = "match";
                        break;
                    }
                case ExceptionArgument.converter:
                    {
                        str = "converter";
                        break;
                    }
                case ExceptionArgument.queue:
                    {
                        str = "queue";
                        break;
                    }
                case ExceptionArgument.stack:
                    {
                        str = "stack";
                        break;
                    }
                case ExceptionArgument.capacity:
                    {
                        str = "capacity";
                        break;
                    }
                case ExceptionArgument.index:
                    {
                        str = "index";
                        break;
                    }
                case ExceptionArgument.startIndex:
                    {
                        str = "startIndex";
                        break;
                    }
                case ExceptionArgument.@value:
                    {
                        str = "value";
                        break;
                    }
                case ExceptionArgument.count:
                    {
                        str = "count";
                        break;
                    }
                case ExceptionArgument.arrayIndex:
                    {
                        str = "arrayIndex";
                        break;
                    }
                case ExceptionArgument.name:
                    {
                        str = "name";
                        break;
                    }
                case ExceptionArgument.mode:
                    {
                        str = "mode";
                        break;
                    }
                case ExceptionArgument.item:
                    {
                        str = "item";
                        break;
                    }
                case ExceptionArgument.options:
                    {
                        str = "options";
                        break;
                    }
                case ExceptionArgument.view:
                    {
                        str = "view";
                        break;
                    }
                case ExceptionArgument.sourceBytesToCopy:
                    {
                        str = "sourceBytesToCopy";
                        break;
                    }
                default:
                    {
                        return string.Empty;
                    }
            }
            return str;
        }

        internal static string GetResourceName(ExceptionResource resource)
        {
            string str = null;
            switch (resource)
            {
                case ExceptionResource.Argument_ImplementIComparable:
                    {
                        str = "Argument_ImplementIComparable";
                        break;
                    }
                case ExceptionResource.Argument_InvalidType:
                    {
                        str = "Argument_InvalidType";
                        break;
                    }
                case ExceptionResource.Argument_InvalidArgumentForComparison:
                    {
                        str = "Argument_InvalidArgumentForComparison";
                        break;
                    }
                case ExceptionResource.Argument_InvalidRegistryKeyPermissionCheck:
                    {
                        str = "Argument_InvalidRegistryKeyPermissionCheck";
                        break;
                    }
                case ExceptionResource.ArgumentOutOfRange_NeedNonNegNum:
                    {
                        str = "ArgumentOutOfRange_NeedNonNegNum";
                        break;
                    }
                case ExceptionResource.Arg_ArrayPlusOffTooSmall:
                    {
                        str = "Arg_ArrayPlusOffTooSmall";
                        break;
                    }
                case ExceptionResource.Arg_NonZeroLowerBound:
                    {
                        str = "Arg_NonZeroLowerBound";
                        break;
                    }
                case ExceptionResource.Arg_RankMultiDimNotSupported:
                    {
                        str = "Arg_RankMultiDimNotSupported";
                        break;
                    }
                case ExceptionResource.Arg_RegKeyDelHive:
                    {
                        str = "Arg_RegKeyDelHive";
                        break;
                    }
                case ExceptionResource.Arg_RegKeyStrLenBug:
                    {
                        str = "Arg_RegKeyStrLenBug";
                        break;
                    }
                case ExceptionResource.Arg_RegSetStrArrNull:
                    {
                        str = "Arg_RegSetStrArrNull";
                        break;
                    }
                case ExceptionResource.Arg_RegSetMismatchedKind:
                    {
                        str = "Arg_RegSetMismatchedKind";
                        break;
                    }
                case ExceptionResource.Arg_RegSubKeyAbsent:
                    {
                        str = "Arg_RegSubKeyAbsent";
                        break;
                    }
                case ExceptionResource.Arg_RegSubKeyValueAbsent:
                    {
                        str = "Arg_RegSubKeyValueAbsent";
                        break;
                    }
                case ExceptionResource.Argument_AddingDuplicate:
                    {
                        str = "Argument_AddingDuplicate";
                        break;
                    }
                case ExceptionResource.Serialization_InvalidOnDeser:
                    {
                        str = "Serialization_InvalidOnDeser";
                        break;
                    }
                case ExceptionResource.Serialization_MissingKeys:
                    {
                        str = "Serialization_MissingKeys";
                        break;
                    }
                case ExceptionResource.Serialization_NullKey:
                    {
                        str = "Serialization_NullKey";
                        break;
                    }
                case ExceptionResource.Argument_InvalidArrayType:
                    {
                        str = "Argument_InvalidArrayType";
                        break;
                    }
                case ExceptionResource.NotSupported_KeyCollectionSet:
                    {
                        str = "NotSupported_KeyCollectionSet";
                        break;
                    }
                case ExceptionResource.NotSupported_ValueCollectionSet:
                    {
                        str = "NotSupported_ValueCollectionSet";
                        break;
                    }
                case ExceptionResource.ArgumentOutOfRange_SmallCapacity:
                    {
                        str = "ArgumentOutOfRange_SmallCapacity";
                        break;
                    }
                case ExceptionResource.ArgumentOutOfRange_Index:
                    {
                        str = "ArgumentOutOfRange_Index";
                        break;
                    }
                case ExceptionResource.Argument_InvalidOffLen:
                    {
                        str = "Argument_InvalidOffLen";
                        break;
                    }
                case ExceptionResource.Argument_ItemNotExist:
                    {
                        str = "Argument_ItemNotExist";
                        break;
                    }
                case ExceptionResource.ArgumentOutOfRange_Count:
                    {
                        str = "ArgumentOutOfRange_Count";
                        break;
                    }
                case ExceptionResource.ArgumentOutOfRange_InvalidThreshold:
                    {
                        str = "ArgumentOutOfRange_InvalidThreshold";
                        break;
                    }
                case ExceptionResource.ArgumentOutOfRange_ListInsert:
                    {
                        str = "ArgumentOutOfRange_ListInsert";
                        break;
                    }
                case ExceptionResource.NotSupported_ReadOnlyCollection:
                    {
                        str = "NotSupported_ReadOnlyCollection";
                        break;
                    }
                case ExceptionResource.InvalidOperation_CannotRemoveFromStackOrQueue:
                    {
                        str = "InvalidOperation_CannotRemoveFromStackOrQueue";
                        break;
                    }
                case ExceptionResource.InvalidOperation_EmptyQueue:
                    {
                        str = "InvalidOperation_EmptyQueue";
                        break;
                    }
                case ExceptionResource.InvalidOperation_EnumOpCantHappen:
                    {
                        str = "InvalidOperation_EnumOpCantHappen";
                        break;
                    }
                case ExceptionResource.InvalidOperation_EnumFailedVersion:
                    {
                        str = "InvalidOperation_EnumFailedVersion";
                        break;
                    }
                case ExceptionResource.InvalidOperation_EmptyStack:
                    {
                        str = "InvalidOperation_EmptyStack";
                        break;
                    }
                case ExceptionResource.ArgumentOutOfRange_BiggerThanCollection:
                    {
                        str = "ArgumentOutOfRange_BiggerThanCollection";
                        break;
                    }
                case ExceptionResource.InvalidOperation_EnumNotStarted:
                    {
                        str = "InvalidOperation_EnumNotStarted";
                        break;
                    }
                case ExceptionResource.InvalidOperation_EnumEnded:
                    {
                        str = "InvalidOperation_EnumEnded";
                        break;
                    }
                case ExceptionResource.NotSupported_SortedListNestedWrite:
                    {
                        str = "NotSupported_SortedListNestedWrite";
                        break;
                    }
                case ExceptionResource.InvalidOperation_NoValue:
                    {
                        str = "InvalidOperation_NoValue";
                        break;
                    }
                case ExceptionResource.InvalidOperation_RegRemoveSubKey:
                    {
                        str = "InvalidOperation_RegRemoveSubKey";
                        break;
                    }
                case ExceptionResource.Security_RegistryPermission:
                    {
                        str = "Security_RegistryPermission";
                        break;
                    }
                case ExceptionResource.UnauthorizedAccess_RegistryNoWrite:
                    {
                        str = "UnauthorizedAccess_RegistryNoWrite";
                        break;
                    }
                case ExceptionResource.ObjectDisposed_RegKeyClosed:
                    {
                        str = "ObjectDisposed_RegKeyClosed";
                        break;
                    }
                case ExceptionResource.NotSupported_InComparableType:
                    {
                        str = "NotSupported_InComparableType";
                        break;
                    }
                case ExceptionResource.Argument_InvalidRegistryOptionsCheck:
                    {
                        str = "Argument_InvalidRegistryOptionsCheck";
                        break;
                    }
                case ExceptionResource.Argument_InvalidRegistryViewCheck:
                    {
                        str = "Argument_InvalidRegistryViewCheck";
                        break;
                    }
                default:
                    {
                        return string.Empty;
                    }
            }
            return str;
        }


        internal static void IfNullAndNullsAreIllegalThenThrow<T>(object value, ExceptionArgument argName)
        {
            if (value == null)
            {
                if (default(T) != null)
                {
                    ThrowHelper.ThrowArgumentNullException(argName);
                }
            }
        }


        internal static void ThrowArgumentException(ExceptionResource resource)
        {
            throw new ArgumentException(Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
        }

        internal static void ThrowArgumentException(ExceptionResource resource, ExceptionArgument argument)
        {
            throw new ArgumentException(Environment.GetResourceString(ThrowHelper.GetResourceName(resource)), ThrowHelper.GetArgumentName(argument));
        }

        internal static void ThrowArgumentNullException(ExceptionArgument argument)
        {
            throw new ArgumentNullException(ThrowHelper.GetArgumentName(argument));
        }

        internal static void ThrowArgumentOutOfRangeException()
        {
            ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_Index);
        }

        internal static void ThrowArgumentOutOfRangeException(ExceptionArgument argument)
        {
            throw new ArgumentOutOfRangeException(ThrowHelper.GetArgumentName(argument));
        }

        internal static void ThrowArgumentOutOfRangeException(ExceptionArgument argument, ExceptionResource resource)
        {
            //if (!CompatibilitySwitches.IsAppEarlierThanWindowsPhone8)
            //{
            //    throw new ArgumentOutOfRangeException(ThrowHelper.GetArgumentName(argument), Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
            //}
            throw new ArgumentOutOfRangeException(ThrowHelper.GetArgumentName(argument), string.Empty);
        }

        internal static void ThrowInvalidOperationException(ExceptionResource resource)
        {
            throw new InvalidOperationException(Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
        }

        internal static void ThrowKeyNotFoundException()
        {
            throw new KeyNotFoundException();
        }

        internal static void ThrowNotSupportedException(ExceptionResource resource)
        {
            throw new InvalidOperationException(Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
        }

        

        internal static void ThrowSecurityException(ExceptionResource resource)
        {
            throw new SecurityException(Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
        }

        internal static void ThrowSerializationException(ExceptionResource resource)
        {
            throw new SerializationException(Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
        }

        internal static void ThrowUnauthorizedAccessException(ExceptionResource resource)
        {
            throw new UnauthorizedAccessException(Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
        }

        internal static void ThrowWrongKeyTypeArgumentException(object key, Type targetType)
        {
            throw new ArgumentException("WrongKeyTypeArgumentException. @key:" + key + " @targetType:" + targetType);
        }

        internal static void ThrowWrongValueTypeArgumentException(object value, Type targetType)
        {
            throw new ArgumentException("WrongValueTypeArgumentException. @value:" + value + " @targetType:" + targetType);
        }
    }

}