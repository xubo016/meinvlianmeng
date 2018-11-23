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

public partial class kuangjia_shedit : System.Web.UI.Page
{
    public string titlew = "", Imgmc = "", Noval = "", didval = "", xidval = "", dming = "", tpxxr = "", ntits = "", wenjj = "";
    public int NoIntVal = 0, sid = 0;
    HttpCookie cookie = HttpContext.Current.Request.Cookies["tuohailuzw"];
    public DataSet ds = new DataSet();

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
            #region 内容
            string vvsds = "";
            string ssq = "select * from shangjia where id=" + NoIntVal;
            try
            {
                ds = Logic.ExecuteDataSet(ssq);
            }
            catch { }
            if (checkDataSetNull(ds))
            {
                TextBox1.Text = ds.Tables[0].Rows[0]["sname"].ToString();

                TextBox2.Text = ds.Tables[0].Rows[0]["zynr"].ToString();

                vvsds = ds.Tables[0].Rows[0]["wjmmc"].ToString();
            }
            if (vvsds.Length > 5)
            {
                wenjj = "<a href=\"../../0upimg/gwuimgs1/" + vvsds + "\">" + vvsds + "</a><br>";
            }
            #endregion
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string cntim = "";
        string zyyw = "", didvalx = "", xidvalx = "", shtp = "";
        string ssqe = "select cbody,wjmmc,addtime from shangjia where id=" + NoIntVal;
        try { ds = Logic.ExecuteDataSet(ssqe); }
        catch { }
        if (checkDataSetNull(ds))
        {
            zyyw = ds.Tables[0].Rows[0]["zynr"].ToString();
            shtp = ds.Tables[0].Rows[0]["wjmmc"].ToString();
        }

        string nr1 = MyFunction.Filter(TextBox1.Text).Trim().Replace(" ", "");
        string nr2 = MyFunction.Filter(TextBox2.Text); //内容

        string wenja = HiddenField1.Value;


        string UserPath = Server.MapPath("../../0upimg/ntu1/").ToString();
        if (!Directory.Exists(UserPath)) //如果文件夹不存在则创建
        {
            Directory.CreateDirectory(UserPath);//创建文件夹
        }

        if (FileUpload1.HasFile == true)
        {
            #region 判断图片大小
            string img = string.Empty;
            img = FileUpload1.FileName;
            string ImgExtention = Path.GetExtension(img);//返回指定路径的字符串的扩展名
            int ImgSize = FileUpload1.PostedFile.ContentLength;//此处取得的文件大小的单位是byte
            if (ImgExtention == ".png" || ImgExtention == ".PNG" || ImgExtention == ".gif" || ImgExtention == ".GIF" || ImgExtention == ".jpg" || ImgExtention == ".JPG" || ImgExtention == ".jpeg" || ImgExtention == ".JPEG")
            {
                if (ImgSize / 1024 > 400)
                {
                    Class1.AlertShow("图片大小不能超过400kb！", "shedit.aspx?id=" + NoIntVal + "");
                    return;
                }
            }
            else
            {
                Class1.AlertShow("图片格式不正确，只支持.gif/.jpg/.jpeg/.png格式类型的图片！", "shedit.aspx?no=" + NoIntVal + "");
                return;
            }
            #endregion

            FileUpload1.SaveAs(Server.MapPath("../../0upimg/ntu1/" + NoIntVal + ".png"));
        }


        try
        {
            Logic.ExecuteNonQuery("update shangjia set sname='" + nr1 + "',zynr='" + nr2 + "' where no=" + NoIntVal);
        }
        catch
        {
            Class1.AlertShow("信息传输有误！", "xxedit.aspx?id=" + NoIntVal + "");
            return;
        }
        Class1.AlertShow("修改成功！", "xxlist.aspx?id=" + NoIntVal + "");
    }
    public bool checkDataSetNull(DataSet ds)
    {
        bool rtnval = false;
        if (ds != null)
        {
            if (ds.Tables.Count > 0)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    rtnval = true;
                }
            }
        }
        return rtnval;
    }
}
