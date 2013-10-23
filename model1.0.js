kf['model'] = function(obj, config){
	// 容器
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	// 配置
	this.config = {
		model: null,
		data: [],
		callback: null
	};
	if (config) {
		$.extend(this.config, config);
	}
	if (!this.config['model']) {
		if (this.obj.find('textarea').length > 0) {
			this.config['model'] = this.obj.find('textarea').val();
			this.obj.find('textarea').remove();
		} else {
			this.config['model'] = '';
		}
	}
	this.config['model'] = $.trim(this.config['model']);
	if (this.config['data'].length > 0) {
		this.show(this.config['data']);
	}
};
kf['model'].prototype = {
	// 展示数据
	show: function(data){
		var _this = this;
		$.each(data, function(){
			var content = _this.config['model'];
			$.each(this, function(key, val){
				var newReg = new RegExp('{#' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			_this.obj.append(content);
		});
		if (this.config['callback']) {
			this.config['callback']();
		}
	}
};