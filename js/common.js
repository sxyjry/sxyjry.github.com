// JavaScript Document

$(function(){
	var oHeadBox=document.getElementById("header");
	var oWrap=document.getElementById("wrap");
	var clientH=document.documentElement.clientHeight;
	var oNext=document.getElementById("next");
	var oPrev=document.getElementById("prev");
	oHeadBox.style.height=clientH+'px';
	oWrap.style.height=clientH-76+'px';
	//轮播图
	var aHead=oWrap.getElementsByTagName("ol")[0].children;
	var aCard=oWrap.getElementsByTagName("ul")[0].children;
	var aLine=oWrap.getElementsByTagName("ol")[1].children;
	var now=0;
	var ready=true;
	
	var timer1=null;
	var oNav=document.getElementById("nav");
	var aNavLi=oNav.getElementsByTagName("ul")[0].children;
	var oNavMin=document.getElementById("miniNav");
	var aNavMinLi=oNavMin.getElementsByTagName("ul")[0].children;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	
		var oUlInfo=document.getElementById("infoUl");  //个人介绍的ul
		var cur=0;  //导航里面的
		
	//  炫酷案例		

		
	//让文字也运动   css3设置  显示的时候就会走css3的运动

	//封装
	function tab(){
		for(var i=0;i<aHead.length;i++){
				aHead[i].className="";
				aCard[i].style.zIndex=1;
				aCard[i].children[1].style.display="none";
				move(aCard[i],{opacity:0},{time:700});
		}
		aHead[now].className="active";
		aCard[now].style.zIndex=2;
		aCard[now].children[1].style.display="block";
		move(aCard[now],{opacity:1},{time:700});
	};
	//点击
	for(var i=0;i<aHead.length;i++){
		(function(index){
			aHead[i].onclick=function(){
				now=index;
				tab();
			};
		})(i)
	}
	//长块自己跑
	
	wuxian();
	function wuxian(){
		
		move(aLine[now],{width:oWrap.offsetWidth},{type:'linear',time:10000,fn:function(){//进度
			now++;
			if(now==3){
				now=0;
			}
			for(var i=0;i<aHead.length;i++){
				aHead[i].className="";
				aCard[i].style.zIndex=0;
				aCard[i].children[1].style.display="none";
				move(aCard[i],{opacity:0});
			}
			aHead[now].className="active";
			aCard[now].children[1].style.display="block";//中间文字 变成block就可以用css3的运动了
			aCard[now].style.zIndex=2;
			move(aCard[now],{opacity:1},{time:700,fn:function(){
				
				
				
				for(var i=0;i<aLine.length;i++){
					aLine[i].style.width=0;	
				}

				if(ready==true){
					wuxian();
				}//只有是true的时候才继续运动回调函数是继续运动的关键
				
			}});
	
		
		}});	
	};
	oWrap.onmouseover=function(){
		ready=false;
		clearInterval(aLine[now].timer);
		aLine[now].style.width=0;

	};
	oWrap.onmouseout=function(){
		ready=true;
		wuxian();
		oNext.className=oPrev.className="btn";
	};
	//箭头控制
	oNext.onclick=function(){
		this.className="active btn";
		oPrev.className="btn";
		now++;
		if(now==3){
			now=0;
		}
		tab();
	};
	oPrev.onclick=function(){
		this.className="active btn";
		oNext.className="btn";
		now--;
		if(now==-1){
			now=2;
		}
		tab();
	};
	
	//点击导航  鼠标滚动可视区的距离
	var ogrH2=document.getElementById("grH2");  //文字运动
	var oInfoH3=document.getElementById("infoh3"); //关于我
	var oDnzs=document.getElementById("dnzs")//电脑展示
	var userGun=true;
	var timer1=null;
	
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(userGun){
			clearInterval(timer1);	
		}
		if(scrollTop>100){
			
			move(oNavMin,{height:52,opacity:1})
		}else{
		
			move(oNavMin,{height:0,opacity:0})
		}
		
		if(scrollTop>=clientH&&scrollTop<clientH*2){
			ogrH2.style.animation="fadIn4 2s linear";
			
		}else{
			ogrH2.style.animation="";
			
		}
		
		if(scrollTop>=clientH/3&&scrollTop<clientH*2){
		
			oInfoH3.style.display='block';
			infoUl.style.display='block';
			
		}else{
		
			oInfoH3.style.display='none';
			infoUl.style.display='block';
			
		}
		
		if(scrollTop>=clientH){
			oDnzs.style.animation="fadIn9 4s linear";/*电脑展示运动*/
			
		}else{
			oDnzs.style.animation="";
			
		}
		
		var n=scrollTop/clientH;
		if(n>=1&&n<2){
			n=1;
		}else if(n>2&&n<3){
			n=2;
		}else if(n>3&&n<4){
			n=3	
		}else if(n>=0&&n<1){
			n=0;
		}
		cur=n;
		
		for(var i=0;i<aNavLi.length;i++){
				aNavLi[i].className="";
				aNavMinLi[i].className="";
			}
			aNavLi[cur].className="active";
			aNavMinLi[cur].className="active";

	};
	


function moveScroll(iTarget,time){
		var start=document.documentElement.scrollTop||document.body.scrollTop;  //不带px  所以运动框架自己再封装
		var dis=iTarget-start;
		var n=0;
		var count=parseFloat(time/30);
		
		clearInterval(timer1);
		timer1=setInterval(function(){
			n++;
			var cur=start+dis*n/count;
			document.documentElement.scrollTop=cur;
			document.body.scrollTop=cur;
			userGun=false;
			if(n==count){
				clearInterval(timer1);
			}	
		},30)
		
};
//大小导航一样的代码   可以封装
	
	for(var i=0;i<aNavLi.length;i++){
		aNavLi[i].index=i;
		aNavLi[i].onclick=function(){
			cur=this.index;
			for(var i=0;i<aNavLi.length;i++){
				aNavLi[i].className="";
				aNavMinLi[i].className="";
			}
			aNavLi[cur].className="active";
			aNavMinLi[cur].className="active";
			moveScroll(cur*clientH,600)
			
		};
	}
	
	for(var i=0;i<aNavMinLi.length;i++){
		aNavMinLi[i].index=i;
		aNavMinLi[i].onclick=function(){
			cur=this.index;
			for(var i=0;i<aNavMinLi.length;i++){
				aNavMinLi[i].className="";
				aNavLi[i].className="";
			}
			aNavLi[cur].className="active";
			aNavMinLi[cur].className="active";
			moveScroll(cur*clientH,600)
			
		};
	}
//


	
//个人介绍
var oContentBox2=document.getElementById("container");
var aDivContBox=getByClass(oContentBox2,'clientH');
	for(var i=0;i<aDivContBox.length;i++){
		aDivContBox[i].style.height=clientH+'px';
	}
	
//个人介绍里面的圆运动展开菜单
//关于我的文字介绍  工作经验
textShow();
function textShow(){
	var str = "2013年11月-2014年3月-杭州巴瓜潭科技有限公司-UI设计兼前端--------------------------------------------------------------------------------2014年3月-2015年12月---杭州巨伞科技有限公司前端开发------------------接下来------------------------------------------------------------------------------------------------梦想在大上海继续-----------------------------------------请记住我的名字----施雪扬";
var oDivText1=document.getElementById("text1");	
	for(var i = 0; i < str.length; i++){
		var oSpan = document.createElement("span");
		oSpan.innerHTML = str.charAt(i);
		oDivText1.appendChild(oSpan);
	}
	
	var aSpan = oDivText1.getElementsByTagName("span");
	var i2 = 0;
	var timer = null;
	timer = setInterval(function(){
		
		move(aSpan[i2],{opacity:1});
		
		i2++;
		if(i2 == str.length){
			clearInterval(timer);
		}
			
	},100);
	
	
};
//梦想起航
var oDivMx   = document.getElementById("div2Box");
	var page1  = oDivMx.querySelector(".page1");
	var oFront = page1.querySelector(".front");
	var oBack  = page1.querySelector(".back");
	var page2  = oDivMx.querySelector(".page2");
	
	var iNow = 0;
	var bReady = true;
	var timer=null;
	timer=setInterval(function(){
			if(!bReady)  return;
			bReady = false;
		
			iNow++;
			//transition:1s all ease;
			page1.style.transition = "1s all ease";
			page1.style.transform = "perspective(800px) rotateY(-180deg)";
			
		
		
	},1000)
	
	page1.addEventListener("transitionend",function(){
		bReady = true;
		page1.style.transition = "none";
		page1.style.transform = "none";
		
		oDivMx.style.backgroundImage = "url(img2/"+iNow%3+".jpg)";
		oFront.style.backgroundImage = "url(img2/"+iNow%3+".jpg)";
		oBack.style.backgroundImage = "url(img2/"+(iNow+1)%3+".jpg)";
		page2.style.backgroundImage = "url(img2/"+(iNow+1)%3+".jpg)";
		
				
	},false);
	
	//炫酷案例
	var aHeadXkAn=document.getElementById("dnzsUlMenu").children;
	var oUlXkAn=document.getElementById("dnzsContUl");

	
	//选项卡
	
	for(var i=0;i<aHeadXkAn.length;i++){
		(function(index){
			aHeadXkAn[i].onclick=function(){
				
				for(var i=0;i<aHeadXkAn.length;i++){
					
					aHeadXkAn[i].className="";
					
				}
				this.className="active";
				move(oUlXkAn,{top:-index*265})
				
			};
		
		})(i)
	}
	//苹果菜单
	var oDivApple=document.getElementById('divApple');
	var aImgApple=oDivApple.children;
	var oMainBox=document.getElementById('container')

	oMainBox.onmousemove=function(ev){
		var oEvt=ev||event;
		//1.算出到图片的dis
		for(var i=0;i<aImgApple.length;i++){
				
			var a=aImgApple[i].offsetLeft-oEvt.clientX+265+aImgApple[i].offsetWidth;
			var b=aImgApple[i].offsetTop+oDivApple.offsetTop-oEvt.clientY+aImgApple[i].offsetHeight*3/2;
			var c=Math.sqrt(a*a+b*b);
			var dis=c;
			
			
			var scale=1-dis/300
			
			//限定
			if(scale<0.5)	scale=0.5;

			
			aImgApple[i].style.width=128*scale+'px';
		}
	};	
	//官网菜单
	var speed1 = 0;
	var left1 = 0;
	var i1 = 0;

function move2(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		//加速度
		speed1 += (iTarget - left1)/5;
		//摩擦
		speed1 *= 0.7;
		
		left1 += speed1;
		
		obj.style.left = Math.round(left1) +　"px";
		
		if(obj.offsetLeft == iTarget && Math.abs(speed1) < 1){
			clearInterval(obj.timer);
		}

	},30);	
	
};
	var oUl1Menu = document.getElementById("ul1menu");
	var aLioUl1Menu = oUl1Menu.children;
	var oBoxoUl1Menu = aLioUl1Menu[aLioUl1Menu.length - 1];
	
	for(var i = 0; i < aLioUl1Menu.length - 1; i++){
		aLioUl1Menu[i].onmouseover = function(){
			move2(oBoxoUl1Menu,this.offsetLeft);
		};
	}
