// CourtDao extends BaseDao
var BaseDao = require('../lib/BaseDaoClass');
	
module.exports = CourtDao;

function CourtDao(){
}
CourtDao.prototype = new BaseDao();

CourtDao.prototype.table = 'court';

CourtDao.prototype.getTable = function(){
	return this.table;
};
