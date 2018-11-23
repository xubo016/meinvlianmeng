var timer,elems,count,delay=200,init_src_def='init_src',arr_df_tag=['img'],doc_body,doc_element;
var arrPic = [];
jQuery(function($){
	$(".AntClass-List").find(".on").each(function(){
		$(this).click(function(){
			var obj=$(this).find('ul');
			if(obj.css("display")=="none")
			{
				$(this).find('ul').fadeIn();
				$(this).addClass("default");
			}
			else{
				$(this).find('ul').fadeOut();
				$(this).addClass("default");
			}
		});
	});
	$("#topsearchkeyword").focus(function(){
		if($.trim(this.value) == "想要找什么宝贝？")
		{
			this.value = "";
		}
	}).blur(function(){
		if($.trim(this.value) == "")
		{
			this.value = "想要找什么宝贝？";
		}
	});
	$("#shoptopsearch").submit(function(){
		var aa=$("#Shophiddenvalue").val();
		var word=$.trim($("#topsearchkeyword").val());
		if( word.length==0   || word=="想要找什么宝贝？"){
			alert("请先选择您要搜索的条件！");	
			$("#topsearchkeyword").focus();
			return false;
		}
		var bb=aa.split(",");
		var url=$("#shopurl").val()+"ItemSearch.aspx?SearchKeyword="+escape(word);
		if(bb[0]=="0")
			var url=$("#shopurl").val()+encodeURIComponent("ItemSearch-0-0-0-0-0-0-0-0-0-S"+word+"S-p0"+bb[1]);
		window.open(url,"_self");
		return false;							   
	 });
	var now = new Date(),hour = now.getHours() 
	if(hour < 6){$("#AntHours").html("凌晨好！")} 
	else if (hour < 9){$("#AntHours").html("早上好！")} 
	else if (hour < 12){$("#AntHours").html("上午好！")} 
	else if (hour < 14){$("#AntHours").html("中午好！")} 
	else if (hour < 17){$("#AntHours").html("下午好！")} 
	else if (hour < 19){$("#AntHours").html("傍晚好！")} 
	else if (hour < 22){$("#AntHours").html("晚上好！")} 
	else {$("#AntHours").html("夜里好！")};
	
	if($("#mapContainer").length>0)
	{
		if (GBrowserIsCompatible()) {
			var map = new GMap2(document.getElementById("mapContainer"));
			if(addrs.length>0)
			{
				map.setCenter(new GLatLng(addrs[0].latitude, addrs[0].longitude), 14);
			}
			else{
				map.setCenter(new GLatLng(mapx,mapy), 14);
			}
			map.addControl(new GLargeMapControl())
			map.addControl(new GOverviewMapControl());
			map.addControl(new GScaleControl());
			map.enableDoubleClickZoom();
			map.enableScrollWheelZoom();
			map.enableContinuousZoom();
			var bounds = new GLatLngBounds(); 
			var markers = [], point , straddress = [];
			for (var i = 0, len = addrs.length; i < len; i++) {
				point = new GLatLng(addrs[i].latitude, addrs[i].longitude);
				var markerOptions = { icon:createMarker(i) };// 设置 GMarkerOptions 对象
				markers[i] = new GMarker(point,markerOptions);
				map.addOverlay(markers[i]);
				var str='<div style="padding:0 10px; width:300px;line-height:25px;text-align:left;">' + addrs[i].address + '<br />电话：' + addrs[i].phone;
				if(addrs[i].fax.replace("  ","").length>0)
					str+='<br />传真：' + addrs[i].fax ;
				if(addrs[i].Traffic.replace("  ","").length>0)
					str+='<br />交通指南：' + addrs[i].Traffic ;
				str +=  '</div>';
				straddress[i]= str;
				if(ditu=="0")
				{
					(function(i){
						markers[i].addEventListener("click", function(){
						   var infoWindow = new BMap.InfoWindow(straddress[i]);  // 创建信息窗口对象
						   this.openInfoWindow(infoWindow);  
						   map.setZoom(16);
						});
					})(i)
				}
				else
				{
					markers[i].bindInfoWindowHtml(str);
					(function(i){
						GEvent.addListener(markers[i],'click',function(p){
							map.setZoom(14);
							map.panTo(p);
						})
					})(i)
				}
				
				
				bounds.extend(point);
			}
		}	
	}
	$(".Ant-Evaluation").click(function(){
		var y=$(".AntContentForm").offset().top ;
		$(document.documentElement).animate({"scrollTop": y}, {duration:"slow"});								
	});
	if($("#stars2-input").length>0)
	{
		var Stars1 = new Stars("stars1")
		var Stars2 = new Stars("stars2")
		var Stars3 = new Stars("stars3")
	}
	if($("#shopxingyongcomentform").length>0)
	{
		$("#shopxingyongcomentform").submit(function(){
			var username = $.trim($("#AntUserName").val());							   
			var userpwd = $.trim($("#AntUserPwd").val());
			var content = $.trim($("#AntUserContent").val());
			var Code = $.trim($("#AntUserCode").val());
			var stars1 = $.trim($("#stars1-input").val());	
			var niming = $("input[name='AntNingming']:checked").val();
			var stars2 = $.trim($("#stars2-input").val());							   
			var stars3 = $.trim($("#stars3-input").val());	
			if(stars1=="0"){
				alert("对不起，请给店铺的服务打分！");
				return false;
			}
			if(stars2=="0"){
				alert("对不起，请给店铺的品质打分！");
				return false;
			}
			if(stars3=="0"){
				alert("对不起，请给店铺的性价比打分！");
				return false;
			}
			if(niming !="1" && $_D("AntUserName")){
				if(username.length==0)
				{
					alert("对不起，请输入您的用户名！");
					$("#AntUserName").focus();
					return false;
				}
				if(userpwd.length==0)
				{
					alert("对不起，请输入您的密码！");
					$("#AntUserPwd").focus();
					return false;
				}
			}
			if(Code.length==0)
			{
				alert("对不起，请输入验证码！");
				$("#AntUserCode").focus();
				return false;
			}
			if(content.length==0)
			{
				alert("对不起，请输入内容！");
				$("#AntUserContent").focus();
				return false;
			}
			var CompanyID=$("#CompanyHidden").val();
			var Shopid=$("#ShopHidden").val();
			var curl="/public/ajax.aspx?action=addshopcomment";
			curl +="&chrname="+escape(username);
			curl +="&chrpwd="+escape(userpwd);
			curl +="&Code="+escape(Code);
			curl +="&content="+escape(content);
			curl +="&CompanyID="+escape(CompanyID);
			curl +="&Shopid="+escape(Shopid);
			curl +="&stars1="+escape(stars1);
			curl +="&stars2="+escape(stars2);
			curl +="&stars3="+escape(stars3);
			curl +="&niming="+escape(niming);
			var typeid=$("input[name='commenttypeid']:checked").val();
			curl +="&typeid="+escape(typeid);
			//window.open(curl);
			//return false;
			$.ajax({
				  url: curl,
				  cache: false,
				  success:function(data)
				  {
					  curl = window.location.href;
					  if( curl.indexOf("#")!= -1 )
						curl = curl.substring(0,curl.indexOf("#"));
					  if(data=="0")
					  {	
						 alert("评价成功，请等待我们审核！");
						 if(niming !="1")
						 {
							 $("#LoginUserSpan").html("");
							 $(".Anonymous").html("");
							 $("#LoginUserSpan").hide();
							 $(".Anonymous").hide();
						 }
						 $("#AntUserContent").val("");
						 $("#AntUserCode").val("")
					  }
					  else if(data=="1")
					  {	
						 alert("评价成功！");//SUCCESS
						 window.location.href=curl;
					  }
					  else{
						  alert(data);
					  }
				  }
			});	
			return false;
		});
	}
	$("#listformsearch").submit(function(){
		var dd =$(this).attr("rel");
		var aa=$("#Shophiddenvalue").val();
		var word=$.trim($(this).find("#SearchKeyword").val());
		var R1=$.trim($(this).find("#R1").val());
		var R2=$.trim($(this).find("#R2").val());
		if(R1=="")
			R1="0";
		if(R2=="")
			R2="0";
		if(!checknumber(R1) &&  R1!="0")
		{
			alert("输入的价格不对，只支持输入整数！");	
			return false;
		}
		if(!checknumber(R2)  &&  R2!="0")
		{
			alert("输入的价格不对，只支持输入整数！");	
			return false;
		}
		if( (R1!="0" && R2=="0")  || (R1=="0" && R2!="0") )
		{
			alert("请输入价格超始和结束范围！");
			return false;
		}
		var bb=aa.split(",");
		var url="ItemShopSearch.aspx?SearchKeyword="+escape(word)+"&ID="+dd+"&R1="+R1+"&R2="+R2;
		if(bb[0]=="0")
			var url=encodeURIComponent("ItemShopSearch-"+dd+"-0-0-0-0-0-0-"+R1+"-"+R2+"-S"+word+"S-p0"+bb[1]);
		window.open(url,"_self");
		return false;							   
	 });
	$("#leftformsearch").submit(function(){
		var dd =$(this).attr("rel");
		var aa=$("#Shophiddenvalue").val();
		var word=$.trim($(this).find("#SearchKeyword").val());
		var R1=$.trim($(this).find("#R1").val());
		var R2=$.trim($(this).find("#R2").val());
		if(R1=="")
			R1="0";
		if(R2=="")
			R2="0";
		var P2= 0,P3 =0,P4=0;
		if($("input[name='cuxiao']:checked").val()=="1")
			P2=1;
		if($("input[name='remai']:checked").val()=="1")
			P3=1;
		if($("input[name='tuijian']:checked").val()=="1")
			P4=1;
		if(!checknumber(R1) &&  R1!="0")
		{
			alert("输入的价格不对，只支持输入整数！");	
			return false;
		}
		if(!checknumber(R2)  &&  R2!="0")
		{
			alert("输入的价格不对，只支持输入整数！");	
			return false;
		}
		if( (R1!="0" && R2=="0")  || (R1=="0" && R2!="0") )
		{
			alert("请输入价格超始和结束范围！");
			return false;
		}
		var bb=aa.split(",");
		var url="ItemShopSearch.aspx?SearchKeyword="+escape(word)+"&ID="+dd+"&R1="+R1+"&R2="+R2+"&P2="+P2+"&P3="+P3+"&P4="+P4;
		if(bb[0]=="0")
			var url=encodeURIComponent("ItemShopSearch-"+dd+"-0-0-0-"+P2+"-"+P3+"-"+P4+"-"+R1+"-"+R2+"-S"+word+"S-p0"+bb[1]);
		window.open(url,"_self");
		return false;							   
	 });
	
	if(arrPic.length>0)
	{
		var list = $$("AntThumbnail"), image = $$("AntImage")
		var iz = new ImageZoom( "AntImage", "AntViewer", {
			mode: "handle", handle: "AntHandle", scale: 0, delay: 0
		});
		$$A.forEach(arrPic, function(o, i){
			var A=document.createElement("em");
			var Img = document.createElement("img");
			A.appendChild(Img)
			Img.src = o.smallPic;
			var img = list.appendChild(  A  );
			
			var temp;
			img.onmouseover = function(){ 
				if( !this.className ){
					this.className = "Current"; 
					temp = image.src; 
					image.style.display="none";
					
					image.src = o.originPic;
					image.style.display="";
				 }
				iz.reset({ originPic: o.originPic, zoomPic: o.zoomPic });
				$$A.forEach(list.getElementsByTagName("em"), function(img){  img.className = ""; });
				img.className = "CurrentFirst";
			}
			if(i==0)
			{
				image.src = o.originPic;
				img.className = "CurrentFirst";
				iz.reset({ originPic: o.originPic, zoomPic: o.zoomPic });
			}
		})
	}
	$("#current_5").click(function(){
		var y=$(".AntContentForm").offset().top ;
		$(document.documentElement).animate({"scrollTop": y}, {duration:"slow"});							   
	});	
	$("#buyorder_").click(function(){
		var y=$(".buyinfo").offset().top ;
		$(document.documentElement).animate({"scrollTop": y}, {duration:"slow"});							   
	});
	if($("#commentshopID").length>0)
	{
		ShowAjaxPage("ShopAjaxPage.aspx?action=showshopcomment&currentid="+$("#commentshopID").val(),"commentshopid");
		ShowAjaxPage("ShopAjaxPage.aspx?action=showshoporder&currentid="+$("#commentshopID").val(),"ordershopid");
	}
	$(".TabMenu").find("a").each(function(){
		$(this).click(function(){
			var tt=$(this).attr("rel")
			if(parseInt(tt)<5)
			{
				var obj=$(this);
				if($(this).attr("class")!="Current")
				{
					$(".TabMenu").find("a").each(function(){
						$(this).removeClass("Current");						  
					});
					obj.addClass("Current");
					for(var ii=1;ii<5;ii++){
						$("#current_Show"+ii).hide();	
						$("#current_Show"+ii+"_").hide();	
					}
					$("#current_Show"+tt).show();
				}
			}
		});
	});
	$("#buytextkeyword").keyup(function(){
		if(checknumber( $(this).val() ))
		{
			$("#messtishi").hide();
			var aa= parseInt($(this).val())*parseFloat( $(this).attr("rel"));
			$("#totalprieshow").html( aa.toFixed(2) );
		}
		else{
			$("#messtishi").show();
		}
	});

	

});

