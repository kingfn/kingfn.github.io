kf['fade'] = function(obj, config){
	this.config = {
		autoPlay: true,
		autoTime: 5000,
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
	this.wrap = this.obj.find('.kf-fade-wrap');
	this.content = this.wrap.find('.kf-fade-content');
	this.pannel = this.content.find('.kf-fade-pannel');
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
kf['fade'].prototype = {
	// 初始化
	init: function(){
		this.index = 0;
		this.pannel.css({
			'position': 'absolute',
			'z-index': 1
		});
		this.pannel.eq(this.index).css('z-index', 2);
		// 是否有icon
		if (this.config['iconState']) {
			this.creaticon();
		}
		// 是否自动播放
		this.playState = false;
		if (this.config['autoPlay']) {
			var _this = this;
			this.autoTime = setTimeout(function(){
				_this.next();
			}, this.config['autoTime']);
		}
	},
	play: function(){
		var _this = this;
		this.playState = true;
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
		// 渐变动画
		var currentObj = this.pannel.eq(this.index);
		currentObj.css({
			'z-index': 3,
			'opacity': 0
		});
		currentObj.animate({
			'opacity': 1
		}, function(){
			_this.pannel.css('z-index', 1);
			currentObj.css('z-index', 2);
			_this.playState = false;
		});
	},
	prev: function(){
		if (!this.playState) {
			this.index --;
			if (this.index < 0) {
				this.index = this.len - 1;
			}
			this.play();
		}
	},
	next: function(){
		if (!this.playState) {
			this.index ++;
			if (this.index >= this.len) {
				this.index = 0;
			}
			this.play();
		}
	},
	go: function(index){
		if (index != this.index) {
			this.pannel.stop();
			var currentObj = this.pannel.eq(this.index);
			currentObj.css({
				'z-index': 2,
				'opacity': 1
			});
			this.index = index;
			this.play();
		}
	},
	creaticon: function(){
		var _this = this;
		this.iconObj = $('<ul class="kf-fade-icon"></ul>');
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