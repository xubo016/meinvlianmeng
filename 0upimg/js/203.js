var QuickScrollYLast=0;
var QuickMenu=document.getElementById("QuickMenu")
window.setInterval("LoadMenu()",1);
function LoadMenu(){
var QuickScrollYDefault;
if(document.documentElement&&document.documentElement.scrollTop){
QuickScrollYDefault=document.documentElement.scrollTop;
}else if(document.body){
QuickScrollYDefault=document.body.scrollTop;
}else{
}
QuickPercent=.1*(QuickScrollYDefault-QuickScrollYLast);
if(QuickPercent>0){
QuickPercent=Math.ceil(QuickPercent);
}else{
QuickPercent=Math.floor(QuickPercent);
}
QuickScrollYLast=QuickScrollYLast+QuickPercent;
}
var MenuX;
var MenuY;
var MenuCloseX;
var MenuCloseY;
function ChangeMenu(id,menuwidth,menuheight){
clearInterval(MenuX);
clearInterval(MenuY);
clearInterval(MenuCloseX);
clearInterval(MenuCloseY);
var o = document.getElementById(id);
if(o.style.display == "none"){
o.style.display = "block";
o.style.width = "1px";
o.style.height = "1px";
MenuX = setInterval(function(){menuopenx(o,menuwidth,menuheight)},30);

}else{

MenuCloseY = setInterval(function(){menuclosex(o)},30);
}
}
function menuopenx(o,x,y){/*--打开x--*/
var menucx = parseInt(o.style.width);
if(menucx < x){
o.style.width = (menucx + Math.ceil((x-menucx)/5)) +"px";
}else{
clearInterval(MenuX);
//MenuY = setInterval(function(){menuopeny(o,y)},30);
}
var menucy = parseInt(o.style.height);
if(menucy < y){
o.style.height = (menucy + Math.ceil((y-menucy)/5)) +"px";
}else{
clearInterval(MenuY);
}
}
function menuopeny(o,y){/*--打开y--*/
var menucy = parseInt(o.style.height);
if(menucy < y){
o.style.height = (menucy + Math.ceil((y-menucy)/5)) +"px";
}else{
clearInterval(MenuY);
}
}
function menuclosex(o){/*--打开x--*/
var menucx = parseInt(o.style.width);
if(menucx > 0){
o.style.width = (menucx - Math.ceil(menucx/5)) +"px";
}else{
clearInterval(MenuCloseX);
//MenuCloseX = setInterval(function(){menuclosey(o)},30);
}
var menucy = parseInt(o.style.height);
if(menucy > 0){
o.style.height = (menucy - Math.ceil(menucy/5)) +"px";
}else{
clearInterval(MenuCloseY);
o.style.display = "none";
}
}
function menuclosey(o){/*--打开y--*/
var menucy = parseInt(o.style.height);
if(menucy > 0){
o.style.height = (menucy - Math.ceil(menucy/5)) +"px";
}else{
clearInterval(MenuCloseY);
o.style.display = "none";
}
}