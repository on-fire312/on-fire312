// written by oscar, this is the main javascript file where the game is run from. all other classes are referenced from here
let words = [];
let startButton = [];
let nav = [];
let destinations = [];
let gamestate1 = -1;
let checking = [];
let check = 0;
let sentenceSelect = [];
let attempts = 0;
let stasis = 0;
let choose = 0;
let chosenSentence = [];
let premadeWords = [];
let Xstars = [];
let Ystars = [];
let Wstars = [];
let Hstars = [];
let test = 0;
let temp;
let chosenFont;
let fontSelect = [];
let newSentences = [];
let randomSentenceSelect = [];
let fs = 0;
let visualReset = 0;
let randomNum = 0;
let sentencePool = [];
let advancedPunctuation = 0;
let advancedCapitals = 0;
let settings = [];
let customColor = 0;
let frameCycle = 0;
let posCounter = 0;
let sentenceCounter = 0;
let pageCounter = 0;
let tempX = 0;
let tempY = 0;
let tempSentence;
let filteredSentences = [];
let filters = [];
let filterSelect = [];
let testAudio;
let loadingBuffer = 0;
let failOne;
let failTwo;
let totalTime = 0;
let endScreen = [];
let muted = 0;
let currentCanvasX
let currentCanvasY
let canvasRatio
let xCanvasRatio
let yCanvasRatio
let sentenceButtons = []
let keyUsed = 1
let typed = 0
let customSelection = []
let customSentence = ""
let sentenceQueue = []
let sentencePos = -1
let amountSelector = []
let scoreQueue = []
let totalScore = 0
let wordStore = ""
let scoreStore = ""
let finalQueue = []
let moreFeedback = []
let info = []
let customSentences=[]
let customSentenceSelect=[]
let touchX=0
let touchY=0
let touched=0
let engineParticles=[]
let nextScreen=1
let stationSpeed=0
let rocketAudio
let newAdjectiveSentences
let adjectives=[]
let adjectiveSentences=[]
let adjectiveSelect=[]
let capitalLog=[]
let currentSettings
let fontNum=0
let capitalCount=0
function preload() {
  //preloading all content from other files
  testAudio = loadSound('audio/Homo Deus.mp3');
  failOne = loadSound('audio/171673__leszek-szary__failure-1.wav');
  failTwo = loadSound('audio/371451__cabled-mess__lose-funny-retro-video-game.wav');
  successOne = loadSound('audio/320655__rhodesmas__level-up-01.wav');
  newSentences = loadStrings('sentences/sentences.txt');
  newAdjectiveSentences = loadStrings('sentences/customSentences.txt');
  ruluko = loadFont('Fonts/Ruluko-Regular.ttf');
  topMarks = loadFont('Fonts/Topmarks-Regular.ttf');
  timesNewRoman = loadFont('Fonts/times-new-roman.ttf');
  rocketAudio= loadSound('audio/rocket.wav')

}
function setup() {



  currentCanvasX = windowWidth
  currentCanvasY = windowHeight
  createCanvas(windowWidth, windowHeight);
  xCanvasRatio=currentCanvasX/1920
  yCanvasRatio=currentCanvasY/1080
  if (xCanvasRatio>yCanvasRatio){
    canvasRatio=yCanvasRatio
  }else {
    canvasRatio=xCanvasRatio
  }
  textAlign(CENTER);
  textFont(topMarks);//sets font
  //creates coordinates and sizes for stars
  for (let i = 0; i < 200; i++) {
    Xstars[i] = random(30, windowWidth - 30);
    Ystars[i] = random(30, windowHeight - 30);
    Wstars[i] = random(0, 7);
    Hstars[i] = random(0, 7);
  }




  choose = random(0, 20);

  let start = new button((windowWidth / 2) - 125, (windowHeight / 2) - 90, 250, 125, "start", 100);//start button
  startButton.push(start); //startButton[0]
  let openHowToPlay = new button((windowWidth / 2) - 125, (windowHeight / 2) + 60, 250, 40, "how to play", 30);//how to play button
  startButton.push(openHowToPlay); //startButton[1]
  let settingsNav = new button((windowWidth / 2) - 125, (windowHeight / 2) + 120, 250, 40, "settings", 30);//settings button
  startButton.push(settingsNav); //startButton[2]
  let bac = new button(10, 10, 60, 30, "back", 25);//back button
  nav.push(bac); //nav[0]
  let next = new button(windowWidth - 110, windowHeight - 70, 100, 60, "next", 40);//next (to end game screen) button
  nav.push(next); //nav[1]
  let restart = new button(windowWidth / 2 - 50, windowHeight / 2 + 60, 100, 30, "restart", 25);// restart button
  nav.push(restart); //nav[2]
  let reset = new button(windowWidth / 2 - 90, windowHeight / 2 + 100, 180, 30, "new sentence", 25);// new sentence button
  nav.push(reset);   //nav[3]

  let correct = new button(windowWidth / 2 - 75, windowHeight - 100, 150, 75, "check", 55); //check button
  checking.push(correct); //checking[0]
  let answers = new button(windowWidth / 2 - 110, windowHeight - 100, 220, 75, "Answers", 55); //Answer button
  checking.push(answers); //checking[1]
  let fullscreenButton = new button(10, windowHeight - 35, 120, 25, "fullscreen", 20); //fullscreen toggle button
  nav.push(fullscreenButton); //nav[4]

  let mainMenue = new button(10, 10, 140, 30, "Main Menu", 25); //main menu button
  nav.push(mainMenue); //nav[5]
  let goToScores = new button(windowWidth / 2 - 75, windowHeight / 2 + 140, 150, 30, "Scores", 25); //timer
  endScreen.push(goToScores); //endScreen[0]
  //font selection
  let newFont = new textBox(windowWidth / 2-87.5, windowHeight / 2 - 70, 175, 50, "Font Selection", 30);
  fontSelect.push(newFont); //fontSelect[0]
  newFont = new button(windowWidth / 2-87.5, windowHeight / 2, 175, 25, "ruluko (default)", 20);
  fontSelect.push(newFont); //fontSelect[1]
  newFont = new button(windowWidth / 2-87.5, windowHeight / 2 + 40, 175, 25, "TopMarks (regular)", 20);
  fontSelect.push(newFont); //fontSelect[2]
  newFont = new button(windowWidth / 2-87.5, windowHeight / 2 + 80, 175, 25, "TopMarks (bold)", 20);
  fontSelect.push(newFont); //fontSelect[3]
  newFont = new button(windowWidth / 2-87.5, windowHeight / 2 + 120, 175, 25, "Segoe UI (win Default)", 20);
  fontSelect.push(newFont); //fontSelect[4]
  let toggleAdvanced = new button(10, windowHeight - 90, 220, 25, "Advanced punctuation", 20);//advanced grammar toggle
  settings.push(toggleAdvanced); //settings[0]
  toggleAdvanced = new button(10, windowHeight - 120, 220, 25, "Advanced Capitals", 20);//advanced grammar toggle
  settings.push(toggleAdvanced); //settings[1]
  let resetSettings = new button((windowWidth / 2) - 125, windowHeight-100, 250, 40, "reset", 30);//settings button
  settings.push(resetSettings); //settings[2]
  //sentence navigation
  let nextPage = new button(windowWidth / 2 +10, 60 * 15, 300, 50, "Next Page", 40);
  nav.push(nextPage); //nav[6]
  let prevPage = new button(windowWidth / 2 -320, 60 * 15, 300, 50, "Back Page", 40);
  nav.push(prevPage); //nav[7]
  let muteButton = new button(10, windowHeight - 65, 120, 25, "Mute", 20); //mute toggle
  nav.push(muteButton); //nav[8]
  let submitNewSentence = new button(windowWidth / 2 - 75, windowHeight - 100, 150, 75, "Add", 55)
  customSelection.push(submitNewSentence)
  let goToCustom = new button(windowWidth - 290, windowHeight - 60, 280, 50, "Add New Sentences", 30);
  nav.push(goToCustom)//nav[9]
  let goToAll = new button((windowWidth / 2) - 165, 100, 330, 50, "All Sentences", 40)
  nav.push(goToAll)//nav[10]
  let goToFiltered = new button((windowWidth / 2) - 165, 200, 330, 50, "Filter By KS", 40)
  nav.push(goToFiltered)//nav[11]
  let goToLength = new button((windowWidth / 2) - 165, 300, 330, 50, "Filter By Length", 40)
  nav.push(goToLength)//nav [12]
  let goToadjective = new button((windowWidth / 2) - 165, 400, 330, 50, "adjective Practice", 40)
  nav.push(goToadjective)//nav [13]

  let sign = new textBox((windowWidth / 2) - 150, 300, 300, 50, "Filter By Length", 40)
  info.push(sign) //info [0]
  let selector = new slider((windowWidth / 2) - 150, windowHeight - 110, "ammount:", 5, 2)
  amountSelector.push(selector)
  sign = new textBox((windowWidth / 2) - 75, 10, 150, 55, "Scores", 50)
  info.push(sign)//info [1]

sign = new textBox((windowWidth / 2) - 495, 30, 340, 45, "All Sentences", 40)
  info.push(sign)//info [2]
  sign = new textBox((windowWidth / 2) + 140, 30, 340, 45, "Custom Sentences", 40)
  info.push(sign)//info [3]




for (i=0;i<100;i++){
  let temp=new spark(200,150,20,"RIGHT")
  engineParticles.push(temp)
}
  i = 0
  while (i < 8) {
    pos = ((windowWidth / 2) - 100 * (9)) + (200 * i);
    let temp = new inputButton(pos, windowHeight - 300, i, 180, 90, "______", 40)
    sentenceButtons.push(temp)
    i++
  }
  pos = ((windowWidth / 2) - 100 * (9)) + (200 * i);
  let temp = new punctuationButton(pos, windowHeight - 300, 180, 90, ".", 40)
  sentenceButtons.push(temp)

  //creating buttons for sentence selection based on length
  let compRandom = new button(windowWidth / 2 - 150, (windowHeight / 2), 300, 50, "Random", 40);
  randomSentenceSelect.push(compRandom); //randomSentenceSelect[0]
  let shortRandom = new button(windowWidth / 2 - 150, (windowHeight / 2) + 60, 300, 50, "short", 40);
  randomSentenceSelect.push(shortRandom); //randomSentenceSelect[1]
  let longRandom = new button(windowWidth / 2 - 150, (windowHeight / 2) + 120, 300, 50, "long", 40);
  randomSentenceSelect.push(longRandom); //randomSentenceSelect[3]
}

