using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

/// <summary>
///Class1 的摘要说明
/// </summary>
public class Class1
{
	public Class1()	{}
    public static void AlertShow(string js)
    {
        HttpContext.Current.Response.Write("<script>alert('"+js+"')</script>");
    }
    public static void AlertShow(string js,string url)
    {
        HttpContext.Current.Response.Write("<script>alert('" + js + "'),window.location='"+url+"'</script>");
    }
}
