kf.slide=function(b,a){this.config={effect:"horizontal",autoPlay:true,autoTime:5000,autoRound:true,iconState:true,iconEvent:"mouseover"};if(a){$.extend(this.config,a);
}if(typeof(b)=="object"){this.obj=b;}else{this.obj=$("#"+b);}this.wrap=this.obj.find(".kf-slide-wrap");this.content=this.wrap.find(".kf-slide-content");
this.pannel=this.content.find(".kf-slide-pannel");if(this.content.length==0){this.content=this.wrap.find("ul");}if(this.pannel.length==0){this.pannel=this.content.find("li");
}this.len=this.pannel.length;if(this.len>1){this.init();}};kf.slide.prototype={init:function(){if(this.config.autoRound){this.pannel.eq(0).clone().appendTo(this.content);
this.pannel.eq(-1).clone().prependTo(this.content);this.pannel=this.content.find(".kf-slide-pannel");if(this.pannel.length==0){this.pannel=this.content.find("li");
}this.startIndex=1;this.endIndex=this.len;}else{this.startIndex=0;this.endIndex=this.len-1;}if(this.config.effect=="vertical"){this.size=this.pannel.height();
this.content.height(this.size*this.pannel.length);this.wrap.scrollTop(this.ilong*this.startIndex);}else{this.size=this.pannel.width();this.content.width(this.size*this.pannel.length);
this.wrap.scrollLeft(this.ilong*this.startIndex);}if(this.config.iconState){this.creaticon();}this.index=0;this.playState=false;if(this.config.autoPlay){var a=this;
this.autoTime=setTimeout(function(){a.next();},this.config.autoTime);}},play:function(){var c=this;var b=this.size*(this.startIndex+this.index);this.playState=true;
if(this.config.autoRound){if(this.index<0||this.index>=this.len){if(this.index<0){this.index=this.len-1;}else{this.index=0;}}}if(this.config.iconState){this.icon.removeClass("current");
this.icon.eq(this.index).addClass("current");}if(this.config.autoPlay){clearTimeout(this.autoTime);this.autoTime=setTimeout(function(){c.next();},this.config.autoTime);
}if(this.config.effect=="vertical"){var a={scrollTop:b};}else{var a={scrollLeft:b};}this.wrap.stop();this.wrap.animate(a,function(){c.playState=false;if(c.config.autoRound){if(c.config.effect=="vertical"){c.wrap.scrollTop(c.size*(c.startIndex+c.index));
}else{c.wrap.scrollLeft(c.size*(c.startIndex+c.index));}}});},prev:function(){if(!this.playState){this.index--;if(!this.config.autoRound&&this.index<this.startIndex){this.index=this.endIndex;
}this.play();}},next:function(){if(!this.playState){this.index++;if(!this.config.autoRound&&this.index>this.endIndex){this.index=this.startIndex;}this.play();
}},to:function(a){if(a!=this.index){this.index=a;this.play();}},creaticon:function(){var a=this;this.iconObj=$('<ul class="kf-slide-icon"></ul>');for(i=0;
i<this.len;i++){this.iconObj.append('<li data-index="'+i+'">'+(i+1)+"</li>");}this.icon=this.iconObj.find("li");this.icon.eq(0).addClass("current");this.icon.on(this.config.iconEvent,function(){a.to($(this).data("index"));
});this.obj.append(this.iconObj);}};