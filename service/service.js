'use strict';
const request = require('request');
const util = require('util')
const API_KEY = "6efb03b5ccadfe5bd4fffdc0d800f25763dc4ccbb35822e9a05d23f573b6554a8fc4c4625b75c58d198b9f7df2841ec47b9bbc5d213569c8614b697dc0b23a62e146e56919842ff1e7aed3c9638cdaa4";
const randomWordAPI = "https://fourtytwowords.herokuapp.com/words/randomWord?api_key=%s";
const wordDefinitionAPI = "https://fourtytwowords.herokuapp.com/word/%s/definitions?api_key=%s";
const wordExampleAPI = "https://fourtytwowords.herokuapp.com/word/%s/examples?api_key=%s";
const relatedWordsAPI = "https://fourtytwowords.herokuapp.com/word/%s/relatedWords?api_key=%s";

var separateReqPool = {
    maxSockets: 10
};
var request_def = request.defaults({
    pool: separateReqPool,
    timeout: 120000
})

exports.getWordDefinition = function(word,callback){
    let wordDefinitionApi = util.format(wordDefinitionAPI,word,API_KEY);
    console.log(wordDefinitionApi)
    request_def.get(wordDefinitionApi, function (error, response, body) {
        if(error){
            throw new Error(error.toString());
        } else {
            if(response.statusCode != 200){
                throw new Error("API did not Response");
            } else {
                callback(JSON.parse(body));
            }
        }
    });
}

exports.getWordExamples = function(word,callback){
    let wordExampleApi = util.format(wordExampleAPI,word,API_KEY);
    request_def.get(wordExampleApi, function (error, response, body) {
        if(error){
            throw new Error(error.toString());
        } else {
            if(response.statusCode != 200){
                throw new Error("API did not Response");
            } else {
                callback(JSON.parse(body));
            }
        }
    });
}

exports.getRelatedWords = function(word,callback){
    let relatedWordsApi = util.format(relatedWordsAPI,word,API_KEY);
    request_def.get(relatedWordsApi, function (error, response, body) {
        if(error){
            throw new Error(error.toString());
        } else {
            if(response.statusCode != 200){
                throw new Error("API did not Response");
            } else {
                callback(JSON.parse(body));
            }
        }
    });
}

exports.getRandomWord = function(callback){
    let randomWordApi = util.format(randomWordAPI,API_KEY);
    request_def.get(randomWordApi, function (error, response, body) {
        if(error){
            throw new Error(error.toString());
        } else {
            if(response.statusCode != 200){
                throw new Error("API did not Response");
            } else {
                let data = JSON.parse(body);    
                callback(JSON.parse(body));
            }
        }
    });
}