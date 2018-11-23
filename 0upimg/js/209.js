
function faceTable(){
	var facesrc="http://img.pccoo.cn/images/face/";
	var str=[];
	var x=1;
	str.push("<table cellspacing='1'>")
	for(var i=1;i<=4;i++){
		str.push("<tr>");
		for(var j=1;j<=8;j++,x+=1){
			str.push("<td><img src='"+facesrc+x+".gif' /></td>");
		}
		str.push("</tr>");
	}
	str.push("</table>");
	return str.join("");
}

$("#dpclick").live("click",function(){
	if($("#dpforms").length==0)
	$(".othertag[setid='dianping']").click()
})
 
$("textarea").live("mouseover",function(){
	$(this).focus();
})
 
$(".nexanpre,.contbody li,.sjanv li,.mtxtbox dd").live('mouseenter',function(){
	$(this).addClass("hovers")
}).live('mouseleave',function(){
	$(this).removeClass("hovers")
})
 
 
$(".pfenbar a").live('mouseenter',function(){
	$(this).nextAll().removeClass("hovli")
	$(this).addClass("hovli");
	$(this).prevAll().addClass("hovli")
	$(this).parents("p").find("i").removeClass("red")
	$(this).parents("p").find("i").html($(this).html())
}).live('mouseleave',function(){
	var sidv=$(this).attr("sd") , t_hid=$(this).parents("p").find("input").val();
	if(t_hid==""){
		$(this).removeClass("hovli");
		$(this).prevAll().removeClass("hovli")
	}else if(t_hid<sidv){
		$(this).parent().children("a[sd="+t_hid+"]").nextAll().removeClass("hovli")
	}else{
		$(this).parent().children("a[sd="+t_hid+"]").addClass("hovli")
		$(this).parent().children("a[sd="+t_hid+"]").prevAll().addClass("hovli")
	}
	$(this).parents("p").find("i").html($(this).parent().children("a[sd="+t_hid+"]").html())
})
$(".pfenbar a").live("click",function(){
	if($("#session_username").val()==""){
		loginfn()
	}else{
		var sidv=$(this).attr("sd");
		$(this).addClass("hovli");
		$(this).prevAll().addClass("hovli")
		$(this).parents("p").find("input").val(sidv)
		$(this).parents("p").find("i").html($(this).html())
	}
})
$(".litia a").live("click",function(){
	var tsipt=$(this).parents("li").find("input");
	if($("#session_username").val()==""){
		loginfn()
	}else{
		$(this).toggleClass("current");
		if($(this).attr("class")=="current"){
			tsipt.val(tsipt.val()+$(this).html()+" ");
		}else{
			tsipt.val(tsipt.val().replace($(this).html()+' ',''));
		}
	}
})
$("#content_txt").live("keydown",function(){
	$("#fontLength").html(200-$(this).val().length)
	if($(this).val().length>199){
		$(this).val($(this).val().substr(0,199));
	}
});
(function($) {
    $.fn.extend({
        insertFace: function(myValue) {
            var $t = $(this)[0];
            if (document.all) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        }
    })
})(jQuery);

$("#faceshow").live("click",function(event){
	$("#content_txt").focus();
	if($("#session_username").val()==""){
		loginfn()
	}else{
		$("#showfacebox").toggle()
		$("#showfacebox .facebox").html(faceTable())
		$("#showfacebox img").each(function(i){
			$("#showfacebox img").eq(i).click(function(){
				$("#content_txt").insertFace("[face"+parseInt(i+1)+"]");
			})
		})
		event.stopPropagation()
	}
})
$("#fanben").live("click",function(event){
	$("#content_txt").focus();
	if($("#session_username").val()==""){
		loginfn()
	}else{
		$("#showtxtmob").toggle()
		event.stopPropagation()
	}
})
$("body").click(function(){
	$("#showfacebox,#showtxtmob,.showfacebox").hide()
})
$("#showtxtmob dd").live("click",function(){
	var tshtm=$(this).html()
	$("#content_txt").insertFace(tshtm);
})
$(".hfubut").live("click",function(){
	if($("#session_username").val()!=""){
		$(this).parent(".msgsubtm").next().toggle();
		$(this).siblings(".red").remove();
	}else{
		loginfn()
	}
})
$(".hfbq").live("click",function(event){
	$(this).parents(".huifubox").find("textarea").focus();
	$(this).parent().css("position","relative")
	$(this).siblings(".showfacebox").show().find(".facebox").html(faceTable());
	$(this).parents(".huifubox").find("img").each(function(i){
		$(this).parents(".huifubox").find("img").eq(i).click(function(){
			$(this).parents(".huifubox").find("textarea").insertFace("[face"+parseInt(i+1)+"]");
		})
	})
	$(".msgbg").css("z-index","0")
	$(this).parents(".msgbg").css("z-index","100")
})
$(".huifubox textarea").live("keydown",function(){
	$(this).val($(this).val().substr(0,200));
	$(this).parents(".huifubox").find("i").html(200-$(this).val().length)
})

