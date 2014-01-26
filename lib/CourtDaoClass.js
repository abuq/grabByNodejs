// CourtDao extends BaseDao
var BaseDao = require('../lib/BaseDaoClass'),
	util = require('util');

module.exports = CourtDao;

function CourtDao(){
	BaseDao.call(this);
}

util.inherits(CourtDao, BaseDao);
// CourtDao.prototype = new BaseDao();

CourtDao.prototype.table = 'court';

CourtDao.prototype.getTable = function(){
	return this.table;
};

CourtDao.prototype.add = function(data, callback){
	this.insert(data, function(results, error){
  		this.fetch(results.insertId, function(results){
	  		callback(results, error);
	  	});
  	});
};
