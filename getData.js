var BaseDao = require('./lib/BaseDaoClass'),
    Graber = require('./lib/Graber'),
    cheerio = require('cheerio'),
    async = require('async'),
    baseDao = new BaseDao('court'),
    baseDao.setConnection();

function strToJson(str)
{  
    return JSON.parse(str);  
}

//当前时间戳
function timestamp() 
{ 
	var timestamp = Date.parse(new Date()); 
	return timestamp; 
} 

/*
*  分解后存入数据库
*/
function saveData(html, url)
{
	htmlJson = strToJson(html);

	var $ = cheerio.load(htmlJson.bulletin.content);
	var table = $(htmlJson.bulletin.content),
	    courtNum = $(table).find('tr').eq(0).find('td').eq(1).text().trim(),
	    courtTime = $(table).find('tr').eq(1).find('td').eq(1).text().trim(),
	    courtPlace = $(table).find('tr').eq(2).find('td').eq(1).text().trim(),
	    defendant = $(table).find('tr').eq(3).find('td').eq(1).text().trim(),
	    announceTime = $(table).find('tr').eq(5).find('td').eq(1).text().trim();

	var data ={
		'court':'广东省法院',
		'courtPlace': courtPlace,
		'courtTime': courtTime,
		'announceTime': announceTime,
		'courtNum': courtNum,
		'defendant': defendant,
		'createdTime':timestamp(),
		'href':url
	}

	baseDao.insert(data, function(error, results){
		if(error) throw error;
		// baseDao.closeConnection();
  	});

  	setImmediate(function(){
  		console.log('---Insert Finish---');
  	});
}


function getHtml(page)
{

	var listUrl = "http://www.gdcourts.gov.cn/gdcourt/front/bulletin!list.action?page.pageNo="+page+"&page.orderBy=pub_time&page.order=desc&filter_EQI_type=&filter_LIKES_title=&filter_LIKES_content=";
	Graber.getHtml(listUrl, function(getHtmlError, html){
		//if Graber.getHtml Error:
		if(typeof getHtmlError === 'string')
		{
			var data  = {
			  'log': 'Graber.getHtml Error:' + getHtmlError,
			  'createdTime': timestamp(),
			  'status' : 1
			};
			baseDao.insert(data, function(error, results){
				if(error) throw error;
		  	});
		}

		var $ = cheerio.load(html);
		var listLi = $(html).find('.list_right_sub');

		$(listLi).each(function(i, item){
			var hrefTemp = $(item).find('.list_right_sub_1 a').attr('href');
			hrefArrTemp = hrefTemp.split("('");
			hrefArr = hrefArrTemp[1].split("','");
		
			href = 'http://www.gdcourts.gov.cn/gdcourt/front/' + hrefArr[0];
			getDetailHtml(href);
		
		});	
	});
}

function findCourtByUrl(url, callback)
{
	// fetchRow('licenseNum = ?', array($licenseNum)
	var params = [url,1];
	baseDao.fetchRow('href = ? and status != ? ', params, function(error, results){
		if(error) throw error;
		results = results.length ? 'exit':'';
		callback(results);
  	});
}

function getDetailHtml(url)
{
	// var url = 'http://www.gdcourts.gov.cn/gdcourt/front/bulletin!detailjson.action?id=45118';

	Graber.getHtml(url, function(getHtmlError, html){
		//if Graber.getHtml Error:
		if(typeof getHtmlError === 'string')
		{
			var data  = {
			  'log': 'Graber.getDetailHtml Error:' + getHtmlError,
			  'createdTime': timestamp(),
			  'status': 1
			};
			baseDao.insert(data, function(error, results){
				if(error) throw error;
		  	});
		}

		//排重
		findCourtByUrl(url, function(results){
			if (results === 'exit') {
				console.log('---href exit---');
				return;
			}else{
				saveData(html, url);
			}
		});

	});
}

function listLoop(start, end){  		
    while (start < end){        
        getHtml(start);
        start ++;
    }
}

listLoop(3,5);
// getHtml(6);
// getDetailHtml(listUrl);