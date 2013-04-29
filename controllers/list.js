var mvc = require("../mvc");
var db = require("../db");

exports.index = function(req, data, render) {
	db.query("show tables like 'items'",[], function(results){
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
	sql = "create table items (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, value VARCHAR(100), ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP);";
	db.query(sql, [], function(results){
		if(results){
			data.msg = "DB table successfully created.";
		}else{
			data.msg = "Error creating DB table.";
		}
		render(false);
	});
}



exports.test = function(seq, data, render){
	initData(data);
	data.test = "asdf";
	render(true);
}

// --- shared functions

function initData(data){
	data.empty = false;
	data.msg = "OK";
}

