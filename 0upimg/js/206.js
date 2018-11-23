var speed_1 = 1; //速度(毫秒)
var space_1 = 10; //每次移动(px)
var PageWidth_1 = 130; //翻页宽度
var PageWidth_2 = 142; //翻页宽度
var fill_1 = 0; //整体移位
var moveLock_1 = false;
var moveTimeObj_1;
var moveWay_1="right";
var comp_1 = 0;
var autoPlayObj_1=null;
var timer,elems,count,delay=200,init_src_def='init_src',arr_df_tag=['img'],doc_body,doc_element;
var marqueeContent = new Array();
var marqueeInterval = new Array(); 
var marqueeId = 0;
var marqueeDelay = 2500;
var marqueeHeight = 26;
var ErrorNumber=0;
var isIe6 = ($.browser.msie && parseInt($.browser.version) == 6)?true:false;
function initMarquee() {
	var str = marqueeContent[0];
	document.write('<dl id=marqueeBox style="overflow:hidden;height:' + marqueeHeight + 'px" onmouseover="clearInterval(marqueeInterval[0])" onmouseout="marqueeInterval[0]=setInterval(\'startMarquee()\',marqueeDelay)"><dt>'+str+ '</dt></dl>');
	marqueeId++;
	marqueeInterval[0] = setInterval("startMarquee()", marqueeDelay);
}

function startmarqueeup(id,lh, speed, delay){
	var t;
	var p = true;
	var o = document.getElementById(id);
	o.innerHTML += o.innerHTML;
	o.onmouseover = function(){p = false}
	o.onmouseout = function(){p = true;}
	o.scrollTop = 0;
	function start(){
		t = setInterval(scrolling, speed);
		if(p){
			o.scrollTop += 2;
		}
	}
	function scrolling(){
		if(p){
			if(o.scrollTop % lh != 0){
				o.scrollTop += 2;
				if(o.scrollTop>= o.scrollHeight / 2){
					o.scrollTop = 0;
				}
			}else{
				clearInterval(t);
				setTimeout(start,delay);
			}
		}
	}
	setTimeout(start,delay);
}


function startMarquee() {
	var str = marqueeContent[marqueeId];
	if(str)
	{
		marqueeId++;
		if (marqueeId >= marqueeContent.length) marqueeId = 0;
		if (marqueeBox.childNodes.length == 1) {
			var nextLine = document.createElement('ol');
			nextLine.innerHTML = str;
			marqueeBox.appendChild(nextLine);
		}
		else {
			marqueeBox.childNodes[0].innerHTML = str;
			marqueeBox.appendChild(marqueeBox.childNodes[0]);
			marqueeBox.scrollTop = 0;
		}
		clearInterval(marqueeInterval[1]);
		marqueeInterval[1] = setInterval("scrollMarquee()", 20);
	}
}
function scrollMarquee() {
	marqueeBox.scrollTop++;
	if (marqueeBox.scrollTop % marqueeHeight == (marqueeHeight - 1)) {
		clearInterval(marqueeInterval[1]);
	}
}

(function($){
	$.getStringLength=function(str)
	{
		str = $.trim(str);
		if(str=="")
			return 0; 
		var length=0; 
		for(var i=0;i <str.length;i++) 
		{ 
			if(str.charCodeAt(i)>255)
				length+=2; 
			else
				length++; 
		}
		return length;
	}
	$.getLengthString=function(str,length,isSpace)
	{
		if(arguments.length < 3)
			var isSpace = true; 
		if($.trim(str)=="")
			return "";
		var tempStr="";
		var strLength = 0;
		for(var i=0;i <str.length;i++) 
		{
			if(str.charCodeAt(i)>255)
				strLength+=2;
			else
			{
				if(str.charAt(i) == " ")
				{
					if(	isSpace)
						strLength++;	
				}
				else
					strLength++;
			}
				
			if(length >= strLength)
				tempStr += str.charAt(i);
		}
		return tempStr;
	}
	$.getBodyScrollTop=function(){
        var scrollPos; 
        if (typeof window.pageYOffset != 'undefined') { 
            scrollPos = window.pageYOffset; 
        } 
        else if (typeof document.compatMode != 'undefined' && 
            document.compatMode != 'BackCompat') { 
            scrollPos = document.documentElement.scrollTop; 
        } 
        else if (typeof document.body != 'undefined') { 
            scrollPos = document.body.scrollTop; 
        } 
        return scrollPos;
    }
	$.copyText = function(txt)
	{
		if(window.clipboardData)
		{
			window.clipboardData.clearData();
			var judge = window.clipboardData.setData("Text", txt);
			if(judge === true)
				alert("复制成功,你可以粘帖到QQ或者MSN的中发给好友！");
			else
				alert("不允许复制，请您手动进行");
		}
		else if(navigator.userAgent.indexOf("Opera") != -1)
		{
			window.location = txt;
		} 
		else if (window.netscape) 
		{
			try
			{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch(e)
			{
				alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip)
				return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans)
				return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext = txt;
			str.data = copytext;
			trans.setTransferData("text/unicode",str,copytext.length*2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip)
				return false;
			clip.setData(trans,null,clipid.kGlobalClipboard);
			alert("复制成功,你可以粘帖到QQ或者MSN的中发给好友！");
		}
	};
	
	$.minLength = function(value, length , isByte) {
		var strLength = $.trim(value).length;
		if(isByte)
			strLength = $.getStringLength(value);
			
		return strLength >= length;
	};
	
	$.maxLength = function(value, length , isByte) {
		var strLength = $.trim(value).length;
		if(isByte)
			strLength = $.getStringLength(value);
			
		return strLength <= length;
	};
	
	$.rangeLength = function(value, minLength,maxLength, isByte) {
		var strLength = $.trim(value).length;
		if(isByte)
			strLength = $.getStringLength(value);
			
		return length >= minLength && length <= maxLength;
	}
	
	$.checkMobilePhone = function(value){
		return /^(13\d{9}|18\d{9}|14\d{9}|15\d{9}|659\d{7}|658\d{7})$/i.test($.trim(value));
	}
	
	$.checkPhone = function(val){
  		var flag = 0;
		val = $.trim(val);
  		var num = ".0123456789/-()";
  		for(var i = 0; i < (val.length); i++)
		{
    		tmp = val.substring(i, i + 1);
    		if(num.indexOf(tmp) < 0)
      			flag++;
 		}
  		if(flag > 0)
			return true;
		else
			return false;
	}
	
	$.checkEmail = function(val){
		return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(val);
	};
	
})(jQuery);

function ShowHomeMenuStyle(index)
{
	var href= $("#size-stylesheet").attr("href");
	var aa = href.indexOf("-");
	var bb = href.substring(aa+1,aa+2 );
	var c = GetCookieValue('Indexstyle');
	if (c)
	{
		IndexswitchStylestyle(index,c,href.replace(bb,c),bb);
	}
	else	
	{
		IndexswitchStylestyle(index,bb,"",bb);
	}
}
function IndexswitchStylestyle(index,tt,cs,bb)
{
	if(cs!="")
	{
		if(index==1)
		{
			$("#indextopmenu1").removeClass("AntMenuHover_"+bb);
			$("#indextopmenu_").removeClass("AntNav_"+bb);
			$("#indextopmenu1").addClass("AntMenuHover_"+tt);
			$("#indextopmenu_").addClass("AntNav_"+tt);
		}
		document.getElementById('size-stylesheet').href =cs;
	}
	CreateCookie("Indexstyle",tt);
}
backTop=function (btnId){   
	var btn=document.getElementById(btnId); 
	if(btn)
	{
		var $window=$(window)
		var controlx= 950 + ($window.width() -950)/2+5;
		$("#gotopbtn").css({left:controlx+'px'});
		var d=document.documentElement;   
		window.onscroll=set;   
		btn.onclick=function (){   
		btn.style.display="none";   
		window.onscroll=null;   
		this.timer=setInterval(function(){   
			d.scrollTop-=Math.ceil(d.scrollTop*0.1);   
			if(d.scrollTop==0) clearInterval(btn.timer,window.onscroll=set);   
		},10);   
	}
};  
function set(){btn.style.display=d.scrollTop?'block':"none"}   
};   
function   CheckDouble(data){   
  var   tmp   ;   
  if   (data   ==   "")   return   true;   
  var   re   =   /^[\-\+]?([0-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)(\.\d+)?$/;   
  return   re.test(data);   
} 

function FormatFloat(src, pos)
{
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}
var Class = {
  create: function() {
	return function() {
	  this.initialize.apply(this, arguments);
	}
  }
}

Object.extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
	return destination;
}

var TransformView = Class.create();
TransformView.prototype = {
  //容器对象,滑动对象,切换参数,切换数量
  initialize: function(container, slider, parameter, count, options) {
	if(parameter <= 0 || count <= 0) return;
	var oContainer = $_D(container), oSlider = $_D(slider), oThis = this;
	
	this.Index = 0;//当前索引
	
	this._timer = null;//定时器
	this._slider = oSlider;//滑动对象
	this._parameter = parameter;//切换参数
	this._count = count || 0;//切换数量
	this._target = 0;//目标参数
	
	this.SetOptions(options);
	
	this.Up = !!this.options.Up;
	this.Step = Math.abs(this.options.Step);
	this.Time = Math.abs(this.options.Time);
	this.Auto = !!this.options.Auto;
	this.Pause = Math.abs(this.options.Pause);
	this.onStart = this.options.onStart;
	this.onFinish = this.options.onFinish;
	
	oContainer.style.overflow = "hidden";
	oContainer.style.position = "relative";
	
	oSlider.style.position = "absolute";
	oSlider.style.top = oSlider.style.left = 0;
  },
  //设置默认属性
  SetOptions: function(options) {
	this.options = {//默认值
		Up:			true,//是否向上(否则向左)
		Step:		5,//滑动变化率
		Time:		20,//滑动延时
		Auto:		true,//是否自动转换
		Pause:		2000,//停顿时间(Auto为true时有效)
		onStart:	function(){},//开始转换时执行
		onFinish:	function(){}//完成转换时执行
	};
	Object.extend(this.options, options || {});
  },
  //开始切换设置
  Start: function() {
	if(this.Index < 0){
		this.Index = this._count - 1;
	} else if (this.Index >= this._count){ this.Index = 0; }
	
	this._target = -1 * this._parameter * this.Index;
	this.onStart();
	this.Move();
  },
  //移动
  Move: function() {
	clearTimeout(this._timer);
	var oThis = this, style = this.Up ? "top" : "left", iNow = parseInt(this._slider.style[style]) || 0, iStep = this.GetStep(this._target, iNow);
	
	if (iStep != 0) {
		this._slider.style[style] = (iNow + iStep) + "px";
		this._timer = setTimeout(function(){ oThis.Move(); }, this.Time);
	} else {
		this._slider.style[style] = this._target + "px";
		this.onFinish();
		if (this.Auto) { this._timer = setTimeout(function(){ oThis.Index++; oThis.Start(); }, this.Pause); }
	}
  },
  //获取步长
  GetStep: function(iTarget, iNow) {
	var iStep = (iTarget - iNow) / this.Step;
	if (iStep == 0) return 0;
	if (Math.abs(iStep) < 1) return (iStep > 0 ? 1 : -1);
	return iStep;
  },
  //停止
  Stop: function(iTarget, iNow) {
	clearTimeout(this._timer);
	this._slider.style[this.Up ? "top" : "left"] = this._target + "px";
  }
};


