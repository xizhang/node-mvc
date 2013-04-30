
exports.index = function(req, data, render){
	initData(req, data);
	pass = req.param('password', "");
	if(pass == "asdf"){
		req.session.login = true;
		data.login = true;
		data.msg = "logged in successfully";
	}
	render();
}

exports.logout = function(req, data, render){
	initData(req, data);
	req.session.login = false;
	data.login = false;
	data.msg = "logged out successfully";
	render();
}


// --- shared functions
function initData(req, data){
	data.login = req.session.login;
	data.msg = "";
}

