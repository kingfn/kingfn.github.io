/* kf v0 */
var kf = {};
kf['host'] = 'http://kf.fwowo.com/';
kf['getStyle'] = function(url, callback, errback) {
	var newLink = document.createElement('link');
	newLink.rel = 'stylesheet';
	newLink.href = url;
	document.getElementsByTagName('head')[0].appendChild(newLink);
	if (callback) {
		newLink.onload = function() {
			callback();
		}
	}
	if (errback) {
		newLink.onerror = function() {
			errback();
		}
	}
};
kf['debug'] = false;
kf['useArray'] = [];
kf['use'] = function(list, callback, errcallback) {
	var callback1 = function() {}, callback2 = function() {}, min = '-min.js', fn = [];
	if (callback) {
		callback1 = callback;
	}
	if (errcallback) {
		callback2 = errcallback;
	}
	if (kf['debug']) {
		min = '.js?r=' + Math.random();
	}
	if (typeof(list) == 'string') {
		var fns = [list];
	} else {
		var fns = list;
	}
	$.each(fns, function() {
		if (this.indexOf('#') == 0) {
			var url = this.substr(1) + min;
		} else {
			var url = kf['host'] + this + min;
		}
		if ($.inArray(this, kf['useArray']) < 0) {
			fn.push($.ajax({
				type: "GET",
				url: url,
				dataType: "script",
				scriptCharset: "UTF-8",
				cache: true
			}));
		}
	});
	$.when(fn[0], fn[1], fn[2], fn[3], fn[4], fn[5], fn[6], fn[7], fn[8], fn[9]).done(function() {
		$.each(fns, function() {
			kf['useArray'].push(this);
		});
		callback1();
	}).fail(callback2);
};