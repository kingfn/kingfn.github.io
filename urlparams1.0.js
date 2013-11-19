kf['urlparams'] = {};
(function(){
	var kfSearch = document.location.search;
	if (kfSearch != '') {
		kfSearch = kfSearch.substr(1);
		kfSearchSplit = kfSearch.split('&');
		$.each(kfSearchSplit, function(){
			var item = this.split('=');
			kf['urlparams'][item[0]] = item[1];
		});
	}
})();