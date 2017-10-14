'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var pos = 0;
const restService = express();
process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;
restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {

  const assistant = new Assistant({ request: req, response: res });
  var message = assistant.getArgument('echoText').toLowerCase();
  var song = "talk";
  var ubilab = "ubilab";
  var title = " ";
  var next = "next";
  var back = "back";
  //news sections

  var news = "news";
  var science = "science";
  var economy = "economy";
  var education = "education";
  var world = "world";
  var music = "music";
  var politics = "politics";
  var technology = "technology";
  var sports = "sports";
  var headlines = "headlines";
  //regions
  var sp = "sao paulo";
  var rj = "rio de janeiro";
  var rs = "rio grande do sul";
  var newsArr = ["news", "science", "economy", "education", "music", "politics", "technology", "sports"];

    if(message.indexOf("location") > -1) {
      let preciseLocationPermission = assistant.SupportedPermissions.NAME;
      assistant.askForPermissions('To address you by name and know your location',[preciseLocationPermission]);
      //assistant.ask(assistant.getDeviceLocation().coordinates.latitude);
      //let displayName = app.getUserName().displayName;
    }else

    if(message.indexOf(next) > -1) {
      if(pos == 7){
        pos = 0
      } else pos++;

      setMessage(newsArr[pos]);
    }else

    if(message.indexOf(back) > -1) {
      if(pos == 0){
        pos = 7
      } else pos--;
      setMessage(newsArr[pos]);
    }else

    if(message.indexOf(ubilab) > -1) {
      sendResponse("Ubilab is a place for academic research which connects theoretical references with their practical application. The lab was created in the Graduate Program of Communications of the Pontifical Catholic University of Rio Grande do Sul (PUCRS) to create a multidisciplinary dialogue to research new perspectives of the Information Society.");
    }else

    if(message.indexOf(headlines) > -1) {
      sendResponse('<speak> playing audio news <audio src="https://leafarmd.000webhostapp.com/news2.mp3"></audio></speak>')
    }else{
      setMessage(message);
    }


    //news sections

    function setMessage(message){
      if(message.indexOf(economy) > -1) {
        pos = 2;
        title = "these are the latest news for economy: ";
        parseFromRSS('http://g1.globo.com/dynamo/economia/rss2.xml');
      }else

      if(message.indexOf(education) > -1) {
        pos = 3
        title = "these are the latest news for education: ";
        parseFromRSS('http://g1.globo.com/dynamo/educacao/rss2.xml');
      }else

      if(message.indexOf(music) > -1) {
        pos = 4;
        title = "these are the latest news for music: ";
        parseFromRSS('http://g1.globo.com/dynamo/musica/rss2.xml');
      }else

      if(message.indexOf(science) > -1) {
        pos = 1;
        title = "these are the latest news for science: ";
        parseFromRSS('http://g1.globo.com/dynamo/ciencia-e-saude/rss2.xml');
      }else

      if(message.indexOf(politics) > -1) {
        pos = 5;
        title = "these are the latest news for politics: ";
        parseFromRSS('http://g1.globo.com/dynamo/politica/mensalao/rss2.xml');
      }else

      if(message.indexOf(technology) > -1) {
        pos = 6;
        title = "these are the latest news for technology: ";
        parseFromRSS('http://g1.globo.com/dynamo/tecnologia/rss2.xml');
      }else

      if(message.indexOf(sports) > -1) {
        pos = 7;
        title = "these are the latest news for sports ";
        parseFromRSS('http://globoesporte.globo.com/servico/semantica/editorias/plantao/feed.rss');
      }else

      if(message.indexOf(sp) > -1) {
        title = "these are the latest news for Sao Paulo: ";
        parseFromRSS('http://g1.globo.com/dynamo/sao-paulo/rss2.xml');
      }else

      if(message.indexOf(rj) > -1) {
        title = "these are the latest news for Rio  de Janeiro: ";
        parseFromRSS('http://g1.globo.com/dynamo/rio-de-janeiro/rss2.xml');
      }else

      if(message.indexOf(rs) > -1) {
        title = "these are the latest news for Rio Grande do Sul: ";
        parseFromRSS('http://g1.globo.com/dynamo/rs/rio-grande-do-sul/rss2.xml');
      }else

      if(message.indexOf(news) > -1) {
        pos = 0;
        title = "these are the latest news: ";
        parseFromRSS('http://g1.globo.com/dynamo/rss2.xml');
      }else{
        sendResponse("<speak>sorry, i can't help you with that, but you can ask me the news or about sports.</speak>");
      }
    }



    function parseFromRSS(url){
      var parser = require('rss-parser');
      parser.parseURL(url, function(err, parsed) {
        var speechNews = "";
        for(var i = 0; i < 4;i++){
        speechNews = parsed.feed.entries[i].title + ".\n" + speechNews;
        }
        sendResponse("<speak>" + title + "<break time='1s'/>" + speechNews + "</speak>");
      });
    }

    function sendResponse(msg) {
      assistant.ask(msg);
    }

});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
