var mysql = require('mysql');

module.exports = BaseDao;

function BaseDao(){
}

BaseDao.prototype.database = 'node_grab';
BaseDao.prototype._primaryKey = 'id';

BaseDao.prototype.table = 'test';

BaseDao.prototype.getConnection = function(){

    var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root'
	});

	connection.connect();
	connection.query('USE '+this.database);
	return connection;
};

BaseDao.prototype.getTable = function(){
	return this.table;
};

BaseDao.prototype.fetch = function(id, callback){
	var sql = 'SELECT * FROM ' + this.table + ' WHERE '+ this._primaryKey +' = ' + id +' LIMIT 1';
	this.getConnection().query(sql, function(err, results, fields) {
	  	if (err) throw err;

	  	callback(results[0]);
	});
	
};

BaseDao.prototype.insert = function(data, callback){
	var sql = 'INSERT INTO ' + this.table + ' SET ?';
	var classThis = this;
	var query = this.getConnection().query(sql, data, function(error) {
	  	if (error) throw error;
	  	classThis.fetch(results.insertId, function(results){
	  		callback(results);
	  	});
	});
};

BaseDao.prototype.update = function(id, data, callback){
	var sql = 'UPDATE ' + this.table + ' SET ? WHERE '+ this._primaryKey +' = ' + id;
	var classThis = this;

	var query = this.getConnection().query(sql, data, function(error) {
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

BaseDao.prototype.deleteAll = function(id, callback){
	var params = [];
	
	var sql = 'DELETE FROM ' + this.table + ' WHERE '+ where;

	var query = this.getConnection().query(sql, function(error, results) {
	  	if (error) throw error;

	  	callback(results);
	});
};
// var sql = 'DELETE FROM '+ table+' WHERE '+ where;
public function deleteMessageRefsByUserIdAndThreadId ($userId, $threadId) {
	return $this->deleteAll('userId=? AND threadId=?', array($userId , $threadId));
}


//     protected function deleteAll ($where = null, array $params = array()) {
//         $sql = 'DELETE FROM ' . $this->table;
//         $sql .= !empty($where) ? ' WHERE ' . $where : '';
//         return $this->getConnection()->executeUpdate($sql, $params);
//     }

//     protected function fetchRow ($where = null, array $params = array(), $fields = null, $orderBy = null, $start = 0, $limit = null) {
//         $sql = $this->buildFetchSql($this->table, $fields, $where, $orderBy, $start, $limit);
//         $result = $this->getConnection()->fetchAssoc($sql, $params);
//         return empty($result) ? null : $result;
//     }

//     protected function fetchAll ($where = null, array $params = array(), $fields = null, $orderBy = null, $start = 0, $limit = null) {
//         $sql = $this->buildFetchSql($this->table, $fields, $where, $orderBy, $start, $limit);
//         $result = $this->getConnection()->fetchAll($sql, $params);
//         return empty($result) ? array() : $result;
//     }

//     protected function fetchColumn ($where = null, array $params = array(), $fields = null, $orderBy = null, $start = 0, $limit = null) {
//         $sql = $this->buildFetchSql($this->table, $fields, $where, $orderBy, $start, $limit);
//         return $this->getConnection()->fetchColumn($sql, $params);
//     }

//     protected function fetchIn($field, array $values, $ordered = false)
//     {
//         if (empty ($values)) {
//             return array();
//         }

//         $values = array_values($values);
//         $marks = str_repeat('?,', count($values) - 1) . '?';

//         if ($ordered) {
//             return $this->fetchAll("{$field} IN ({$marks})", array_merge($values, $values), null, "FIELD ({$field}, {$marks})");
//         }

//         return $this->fetchAll("{$field} IN ({$marks})", $values);
//     }

//     protected function count ($where = null, array $params = array(), $countField = null) {
//         $sql = 'SELECT ';
//         $sql .= empty($countField) ? 'COUNT(*) ' : "COUNT({$countField}) ";
//         $sql .= "FROM {$this->table} ";
//         $sql .= empty($where) ? '' : " WHERE {$where} ";
//         return (int) $this->getConnection()->fetchColumn($sql, $params);
//     }