using System.Collections;
using System.Collections.Generic;
using Bridge;
using Bridge.Html5;

namespace System.Xml
{

    public class XmlException : SystemException
    {
        public XmlException(string message, Exception innerException) : base(message, innerException) { }
    }
    [IgnoreCast]
    [External]
    public class XmlDocument
    {
        #region Public Properties
        [Name("firstChild")]
        public XmlNode FirstChild { get; }
        #endregion
    }

    [IgnoreCast]
    [External]
    public class XmlNodeList : IEnumerable<XmlNode>
    {
        #region Public Properties
        [Name("length")]
        public int Length { get; }

        [Name("firstChild")]
        public string FirstChild { get; }
        #endregion

        #region Public Indexers
        [Name("this[index]")]
        public virtual XmlNode this[int index]
        {
            get { throw new NotImplementedException(); }
        }
        #endregion

        #region Public Methods
        public IEnumerator<XmlNode> GetEnumerator()
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Explicit Interface Methods
        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }
        #endregion
    }

    [IgnoreCast]
    [External]
    public class XmlNode
    {
        #region Public Properties
        [Name("attributes")]
        public  XmlAttributeCollection Attributes { get; }

        [Name("childNodes")]
        public XmlNodeList ChildNodes { get; set; }

        [Name("nodeName")]
        public string NodeName { get; set; }

    

        [Name("parentNode")]
        public XmlNode ParentNode { get; set; }

        [Name("nodeType")]
        public NodeType NodeType { get; }
        #endregion
    }

    [IgnoreCast]
    [External]
    public class XmlAttributeCollection: IEnumerable<XmlAttribute>
    {
        #region Public Properties
        [Name("length")]
        public int Length { get; }
        #endregion

        #region Public Indexers
        [Name("this[index]")]
        public XmlAttribute this[int index]
        {
            get { throw new NotImplementedException(); }
        }

        [Name("this[name]")]
        public new XmlAttribute this[string name]
        {
            get { throw new NotImplementedException(); }
        }

        
        #endregion



        #region Public Methods
        public IEnumerator<XmlAttribute> GetEnumerator()
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Explicit Interface Methods
        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }
        #endregion
    }

    [IgnoreCast]
    [External]
    public class XmlAttribute : XmlNode
    {
        #region Public Properties
        [Name("nodeValue")]
        public string NodeValue { get; set; }
        #endregion
    }
}