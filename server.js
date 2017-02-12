var express=require('express');
var twitter=require('twitter');
var ig_ts=require('instagram-tagscrape');
// create the application
var app=express();
var port=process.env.PORT || 3000;

var keys=require('./keys')

var tw_key = keys.tw_key
var tw_secret = keys.tw_secret
var tw_bearer_token = keys.tw_bearer_token
var ig_key = keys.ig_key
var ig_secret = keys.ig_secret
var ig_access_token = ig_access_token

app.use(express.static(__dirname + '/public'));

app.get('/search/tweets/:query', function(req,res){
	getTweets(req.params.query, res)
})

app.get('/search/insta/:query', function(req,res){
	getInsta(req.params.query,res)
})

var getTweets=function(search,res){
	try{
		var client=new twitter({
		consumer_key:tw_key,
		consumer_secret:tw_secret,
		bearer_token:tw_bearer_token
	})

	client.get('search/tweets', {q:search, count:10}, function(err,tweets, response){
		if(!err){
			feeds=tweets.statuses
			feeds.forEach(function(feed){
				var date= new Date(feed.created_at)
				feed.date=date.getTime()
			})
			res.send(feeds)
		}
		else{
			res.send({})
		}
	})
	}
	catch(err){
		console.log(err)
	}
}

var getInsta= function(search,res){
	try{
		search=search.split(' ')
		result=ig_ts.scrapeTagPage(search.join('')).then(function(result){
			res.send(result.media)	
		})
	}
	catch(err){
		console.log(err)
	}
}

console.log('server listening on port 3000')

app.listen(port);
