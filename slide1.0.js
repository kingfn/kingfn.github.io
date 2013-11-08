kf['slide'] = function(obj, config){
	this.config = {
		effect: 'horizontal', // vertical
		autoPlay: true,
		autoTime: 5000,
		autoRound: true,
		iconState: true,
		iconEvent: 'mouseover'
	};
	if (config) {
		$.extend(this.config, config);
	}
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.wrap = this.obj.find('.kf-slide-wrap');
	this.content = this.wrap.find('.kf-slide-content');
	this.pannel = this.content.find('.kf-slide-pannel');
	if (this.content.length == 0) {
		this.content = this.wrap.find('ul');
	}
	if (this.pannel.length == 0) {
		this.pannel = this.content.find('li');
	}
	this.len = this.pannel.length;
	if (this.len > 1) {
		this.init();
	}
};
kf['slide'].prototype = {
	// 初始化
	init: function(){
		// 是否循环
		if (this.config['autoRound']) {
			this.pannel.eq(0).clone().appendTo(this.content);
			this.pannel.eq(-1).clone().prependTo(this.content);
			this.pannel = this.content.find('.kf-slide-pannel');
			if (this.pannel.length == 0) {
				this.pannel = this.content.find('li');
			}
			this.startIndex = 1;
			this.endIndex = this.len;
		} else {
			this.startIndex = 0;
			this.endIndex = this.len - 1;
		}
		// 滑动方式
		if (this.config['effect'] == 'vertical') {
			this.size = this.pannel.height();
			this.content.height(this.size * this.pannel.length);
			this.wrap.scrollTop(this.size * this.startIndex);
		} else {
			this.size = this.pannel.width();
			this.content.width(this.size * this.pannel.length);
			this.wrap.scrollLeft(this.size * this.startIndex);
		}
		// 是否有icon
		if (this.config['iconState']) {
			this.creaticon();
		}
		// 初始状态
		this.index = 0;
		this.playState = false;
		// 是否自动播放
		if (this.config['autoPlay']) {
			var _this = this;
			this.autoTime = setTimeout(function(){
				_this.next();
			}, this.config['autoTime']);
		}
	},
	play: function(){
		var _this = this;
		var goLong = this.size * (this.startIndex + this.index);
		this.playState = true;
		// 检查index
		if (this.config['autoRound']) {
			if (this.index < 0 || this.index >= this.len) {
				if (this.index < 0) {
					this.index = this.len - 1;
				} else {
					this.index = 0;
				}
			}
		}
		// 是否有icon
		if (this.config['iconState']) {
			this.icon.removeClass('current');
			this.icon.eq(this.index).addClass('current');
		}
		// 清除重建自动时间
		if (this.config['autoPlay']){
			clearTimeout(this.autoTime);
			this.autoTime = setTimeout(function(){
				_this.next();
			}, this.config['autoTime']);
		}
		// 滑动动画
		if (this.config['effect'] == 'vertical') {
			var animateScroll = {
				scrollTop: goLong
			};
		} else {
			var animateScroll = {
				scrollLeft: goLong
			};
		}
		this.wrap.stop();
		this.wrap.animate(animateScroll, function(){
			_this.playState = false;
			if (_this.config['autoRound']) {
				if (_this.config['effect'] == 'vertical') {
					_this.wrap.scrollTop(_this.size * (_this.startIndex + _this.index));
				} else {
					_this.wrap.scrollLeft(_this.size * (_this.startIndex + _this.index));
				}
			}
		});
	},
	prev: function(){
		if (!this.playState) {
			this.index --;
			if (!this.config['autoRound'] && this.index < this.startIndex) {
				this.index = this.endIndex;
			}
			this.play();
		}
	},
	next: function(){
		if (!this.playState) {
			this.index ++;
			if (!this.config['autoRound'] && this.index > this.endIndex) {
				this.index = this.startIndex;
			}
			this.play();
		}
	},
	go: function(index){
		if (index != this.index) {
			this.index = index;
			this.play();
		}
	},
	creaticon: function(){
		var _this = this;
		this.iconObj = $('<ul class="kf-slide-icon"></ul>');
		for (i=0; i<this.len; i++) {
			this.iconObj.append('<li data-index="' + i + '">' + (i+1) + '</li>');
		}
		// 展示再操作，否则ie下eq定位不准
		this.obj.append(this.iconObj);
		this.icon = this.iconObj.find('li');
		this.icon.eq(0).addClass('current');
		this.icon.on(this.config['iconEvent'], function(){
			_this.go($(this).data('index'));
		});
	}
};