$(".tongyifz").live("click",function(){
	var hid=$(this).parent().siblings(".huifubox").find("textarea").attr("hid");
	if(!$(this).children().attr("class")){
		$(".msgsubtm b").remove()
		$(this).before("<b>+1</b>")
		$(this).siblings("b").animate({top:"-20px",opacity:"0"},800)
		$(this).siblings(".tynumb").html(parseInt($(this).siblings(".tynumb").html())+1)
		$(this).children().addClass("h");
		$(this).siblings(".tynumb").addClass("h");
		$.ajax({type:"GET",url:"/store/shopshow_ajax.asp?from=tongyi&hid="+hid,cache: false})
	}
})
$("#subok").live("click",function(){
	if($("#session_username").val()==""){
		loginfn();
		return false;
	}
	if($("#session_username").val()==$("#session_username").attr("setid")){
		alert("很抱歉，您不能给自己点评！");
		return false;
	}
	var tg=0;
	$(".dfhid").each(function(){
		if($(this).val()==""){
			$(this).prev().addClass("red").html("请打分！");
			tg=1
		}
	})
	if(tg==1){
		return;
	}
	$("#content_txt").val($.trim($("#content_txt").val()));
	if($("#content_txt").val()==""){
		$("#zezlogin").html("亲，难道您要此处省略1万字吗？").addClass("red").show()
		$("#content_txt").focus(function(){
			$("#zezlogin").fadeOut()
		})
		return false
	}
	if($("#content_txt").val().length<10){
		$("#zezlogin").html("内容太少了，点评内容最少为10个字符！").addClass("red").show()
		$("#content_txt").focus(function(){
			$("#zezlogin").fadeOut()
		})
		return false
	}
	var rAtmosphere="";
	$("input:checked[name='rAtmosphere']").each(function(){
		rAtmosphere+=($(this).val()+",")
	})
	$("#content_txt,#yanxiang").attr("disabled","disabled")
	$(this).attr("disabled","disabled").parent().addClass("sbloading");
	var content_txt=$("#content_txt").val(),parter=/(\[face)(\d+)(\])/g;
	content_txt=content_txt.replace(parter,"<img src='http://img.pccoo.cn/images/face/$2.gif' align='absmiddle' />");
	$.ajax({
		type:"post",
		url:"/store/shopshow_ajax.asp",
		data:{from:"reviews",ysdp:$("#ysdp").val(),sjfg:$("#sjfg").val(),wzgn:$("#wzgn").val(),qqpm:$("#qqpm").val(),yanxiang:encodeURIComponent($("#yanxiang").val()),content_txt:encodeURIComponent(content_txt),sname:$("#session_username").val(),comp_id:$("#session_username").attr("comp_id"),rAtmosphere:rAtmosphere,rFood:encodeURIComponent($("#rFood").val()),rAverageConsume:$("#rAverageConsume").val()},
		cache: false,
		success: function(msg){
			if(msg==1){
				alert("点评内容含有非法字符，请修改后再提交！");
				$("#content_txt,#yanxiang").removeAttr("disabled")
				$("#subok").removeAttr("disabled").parent().removeClass("sbloading");
				return false
			}
			if(msg==3){
				alert("抱歉，非本站会员不能点评！")
				$("#content_txt,#yanxiang").removeAttr("disabled")
				$("#subok").removeAttr("disabled").parent().removeClass("sbloading");
				return false
			}
			$("#message_form").load("/store/shopshow_ajax.asp?from=shopshow&tab_index=dianping&comp_id="+$("#session_username").attr("comp_id"))
			if(msg==2){
				alert("感谢点评，点评内容将在审核后显示！")
				return false;
			}

			if($("#msgall").length){
				if($("#con_three_2").length){
					$("#con_three_2 .zwxx").remove();
				}else{
					$(".contentbox .zwxx").remove();
				}
				$("#msgall").prepend(msg)
				if($("#one2").length){
					$("#one2").click();
				}
				window.location.hash="m7"
			}else{
				alert("留言成功")
			}
		}
	})
})