//球菜单  move3
//圆运动

	var oLQiu=document.getElementById("qiuOl");
	var oGuanwangLi=document.getElementById("guanwangLi");
	var aLiQiu=getByClass(oGuanwangLi,'qiu')
	var oBtnQiu=document.getElementById("qiuBtn");
	var ang=0;
	var r=oLQiu.offsetWidth/2;
	
	var opened=false;
	
	for(var i=0;i<aLiQiu.length;i++){
			aLiQiu[i].rotate=0;
	}

	oBtnQiu.onclick=function(){
		
		if(opened){
				for(var i=0;i<aLiQiu.length;i++){
				
					aLiQiu[i].style.display="none";
					move3(aLiQiu[i],0)
				}
				opened=false;
		}else{
			
			for(var i=0;i<aLiQiu.length;i++){
					var a=rnd(0,256);
					var b=rnd(0,256);
					var c=rnd(0,256);
			aLiQiu[i].style.background='rgba('+a+','+b+','+c+','+0.3+')';
					aLiQiu[i].style.display="block";
					move3(aLiQiu[i],i*90/(4-1));
				}
			opened=true;	
		}
		
		
	};
function move3(obj,iTarget){
	
	var start=obj.rotate;
	var dis=iTarget-start;
	var count=Math.round(600/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		var cur=start+dis*n/count;
		//角度值都在更新  但是obj.rotate  还没有更新  因为两者还没有关联起来
		setPos(obj,cur);//把角度转变为弧度   每隔100毫秒设置一次所有圆的位置
		obj.rorate=cur;	//运动过后的角度  是下一次运动的初始值   理解   比如如果是offsetLeft   它是自己实时更新的  所以没有加实时更新
		if(n==count){
			clearInterval(obj.timer);

		}
	},30)
};

	function d2a(n){
			return n*Math.PI/180;
		};
	function setPos(obj,ang){
				var a=Math.sin(d2a(ang))*r;
				var b=Math.cos(d2a(ang))*r;
				obj.style.left=oLQiu.offsetLeft+r+a+'px';
				obj.style.top=oLQiu.offsetTop+r-b+'px';	
	};
		
			

