using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class DataGridColumn : Control
    {
        #region Public Properties
        public override string DefaultTemplateAsXml => "<th>{Label}</th>";
        #endregion

        #region DataGridCellEditorType EditorType
        public static readonly DependencyProperty EditorTypeProperty = DependencyProperty.Register(
                                                                                                   "EditorType", typeof(DataGridCellEditorType), typeof(DataGridColumn), new PropertyMetadata(default(DataGridCellEditorType)));

        public DataGridCellEditorType EditorType
        {
            get { return (DataGridCellEditorType) GetValue(EditorTypeProperty); }
            set { SetValue(EditorTypeProperty, value); }
        }
        #endregion

        #region string Label
        public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(
                                                                                              "Label", typeof(string), typeof(DataGridColumn), new PropertyMetadata(default(string)));

        public string Label
        {
            get { return (string) GetValue(LabelProperty); }
            set { SetValue(LabelProperty, value); }
        }
        #endregion

        #region string Name
        public static readonly DependencyProperty NameProperty = DependencyProperty.Register(
                                                                                             "Name", typeof(string), typeof(DataGridColumn), new PropertyMetadata(default(string)));

        public string Name
        {
            get { return (string) GetValue(NameProperty); }
            set { SetValue(NameProperty, value); }
        }
        #endregion
    }
}