var service = require('../service/service');

wordDefinition = function(word){
    try{
        service.getWordDefinition(word,function(data){
            console.log('Word Definition');
            console.log(data);
        })
    } catch(e){
        console.log(e.message);
    }
}

wordSynonyms = function(word){
    try{
        service.getRelatedWords(word,function(data){
            console.log('word Synonyms')
            console.log(data);
        })
    } catch(e){
        console.log(e.message);
    }
}

wordAntonyms = function(word){
    try{
        service.getRelatedWords(word,function(data){
            console.log('Word antonyms')
            console.log(data);
        })
    } catch(e){
        console.log(e.message);
    }
}

wordExample = function(word){
    try{
        service.getWordExamples(word,function(data){
            console.log('Word Examples')
            console.log(data);
        })
    } catch(e){
        console.log(e.message);
    }
}
wordFullDictionary = function(word){
    console.log('Word Full Dictionary')
    wordDefinition(word);
    wordSynonyms(word);
    wordAntonyms(word);
    wordExample(word);
}
