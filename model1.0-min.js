kf.model=function(b,a){if(typeof(b)=="object"){this.obj=b;}else{this.obj=$("#"+b);}this.config={model:null,data:[],callback:null};if(a){$.extend(this.config,a);
if(!this.config.model){if(this.obj.find("textarea").length>0){this.config.model=this.obj.find("textarea").val();this.obj.find("textarea").remove();}else{this.config.model="";
}}this.config.model=$.trim(this.config.model);}if(this.config.data.length>0){this.show(this.config.data);}};kf.model.prototype={show:function(a){var b=this;
$.each(a,function(){var c=b.config.model;$.each(this,function(d,e){var f=new RegExp("{#"+d+"}","g");c=c.replace(f,e);});b.obj.append(c);});if(this.config.callback){this.config.callback();
}}};