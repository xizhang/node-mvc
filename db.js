	// === db class. a wrapper to mysql package. query sanitize etc ===

var mysql = require('mysql');
var async = require('async');
var mvc = require('./mvc');

var pool  = mysql.createPool({
	host     : mvc.config.DB_HOST,
	user     : mvc.config.DB_USER,
	password : mvc.config.DB_PASS,
	port	 : mvc.config.DB_PORT,
	database : mvc.config.DB_NAME
});

exports.query = function(sql, params, cb){
	// if it's multiple queries, we wrap them in sync; if not, do it directly.
	if (sql instanceof Array) {
		if(sql.length != params.length){
			mvc.error("multiple query and params size don't match.", sql, params);
			cb(true, null);
		}else{
			var cbs = [];
			for(var i=0; i<sql.length; i++){
				(function(s, p){
					cbs.push(function(asyncCb){
						singleQuery(s, p, asyncCb);
					});
				})(sql[i], params[i]);
			}
			console.log("cb number " + cbs.length);
			async.series(cbs, function(err, results){
				cb(err, results); 
			});
		}
	}else{
		singleQuery(sql, params, cb);
	}
}

function singleQuery(sql, params, cb){
	pool.getConnection(function(conErr, con) {
		if(conErr){
			mvc.error("db connection error", conErr);
			cb(true, results);
		}else{
			con.query(sql, params, function(sqlErr, results) {
				if(sqlErr){
					mvc.error("db error", sql, params, sqlErr);
					cb(true, results);
				}else{
					cb(false, results);	
				}
				con.end();
			});
		}
	});
}