function InsertAntFace(text, obj) {
	$_D(obj).focus();
	if(!isUndefined($_D(obj).selectionStart)) {
		var opn = $_D(obj).selectionStart + 0;
		$_D(obj).value = $_D(obj).value.substr(0, $_D(obj).selectionStart) + text + $_D(obj).value.substr($_D(obj).selectionEnd);
	} else if(document.selection && document.selection.createRange) {
		var sel = document.selection.createRange();
		sel.text = text.replace(/\r?\n/g, '\r\n');
	} else {
		$_D(obj).value += text;
	}
}
function textareasize(obj) {
	if(obj.scrollHeight > 70) {
		obj.style.height = obj.scrollHeight + 'px';
	}
}
function GetCookieValue(name) {
	var arr = document.cookie.match(new RegExp(name + "=([^&;]+)"));
	if (arr != null) {
		return decodeURI(arr[1])
	}
	return ""
}
function delCookie(name)
{
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=GetCookieValue(name);
  if(cval!=null) document.cookie=name +"="+cval+";expires="+exp.toGMTString();
}
function CreateCookie(name,value)
{
	var date = new Date();
	date.setTime(date.getTime()+(30*24*60*60*1000));//30days
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}
function $_D(id) {
	return document.getElementById(id);
}
 
function ShowSelectBox(){
	var bodyclick = document.getElementsByTagName('body').item(0);
	var selects = document.getElementsByTagName('select');
	rSelects();
	bodyclick.onclick = function(){
		for (i=0;i<selects.length;i++){	
			if(selects[i].id!="txtInfoAreaID"   && selects[i].id!="infosearchClassID" && selects[i].id!="txtInfoYouxiao"  && selects[i].id!="cYear" && selects[i].id!="calendarYear"  && selects[i].id!="cMonth"  && selects[i].id.indexOf("AttrID")==-1)
			{
				$_D('select_info_' + selects[i].name).className = 'tag_select';
				$_D('options_' + selects[i].name).style.display = 'none';
			}
		}
	}	
}
function Marquee()
{
	this.ID = document.getElementById(arguments[0]);
	if(!this.ID)
	{
		alert("您要设置的\"" + arguments[0] + "\"初始化错误\r\n请检查标签ID设置是否正确!");
		this.ID = -1;
		return;
	}
	this.Direction = this.Width = this.Height = this.DelayTime = this.WaitTime = this.CTL = this.StartID = this.Stop = this.MouseOver = 0;
	this.Step = 1;
	this.Timer = 30;
	this.DirectionArray = {"top":0 , "up":0 , "bottom":1 , "down":1 , "left":2 , "right":3};
	if(typeof arguments[1] == "number" || typeof arguments[1] == "string")this.Direction = arguments[1];
	if(typeof arguments[2] == "number")this.Step = arguments[2];
	if(typeof arguments[3] == "number")this.Width = arguments[3];
	if(typeof arguments[4] == "number")this.Height = arguments[4];
	if(typeof arguments[5] == "number")this.Timer = arguments[5];
	if(typeof arguments[6] == "number")this.DelayTime = arguments[6];
	if(typeof arguments[7] == "number")this.WaitTime = arguments[7];
	if(typeof arguments[8] == "number")this.ScrollStep = arguments[8];
	this.ID.style.overflow = this.ID.style.overflowX = this.ID.style.overflowY = "hidden";
	this.ID.noWrap = true;
	this.IsNotOpera = (navigator.userAgent.toLowerCase().indexOf("opera") == -1);
	if(arguments.length >= 7)this.Start();
}

Marquee.prototype.Start = function()
{
	if(this.ID == -1)return;
	if(this.WaitTime < 800)this.WaitTime = 800;
	if(this.Timer < 20)this.Timer = 20;
	if(this.Width == 0)this.Width = parseInt(this.ID.style.width);
	if(this.Height == 0)this.Height = parseInt(this.ID.style.height);
	if(typeof this.Direction == "string")this.Direction = this.DirectionArray[this.Direction.toString().toLowerCase()];
	this.HalfWidth = Math.round(this.Width / 2);
	this.HalfHeight = Math.round(this.Height / 2);
	this.BakStep = this.Step;
	this.ID.style.width = this.Width + "px";
	this.ID.style.height = this.Height + "px";
	if(typeof this.ScrollStep != "number")this.ScrollStep = this.Direction > 1 ? this.Width : this.Height;
	var templateLeft = "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;display:inline;'><tr><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td></tr></table>";
	var templateTop = "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;'><tr><td>MSCLASS_TEMP_HTML</td></tr><tr><td>MSCLASS_TEMP_HTML</td></tr></table>";
	var msobj = this;
	msobj.tempHTML = msobj.ID.innerHTML;
	if(msobj.Direction <= 1)
	{
		msobj.ID.innerHTML = templateTop.replace(/MSCLASS_TEMP_HTML/g,msobj.ID.innerHTML);
	}
	else
	{
		if(msobj.ScrollStep == 0 && msobj.DelayTime == 0)
		{
			msobj.ID.innerHTML += msobj.ID.innerHTML;
		}
		else
		{
			msobj.ID.innerHTML = templateLeft.replace(/MSCLASS_TEMP_HTML/g,msobj.ID.innerHTML);
		}
	}
	var timer = this.Timer;
	var delaytime = this.DelayTime;
	var waittime = this.WaitTime;
	msobj.StartID = function(){msobj.Scroll()}
	msobj.Continue = function()
	{
		if(msobj.MouseOver == 1)
		{
			setTimeout(msobj.Continue,delaytime);
		}
		else
		{	clearInterval(msobj.TimerID);
			msobj.CTL = msobj.Stop = 0;
			msobj.TimerID = setInterval(msobj.StartID,timer);
		}
	}

	msobj.Pause = function()
	{
		msobj.Stop = 1;
		clearInterval(msobj.TimerID);
		setTimeout(msobj.Continue,delaytime);
	}

	msobj.Begin = function()
	{
		msobj.ClientScroll = msobj.Direction > 1 ? msobj.ID.scrollWidth / 2 : msobj.ID.scrollHeight / 2;
		if((msobj.Direction <= 1 && msobj.ClientScroll <= msobj.Height + msobj.Step) || (msobj.Direction > 1 && msobj.ClientScroll <= msobj.Width + msobj.Step))			{
			msobj.ID.innerHTML = msobj.tempHTML;
			delete(msobj.tempHTML);
			return;
		}
		delete(msobj.tempHTML);
		msobj.TimerID = setInterval(msobj.StartID,timer);
		if(msobj.ScrollStep < 0)return;
		msobj.ID.onmousemove = function(event)
		{
			if(msobj.ScrollStep == 0 && msobj.Direction > 1)
			{
				var event = event || window.event;
				if(window.event)
				{
					if(msobj.IsNotOpera)
					{
						msobj.EventLeft = event.srcElement.id == msobj.ID.id ? event.offsetX - msobj.ID.scrollLeft : event.srcElement.offsetLeft - msobj.ID.scrollLeft + event.offsetX;
					}
					else
					{
						msobj.ScrollStep = null;
						return;
					}
				}
				else
				{
					msobj.EventLeft = event.layerX - msobj.ID.scrollLeft;
				}
				msobj.Direction = msobj.EventLeft > msobj.HalfWidth ? 3 : 2;
				msobj.AbsCenter = Math.abs(msobj.HalfWidth - msobj.EventLeft);
				msobj.Step = Math.round(msobj.AbsCenter * (msobj.BakStep*2) / msobj.HalfWidth);
			}
		}
		msobj.ID.onmouseover = function()
		{
			if(msobj.ScrollStep == 0)return;
			msobj.MouseOver = 1;
			clearInterval(msobj.TimerID);
		}
		msobj.ID.onmouseout = function()
		{
			if(msobj.ScrollStep == 0)
			{
				if(msobj.Step == 0)msobj.Step = 1;
				return;
			}
			msobj.MouseOver = 0;
			if(msobj.Stop == 0)
			{
				clearInterval(msobj.TimerID);
				msobj.TimerID = setInterval(msobj.StartID,timer);
			}
		}
	}
	setTimeout(msobj.Begin,waittime);
}

Marquee.prototype.Scroll = function()
{
	switch(this.Direction)
	{
		case 0:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollTop += this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollTop >= this.ClientScroll)
				{
					this.ID.scrollTop -= this.ClientScroll;
				}
				this.ID.scrollTop += this.Step;
			}
		break;

		case 1:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollTop -= this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollTop <= 0)
				{
					this.ID.scrollTop += this.ClientScroll;
				}
				this.ID.scrollTop -= this.Step;
			}
		break;

		case 2:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollLeft += this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollLeft >= this.ClientScroll)
				{
					this.ID.scrollLeft -= this.ClientScroll;
				}
				this.ID.scrollLeft += this.Step;
			}
		break;

		case 3:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollLeft -= this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollLeft <= 0)
				{
					this.ID.scrollLeft += this.ClientScroll;
				}
				this.ID.scrollLeft -= this.Step;
			}
		break;
	}
}
function SetIndexNotice () {
	var box = document.getElementById('IndexNotice'),
    h = 27,
    go = 1,
    retimeout,
    retime = function() {
        retimeout = setTimeout(function() {
            go = 1;
        },
        2000);
    },
    stopTime = function() {
        clearTimeout(retimeout);
        retimeout = null;
    };
    box.innerHTML += box.innerHTML;
    box.onmouseover = function() {
        go = 0;
    };
    box.onmouseout = function() {
        go = 1
    };
    new function() {
        var stop = (box.scrollTop % h == 0) && !go;
        if (!stop)(box.scrollTop == +(box.scrollHeight / 2)) ? box.scrollTop = 0 : box.scrollTop++;
        setTimeout(arguments.callee, (box.scrollTop % h) ? 10 : 2000);
    };
}
 
