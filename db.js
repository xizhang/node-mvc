	// === db class. a wrapper to mysql package. query sanitize etc ===

var mysql = require('mysql');
var mvc = require('./mvc');

var pool  = mysql.createPool({
	host     : mvc.config.DB_HOST,
	user     : mvc.config.DB_USER,
	password : mvc.config.DB_PASS,
	port	 : mvc.config.DB_PORT,
	database : mvc.config.DB_NAME
});

exports.query = function(sql, cb){
	pool.getConnection(function(conErr, con) {
		if(conErr){
			mvc.error("db connection error", conErr);
			cb(false);
		}else{
			con.query(sql, function(sqlErr, results) {
				if(sqlErr){
					mvc.error("db error", sqlErr);
					cb(false);
				}else{
					cb(results);	
				}
				con.end();
			});
		}
	});
}