//照片墙

	var oUlphotoUl = document.getElementById("photoUl");
	var aLiPhoto = oUlphotoUl.children;
	var len = aLiPhoto.length;
	var zIndex = 1;
	//布局转换
	var aPos = [];

	for(var i = 0; i < len; i++){
		aPos[i] = {left:aLiPhoto[i].offsetLeft,top:aLiPhoto[i].offsetTop};
		aLiPhoto[i].style.left = aPos[i].left +　"px";
		aLiPhoto[i].style.top = aPos[i].top + "px";
	}
	
	for(var i = 0; i < len; i++){
		aLiPhoto[i].style.position = "absolute";
		aLiPhoto[i].style.margin = "0";
		drag(aLiPhoto[i]);
		aLiPhoto[i].index = i;
	}
	
	//拖拽：
	function drag(obj){
		
		obj.onmousedown = function(ev){
			var oEvent = ev || event;
			var disX = oEvent.clientX - obj.offsetLeft;
			var disY = oEvent.clientY - obj.offsetTop;
			obj.style.zIndex = zIndex++;
			clearInterval(obj.timer);
			document.onmousemove = function(ev){
				var oEvent = ev || event;
				
				obj.style.left = oEvent.clientX - disX + "px";
				obj.style.top = oEvent.clientY - disY + "px"; 
				
				//清空所有
				for(var i = 0; i < len; i++){
					aLiPhoto[i].className = "";
				}
				
				var oNear = findMin(obj);
				
				if(oNear&&oNear!=obj){
					
					var n=obj.index;
					var m=oNear.index;
					for(var i=0;i<aLiPhoto.length;i++){
						//n<aLi[i].index<=m
						//m<=aLi[i].index<n
						if(aLiPhoto[i].index>n && aLiPhoto[i].index<=m){
							//←
							aLiPhoto[i].index--;
							move(aLiPhoto[i],aPos[aLiPhoto[i].index]);
						}else if(aLiPhoto[i].index>=m && aLiPhoto[i].index<n){
							//→	
							aLiPhoto[i].index++;
							move(aLiPhoto[i],aPos[aLiPhoto[i].index]);
						}
					}
					obj.index=m; 
				}
				
			};
			
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				obj.releaseCapture && obj.releaseCapture();
				
				 move(obj,aPos[obj.index]);
			};
			obj.setCapture && obj.setCapture();
			return false;	
		};
	}
	
	//找最近 
	//1 先碰上  2 算距离 3 找最小

	function findMin(obj){
		var iMin = 99999999;
		var iMinIndex = -1;
		//先碰上
		for(var i = 0; i < len; i++){
			if(obj == aLiPhoto[i]) continue;
			if(collTest(obj,aLiPhoto[i])){
				//算距离
				var dis = getDis(obj,aLiPhoto[i]);
				if(iMin > dis){
					iMin = dis;
					iMinIndex = i;
				}
				
			}
		}/*end for loop */
		
		//返回
		
		if(iMinIndex == -1){
			return null;
		}
		return aLiPhoto[iMinIndex];
		
	}	/*end fn  findMin */
	
	function getDis(obj1,obj2){
		var a = obj1.offsetLeft - obj2.offsetLeft;
		var b = obj1.offsetTop - obj2.offsetTop;
		
		return Math.sqrt(a*a + b*b);
	}
	
	function collTest(obj1,obj2){
		var l1 = obj1.offsetLeft;
		var t1 = obj1.offsetTop;
		var r1 = l1 + obj1.offsetWidth;
		var b1 = t1 + obj1.offsetHeight;
		
		
		var l2 = obj2.offsetLeft;
		var t2 = obj2.offsetTop;
		var r2 = l2 + obj2.offsetWidth;
		var b2 = t2 + obj2.offsetHeight;
		
		if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){//没碰上
			return false;
		} else {
			return true;
		}
	}
	
	var oBtnPhoto = document.getElementById("photoBtn");
	oBtnPhoto.onclick = function(){
		
		aPos.sort(function(){
			return Math.random() - 0.5;
		});
		
		for(var i = 0; i < len; i++){
			aLiPhoto[i].index = i;
			move(aLiPhoto[i],aPos[i]);
		}
			
	};
