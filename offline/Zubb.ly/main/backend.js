//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Andrew', //name of the chatbot
  emotion1='neutral',
  emotion2='neutral',
  responsecounter=0,
  questioncounter=0,
  talking = true; //when false the speach function doesn't work
//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  talking = true;
  responsecounter=responsecounter+1;
  questioncounter=questioncounter+1;
  botMessage = "Noted"; //the default message
  if(responsecounter==1)
  {
    botMessage='Hi. How was your day?';
  }

  else if(responsecounter==2)
  {
       if(lastUserMessage.search("sad")!=(-1))
       {
       emotion1="sad";
       } 
       else if( lastUserMessage.search("angry")!=(-1) || lastUserMessage.search("rage")!=(-1) || lastUserMessage.search("frustrated")!=(-1) || 
       lastUserMessage.search("hated")!=(-1) || lastUserMessage.search("horrible")!=(-1) || lastUserMessage.search("angry")!=(-1)|| lastUserMessage.search("fine")!=(-1) || lastUserMessage.search("frustrating")!=(-1))
       {
       emotion1="angry";
       } 
       else if( lastUserMessage.search("happy")!=(-1) || lastUserMessage.search("joy")!=(-1) || lastUserMessage.search("win")!=(-1) ||
       lastUserMessage.search("victory")!=(-1) || lastUserMessage.search("good")!=(-1) || lastUserMessage.search("fun")!=(-1))
       {
       emotion1="happy";
       }
       else if( (lastUserMessage.search("depressing")!=(-1)) || (lastUserMessage.search("lonely")!=(-1)) || (lastUserMessage.search("alone")!=(-1)) || 
           (lastUserMessage.search("anxious")!=(-1)) || (lastUserMessage.search("anxiety")!=(-1)) || (lastUserMessage.search("care")!=(-1)))
       {
       emotion1="depressed";
       } 
       else if( (lastUserMessage.search("kill")!=(-1)) || (lastUserMessage.search("death")!=(-1)) || (lastUserMessage.search("suicide")!=(-1)) ||
            (lastUserMessage.search("suicidal")!=(-1)) (lastUserMessage.search("die")!=(-1)) || (lastUserMessage.search("hang")!=(-1)) )
       {
       emotion1="suicidial";
       }
       else 
       {
         emotion1="unidentified";
       }
     
    botMessage='Okay. How are you feeling?';
  }
  
  else if(responsecounter==3)
  {
       if(lastUserMessage.search("sad")!=(-1) || lastUserMessage.search("bad")!=(-1))
       {
       emotion2="sad";
       }
       else if(lastUserMessage.search("angry")!=(-1))
       {
       emotion2="angry";
       } 
       else if(lastUserMessage.search("happy")!=(-1))
       {
       emotion2="happy";
       } 
       else if(lastUserMessage.search("depressing")!=(-1) || lastUserMessage.search("depressed")!=(-1))
       {
       emotion2="depressed";
       }
       else if(lastUserMessage.search("suicidal")!=(-1) || lastUserMessage.search("die")!=(-1) )
       {
       emotion2="suicidial";
       }
       else
       {
       	emotion2="unidentified";
       }
    botMessage='You seem to be '+emotion1+'.'+' Here are your recommendations: \n1. Introspect your emotions and situations and obtain a new       perspective\n2. Guided Visualisation\n3. Content recommendation based on emotion recognition';
  }
  else if(responsecounter==4)
  {
    botMessage='Redirecting you shortly';
    if(lastUserMessage=='3' && ( emotion1=="angry" || emotion2=="angry"))
    {
        setTimeout(myFunction, 3000);
        function myFunction() {location.replace("contentpage1.html");}
    }
     
   if(lastUserMessage=='2')
   {
      setTimeout(myFunction, 3000);
      function myFunction() {location.replace("https://www.youtube.com/watch?v=ZEYuSRHgmCg");}
   }

   if(lastUserMessage=='1')
   {
      setTimeout(myFunction, 3000);
      function myFunction() {location.replace("cbt.html");}
   }
  }
  else
  {
    botMessage='Please choose one of the recommendations to continue.';
  }
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}