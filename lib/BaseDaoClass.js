var mysql = require('mysql');

module.exports = BaseDao;

function BaseDao(table){
	this.table = table;
	this.database = 'node_grab';
	if (typeof BaseDao._initialized == "undefined") 
	{
		BaseDao.prototype.setConnection = function(){
			var connection = mysql.createConnection({
				host     : 'localhost',
				user     : 'root',
				password : 'root'
			});

			connection.connect();
			connection.query('USE '+this.database);
			this.connection = connection;
		};
		BaseDao._initialized = true;
	}
}

BaseDao.prototype._primaryKey = 'id';

BaseDao.prototype.table = 'court';

BaseDao.prototype.getConnection = function(){
	return this.connection;
}

BaseDao.prototype.getTable = function(){
	return this.table;
};

BaseDao.prototype.closeConnection = function(){
	return this.getConnection().end();
};

BaseDao.prototype.fetch = function(id, callback){
	var sql = 'SELECT * FROM ' + this.table + ' WHERE '+ this._primaryKey +' = ' + id +' LIMIT 1';
	this.getConnection().query(sql, function(err, results, fields) {
	  	if (err) throw err;

	  	callback(results[0]);
	});
	
};

// this->fetchRow('licenseNum = ?', array($licenseNum));
BaseDao.prototype.fetchRow = function(where, params, callback){
	var sql = 'SELECT * FROM ' + this.table + ' WHERE '+ where;

	var query = this.getConnection().query(sql, params, function(error, results) {
	  	if (error) throw error;
	  	callback(error, results);
	});
};

BaseDao.prototype.insert = function(data, callback){
	var sql = 'INSERT INTO ' + this.table + ' SET ?';
	var classThis = this;

	var query = this.getConnection().query(sql, data, function(error, results) {
	  	if (error) throw error;
	  	classThis.fetch(results.insertId, function(fetchError, results){
	  		// if(error || fetchError)
	  		// {
	  		// 	error = error+fetchError;
	  		// }
	  		callback(error, results);
	  	});
	});
};

BaseDao.prototype.update = function(id, data, callback){
	var sql = 'UPDATE ' + this.table + ' SET ? WHERE '+ this._primaryKey +' = ' + id;
	var classThis = this;

	var query = this.getConnection().query(sql, data, function(error, results) {
	  	if (error) throw error;
	  	classThis.fetch(id, function(results){

	  		callback(results);
	  	});
	});
};

BaseDao.prototype.deleteById = function(id, callback){
	var sql = 'DELETE FROM ' + this.table + ' WHERE '+ this._primaryKey +' = ' + id;

	var query = this.getConnection().query(sql, function(error, results) {
	  	if (error) throw error;

	  	callback(results);
	});
};

// @todo
// BaseDao.prototype.deleteAll = function(id, callback){
// 	var params = [];
	
// 	var sql = 'DELETE FROM ' + this.table + ' WHERE '+ where;

// 	var query = this.getConnection().query(sql, function(error, results) {
// 	  	if (error) throw error;

// 	  	callback(results);
// 	});
// };
// var sql = 'DELETE FROM '+ table+' WHERE '+ where;
// public function deleteMessageRefsByUserIdAndThreadId ($userId, $threadId) {
// 	return $this->deleteAll('userId=? AND threadId=?', array($userId , $threadId));
// }