//换一换
(function(){
		
		 var oUl=document.getElementById('hyhImgBox');
		  var aLi=oUl.children;
		  var aImg=oUl.getElementsByTagName("img");
		  var oBtn=document.getElementById('hyhBtn');
		  var content=0;	
		  var ready=true;
		
		  //1布局转换
		  var aPos=[];	//[{left:?,top:?,width:?,height:?,opacity:?},{}]
		  for(var i=0;i<aLi.length;i++){
			  aPos.push(
					  {
						  left:	aLi[i].offsetLeft,
						  top:	aLi[i].offsetTop,
						  width:	aLi[i].offsetWidth,
						  height:	aLi[i].offsetHeight,
						  opacity:1
					  }
				  );
			  aLi[i].style.left=aPos[i].left+'px';
			  aLi[i].style.top=aPos[i].top+'px';
		  }
		  for(var i=0;i<aLi.length;i++){
			  aLi[i].style.position='absolute';
			  aLi[i].style.margin=0;
			
		  }
		  
		  //2.给btn加事件
		  oBtn.onclick=function(){
			  if(!ready) return;
			  ready=false;
			  down();
	
		  };
		  
		  function down(){
			  var i=aLi.length-1;
			  var timer=setInterval(function(){
				  //办事
				  (function(index){
					  move(aLi[i],{left:oUl.offsetWidth/2,top:oUl.offsetHeight/2,opacity:0,width:0,height:0},{fn:function(){
						  //判断第0张跑完了
						  if(index==0){
							  
							  //模拟数据的准备
							  for(var i=0;i<aLi.length;i++){
								aImg[i].src = "cat2/" + parseInt(Math.random() * 11+1) + ".jpg";
							  }
							  //放出来
							  up();	
						  }
					  }});
				  })(i);
				  
				  i--;
				  if(i==-1){
					  clearInterval(timer);	
				  }
			  },100);	
		  }
		  
		  function up(){
			  var i=aLi.length-1;
			  var timer=setInterval(function(){
				  
				  (function(index){
					  move(aLi[i],aPos[i],{fn:function(){
						  if(index==0){
							  ready=true;
						  }
					  }});
				  })(i);
				  
				  i--;
				  if(i==-1){
					  clearInterval(timer);	
				  }
			  },100);	
		  }
	})();
