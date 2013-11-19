kf['urlparams'] = function(){
	if (url) {
		this.data = this.init();
	}
};
kf['urlparams'].prototype = {
	init: function(url) {
		var data = {};
		if (url.indexOf('?') > -1) {
			url = url.split('?')[1];
			if (url.indexOf('#') > -1) {
				url = url.split('#')[0];
			}
		}
		kfUrl = url.split('&');
		$.each(kfUrl, function(){
			var item = this.split('=');
			data[item[0]] = item[1];
		});
		return data;
	}
};