//版权 北京智能社©, 保留所有权利
function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
	}
//obj=对象	json=属性名和值,是个json	
//	optional	<--->	time=运动时间	fn==回调函数
function move(obj,json,optional){
	optional=optional||{};
	optional.time=optional.time||300;
	optional.fn=optional.fn||null;
	optional.type=optional.type||'linear';
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));//初始
		dis[key]=json[key]-start[key]//运动距离{width:100,height:450}
	}
	var count=Math.round(optional.time/30);	//总次数
	var n=0;//第几次
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;//递增
		for(var key in json){//计算每个属性并修改
			switch(optional.type){
				case 'linear':
					var a=n/count;
					var cur=start[key]+dis[key]*a;
					break;
				case 'ease-in'://加速
					var a=n/count;
					var cur=start[key]+dis[key]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a);
					break;	
			}
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}	
		}
		if(n==count){//停止条件
			clearInterval(obj.timer);
			optional.fn && optional.fn();
			
		}
	},30);	
};