$(document).ready(function(){
 	if($("#IndexNotice").length>0)
	{
		SetIndexNotice();
	}
	if($("#KinSlideshow").length>0)
	{
		$("#KinSlideshow").KinSlideshow({
			moveStyle:"right",
			titleBar:{titleBar_height:30,titleBar_bgColor:"#000000",titleBar_alpha:0.6},
			titleFont:{TitleFont_size:14,TitleFont_color:"#FFFFFF",TitleFont_weight:"bold",TitleFont_family:"微软雅黑"},
			btn:{btn_bgColor:"#000000",btn_bgHoverColor:"#8e0b11",btn_fontColor:"#ffffff",btn_fontHoverColor:"#FFFFFF",btn_borderColor:"#000000",btn_borderHoverColor:"#b20b11",btn_borderWidth:1,btn_bgAlpha:1}
		});	
	}
	$("#AntNingming").click(function(){
		var niming = $("input[name='AntNingming']:checked").val();
		if(niming=="1")
		{
			$("#LoginUserSpan").hide();
		}
		else{
			$("#LoginUserSpan").show();	
		}
	});
	$("#AntInfoNavLink_Help").hover(function(){
		$("#AntInfo-menu_Help").show();
		$("#AntInfoNavLink_Helpa").removeClass();
		$("#AntInfoNavLink_Helpa").addClass('AntInfoHelpCurrent');
	},function(){
		$("#AntInfo-menu_Help").hide();
		$("#AntInfoNavLink_Helpa").removeClass();
		$("#AntInfoNavLink_Helpa").addClass('A');
	});
	$("#AntInfoNavLink_Company").hover(function(){
		$("#AntInfo-menu_Company").show();
		$("#AntInfoNavLink_Companya").removeClass();
		$("#AntInfoNavLink_Companya").addClass('AntInfoHelpCurrent');
	},function(){
		$("#AntInfo-menu_Company").hide();
		$("#AntInfoNavLink_Companya").removeClass();
		$("#AntInfoNavLink_Companya").addClass('A');
	});
	$("#AntInfoNavLink_daohang").hover(function(){
		$("#AntInfo-menu_daohang").show();
		$("#AntInfoNavLink_daohanga").removeClass();
		$("#AntInfoNavLink_daohanga").addClass('AntInfoHelpCurrent');
	},function(){
		$("#AntInfo-menu_daohang").hide();
		$("#AntInfoNavLink_daohanga").removeClass();
		$("#AntInfoNavLink_daohanga").addClass('A');
	});
	$("#DialogYouke1").click(function(){
		window.parent.closeopendiv();
	});
	
	$("#AntFindPassword").click(function(){
		window.open("FindPassword.aspx","_blank");
	});
	if($_D("dialoglogin1")){
		$.formValidator.initConfig({formid:"dialoglogin1",errorfocus:false,onerror:function(msg){},onsuccess:function(){
			var tt="";
			if($("input[name='txtremand']:checked").val()=="1"){
				tt="true";	
			}
			$("#loginSubmit").attr("disabled", true); //设置为不可点
			$("#loginSubmit").val("登录中…");
			AntLoginUsers($("#txtusername").val(),$("#txtuserpwd").val(),"",tt,2)
			return false;
		}});
		$.formValidator.getInitConfig("1").wideword = true;
		$("#txtusername").formValidator({onshow:"&nbsp;",onfocus:"请输入用户名。",oncorrect:"&nbsp;"}).inputValidator({min:3,max:20,onerror: "会员名3-15位。"})
		$("#txtuserpwd").formValidator({onshow:"&nbsp;",onfocus:"请输入密码。",oncorrect:"&nbsp;"}).inputValidator({min:5,max:32,onerror: "密码5-32位。"})
	}
	if($_D("DialogJobLoginfrom")){
		$.formValidator.initConfig({formid:"DialogJobLoginfrom",errorfocus:false,onerror:function(msg){},onsuccess:function(){
			var tt="";
			if($("input[name='txtremand']:checked").val()=="1"){
				tt="true";	
			}
			$("#loginSubmit").attr("disabled", true); //设置为不可点
			$("#loginSubmit").val("登录中…");
			AntLoginUsers($("#txtusername").val(),$("#txtuserpwd").val(),"",tt,7)
			return false;
		}});
		$.formValidator.getInitConfig("1").wideword = true;
		$("#txtusername").formValidator({onshow:"&nbsp;",onfocus:"请输入用户名。",oncorrect:"&nbsp;"}).inputValidator({min:3,max:20,onerror: "会员名3-15位。"})
		$("#txtuserpwd").formValidator({onshow:"&nbsp;",onfocus:"请输入密码。",oncorrect:"&nbsp;"}).inputValidator({min:5,max:32,onerror: "密码5-32位。"})
	}
	if($_D("dialogregister1")){
		$("#RegVerifyCode").css("cursor","pointer");
		$("#RegVerifyCode").click(function(){ 
			$("#RegVerifyCode").attr("src","../VerifyCode/VerifyCode.aspx?key=1&tt="+Math.random());			  
		});	
		$.formValidator.initConfig({formid:"dialogregister1",errorfocus:false,onerror:function(msg){},onsuccess:function(){AntRegesterUsers(1);return false;}});
		$.formValidator.getInitConfig("1").wideword = true;
		$("#AntRegUserName").formValidator({onshow:"3-15个字符，可为汉字。",onfocus:"3-15个字符，可为汉字。",oncorrect:"&nbsp;"}).inputValidator({min:3,max:15,onerror:"会员名在3-15个字符。"})
		.ajaxValidator({
			url : "../public/ajax.aspx?action=checkname",
			cache: false,
			dataType:'text',
			success:function(data)
			{
				if( data == "0" )
				{
					 return true;
				}
				else
				{
					return false;
				}
			},
			buttons: $("#AntRegSubmit"),
			error: function(){alert("服务器没有返回数据，可能服务器忙，请重试");},
			onerror : "该会员名已被使用。",
			onwait : "正在检验用户名，请稍候..."
		});
		$("#AntRegUserPwd").formValidator({onshow:"密码长度5~32位。",onfocus:"密码长度5~32位。",oncorrect:"&nbsp;"}).inputValidator({min:5,empty:{leftempty:false,rightempty:false,emptyerror:"密码两边不能有空符号。"},onerror:"密码长度5~32位,请确认。"});
		$("#AntRegUserPwd_").formValidator({onshow:"请再次输入密码。",onfocus:"请再次输入密码。",oncorrect:"&nbsp;"}).inputValidator({min:5,empty:{leftempty:false,rightempty:false,emptyerror:"重复密码两边不能有空符号。"},onerror:"重复密码密码长度5~32位。"}).compareValidator({desid:"AntRegUserPwd",operateor:"=",onerror:"两次输入的密码不一致。"});
		$("#AntRegUserEmail").formValidator({onshow:"请输入您常用的邮箱。",onfocus:"请输入您常用的邮箱。",oncorrect:"&nbsp;",defaultvalue:"@"}).inputValidator({min:6,max:100,onerror:"请输入正确格式的邮箱。"}).regexValidator({regexp:"^([\\w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$",onerror:"请输入正确格式的邮箱"})
		.ajaxValidator({
			url : "../public/ajax.aspx?action=checkname",
			cache: false,
			dataType:'text',
			success:function(data)
			{
				if( data == "0" )
				{
					 return true;
				}
				else
				{
					return false;
				}
			},
			buttons: $("#AntRegSubmit"),
			error: function(){alert("服务器没有返回数据，可能服务器忙，请重试");},
			onerror : "该电子邮件已被使用。",
			onwait : "正在检验电子邮件，请稍候..."
		});
		$("#AntRegUserMobile").formValidator({empty:true,onshow:"输入手机号码可享受更多服务。",onfocus:"请输入你的手机号码。",oncorrect:"&nbsp;",onempty:" "}).inputValidator({min:11,max:11,onerror:"手机号码必须是11位的。"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"输入的手机号码格式不正确"});
		$("#AntRegUserQQ").formValidator({empty:true,onshow:"输入您常用的QQ号码。",onfocus:"QQ号码可以为空。",oncorrect:"&nbsp;",onempty:" "}).regexValidator({regexp:"^\\d{5,10}$",onerror:"QQ号码格式不正确。"});
		$("#AntRegUserCode").formValidator({onshow:"请输入左侧的验证码。",onfocus:"请正确输入验证码。",oncorrect:"&nbsp;"}).inputValidator({min:1,max:20,onerror:"验证码不能为空。"})
		$("#AntRegQuestion").formValidator({onshow:"请输入安全验证答案。",onfocus:"输入安全验证答案。",oncorrect:"&nbsp;"}).inputValidator({min:1,max:20,onerror:"验证答案不能为空。"})
	}
	if($_D("infosendmobileform"))
	{
		$("#infosendmobileform").submit(function(){
			var chrmobile = $("#infosendmobile").val();
			if(!$.checkMobilePhone(chrmobile))
			{
				alert("请输入正确的11位手机号码！");
				$("#infosendmobile").focus();
				return false;
			}
			$("#infosendmobilesubmit").attr("disabled", true); //设置为不可点
			$.ajax({
			  url: "/public/ajax.aspx?action=sendinfomobile&aa="+$("#typeid").val()+"&tt="+escape($("#sendcontent").html())+"&&chrmobile="+escape($("#infosendmobile").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("信息内容已发送到您手机，请注意查收。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					$("#infosendmobilesubmit").attr("disabled", false); //设置为不可点
					alert(data);
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("youhuiquansendmobileform"))
	{
		$("#youhuiquansendmobileform").submit(function(){
			var chrmobile = $("#youhuiquansendmobile").val();
			if(!$.checkMobilePhone(chrmobile))
			{
				alert("请输入正确的11位手机号码！");
				$("#youhuiquansendmobile").focus();
				return false;
			}
			$("#youhuiquansendmobilesubmit").attr("disabled", true); //设置为不可点
			$.ajax({
			  url: "/public/ajax.aspx?action=sendyouhuiquanmobile&bb="+$("#youhuiquanid").val()+"&aa="+$("#typeid").val()+"&tt="+escape($("#sendcontent").html())+"&&chrmobile="+escape($("#youhuiquansendmobile").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("信息内容已发送到您手机，请注意查收。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					$("#youhuiquansendmobilesubmit").attr("disabled", false); //设置为不可点
					alert(data);
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("buildmobilesendform"))
	{
		$("#buildmobilesendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkMobilePhone(chrmobile))
			{
				alert("请输入正确的11位手机号码！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=builddingyue&aa=0&bb=0&tt="+escape($("#BuildID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("当"+$("#BuildName").val()+"的价格变动时，我们会第一时间通知您。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("buildmobiletuisendform"))
	{
		$("#buildmobiletuisendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkMobilePhone(chrmobile))
			{
				alert("请输入正确的11位手机号码！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=builddingyue&aa=0&bb=1&tt="+escape($("#BuildID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("退订成功。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("buildemailsendform"))
	{
		$("#buildemailsendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkEmail(chrmobile))
			{
				alert("请输入正确的Email地址！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=builddingyue&aa=1&bb=0&tt="+escape($("#BuildID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("当"+$("#BuildName").val()+"的价格变动时，我们会第一时间通知您。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("buildemailtuisendform"))
	{
		$("#buildemailtuisendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkEmail(chrmobile))
			{
				alert("请输入正确的Email地址！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=builddingyue&aa=1&bb=1&tt="+escape($("#BuildID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("退订成功。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("communitymobilesendform"))
	{
		$("#communitymobilesendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkMobilePhone(chrmobile))
			{
				alert("请输入正确的11位手机号码！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=communitydingyue&aa=0&bb=0&tt="+escape($("#CommunityID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("当"+$("#CommunityName").val()+"有新房源时，我们会第一时间通知您。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("communitymobiletuisendform"))
	{
		$("#communitymobiletuisendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkMobilePhone(chrmobile))
			{
				alert("请输入正确的11位手机号码！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=communitydingyue&aa=0&bb=1&tt="+escape($("#CommunityID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("退订成功。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("communityemailsendform"))
	{
		$("#communityemailsendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkEmail(chrmobile))
			{
				alert("请输入正确的Email地址！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=communitydingyue&aa=1&bb=0&tt="+escape($("#CommunityID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("当"+$("#CommunityName").val()+"有新房源时，我们会第一时间通知您。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("communityemailtuisendform"))
	{
		$("#communityemailtuisendform").submit(function(){
			var chrmobile = $("#sendtext").val();
			if(!$.checkEmail(chrmobile))
			{
				alert("请输入正确的Email地址！");
				$("#sendtext").focus();
				return false;
			}
			$("#sendform").attr("disabled", true); //设置为不可点	
			$.ajax({
			  url: "/public/ajax.aspx?action=communitydingyue&aa=1&bb=1&tt="+escape($("#CommunityID").val())+"&&chrmobile="+escape($("#sendtext").val()),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("退订成功。");
					window.parent.closeopendiv();
					return false;
				 }
				 else{
					alert(data);
					$("#sendform").attr("disabled", false); //设置为可点
					return false;
				 }
			  }
		  });
			return false;
		});
	}
	if($_D("ResumeApplyForm"))
	{
		$("#ResumeApplyForm").submit(function(){
			var FavSendDate = $("#txtFavSendDate").val();
			var FavSendAddress = $("#txtFavSendAddress").val();
			var FavSendContact = $("#txtFavSendContact").val();
			if(FavSendDate=="")
			{
				alert("对不起，邀请时间不能为空！");
				$("#txtFavSendDate").focus();
				return false;
			}
			if(FavSendAddress=="")
			{
				alert("对不起，邀请地点不能为空！");
				$("#txtFavSendAddress").focus();
				return false;
			}
			if(FavSendContact=="")
			{
				alert("对不起，联系方式不能为空！");
				$("#txtFavSendContact").focus();
				return false;
			}
			$(".input-Job").attr("disabled", true); //设置为可点
			var id= $("#hiddenresume").val();
			$.ajax({
			  url: "/public/ajax.aspx?action=addresume&FavSendDate="+escape(FavSendDate)+"&&FavSendAddress="+escape(FavSendAddress)+"&&FavSendContact="+escape(FavSendContact)+"&&id="+escape(id),
			  cache: false,
			  success:function(data)
			  {
				 if(data=="0"){
					alert("面试邀请通知成功。");
					window.parent.closeopendiv();
				 }
				 else{
					alert(data);
					$(".input-Job").attr("disabled", false); //设置为可点
				 }
			  }
			});	
			return false;
		});
	}
	if($("#AntTopNewScroll").length>0)
		AntHomeNewScroll();
	if($("#AntNew").length>0)
		AntNewScroll();
	var now = new Date(),hour = now.getHours() 
	if(hour < 6){$("#AntHomeHours").html("凌晨好！")} 
	else if (hour < 9){$("#AntHomeHours").html("早上好！")} 
	else if (hour < 12){$("#AntHomeHours").html("上午好！")} 
	else if (hour < 14){$("#AntHomeHours").html("中午好！")} 
	else if (hour < 17){$("#AntHomeHours").html("下午好！")} 
	else if (hour < 19){$("#AntHomeHours").html("傍晚好！")} 
	else if (hour < 22){$("#AntHomeHours").html("晚上好！")} 
	else {$("#AntHomeHours").html("夜里好！")};
	
	$("#AntInfoNavLink1").hover(function(){
		$("#AntInfo-menu1").show();	
		$("#AntInfoHelp1").addClass("AntInfoHelp_hover");
	},function(){
		$("#AntInfo-menu1").hide();
		$("#AntInfoHelp1").removeClass("AntInfoHelp_hover");
	});
	$("#AntInfoNavLink2").hover(function(){
		$("#AntInfo-menu2").show();	
		$("#AntInfoHelp2").addClass("AntInfoHelp_hover");
	},function(){
		$("#AntInfo-menu2").hide();
		$("#AntInfoHelp2").removeClass("AntInfoHelp_hover");
	});
	$("#AntInfoNavLink3").hover(function(){
		$("#AntInfo-menu3").show();	
		$("#AntInfoHelp3").addClass("AntInfoHelp_hover");
	},function(){
		$("#AntInfo-menu3").hide();
		$("#AntInfoHelp3").removeClass("AntInfoHelp_hover");
	});
	$("#ChangeCity").click(function(){
		$(".AntCityLay").show();
	});	
	$("#ChangeCity").hover(function(){
	},function(){
		$(".AntCityLay").hide();
	});
	if( $("#AntIndexInfoLeftFlash").length>0 )
	{
		new dk_slideplayerIndex("#Ant_Imageplay",{width:"470px",height:"250px",fontsize:"16px",time:"3000",color1:"#FFFFFF",color2:"#323232",color3:"#FFFFFF",color4:"#ff9815"});
	}
	$("#LoginUserForm").submit(function(){
		var username = $.trim($("#LoginUserName").val());							   
		var userpwd = $.trim($("#LoginUserPwd").val());
		if(username.length==0)
		{
			alert("对不起，请输入您的用户名！");
			$("#LoginUserName").focus();
			return false;
		}	
		if(userpwd.length==0)
		{
			alert("对不起，请输入您的密码！");
			$("#LoginUserPwd").focus();
			return false;
		}
		var tt="";
		$("#LoginButton").attr("disabled", true); //设置为不可点
		AntLoginUsers(username,userpwd,"",tt,9);
		return false;							 
	});	
	$("#MainContentTab").find("a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#MainContentTab").find("a").each(function(){
				$(this).removeClass("Current");
				$("#MainContent"+$(this).attr("rel")).hide();
			});
			obj.addClass("Current");
			$("#MainContent"+obj.attr("rel")).show();
		});
	});
	$("#Ant-NewsTable").find("h2 a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Ant-NewsTable").find("h2 a").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).parent().removeClass("Current");
					if($("#Floating"+$(this).attr("rel")).css("display")=="block")
						$("#Floating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("Current");
					if($("#Floating"+obj.attr("rel")).css("display")=="none")
						$("#Floating"+obj.attr("rel")).show();	
						$("#Floating"+obj.attr("rel")).css("height","260px")//不指定会有问题，边距拉大
				}
			});
		});
	});
	$("#Ant-News3Table").find("li a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Ant-News3Table").find("li a").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).parent().removeClass("c");
					if($("#Floating"+$(this).attr("rel")).css("display")=="block")
						$("#Floating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("c");
					if($("#Floating"+obj.attr("rel")).css("display")=="none")
						$("#Floating"+obj.attr("rel")).show();	
				}
			});
		});
	});
	$("#Ant-News4Table").find("li a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Ant-News4Table").find("li a").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).parent().removeClass("cu");
					if($("#Floating"+$(this).attr("rel")).css("display")=="block")
						$("#Floating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("cu");
					if($("#Floating"+obj.attr("rel")).css("display")=="none")
						$("#Floating"+obj.attr("rel")).show();	
				}
			});
		});
	});
	$("#Ant-News31Table").find("li a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Ant-News31Table").find("li a").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).parent().removeClass("c");
					if($("#Floating3"+$(this).attr("rel")).css("display")=="block")
						$("#Floating3"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("c");
					if($("#Floating3"+obj.attr("rel")).css("display")=="none")
						$("#Floating3"+obj.attr("rel")).show();	
				}
			});
		});
	});
	$("#TabQiuzhu").find("h2 a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#TabQiuzhu").find("h2 a").each(function(){
				if( $(this).parent().attr("rel")!=obj.parent().attr("rel") )
				{
					$(this).parent().removeClass("Current");
					$("#QiuzhuFloating"+$(this).parent().attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("Current");
					$("#QiuzhuFloating"+obj.parent().attr("rel")).show();	
				}	
			});
		});
	});
	$("#InfoTable").find("h2 a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#InfoTable").find("h2 a").each(function(){
				if( $(this).parent().attr("rel")!=obj.parent().attr("rel") )
				{
					$(this).parent().removeClass("Current");
					$("#InfoFloating"+$(this).parent().attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("Current");
					$("#InfoFloating"+obj.parent().attr("rel")).show();	
				}
			});
			
		});
	});
	$("#ShopTable").find("h2 a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#ShopTable").find("h2 a").each(function(){
				if( $(this).parent().attr("rel")!=obj.parent().attr("rel") )
				{
					$(this).parent().removeClass("Current");
					$("#ShopFloating"+$(this).parent().attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("Current");
					$("#ShopFloating"+obj.parent().attr("rel")).show();	
				}
			});
			
		});
	});
	$("#LoupanTab").find("h2 a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#LoupanTab").find("h2 a").each(function(){
				if( $(this).parent().attr("rel")!=obj.parent().attr("rel") )
				{
					$(this).parent().removeClass("Current");
					$("#LoupanFloating"+$(this).parent().attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("Current");
					$("#LoupanFloating"+obj.parent().attr("rel")).show();	
				}
			});
			
		});
	});
	$("#HouseTable").find("h2 a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#HouseMoreButton").html("更多"+$(this).html());
			$("#HouseMoreButton").attr("href",$(this).attr("href"));
			$("#HouseTable").find("h2 a").each(function(){
				if( $(this).parent().attr("rel")!=obj.parent().attr("rel") )
				{
					$(this).parent().removeClass("Current");
					$("#HouseFloating"+$(this).parent().attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("Current");
					$("#HouseFloating"+obj.parent().attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin3-HouseTab").find("li a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#HouseMoreButton").html("更多"+$(this).html());
			$("#HouseMoreButton").attr("href",$(this).attr("href"));
			$("#Skin3-HouseTab").find("li a").each(function(){
				if( $(this).parent().attr("rel")!=obj.parent().attr("rel") )
				{
					$(this).parent().removeClass("c");
					$("#HouseFloating"+$(this).parent().attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("c");
					$("#HouseFloating"+obj.parent().attr("rel")).show();	
				}
			});
			
		});
	});
	$("#VideoQuan").find("h2 a").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#VideoQuan").find("h2 a").each(function(){
				if( $(this).parent().attr("rel")!=obj.parent().attr("rel") )
				{
					$(this).parent().removeClass("Current");
					$("#VideoQuan"+$(this).parent().attr("rel")).hide();
				}
				else
				{
					obj.parent().addClass("Current");
					$("#VideoQuan"+obj.parent().attr("rel")).show();	
				}	
			});
		});
	});
	$("#HomeSearchKeyword").focus(function(){
		if($.trim(this.value) == "请输入关键词...")
			this.value = "";
	}).blur(function(){
		if($.trim(this.value) == "")
			this.value = "请输入关键词...";												  
	});
	$("#Home3SearchKeyword").focus(function(){
		if($.trim(this.value) == "输入您要搜索的信息及关键词！")
			this.value = "";
	}).blur(function(){
		if($.trim(this.value) == "")
			this.value = "输入您要搜索的信息及关键词！";												  
	});
	if($(".AntSearch").length>0)
	{
		$(".Search").find("a").each(function(){
			var obj=$(this);
			obj.click(function(){
				var aa=obj.attr("rel");
				$(".Search").find("a").each(function(){
					$(this).removeClass("Current_3" );							 
				});
				obj.addClass("Current_3");
				$("#HomeSearchKeyword").attr("rel",aa);
			});
		});
	}
	if($("#Ant3Search").length>0)
	{
		$("#Ant3Search").find("a").each(function(){
			var obj=$(this);
			obj.click(function(){
				var aa=obj.attr("rel");
				$("#Ant3Search").find("a").each(function(){
					$(this).parent().removeClass("cu");							 
				});
				obj.parent().addClass("cu");
				$("#Hidden3Url").val( aa );
			});
		});
	}
	if($("#Home3SearchSubmit").length>0)
	{
		$("#Home3SearchSubmit").click(function(){
			var keyword=$.trim($("#Home3SearchKeyword").val());
			var type=$("#Hidden3Url").val();	
			if(keyword.length==0 || keyword=="请输入要搜索的关键词..." || keyword=="输入您要搜索的信息及关键词！")
			{
				window.open(SiteWebUrl+"search/","_blank");
				return false;
			}
			window.open(SiteWebUrl+"search/list.aspx?word="+escape(keyword)+"&c="+type,"_blank");
			return false;
		});
			
	}
	if($("#HomeSkin2SearchSubmit").length>0)
	{
		$("#HomeSkin2SearchSubmit").click(function(){
			var keyword=$.trim($("#HomeSearchKeyword").val());
			if(keyword.length==0 || keyword=="请输入关键词...")
			{
				window.open(SiteWebUrl+"search/","_blank");
				return false;
			}
			var type=$("#SelectSkin2").val();
			window.open(SiteWebUrl+"search/list.aspx?word="+escape(keyword)+"&c="+type,"_blank");
			return false;
		});
	}
	
	
	if($("#HomeSearchSubmit").length>0)
	{
		$("#HomeSearchSubmit").click(function(){
			var keyword=$.trim($("#HomeSearchKeyword").val());
			if(keyword.length==0 || keyword=="请输入要搜索的关键词..." || keyword=="请输入关键词...")
			{
				window.open(SiteWebUrl+"search/","_blank");
				return false;
			}
			var type=$("#HomeSearchKeyword").attr("rel");
			window.open(SiteWebUrl+"search/list.aspx?word="+escape(keyword)+"&c="+type,"_blank");
			return false;
		});
			
	}
	if($("#ISL_Cont_1").length>0){
		PageWidth_1=168;
	}
	if($(".BrandContent").length>0){
		PageWidth_1=PageWidth_2;
	}
	var Agenttimer = null;
	function AgentAnimate(){
		if(Agenttimer == null){
			Agenttimer = setTimeout(AgentAnimate,3000);
			return false;
		}
		$('#Agenttelbox').animate({
			'top':'100px'
		},function(){
			$('#Agenttelbox li:last').clone().hide().prependTo('#Agenttelbox').fadeIn();
			$('#Agenttelbox li:last').remove();
			$('#Agenttelbox').css('top',0);
			if(Agenttimer!=undefined){clearTimeout(Agenttimer);}
			Agenttimer = setTimeout(AgentAnimate,3000);
		});
	}
	$('#Agenttelbox').hover(
		function(){
			clearTimeout(Agenttimer)
		},
		function(){
			if(Agenttimer!=undefined){clearTimeout(Agenttimer);}
			Agenttimer = setTimeout(AgentAnimate,3000);
		}
	);
	if($('#Agenttelbox').length>0)
		AgentAnimate();
	
	$(".AntHelpLeft").find("h5 a").each(function(){
		var obj=$(this);
		obj.click(function(){
			if($("#Ant_all_list"+obj.attr("rel")).css("display")=="block")
			{
				obj.addClass("icon_down");
				obj.removeClass("icon_up");
				$("#Ant_all_list"+obj.attr("rel")).hide();
			}
			else
			{
				$("#Ant_all_list"+obj.attr("rel")).show();
				obj.addClass("icon_up");
				obj.removeClass("icon_down");
			}
		});
	});
	
	
	if($(".AntStyle").length>0)
	{
		var nb=0;
		var href= $("#size-stylesheet").attr("href");
		var aa = href.indexOf("-");
		var bb = href.substring(aa+1,aa+2 );
		$(".AntStyle").find("a").each(function(){
			nb ++;
			$(this).removeClass("Current_"+nb);
			if(bb==nb)
				$(this).addClass("Current_"+nb);
		});
		var Theme = {
			cookieName: "Indexstyle",
			themeList: null,
			init: function(){
				if(document.getElementById('AntStyle')){
					Theme.themeList = document.getElementById('AntStyle');
					var list = Theme.themeList.getElementsByTagName('a');
					oThis = this;
					for( var i = 0; i < list.length; i++ ){
						(function(){
							var index = i + 1;
							list[index - 1].onclick = function(){
								oThis.setCss(index);
								oThis.setCurrent(index);
								oThis.setCookie(Theme.cookieName, index);
								return false;
							};
						})();
					}
				}
			},
			setCurrent: function(index){
				var number=0;
				$(".AntStyle").find("a").each(function(){
					number ++;
					$(this).removeClass("Current_"+number);
					if(index==number)
						$(this).addClass("Current_"+number);
				});
			},
			
			setCss: function(index){
				var href= $("#size-stylesheet").attr("href");
				var aa = href.indexOf("-");
				var bb = href.substring(aa+1,aa+2 );
				
				$("#indextopmenu1").removeClass("AntMenuHover_"+bb);
				$("#indextopmenu_").removeClass("AntNav_"+bb);
				$("#indextopmenu1").addClass("AntMenuHover_"+index);
				$("#indextopmenu_").addClass("AntNav_"+index);
				document.getElementById('size-stylesheet').href = href.replace(bb,index)  ;
			},
			
			getCookie: function(name){
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr != null) return unescape(arr[2]); return null;
			},
			setCookie: function	(name,value)
			{   
				  var Days = 30; //此 cookie 将被保存 30 天
				  var exp  = new Date();    //new Date("December 31, 9998");
				  exp.setTime(exp.getTime() + Days*24*60*60*1000);
				  document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString()+";path=/" ;
			}   
		}
		Theme.init();
	}
	$(".close_t_tuan").click(function(){
		$("#tuangouright").hide();
	});
	if($_D("dialogHouselogin1")){
		$.formValidator.initConfig({formid:"dialogHouselogin1",errorfocus:false,onerror:function(msg){},onsuccess:function(){
			$("#loginSubmit").attr("disabled", true); //设置为不可点
			$("#loginSubmit").val("处理中…");
			var SAction= $("#SAction").val();
			$.ajax({
				url : "InfoLogin.aspx?action=check&password="+$("#txtuserpwd").val()+"&InfoID="+$("#InfoID").val(),
				cache: false,
				async: false,
				dataType:'text',
				success:function(data)
				{
					if( data.indexOf("success")==-1 )
					{
						alert("对不起，您输入的管理密码不正确，请重新输入。");
						$("#loginSubmit").attr("disabled", false); //设置为不可点
						$("#loginSubmit").val("下一步");
						return false;
					}
					else
					{
						if(SAction=="del")
						{
							data =data.replace("success","")
							if(confirm("此操作不可逆，您确认要删除此信息吗？"))
							{
								$.ajax({
									url : "InfoLogin.aspx?action=delete&password="+$("#txtuserpwd").val()+"&InfoID="+$("#InfoID").val(),
									cache: false,
									async: false,
									dataType:'text',
									success:function(data)
									{
										alert("删除成功，将为您跳转到首页。");
										window.parent.location.href=$("#gotourl").val();	
									}
								});
							}
						}
						else
						{
							data =data.replace("success","")
							data = data.substring(0,data.indexOf("<!DOCTYPE"));
							if($("#SaleTypeID").val()=="0"){
								window.parent.location.href=SiteWebUrl+"Account/MemberHouseRentEdit.aspx?sale"+data;	
							}
							else{
								window.parent.location.href=SiteWebUrl+"Account/MemberHouseSaleEdit.aspx?sale"+data;	
							}
						}
						return false;
					}
				}
			});
			return false;
		}});
		$.formValidator.getInitConfig("1").wideword = true;
		$("#txtuserpwd").formValidator({onshow:"&nbsp;",onfocus:"请输入管理密码。",oncorrect:"&nbsp;"}).inputValidator({min:6,max:32,onerror: "请正确输入管理密码。"})
	}
	if($_D("dialogInfologin1")){
		$.formValidator.initConfig({formid:"dialogInfologin1",errorfocus:false,onerror:function(msg){},onsuccess:function(){
			$("#loginSubmit").attr("disabled", true); //设置为不可点
			$("#loginSubmit").val("处理中…");
			var SAction= $("#SAction").val();
			$.ajax({
				url : "InfoLogin.aspx?action=check&password="+$("#txtuserpwd").val()+"&InfoID="+$("#InfoID").val(),
				cache: false,
				async: false,
				dataType:'text',
				success:function(data)
				{
					if( data.indexOf("success")==-1 )
					{
						alert("对不起，您输入的管理密码不正确，请重新输入。");
						$("#loginSubmit").attr("disabled", false); //设置为不可点
						$("#loginSubmit").val("下一步");
						return false;
					}
					else
					{
						if(SAction=="del")
						{
							data =data.replace("success","")
							if(confirm("此操作不可逆，您确认要删除此信息吗？"))
							{
								$.ajax({
									url : "InfoLogin.aspx?action=delete&password="+$("#txtuserpwd").val()+"&InfoID="+$("#InfoID").val(),
									cache: false,
									async: false,
									dataType:'text',
									success:function(data)
									{
										alert("删除成功，将为您跳转到首页。");
										window.parent.location.href=$("#gotourl").val();	
									}
								});
							}
						}
						else
						{
							data =data.replace("success","")
							data = data.substring(0,data.indexOf("<!DOCTYPE"));
							window.parent.location.href="UserInfoEdit.aspx?"+data;	
						}
						return false;
					}
				}
			});
			return false;
		}});
		$.formValidator.getInitConfig("1").wideword = true;
		$("#txtuserpwd").formValidator({onshow:"&nbsp;",onfocus:"请输入管理密码。",oncorrect:"&nbsp;"}).inputValidator({min:6,max:32,onerror: "请正确输入管理密码。"})
	}
	
	$("#Skin2Left").find("a").each(function(){
		var obj=$(this);
		obj.mouseover(function(){
			$("#Skin2Left").find("a").each(function(){
				$(this).removeClass("Current")									
			});	
			obj.addClass("Current")	
			for(var mm=1;mm<4;mm++){
				if( mm == obj.attr("rel") )
					$("#Skin2Left"+mm).show();
				else
					$("#Skin2Left"+mm).hide();
			}
		});
	});
	$("#Skin2Right").find("a").each(function(){
		var obj=$(this);
		obj.mouseover(function(){
			$("#Skin2Right").find("a").each(function(){
				$(this).removeClass("Current")									
			});	
			obj.addClass("Current")	
			for(var mm=1;mm<4;mm++){
				if( mm == obj.attr("rel") )
					$("#Skin2Right"+mm).show();
				else
					$("#Skin2Right"+mm).hide();
			}
		});
	});
	$("#Skin2-NewsTab").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin2-NewsTab").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("Current");
					if($("#Floating"+$(this).attr("rel")).css("display")=="block")
						$("#Floating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("Current");
					if($("#Floating"+obj.attr("rel")).css("display")=="none")
						$("#Floating"+obj.attr("rel")).show();	
				}
			});
		});
	});
	$("#Skin2InfoTable").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin2InfoTable").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("Current");
					$("#InfoFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("Current");
					$("#InfoFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin4InfoTable").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin4InfoTable").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("cu");
					$("#InfoFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("cu");
					$("#InfoFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin2-HouseTab").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin2-HouseTab").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("Current");
					$("#HouseFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("Current");
					$("#HouseFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin4-HouseTab").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#HouseMoreButton").html("更多"+$(this).html());
			$("#HouseMoreButton").attr("href",$(this).attr("href"));
			$("#Skin4-HouseTab").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("cu");
					$("#HouseFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("cu");
					$("#HouseFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin2-BuildTab").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin2-BuildTab").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("Current");
					$("#BuildFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("Current");
					$("#BuildFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin3-BuildTab").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin3-BuildTab").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("c");
					$("#BuildFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("c");
					$("#BuildFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin2-ShopTable").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin2-ShopTable").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("Current");
					$("#ShopFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("Current");
					$("#ShopFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin3-ShopTable").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin3-ShopTable").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("c");
					$("#ShopFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("c");
					$("#ShopFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin4-ShopTable").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin4-ShopTable").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("cu");
					$("#ShopFloating"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("cu");
					$("#ShopFloating"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin2-BbsNews").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin2-BbsNews").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("Current");
					$("#SiteForumList"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("Current");
					$("#SiteForumList"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	$("#Skin3-BbsNews").find("li").each(function(){
		$(this).mouseover(function(){
			var obj=$(this);
			$("#Skin3-BbsNews").find("li").each(function(){
				if( $(this).attr("rel")!=obj.attr("rel") )
				{
					$(this).removeClass("c");
					$("#SiteForumList"+$(this).attr("rel")).hide();
				}
				else
				{
					obj.addClass("c");
					$("#SiteForumList"+obj.attr("rel")).show();	
				}
			});
			
		});
	});
	if($("#WeatherShow").length>0)
		$("#WeatherShow").attr("src",WeatherShow);
});

function ShowImageScroll(obj)
{
	obj.find("img").each(function(){
		if($(this).attr("src") != $(this).attr("init_src"))
			$(this).attr("src") = $(this).attr("init_src");
	});							
}
function AntNewScroll()
{
	(function() {
		var box = GetObj('AntNew'),
		h = 20,
		go = 1,
		retimeout,
		retime = function() {
			retimeout = setTimeout(function() {
				go = 1;
			},
			1000);
		},
		stopTime = function() {
			clearTimeout(retimeout);
			retimeout = null;
		};
		box.innerHTML += box.innerHTML;
		box.onmouseover = function() {
			go = 0;
		};
		box.onmouseout = function() {
			go = 1
		};
	
		new
		function() {
			var stop = (box.scrollTop % h == 0) && !go;
			if (!stop)(box.scrollTop == +(box.scrollHeight / 2)) ? box.scrollTop = 0 : box.scrollTop++;
			setTimeout(arguments.callee, (box.scrollTop % h) ? 10 : 1500);
		};
	})();
}
function AntHomeNewScroll()
{
	(function() {
		var box = GetObj('AntTopNewScroll'),
		h = 26,
		go = 1,
		retimeout,
		retime = function() {
			retimeout = setTimeout(function() {
				go = 1;
			},
			1000);
		},
		stopTime = function() {
			clearTimeout(retimeout);
			retimeout = null;
		};
		box.innerHTML += box.innerHTML;
		box.onmouseover = function() {
			go = 0;
		};
		box.onmouseout = function() {
			go = 1
		};
	
		new
		function() {
			var stop = (box.scrollTop % h == 0) && !go;
			if (!stop)(box.scrollTop == +(box.scrollHeight / 2)) ? box.scrollTop = 0 : box.scrollTop++;
			setTimeout(arguments.callee, (box.scrollTop % h) ? 10 : 1500);
		};
	})();
}
function LoadUserLogin()
{
	$.ajax({
	  url: "/public/ajax.aspx?action=CheckUserLogin",
	  cache: false,
	  success:function(data)
	  {
		  if(data.length>0)
		  {
			 $("#TopUserName").html(data);
			 $("#AntUserLogin2").show();
			 $("#AntUserLogin1").hide();
			 if($("#LoginUserSpan").length>0)
			 {
				 $("#LoginUserSpan").html("");
				 $("#Anonymous").html("");
			 }
		  }
		  else{
			 $("#AntUserLogin2").hide();
			 $("#AntUserLogin1").show();
		  }
	  }
	});	
}
function GetUrlParms()    
{
    var args=new Object();   
    var query=location.search.substring(1);//获取查询串   
    var pairs=query.split("&");//在逗号处断开   
    for(var   i=0;i<pairs.length;i++)   
    {   
        var pos=pairs[i].indexOf('=');//查找name=value   
            if(pos==-1)   continue;//如果没有找到就跳过   
            var argname=pairs[i].substring(0,pos);//提取name   
            var value=pairs[i].substring(pos+1);//提取value   
            args[argname]=unescape(value);//存为属性   
    }
    return args;
}
function GetObj(objName){
	if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}
}

function AutoPlay_1(){
	clearInterval(autoPlayObj_1);
	autoPlayObj_1=setInterval('ISL_GoDown_1();ISL_StopDown_1();',3000)
}

function ISL_GoUp_1(){
	if(moveLock_1)return;
	clearInterval(autoPlayObj_1);
	moveLock_1=true;
	moveWay_1="left";
	moveTimeObj_1=setInterval('ISL_ScrUp_1();',speed_1);
}

function ISL_StopUp_1(){
	var width=PageWidth_1;
	
	if(moveWay_1 == "right"){return};
	clearInterval(moveTimeObj_1);
	if((GetObj('ISL_Cont_1').scrollLeft-fill_1)%width!=0){
	comp_1=fill_1-(GetObj('ISL_Cont_1').scrollLeft%width);
	CompScr_1()}else{moveLock_1=false}
	AutoPlay_1()
}

function ISL_ScrUp_1(){
if(GetObj('ISL_Cont_1').scrollLeft<=0){GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft+GetObj('List1_1').offsetWidth}
GetObj('ISL_Cont_1').scrollLeft-=space_1
}

function ISL_GoDown_1(){
	clearInterval(moveTimeObj_1);
	if(moveLock_1)return;
	clearInterval(autoPlayObj_1);
	moveLock_1=true;
	moveWay_1="right";
	ISL_ScrDown_1();
	moveTimeObj_1=setInterval('ISL_ScrDown_1()',speed_1)
}

function ISL_StopDown_1(){
	var width=PageWidth_1;
	
	if(moveWay_1 == "left"){return};
	clearInterval(moveTimeObj_1);
	if(GetObj('ISL_Cont_1').scrollLeft%width-(fill_1>=0?fill_1:fill_1+1)!=0){
		comp_1=width-GetObj('ISL_Cont_1').scrollLeft%width+fill_1;
		CompScr_1()
	}
	else{moveLock_1=false}
	AutoPlay_1()
}

function ISL_ScrDown_1(){
	if(GetObj('ISL_Cont_1').scrollLeft>=GetObj('List1_1').scrollWidth){GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft-GetObj('List1_1').scrollWidth}
	GetObj('ISL_Cont_1').scrollLeft+=space_1
}

function CompScr_1(){
	var width=PageWidth_1;
	if(comp_1==0){moveLock_1=false;return}
	var num,TempSpeed=speed_1,TempSpace=space_1;
	if(Math.abs(comp_1)<width/2){
		TempSpace=Math.round(Math.abs(comp_1/space_1));
		if(TempSpace<1){TempSpace=1}
	}
	if(comp_1<0){
		if(comp_1<-TempSpace){
			comp_1+=TempSpace;
			num=TempSpace
		}
		else{num=-comp_1;comp_1=0}
		GetObj('ISL_Cont_1').scrollLeft-=num;
		setTimeout('CompScr_1()',TempSpeed)
	}	
	else{if(comp_1>TempSpace){comp_1-=TempSpace;num=TempSpace}
	else{num=comp_1;
	comp_1=0}
	GetObj('ISL_Cont_1').scrollLeft+=num;
	setTimeout('CompScr_1()',TempSpeed)}
}
function LoginOverState(flag,remeber)
{
	if(flag==0 || flag==3  || flag ==4   || flag ==8  || flag==9 )  //分类信息页面  3表示新闻频道  4 房产频道   9头部的
		window.location.href=SiteWebUrl+"Account/MemberLoginOver.aspx?flag="+escape(remeber)+"&from="+escape(window.location.href)+"";
	else if(flag==1)
		window.location.href='MemberLoginOver.aspx?flag='+escape(remeber);
	else if(flag==2 )
	{
		window.location.href='DialogLoginOver.aspx?flag='+escape(remeber);
	}
	else if(flag==5  ) //5团购频道
	{
	  window.location.href='TuanLoginOver.aspx?flag='+escape(remeber);
	}
	else if(flag==6  ) //6 招聘频道的
	{
		CreateCookie("oldsubmit","");
		window.location.href=SiteWebUrl+"Account/MemberLoginOver.aspx?flag="+escape(remeber)+"&from="+escape(window.location.href)+"";
		//ShowDailog('登录成功',300,200,'JobLoginOver.aspx?flag='+escape(remeber),'true','AntJobInviteBg.gif','AntTuanclose.gif','AntUserLogin.gif','fff5ca','F6F9FF','d11c4d','d11c4d');
	}
	else if(flag==5  ) //5团购频道
	{
	  window.location.href='TuanLoginOver.aspx?flag='+escape(remeber);;
	}
	else if(flag==7  ) //7招聘频道的。弹出窗口的
	{
		window.location.href='JobLoginOver.aspx?flag='+escape(remeber);;
	}	
}
function WebLoginCheck(username,userpwd,usercode,remeber,tt)
{
	var gourl="http://"+tt+"/public/ajax.aspx?action=login&script=1";
	gourl +="&chrname="+escape(username);
	gourl +="&chrpwd="+escape(userpwd);
	gourl +="&chrcode="+escape(usercode);
	gourl +="&flag="+escape(remeber);
	gourl +="&time="+new Date();
	var   fr=document.createElement("IFRAME")   
	fr.height=0;   
	fr.width=0   
	fr.src=gourl;  
	document.body.appendChild(fr) ;
}

function AntLoginUsers(username,userpwd,usercode,remeber,flag){
	
	var curl="/public/ajax.aspx?action=login";
	curl +="&chrname="+escape(username);
	curl +="&chrpwd="+escape(userpwd);
	curl +="&chrcode="+escape(usercode);
	curl +="&flag="+escape(remeber);
	$.ajax({
		  url: curl,
		  cache: false,
		  success:function(data)
		  {
			  if(data=="1")
			  {
				  //因为短域名影响跨域登录处理
				  /*if(window.location.href.toLowerCase().indexOf(".26.ca")!=-1)
				  {
						WebLoginCheck(username,userpwd,usercode,remeber,"26.ca");
						setTimeout('LoginOverState(\"'+ flag +'\",\"'+ remeber + '\")',1000)
				  }
				  else  if(window.location.href.toLowerCase().indexOf(".qz.cm")!=-1)
				  {
						WebLoginCheck(username,userpwd,usercode,remeber,"qz.cm");
						setTimeout('LoginOverState(\"'+ flag +'\",\"'+ remeber + '\")',1000)
				  }
				  else{*/
					  LoginOverState(flag,remeber);
				  /*}*/
			  }
			  else{
				  if(flag==0){
					  $("#InfoAccountButton").attr("disabled", false); //设置为可点  ，分类信息页面
				  }
				  else if(flag==1){
						$("#InfoAccountLoginSubmit").attr("disabled", false); //设置为可点   单独的登录页面
					 	$(".but").removeClass("act");
				  }
				  else if(flag==2){
						$("#loginSubmit").attr("disabled", false); //设置为可点   浮动
						$("#loginSubmit").val("登录");  
				  }
				  else if(flag==3){
						$("#NewsAccountButton").attr("disabled", false); //新闻频道的
				  }
				  else if(flag==4){
						$("#HouseAccountButton").attr("disabled", false); //房产频道的
				  }
				  else if(flag==5){
						$("#loginSubmit").attr("disabled", false); //团购频道的
				  }
				  else if(flag==6){
						$("#JobAccountButton").attr("disabled", false); //团购频道的
				  }
				  else if(flag==7){
						$("#loginSubmit").attr("disabled", false); //招聘频道的
				  }
				  else if(flag==8){
						$("#CompanyAccountButton").attr("disabled", false); //招聘频道的
				  }
				  else if(flag==9){
						$("#LoginButton").attr("disabled", false); //首页登录的
				  }
				  alert(data);
			  }
		  }
	});	
}
function JubaoSale(SaleID){
	var curl="/public/ajax.aspx?action=jubaosale";
	curl +="&title="+escape($("input[name='submittype']:checked").val());
	curl +="&SaleID="+escape(SaleID);
	$.ajax({
		  url: curl,
		  cache: false,
		  success:function(data)
		  {
			  if(data=="1")
			  {
					alert("举报成功，感谢您的使用，我们马上对房源进行检查！");
					window.parent.closeopendiv();
			  }
			  else{
					alert(data);
			  }
		  }
	});	
	return false;
}
function JubaoInfo(InfoID){
	var cates = document.getElementsByName("Category");
    var content = document.getElementById("txtContent").value;
    if (cates.length == 0) {
        alert("请选择一个举报类别!");
        return false;
    }
    else {
        var j = false;
        for (var i = 0; i < cates.length; i++) {
            if (cates[i].checked) {
                j = true;
                break;
            }
            else {
                continue;
            }
        }
        if (j == false) {
            alert("请选择一个举报类别!");
            return false;
        }
    }
    if (content = "" || content == "请在此输入补充说明") {
        alert("请输入举报理由！");
        return false;
    }
	var curl="/public/ajax.aspx?action=jubaoinfo";
	curl +="&title="+escape($("input[name='Category']:checked").val());
	curl +="&content="+escape($("#txtContent").val());
	curl +="&InfoID="+escape(InfoID);
	$.ajax({
		  url: curl,
		  cache: false,
		  success:function(data)
		  {
			  if(data=="1")
			  {
					alert("举报成功，感谢您的使用！");
					window.parent.closeopendiv();
			  }
			  else{
					alert(data);
			  }
		  }
	});	
	return false;
}
function RegisterOverState(tt)
{
   if(tt==0){
	  window.location.href="MemberSuccess.aspx";
  }
  else  if(tt==1){  //分类信息弹出登录
	 window.location.href="DialogRegOver.aspx";
  }
  else  if(tt==2){//2团购频道的
	 window.location.href='TuanRegisterOver.aspx?gg='+$("input[name='checkbox']:checked").val();
  }
  else  if(tt==3){  //招聘页面
	 window.location.href="JobRegisterOver.aspx";
  }	
}
function AntRegesterUsers(tt){
	if(tt==0){
		$("#AntRegSubmit").attr("disabled","true");
		var args = new Object();
		args = GetUrlParms();
		value = args["t"] 
	}
	else if(tt==1){
		$("#registerSubmit").attr("disabled","true");
		$("#registerSubmit").attr("value","加载中……");
	}
	else if(tt==2){  //2团购频道的
		$("#TuanRegisterSubmit").attr("disabled","true");
	}
	else if(tt==3){  //3招聘频道的
		$("#LoginSubmit").attr("disabled","true");
	}
	var curl="/public/ajax.aspx?action=register";
	curl +="&chrname="+escape($("#AntRegUserName").val());
	curl +="&chrpwd="+escape($("#AntRegUserPwd").val());
	curl +="&chrpwd1="+escape($("#AntRegUserPwd_").val());
	curl +="&chremail="+escape($("#AntRegUserEmail").val());
	if($_D("AntRegUserMobile"))
		curl +="&chrtel="+escape($("#AntRegUserMobile").val());
	else
		curl +="&chrtel=";
	if($_D("AntRegUserQQ"))
		curl +="&chrqq="+escape($("#AntRegUserQQ").val());
	else 
		curl +="&chrqq=";
	curl +="&chrquestion="+escape($("#AntRegQuestion").val());
	curl +="&chrcode="+escape($("#AntRegUserCode").val());
	if(tt==0){
		curl +="&t="+value;
	}
	else{
		curl +="&t="+$("input[name='AntRegStyleid']:checked").val();
	}
	$.ajax({
		  url: curl,
		  cache: false,
		  success:function(data)
		  {
			  if(data=="1")
			  {
				   //因为短域名影响跨域登录处理
				  if(window.location.href.toLowerCase().indexOf(".26.ca")!=-1)
				  {
						WebLoginCheck($("#AntRegUserName").val(),$("#AntRegUserPwd").val(),"","");
						setTimeout('RegisterOverState(\"'+tt+'\")',1000)
				  }
				  else{
					  RegisterOverState(tt);
				  }
			  }
			  else{
				   if(tt==0){
					$("#AntRegSubmit").attr("disabled",false);
				  }
				  else if(tt==1){
					$("#registerSubmit").attr("disabled",false);
					$("#registerSubmit").attr("value","同意注册");
				  }
				  else if(tt==2){  //2团购频道的
					$("#TuanRegisterSubmit").attr("disabled",false);
				  }
				  else if(tt==3){  //3招聘频道的
					$("#LoginSubmit").attr("disabled",false);
				  }
		 		  alert(data);
			  }
		  }
	});	
}
function sharewbSina(ctrl, url, title, windowstyle, appkey, pic) {
	$(ctrl).bind("click",
	function() {
		var linkurl = 'http://v.t.sina.com.cn/share/share.php?appkey=' + appkey + '&url=' + url + '&title=' + encodeURIComponent(title) + '&pic=' + encodeURIComponent(pic);
		if (typeof(windowstyle) == 'undefined') windowstyle = 'width=615,height=505';
		window.open(linkurl, '_blank', windowstyle);
		return false
	})
}
function sharewb163(ctrl, url, title, windowstyle, appkey, content) {
	$(ctrl).bind("click",
	function() {
		var linkurl = 'http://t.163.com/article/user/checkLogin.do?link=' + url + '&source=' + encodeURIComponent(appkey) + '&info=' + encodeURIComponent(content) + ' ' + encodeURIComponent(url) + '&' + new Date().getTime();
		if (typeof(windowstyle) == 'undefined') windowstyle = 'width=549,height=325';
		window.open(linkurl, '_blank', windowstyle);
		return false
	})
}
function sharerenren(ctrl, url, title, windowstyle, appkey, content) {
	$(ctrl).bind("click",
	function() {
		var linkurl = 'http://share.renren.com/share/buttonshare?link=' + url + '&title=' + encodeURIComponent(title) + '&' + new Date().getTime();
		if (typeof(windowstyle) == 'undefined') windowstyle = 'width=626,height=436';
		window.open(linkurl, '_blank', windowstyle);
		return false
	})
}
function shareqq(ctrl, url, title, windowstyle, appkey, content) {
	$(ctrl).bind("click",
	function() {
		var linkurl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&' + new Date().getTime();
		if (typeof(windowstyle) == 'undefined') windowstyle = '';
		window.open(linkurl, '_blank', windowstyle);
		return false
	})
}
function sharesohuwb(ctrl, url, title, windowstyle, appkey, content, pic) {
	$(ctrl).bind("click",
	function() {
		var linkurl = 'http://t.sohu.com/third/post.jsp?&url=' + url + '&title=' + encodeURIComponent(title) + '&content=utf-8&pic=' + encodeURIComponent(pic) + '&' + new Date().getTime();
		if (typeof(windowstyle) == 'undefined') windowstyle = 'width=660,height=470';
		window.open(linkurl, '_blank', windowstyle);
		return false
	})
}
function share_kaixin(ctrl, url, title, windowstyle, appkey, content)
{
	$(ctrl).bind("click",
	function() {
		var linkurl = 'http://www.kaixin001.com/repaste/share.php?rtitle=' + encodeURIComponent(title) + '&rurl=' + encodeURIComponent(url) + '&rcontent='+encodeURIComponent(content);
		if (typeof(windowstyle) == 'undefined') windowstyle = '';
		window.open(linkurl);
		return false;
	})
}
function share_douban(ctrl, url, title, windowstyle, appkey, content)
{
	$(ctrl).bind("click",
	function() {
		var linkurl = 'http://www.douban.com/recommend/?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
		if (typeof(windowstyle) == 'undefined') windowstyle = '';
		window.open(linkurl);
		return false;
	})
}
function share139(ctrl, url, title, windowstyle, appkey, content) {
    $(ctrl).bind("click",
    function() {
        var linkurl = 'http://www.139.com/share/share.php?tl=953010046&source=shareto139_58&title=' + encodeURIComponent(title) + '&url=' + url + '&' + new Date().getTime();
        if (typeof(windowstyle) == 'undefined') windowstyle = 'width=490,height=340';
        window.open(linkurl, '_blank', windowstyle);
        return false
    })
}
function sharesohuwhite(ctrl, url, title, windowstyle, appkey, content) {
    $(ctrl).bind("click",
    function() {
        var linkurl = 'http://bai.sohu.com/share/blank/addbutton.do?link=' + url + '&title=' + encodeURIComponent(title) + '&' + new Date().getTime();
        if (typeof(windowstyle) == 'undefined') windowstyle = 'width=480,height=340';
        window.open(linkurl, '_blank', windowstyle);
        return false
    })
}
function sharechouti(ctrl, url, title) {
    $(ctrl).bind("click",
    function() {
        var linkurl = 'http://dig.chouti.com/digg.action?newsURL=' + url + '&title=' + encodeURIComponent(title) + '&' + new Date().getTime();
        window.open(linkurl, '_blank');
        return false
    })
}
function shareqqwb(ctrl, url, title) {
    $(ctrl).bind("click",
    function() {
        var linkurl = 'http://v.t.qq.com/share/share.php?url=' + url + '&source=1000007&site=' + encodeURIComponent('') + '&title=' + encodeURIComponent(title) + '&' + new Date().getTime();
        window.open(linkurl, '_blank');
        return false
    })
}
function ShowAjaxPage(curl,obj){
	$.ajax({
		  url: curl,
		  cache: false,
		  success:function(data)
		  {
			  $("#"+obj).html(data);
		  }
	});	
}
function ReturnCHA(varNumber){
	if (varNumber.toFixed)
	{ 
		varNumber = varNumber.toFixed(2); 
	}
	else  //浏览器不支持toFixed()就使用其他方法
	{
		 var div = Math.pow(10,2);
		varNumber = Math.round(varNumber * div) / div;
	} 
	return parseFloat(varNumber);
}
Date.prototype.format = function(format)
{
 var o = {
  "M+" :  this.getMonth()+1,  //month
  "d+" :  this.getDate(),     //day
  "h+" :  this.getHours(),    //hour
      "m+" :  this.getMinutes(),  //minute
      "s+" :  this.getSeconds(), //second
      "q+" :  Math.floor((this.getMonth()+3)/3),  //quarter
      "S"  :  this.getMilliseconds() //millisecond
   }
  
   if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
   }
 
   for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
   }
 return format;
}
function invokeClick(element) {
	if(element)
	{
		if($.browser.mozilla){
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			element.dispatchEvent(evt);
		}
		else
		{
			element.click();
		}
	}
}
function _onChange()
{
    !timer&&(timer=setTimeout(_load, delay));
}
function _isVisible(e)
{
	var offset=0;
	if( typeof( window.pageYOffset ) == 'number' ) {
		offset	= window.pageYOffset;
	} else if( document.body && document.body.scrollTop ) {
		offset	= document.body.scrollTop;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		offset	= document.documentElement.scrollTop;
	}
 
    var bottom = offset + doc_element.clientHeight;
    var eOffsetTop = e.offsetTop;
    while(e=e.offsetParent)
    {
        eOffsetTop+=e.offsetTop;
    }
    return eOffsetTop<=bottom;
}
 
function _load(force)
{
    if(count<1)
    {
        if(window.removeEventListener){
            window.removeEventListener('scroll',_onChange,false);
            window.removeEventListener('resize',_onChange,false);
        }else if(window.detachEvent){
            window.detachEvent('onscroll',_onChange);
            window.detachEvent('onresize',_onChange);
        }else{
            return false;
        }
        return;
    }
    for(var i=0,j=elems.length; i<j; i++)
    {
        if(!elems[i]){
            continue;
        }
        if(_isVisible(elems[i])){
            elems[i].src = elems[i].getAttribute(init_src_def);
            delete elems[i];
            count--;
        }
    }
    timer=0;
}
function checknumber(str)
{
	var re = /^[1-9]+[0-9]*]*$/;   // 整数
	if (!re.test(str))
    {
		return false;
	}
	else{
		return true;	
	}
}
function init()
{
    /*doc_body=document.body;
    doc_element=document.compatMode=='BackCompat'?doc_body:document.documentElement;
    var tagNames = arr_df_tag;
    timer=0;
    elems=[];
    count=0;
    for(var i=0,j=tagNames.length;i<j;i++)
    {
        var es = document.getElementsByTagName(tagNames[i]);
        for(var n=0,m=es.length; n<m; n++)
        {
            if(typeof es[n]=='object' && es[n].getAttribute(init_src_def)){
                elems.push(es[n]);
                count++;
            }
        }
    }
    if(window.addEventListener){
        window.addEventListener('scroll',_onChange,false);
        window.addEventListener('resize',_onChange,false);
    }else if(window.attachEvent){
        window.attachEvent('onscroll',_onChange);
        window.attachEvent('onresize',_onChange);
    }
    _load();*/
}
function AddFavorite(sURL, sTitle) {  
    try {   
        window.external.addFavorite(sURL, sTitle);   
    } catch (e) {   
        try {   
            window.sidebar.addPanel(sTitle, sURL, "");   
        } catch (e) {   
            alert("加入收藏失败，请使用Ctrl+D进行添加");   
        }   
    }   
}   
function SetHome(obj,vrl){
	 if (window.sidebar) 
    {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
        }
        catch (e)
        {
            alert("此操作被浏览器拒绝！n请在浏览器地址栏输入“about:config”并回车n然后将[signed.applets.codebase_principal_support]设置为true"); 
        }

        var prefs =  Components.classes["@mozilla.org/preferences-service;1"].getService( Components.interfaces.nsIPrefBranch );
        prefs.setCharPref("browser.startup.homepage",vrl);
    }
    else if(document.all)
    {
        document.body.style.behavior="url(#default#homepage)";
        document.body.setHomePage(vrl);
    }
    else
    {
    }
}

/*两个时间对比*/
function compare_time(a,b) {
   var arr=a.split("-");
   var starttime=new Date(arr[0],arr[1],arr[2]);
   var starttimes=starttime.getTime(); 
   var arrs=b.split("-"); 
   var endtime=new Date(arrs[0],arrs[1],arrs[2]);
   var endtimes=endtime.getTime();
   if(starttimes>endtimes)//开始大于结束
   {
     return false;
   } 
   else{ 
    return true; 
   }
}
/*输出字符串替换，用于广告内容输出*/
String.prototype.replaceAll = function(str1,str2){
  var regS = new RegExp(str1,"gi");
  return this.replace(regS,str2);
}
/*顶部搜索，模仿下拉*/
function SetTopSelectTypeid(aa,bb,cc,dd)
{
	var str="<a href='javascript:;' >"+aa+"</a>";
	$("#TopSelectTypeid").html(str);
	$("#"+cc).hide();
	$("#"+dd).val(bb);
}
function getFullYear(d){// 修正firefox下year错误
	yr=d.getYear();if(yr <1000)
	yr+=1900;return yr;
}
jQuery.fn.imageScroller = function(params) {
    var p = params || {
        next: "buttonNext",
        prev: "buttonPrev",
        frame: "viewerFrame",
        child: "a",
        auto: true
    };
    var _btnNext = $("#" + p.next);
    var _btnPrev = $("#" + p.prev);
    var _imgFrame = $("#" + p.frame);
    var _child = p.child;
    var _auto = p.auto;
    var _itv;

    var turnLeft = function() {
        _btnPrev.unbind("click", turnLeft);
        autoStop();
        _imgFrame.animate({ marginLeft: -95 }, 'fast', '', function() {
            _imgFrame.find(_child + ":first").appendTo(_imgFrame);
            _imgFrame.css("marginLeft", 0);
            _btnPrev.bind("click", turnLeft);
            autoPlay();
        });
    };

    var turnRight = function() {
        _btnNext.unbind("click", turnRight);
         autoStop();
        _imgFrame.find(_child + ":last").clone().show().prependTo(_imgFrame);
        _imgFrame.css("marginLeft", -95);
        _imgFrame.animate({ marginLeft: 0 }, 'fast', '', function() {
            _imgFrame.find(_child + ":last").remove();
            _btnNext.bind("click", turnRight);
            autoPlayRight();
        });
    };

    _btnNext.css("cursor", "hand").click(turnRight);
    _btnPrev.css("cursor", "hand").click(turnLeft);

    var autoPlay = function() {
        _itv = window.setInterval(turnLeft, 3000);
    };
	var autoPlayRight = function() {
        _itv = window.setInterval(turnRight, 3000);
    };
    var autoStop = function() {
        window.clearInterval(_itv);
    };
    if (_auto) autoPlay();
};
function CompanyMobanCreate(aa)
{
	$.ajax({
	  url: "../public/ajax.aspx?action=editcompanymoban&aa="+escape(aa),
	  cache: false,
	  success:function(data)
	  {
		  if(data==1)
		  {
			 alert("模板设置成功，您可以刷新您的企业站预览效果！");
		  }
		  else{
			alert(data);
		  }
	  }
	});	
}
/*修改一句话招聘求职*/
function checkeditjobword()
{
	var WordTitle=$("#txtWordTitle").val();
	var WordMan=$("#txtWordMan").val();
	var WordTel=$("#txtWordTel").val();
	var WordPwd=$("#txtWordPwd").val();
	var WordMark=$("#txtWordMark").val();
	var WordID=$("#txtWordID").val();
	if(WordTitle.length>250 || WordTitle.length<2)
	{
		alert("对不起，职位名称为2至250字之间！");
		$("#txtWordTitle").focus();
		return false;
	}
	if(WordMan.length<2 )
	{
		alert("对不起，请输入联系人！");
		$("#txtWordMan").focus();
		return false;
	}
	if(WordTel.length<5  )
	{
		alert("对不起，请输入您的联系方式！");
		$("#txtWordTel").focus();
		return false;
	}
	if(WordPwd.length>20 || WordPwd.length<5 )
	{
		alert("对不起，请输入您当时的管理密码，如果忘记了请联系网站客服！");
		$("#txtWordPwd").focus();
		return false;
	}
	if(WordMark.length>500 )
	{
		alert("对不起，简要说明为500字以内！");
		$("#txtWordMark").focus();
		return false;
	}
	var WordT = $("input[name='txtWordT']:checked").val();
	$.ajax({
	  url: "../public/ajax.aspx?action=editword&WordTitle="+escape(WordTitle)+"&WordMan="+escape(WordMan)+"&WordTel="+escape(WordTel)+"&WordPwd="+escape(WordPwd)+"&WordMark="+escape(WordMark)+"&WordID="+WordID+"&WordT="+WordT,
	  cache: false,
	  success:function(data)
	  {
		  if(data==1)
		  {
			 alert("操作成功！");
			 if(WordT=="2")
			 {
				 window.parent.location.href=window.parent.location.href;
			 }
			 else{
				 window.parent.closeopendiv();
			 }
		  }
		  else{
			alert(data);
		  }
	  }
	});	
	return false;
}

(function($) {
    $.fn.ieFixed = function(options) {
		var opts = $.extend({
            x: 0,
            y: 0
        }, options),
		isIe6 = ($.browser.msie && parseInt($.browser.version) == 6)?true:false;
        if (isIe6) {
			var $html =  $("html");
			($html.css("backgroundAttachment") !== "fixed") && ($html.css("backgroundAttachment", "fixed"));
			($html.css("backgroundImage")=="none") && ($html.css("backgroundImage", "url(about:blank)"));
        };
        return this.each(function() {
			var $this = $(this),_this = this;
			if (isIe6){
				$this.css("position", "absolute");
				_this.style.setExpression("left", 'eval(document.documentElement.scrollLeft + ' + opts.x + ') + "px"');
				_this.style.setExpression("top", 'eval(document.documentElement.scrollTop + ' + opts.y + ') + "px"');
			}else{
				$this.css("position", "fixed").css("top", opts.y).css("left", opts.x)
			};
        });
    };
})(jQuery);
(function($) {
	$.fn.AntFocus = function(options){
		var opts = $.extend({
			width:950,//默认宽度
			height:88,//默认高度
			triggerTime:200,//事件触发时间
			moveTime:3000,//循环移动时间间隔
			runtime:300,//动画执行时间
			startNum:0,//默认起始位置(0开始)
			loadTime:5000,
			evn:"mouseenter", //触发事件mouseenter click
			easing:"",//动画效果
			pic:null,
			picList:null,
			closeBut:null,
			num:null
		}, options);
		var _private = {
			len:function(i){//列表长度
				return i = (i<opts.picList.length && opts.startNum>=0)?i:0;
			},
			numHtml : function(i){//默认载入的html
				opts.startNum = (opts.startNum<opts.picList.length && opts.startNum>=0)?opts.startNum:0;
				for (var i = 0, len = opts.picList.length, numStr=i, numHtml = ""; i < len; i++){
					numStr +=1;
					if (opts.startNum == i){
						numHtml += "<li class=\"focus\"> <span></span> <a>"+numStr+"</a> </li>";
					}else{
						numHtml += "<li> <span></span> <a>"+numStr+"</a> </li>";
					};
				};
				return numHtml;
			},
			imgLoad:function (imglist,callback,time){//图片载入完成
				var i=0,j=0,len = imglist.length;
				imglist.each(function(){
					var _this = this;
					var imgLoad = new Image();
					imgLoad.onload = function(){
						imgLoad.onload = null;
						_this.src = imgLoad.src;
						i++;
					};
					imgLoad.src = _this.src;
				});
				var t = window.setInterval(function(){
					j++;
					//$("#msg").html(i);
					if (i==len || j*200>=time){
						window.clearInterval(t);
						callback();
					};
				},200);
			},
			move:function(i){//滚动
				this.t = window.setTimeout(function(){
					opts.num.find("li").eq(opts.startNum).removeClass("focus");
					opts.num.find("li").eq(i).addClass("focus");
					opts.startNum = i;
					if(opts.picList.find("img").css("width")>"500px"){
									opts.pic.animate({
									top:-i*opts.height
								},{
									duration:opts.runtime,
									easing: opts.easing
								});
						}else{
									opts.pic.animate({
									left:-i*opts.width
								},{
									duration:opts.runtime,
									easing: opts.easing
								});
								
							}
				},opts.triggerTime);
			},
			moveLoop:function(i){//循环滚动
				this.loop = window.setInterval(function(){
					i ++;
					i = _private.len(i);
					_private.move(i);
				},opts.moveTime);	
			},
			moveStop:function(){//停止滚动
				window.clearTimeout(this.t);
			},
			moveLoopStop:function(){//停止循环滚动
				window.clearTimeout(this.loop);
			}
		};
		return this.each(function(){
			var $this = $(this);
			//关闭
			opts.closeBut.bind("click",function(){
				_private.moveLoopStop();
				$this.remove();
				return false;
			});
			_private.imgLoad(opts.picList.find("img"),function(){
				if (opts.picList.length>1){
					if(opts.picList.find("img").css("width")>"500px"){
						opts.pic.css("top",-opts.startNum*opts.height)//设置默认位置
						}else{
							var ligeShu = opts.picList.find("img").length*300;
							opts.picList.parent().css("width",ligeShu);
							opts.picList.addClass("fl");
							opts.pic.css("left",-opts.startNum*opts.width)//设置默认位置
							}
					//opts.pic.append(opts.picList.eq(0).clone());//副本
					var html = _private.numHtml(opts.startNum),
						numList = opts.num.find("li");
					opts.num.html(html);
					_private.moveLoop(opts.startNum);
					//移进
					numList.live(opts.evn,function(){
						_private.moveLoopStop();
						_private.move($(this).index());
						
					});
					//移出
					numList.live("mouseleave",function(){
						_private.moveStop();
						_private.moveLoop(opts.startNum);
					});	
				};
			},opts.loadTime);
		});
	};
})(jQuery);

function ie6Fixed(obj, posT){
	document.getElementById(obj).style.top = document.documentElement.scrollTop + document.body.scrollTop  + posT + "px";
}

function gototop()
{
	var html = "<a href=\"javascript:;\" class='gotop' style=\"width:42px; height:50px; display:none; background-position:0 0;text-indent:-999em; overflow:hidden;\" id=\"goTop\">返回顶部</a>";
	$("body").append(html);
	var $goTop = $("#goTop");
	//hover
	$goTop.hover(function(){
		$goTop.css("background-position","-42px 0");
	},function(){
		$goTop.css("background-position","0 0");
	});
	//go top
	$goTop.click(function() {
		$('html,body').animate({
			scrollTop: 0
		},400);
		return false;
	});
	//scroll
	function BaseTop()
	{
		var pageTop = $(document).scrollTop() + $(window).height(),
			footerTop = $(".AntFooter").offset().top,
			X = $(window).width()-50,
			Y = (pageTop >= footerTop) ? footerTop - $(document).scrollTop() -70 : $(window).height() - 70;
		if ($(document).scrollTop()>130){
			$goTop.ieFixed({
				x: X,
				y: Y
			}).css("display", "block")
		}else{
			$goTop.hide();
		}	
	}
	$(window).resize(function() {
		BaseTop();
	});
	$(window).scroll(function() {
		BaseTop();
	});		
}