var kf={};kf.host="http://kf.fwowo.com/";kf.getStyle=function(b,d,a){var c=document.createElement("link");c.rel="stylesheet";c.href=b;document.getElementsByTagName("head")[0].appendChild(c);
if(d){c.onload=function(){d();};}if(a){c.onerror=function(){a();};}};kf.debug=false;kf.useArray=[];kf.use=function(g,h,a){var f=function(){},e=function(){},c="-min.js",d=[];
if(h){f=h;}if(a){e=a;}if(kf.debug){c=".js?r="+Math.random();}if(typeof(g)=="string"){var b=[g];}else{var b=g;}$.each(b,function(){if(this.indexOf("#")==0){var i=this.substr(1)+c;
}else{var i=kf.host+this+c;}if($.inArray(this,kf.useArray)<0){d.push($.ajax({type:"GET",url:i,dataType:"script",scriptCharset:"UTF-8",cache:true}));}});
$.when(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9]).done(function(){$.each(b,function(){kf.useArray.push(this);});f();}).fail(e);};