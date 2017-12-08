using System;
using System.Runtime.CompilerServices;
using System;
using System.Collections;
using System.Collections.ObjectModel;
using System.Runtime.CompilerServices;

namespace System.Collections.Specialized
{
    public delegate void NotifyCollectionChangedEventHandler(object sender, NotifyCollectionChangedEventArgs e);
    public interface INotifyCollectionChanged
    {
        event NotifyCollectionChangedEventHandler CollectionChanged;
    }
}




namespace System.Collections.Specialized
{
    public enum NotifyCollectionChangedAction
    {
        /// <summary>One or more items were added to the collection.</summary>
        Add,
        /// <summary>One or more items were removed from the collection.</summary>
        Remove,
        /// <summary>One or more items were replaced in the collection.</summary>
        Replace,
        /// <summary>One or more items were moved within the collection.</summary>
        Move,
        /// <summary>The content of the collection changed dramatically.</summary>
        Reset
    }

    /// <summary>Provides data for the <see cref="E:System.Collections.Specialized.INotifyCollectionChanged.CollectionChanged" /> event.</summary>
    // [__DynamicallyInvokable]
    // [TypeForwardedFrom("WindowsBase, Version=3.0.0.0, Culture=Neutral, PublicKeyToken=31bf3856ad364e35")]
    public class NotifyCollectionChangedEventArgs : EventArgs
    {
        private NotifyCollectionChangedAction _action;

        private IList _newItems;

        private IList _oldItems;

        private int _newStartingIndex = -1;

        private int _oldStartingIndex = -1;

        /// <summary>Gets the action that caused the event. </summary>
        /// <returns>A <see cref="T:System.Collections.Specialized.NotifyCollectionChangedAction" /> value that describes the action that caused the event.</returns>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedAction Action
        {
            // [__DynamicallyInvokable]
            get
            {
                return this._action;
            }
        }

        /// <summary>Gets the list of new items involved in the change.</summary>
        /// <returns>The list of new items involved in the change.</returns>
        // [__DynamicallyInvokable]
        public IList NewItems
        {
            // [__DynamicallyInvokable]
            get
            {
                return this._newItems;
            }
        }

        /// <summary>Gets the index at which the change occurred.</summary>
        /// <returns>The zero-based index at which the change occurred.</returns>
        // [__DynamicallyInvokable]
        public int NewStartingIndex
        {
            // [__DynamicallyInvokable]
            get
            {
                return this._newStartingIndex;
            }
        }

        /// <summary>Gets the list of items affected by a <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" />, Remove, or Move action.</summary>
        /// <returns>The list of items affected by a <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" />, Remove, or Move action.</returns>
        // [__DynamicallyInvokable]
        public IList OldItems
        {
            // [__DynamicallyInvokable]
            get
            {
                return this._oldItems;
            }
        }

