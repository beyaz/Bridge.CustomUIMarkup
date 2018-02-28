namespace System.Windows.Controls
{
    public class ContentControl : Control
    {
        #region Fields
        internal ContentPresenter _contentPresenter;
        #endregion

        #region Constructors
        public ContentControl()
        {
           
            AfterLogicalChildAdd += CanOnlyBeOneChild;
            AfterLogicalChildAdd += AssignFirstLogicalChildToContent;
            AfterTemplateApplied += InitializeContentPresenter;
        }

        void InitializeContentPresenter()
        {
            _contentPresenter = Find(this);
            if (_contentPresenter == null)
            {
                throw new InvalidOperationException("ContentPresenter must be defined in template.");
            }

        }

        static ContentPresenter Find(FrameworkElement element)
        {
            var elementAsContentPresenter = element as ContentPresenter;

            if (elementAsContentPresenter != null)
            {
                return elementAsContentPresenter;
            }

            var len = element.VisualChilderenCount;

            for (var i = 0; i < len; i++)
            {
                elementAsContentPresenter = Find(element.GetVisualChildAt(i));
                if (elementAsContentPresenter != null)
                {
                    return elementAsContentPresenter;
                }
            }

            return null;
        }
        #endregion

        #region Methods
        static void OnContentChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            ((ContentControl) d).OnContentChanged();
        }

        void AssignFirstLogicalChildToContent(FrameworkElement element)
        {
            if (_isContentChanging)
            {
                return;
            }

            Content = element;
        }

        void CanOnlyBeOneChild(FrameworkElement child)
        {
            if (LogicalChilderenCount == 2)
            {
                throw new InvalidOperationException("Content cannot be set more than once.");
            }
        }

        

        bool _isContentChanging;
        void OnContentChanged()
        {

            if (_contentPresenter == null)
            {
                throw new InvalidOperationException("'ContentPresenter' element not found.");
            }

            _isContentChanging = true;

            var content = Content;

            if (content == null)
            {
                _isContentChanging          = false;
                _contentPresenter.InnerHTML = null;
                return;
            }
           

            var frameworkElement = content as FrameworkElement;
            if (frameworkElement != null)
            {
                if (_contentPresenter.LogicalChilderenCount == 1)
                {
                    _contentPresenter.RemoveLogicalChild(_contentPresenter.GetLogicalChildAt(0));
                }

                if (_contentPresenter.VisualChilderenCount == 1)
                {
                    _contentPresenter.RemoveVisualChild(_contentPresenter.GetVisualChildAt(0));
                }

                _contentPresenter.AddLogicalChild(frameworkElement);
                
                if (LogicalChilderenCount == 1)
                {
                    RemoveLogicalChild(GetLogicalChildAt(0));
                }
                
                AddLogicalChild(frameworkElement);

                _isContentChanging = false;
                return;
            }

            var contentAsString = content.ToString();

            var textBlock  = UIBuilder.Create<TextBlock>();
            textBlock.Text = contentAsString;
            _contentPresenter.AddLogicalChild(textBlock);

            if (LogicalChilderenCount == 1)
            {
                RemoveLogicalChild(GetLogicalChildAt(0));
            }

            AddLogicalChild(textBlock);

            _isContentChanging = false;
        }
        #endregion

        #region ContentProperty
        public static readonly DependencyProperty ContentProperty = RegisterDependencyProperty(nameof(Content), typeof(object), typeof(ContentControl), OnContentChanged);

        public object Content
        {
            get { return GetValue(ContentProperty); }
            set { SetValue(ContentProperty, value); }
        }
        #endregion
    }
}