function draw() {
  console.log(attempts)
  updateTouch()
  if (nav[4].singleClickCheck() == 1) {
    toggFullscreen();
  }
  nav[4].show();
  if (frameCycle > 120) {
    frameCycle = 0; 
    autoSave()
  }
  frameCycle++;
  if (currentCanvasX != windowWidth || currentCanvasY != windowHeight) {
    resetVisuals();
  }
  backdrop();
  if (nav[8].singleClickCheck() == 1) {
    toggMute();
  }
  nav[8].show(); 

  
  if (gamestate1 == -1) {

    //pre gui processing
    //split sentences.txt into sentences and filters


    
      if (getItem("customSentences") == null) {
       customsentences = []
       let temp="The car was Slow"
       customSentences.push(temp)
       storeItem("customSentences", customSentences)
      } else {
        customSentences = getItem("customSentences")
      }

      if (getItem("settings") == null) {
       
        currentSettings=new dataStore(2,0,0,0,3)
        
        storeItem("settings", currentSettings)
       } else {
         currentSettings = getItem("settings")
       }
       fontNum=currentSettings.fontNum
       muted=currentSettings.vol
       advancedCapitals=currentSettings.cap
       advancedPunctuation=currentSettings.punct
       amountSelector[0].setVal(currentSettings.amm)

       if (muted == 1) {


        nav[8].changeText("Muted");
       
      }
      else if (muted == 0) {
        
        nav[8].changeText("Mute");
    
      }
    i = 0;
    while (i < newSentences.length) {
      if (newSentences[i].substring(0, 1) != "#") { //filters begin with "#"
        tempSentence = [];
        tempSentence = newSentences[i].split(" ")
        if (tempSentence.length < 9) { //checks string is less than 9 words
          filteredSentences.push(newSentences[i]);
        }
      }
      if (newSentences[i].substring(0, 1) == "#") {
        filters.push(newSentences[i].slice(1));
        filters.push(filteredSentences.length); //loging position in filteredSentences

      }
      i++;
    }

    i = 0;
    while (i < newAdjectiveSentences.length) {
      if (newAdjectiveSentences[i].substring(0, 1) != "#") { //filters begin with "#"
        tempSentence = [];
        tempSentence = newAdjectiveSentences[i].split(" ")
        if (tempSentence.length < 9) { //checks string is less than 9 words
          adjectives.push(newAdjectiveSentences[i]);
        }
      }
      if (newAdjectiveSentences[i].substring(0, 1) == "#") {
        adjectiveSentences.push(newAdjectiveSentences[i].slice(1));
        adjectiveSentences.push(adjectives.length); //loging position in filteredSentences

      }
      i++;
    }

    for (let i = 0; i < filteredSentences.length; i++) {
      if (posCounter == 26) {
        posCounter = 0; //to reset the position of the buttons when the columns get to long
      }

      if (posCounter % 2 == 0) {
        tempX = (windowWidth / 2) - 630;
        tempY = 100 + 60 * (posCounter / 2);
      }
      if (posCounter % 2 != 0) {
        tempX = (windowWidth / 2) -320;
      }
      tempSentence = [];
      tempSentence = filteredSentences[i].split(" ");
      let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40);  //creates buttons for sentence selection
      sentenceSelect.push(sentence0);
      posCounter++;
    }
posCounter=0
    for (let i = 0; i < customSentences.length; i++) {
      if (posCounter == 26) {
        posCounter = 0; //to reset the position of the buttons when the columns get to long
      }

      if (posCounter % 2 == 0) {
        tempX = (windowWidth / 2) +10;
        tempY = 100 + 60 * (posCounter / 2);
      }
      if (posCounter % 2 != 0) {
        tempX = (windowWidth / 2) +320;
      }
      tempSentence = [];
      tempSentence = customSentences[i].split(" ");
      let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40);  //creates buttons for sentence selection
      customSentenceSelect.push(sentence0);
      posCounter++;
    }
    posCounter=0
    for (let i = 0; i < adjectiveSentences.length; i=i+2) {
      if (posCounter == 26) {
        posCounter = 0; //to reset the position of the buttons when the columns get to long
      }

      if (posCounter % 2 == 0) {
        tempX = (windowWidth / 2) - 630;
        tempY = 100 + 60 * (posCounter / 2);
      }
      if (posCounter % 2 != 0) {
        tempX = (windowWidth / 2) -320;
      }
      tempSentence = [];
      tempSentence = adjectiveSentences[i].split(" ");
      let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40);  //creates buttons for sentence selection
      adjectiveSelect.push(sentence0);
      posCounter++;
    }
    for (let i = 0; i < filters.length; i++) {
      if (i % 2 == 0) {
        let filter0 = new button(windowWidth / 2 - 150, 120 + i * 26, 300, 50, filters[i], 40); //same as above but for 1 colum of filters
        filterSelect.push(filter0);
      }
      posCounter++;
    }
    gamestate1 = 0;
  }
  if (gamestate1 == 0) {
    //starting screen
    startButton[0].ref();
    startButton[1].ref();
    if (startButton[0].singleClickCheck() == 1) {
      //navigate to sentence selection
      gamestate1 = 2;
    }
    if (startButton[1].singleClickCheck() == 1) {
      //navigate to instructions
      gamestate1 = 1;
    }
    if (startButton[2].singleClickCheck() == 1) {
      //navigate to instructions
      gamestate1 = 10;
    }

    startButton[0].show();
    startButton[1].show();
    startButton[2].show();


  }
  if (gamestate1 == 1) {
    //how to play instructions

    nav[0].ref();
    if (nav[0].singleClickCheck() == 1) {
      //return to start menu 
      gamestate1 = 0;
    }
    fill(255);
    strokeWeight(5);
    stroke(200, 200, 200);
    fill(255, 255, 255);
    rect((windowWidth / 2) - 300, 10, 600, windowHeight - 20);
    nav[0].show();

    howToPlay = ("gru stepped out with a glock in hand and took aim. I ducked behind a car. just then I heard the gun fire. Then I saw the blue, blood red cloud of smoke that followed. I screamed for him to stop.   He shot me in the back of the head, but I fell right in front of the restaurant and died.  The end. Fat lot of good that did me now. I finished typing my log down. It was all over. I have nothing left. And i didn't even put my story on video tape. I guess I had enough of life. I wanted my parents to bury me. I wanted my grandma to come and sing songs to me. I wanted to make sense of this messed up world, i wanted to find a treasure chest full of silver doubloons. I wanted to be an old man and sleep in front of the fireplace. But mostly i wanted to die, finally.  I was leaving on Monday for the railroad. I was getting");
    textSize(40);
    fill(0);
    text("how to play:", (windowWidth / 2) - 300, 10, 600, windowHeight - 20);
    textSize(20);
    textAlign(LEFT);
    text(text("Select the sentence you want to test or be tested on.", (windowWidth / 2) - 290, 60, 600, windowHeight - 20));
    text(text("Then drag the words into the gray boxes into the correct order", (windowWidth / 2) - 290, 80, 600, windowHeight - 20));
    text(text("Click the 'check' box to check which words are correct.", (windowWidth / 2) - 290, 100, 600, windowHeight - 20));
    text(text("You will have 3 attempts.", (windowWidth / 2) - 290, 120, 600, windowHeight - 20));
    text(text("Click 'next' to receive your score or to play again", (windowWidth / 2) - 290, 140, 600, windowHeight - 20));
    text(text("Changes:", (windowWidth / 2) - 290, 180, 600, windowHeight - 20));
    text(text("UI revamped", (windowWidth / 2) - 290, 200, 600, windowHeight - 20));
    text(text("'Advanced grammar' toggle added in sentence selection to turn capitals and fullstops on or off", (windowWidth / 2) - 290, 220, 600, windowHeight - 20));
    text(text("you can now choose bettween specific sentences, by their length and level", (windowWidth / 2) - 290, 260, 600, windowHeight - 20));
    text(text("audio added", (windowWidth / 2) - 290, 300, 600, windowHeight - 20));
    text(text("timer added", (windowWidth / 2) - 290, 320, 600, windowHeight - 20));
    text(text("animations added", (windowWidth / 2) - 290, 340, 600, windowHeight - 20));
    text(text("main menu button added", (windowWidth / 2) - 290, 360, 600, windowHeight - 20));
    text(text("font select added", (windowWidth / 2) - 290, 380, 600, windowHeight - 20));

  }
  if (gamestate1 < 2.9 && gamestate1 >= 2) {
    //sentence selection


    length0 = filteredSentences.length;

    nav[5].show();


    customColor = 1;
    
    
    //toggle grammar on and off
    if (advancedPunctuation == 1) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    settings[0].show();

    if (advancedCapitals == 1) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    settings[1].show();

    customColor = 0;
    if (nav[5].singleClickCheck() == 1) {
      resetValues()
      gamestate1 = 0;
    }
    if (settings[0].singleClickCheck() == 1) {
      if (advancedPunctuation == 0) {
        advancedPunctuation = 1;
      } else {
        advancedPunctuation = 0;
      }
    }

    if (settings[1].singleClickCheck() == 1) {
      if (advancedCapitals == 0) {
        advancedCapitals = 1;
      } else  {
        advancedCapitals = 0;
      }
    }




  }

  if (gamestate1 == 2) {
    nav[9].show();
    nav[10].show();
    nav[11].show()
    nav[12].show()
    nav[13].show()
    //display filters
    if (nav[9].singleClickCheck()) {
      gamestate1 = 2.9
    }
    if (nav[10].singleClickCheck()) {
      gamestate1 = 2.11
    }
    if (nav[11].singleClickCheck()) {
      gamestate1 = 2.12
    }
    if (nav[12].singleClickCheck()) {
      gamestate1 = 2.13
    }
    if (nav[13].singleClickCheck()) {
      gamestate1 = 2.14
    }
  }
  if (gamestate1 > 2.11 && gamestate1 < 2.9) {
    amountSelector[0].show()
  }
  if (gamestate1 == 2.11) {
    //display sentences

    info [2].show()
    info [3].show()
    nav[6].show();
    nav[7].show();
    if (nav[6].singleClickCheck() == 1) {
      pageCounter++;
      if (pageCounter > sentenceSelect.length / 26) {
        pageCounter = pageCounter - 1;
      }
    }
    if (nav[7].singleClickCheck() == 1) {
      pageCounter = pageCounter - 1;
      if (pageCounter < 0) {
        pageCounter = 0;
      }
    }
    sentenceCounter = 26 * pageCounter;
    posCounter = 0;
    while (posCounter < 26) {
      if (sentenceCounter < sentenceSelect.length) {
          nav[1].show()

          if (sentenceSelect[sentenceCounter].option == 1) {
            customColor = 1
            fill(200, 200, 200)
          } else {
            fill(255, 255, 255)
          }
          sentenceSelect[sentenceCounter].show();
          customColor = 0
          sentenceSelect[sentenceCounter].toggleClickCheck();
          

        
      }

      if (sentenceCounter < customSentenceSelect.length) {
        nav[1].show()

        if (customSentenceSelect[sentenceCounter].option == 1) {
          customColor = 1
          fill(200, 200, 200)
        } else {
          fill(255, 255, 255)
        }
        customSentenceSelect[sentenceCounter].show();
        customColor = 0
        customSentenceSelect[sentenceCounter].toggleClickCheck();
        
      
    }
    if (nav[1].singleClickCheck() == 1) {


     
      for (let j=0;j < sentenceSelect.length;j++) {
        if (sentenceSelect[j].option == 1) {
          sentenceQueue.push(filteredSentences[j])
          sentenceSelect[j].option = 0


        }
        

      }
      for (let j=0;j < customSentenceSelect.length;j++) {
        if (customSentenceSelect[j].option == 1) {
          sentenceQueue.push(customSentences[j])
          customSentenceSelect[j].option = 0


        }
        

      }
      if (sentenceQueue.length > 0) {
        gamestate1 = 3
      }

    }
      
      sentenceCounter++;
      posCounter++;
    }
    if (nav[6].singleClickCheck() == 1) {
      pageCounter++;
      if (pageCounter > sentenceSelect.length / 26) {
        pageCounter = pageCounter - 1;
      }
    }
    if (nav[7].singleClickCheck() == 1) {
      pageCounter = pageCounter - 1;
      if (pageCounter < 0) {
        pageCounter = 0;
      }
    }
  }

  if (gamestate1 == 2.12) {
    i = 0;
    while (i < filterSelect.length - 1) {
      filterSelect[i].show();
      if (filterSelect[i].singleClickCheck() == 1) {
        j = 0
        sentenceQueue = []
        while (j < amountSelector[0].posNum + 1) {
          tempRandom = Math.round(random(filters[1 + i * 2] + 1, filters[3 + i * 2] - 1));

          sentenceQueue.push(newSentences[tempRandom])
          j++
        }


        gamestate1 = 3;
      }
      i++;

    }
  }

  if (gamestate1 == 2.13) {
    randomSentenceSelect[0].show();
    randomSentenceSelect[1].show();
    randomSentenceSelect[2].show();
    if ((randomSentenceSelect[0].singleClickCheck() == 1)) {

      j = 0
      sentenceQueue = []
      while (j < amountSelector[0].posNum + 1) {
        sentenceQueue.push(random(filteredSentences))
        j++
      }

      gamestate1 = 3;

    }
    //pick random long sentence
    if ((randomSentenceSelect[2].singleClickCheck() == 1)) {
      let j = 0;
      while (j < filteredSentences.length) {
        if (filteredSentences[j].split(" ").length > 5) {
          sentencePool.push(filteredSentences[j]);
        }
        j++;
      }
      j = 0
      sentenceQueue = []
      while (j < amountSelector[0].posNum + 1) {
        sentenceQueue.push(random(sentencePool))
        j++
      }
      gamestate1 = 3;
    }
    //pick random short sentence
    if ((randomSentenceSelect[1].singleClickCheck() == 1)) {
      let j = 0;
      while (j < filteredSentences.length) {
        if (filteredSentences[j].split(" ").length <= 5) {
          sentencePool.push(filteredSentences[j]);
        }
        j++;
      }

      j = 0
      sentenceQueue = []
      while (j < amountSelector[0].posNum + 1) {
        sentenceQueue.push(random(sentencePool))
        j++
      }
      gamestate1 = 3;
    }
  }

  if (gamestate1==2.14){

    sentenceCounter = 26 * pageCounter;
    posCounter = 0;
    while (posCounter < 26) {
      if (sentenceCounter < adjectiveSelect.length-1) {
          nav[1].show()

          if (adjectiveSelect[sentenceCounter].option == 1) {
            customColor = 1
            fill(200, 200, 200)
          } else {
            fill(255, 255, 255)
          }
          adjectiveSelect[sentenceCounter].show();
          customColor = 0

          

        
      }

     
      i = 0;
      while (i < adjectiveSelect.length - 1) {
        adjectiveSelect[i].show();
        if (adjectiveSelect[i].singleClickCheck() == 1) {
          j = 0
          sentenceQueue = []
          while (j < amountSelector[0].posNum + 1) {
            tempRandom = Math.round(random(adjectiveSentences[1 + i * 2] + 1, adjectiveSentences[3 + i * 2] - 1));
            sentenceQueue.push(adjectiveSentences[i * 2].replace("_",adjectives[tempRandom]))
            j++
          }
  
  
          gamestate1 = 3;
        }
        i++;
  
      }
      
      sentenceCounter++;
      posCounter++;
    }
  }

  if (gamestate1 == 2.9) {
    nav[0].show()
    if (nav[0].singleClickCheck()) {
      gamestate1 = 2
    }
    i = 0
    while (i < sentenceButtons.length - 1) {
      sentenceButtons[i].toggleClickCheck()
      sentenceButtons[i].show()
      i++
    }

    sentenceButtons[i].show()
    if (sentenceButtons[i].singleClickCheck() == 1) {
      sentenceButtons[i].next()
    }
    i++

    customSelection[0].show()
    if (customSelection[0].singleClickCheck() == 1) {
      customSentence = ""
      i = 0

      while (i < sentenceButtons.length - 1) {
        if (sentenceButtons[i].tex.charAt(0) != "_") {
          customSentence = customSentence + " " + sentenceButtons[i].tex
        }
        i++
      }
      customSentence = customSentence + sentenceButtons[i].tex
      i++

      customSentence = customSentence.substring(1)
      
      i = 0
      found = 0
      while (i < customSentences.length) {
        if (customSentences[i] == customSentence) {
          found = 1

        }
        i++
      }
      if (found == 0) {
        customSentences.push(customSentence)
        storeItem("customSentences", customSentences)
      }

    }
  }
  if (gamestate1 == 3) {
    sentencePos = -1
    check = 0;
    attempts = 0;
    stasis = 0;
    totalTime = 0;
    scoreQueue = []
    totalScore = 0
    finalQueue = []
    moreFeedback = []
    stationSpeed=0
    nextSentence()
    gamestate1 = 3.5;
startButton[0].move(null,windowHeight-200)  }

  if (gamestate1==3.5){
    startButton[0].show()
    fill(255)
    strokeWeight(5);
    stroke(200, 200, 200);
    rect((windowWidth / 2) - 600, 50, 1200, windowHeight - 300,10);
    fill(0)
    noStroke()
    textSize(60)
    text("Welcome!",(windowWidth / 2) - 600, 50, 1200, windowHeight - 300)
    textSize(30)
    text("Bob and Ben have broken their space station.",(windowWidth / 2) - 600, 120, 1200, windowHeight - 300)
    text("They wrote sentences across the station so they know how to fix it.",(windowWidth / 2) - 600, 160, 1200, windowHeight - 300)
    text("Will you help them fix it?",(windowWidth / 2) - 600, 200, 1200, windowHeight - 300)
    if (startButton[0].singleClickCheck()==1){
      gamestate1=4
    }
  }
  if (gamestate1 >= 4&&gamestate1<5) {
    //main game:
    //show words destinations

    nav[8].show(); 
    
    if (gamestate1>=4.2){
      for (let i=0;i<words.length;i++){
        words[i].slide(stationSpeed,0)
      }
      stationSpeed=stationSpeed-0.1
      for (i=0;i<100;i++){
        engineParticles[i].teleport(words[words.length-1].xRight,words[words.length-1].yMid)
        engineParticles[i].show()
        
      }
      gamestate1=gamestate1+0.003
      if (gamestate1>=4.9){
        nextSentence()
      }
    } else{
      for (i = 0; i < destinations.length; i++) {

        destinations[i].show();
      }
    }


    if (check < sentenceLength) {
      totalTime = totalTime + deltaTime;
    }

    nav[5].show();
    if (nav[5].singleClickCheck() == 1) {
      resetValues()
      gamestate1 = 0;
    }

    //move and show the words
    for (i = 0; i < words.length; i++) {

      words[i].move();

      fill(255);
      words[i].show();
      destinations[i].mark();

    }
    //checks position of words
    
    if ((check >= sentenceLength) ||(stasis==1 && attempts<4&& attempts>3.5)){
      if (advancedCapitals==1){
        for (let i=0;i<words.length-advancedPunctuation;i++){
          if (words[i].singleClickCheck()==1){
            words[i].toggleCapitalise()
          }
        }
      } else {
        attempts=4
      }
      
      if (checking[0].singleClickCheck()==1){
        checkCapitals()
        attempts=4
      }
    }
    //if player has had 3 attempts or all words are correct...
    if ( (attempts >= 4)) {
      //freeze words in place,
      stasis = 1;

      //and move to scoring screen
      if (gamestate1<4.2){
        nav[1].show();
      } else{
        
      }
      if (gamestate1<4.2){
        if (nav[1].singleClickCheck() == 1) {
          if (muted==0){
            rocketAudio.play()
          }

          if (check == words.length) {
            if (advancedCapitals==1){
              if (capitalCount==words.length-advancedPunctuation){
                totalScore++
              }
            } else {
              totalScore++
            }

            
          }
          
            
          
            gamestate1=4.2
          
          
          nextScreen=0
          
  
        }
      }
      
    } else {
      checking[0].show();
      
    }
    if (attempts==3.5){
      for (i=0; i<words.length;i++){
        words[i].goTo(destinations[i].xLeft,destinations[i].yTop,100)
      }
      if (advancedCapitals==1){
        attempts=3.9
      } else {
        attempts=4
      }
      
    }
    if ((check != sentenceLength) && (attempts == 3)) {
      //freeze words in place,
      stasis = 1;
      //and move to scoring screen
      checking[1].show();
      if (checking[1].singleClickCheck() == 1) {
        attempts=attempts+0.5
      }
    }

    
    if (checking[0].singleClickCheck() == 1 && stasis != 1) {
      checkAnswers();
      if (check < sentenceLength) {
        if (muted == 0) {
          failTwo.play();// play fail noise
        }

      }
      if (check >= sentenceLength) {
        if (muted == 0) {
          successOne.play(); ///play correct noise
        }
      }
    }
  }

  nav[4].show();
  if (gamestate1 == 5) {

    //scoring/end game screen

    endScreen[0].show()
    if (endScreen[0].singleClickCheck()) {
      gamestate1 = 5.1
    }
    nav[5].show();
    if (nav[5].singleClickCheck() == 1) {
      resetValues()
      gamestate1 = 0;
    }
    strokeWeight(5);
    stroke(200, 200, 200);
    fill(255, 255, 255);
    rect(windowWidth / 2 - 150, windowHeight / 2 - 120, 300, 50, 10);
    rect(windowWidth / 2 - 150, windowHeight / 2 - 60, 300, 50, 10);
    rect(windowWidth / 2 - 150, windowHeight / 2, 300, 50, 10);
    noStroke();
    fill(0);
    textSize(30);
    text("thanks for playing", windowWidth / 2 - 200, windowHeight / 2 + 5, 400, 50);
    //shows score
    text("Final Score: " + totalScore + "/" + sentenceQueue.length + " ", windowWidth / 2 - 200, windowHeight / 2 - 110, 400, 50);
    text("time: " + str(Math.round(totalTime) / 1000), windowWidth / 2 - 200, windowHeight / 2 - 50, 400, 50);
    nav[2].show();
    //button to chose new sentence
    if (nav[2].singleClickCheck() == 1) {
      gamestate1 = 3;
    }
    //button to try again
    nav[3].show();
    if (nav[3].singleClickCheck() == 1) {
      gamestate1 = 2;
    }

  }

  if (gamestate1 == 5.1) {
    let posCounter = 0
    let tempX
    let tempY
    for (let i = 0; i < finalQueue.length; i++) {
      if (posCounter == 6) {
        posCounter = 0; //to reset the position of the buttons when the columns get to long
      }

      if (posCounter % 2 == 0) {
        tempX = (windowWidth / 2) - 905;
        tempY = 120 + 210 * (posCounter / 2);
      }
      if (posCounter % 2 != 0) {
        tempX = (windowWidth / 2) + 5;
      }

      let temp = new feedback(tempX, tempY, finalQueue[i], sentenceQueue[i], scoreQueue[i], i)
      moreFeedback.push(temp)
      posCounter++;
    }
    i = 0
    pageCounter = 0
    gamestate1 = 5.2
  }

  if (gamestate1 == 5.2) {
    nav[0].show()
    if (nav[0].singleClickCheck()) {
      gamestate1 = 5
    }
    let resultCounter = 6 * pageCounter

    let posCounter = 0




    while (posCounter < 6) {

      if (resultCounter < sentenceQueue.length) {
        moreFeedback[resultCounter].show()

      }
      resultCounter++
      posCounter++
    }
    nav[6].show()
    nav[7].show()
    if (nav[6].singleClickCheck() == 1) {
      pageCounter++;
      if (pageCounter > sentenceQueue.length / 6) {
        pageCounter = pageCounter - 1;
      }
    }
    if (nav[7].singleClickCheck() == 1) {
      pageCounter = pageCounter - 1;
      if (pageCounter < 0) {
        pageCounter = 0;
      }
    }
    info[1].show()
  }
  if (gamestate1 == 10) {
    settings[2].show()
    selectFont();

    if (nav[0].singleClickCheck() == 1) {
      //return to start menu 


      gamestate1 = 0;
    }
    if (settings[2].singleClickCheck() == 1) {
      //return to start menu 

      currentSettings=new dataStore(2,0,0,0,3)
      fontNum=currentSettings.fontNum
      muted=currentSettings.vol
      advancedCapitals=currentSettings.cap
      advancedPunctuation=currentSettings.punct
      amountSelector[0].setVal(currentSettings.amm)

      autoSave()
      if (muted == 1) {


        nav[8].changeText("Muted");
       
      }
      else if (muted == 0) {
        
        nav[8].changeText("Mute");
    
      }
    }
    nav[0].show();

  }


}

