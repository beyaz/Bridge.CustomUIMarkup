using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class ItemsControlTests : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new ItemsControlTests().TestVisualChilderenCounts();

            new ItemsControlTests().TestXmlProperty();

            new ItemsControlTests().ShouldRenderWhenItemsSourceChanged();
        }
        #endregion

        #region Methods
        void ShouldRenderWhenItemsSourceChanged()
        {
            var model = new ItemsControlTestModel
            {
                Users = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName = "A"
                    },
                    new SimpleClass1
                    {
                        LastName = "B"
                    }
                }
            };

            var xmlString = "<ItemsControl ItemsSource='{Users}'>" +
                            "     <ItemsControl.ItemTemplate>" +
                            "         <div>" +
                            "             <yt>{LastName}</yt>" +
                            "         </div>" +
                            "     </ItemsControl.ItemTemplate>" +
                            "</ItemsControl>";

            var ui = new FrameworkElement
            {
                DataContext = model
            };

            ui.LoadComponent(xmlString);

            var itemsControl = ui.GetLogicalChildAt(0);

            MustEqual(2, itemsControl.VisualChilderenCount);
            MustEqual(2, itemsControl.LogicalChilderenCount);

            MustEqual("A", itemsControl.GetLogicalChildAt(0).GetLogicalChildAt(0).html());
            MustEqual("B", itemsControl.GetLogicalChildAt(1).GetLogicalChildAt(0).html());

            ui.DataContext = new ItemsControlTestModel
            {
                Users = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName = "C"
                    },
                    new SimpleClass1
                    {
                        LastName = "D"
                    },
                    new SimpleClass1
                    {
                        LastName = "E"
                    }
                }
            };


            MustEqual(3, itemsControl.VisualChilderenCount);
            MustEqual(3, itemsControl.LogicalChilderenCount);

            MustEqual("C", itemsControl.GetLogicalChildAt(0).GetLogicalChildAt(0).html());
            MustEqual("D", itemsControl.GetLogicalChildAt(1).GetLogicalChildAt(0).html());
            MustEqual("E", itemsControl.GetLogicalChildAt(2).GetLogicalChildAt(0).html());
        }

        void TestVisualChilderenCounts()
        {
            var itemsControl = UIBuilder.Create<ItemsControl>();

            itemsControl.ItemTemplate = Template.CreateFromXml("<div>" +
                                                               "     <yt>{LastName}</yt>" +
                                                               "</div>");
            itemsControl.ItemsSource = new List<SimpleClass1>
            {
                new SimpleClass1
                {
                    LastName = "A"
                },
                new SimpleClass1
                {
                    LastName = "B"
                }
            };

            var div = new HtmlElement("div", "ttt");

            div.AddLogicalChild(itemsControl);

            MustEqual(2, itemsControl.VisualChilderenCount);
            MustEqual(2, itemsControl.LogicalChilderenCount);

            MustEqual("A", itemsControl.GetLogicalChildAt(0).GetLogicalChildAt(0).html());
            MustEqual("B", itemsControl.GetLogicalChildAt(1).GetLogicalChildAt(0).html());
        }

        void TestXmlProperty()
        {
            var dataContext = new ItemsControlTestModel
            {
                Users = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName = "A"
                    },
                    new SimpleClass1
                    {
                        LastName = "B"
                    }
                }
            };

            var fe = new FrameworkElement
            {
                DataContext = dataContext
            };

            var xml = "<ItemsControl  ItemsSource ='{Users}' class='ui list'>" +
                      "     <ItemsControl.ItemTemplate>" +
                      "         <div>" +
                      "             <yt>{LastName}</yt>" +
                      "         </div>" +
                      "     </ItemsControl.ItemTemplate>" +
                      "</ItemsControl>";

            UIBuilder.LoadComponent(fe, xml);

            var itemsControl = fe.GetLogicalChildAt(0);

            var div = new HtmlElement("div", "ttt");

            div.AddLogicalChild(itemsControl);

            MustEqual(2, itemsControl.VisualChilderenCount);
            MustEqual(2, itemsControl.LogicalChilderenCount);

            MustEqual("A", itemsControl.GetLogicalChildAt(0).GetLogicalChildAt(0).html());
        }
        #endregion

        public class ItemsControlTestModel : Bag
        {
            #region List<User> Users
            List<SimpleClass1> _users;

            public List<SimpleClass1> Users
            {
                get { return _users; }
                set
                {
                    if (_users != value)
                    {
                        _users = value;
                        OnPropertyChanged("Users");
                    }
                }
            }
            #endregion
        }
    }
}