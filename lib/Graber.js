var nodegrass = require('nodegrass');

var showMessage = function(type, message, duration) {
    
}

var Graber = {
    getHtml: function(url, callback, charset) {
    	var _defaultCharSet = 'utf8';
    
	    if(typeof charset === 'string' ){
	        _defaultCharSet = charset;
	    }
        nodegrass.get(url,function(data,status,headers){
		 
		    callback(null, data);

		}, _defaultCharSet).on('error', function(e) {
			callback(e.message + ';url:' + url);
		});
    },

    getHtmlByPost: function(url) {
        //...
    }
};

module.exports = Graber;