function backdrop() {
  //function to draw background
  background(10, 10, 30);
  noStroke();
  fill(0, 255, 25);
  //image(backImg,0,0,windowWidth,windowHeight);
  for (let i = 0; i < 200; i++) {
    fill(200);
    circle(Xstars[i], Ystars[i], Wstars[i], Hstars[i]);
  }
}

function selectFont() {
  if (nav[0].singleClickCheck() == 1) {
    //return to start menu 
    gamestate1 = 0;
  }

  if (fontSelect[1].singleClickCheck() == 1) {
    textFont(ruluko);
  }
  if (fontSelect[2].singleClickCheck() == 1) {
    textFont(topMarks);
  }
  if (fontSelect[4].singleClickCheck() == 1) {
    textFont(timesNewRoman);
  }
  for (i = 0; i < fontSelect.length; i++) {
    fontSelect[i].show();
  }


}
function checkAnswers() {
  //function to check the sentences
  check = 0;
  
  attempts++;
  for (i = 0; i < words.length; i++) {
    destinations[i].getCurrentAns()
    if (destinations[i].currentAns != 20) {
    } else {
    }

    if (words[i].checkCorrect() == 1) {
      destinations[i].correct = 1;

    }


  }

}


function toggFullscreen() {
  //toggle for full screen
  if (fs == 0) {

    fs = 1;
  }
  else if (fs == 1) {
    fs = 0;

  }

  fullscreen(fs);
}
function toggMute() {
  if (muted == 0) {


    nav[8].changeText("Muted");
    muted = 1;
  }
  else if (muted == 1) {
    muted = 0;
    nav[8].changeText("Mute");

  }


}
function resetVisuals() {
  //reset coordinates of all objects
  currentCanvasX = windowWidth
  currentCanvasY = windowHeight
  resizeCanvas(windowWidth, windowHeight);
  xCanvasRatio=currentCanvasX/1920
  yCanvasRatio=currentCanvasY/1080
  if (xCanvasRatio>yCanvasRatio){
    canvasRatio=yCanvasRatio
  }else {
    canvasRatio=xCanvasRatio
  }
  for (let i = 0; i < 200; i++) {
    Xstars[i] = random(30, windowWidth - 30);
    Ystars[i] = random(30, windowHeight - 30);
  }
  visualReset = visualReset - 1;
  startButton[0].move((windowWidth / 2) - 125, (windowHeight / 2) - 90);
  startButton[1].move((windowWidth / 2) - 125, (windowHeight / 2) + 60);
  startButton[2].move((windowWidth / 2) - 125, (windowHeight / 2) + 120);
  nav[1].move(windowWidth - 110, windowHeight - 70);
  nav[2].move(windowWidth / 2 - 50, windowHeight / 2 + 60);
  nav[3].move(windowWidth / 2 - 90, windowHeight / 2 + 100);
  nav[4].move(10, windowHeight - 30);
  checking[0].move(windowWidth / 2 - 75, windowHeight - 100);
  fontSelect[0].move(windowWidth / 2-87.5, windowHeight / 2 - 70);
  fontSelect[1].move(windowWidth / 2-87.5, windowHeight / 2);
  fontSelect[2].move(windowWidth / 2-87.5, windowHeight / 2 + 40);
  fontSelect[3].move(windowWidth / 2-87.5, windowHeight / 2 + 80);
  fontSelect[4].move(windowWidth / 2-87.5, windowHeight / 2 + 120);
  settings[0].move(10, windowHeight - 90);
  settings[1].move(10, windowHeight - 120, 200)
  settings[2].move((windowWidth / 2) - 125, windowHeight-100)
  nav[5].move(10, 10);
  posCounter = 0
  randomSentenceSelect[0].move(windowWidth / 2 - 150, (windowHeight / 2))
  randomSentenceSelect[1].move(windowWidth / 2 - 150, (windowHeight / 2) + 60)
  randomSentenceSelect[2].move(windowWidth / 2 - 150, (windowHeight / 2) + 120)
  amountSelector[0].move((windowWidth / 2) - 150, windowHeight - 110)
  nav[13].move((windowWidth / 2) - 165, 400)
  for (let i = 0; i < filteredSentences.length; i++) {
    if (posCounter == 26) {
      posCounter = 0; //to reset the position of the buttons when the columns get to long
    }

    if (posCounter % 2 == 0) {
      tempX = (windowWidth / 2) - 630;
    }
    if (posCounter % 2 != 0) {
      tempX = (windowWidth / 2) -320;
    }
    posCounter++;
    sentenceSelect[i].move(tempX)
  }
  for (let i = 0; i < customSentences.length; i++) {
    if (posCounter == 26) {
      posCounter = 0; //to reset the position of the buttons when the columns get to long
    }

    if (posCounter % 2 == 0) {
      tempX = (windowWidth / 2) +10;
    }
    if (posCounter % 2 != 0) {
      tempX = (windowWidth / 2) +320;
    }
    posCounter++;
    customSentenceSelect[i].move(tempX)
  }
  for (let i = 0; i < destinations.length; i++) {
    destinations[i].move(null, windowHeight - 300)
  }
  nav[6].move(windowWidth / 2 + 320);
  nav[7].move(windowWidth / 2 + 320);
  nav[8].move(10, windowHeight - 65);
  nav[9].move(windowWidth - 290, windowHeight - 60)
  nav[10].move((windowWidth / 2) - 165, 100)
  nav[11].move((windowWidth / 2) - 165, 200)
  nav[12].move((windowWidth / 2) - 165, 300)
  customSelection[0].move(windowWidth / 2 - 75, windowHeight - 100)
  




  for (let i = 0; i < filterSelect.length; i++) {
    filterSelect[i].move(windowWidth / 2 - 150);
    posCounter++;
  }
  endScreen[0].move(windowWidth / 2 - 75, windowHeight / 2 + 140)
  info[1].move((windowWidth / 2) - 75, 10)
  posCounter = 0
  tempX = 0
  tempY = 0
  for (let i = 0; i < moreFeedback.length; i++) {
    if (posCounter == 6) {
      posCounter = 0; //to reset the position of the buttons when the columns get to long
    }

    if (posCounter % 2 == 0) {
      tempX = (windowWidth / 2) - 905;
    }
    if (posCounter % 2 != 0) {
      tempX = (windowWidth / 2) + 5;
    }

    moreFeedback[i].move(tempX)
    posCounter++;
  }
  for (let i = 0; i < 9; i++) {
    pos = ((windowWidth / 2) - 100 * (9)) + (200 * i);
    sentenceButtons[i].move(pos, windowHeight - 300)
  }
}

