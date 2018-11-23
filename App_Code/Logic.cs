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
using ZBT.DateBase;
using System.Data.SqlClient;
using System.Collections;
/// <summary>
///Logict 的摘要说明
/// </summary>
public class Logic
{
    public Logic() { }     
     
    public static int ExecuteNonQuery(string Sql)
    {
        return SqlHelper.ExecuteNonQuery(weeb.con5, CommandType.Text, Sql);
    }

    public static SqlDataReader ExecuteReader(string Sql)
    {
        return SqlHelper.ExecuteReader(weeb.con5, CommandType.Text, Sql);
    }

    public static DataSet ExecuteDataSet(string Sql)
    {
        return SqlHelper.ExecuteDataset(weeb.con5, CommandType.Text, Sql);
    }   

    public static object ExecuteScalar(string Sql)
    {
        return SqlHelper.ExecuteScalar(weeb.con5, CommandType.Text, Sql);
    }
}
