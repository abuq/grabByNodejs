var CourtDao = require('./lib/CourtDaoClass'),
    nodegrass = require('nodegrass');
	
var courtDao = new CourtDao();

var url = 'http://www.hshfy.sh.cn/shfy/gweb/ktgg_search.jsp';
courtDao.getTable();

// console.log(courtDao.getTable());

// NodeGrass.prototype.post = function(url,callback,reqheaders,data,charset)
  
var options = {
     ktrqks : '2014-01-25',
     ktrqjs : '2014-02-25',
     pagesnum : 3
};

var headers = {
	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Encoding':'gzip, deflate',
	'Accept-Language':'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
	'Connection':'keep-alive',
	'Cookie':'JSESSIONID=805BADEE1CE0C643EA7C885DB5F9E8BC',
	'Host':'www.hshfy.sh.cn',
	'Referer':'http://www.hshfy.sh.cn/shfy/gweb/ktgg_search.jsp',
	'User-Agent':'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:26.0) Gecko/20100101 Firefox/26.0',
	'Content-Length':'77',
	'Content-Type':'application/x-www-form-urlencoded'
};


nodegrass.post(
	url, 
	function(data,status,headers){
		// var accessToken = JSON.parse(data);
		// var err = null;
		console.log(status);
		console.log(data);
		// callback(err,accessToken);
    }, 
    headers, 
    options,
    'gbk'
).on('error', function(e) {
    console.log("Got error: " + e.message);
});;

