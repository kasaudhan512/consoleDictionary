'use strict';
var service = require('../service/service');
var wordDefinition = exports.wordDefinition = function(word,callback){
    try{
        var definitionList = [];
        service.getWordDefinition(word,function(data){
            data.forEach(element => {
                definitionList.push(element['text'])
            });
            callback(definitionList);
        })
    } catch(e){
        console.log(e.message);
    }
}

var wordSynonyms = exports.wordSynonyms = function(word,callback){
    try{
        var synonymList = [];
        service.getRelatedWords(word,function(data){
            data.forEach(function(relatedWords){
                if(relatedWords['relationshipType'] == 'synonym'){
                    let words = relatedWords['words'];
                    words.forEach(function(word){
                        synonymList.push(word);
                    })
                }
            });
            callback(synonymList);
        })
    } catch(e){
        console.log(e.message);
    }
}

var wordAntonyms = exports.wordAntonyms = function(word,callback){
    try{
        var antonymList = [];
        service.getRelatedWords(word,function(data){
            data.forEach(function(relatedWords){
                if(relatedWords['relationshipType'] == 'antonym'){
                    let words = relatedWords['words'];
                    words.forEach(function(word){
                        antonymList.push(word);
                    })
                }
            });
            callback(antonymList);
        })
    } catch(e){
        console.log(e.message);
    }
}

var wordExample = exports.wordExample = function(word,callback){
    try{
        var exampleList = [];
        service.getWordExamples(word,function(data){
            data['examples'].forEach(function(example){
                exampleList.push(example);
            });
            callback(exampleList);
        })
    } catch(e){
        console.log(e.message);
    }
}
var wordFullDictionary = exports.wordFullDictionary = function(word,callback){
    var wordDictionary = {};
    Promise.all([
        new Promise((resolve,reject) => {
            wordDefinition(word,function(definitionList){
                resolve(definitionList);
            });
        }),
        new Promise((resolve,reject) => {
            wordSynonyms(word,function(synonymList){
                resolve(synonymList);
            });
        }),
        new Promise((resolve,reject) => {
            wordAntonyms(word,function(antonymList){
                resolve(antonymList);
            });
        }),
        new Promise((resolve,reject) => {
            wordExample(word,function(exampleList){
                resolve(exampleList);
            });
        })
    ]).then(function(values){
        wordDictionary['definition'] = values[0];
        wordDictionary['synonyms'] = values[1];
        wordDictionary['antonyms'] = values[2];
        wordDictionary['examples'] = values[2];
        callback(wordDictionary);
    })
}
var wordDetails = {};
var play = exports.play = function(callback){
    try{
        service.getRandomWord(function(randomWordDict){
            let randomWord = randomWordDict['word'];
            wordDetails['word'] = randomWord;
            wordDetails['displayedWords'] = new Set();
            Promise.all([
                new Promise((resolve, reject) => {
                    wordDefinition(randomWord,function(definitionList){
                        resolve(definitionList);
                    })
                }),
                new Promise((resolve, reject) => {
                    wordSynonyms(randomWord,function(synonymList){
                        resolve(synonymList);
                    })
                }),
                new Promise((resolve, reject) => {
                    wordAntonyms(randomWord,function(antonymList){
                        resolve(antonymList);
                    })
                })
            ]).then(function(values){
                wordDetails['definition'] = values[0];
                wordDetails['synonyms'] = values[1];
                wordDetails['hints'] = allPermutation(randomWord);
                values[1].forEach(function(synonym){
                    wordDetails['hints'].push(synonym);
                })
                wordDetails['antonyms'] = values[2];
                callback(wordDetails);
            })
                
        })
    } catch(e){
        console.log(e);
    }
}

exports.validAnswer = function(word,callback){
    word = word.toLowerCase();
    if(wordDetails['displayedWords'].has(word.toLowerCase())){
        callback("Sorry You Can't choose already displayed hint as Answer.");
    }
    if(wordDetails['word'].toLowerCase() == word.toLowerCase()){
        callback('Correct Word');
    } else {
        for(let index = 0;index < wordDetails['synonyms'].length;index++){
            if(synonym.toLowerCase() == word.toLowerCase()){
                callback('Correct Word');
                break;
            }
        }
        callback('Incorrect Word');
    }
}
exports.getHint = function(){

}

var allPermutation = function(permutationOptions){
    if (permutationOptions.length === 1) {
        return [permutationOptions];
    }
    const permutations = [];
    const smallerPermutations = allPermutation(permutationOptions.slice(1));
    const firstOption = permutationOptions[0];
    for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
        const smallerPermutation = smallerPermutations[permIndex];
        for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
            const permutationPrefix = smallerPermutation.slice(0, positionIndex);
            const permutationSuffix = smallerPermutation.slice(positionIndex);
            permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
        }
    }
    return permutations;
}

wordFullDictionary('natural',function(x){
    console.log(x);
});