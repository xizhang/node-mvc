var mvc = require("../mvc");
var db = require("../db");

exports.index = function(req, data, render) {
	db.query("show tables like 'items'",[], function(err, results){
		initData(data);
		if(results){
			if(results.length==0){
				data.empty = true;
				data.msg = "DB table not exists. Do you want to create one?";
			}else{

			}
		}else{
			data.msg = "Cannot connect to mysql DB '"+ mvc.config.DB_NAME+ "'. Please check node.js output and your /config.js file."
		}
		return render(false);
	});
};

exports.create = function(req, data, render){
	initData(data);
	sql = [];
	params = [];
	sql.push("create table items (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, value VARCHAR(100), ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP);");
	params.push([]);
	sql.push("insert into items (value) values (?)");
	params.push(['A']);
	sql.push("insert into items (value) values (?)");
	params.push(['B']);
	sql.push("insert into items (value) values (?)");
	params.push(['C']);
	db.query(sql, params, function(err,results){
		if(err){
			data.msg = "Error creating DB table.";
		}else{
			data.msg = "DB table successfully created.";
		}
		render(false);
	});
}


exports.drop = function(seq, data, render){
	initData(data);
	db.query("drop table items", [], function(err, results){
		if(err){
			data.msg = "Error dropping DB table";
		}else{
			data.msg = "DB table dropped";
		}
		render(false);
	});
}

// --- shared functions
function initData(data){
	data.empty = false;
	data.msg = "";
}

