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
using System.Text.RegularExpressions;
using System.Net;
using System.IO;

/// <summary>
///sharewsj 的摘要说明:判断物理图片路径，判断网络图片，将网络图片下载到服务器并删除多余图片，将临时图片固定文件夹
/// </summary>
public class sharewsj
{
    public sharewsj()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}
    
    /// <summary>
    /// 将内容里的网络图片转换成本地图片
    /// </summary>
    /// <param name="str">内容</param>
    /// <param name="lslj">路径</param>
    /// <param name="Imgmc">临时文件夹</param>
    /// <returns></returns>
    public static string delImgs(string str, string lslj, string Imgmc)
    {
        string treat = "";
        string lswjj = "";
        treat = str;
        lswjj = GetImgs(str, Imgmc);
        string wangimg = "";
        wangimg = GetwlImg(str);
        if (wangimg != "")
        {
            string[] aew = wangimg.Split('|');
            for (int r = 0; r < aew.Length - 1; r++)
            {
                string timme = DateTime.Now.ToString("yyyyMMddHHmmss_ffff") + r.ToString() + ".jpg";
                string yaw = aew[r].ToString();
                if (yaw.Length > 1)
                {
                    if (lswjj != "")
                    {
                        if (!Directory.Exists(lslj + lswjj))
                        {
                            Directory.CreateDirectory(lslj + lswjj);
                            Logic.ExecuteNonQuery("insert into bbsimg(imgname)values('" + lswjj + "')");  
                        }
                        DownPic(yaw, lslj + lswjj + timme);
                        treat = treat.ToString().Replace(yaw, "/0upimg/linshi/" + lswjj + timme);
                    }
                    else
                    {
                        if (!Directory.Exists(lslj + Imgmc))
                        {
                            Directory.CreateDirectory(lslj + Imgmc);
                            Logic.ExecuteNonQuery("insert into bbsimg(imgname)values('" + Imgmc + "')");  
                        }
                        DownPic(yaw, lslj + Imgmc + "/" + timme);
                        treat = treat.ToString().Replace(yaw, "/0upimg/linshi/" + Imgmc + "/" + timme);
                    }
                }
            }
        }
        return treat;
    }

    /// <summary>
    /// 添加信息将图片信息转移到固定文件夹
    /// </summary>
    /// <param name="str"></param>
    /// <param name="resd"></param>
    /// <param name="lswj"></param>
    /// <param name="path2"></param>
    public static void delImg(string str, string resd, string lswj, string path2)
    {
        #region 删除多余图片
        string img = "";
        string path1 = lswj + resd;
        if (Directory.Exists(path1))
        {
            img = qctp(str);
            DirectoryInfo TheFolder = new DirectoryInfo(path1);
            foreach (FileInfo NextFile in TheFolder.GetFiles())
            {
                string imgname = NextFile.Name;

                string[] arr = img.Split('|');

                int yy = 0;

                for (int r = 0; r < arr.Length; r++)
                {
                    if (arr[r] == imgname)
                    {
                        yy = 1;
                        break;
                    }
                }

                if (yy == 0)
                {
                    string imgvalpa = path1 + imgname;

                    if (File.Exists(imgvalpa))
                    {
                        File.Delete(imgvalpa);
                    }
                }
            }

            CopyDir(path1, path2);
            if (Directory.Exists(path1))
            {
                Directory.Delete(path1, true);
            }
            try
            {
               Logic.ExecuteNonQuery("delete from bbsimg where imgname='" + resd.ToString().Replace("/", "").Replace(" ", "") + "'");
            }
            catch { }
        }
        #endregion
    }

    /// <summary>
    /// 修改信息删除多余的图片
    /// </summary>
    /// <param name="str">新内容</param>
    /// <param name="resd">临时文件夹名称</param>
    /// <param name="str1">原内容</param>
    public static void delImg(string str, string resd, string str1, string lswj, string path2)
    {
        #region 删除多余图片
        string img = "", imgy = "";
        string path1 = lswj + resd;
        img = qctp(str);
        imgy = qctp(str1);

        #region 降临时文件夹图片转移 并删除临时文件夹 与临时数据库表的临时数据

        if (Directory.Exists(path1))
        {
            DirectoryInfo TheFolder = new DirectoryInfo(path1);
            foreach (FileInfo NextFile in TheFolder.GetFiles())
            {
                string imgname = NextFile.Name;

                string[] arr = img.Split('|');

                int yy = 0;

                for (int r = 0; r < arr.Length; r++)
                {
                    if (arr[r] == imgname)
                    {
                        yy = 1;
                        break;
                    }
                }
                if (yy == 0)
                {
                    if (File.Exists(path1 + imgname))
                    {
                        File.Delete(path1 + imgname);
                    }
                }
            }
            CopyDir(path1, path2);
            if (Directory.Exists(path1))
            {
                Directory.Delete(path1, true);
            }
            try
            {
               Logic.ExecuteNonQuery("delete from bbsimg where imgname='" + resd.ToString().Replace("/", "").Replace(" ", "") + "'");
            }
            catch { }
        }

        #endregion

        #region 判断老内容是否有有图片，与新内容进行核对

        if (imgy != "")
        {
            string[] awe = imgy.Split('|');
            string[] ame = img.Split('|');
            for (int j = 0; j < awe.Length - 1; j++)
            {
                int sc = 0;
                for (int u = 0; u < ame.Length - 1; u++)
                {
                    if (awe[j] == ame[u])
                    {
                        sc = 1;
                        break;
                    }
                }
                if (sc == 0)
                {
                    if (File.Exists(path2 + awe[j].ToString()))
                    {
                        File.Delete(path2 + awe[j].ToString());
                    }
                }
            }
        }

        #endregion

        #endregion
    }

    /// <summary>
    /// 取出临时文件夹名称
    /// </summary>
    /// <param name="str"></param>
    /// <param name="Imgmc"></param>
    /// <returns></returns>
    public static string GetImgs(string str, string Imgmc)
    {
        string resd = "";
        string resd1 = "";
        for (int i = 0; i < GetHtmlImageUrlList(str).Length; i++)
        {
            resd1 = GetHtmlImageUrlList(str)[i];
            string[] sarray = resd1.Split('/');
            resd1 = sarray[sarray.Length - 2] + "/";
            if (resd1.Length >= 19)
            {
                if (resd1.ToString().Substring(0, 17) == Imgmc.ToString().Substring(0, 17))
                {
                    resd = resd1;
                    break;
                }
            }
        }
        return resd;
    }

    /// <summary>
    /// 取出全是本地图片的文件夹
    /// </summary>
    /// <param name="str"></param>
    /// <returns></returns>
    public static string GetImg(string str)
    {
        string resd = "";
        for (int i = 0; i < GetHtmlImageUrlList(str).Length; i++)
        {
            resd += GetHtmlImageUrlList(str)[0];
            string[] sarray = resd.Split('/');
            resd = sarray[sarray.Length - 2] + "/";
            break;
        }
        return resd;
    }

    /// <summary>
    /// 获取网络图片路径
    /// </summary>
    /// <param name="str">内容</param>
    /// <returns></returns>
    public static string GetwlImg(string str)
    {
        string wangimg = "";
        for (int i = 0; i < GetHtmlImageUrlList(str).Length; i++)
        {
            string resd1 = GetHtmlImageUrlList(str)[i];
            string[] sarray = resd1.Split('/');
            string resd2 = sarray[0];
            if (resd2.Length >= 4)
            {
                if (resd2.ToString().Substring(0, 4) == "http")
                {
                    wangimg += GetHtmlImageUrlList(str)[i] + "|";
                }
            }
        }
        return wangimg;
    }

    /// <summary>
    /// 取出所有的图片
    /// </summary>
    /// <param name="str">内容</param>
    /// <returns></returns>
    public static string qctp(string str)
    {
        string img = "";
        for (int i = 0; i < GetHtmlImageUrlList(str).Length; i++)
        {
            string woyeb = GetHtmlImageUrlList(str)[i];
            string[] sarrayv = woyeb.Split('/');
            img += sarrayv[sarrayv.Length - 1] + "|";
        }
        return img;
    }

    /// <summary>
    /// 取得HTML中所有图片的 URL。
    /// </summary>
    /// <param name="sHtmlText">HTML代码</param>
    /// <returns>图片的URL列表</returns>
    /// 
    public static string[] GetHtmlImageUrlList(string sHtmlText)
    {
        // 定义正则表达式用来匹配 img 标签
        Regex regImg = new Regex(@"<img\b[^<>]*?\bsrc[\s\t\r\n]*=[\s\t\r\n]*[""']?[\s\t\r\n]*(?<imgUrl>[^\s\t\r\n""'<>]*)[^<>]*?/?[\s\t\r\n]*>", RegexOptions.IgnoreCase);
        // 搜索匹配的字符串
        MatchCollection matches = regImg.Matches(sHtmlText);
        int i = 0;
        string[] sUrlList = new string[matches.Count];
        // 取得匹配项列表
        foreach (Match match in matches)
            sUrlList[i++] = match.Groups["imgUrl"].Value;
        return sUrlList;
    }

    public static bool bitimg(string sHtmlText)
    {
        bool sssccss = false;
        // 定义正则表达式用来匹配 img 标签
        Regex regImg = new Regex(@"<img\b[^<>]*?\bsrc[\s\t\r\n]*=[\s\t\r\n]*[""']?[\s\t\r\n]*(?<imgUrl>[^\s\t\r\n""'<>]*)[^<>]*?/?[\s\t\r\n]*>", RegexOptions.IgnoreCase);
        // 搜索匹配的字符串
        MatchCollection matches = regImg.Matches(sHtmlText);
        int i = 0;
        string[] sUrlList = new string[matches.Count];
        // 取得匹配项列表
        foreach (Match match in matches)
        {
            sssccss = true;
            //break;
        }
        return sssccss;
    }

    /// <summary>
    /// 指定文件夹下面的所有内容copy到目标文件夹下面
    /// </summary>
    /// <param name="srcPath">原始路径</param>
    /// <param name="aimPath">目标文件夹</param>
    public static void CopyDir(string srcPath, string aimPath)
    {
        try
        {
            // 检查目标目录是否以目录分割字符结束如果不是则添加之
            if (aimPath[aimPath.Length - 1] != System.IO.Path.DirectorySeparatorChar)
                aimPath += System.IO.Path.DirectorySeparatorChar;
            // 判断目标目录是否存在如果不存在则新建之
            if (!System.IO.Directory.Exists(aimPath))
                System.IO.Directory.CreateDirectory(aimPath);
            // 得到源目录的文件列表，该里面是包含文件以及目录路径的一个数组
            //如果你指向copy目标文件下面的文件而不包含目录请使用下面的方法
            //string[] fileList = Directory.GetFiles(srcPath);
            string[] fileList = System.IO.Directory.GetFileSystemEntries(srcPath);
            //遍历所有的文件和目录
            foreach (string file in fileList)
            {
                //先当作目录处理如果存在这个目录就递归Copy该目录下面的文件

                if (System.IO.Directory.Exists(file))
                    CopyDir(file, aimPath + System.IO.Path.GetFileName(file));
                //否则直接Copy文件
                else
                    System.IO.File.Copy(file, aimPath + System.IO.Path.GetFileName(file), true);
            }
        }
        catch (Exception ee)
        {
            throw new Exception(ee.ToString());
        }
    }

    /// <summary>
    /// 将网络图片转移到固定文件夹内
    /// </summary>
    /// <param name="PicSourceUrl">网络图片路径</param>
    /// <param name="filePath">图片储存路径</param>
    /// <returns></returns>
    public static bool DownPic(string PicSourceUrl, string filePath)
    {
        try
        {
            WebRequest request = WebRequest.Create(PicSourceUrl);

            WebResponse response = request.GetResponse();

            Stream reader = response.GetResponseStream();

            FileStream writer = new FileStream(filePath, FileMode.OpenOrCreate, FileAccess.Write);

            try
            {
                byte[] buff = new byte[512];

                int c = 0; //实际读取的字节数

                while ((c = reader.Read(buff, 0, buff.Length)) > 0)
                {
                    writer.Write(buff, 0, c);
                }

                writer.Close();
                writer.Dispose();

                reader.Close();

                reader.Dispose();

                response.Close();
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                if (writer != null)
                {
                    writer.Close();
                    writer.Dispose();
                }
                if (reader != null)
                {
                    reader.Close();
                    reader.Dispose();
                }
                if (response != null)
                {
                    response.Close();
                }
            }
        }
        catch { return false; }
        return true;
    }
}
