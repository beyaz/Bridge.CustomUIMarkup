using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class ItemsControlTests:TestBase
    {

        public static void RunAll()
        {
            new ItemsControlTests().TestVisualChilderenCounts();

            new ItemsControlTests().TestXmlProperty();
        }
        void TestVisualChilderenCounts()
        {
            var itemsControl = new ItemsControl("div", "oprt")
            {
                ItemTemplate = Template.CreateFromXml("<div>" +
                                                      "     <yt>{LastName}</yt>" +
                                                      "</div>"),
                ItemsSource = new List<SimpleClass1>
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



            var div = new HtmlElement("div","ttt");

            div.AddLogicalChild(itemsControl);

            MustEqual(2, itemsControl.VisualChilderenCount);
            MustEqual(2, itemsControl.LogicalChilderenCount);

            MustEqual("A", itemsControl.GetLogicalChildAt(0).GetLogicalChildAt(0).html());
        }

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
                      "         </div>"+
                      "     </ItemsControl.ItemTemplate>" +
                      "</ItemsControl>";


            Builder.LoadComponent(fe,xml);

            var itemsControl = fe.GetLogicalChildAt(0);







            var div = new HtmlElement("div", "ttt");

            div.AddLogicalChild(itemsControl);

            MustEqual(2, itemsControl.VisualChilderenCount);
            MustEqual(2, itemsControl.LogicalChilderenCount);

            MustEqual("A", itemsControl.GetLogicalChildAt(0).GetLogicalChildAt(0).html());
        }
    }
}
