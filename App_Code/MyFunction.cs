using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

/// <summary>
///MyFunction 的摘要说明
/// </summary>
public class MyFunction
{
	public MyFunction()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}

    /// <summary>
    /// 判断是否是数字，不包含零
    /// </summary> 
    /// <param name="Str">需要判断的字符串</param>
    /// <returns>返回bool值，是为真，否为false</returns>
    public static bool IsInt(string Str)
    {
        Regex regex = new Regex("^[0-9]*[0-9][0-9]*$");//^[0-9]*[1-9]
        return regex.IsMatch(Str.Trim());
    }

    /// <summary>
    /// 判断是否是数字,包含零
    /// </summary> 
    /// <param name="Str">需要判断的字符串</param>
    /// <returns>返回bool值，是为真，否为false</returns>
    public static bool Isshuzi(string Str)
    {
        Regex regex = new Regex("^[0-9]*[0-9]*$");//^[0-9]*[1-9]
        return regex.IsMatch(Str.Trim());
    }

    /// <summary>
    /// 去掉字符串中所有的单引号
    /// </summary> 
    /// <param name="Str">需要处理的字符串</param>
    /// <returns>返回处理后的字符串</returns>
    public static string delSingle(string Str)
    {        
        return Str.Replace("'","");
    }

    /**/
    /// <summary> 
    /// 过滤sql中非法字符 
    /// </summary> 
    /// <param name="value">要过滤的字符串 </param> 
    /// <returns>过滤后的string </returns> 
    public static string Filter(string value)
    {
        if (string.IsNullOrEmpty(value)) return string.Empty;
        //value = Regex.Replace(value, @";", string.Empty);
        value = Regex.Replace(value, @"'", string.Empty);
        //value = Regex.Replace(value, @"&", string.Empty);
        //value = Regex.Replace(value, @"%20", string.Empty);
        //value = Regex.Replace(value, @"--", string.Empty);
        //value = Regex.Replace(value, @"==", string.Empty);
        //value = Regex.Replace(value, @" <", string.Empty);
        //value = Regex.Replace(value, @">", string.Empty);
        //value = Regex.Replace(value, @"%", string.Empty);      

        return value; 
    }


    /// <summary> 
    /// 深度去除非法字符，
    /// </summary> 
    /// <param name="text">要过滤的字符串 </param> 
    /// <param name="maxLength">限定的最大长度 </param> 
    /// <returns>过滤后的string </returns> 
    public static string InputText(string text, int maxLength)
    {
        #region
        text = text.Trim();
        if (string.IsNullOrEmpty(text))
            return string.Empty;
        if (text.Length > maxLength)
             text = text.Substring(0, maxLength);        
        text = Regex.Replace(text, "[\\s]{2,}", " "); //two or more spaces
        text = Regex.Replace(text, "(<[b|B][r|R]/*>)+|(<[p|P](.|\\n)*?>)", "\n"); //<br>
        text = Regex.Replace(text, "(\\s*&[n|N][b|B][s|S][p|P];\\s*)+", " "); // 
        text = Regex.Replace(text, "<(.|\\n)*?>", string.Empty); //any other tags
        text = text.Replace("'", "''");
        return text;
        #endregion
    }

    /// <summary> 
    /// 是否全是符号组成的字符串
    /// </summary> 
    /// <param name="Str">要过滤的字符串 </param>   
    /// <returns>返回是否匹配</returns> 
    public static bool IsFeiFaZiFuChuan(string Str)
    {
        bool returnval = true;
        int TrueCount = 0;
        for (int i = 0; i < Str.Length; i++ )
        {
            if (Isshuzi(Str.Substring(i, 1)) || IsCapElish(Str.Substring(i, 1)) || IsLowerCase(Str.Substring(i, 1)) || IsChinese(Str.Substring(i, 1)))
            { 
                TrueCount++;
            }
            if (TrueCount != 0 && TrueCount == Str.Length)
            {
                returnval = false;
            }
        }
        return returnval;   

    }

    /// <summary> 
    /// 是否是大写字符
    /// </summary>  
    /// <param name="Str">待测字符串</param> 
    /// <returns>返回匹配结果 </returns> 
    public static bool IsCapElish(string Str)
    {
        Regex regex = new Regex("^[A-Z]+$");
        return regex.IsMatch(Str.Trim());

    }

    /// <summary> 
    /// 小写字母匹配
    /// </summary> 
    /// <param name="Str">待测字符串 </param> 
    /// <returns>返回是否匹配 </returns> 
    public static bool IsLowerCase(string Str)
    {
        Regex regex = new Regex("^[a-z]+$");
        return regex.IsMatch(Str.Trim());

    }

    /// <summary> 
    /// 是否是汉字
    /// </summary>  
    /// <param name="Str">待测字符 </param> 
    /// <returns>返回是否匹配 </returns> 
    public static bool IsChinese(string Str)
    {
        Regex regex = new Regex("^[\u4e00-\u9fa5]+$");
        return regex.IsMatch(Str.Trim());

    }

    // <summary>
    /// 去掉字符串中的所有空格
    /// </summary>
    /// <param name="_str"></param>
    /// <returns></returns>
    public static string ReMoveBlank(string _str)
    {
        string strTemp = "";
        CharEnumerator CEnumerator = _str.GetEnumerator();
        while (CEnumerator.MoveNext())
        {
            byte[] array = new byte[1];
            array = System.Text.Encoding.ASCII.GetBytes(CEnumerator.Current.ToString());
            int asciicode = (short)(array[0]);
            if (asciicode != 32)
            {
                strTemp += CEnumerator.Current.ToString();
            }
        }
        return strTemp;
    }
}
