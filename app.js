    var express = require('express')
    var router = require('./router')
    var config = require("./config");


var app = express();

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set("view options", {
        layout: true
    });
	app.engine('.html', require('ejs').__express);
	app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "keyboard cat"
    }));
    app.use(express.methodOverride());
    app.use(app.router);
});

/*
load up settings for environments
*/
app.configure('production', 'development', 'testing', function() {
	config.setEnv(app.settings.env);
});

router.route(app);

app.listen(config.PORT, function(){
  console.log("[*] startup  -> " + new Date()+ " config: "+ app.settings.env  + " port: " + config.PORT + " cache: " + app.enabled('view cache'));  
});


