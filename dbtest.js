var BaseDao = require('./lib/BaseDaoClass');
	
var baseDao = new BaseDao();

// baseDao.getConnection();

baseDao.getTable();

baseDao.fetch('1', function(result){
	// result;
});


var data  = {
  'content': 'list',
  'time': new Date(),
};
// baseDao.insert(data, function(result){
// 	// console.log(result);
// });

var data2  = {
  'content': 'aaaaaaaaaaaaaaaa',
  'time': new Date(),
};
// baseDao.update('6', data2, function(result){
// 	console.log(result);
// });


// baseDao.deleteById('6', function(result){
// 	console.log(result);
// });