function keyPressed() {
  typed = keyCode
  keyUsed = 0
}

function toggle(inp) {
  if (inp == 1) {
    inp = 0
  } else {
    inp = 1
  }
  return inp
}

function splitSentence(inp) {
  let out = []
  out = inp.split(" ")
  return (out)
}

function nextSentence() {
  //populate and set up sentences   
  wordStore = ""
  scoreStore = ""
  sentencePos++
stationSpeed=0
capitalCount=0

  i = 0
  if (sentencePos > 0) {
    let temp = 0
    while (i < sentenceLength) {
      if (words[i].correct == 1&& words [i].correctCapital==1) {
        scoreStore = scoreStore + "W"
        temp = i
      } else {
        scoreStore = scoreStore + "L"
        temp = destinations[i].currentAns
      }
      i++

      if (temp == 20) {
        wordStore = wordStore + "empty "
      } else {
        wordStore = wordStore + words[temp].text + " "

      }
    }
    finalQueue.push(wordStore.slice(0, -1))
    scoreQueue.push(scoreStore)
  }


  if (sentencePos < sentenceQueue.length) {
    gamestate1=4
    sentence = splitSentence(sentenceQueue[sentencePos])
    sentencePool = [];
    words = [];
    destinations = [];
    capitalLog=[]
    stasis = 0;
    attempts = 0;
    let i = 0;

    sentenceLength = sentence.length;
    while (i < sentenceLength + advancedPunctuation) { //add extra box if advanced assembly is on
      let tempWord;
      let destination;
      let capital;
      if (i<sentenceLength){
        if (sentence[i]==sentence[i].toLowerCase()){
          capital=0
          capitalLog.push(0)
        } else {
          capital=1
          capitalLog.push(1)
        }
      }

      pos = ((windowWidth / 2) - 100 * (sentenceLength + advancedPunctuation)) + (200 * i);
      if (i < sentenceLength - 1) {
        tempWord = new word(windowWidth+200, random(10, windowHeight - 400), i, sentence[i], 180, 90, Math.round(random(1, 4)),capital);//create objects for words
        destination = new tile(pos, windowHeight +30, i, 180, 90);//create objects for word, destinations
      }
      if (i == sentenceLength - 1) {
        tempWord = new word(windowWidth+200, random(10, windowHeight - 400), i, sentence[i].substring(0, sentence[i].length - advancedPunctuation), 180, 90, Math.round(random(1, 4)),capital); // if advanced assembled enabled, remove last character of last word (punctuation)...
        destination = new tile(pos, windowHeight +30, i, 180, 90);
      }
      if (i == sentenceLength) {
        tempWord = new word(windowWidth+200, random(10, windowHeight - 400), i, sentence[i - 1].slice(-1), 180, 90, 0,capital); //...and make it its own object
        destination = new tile(pos, windowHeight +30, i, 180, 90);
      }
      destinations.push(destination);
      destinations[i].goTo(pos, windowHeight - 300,100)
      
      words.push(tempWord);
      words[i].goTo(random(0, windowWidth - 200), random(10, windowHeight - 400),100)
      if (advancedCapitals==1){
        words[i].deCapitalise()
      }
      i++;
      
    }

    check = 0;
  } else {
    gamestate1 = 5
  }

}

