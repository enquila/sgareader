readElm=document.getElementById('sga');
inputElm=document.getElementById('user');
resultElm=document.getElementById('result');
letterElm=document.getElementById('letter');
optionsElm=document.getElementById('options');
accuracyElm=document.getElementById('accuracy');
logical=true;

phase=1;

/*
0 typing
1 seeing result
*/

accuracy=0;
totalLetters=0;
totalCorrect=0;

currentString=""

function randomWord(){
    word=words[Math.floor(Math.random()*words.length)];
    return word;
}

function generateText(){
    var text = [];
    if (logical){
        sentence=sentences[Math.floor(Math.random()*sentences.length)].split(' ');
        for (var i = 0; i < sentence.length; i++){
            text.push(`${sentence[i].toLowerCase()}`);
        }
    }else{
        var n = Math.floor(Math.random()*2)+2;
        for (var i = 0; i < n; i++){
            text.push(randomWord());
        }
    }
    return text
}

function newText(){
    var array=generateText(logical);
    readElm.innerHTML='';
    currentString="";
    for (var i = 0; i < array.length; i++){
        var p = document.createElement('p');
        p.textContent=array[i];
        readElm.appendChild(p);
        currentString+=`${array[i]} `;
    }
    return 'set!';
}


inputElm.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        check();
    }
});

function setLetter(v){
    letterElm.textContent=v;
}

function check(){
    if (phase==0){
        resultElm.innerHTML='';

        text=inputElm.value.toLowerCase().split('');
        text.push(' ');
        compare=currentString.split('');
        for (var i=0; i < compare.length; i++){
            if (compare[i]==" "){
                resultElm.innerHTML+='<span style="width: 10px"> </span>';
            }else{
               span='<span class="';
               if (compare[i]==text[i]){
                    span+='correct"';
                    totalCorrect+=1;
                }else{
                    if (text[i] && i != text.length-1){
                        span+='incorrect"';
                    }else{
                        span+='missing"';
                    }
                }
                totalLetters+=1;
                span+=`onmouseover="setLetter('${compare[i]}')" >${compare[i]}</span>`
                resultElm.innerHTML+=`${span}`;
            }
        }
        phase=1;

        accuracy=Math.floor((totalCorrect/totalLetters)*100)
        accuracyElm.textContent=`Accuracy: ${accuracy}% (${totalCorrect}/${totalLetters})`;
    }else{
        phase=0;
        resultElm.innerHTML='';
        inputElm.value='';
        
        newText();
    }
}

function changeType(){
    logical = (!logical);
    if (logical){
        optionsElm.textContent='Statements';
    }else{
        optionsElm.textContent='Random Words';
    }
    newText();
}

check();
