using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using System.IO;


public partial class Manage_Default : System.Web.UI.Page
{
    public DataSet chaxun = new DataSet();
    public string id, name, realname, tel;
    protected void Page_Load(object sender, EventArgs e)
    {
        DataSet ds = Logic.ExecuteDataSet("select * from admin where id>0");
        try
        {
            Repeater1.DataSource = ds;
            Repeater1.DataBind();
        }
        catch { }
        foreach (RepeaterItem listItem in Repeater1.Items)
        {
            LinkButton delBtn3 = (LinkButton)listItem.FindControl("LinkButton2");
            delBtn3.CommandName = "del";
            delBtn3.Attributes.Add("onClick", "if (!window.confirm('您确定要删除这条数据吗？')){return false;}else{}");
            delBtn3.CommandArgument = ((int)ds.Tables[0].Rows[listItem.ItemIndex]["id"]).ToString();
        }
    }
    
    protected void Repeater1_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            #region 删除
            if (e.CommandName == "del")
            {
                string starIdVal = e.CommandArgument.ToString().Trim();
                int staridint = 0;
                try
                {
                    staridint = Convert.ToInt32(starIdVal);
                }
                catch
                {
                    Response.Redirect("list.aspx?Pagee=1");
                }

                if (staridint > 0)
                {
                    //if (File.Exists(Server.MapPath("../../0upimg/dlei/" + staridint + ".png")))
                    //{
                    //    File.Delete(Server.MapPath("../../0upimg/dlei/" + staridint + ".png"));
                    //}
                    try
                    {
                        Logic.ExecuteDataSet("delete from admin where id=" + staridint + "");
                        Class1.AlertShow("删除成功！","adminList.aspx");
                    }
                    catch
                    {
                        Class1.AlertShow("删除失败！", "adminList.aspx");
                    }
                }
            }

            #endregion

        }
    }

}