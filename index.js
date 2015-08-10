var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var pg = require('pg');
// var imdb = require('imdb-api');
var movie;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index')
//   var result = '';
//   var times = process.env.TIMES;
//   for (i=0; i < times; i++) {
//     result += cool();
//     response.send(result);
//   }
// });

// app.get('/movie', function(request, response){
//   imdb.getReq({name: 'The Toxic Avenger'}, function(err, things){
//     movie = things;
//   });
//   response.send(imdb());
// });

app.get('/map', function(request, response){
  response.render('pages/map')
});

app.get('/index', function(request, response){
  response.render('pages/index')
});

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

// var conString = "postgres://username:password@localhost/database";
// var client = new pg.Client(conString);

app.get('/db', function(request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done){
      console.log(client);
       client.query('SELECT * FROM test_table', function(err, result){
         done();
         if(err) {
           console.log(err);
           response.send("Error " + err); 
         } else {
           response.render('pages/db', {results: result.rows}); 
         }
	  });
   });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