var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}
var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}
function stopDefault( e ) {
	 if ( e && e.preventDefault ){
		e.preventDefault();
	}else{
		window.event.returnValue = false;
	}
	return false;
} 

var Stars = Class.create();
Stars.prototype = {
	initialize: function(star,options) {
		this.SetOptions(options); //默认属性
		var flag = 999; //定义全局指针
		var isIE = (document.all) ? true : false; //IE?
		var starlist = document.getElementById(star).getElementsByTagName('a'); //星星列表
		var input = document.getElementById(this.options.Input) || document.getElementById(star+"-input"); // 输出结果
		var nowClass = " " + this.options.nowClass; // 定义选中星星样式名
		var len = starlist.length; //星星数量
		
		for(i=0;i<len;i++){ // 绑定事件 点击 鼠标滑过
			starlist[i].value = i;
			starlist[i].onclick = function(e){
				stopDefault(e);
				this.className = this.className + nowClass;
				flag = this.value;
				input.value = this.getAttribute("star:value");
				$("#"+star+"-input").val(this.getAttribute("star:value"));
			}
			starlist[i].onmouseover = function(){
				if (flag< 999){
					var reg = RegExp(nowClass,"g");
					starlist[flag].className = starlist[flag].className.replace(reg,"")
				}
			}
			starlist[i].onmouseout = function(){
				if (flag< 999){
					starlist[flag].className = starlist[flag].className + nowClass;
				}
			}
		};
		if (isIE){ //FIX IE下样式错误
			var li = document.getElementById(star).getElementsByTagName('li');
			for (var i = 0, len = li.length; i < len; i++) {
				var c = li[i];
				if (c) {
					c.className = c.getElementsByTagName('a')[0].className;
				}
			}
		}
	},
	//设置默认属性
	SetOptions: function(options) {
		this.options = {//默认值
			Input:			"",//设置触保存分数的INPUT
			Tips:			"",//设置提示文案容器
			nowClass:	"current-rating"//选中的样式名
		};
		Extend(this.options, options || {});
	}
}

