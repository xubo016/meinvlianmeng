<%@ webhandler Language="C#" class="Upload" %>

/**
 * KindEditor ASP.NET
 *
 * 本ASP.NET程序是演示程序，建议不要直接在实际项目中使用。
 * 如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。
 *
 */

using System;
using System.Collections;
using System.Web;
using System.IO;
using System.Globalization;
using LitJson;
using System.Drawing;
using System.Drawing.Imaging;

public class Upload : IHttpHandler
{
	private HttpContext context;
   
	public void ProcessRequest(HttpContext context)
	{
        context.Response.ContentType = "text/plain";
        
        if (context.Request.QueryString["imgpathval"] != null)
        {
            string username = MyFunction.Filter(HttpUtility.UrlDecode(context.Request.QueryString["imgpathval"].ToString().Trim()));
        }
   
		String aspxUrl = context.Request.Path.Substring(0, context.Request.Path.LastIndexOf("/") + 1);		

		//文件保存目录路径
        String savePath = "../../0upimg/linshi/";

		//文件保存目录URL
        String saveUrl = aspxUrl + "../../0upimg/linshi/";

		//定义允许上传的文件扩展名
		Hashtable extTable = new Hashtable();
		extTable.Add("image", "gif,jpg,jpeg,png,bmp");
		extTable.Add("flash", "swf,flv");
		extTable.Add("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
		extTable.Add("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");

		//最大文件大小        
		int maxSize = 1000000;
           
		this.context = context;
        
		HttpPostedFile imgFile = context.Request.Files["imgFile"];
        
		if (imgFile == null)
		{
			showError("请选择文件。");
		}

		String dirPath = context.Server.MapPath(savePath);
        
		if (!Directory.Exists(dirPath))
		{
            Directory.CreateDirectory(dirPath);
		}

		String dirName = context.Request.QueryString["dir"];
        
		if (String.IsNullOrEmpty(dirName)) 
        {
			dirName = "image";
		}
        
		if (!extTable.ContainsKey(dirName)) 
        {
			showError("目录名不正确。");
		}

		String fileName = imgFile.FileName;             
		String fileExt = Path.GetExtension(fileName).ToLower();
        string ImgExtention = Path.GetExtension(fileName);
        if (ImgExtention == ".gif" || ImgExtention == ".GIF")
        {
            if (imgFile.InputStream.Length > 3000000)
            {
                showError("上传文件大小超过限制。");
            }
        }
        string valone = "";
        string valone11 = "";
        
        if (imgFile.InputStream == null)
        {
            showError("上传文件大小超过限制。");            
        }

        if (imgFile.InputStream.Length > 10000000)
        {
            showError("上传文件大小超过限制。");
        }

        if (imgFile.InputStream.Length > maxSize)
        {
            valone11 = "1";
        }
        
		if (String.IsNullOrEmpty(fileExt) || Array.IndexOf(((String)extTable[dirName]).Split(','), fileExt.Substring(1).ToLower()) == -1)
		{
			showError("上传文件扩展名是不允许的扩展名。\n只允许" + ((String)extTable[dirName]) + "格式。");
		}

		//创建文件夹

		if (!Directory.Exists(dirPath)) 
        {
			Directory.CreateDirectory(dirPath);
		}
        
        String ymd = "";

        #region 创建图片文件夹名称

        HttpCookie cookied = HttpContext.Current.Request.Cookies["imgpathval"];
        
        string zzyxxxxxx;    

        if (context.Request["yyy"] != null)
        {
            zzyxxxxxx = context.Request["yyy"].ToString();
        }
        else
        {
            if (context.Request["hfbody"] != null)
            {
                zzyxxxxxx = context.Request["hfbody"].ToString();
            }
            else
            {
                zzyxxxxxx = "";
            }
        }        
        
        if (cookied == null)
        {
            if (zzyxxxxxx.Length > 0)
            {
                string imgname = zzyxxxxxx;       
                         
                HttpCookie CookieE = new HttpCookie("imgpathval");                               
                CookieE.Value = imgname;                             
                HttpContext.Current.Response.Cookies.Add(CookieE);                            
                Logic.ExecuteNonQuery("insert into bbsimg(imgname)values('" + imgname + "')");                              
                ymd = imgname;
            }
        }
        else
        {
            if (zzyxxxxxx == cookied.Value)
            {
                ymd = cookied.Value;
            }
            else
            {
                HttpCookie CookieE = new HttpCookie("imgpathval");                
                CookieE.Value = zzyxxxxxx;                
                HttpContext.Current.Response.Cookies.Add(CookieE);                
                Logic.ExecuteNonQuery("insert into bbsimg(imgname)values('" + zzyxxxxxx + "')");                
                ymd = zzyxxxxxx;
            }
        }   
                     
        #endregion        
        
		dirPath += ymd + "/";
        
		saveUrl += ymd + "/";   
                     
		if (!Directory.Exists(dirPath)) 
        {
			Directory.CreateDirectory(dirPath);
		}         
         
		String newFileName = DateTime.Now.ToString("yyyyMMddHHmmss_ffff") + fileExt;    
          
		String filePath = dirPath + newFileName;
        
        imgFile.SaveAs(filePath);
        if (ImgExtention == ".gif" || ImgExtention == ".GIF")
        {
            if (imgFile.InputStream.Length > 3000000)
            {
                showError("上传文件大小超过限制。");
            }
        }
        else
        {
            String twoname = "two" + DateTime.Now.ToString("yyyyMMddHHmmss_ffff") + fileExt;

            System.Drawing.Image pic = System.Drawing.Image.FromFile(dirPath + newFileName);

            int rtnval = pic.Width;//长度像素值       

            pic.Dispose();

            if (rtnval > 950)
            {
                ystp(dirPath + newFileName, dirPath + twoname, 950);
                File.Delete(filePath);
                newFileName = twoname;
            }
            else if (valone11 == "1")
            {
                ystp11(filePath, dirPath + twoname);
                File.Delete(filePath);
                newFileName = twoname;
            }

            //加图片水印 
            filePath = dirPath + newFileName;

            System.Drawing.Image image = System.Drawing.Image.FromFile(filePath);

            System.Drawing.Image copyImage = System.Drawing.Image.FromFile(context.Server.MapPath("~/0upimg/tuohaimg/suiyin.png"));

            Graphics g = Graphics.FromImage(image);

            g.DrawImage(copyImage, new Rectangle((image.Width - copyImage.Width) / 20, (image.Height - copyImage.Height - 6) / 1,

            copyImage.Width, copyImage.Height), 0, 0, copyImage.Width, copyImage.Height, GraphicsUnit.Pixel);

            g.Dispose();

            //保存加水印过后的图片,删除原始图片 

            string newPath = dirPath + "_new" + newFileName;
            image.Save(newPath);
            image.Dispose();
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            if (File.Exists(newPath))
            {
                File.Move(newPath, filePath);
            }
        }              
		String fileUrl = saveUrl + newFileName;        
		Hashtable hash = new Hashtable();        
		hash["error"] = 0;        
		hash["url"] = fileUrl;        
		context.Response.AddHeader("Content-Type", "text/html;charset=UTF-8");        
		context.Response.Write(JsonMapper.ToJson(hash));        
		context.Response.End();
	}

	private void showError(string message)
	{
		Hashtable hash = new Hashtable();
        
		hash["error"] = 1;
        
		hash["message"] = message;
        
		context.Response.AddHeader("Content-Type", "text/html;charset=UTF-8");
        
		context.Response.Write(JsonMapper.ToJson(hash));
        
		context.Response.End();
	}

	public bool IsReusable
	{
		get
		{
			return true;
		}
	}

    #region 压缩图片
    
    public void ystp11(string filePath, string filePath_ystp)
    {
        //Bitmap  
        Bitmap bmp = null;
        //ImageCoderInfo   
        ImageCodecInfo ici = null;
        //Encoder  
        Encoder ecd = null;
        //EncoderParameter  
        EncoderParameter ept = null;
        //EncoderParameters  
        EncoderParameters eptS = null;
        try
        {
            bmp = new Bitmap(filePath);
            ici = this.getImageCoderInfo("image/jpeg");
            ecd = Encoder.Quality;
            eptS = new EncoderParameters(1);
            ept = new EncoderParameter(ecd, 10L);
            eptS.Param[0] = ept;
            bmp.Save(filePath_ystp, ici, eptS);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        finally
        {
            bmp.Dispose();
            ept.Dispose();
            eptS.Dispose();
        }
    }
    /// <summary>  
    /// 获取图片编码类型信息  
    /// </summary>  
    /// <param name="coderType">编码类型</param>  
    /// <returns>ImageCodecInfo</returns>  
    private ImageCodecInfo getImageCoderInfo(string coderType)
    {
        ImageCodecInfo[] iciS = ImageCodecInfo.GetImageEncoders();
        
        ImageCodecInfo retIci = null;
        
        foreach (ImageCodecInfo ici in iciS)
        {
            if (ici.MimeType.Equals(coderType))
                retIci = ici;
        }
        
        return retIci;
    }
    
    
    ///// <summary>  
    ///// 压缩图片  
    ///// </summary>  
    ///// <param name="filePath">要压缩的图片的路径</param>  
    ///// <param name="filePath_ystp">压缩后的图片的路径</param>  
    /// <summary>
    /// 生成缩略图
    /// </summary>
    /// <param name="filePath">原图片路径</param>
    /// <param name="filePath_ystp">缩略图路径</param>
    /// <param name="width">宽度</param>
    /// <param name="height">高度</param>
    public void ystp(string filePath, string filePath_ystp, int width)
    {
        System.Drawing.Image originalImage = System.Drawing.Image.FromFile(filePath);
        int ow = originalImage.Width;
        int oh = originalImage.Height;
        int towidth = width;
        int toheight = 800;
        int x = 0;
        int y = 0;
        toheight = originalImage.Height * width / originalImage.Width;
        //新建一个bmp图片
        System.Drawing.Image bitmap = new System.Drawing.Bitmap(towidth, toheight);
        //新建一个画板
        System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bitmap);
        //设置高质量插值法
        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;

        //设置高质量,低速度呈现平滑程度
        g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

        //清空画布并以透明背景色填充
        g.Clear(System.Drawing.Color.Transparent);

        //在指定位置并且按指定大小绘制原图片的指定部分
        g.DrawImage(originalImage, new System.Drawing.Rectangle(0, 0, towidth, toheight),
            new System.Drawing.Rectangle(x, y, ow, oh),
            System.Drawing.GraphicsUnit.Pixel);

        try
        {
            //以jpg格式保存缩略图
            bitmap.Save(filePath_ystp, System.Drawing.Imaging.ImageFormat.Jpeg);
        }
        catch (System.Exception e)
        {
            throw e;
        }
        finally
        {
            originalImage.Dispose();
            bitmap.Dispose();
            g.Dispose();
        }
    }

    #endregion 压缩图片  

}