function resetValues() {
  words = [];
  check = 0;
  attempts = 0;
  stasis = 0;
  chosenSentence = [];
  premadeWords = [];
  test = 0;
  visualReset = 0;
  sentencePool = [];
  posCounter = 0;
  sentenceCounter = 0;
  pageCounter = 0;
  tempX = 0;
  tempY = 0;
  loadingBuffer = 0;
  totalTime = 0;
  keyUsed = 1
  typed = 0

  customSentence = ""
  sentenceQueue = []
  sentencePos = -1
  scoreQueue = []
  totalScore = 0
  wordStore = ""
  scoreStore = ""
  finalQueue = []
  moreFeedback = []
  startButton[0].move((windowWidth / 2) - 125, (windowHeight / 2) - 90)
  capitalCount=0
}


function checkCapitals(){
  
  for (let i=0;i<capitalLog.length;i++){
    console.log("cap")
    if (words[i].capital==capitalLog[i]){
      words[i].correctCapital=1
      capitalCount++
    } else {
      words[i].correctCapital=0
      
    }
    console.log(words[i].capital,capitalLog[i],words[i].correctCapital)
  }
}

function updateTouch(){

     //if(touched==1){
      //touchX=touches[0].x
      //touchY=touches[0].y
     }
        
        
        //console.log(touchX,touchY)

//}
function touchStarted(){
  touched=1
 // touchX=touches[0].x
 // touchY=touches[0].y
}
function touchEnded(){
  touched=0
}

function autoSave(){
  currentSettings.fontNum=fontNum
  currentSettings.vol=muted
  currentSettings.cap=advancedCapitals
  currentSettings.punct=advancedPunctuation
  currentSettings.amm=amountSelector[0].posNum
  storeItem("settings", currentSettings)
}
