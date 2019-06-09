var readlineSync = require('readline-sync');
var controller = require('./controller/controller') 

var menu = function(){
    console.log('1 - Display Definitions of a Word');
    console.log('2 - Display Synonyms of a Word');
    console.log('3 - Display Antonyms of a Word');
    console.log('4 - Display Examples of a Word');
    console.log('5 - Display Full Dictionary of a Word');
    console.log('6 - Play Word Game');
    var chooseOption = readlineSync.question('Chooses One of the option\n');
    chooseOption = parseInt(chooseOption);
    switch(chooseOption){
        case 1:
            var word = readlineSync.question('Enter a Word to get Definition\n');
            console.log('Please wait a while...');
            word = word.toLowerCase();
            controller.wordDefinition(word,function(definitionList){
                if(definitionList == 0){
                    console.log("No Definition Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<definitionList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + definitionList[listIndex]);
                    }
                }
            })
            break;
        case 2: 
            var word = readlineSync.question('Enter a Word to get Its Synonyms\n');
            console.log('Please wait a while...');
            word = word.toLowerCase();
            controller.wordSynonyms(word,function(synonymList){
                if(synonymList == 0){
                    console.log("No Synonyms Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<synonymList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + synonymList[listIndex]);
                    }
                }
            })
            break;
        case 3:
            var word = readlineSync.question('Enter a Word to get Its Antonyms\n');
            console.log('Please wait a while...');
            word = word.toLowerCase();
            controller.wordAntonyms(word,function(antonymList){
                if(antonymList == 0){
                    console.log("No Antoonyms Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<antonymList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + antonymList[listIndex]);
                    }
                }
            })
            break;
        case 4:
            var word = readlineSync.question('Enter a Word to get Its Examples\n');
            console.log('Please wait a while...');
            word = word.toLowerCase();
            controller.wordExample(word,function(exampleList){
                if(exampleList == 0){
                    console.log("No Exaxple Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<exampleList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + exampleList[listIndex]);
                    }
                }
            })
            break;
        case 5:
            var word = readlineSync.question('Enter a Word to get Its Full Dictionary\n');
            console.log('Please wait a while...');
            word = word.toLowerCase();
            controller.wordFullDictionary(word,function(wordDictionary){
                definitionList = wordDictionary['definition'];
                synonymList = wordDictionary['synonyms'];
                antonymList = wordDictionary['antonyms'];
                exampleList = wordDictionary['examples'];
                console.log('Definition :-');
                if(definitionList == 0){
                    console.log("No Definition Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<definitionList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + definitionList[listIndex]);
                    }
                }
                console.log("Synonyms :-");
                if(synonymList == 0){
                    console.log("No Synonyms Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<synonymList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + synonymList[listIndex]);
                    }
                }
                console.log('Antonyms :-')
                if(antonymList == 0){
                    console.log("No Antoonyms Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<antonymList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + antonymList[listIndex]);
                    }
                }
                console.log('Examples :-')
                if(exampleList == 0){
                    console.log("No Exaxple Found for Given Word !!");
                } else{
                    for(let listIndex = 0;listIndex<exampleList.length;listIndex++){
                        console.log((listIndex + 1) + " : " + exampleList[listIndex]);
                    }
                }
            })
            break;
        case 6:
            console.log('Please Wait a While...')
            controller.play(function(wordDetails){
                let correctAnswer = false;
                while(!correctAnswer){
                    console.log('Guess The Word');
                    if(wordDetails['definition'].length > 0){
                        console.log('Definition of the Word :-');
                        console.log( wordDetails['definition'][0]);
                    } else if(wordDetails['synonyms'].length > 0){
                        console.log('Synonym of the Word :-');
                        wordDetails['displayedWords'].add(wordDetails['synonyms'][0]);
                        console.log( wordDetails['synonyms'][0]);
                    } else if(wordDetails['antonyms'].length > 0){
                        console.log('Antonym of the Word :-');
                        console.log( wordDetails['antonyms'][0]);
                    }
                    let word = readlineSync.question('Guess the above Word\n');
                    word = word.toLowerCase(); 
                    controller.isValidAnswer(word,function(flag){
                        if(flag){
                            console.log('Congratulations, You Guessed The Correct Word.')
                            correctAnswer = true;
                        } else{
                            console.log('Incorrect Word Guessed');
                            console.log('1 - Try Again');
                            console.log('2 - Hint');
                            console.log('3 - Quit');
                            let option = readlineSync.question('choose one of the option\n');
                            option = parseInt(option);
                            switch(option){
                                case 1:
                                    break;
                                case 2:
                                    controller.getHint(function(hintWord){
                                        console.log('Hint :-');
                                        console.log(hintWord);
                                    });
                                    break;
                                case 3:
                                    correctAnswer = true; 
                            }
                        }
                    }) 
                }            
            }) 
            break;  
        default:
            console.log('Wrong Input');
            menu();
    }
}
menu();