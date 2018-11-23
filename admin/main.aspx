<%@ Page Language="C#" AutoEventWireup="true" CodeFile="main.aspx.cs" Inherits="kuangjia_main" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>主页</title>

</head>
<frameset rows="80,*,35" border="0">
<frame name="top" noresize="noresize" scrolling="no" target="contents"  src="top.aspx">
<frameset cols="5,260,10,*,5">
    <frame name="001" src="">
	<frame name="contents" src="left.aspx" target="main">
	<frame name="002" src="">
	<frame name="main" src="right.aspx">
	<frame name="003" src="">
</frameset>
<frame name="bottom" noresize="noresize" scrolling="no" target="contents" src="foot.aspx">
<noframes></noframes>

<body>
</body>
</html>
