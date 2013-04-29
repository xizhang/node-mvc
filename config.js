// === app config file ===

/*
exports.DEBUG_LOG: log  debug info 
exports.DEBUG_WARN: when there is an abnormality caused by user, e.g. a malicious URL
exports.DEBUG_ERROR: things should never happen. like a DB error
exports.DEBUG_CLIENT: print client js debug info to browser's console 
exports.PORT: http port which mvc app is running on
exports.DB_ : mysql db paramters
*/
exports.setEnv = function(env) {
	console.log("setup app environment: " + env);
	switch (env) {
		case "development":
			exports.DEBUG_LOG = true;
			exports.DEBUG_WARN = true;
			exports.DEBUG_ERROR = true;
			exports.DEBUG_CLIENT = true;
			exports.PORT = 8002;
			exports.DB_HOST = 'localhost';
			exports.DB_PORT = "3306";
			exports.DB_NAME = 'mvc_example';
			exports.DB_USER = 'root';
			exports.DB_PASS = 'root';
			return true;
		case "testing":
			exports.DEBUG_LOG = true;
			exports.DEBUG_WARN = true;
			exports.DEBUG_ERROR = true;
			exports.DEBUG_CLIENT = true;
			exports.PORT = 8002;
			return true;
		case "production":
			exports.DEBUG_LOG = false;
			exports.DEBUG_WARN = false;
			exports.DEBUG_ERROR = true;
			exports.DEBUG_CLIENT = false;
			exports.PORT = 8002;
			return true
	  	default:
			console.log("environment " + env + " not found");
			return false
	}
};

