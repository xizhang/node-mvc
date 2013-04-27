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

