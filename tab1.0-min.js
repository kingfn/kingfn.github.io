kf.tab=function(b,a){this.config={eventType:"mouseover",index:0,option:".tab-option",pannel:".tab-pannel",optionClass:"current",pannelClass:"current"};
if(a){$.extend(this.config,a);}if(typeof(b)=="object"){this.obj=b;}else{this.obj=$("#"+b);}this.option=this.config.option;if(typeof(this.option)!="object"){this.option=this.obj.find(this.config.option);
}this.pannel=this.config.pannel;if(typeof(this.pannel)!="object"){this.pannel=this.obj.find(this.config.pannel);}this.index=-1;this.show(this.config.index);
this.init();};kf.tab.prototype={init:function(){var a=this;this.option.each(function(b,c){$(c).data("tabIndex",b);$(c).on(a.config.eventType,function(){a.show($(this).data("tabIndex"));
});});},show:function(a){if(a!=this.index){this.index=a;this.option.removeClass(this.config.optionClass);this.option.eq(a).addClass(this.config.optionClass);
this.pannel.removeClass(this.config.pannelClass);this.pannel.eq(a).addClass(this.config.pannelClass);if(this.config.callback){this.config.callback(a);}}}};
