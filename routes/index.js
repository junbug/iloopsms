
/*
 * GET home page.
 */

 var pg = require('pg')

var connString = "postgres://yankobolanos@localhost/iloopsms";
var client = new pg.Client(connString);

client.connect(function(err){
	if(err){
		console.log('error: ' + err);
	}
});


exports.index = function(req, res){
  res.send('hello');
};

exports.sms = function(req, res) {

	var body = req.body.Body;
	var from = req.body.From;
	console.log("from: " + from);

	var body_echo = from + " " + body;


    var client = new pg.Client(connString);
    client.connect(function(err){
        if(err){
        	console.log("err: " + err);
            throw {code:500, body:{error:"Error connecting to db"}};
        }

        var sql = "SELECT * FROM iloop_users WHERE username=$1;"
        var sql_params = [from];
        client.query(sql, sql_params, function(err, result){

        	client.end();
        	if(err){
        		console.log("error: " + err);
	            throw {code:500, body:{error:"Error querying"}};
        	}

        	if (result.rows.length == 0){
	        	res.send('hiiii');
        	} else {
        		res.send('hello again');
        	}

        });


    });

};
