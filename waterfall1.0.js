kf['waterfall'] = function(obj, config){
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.config = {};
	if (config) {
		$.extend(this.config, config);
	}
	// 获取列
	if (this.config['column']) {
		if (typeof(this.config['column']) == 'object') {
			this.column = this.config['column'];
		} else {
			this.column = this.obj.find(this.config['column']);
		}
	} else {
		this.column = this.obj.find('.kf-waterfall-column');
		if (this.column.length < 1) {
			this.column = this.obj.find('li');
		}
	}
	// 获取模板
	if (this.config['model']) {
		this.model = $.trim(this.config['model']);
	} else {
		if (this.obj.find('textarea').length > 0) {
			this.model = $.trim(this.obj.find('textarea').val());
			this.obj.find('textarea').remove();
		} else {
			this.model = '';
		}
	}	
	if (this.column.length > 1) {
		this.init();
	}
};
kf['waterfall'].prototype = {
	// 准备
	init: function(){
		if (this.config['data']) {
			this.show(this.config['data']);
		}
	},
	// 展示数据
	show: function(data){
		this.data = data;
		this.dataLen = this.data.length;
		this.rankShow(0);
	},
	// 排队显示
	rankShow: function(index){
		var _this = this;
		if (index < this.dataLen) {
			var data = this.data[index];
			var content = this.model;
			$.each(data, function(key, val){
				var newReg = new RegExp('{#' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			var newObj = $(content);

			// 图片缓冲
			if (newObj.find('img.loadimg').length > 0) {
				var loadimg = newObj.find('img.loadimg').attr('src');
				var newImg = new Image();
				newImg.src = loadimg;
				if (newImg.complete) {
					setTimeout(function(){
						_this.showin(newObj);
						_this.rankShow(index + 1);
					}, 100);
				} else {
					newImg.onload = function(){
						_this.showin(newObj);
						_this.rankShow(index + 1);
					};
					newImg.onerror = function(){
						_this.showin(newObj);
						_this.rankShow(index + 1);
					};
				}
			} else {
				this.showin(newObj);
				this.rankShow(index + 1);
			}
		} else {
			if (this.config['callback']) {
				this.config['callback']();
			}
		}
	},
	// 显示操作
	showin: function(obj){
		obj.css('display', 'none');
		this.minCol().append(obj);
		obj.fadeIn('fast');
	},
	// 获取最短的列
	minCol: function(){
		var minObj = this.column.eq(0);
		var minHeight = minObj.height();
		$.each(this.column, function(index){
			if (index > 0) {
				if ($(this).height() < minHeight) {
					minHeight = $(this).height();
					minObj = $(this);
				}
			}
		});
		return minObj;
	}
};