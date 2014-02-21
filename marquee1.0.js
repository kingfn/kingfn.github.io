kf['marquee'] = function(obj, config){
	this.config = {
		effect: 'horizontal', // vertical
		overStop: true
	};
	if (config) {
		$.extend(this.config, config);
	}
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.objWidth = this.obj.width();
	this.objHeight = this.obj.height();
	this.wrap = this.obj.find('.kf-marquee-wrap');
	this.content = this.wrap.find('.kf-marquee-content');
	if (this.content.length == 0) {
		this.content = this.wrap.find('ul');
	}
	this.pannel = this.content.find('.kf-marquee-pannel');
	if (this.pannel.length == 0) {
		this.pannel = this.wrap.find('li');
	}
	this.scrollState = false;
	this.scrollSize = 0;
	this.stopState = false;
	this.init();
};
kf['marquee'].prototype = {
	// 初始化
	init: function(){
		var _this = this;
		this.cloneContent = this.content.clone();
		this.doSize();
		if (this.pannel.find('img').length) {
			this.pannel.find('img').each(function(){
				var newImg = this;
				if (newImg.complete) {
					_this.doSize();
				} else {
					newImg.onload = function(){
						_this.doSize();
					};
					newImg.onerror = function(){
						_this.doSize();
					};
				}
			});
		}
		if (this.config['overStop']) {
			this.obj.hover(function(){
				_this.doStop();
			}, function(){
				_this.doPlay();
			});
		}
	},
	doSize: function(){
		var contentSize = 0;
		if (this.config['effect'] == 'vertical') {
			this.pannel.each(function(){
				contentSize += $(this).outerHeight();
			});
			this.content.height(contentSize);
			this.cloneContent.height(contentSize);
			this.wrap.height(contentSize * 2);
			if (!this.scrollState && contentSize > this.objHeight) {
				this.scrollState = true;
				this.wrap.append(this.cloneContent);
				this.cloneContent.height(contentSize);
				this.doScroll();
			}
		} else {
			this.pannel.each(function(){
				contentSize += $(this).outerWidth();
			});
			this.content.width(contentSize);
			this.cloneContent.width(contentSize);
			this.wrap.width(contentSize * 2);
			if (!this.scrollState && contentSize > this.objWidth) {
				this.scrollState = true;
				this.wrap.append(this.cloneContent);
				this.cloneContent.width(contentSize);
				this.doScroll();
			}
		}
		this.scrollSize = contentSize;
	},
	doScroll: function(){
		var _this = this;
		// 滑动动画
		if (!this.stopState) {
			if (this.config['effect'] == 'vertical') {
				var goLong = this.obj.scrollTop() + 1;
				if (goLong >= this.scrollSize) {
					goLong = 0;
				}
				this.obj.scrollTop(goLong);
			} else {
				var goLong = this.obj.scrollLeft() + 1;
				if (goLong >= this.scrollSize) {
					goLong = 0;
				}
				this.obj.scrollLeft(goLong);
			}
		}
		setTimeout(function(){
			_this.doScroll();
		}, 10);
	},
	doStop: function(){
		this.stopState = true;
	},
	doPlay: function(){
		this.stopState = false;
	}
};