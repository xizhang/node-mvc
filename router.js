// === web request routing ===  

mvc = require("./mvc");

/*
route via express.js
*/
exports.route = function(app) {
	// --- valid mvc requests ---
	app.all('/', function(req, res, next) {
		return routeMvc('index', 'index', req, res, next);
	});
	app.all('/:controller', function(req, res, next) {
		return routeMvc(req.params.controller, 'index', req, res, next);
	});
	app.all('/:controller/:method', function(req, res, next) {
		return routeMvc(req.params.controller, req.params.method, req, res, next);
	});
	app.all('/:controller/:method/:id', function(req, res, next) {
		return routeMvc(req.params.controller, req.params.method, req, res, next);
	});
	// --- invalid requests ---
	app.use(function(err, req, res, next) {
		mvc.error('error 500: ', err.stack);
		return res.render('500', 500);
	});
	app.all('/*', function(req, res) {
		mvc.warn("error 404: ", req.url);
		res.render('404', 404);
	});
};

/*
route mvc request
*/
routeMvc = function(controllerName, methodName, req, res, next) {
	var controller, data, method;
	mvc.log("mvc page, controller: " + controllerName + ", method: " + methodName + ", id: " + req.params.id);
	if (!(controllerName != null)) controllerName = 'index';
	controller = null;
	try {
		controller = require("./controllers/" + controllerName);
	} catch (e) {
		mvc.warn("controller not found: " + controllerName, e);
		return next();
	}
	data = null;
	method = null;
	if (methodName != null) {
		methodName = methodName.replace(/[^a-z0-9A-Z_-]/i, '');
		method = eval('controller.' + methodName);
	}
	if (method != null) {
		data = {};
		return method(req, data, function(isApi) {
			if (!(data != null)) {
				throw new Error("Controller's return value not implemented!");
			}
			if (isApi) {
				return res.send(data);
			} else {
				data.debugJs = mvc.config.DEBUG_CLIENT;
				data.controllerName = controllerName;
				data.methodName = methodName;
				//data.layout = "layout";
				return res.render(controllerName, data);
			}
		});
	}else{
		mvc.warn('method not found: ' + methodName);
		return next();
	}
}