function createMarker(index){
	var letter = String.fromCharCode("A".charCodeAt(0)+index);
	var letteredIcon = new GIcon(G_DEFAULT_ICON);
	letteredIcon.image="http://www.google.com/mapfiles/marker"+letter+".png";
	return letteredIcon
}
//IE6下阴影
function isie6() {
    if ($.browser.msie) {
        if ($.browser.version == "6.0") return true;
    }
    return false;
}
function showthis()
{
	if(isie6() )
	{
		var aa=$(".shop-info-details").css("display");
		if(aa=="block"){
			$("#shop-info").removeClass("shop-infohove")
			$(".shop-info-details").hide();
		}
		else if(aa=="none"){
			$(".shop-info-details").show();
			$("#shop-info").addClass("shop-infohove")
		}
	}
}
function LoadCompanyVideo(id){
	var curl="ShowComVideo.aspx?id="+id;
	$.ajax({
		  url: curl,
		  cache: false,
		  success:function(data)
		  {
			  $("#AntNewVideo").html(data);
		  }
	});		
}
function LoadCompanyQuan(id){
	var curl="ShowComQuan.aspx?id="+id;
	$.ajax({
		  url: curl,
		  cache: false,
		  success:function(data)
		  {
			  $("#ContentList360").html(data);
		  }
	});		
}
(function(){
	  var CommonTab = function(seting){
		  return new CommonTab.fn.init(seting);
	  };
	  CommonTab.prototype =CommonTab.fn =  {
		  indexId:0,
		  Totallpage:1,
		  pageWidth:0,
		  Timer:0,
		  currIndex:0,
		  $:function(v){
			  return document.getElementById(v);
		  },
		  $$:function(o,e){
			  return this.$(o).getElementsByTagName(e);
		  },
		  getStyle:function(el,style) {
			  if (!+"\v1") {
				  style = style.replace(/\-(\w)/g,
				  function(all, letter) {
					  return letter.toUpperCase()
				  });
				  var value = el.currentStyle[style]; (value == "auto") && (value = "0px");
				  return value
			  } else {
				  return document.defaultView.getComputedStyle(el, null).getPropertyValue(style)
			  }
		  },
		  preWidth:function(seting){
			  var id=seting.id,eg=seting.eg;
			  var MarginLeft = parseInt(this.getStyle(this.$$(id,eg)[0],"margin-left"),10),MarginRight = parseInt(this.getStyle(this.$$(id,eg)[0],"margin-right"),10);				
			  this.Totallpage = Math.ceil(this.$$(id,eg).length/seting.pageNb);//总页数
			  if(this.Totallpage>1){//分页数大于1页开始操作
			  this.$(id).style.width = (this.$$(id,eg)[0].offsetWidth+MarginLeft+MarginRight) * this.$$(id,eg).length + "px";	
			  this.$(id).parentNode.style.position = "relative";
			  this.$(id).style.position = "absolute";
			  this.$(id).style.left = 0 +"px";
			  }	
			  this.pageWidth = (parseInt(this.$$(id,eg)[0].offsetWidth) + 2) * seting.pageNb;//1屏宽度
		  },
		  move:function(seting,n,sta){
			  var _this = this,id=seting.id,eg=seting.eg;
			  var MarginLeft = parseInt(this.getStyle(this.$$(id,eg)[0],"margin-left"),10),MarginRight = parseInt(this.getStyle(this.$$(id,eg)[0],"margin-right"),10),MovePix;
			  if(this.pageWidth % seting.MovePix !== 0) {
				  var deflagNums = this.pageWidth % (Math.floor(seting.MovePix / 2));
				  MovePix = Math.floor(seting.MovePix / 2);
			  }else{
				  MovePix = seting.MovePix;
			  }
			  _this.Timer =setInterval(function(){
				  if(sta=="right"){
					  _this.currIndex+=MovePix;
					  if(Math.abs(parseInt(_this.$(seting.id).style.left))<Math.abs(-(_this.pageWidth*n))){
						  _this.$(seting.id).style.left = -_this.currIndex+"px";
						  _this.$(seting.right).onclick = function(){return false};
					  }else{
						  clearInterval(_this.Timer);
						  _this.Timer = 0;
						  CommonTab.fn.handRight(seting);
						  if(_this.indexId==_this.Totallpage-1){
						  _this.$(seting.right).className=seting.classNameOFF;
						  _this.$(seting.left).className=seting.classNameON;
						  }
						  if(_this.indexId<_this.Totallpage-1){
						  _this.$(seting.right).className=seting.classNameON;
						  _this.$(seting.left).className=seting.classNameON;
						  }
					  }
				  }else{
					  _this.currIndex-=MovePix;
					  if(Math.abs(parseInt(_this.$(seting.id).style.left))>Math.abs(-(_this.pageWidth*n))){
						  _this.$(seting.id).style.left = -_this.currIndex+"px";
						  _this.$(seting.left).onclick = function(){return false};
					  }else{
						  clearInterval(_this.Timer);
						  _this.Timer = 0;
						  CommonTab.fn.handLeft(seting);
						  if(_this.indexId==0){
						  _this.$(seting.left).className=seting.classNameOFF;
						  _this.$(seting.right).className=seting.classNameON;
						  }
						  if(_this.indexId>0){
						  _this.$(seting.left).className=seting.classNameON;
						  _this.$(seting.right).className=seting.classNameON;
						  }
					  }
				  }
				 
			  },1)
		  },
		  handLeft:function(seting){
			  var id = seting.left,_this = this;
			  this.$(id).onclick = function(){
				  if(_this.indexId>0){
				  _this.indexId--;
				  _this.move(seting,_this.indexId,"left");
				  }
			  }
		  },
		  handRight:function(seting){

			  var id = seting.right,_this = this;
			  this.$(id).onclick = function(){
				  if(_this.indexId<_this.Totallpage-1){
				  _this.indexId++;
				  _this.move(seting,_this.indexId,"right");
				  }
			  }
		  },
		  init:function(seting){
			  CommonTab.fn.preWidth(seting);
			  CommonTab.fn.handLeft(seting);
			  CommonTab.fn.handRight(seting);
		  }
	  }

	  window.CommonTab = CommonTab;
  })()