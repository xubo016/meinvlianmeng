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
using System.IO;

/// <summary>
///mobanzhuanhuan 的摘要说明
/// </summary>
public class FileDel
{
    public FileDel() { }
    public static void Del(string dir)
    {
        if (Directory.Exists(dir)) //如果存在这个文件夹删除之
        {
            foreach (string d in Directory.GetFileSystemEntries(dir))
            {
                if (File.Exists(d))
                    File.Delete(d); //直接删除其中的文件
                else
                    Del(d); //递归删除子文件夹
            }
            Directory.Delete(dir); //删除已空文件夹
        }
    }
}
