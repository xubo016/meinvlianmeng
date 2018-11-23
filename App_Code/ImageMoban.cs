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
using System.Drawing;
/// <summary>
///UpLoadImage 的摘要说明
/// </summary>
public class ImageMoban
{
    public ImageMoban() { }
    /// <summary> 
    /// asp.net上传图片并生成缩略图
    /// 
    /// </summary> 
    /// 
    /// <param name="upImage">HtmlInputFile控件</param> 
    /// 
    /// <param name="sSavePath">保存的路径,些为相对服务器路径的下的文件夹</param> 
    /// 
    /// <param name="sThumbExtension">缩略图的thumb</param> 
    /// 
    /// <param name="intThumbWidth">生成缩略图的宽度</param> 
    /// 
    /// <param name="intThumbHeight">生成缩略图的高度</param> 
    /// 
    /// <param name="ddax">压缩图片的宽度</param> 
    /// 
    /// <returns>缩略图名称</returns> 
    public static string UpLoadImg(FileUpload upImage, string BieName, string sSavePath, string sThumbExtension, int intThumbWidth, int intThumbHeight, int ddax)
    {
        string sThumbFile = "";
        string sFilename = "";

        if (upImage.PostedFile != null)
        {
            HttpPostedFile myFile = upImage.PostedFile;
            int nFileLen = myFile.ContentLength;
            if (nFileLen == 0)
                return "没有选择上传图片";

            //获取upImage选择文件的扩展名 
            string extendName = System.IO.Path.GetExtension(myFile.FileName).ToLower();
            //判断是否为图片格式 
            if (extendName != ".jpg" && extendName != ".jpge" && extendName != ".gif" && extendName != ".bmp" && extendName != ".png")
                return "图片格式不正确";


            byte[] myData = new Byte[nFileLen];
            myFile.InputStream.Read(myData, 0, nFileLen);

            //sFilename = System.IO.Path.GetFileName(myFile.FileName);
            int file_append = 0;
            //检查当前文件夹下是否有同名图片,有则在文件名+1 
            while (System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName)))
            {
                file_append++;
                BieName = System.IO.Path.GetFileNameWithoutExtension(myFile.FileName)
                    + file_append.ToString() + extendName;
            }
            System.IO.FileStream newFile
                = new System.IO.FileStream(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName),
                System.IO.FileMode.Create, System.IO.FileAccess.Write);
            newFile.Write(myData, 0, myData.Length);
            newFile.Close();
            if (extendName != ".gif" && extendName != ".GIF")
            {
                String twoname = "btw" + BieName;
                System.Drawing.Image pic = System.Drawing.Image.FromFile(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName));
                int rtnwa = pic.Width;//长度像素值
                pic.Dispose();
                if (rtnwa > ddax)
                {
                    ystp(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName), System.Web.HttpContext.Current.Server.MapPath(sSavePath + twoname), ddax);

                    #region 删除原始图片

                    if (System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName)))
                    {
                        System.IO.File.Delete(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName));
                    }

                    #endregion

                    #region 给文件改名

                    if (System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath(sSavePath + twoname)))
                    {
                        System.IO.File.Move(System.Web.HttpContext.Current.Server.MapPath(sSavePath + twoname), System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName));
                    }

                    #endregion
                }
            }
            //以上为上传原图 

            try
            {
                //原图加载 
                using (System.Drawing.Image sourceImage = System.Drawing.Image.FromFile(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName)))
                {
                    //原图宽度和高度 
                    int width = sourceImage.Width;
                    int height = sourceImage.Height;
                    int smallWidth;
                    int smallHeight;

                    //获取第一张绘制图的大小,(比较 原图的宽/缩略图的宽  和 原图的高/缩略图的高) 
                    if (((decimal)width) / height <= ((decimal)intThumbWidth) / intThumbHeight)
                    {
                        smallWidth = intThumbWidth;
                        smallHeight = intThumbWidth * height / width;
                    }
                    else
                    {
                        smallWidth = intThumbHeight * width / height;
                        smallHeight = intThumbHeight;
                    }

                    //判断缩略图在当前文件夹下是否同名称文件存在 
                    file_append = 0;
                    sThumbFile = sThumbExtension +"-"+ BieName;

                    //while (System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath(sSavePath + sThumbFile)))
                    //{
                    //    file_append++;
                    //    sThumbFile = sThumbExtension + "-" + BieName +
                    //        file_append.ToString();
                    //}
                    //缩略图保存的绝对路径 
                    string smallImagePath = System.Web.HttpContext.Current.Server.MapPath(sSavePath) + sThumbFile;

                    //新建一个图板,以最小等比例压缩大小绘制原图 
                    using (System.Drawing.Image bitmap = new System.Drawing.Bitmap(smallWidth, smallHeight))
                    {
                        //绘制中间图 
                        using (System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bitmap))
                        {
                            //高清,平滑 
                            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;
                            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                            g.Clear(System.Drawing.Color.Black);
                            g.DrawImage(
                            sourceImage,
                            new System.Drawing.Rectangle(0, 0, smallWidth, smallHeight),
                            new System.Drawing.Rectangle(0, 0, width, height),
                            System.Drawing.GraphicsUnit.Pixel
                            );
                        }
                        //新建一个图板,以缩略图大小绘制中间图 
                        using (System.Drawing.Image bitmap1 = new System.Drawing.Bitmap(intThumbWidth, intThumbHeight))
                        {
                            //绘制缩略图 
                            using (System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bitmap1))
                            {
                                //高清,平滑 
                                g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;
                                g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                                g.Clear(System.Drawing.Color.Black);
                                int lwidth = (smallWidth - intThumbWidth) / 2;
                                int bheight = (smallHeight - intThumbHeight) / 2;
                                g.DrawImage(bitmap, new Rectangle(0, 0, intThumbWidth, intThumbHeight), lwidth, bheight, intThumbWidth, intThumbHeight, GraphicsUnit.Pixel);
                                g.Dispose();
                                bitmap1.Save(smallImagePath, System.Drawing.Imaging.ImageFormat.Jpeg);
                            }
                        }
                    }
                }
            }
            catch
            {
                //出错则删除 
                System.IO.File.Delete(System.Web.HttpContext.Current.Server.MapPath(sSavePath + BieName));
                return "图片格式不正确";
            }
            //返回缩略图名称 
            return sThumbFile;
        }
        return "没有选择图片";
    }
    public static void ystp(string filePath, string filePath_ystp, int width)
    {
        System.Drawing.Image originalImage = System.Drawing.Image.FromFile(filePath);
        int ow = originalImage.Width;
        int oh = originalImage.Height;
        int towidth = width;
        int toheight = 500;
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
}
