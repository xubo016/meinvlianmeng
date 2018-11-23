using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.IO;

public partial class admin_shgl : System.Web.UI.Page
{
    public int Pagee = 1;
    public int CountPage = 1;
    public string PageHtml = "";
    public int pageNoVal = 0;
    public string pageNo = string.Empty;
    public DataSet ds = new DataSet();
    public string Noval = "", zynr = "", sanme = "", tiaoj = "", tiao = "", time = "";
    public int NoIntVal = 0, sid = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["no"] != null)//商户id
        {
            Noval = MyFunction.Filter(Server.UrlDecode(Request.QueryString["no"].ToString().Trim()));
            try
            {
                NoIntVal = Convert.ToInt32(Noval);
            }
            catch { }
        }
        if (!IsPostBack)
        {
            try
            {
                Repeater1.DataSource = Logic.ExecuteReader("select  *  from shangjia ");
                Repeater1.DataBind();
            }
            catch { }
            //#region Access分页

            //int PageSize = 15;
            //int Count = Convert.ToInt32(Logic.ExecuteScalar("select count(id) from shangjia where " + tiao));
            //CountPage = Convert.ToInt32(Math.Ceiling((decimal)Count / (decimal)PageSize));
            //if (Count > PageSize)
            //{
            //    fenye.Style.Add("display", "block");
            //}

            //int Lpage = Pagee > 5 ? Pagee - 4 : 1;
            //for (int p = Lpage; p < Lpage + 10; p++)
            //{
            //    if (p > CountPage) break;
            //    if (p == Pagee)
            //    {
            //        PageHtml += "<a href=\"javascript:;\" class='Enabled'>" + p + "</a>&nbsp;";
            //    }
            //    else
            //    {
            //        PageHtml += "<a href=\"shlist.aspx?Pagee=" + p + "" + tiaoj + "\">[" + p + "]</a>&nbsp;";
            //    }
            //}
            //if (zonghe <= 0)
            //{
            //    foreach (RepeaterItem listItem in quyumc.Items)
            //    {
            //        LinkButton delBtn3 = (LinkButton)listItem.FindControl("LinkButton3");
            //        delBtn3.CommandName = "del";
            //        delBtn3.Attributes.Add("onClick", "if (!window.confirm('您确定要删除这条数据吗？')){return false;}else{}");
            //        delBtn3.CommandArgument = ((int)ds.Tables[0].Rows[listItem.ItemIndex]["id"]).ToString();
            //    }
            //}
            //else
            //{
            //    StringBuilder aa = new StringBuilder();
            //    aa.Append("select top " + PageSize + " * from shangjia where " + tiao + " and id not in (");
            //    aa.Append("select top " + PageSize * (Pagee - 1) + " id from shangjia where " + tiao + " order by id desc) order by id desc");
            //    try
            //    {
            //        ds = Logic.ExecuteDataSet(aa.ToString());
            //    }
            //    catch { }
            //    if (checkDataSetNull(ds))
            //    {
            //        quyumc.DataSource = ds;
            //        quyumc.DataBind();
            //    }
            //    foreach (RepeaterItem listItem in quyumc.Items)
            //    {
            //        LinkButton delBtn3 = (LinkButton)listItem.FindControl("LinkButton3");
            //        delBtn3.CommandName = "del";
            //        delBtn3.Attributes.Add("onClick", "if (!window.confirm('您确定要删除这条数据吗？')){return false;}else{}");
            //        delBtn3.CommandArgument = ((int)ds.Tables[0].Rows[listItem.ItemIndex]["id"]).ToString();
            //    }
            //}

            //#endregion
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
                    Response.Redirect("shlist.aspx?Pagee=1");
                }
                if (staridint > 0)
                {
                    string nraw = "", yingynr = "";
                    try
                    {
                        DataSet ddd = Logic.ExecuteDataSet("select zynr,wjmmc from shangjia where id=" + staridint + "");
                        nraw = ddd.Tables[0].Rows[0]["zynr"].ToString();
                        yingynr = ddd.Tables[0].Rows[0]["wjmmc"].ToString();
                    }
                    catch { }
                    if (nraw != "")
                    {
                        string wjjw = "";
                        wjjw = sharewsj.GetImg(nraw);
                        if (wjjw != "")
                        {
                            syysc(nraw);
                        }
                    }
                    string UserPath = Server.MapPath("../../0upimg/gwuimgs1/").ToString();
                    if (yingynr != "")
                    {
                        if (File.Exists(UserPath + yingynr))
                        {
                            File.Delete(UserPath + yingynr);
                        }
                    }
                    if (File.Exists(Server.MapPath("../../0upimg/ntu1/" + staridint + ".png")))
                    {
                        File.Delete(Server.MapPath("../../0upimg/ntu1/" + staridint + ".png"));
                    }

                    try
                    {
                        Logic.ExecuteNonQuery("delete from shangjia where id=" + staridint + "");
                        Class1.AlertShow("删除成功！", "shlist.aspx?Pagee=1&no=" + NoIntVal);
                    }
                    catch
                    {
                        Class1.AlertShow("删除失败！", "shlist.aspx?Pagee=1&no=" + NoIntVal);
                    }
                }
            }
            else { Response.Redirect("shlist.aspx?Pagee=1&no=" + NoIntVal); }

            #endregion
        }
    }

    private void syysc(string str)
    {
        string imgvalpa;
        string yimg = "";
        yimg = sharewsj.qctp(str);
        string path2 = "../../0upimg/neir1/";
        string[] arr1 = yimg.Split('|');
        for (int k = 0; k < arr1.Length; k++)
        {
            imgvalpa = Server.MapPath(path2 + arr1[k]);
            if (File.Exists(imgvalpa))
            {
                File.Delete(imgvalpa);
            }
        }
    }
}
