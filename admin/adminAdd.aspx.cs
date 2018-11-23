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


public partial class Manage_adminAdd : System.Web.UI.Page
{
    //public string userName, userPassword, userRealname, userPhone;
    protected void Page_Load(object sender, EventArgs e)
    {
        //try
        //{
        //    userName = (string)Request.Params["userName"];
        //    userPassword = (string)Request.Params["userPassword"];
        //    userRealname = (string)Request.Params["userRealname"];
        //    userPhone = (string)Request.Params["userPhone"];
        //}
        //catch { };
        //if (userName != "" && userPassword != "" && userRealname != "" && userPhone != "")
        //{
        //bool ssccss = false;
        //try
        //{
        //    string wws = "insert into admin(name,password,realname,tel) values('" + userName + "','" + userPassword + "','" + userRealname + "','" + userPhone + "')";
        //    Logic.ExecuteNonQuery(wws);
        //    ssccss = true;
        //}
        //catch { }
        //    string str;
        //    if (ssccss)
        //    {
        //        str = "添加成功";
        //    }
        //    else
        //    {
        //        str = "添加失败";
        //    }
        //}

    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        string nr1 = MyFunction.Filter(username.Text).Trim().Replace(" ", "");
        string nr2 = MyFunction.Filter(userpassword.Text).Trim().Replace(" ", "");
        string nr3 = MyFunction.Filter(userrealname.Text).Trim().Replace(" ", "");
        string nr4 = MyFunction.Filter(userphone.Text).Trim().Replace(" ", "");
        if(nr1 == ""){
            Class1.AlertShow("用户名不能为空");
        }
        else if (nr2 == "")
        {
            Class1.AlertShow("密码不能为空");
        }
        else if (nr3 == "") {
            Class1.AlertShow("真实姓名不能为空");
        }
        else if (nr4 == "")
        {
            Class1.AlertShow("电话不能为空");
        }
        if (nr1 != "" && nr2 != "" && nr3 != "" && nr4 != "") { 
            bool ssccss = false;
            try
            {
                string wws = "insert into admin(name,password,realname,tel) values('" + nr1 + "','" + nr2 + "','" + nr3 + "','" + nr4 + "')";
                Logic.ExecuteNonQuery(wws);
                ssccss = true;
                Class1.AlertShow("添加成功");
                username.Text = "";
                userrealname.Text = "";
                userphone.Text = "";
            }
            catch {
                Class1.AlertShow("添加失败");
            }
        }

    }
}