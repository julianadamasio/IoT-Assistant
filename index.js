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
  //palavras globais
  var events = "events";
  // var pucrs = "pucrs";
  var building = "building";
  var smartcity = "smart city";

  //prédios
  var p32 = "32";
  var p30 = "30";

  //biblioteca
  var book = "book";
  var book1 = "designing interfaces";
  var book2 = "agile";
  var keyword = "software development";

    //EVENTOS
    if(message.indexOf(smartcity) > -1) {
      sendResponse("Smart cities are projects in which a given urban space is the scene of intensive experiences of communication and information technologies sensitive to the Internet of Things context, of urban management and social action driven by data.");
    }//else
    //
    // if(message.indexOf(song) > -1) {
    //   sendResponse('<speak> playing audio news <audio src="https://leafarmd.000webhostapp.com/news2.mp3"></audio></speak>')
    // }else
    //
    // //Sessão de eventos

    // //BIBLIOTECA
    if(message.indexOf(book) > -1) {
        if(message.indexOf(book1) > -1) { //book1 = "designing interfaces";
          sendResponse("<speak>The book designing interfaces is available for lease for 7 days. Its location is on the 3rd floor, shelf number 16.</speak>");
        }else
        if(message.indexOf(book2) > -1) { //book2 = "scrum";
          sendResponse("<speak>This book is not available. Borrowed until Oct 16, 2017 22:50.</speak>");
        }else
        if(message.indexOf(keyword) > -1) {
          sendResponse("<speak>The books: Software development rhythms, Software development failures, Running an agile software development project and Using aspect-oriented programming for trustworthy software development are the results returned from your search.</speak>");
        }else
          sendResponse("<speak>No books were identified with this title.</speak>");
    }else

    if(message.indexOf(events) > -1) {
        if(message.indexOf(building) > -1) {
              if(message.indexOf(p30) > -1) {
                sendResponse("<speak>There will be an event called Electrical Engineering, on October 16, 2017, at 5:30 p.m. in room 201 of building 30, second floor.</speak>");
              }else if(message.indexOf(p32) > -1) {
                sendResponse("<speak>There will be an event called Smart Cities and IoT, on October 16, 2017, at 6:00 pm in the ground floor auditorium of building 32.</speak>");
              }else
                sendResponse("<speak>No events were identified in the building mentioned.</speak>");
        }else
          sendResponse("<speak>There will be an event called Entrepreneurship in the academic world, on October 16, 2017, at 7:00 pm in the auditorium of building 15, second floor. There will be an event called Legislation and Philosophy, on October 16, 2017, at 4:00 p.m. in Room 303 of Building 11 on the third floor.</speak>");
    }else {
      sendResponse("sorry, i cant help you with that.");
    }

    function sendResponse(msg) {
      assistant.ask(msg);
    }

});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