        /// <summary>Gets the index at which a <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Move" />, Remove, or Replace action occurred.</summary>
        /// <returns>The zero-based index at which a <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Move" />, Remove, or Replace action occurred.</returns>
        // [__DynamicallyInvokable]
        public int OldStartingIndex
        {
            // [__DynamicallyInvokable]
            get
            {
                return this._oldStartingIndex;
            }
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Reset" /> change.</summary>
        /// <param name="action">The action that caused the event. This must be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Reset" />.</param>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action)
        {
            if (action != NotifyCollectionChangedAction.Reset)
            {
                throw new ArgumentException("WrongActionForCtor");
            }
            this.InitializeAdd(action, null, -1);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a one-item change.</summary>
        /// <param name="action">The action that caused the event. This can be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Reset" />, <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Add" />, or <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Remove" />.</param>
        /// <param name="changedItem">The item that is affected by the change.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Reset, Add, or Remove, or if <paramref name="action" /> is Reset and <paramref name="changedItem" /> is not null.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, object changedItem)
        {
            if (action != NotifyCollectionChangedAction.Add && action != NotifyCollectionChangedAction.Remove && action != NotifyCollectionChangedAction.Reset)
            {
                throw new ArgumentException("MustBeResetAddOrRemoveActionForCtor");
            }
            if (action != NotifyCollectionChangedAction.Reset)
            {
                this.InitializeAddOrRemove(action, (IList)(new object[] { changedItem }), -1);
                return;
            }
            if (changedItem != null)
            {
                throw new ArgumentException("ResetActionRequiresNullItem");
            }
            this.InitializeAdd(action, null, -1);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a one-item change.</summary>
        /// <param name="action">The action that caused the event. This can be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Reset" />, <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Add" />, or <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Remove" />.</param>
        /// <param name="changedItem">The item that is affected by the change.</param>
        /// <param name="index">The index where the change occurred.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Reset, Add, or Remove, or if <paramref name="action" /> is Reset and either <paramref name="changedItems" /> is not null or <paramref name="index" /> is not -1.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, object changedItem, int index)
        {
            if (action != NotifyCollectionChangedAction.Add && action != NotifyCollectionChangedAction.Remove && action != NotifyCollectionChangedAction.Reset)
            {
                throw new ArgumentException("MustBeResetAddOrRemoveActionForCtor");
            }
            if (action != NotifyCollectionChangedAction.Reset)
            {
                this.InitializeAddOrRemove(action, (IList)(new object[] { changedItem }), index);
                return;
            }
            if (changedItem != null)
            {
                throw new ArgumentException("ResetActionRequiresNullItem");
            }
            if (index != -1)
            {
                throw new ArgumentException("ResetActionRequiresIndexMinus1");
            }
            this.InitializeAdd(action, null, -1);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a multi-item change.</summary>
        /// <param name="action">The action that caused the event. This can be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Reset" />, <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Add" />, or <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Remove" />.</param>
        /// <param name="changedItems">The items that are affected by the change.</param>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, IList changedItems)
        {
            if (action != NotifyCollectionChangedAction.Add && action != NotifyCollectionChangedAction.Remove && action != NotifyCollectionChangedAction.Reset)
            {
                throw new ArgumentException("MustBeResetAddOrRemoveActionForCtor");
            }
            if (action != NotifyCollectionChangedAction.Reset)
            {
                if (changedItems == null)
                {
                    throw new ArgumentNullException("changedItems");
                }
                this.InitializeAddOrRemove(action, changedItems, -1);
                return;
            }
            if (changedItems != null)
            {
                throw new ArgumentException("ResetActionRequiresNullItem");
            }
            this.InitializeAdd(action, null, -1);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a multi-item change or a <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Reset" /> change.</summary>
        /// <param name="action">The action that caused the event. This can be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Reset" />, <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Add" />, or <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Remove" />.</param>
        /// <param name="changedItems">The items affected by the change.</param>
        /// <param name="startingIndex">The index where the change occurred.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Reset, Add, or Remove, if <paramref name="action" /> is Reset and either <paramref name="changedItems" /> is not null or <paramref name="startingIndex" /> is not -1, or if action is Add or Remove and <paramref name="startingIndex" /> is less than -1.</exception>
        /// <exception cref="T:System.ArgumentNullException">If <paramref name="action" /> is Add or Remove and <paramref name="changedItems" /> is null.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, IList changedItems, int startingIndex)
        {
            if (action != NotifyCollectionChangedAction.Add && action != NotifyCollectionChangedAction.Remove && action != NotifyCollectionChangedAction.Reset)
            {
                throw new ArgumentException("MustBeResetAddOrRemoveActionForCtor");
            }
            if (action != NotifyCollectionChangedAction.Reset)
            {
                if (changedItems == null)
                {
                    throw new ArgumentNullException("changedItems");
                }
                if (startingIndex < -1)
                {
                    throw new ArgumentException("IndexCannotBeNegative:startingIndex");
                }
                this.InitializeAddOrRemove(action, changedItems, startingIndex);
                return;
            }
            if (changedItems != null)
            {
                throw new ArgumentException("ResetActionRequiresNullItem");
            }
            if (startingIndex != -1)
            {
                throw new ArgumentException("ResetActionRequiresIndexMinus1");
            }
            this.InitializeAdd(action, null, -1);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a one-item <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" /> change.</summary>
        /// <param name="action">The action that caused the event. This can only be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" />.</param>
        /// <param name="newItem">The new item that is replacing the original item.</param>
        /// <param name="oldItem">The original item that is replaced.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Replace.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, object newItem, object oldItem)
        {
            if (action != NotifyCollectionChangedAction.Replace)
            {
                throw new ArgumentException("WrongActionForCtor");
            }
            object[] objArray = new object[] { newItem };
            object[] objArray1 = new object[] { oldItem };
            this.InitializeMoveOrReplace(action, (IList)objArray, (IList)objArray1, -1, -1);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a one-item <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" /> change.</summary>
        /// <param name="action">The action that caused the event. This can be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" />.</param>
        /// <param name="newItem">The new item that is replacing the original item.</param>
        /// <param name="oldItem">The original item that is replaced.</param>
        /// <param name="index">The index of the item being replaced.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Replace.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, object newItem, object oldItem, int index)
        {
            if (action != NotifyCollectionChangedAction.Replace)
            {
                throw new ArgumentException("WrongActionForCtor");
            }
            int ınt32 = index;
            object[] objArray = new object[] { newItem };
            object[] objArray1 = new object[] { oldItem };
            this.InitializeMoveOrReplace(action, (IList)objArray, (IList)objArray1, index, ınt32);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a multi-item <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" /> change.</summary>
        /// <param name="action">The action that caused the event. This can only be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" />.</param>
        /// <param name="newItems">The new items that are replacing the original items.</param>
        /// <param name="oldItems">The original items that are replaced.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Replace.</exception>
        /// <exception cref="T:System.ArgumentNullException">If <paramref name="oldItems" /> or <paramref name="newItems" /> is null.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, IList newItems, IList oldItems)
        {
            if (action != NotifyCollectionChangedAction.Replace)
            {
                throw new ArgumentException("WrongActionForCtor");
            }
            if (newItems == null)
            {
                throw new ArgumentNullException("newItems");
            }
            if (oldItems == null)
            {
                throw new ArgumentNullException("oldItems");
            }
            this.InitializeMoveOrReplace(action, newItems, oldItems, -1, -1);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a multi-item <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" /> change.</summary>
        /// <param name="action">The action that caused the event. This can only be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Replace" />.</param>
        /// <param name="newItems">The new items that are replacing the original items.</param>
        /// <param name="oldItems">The original items that are replaced.</param>
        /// <param name="startingIndex">The index of the first item of the items that are being replaced.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Replace.</exception>
        /// <exception cref="T:System.ArgumentNullException">If <paramref name="oldItems" /> or <paramref name="newItems" /> is null.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, IList newItems, IList oldItems, int startingIndex)
        {
            if (action != NotifyCollectionChangedAction.Replace)
            {
                throw new ArgumentException("WrongActionForCtor");
            }
            if (newItems == null)
            {
                throw new ArgumentNullException("newItems");
            }
            if (oldItems == null)
            {
                throw new ArgumentNullException("oldItems");
            }
            this.InitializeMoveOrReplace(action, newItems, oldItems, startingIndex, startingIndex);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a one-item <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Move" /> change.</summary>
        /// <param name="action">The action that caused the event. This can only be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Move" />.</param>
        /// <param name="changedItem">The item affected by the change.</param>
        /// <param name="index">The new index for the changed item.</param>
        /// <param name="oldIndex">The old index for the changed item.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Move or <paramref name="index" /> is less than 0.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, object changedItem, int index, int oldIndex)
        {
            if (action != NotifyCollectionChangedAction.Move)
            {
                throw new ArgumentException(SR.GetString("WrongActionForCtor", new object[] { NotifyCollectionChangedAction.Move }), "action");
            }
            if (index < 0)
            {
                throw new ArgumentException(SR.GetString("IndexCannotBeNegative"), "index");
            }
            object[] objArray = new object[] { changedItem };
            this.InitializeMoveOrReplace(action, objArray, objArray, index, oldIndex);
        }

        /// <summary>Initializes a new instance of the <see cref="T:System.Collections.Specialized.NotifyCollectionChangedEventArgs" /> class that describes a multi-item <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Move" /> change.</summary>
        /// <param name="action">The action that caused the event. This can only be set to <see cref="F:System.Collections.Specialized.NotifyCollectionChangedAction.Move" />.</param>
        /// <param name="changedItems">The items affected by the change.</param>
        /// <param name="index">The new index for the changed items.</param>
        /// <param name="oldIndex">The old index for the changed items.</param>
        /// <exception cref="T:System.ArgumentException">If <paramref name="action" /> is not Move or <paramref name="index" /> is less than 0.</exception>
        // [__DynamicallyInvokable]
        public NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, IList changedItems, int index, int oldIndex)
        {
            if (action != NotifyCollectionChangedAction.Move)
            {
                throw new ArgumentException(SR.GetString("WrongActionForCtor", new object[] { NotifyCollectionChangedAction.Move }), "action");
            }
            if (index < 0)
            {
                throw new ArgumentException(SR.GetString("IndexCannotBeNegative"), "index");
            }
            this.InitializeMoveOrReplace(action, changedItems, changedItems, index, oldIndex);
        }

        internal NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction action, IList newItems, IList oldItems, int newIndex, int oldIndex)
        {
            IList lists;
            IList lists1;
            this._action = action;
            if (newItems == null)
            {
                lists = null;
            }
            else
            {
                lists = ArrayList_ReadOnly(newItems);

            }
            this._newItems = lists;
            if (oldItems == null)
            {
                lists1 = null;
            }
            else
            {
                lists1 = ArrayList_ReadOnly(oldItems);

            }
            this._oldItems = lists1;
            this._newStartingIndex = newIndex;
            this._oldStartingIndex = oldIndex;
        }

        private void InitializeAdd(NotifyCollectionChangedAction action, IList newItems, int newStartingIndex)
        {
            IList lists;
            this._action = action;
            if (newItems == null)
            {
                lists = null;
            }
            else
            {
                lists = ArrayList_ReadOnly(newItems);

            }
            this._newItems = lists;
            this._newStartingIndex = newStartingIndex;
        }

        private void InitializeAddOrRemove(NotifyCollectionChangedAction action, IList changedItems, int startingIndex)
        {
            if (action == NotifyCollectionChangedAction.Add)
            {
                this.InitializeAdd(action, changedItems, startingIndex);
                return;
            }
            if (action == NotifyCollectionChangedAction.Remove)
            {
                this.InitializeRemove(action, changedItems, startingIndex);
            }
        }

        private void InitializeMoveOrReplace(NotifyCollectionChangedAction action, IList newItems, IList oldItems, int startingIndex, int oldStartingIndex)
        {
            this.InitializeAdd(action, newItems, startingIndex);
            this.InitializeRemove(action, oldItems, oldStartingIndex);
        }

        private void InitializeRemove(NotifyCollectionChangedAction action, IList oldItems, int oldStartingIndex)
        {
            IList lists;
            this._action = action;
            if (oldItems == null)
            {
                lists = null;
            }
            else
            {
                lists = ArrayList_ReadOnly(oldItems);

            }
            this._oldItems = lists;
            this._oldStartingIndex = oldStartingIndex;
        }

        static IList ArrayList_ReadOnly(IList list)
        {
            // fixme:.net override ? 
            return list;
        }
    }
}