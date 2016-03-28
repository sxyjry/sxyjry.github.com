// JavaScript Document
bReady(function(){
/*滚屏运动*/

		var oBox=$("box");//最外面的大盒子 滚动的就是它
		var aPage=getByClass('page');//获取每一屏
		var vH=viewH();
		var asdLi=getTag($('aside'),'li');//侧边栏的点
		var aLi_foot=getTag($('footNav'),'li');//底部的导航
		var count=0  //滚屏的页数
		var timer1=null; //鼠标滚动的定时器
		var nowIndex=0;
		var nextorprevIndex=0;
		function setH(){
			for(var i=0;i<aPage.length;i++){
				aPage[i].style.height=vH+'px';
			}
		};
		setH();
		
		window.onresize=function(){
			setH();	
			vH=viewH();
			oBox.style.top = -vH*count+"px";
		}
		
	//侧边栏小按钮点击事件
	function tab(){
		move(oBox,{top: -count*vH},{time:800,type:'easeIn'});
        for(var j=0;j<asdLi.length;j++){
			removeClass(asdLi[j],'active');
			removeClass(aLi_foot[j],'active');
        }
        addClass(asdLi[count],'active');
		addClass(aLi_foot[count],'active');
	};
    function clickSlide(arr){
        for(var i=0;i<arr.length;i++){
            (function(index){
                arr[i].onclick=function(){
					count=index;
					tab();
                };
            })(i)
        }
    };
	/*右侧点击滑屏*/
	clickSlide(asdLi);
	/*底部菜单点击滑屏*/		
	clickSlide(aLi_foot);
	//鼠标滚屏
	var beOver=true;//设置一个开关   防止滚动太快 出现错误
	addMouseWheel(oBox,function(down){
	  if(!beOver)return false; //不满足条件的时候截断后续代码
		 beOver=false;//800毫秒运动完  1200毫秒后才变成true  才可以继续走下面的代码
		 setTimeout(function(){
			  beOver = true
		  },1000)
			 if(down){
				  count--;
				  count=(count<0)?0:count;
				  nowIndex=count;
				  nextorprevIndex = nowIndex == 0 ? asdLi.length-1 : nowIndex - 1;
				
			  }else{
				  count++;
				  count=(count==asdLi.length)?asdLi.length-1:count;
				  nowIndex=count;
				  nextorprevIndex = nowIndex == asdLi.length-1 ? 0 : nowIndex + 1;
				  
			  }
			  tab();
	});
	
/*第一屏*/
(function(){
	function textShow(){
		var str = "2013年11月-2014年3月-杭州巴瓜潭科技有限公司-UI设计兼前端--------------------------------------------------------------------------------2014年3月-2015年12月---杭州巨伞科技有限公司前端开发-----------------------------------------------------------------------------------2015年1月-2016年4月--香港嘉丰瑞德有限公司-前端开发----------接下来------------------------------------------------------------------------------------------------梦想在大上海继续---------------------------有梦想的人不会累------------热爱前端 专注前端----------------------------请记住我的名字----施雪扬------------------------------------------------------------------------------我相信 越努力 越幸运-------------------------------------------";
	var oDivText1=$("text2");	
		for(var i = 0; i < str.length; i++){
			var oSpan = document.createElement("span");
			oSpan.innerHTML = str.charAt(i);
			oDivText1.appendChild(oSpan);
		}
		
		var aSpan = oDivText1.getElementsByTagName("span");
		var i2 = 0;
		var timer2 = null;
		timer2 = setInterval(function(){
			
			move(aSpan[i2],{opacity:1});
			i2++;
			if(i2 == str.length){
				clearInterval(timer2);
			}
		},20);
	};
	textShow();	
})();
/*第四屏拉勾*/
(function(){
		 var oUllago = $("ulJnyl");
		  var aLilago = oUllago.children;
		  
		  for(var i = 0; i < aLilago.length; i++){
			  
			  lagou(aLilago[i]);
			  
		  }
		 function direction(obj,oEv){

			var x = oEv.clientX - getPos(obj).left - obj.offsetWidth/2;
			var y = obj.offsetHeight/2 + getPos(obj).top - oEv.clientY;
			// 弧度
			var a = Math.atan2(y,x);
			//换成角度，然后除以90度，得到4个方向，0 左  1下 2 右 3 上
			return Math.round((a*180/Math.PI + 180)/90)%4;
		}
		  
		  
		  function lagou(obj){
			obj.onmouseover = function(ev){
				var oEv = ev || event;
				var oSrc = oEv.fromElement || oEv.relatedTarget;
				if(obj.contains(oSrc)){
					return;
				} 
				var oChild = this.children[1];
				var nd = direction(obj,oEv);
				// w:250px,h:180px
				switch(nd){
					case 0:// 0 左 
						oChild.style.left = "-200px";
						oChild.style.top = "0";
					break;
					case 1://  1下
						oChild.style.left = "0";
						oChild.style.top = "250px";
					break;
					case 2://  2 右 
						oChild.style.left = "200px";
						oChild.style.top = "0";
					break;
					case 3:// 3 上
						oChild.style.left = "0";
						oChild.style.top = "-250px";
					break;
				}
				move(oChild,{left:0,top:0});
			}
			obj.onmouseout = function(ev){
				var oEv = ev || event;
				var oSrc = oEv.toElement || oEv.relatedTarget;
				if(obj.contains(oSrc)) return;
				var oChild = this.children[1];
				var nd = direction(obj,oEv);
				// w:250px,h:180px
				switch(nd){
					case 0:// 0 左 
						move(oChild,{left:200,top:0});
					break;
					case 1://  1下
						move(oChild,{left:0,top:250});
					break;
					case 2://  2 右 
						move(oChild,{left:-200,top:0});
					break;
					case 3:// 3 上
						move(oChild,{left:0,top:-250});
					break;
				}
			}
		}
	})();
	
/*第五屏*/
(function(){
var aHeadXkAn=$("dnzsUlMenu").children;
var oUlXkAn=$("dnzsContUl");

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
	var oUl1Menu = $("ul1menu");
	var aLioUl1Menu = oUl1Menu.children;
	var oBoxoUl1Menu = aLioUl1Menu[aLioUl1Menu.length - 1];
	
	for(var i = 0; i < aLioUl1Menu.length - 1; i++){
		aLioUl1Menu[i].onmouseover = function(){
			move2(oBoxoUl1Menu,this.offsetLeft);
		};
	}
//球菜单  move3
//圆运动

	var oLQiu=$("qiuOl");
	var oGuanwangLi=$("guanwangLi");
	var aLiQiu=getByClass('qiu',oGuanwangLi)
	var oBtnQiu=$("qiuBtn");
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

	var oUlphotoUl = $("photoUl");
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
	
	var oBtnPhoto = $("photoBtn");
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
		
		 var oUl=$('hyhImgBox');
		  var aLi=oUl.children;
		  var aImg=oUl.getElementsByTagName("img");
		  var oBtn=$('hyhBtn');
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
	
/*小滚轮*/
})()
//分块运动

/*每一屏的入场出场动画*/
var $item=getByClass('item');
var cjAnimate = [
		{

			inAn: function() {
				$("#artical3").find('li').each(function(i, v) {
					$(v).css({
						opacity: 1,
						animation: 'flipInX 0.8s ease-in ' + i * 0.8 + 's backwards'
					});
				})
			},
			outAn: function() {
				$("#artical3").find('li').css({
					opacity: 0,
					animation: ''
				});
			}
		},
		{
			inAn : function(){
				var $liChild = $li.eq(1).find('li');
				$liChild.attr('class','');
				$liChild.css('transform','rotate(720deg)');
				$liChild.css('transition','1s');
			},
			outAn : function(){
				var $liChild = $li.eq(1).find('li');
				$liChild.css('transform','rotate(0)');
				$liChild.css('transition','');
				$liChild.attr('class','active');
			}
		},
		{
			inAn : function(){
				var $divChild = $li.eq(2).find('div');
				$divChild.css('transform','rotateY(360deg)');
				$divChild.css('transition','1s');
			},
			outAn : function(){
				var $divChild = $li.eq(2).find('div');
				$divChild.css('transform','rotateY(0)');
				$divChild.css('transition','');
			}
		},
		{
			inAn : function(){
				var $liChild = $li.eq(3).find('li');
				$liChild.css('transition','1s');
				$liChild.attr('class','');
			},
			outAn : function(){
				var $liChild = $li.eq(3).find('li');
				$liChild.css('transition','');
				$liChild.attr('class','active');
			}
		},
		{
			inAn : function(){
				var $liChild = $li.eq(4).find('div');
				$liChild.css('transition','1s');
				$liChild.css('transform','translate(0,0px) scale(0.8,0.8)');
				$liChild.attr('class','');
			},
			outAn : function(){
				var $liChild = $li.eq(4).find('div');
				$liChild.css('transition','');
				$liChild.css('transform','translate(100px,200px) scale(1,1)');
				$liChild.attr('class','active');
			}
		},
		{
			inAn : function(){
				var $liChild = $li.eq(5).find('div');
				$liChild.css('transition','1s');
				$liChild.css('transform','scale(1,1)');
				$liChild.attr('class','');
			},
			outAn : function(){
				var $liChild = $li.eq(5).find('div');
				$liChild.css('transition','');
				$liChild.css('transform','scale(-1,-1)');
				$liChild.attr('class','active');
			}
		},
		{
			inAn : function(){
				var $liChild = $li.eq(6).find('div');
				$liChild.css('transition','1s');
				$liChild.css('transform','translate(0,0px) scale(1,1)');
				$liChild.attr('class','');
			},
			outAn : function(){
				var $liChild = $li.eq(6).find('div');
				$liChild.css('transition','');
			$liChild.css('transform','translate(0,-200px) scale(-1,1)');
				$liChild.attr('class','active');
			}
		},
		{
			inAn : function(){
				var $liChild = $li.eq(7).find('div');
				$liChild.css('transition','1s');
				$liChild.css('transform','translate(0,0) skewY(-10deg)');
				$liChild.attr('class','');
			},
			outAn : function(){
				var $liChild = $li.eq(7).find('div');
				$liChild.css('transition','');
				$liChild.css('transform','translate(0px,200px) skewY(20deg)');
				$liChild.attr('class','active');
			}
		}
	];
	
cjAnimate[0].outAn();	
for( var i=0;i<cjAnimate.length;i++){
	cjAnimate[i].outAn();
}	
	
});