//3D旋转
	(function(){
        	var oRotatePic = document.getElementById("RotatePic");
        	var aLi = oRotatePic.children;
        	var aLink = oRotatePic.getElementsByTagName("a");
        	var aImg = oRotatePic.getElementsByTagName("img");
        	var timer = null;
        	var arr = [];
        	aLink[0].onclick = function() {
            		next();
           		return false;
        	};
        	aLink[2].onclick = function() {
            		prev();
            		return false;
        	};
        	for (var i = 0; i< aLi.length;i++){
            		arr[i] = {
            			left: aLi[i].offsetLeft,
            			top: aLi[i].offsetTop,
            			imgT: aImg[i].offsetTop,
            			opacity: parseFloat(getStyle(aImg[i], "opacity")),
            			width: aImg[i].width,
            			fnclick: aLink[i].onclick
            		};
        	}
        	timer = setInterval(next, 2000);
        	oRotatePic.onmouseover = function(){
            		clearInterval(timer);
        	};
        	oRotatePic.onmouseout = function(){
            		timer = setInterval(next, 2000);
        	};
        	function next() {
	            	arr.push(arr.shift());
	            	for (var i = 0; i < aLi.length; i++) {
	                	move(aLi[i], {left: arr[i].left,top: arr[i].top});
	                	move(aImg[i], {width: arr[i].width,opacity: arr[i].opacity,top: arr[i].imgT});
	                	aLink[i].onclick = arr[i].fnclick;
	            	}
        	}
      		function prev() {
            		arr.unshift(arr.pop());
	            	for (var i = 0; i < aLi.length; i++){
		            move(aLi[i], {left: arr[i].left,top: arr[i].top});
		            move(aImg[i], {width: arr[i].width,opacity: arr[i].opacity,top: arr[i].imgT});
		            aLink[i].onclick = arr[i].fnclick;
	            }
      		}
    	})();
		
	//拉勾
	(function(){
		 var oUllago = document.getElementById("ulJnyl");
		  var aLilago = oUllago.children;
		  
		  for(var i = 0; i < aLilago.length; i++){
			  
			  lagou(aLilago[i]);
			  
		  }
		  function getDir(obj1,oEvent){
			  var x = oEvent.clientX - (getPos(obj1).left + obj1.offsetWidth/2);
			  var y = getPos(obj1).top + obj1.offsetHeight/2 - oEvent.clientY;
			  
			  // 0左 1下 2右 3 上
			  return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
		  }
		  
		  
		  function lagou(obj){
		  
			  obj.onmouseover= function(ev){
				  var oEvent = ev || event;
				  
				  var oFrom = oEvent.fromElement || oEvent.relatedTarget;
				  
				  if(obj.contains(oFrom)){
					  return;
				  }
				  
				  var oSpan = obj.getElementsByTagName("span")[0];
				  var n = getDir(obj,oEvent);
			  
				  switch(n){
					  case 0:
					  
					  oSpan.style.left = "-200px";
					  oSpan.style.top = "0";
					   
					  break;
					  case 1:
					  oSpan.style.left = "0";
					  oSpan.style.top = "250px";
					  break;
					  case 2:
					  oSpan.style.left = "200px";
					  oSpan.style.top = "0"; 
					  break;
					  case 3:
					  oSpan.style.left = "0";
					  oSpan.style.top = "-250px";
					  break;
					  
				  } 
				  
				  move(oSpan,{left:0,top:0});
				  
			  };
			  
			  obj.onmouseout = function(ev){
				  var oEvent = ev || event;
			  
				  var oTo = oEvent.toElement || oEvent.relatedTarget;
				  
				  if(obj.contains(oTo)){
					  return;
				  }
		  
				  var oSpan =obj.getElementsByTagName("span")[0];
				  var n = getDir(obj,oEvent);
				  
				  switch(n){
					  case 0:
					  move(oSpan,{left:-200,top:0});
					  break;
					  case 1:
					  move(oSpan,{left:0,top:250});
					  break;
					  case 2:
					  move(oSpan,{left:200,top:0});
					  break;
					  case 3:
					  move(oSpan,{left:0,top:-250});
					  break;
					  
				  } 
			  };
		  };	
	})()
	
//结尾
})
