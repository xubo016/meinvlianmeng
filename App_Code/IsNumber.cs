using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

/// <summary>
///IsNumber 的摘要说明
/// </summary>
public class IsNumber
{
	public IsNumber()
	{		
	}
    public static bool IsNumberValue(string checkNumber)
    {
        bool isCheck = true;

        if (string.IsNullOrEmpty(checkNumber))
        {
            isCheck = false;
        }
        else
        {
            char[] charNumber = checkNumber.ToCharArray();

            for (int i = 0; i < charNumber.Length; i++)
            {
                if (!Char.IsNumber(charNumber[i]))
                {
                    isCheck = false;

                    break;
                }
            }
        }

        return isCheck;
    }
}
