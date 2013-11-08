kf['overlay'] = function(config){
	this.config = {
		width: 'auto',
		height: 'auto',
		close: '.kf-overlay-close',
		mask: true,
		maskClose: true
	};
	if (config) {
		$.extend(this.config, config);
	}
	this.init();
};
kf['overlay'].prototype = {
	// 初始化
	init: function(){
		var _this = this;
		// 创建mask层
		if (this.config['mask']) {
			if ($('.kf-overlay-mask').length == 0) {
				this.mask = $('<div class="kf-overlay-mask" style="position:fixed;_position:absolute;left:0;right:0;top:0;bottom:0;z-index:90;background-color:#000;display:none;opacity:0.5;filter:alpha(opacity=50);"></div>');
				$('body').append(this.mask);
			} else {
				this.mask = $('.kf-overlay-mask');
			}
			if (this.config['maskClose']) {
				this.mask.click(function(){
					_this.hide();
				});
			}
		}
		// 创建弹出层
		if ($('.kf-overlay').length == 0) {
			this.overlay = $('<div class="kf-overlay" style="position:fixed;_position:absolute;z-index:99;display:none;overflow:auto;"></div>');
			if (this.config['width'] != 'auto') {
				this.overlay.width(this.config['width']);
			}
			if (this.config['height'] != 'auto') {
				this.overlay.height(this.config['height']);
			}
			$('body').append(this.overlay);
		} else {
			this.overlay = $('.kf-overlay');
		}
		// 是否有内容
		if (this.config['content']) {
			this.show(this.config['content']);
		}
		this.auto();
	},
	// 显示
	show: function(content){
		var _this = this;
		if (content) {
			this.overlay.html(content);
			if (typeof(this.config['close']) == 'object') {
				var closeBtn = this.config['close'];
			} else {
				var closeBtn = this.overlay.find(this.config['.close']);
			}
			closeBtn.click(function(){
				_this.hide();
				return false;
			});
		}
		this.overlay.css('display', 'block');
		if (this.config['mask']) {
			this.mask.css('display', 'block');
		}
		this.isShow = true;
		this.center();
	},
	// 隐藏
	hide: function(){
		this.overlay.css('display', 'none');
		if (this.config['mask']) {
			this.mask.css('display', 'none');
		}
		this.isShow = false;
	},
	// 居中
	center: function(){
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var overlayWidth = this.overlay.width();
		var overlayHeight = this.overlay.height();
		if (overlayWidth > winWidth) overlayWidth = winWidth;
		if (overlayHeight > winHeight) overlayHeight = winHeight;
		var left = (winWidth - overlayWidth) / 2;
		var top = (winHeight - overlayHeight) * 0.4;
		this.overlay.css({
			'left': left,
			'top': top
		});
		if (this.config['mask'] && this.mask.css('position') == 'absolute') {
			this.mask.css({
				'width': $(document).width(),
				'height': $(document).height()
			});
		}
	},
	// 自动
	auto: function(){
		var _this = this;
		$(window).resize(function(){
			if (_this.isShow) {
				_this.center();
			}
		});
	}
};