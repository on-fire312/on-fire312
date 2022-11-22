//Written by Oscar Hitchcock-Smith
// written by oscar, this is the main javascript file where the game is run from. all other classes are referenced from here.

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
let currentCanvasX;
let currentCanvasY;
let canvasRatio = 1;
let xCanvasRatio = 1;
let yCanvasRatio = 1;
let sentenceButtons = [];
let keyUsed = 1;
let typed = 0;
let customSelection = [];
let customSentence = "";
let sentenceQueue = [];
let sentencePos = -1;
let amountSelector = [];
let scoreQueue = [];
let totalScore = 0;
let wordStore = "";
let scoreStore = "";
let finalQueue = [];
let moreFeedback = [];
let info = [];
let customSentences = [];
let customSentenceSelect = [];
let engineParticles = [];
let nextScreen = 1;
let stationSpeed = 0;
let rocketAudio;
let newAdjectiveSentences;
let adjectives = [];
let adjectiveSentences = [];
let adjectiveSelect = [];
let capitalLog = [];
let currentSettings;
let fontNum = 0;
let capitalCount = 0;
let sentenceLength
let tempSentenceList = 0
let allSentences = []
let customSentenceToggle = []
let instructions = []
let openDyslexic
let fontScale = 1
function preload() {
  //preloading all content from other files
  testAudio = loadSound('audio/Homo Deus.mp3');
  failOne = loadSound('audio/171673__leszek-szary__failure-1.wav');
  failTwo = loadSound('audio/371451__cabled-mess__lose-funny-retro-video-game.wav');
  successOne = loadSound('audio/320655__rhodesmas__level-up-01.wav');
  newSentences = loadStrings('sentences/sentences.txt');
  newAdjectiveSentences = loadStrings('sentences/sentenceTemplates.txt');
  ruluko = loadFont('Fonts/Ruluko-Regular.ttf');
  topMarks = loadFont('Fonts/Topmarks-Regular.ttf');
  timesNewRoman = loadFont('Fonts/times-new-roman.ttf');
  openDyslexic = loadFont('Fonts/OpenDyslexic3-Regular.ttf')
  rocketAudio = loadSound('audio/rocket.wav')
  spacemanImage = loadImage('images/spaceman.jpg')
}
function setup() {



  currentCanvasX = windowWidth-50; //stores value to cross check later
  currentCanvasY = windowHeight-50;
  createCanvas(windowWidth-50, windowHeight-50);

  textAlign(CENTER);
  textFont(topMarks);//sets font
  //creates coordinates and sizes for stars
  for (let i = 0; i < 200; i++) {
    Xstars[i] = random(30, windowWidth - 30);
    Ystars[i] = random(30, windowHeight - 30);
    Wstars[i] = random(0, 7);
    Hstars[i] = random(0, 7);
  }



  let tempObj
  choose = random(0, 20);

  let start = new button((windowWidth / 2) - 250, (windowHeight / 2) - 180, 500, 250, "Start", 200);//start button
  startButton.push(start); //startButton[0]
  let openHowToPlay = new button((windowWidth / 2) - 250, (windowHeight / 2) + 120, 500, 80, "How to play", 60);//how to play button
  startButton.push(openHowToPlay); //startButton[1]
  let settingsNav = new button((windowWidth / 2) - 250, (windowHeight / 2) + 240, 500, 80, "Settings", 60);//settings button
  startButton.push(settingsNav); //startButton[2]
  let bac = new button(20, 20, 120, 60, "Back", 50);//back button
  nav.push(bac); //nav[0]
  let next = new button(windowWidth - 190, windowHeight - 100, 180, 90, "Next", 80);//next (to end game screen) button
  nav.push(next); //nav[1]
  let restart = new button(windowWidth / 2 - 100, windowHeight / 2 + 120, 200, 60, "Restart", 50);// restart button
  nav.push(restart); //nav[2]
  let reset = new button(windowWidth / 2 - 180, windowHeight / 2 + 200, 360, 60, "New sentence", 50);// new sentence button
  nav.push(reset);   //nav[3]

  let correct = new launchButton(windowWidth / 2 - 100, windowHeight - 170, 150, "Check", 50, 0); //check button
  checking.push(correct); //checking[0]
  let answers = new launchButton(windowWidth / 2 - 100, windowHeight - 170, 150, "Check", 50, 0); //Answer button
  checking.push(answers); //checking[1]
  let launch = new launchButton(windowWidth / 2 - 100, windowHeight - 170, 150, "Launch", 40, 1); //Answer button
  checking.push(launch); //checking[2]
  let fullscreenButton = new button(10, windowHeight - 35, 120, 25, "Fullscreen", 20); //fullscreen toggle button
  nav.push(fullscreenButton); //nav[4]

  let mainMenue = new button(10, 10, 140, 30, "Main Menu", 25); //main menu button
  nav.push(mainMenue); //nav[5]
  let goToScores = new button(windowWidth / 2 - 150, windowHeight / 2 + 280, 300, 60, "Scores", 50); //timer
  endScreen.push(goToScores); //endScreen[0]
  //font selection
  let newFont = new textBox(windowWidth / 2 - 87.5, windowHeight / 2 - 70, 175, 50, "Font Selection", 30); //font selection button
  fontSelect.push(newFont); //fontSelect[0]
  newFont = new button(windowWidth / 2 - 87.5, windowHeight / 2, 175, 25, "Ruluko (default)", 20);
  fontSelect.push(newFont); //fontSelect[1]
  newFont = new button(windowWidth / 2 - 87.5, windowHeight / 2 + 40, 175, 25, "TopMarks (regular)", 20);
  fontSelect.push(newFont); //fontSelect[2]
  newFont = new button(windowWidth / 2 - 87.5, windowHeight / 2 + 80, 175, 25, "open-Dyslexic", 20);
  fontSelect.push(newFont); //fontSelect[3]
  newFont = new button(windowWidth / 2 - 87.5, windowHeight / 2 + 120, 175, 25, "Segoe UI (win Default)", 20);
  fontSelect.push(newFont); //fontSelect[4]
  let toggleAdvanced = new optionSelect(10, windowHeight - 90, 220, 25, "Advanced punctuation", 20);//advanced grammar toggle
  settings.push(toggleAdvanced); //settings[0]
  toggleAdvanced = new optionSelect(10, windowHeight - 120, 220, 25, "Advanced Capitals", 20);//advanced grammar toggle
  settings.push(toggleAdvanced); //settings[1]
  let resetSettings = new button((windowWidth / 2) - 125, windowHeight - 100, 250, 40, "Reset", 30);//settings button
  settings.push(resetSettings); //settings[2]
  let nextPage = new button(windowWidth / 2 + 10, 60 * 15, 300, 50, "Next Page", 40);
  nav.push(nextPage); //nav[6]
  let prevPage = new button(windowWidth / 2 - 320, 60 * 15, 300, 50, "Back Page", 40);
  nav.push(prevPage); //nav[7]
  let muteButton = new button(10, windowHeight - 65, 120, 25, "Mute", 20); //mute toggle
  nav.push(muteButton); //nav[8]
  let submitNewSentence = new button(windowWidth / 2 - 75, windowHeight - 100, 150, 75, "Add", 55);
  customSelection.push(submitNewSentence); //customSelection[0]
  let goToCustom = new button(windowWidth - 290, windowHeight - 60, 280, 50, "Add New Sentences", 30);
  nav.push(goToCustom);//nav[9]
  let goToAll = new button((windowWidth / 2) - 330, 200, 660, 100, "All Sentences", 80);
  nav.push(goToAll);//nav[10]
  let goToFiltered = new button((windowWidth / 2) - 330, 400, 660, 100, "Random", 80);
  nav.push(goToFiltered);//nav[11]
  let goToLength = new button((windowWidth / 2) - 330, 600, 660, 100, "Adjective Practice", 80);
  nav.push(goToLength);//nav [12]


  let sign = new textBox((windowWidth / 2) - 150, 300, 300, 50, "Filter By Length", 40);
  info.push(sign); //info [0]
  let selector = new slider((windowWidth / 2) - 150, windowHeight - 110, "Ammount:", 5, 2);
  amountSelector.push(selector); //ammountSelector [0]
  sign = new textBox((windowWidth / 2) - 150, 10, 150, 55, "Scores", 50);
  info.push(sign);//info [1]

  sign = new textBox((windowWidth / 2) - 495, 30, 340, 45, "All Sentences", 40);
  info.push(sign);//info [2]
  sign = new textBox((windowWidth / 2) + 140, 30, 340, 45, "Filters", 40);
  info.push(sign);//info [3]
  sign = new textBox((windowWidth / 2) - 495, 30, 340, 45, "By length", 40);
  info.push(sign);//info [4]
  sign = new textBox((windowWidth / 2) + 140, 30, 340, 45, "By filter", 40);
  info.push(sign);//info [5]
  tempObj = new button(windowWidth / 2 - 190, windowHeight - 500, 180, 90, "Key Stage:", 35)
  info.push(tempObj) //info [6]
  tempObj = new button(windowWidth / 2 - 90, windowHeight - 500, 180, 90, "Sentence structure:", 35)
  info.push(tempObj) //info [7]
  tempObj = new optionSelect(windowWidth / 2 + 340, 100, 350, 50, "Custom Sentences", 40)
  customSentenceToggle.push(tempObj) //customSentenceToggle[0]
  tempObj = new optionSelect(windowWidth / 2 + 340, 100 + 60, 350, 50, "Premade Sentences", 40)
  customSentenceToggle.push(tempObj) //customSentenceToggle[1]
  for (let i = 0; i < 100; i++) {
    let temp = new spark(200, 150, 20, "RIGHT"); //creates sparks for rocket
    engineParticles.push(temp);
  };
  i = 0
  for (i = 0; i < 8; i++) {
    pos = ((windowWidth / 2) - 100 * (9)) + (200 * i);
    let temp = new inputButton(pos, windowHeight - 300, i, 180, 90, "______", 40); //creates input boxes for adding sentences
    sentenceButtons.push(temp);

  };
  pos = ((windowWidth / 2) - 100 * (9)) + (200 * i);
  let tempArray = [".", "?", "!"]
  let temp = new optionButton(pos, windowHeight - 300, 180, 90, 0, 40, tempArray); //adds punctuation button
  sentenceButtons.push(temp);


  //creating buttons for sentence selection based on length
  let compRandom = new button(windowWidth / 2 - 470, 100, 300, 50, "Any", 40);
  randomSentenceSelect.push(compRandom); //randomSentenceSelect[0]
  let shortRandom = new button(windowWidth / 2 - 470, 100 + 60, 300, 50, "short", 40);
  randomSentenceSelect.push(shortRandom); //randomSentenceSelect[1]
  let longRandom = new button(windowWidth / 2 - 470, 100 + 60 * 2, 300, 50, "long", 40);
  randomSentenceSelect.push(longRandom); //randomSentenceSelect[3]
  tempArray = ["Select the sentence you want to test or be tested on.", "Then drag the words into the grey boxes in the correct order.", "Click the 'check' button to check which words are correct.", "You will have 3 attempts.", " ", "Select any sentence through the 'all sentences' menu.", "Test Yourself on recurring sentence structures through the 'adjective practice' menu where only ", "the adjective is changed.", " ", "Add punctuation yourself with 'advanced punctuation' or capitals with 'advanced capitals' by turning it ", "on while choosing your sentences.", " ", "Click on the scores button at the end of the game to review where you put the words at the end of the game"]
  tempObj = new instruction(200, 100, windowWidth - 400, 30, "How to play:", tempArray)
  instructions.push(tempObj) //instructions[0]
  tempArray = ["Click on each box below to type in the word.", "Press shift to captilise the current word.", "Click on last box to change punctuation.", "Click on the key stage button to change key stage."]
  tempObj = new instruction(200, 100, windowWidth - 400, 30, "creating your own sentences:", tempArray)
  instructions.push(tempObj) //instructions[1]
  tempObj = new textBox(windowWidth / 2 - 500, 10, 1000, 60, "Drag the words into the correct order", 50)
  instructions.push(tempObj) //instructions[2]
  tempObj = new textBox(windowWidth / 2 - 210, windowHeight / 2 - 200, 420, 110, "Capitals!", 100)
  instructions.push(tempObj) //instructions[3]
  tempObj = new textBox(windowWidth / 2 - 500, 10, 1000, 60, "N/A", 50)
  instructions.push(tempObj) //instructions[5]
}

function draw() { // runs once every frame
  if (nav[4].singleClickCheck() == 1) { //if full screen button pressed
    toggFullscreen();
  }
  nav[4].show();
  if (frameCycle > 120) { //reset frame count and save local data
    frameCycle = 0;
    autoSave();
  };
  frameCycle++;
  if (currentCanvasX != windowWidth-50 || currentCanvasY != windowHeight-50) { //if window size has changed
    resetVisuals();
  };
  backdrop(); //draw background (canvas, stars, etc...)
  if (nav[8].singleClickCheck() == 1) { //if muted button pressed
    toggMute();
  };
  nav[8].show();


  if (gamestate1 == -1) {

    //pre gui processing
    //split sentences.txt into sentences and filters



    if (getItem("customSentences") == null) {//if custom sentences empty/does not exist
      customsentences = [];
      let temp = "The car was slow. Other";
      customSentences.push(temp);
      storeItem("customSentences", customSentences); // save to local data
    } else {
      customSentences = getItem("customSentences"); //else load custom sentences
    };

    if (getItem("settings") == null) { //if settings empty

      currentSettings = new dataStore(1, 0, 0, 0, 2); //load default settings

      storeItem("settings", currentSettings);
    } else {
      currentSettings = getItem("settings"); //else load settings
    };
    fontNum = currentSettings.font;
    muted = currentSettings.vol;
    advancedCapitals = currentSettings.cap;
    advancedPunctuation = currentSettings.punct;
    amountSelector[0].setVal(currentSettings.amm);// set settings
    updateFont()
    if (muted == 1) { //update buttons:


      nav[8].changeText("Muted");

    }
    else if (muted == 0) {

      nav[8].changeText("Mute");

    };

    //sort sentences into sentences and filters while logging their position:

    tempArray = []
    for (let i = 0; i < newSentences.length; i++) {
      if (newSentences[i].substring(0, 1) != "#") { //filters begin with "#"
        tempSentence = [];
        tempSentence = newSentences[i].split(" ");
        if (tempSentence.length < 9) { //checks string is less than 9 words
          filteredSentences.push(newSentences[i]);

        };
      };
      if (newSentences[i].substring(0, 1) == "#") {
        filters.push(newSentences[i].slice(1)); //take of #
        filters.push(filteredSentences.length); //loging position in filteredSentences
        tempArray.push(newSentences[i].slice(1))
      };

    };
    let tempObj = new optionButton(windowWidth / 2 + 10, windowHeight - 500, 180, 90, tempArray.length - 1, 35, tempArray); //adds punctuation button
    sentenceButtons.push(tempObj);

    //sort sentences into sentences and adjectives while logging their position:
    for (let i = 0; i < newAdjectiveSentences.length; i++) {
      if (newAdjectiveSentences[i].substring(0, 1) != "#") { //filters begin with "#"
        tempSentence = [];
        tempSentence = newAdjectiveSentences[i].split(" ");
        if (tempSentence.length < 9) { //checks string is less than 9 words
          adjectives.push(newAdjectiveSentences[i]);
        };
      };
      if (newAdjectiveSentences[i].substring(0, 1) == "#") {
        adjectiveSentences.push(newAdjectiveSentences[i].slice(1)); //take of #
        adjectiveSentences.push(adjectives.length);

      };

    };







    //same for custom sentences:
    /*
    posCounter = 0;
    for (let i = 0; i < customSentences.length; i++) {
      if (posCounter == 26) {
        posCounter = 0; //to reset the position of the buttons when the columns get to long
      };

      if (posCounter % 2 == 0) {
        tempX = (windowWidth / 2) + 10;
        tempY = 100 + 60 * (posCounter / 2);
      }; filter
      if (posCounter % 2 != 0) {
        tempX = (windowWidth / 2) + 320;
      };
      tempSentence = [];
      tempSentence = customSentences[i].split(" ");
      let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40,customSentences[i]);  //creates buttons for sentence selection
      customSentenceSelect.push(sentence0);
      posCounter++;
    };
*/
    //same for adjectives:
    posCounter = 0;
    for (let i = 0; i < adjectiveSentences.length; i = i + 2) {
      if (posCounter == 26) {
        posCounter = 0; //to reset the position of the buttons when the columns get to long
      };

      if (posCounter % 2 == 0) {
        tempX = (windowWidth / 2) - 310;
        tempY = 100 + 60 * (posCounter / 2);
      };
      if (posCounter % 2 != 0) {
        tempX = (windowWidth / 2) + 10;
      };
      tempSentence = [];
      tempSentence = adjectiveSentences[i].split(" ");
      let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40, adjectiveSentences[i]);  //creates buttons for sentence selection
      adjectiveSelect.push(sentence0);
      posCounter++;
    };

    //same for filters:
    for (let i = 0; i < filters.length; i++) {
      if (i % 2 == 0) {
        let filter0 = new optionSelect(windowWidth / 2 + 20, 100 + 60 * (i / 2), 300, 50, filters[i], 40); //same as above but for 1 colum of filters
        filterSelect.push(filter0);
      }

    }
    gamestate1 = 0;
  };
  if (gamestate1 == 0) {
    //starting screen
    startButton[0].ref();
    startButton[1].ref();
    if (startButton[0].singleClickCheck() == 1) {
      initialiseButtons();
      //navigate to sentence selection
      gamestate1 = 2;
    };
    if (startButton[1].singleClickCheck() == 1) {
      //navigate to instructions
      gamestate1 = 1;
    };
    if (startButton[2].singleClickCheck() == 1) {
      //navigate to settings
      gamestate1 = 10;
    };

    startButton[0].show();
    startButton[1].show();
    startButton[2].show();


  };



  if (gamestate1 == 1) {
    //how to play instructions

    nav[0].ref();
    if (nav[0].singleClickCheck() == 1) {
      //return to start menu 
      gamestate1 = 0;
    };
    fill(255);
    strokeWeight(5);
    stroke(200, 200, 200);
    fill(255, 255, 255);

    //  rect((windowWidth / 2) - 300, 10, 600, windowHeight - 20);
    nav[0].show();
    instructions[0].show()
    /*
        textSize(fontScale*40);
        fill(0);
        text("how to play:", (windowWidth / 2) - 300, 10, 600, windowHeight - 20);
        textSize(fontScale*20);
        textAlign(LEFT);
        text(text("Select the sentence you want to test or be tested on.", (windowWidth / 2) - 290, 60, 600, windowHeight - 20));
        text(text("Then drag the words into the grey boxes into the correct order", (windowWidth / 2) - 290, 80, 600, windowHeight - 20));
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
    */
  };


  //sentence selection:
  if (gamestate1 < 2.9 && gamestate1 >= 2) { //all consistent gui for sentence selection



    length0 = filteredSentences.length;

    nav[5].show();





    //toggle grammar on and off
    customColor = 1;
    settings[0].toggleClickCheck();
    if (settings[0].option == 1) { //if selected
      advancedPunctuation=1
      fill(200, 200, 200);
    } else {
      advancedPunctuation=0
      fill(255, 255, 255);
    };
    settings[0].show();

    settings[1].toggleClickCheck();
    if (settings[1].option == 1) { //if selected
      advancedCapitals=1
      fill(200, 200, 200);
    } else {
      advancedCapitals=0
      fill(255, 255, 255);
    };
    settings[1].show();
    customColor=0

    if (nav[5].singleClickCheck() == 1) {// if reset button pressed
      resetValues();
      gamestate1 = 0;
    };



  




  };

  if (gamestate1 == 2) {
    nav[9].show();
    nav[10].show();
    nav[11].show();
    nav[12].show();
    //display filters
    if (nav[9].singleClickCheck()) {
      gamestate1 = 2.9;// create custom sentences
    };
    if (nav[10].singleClickCheck()) {
      gamestate1 = 2.11;// all sentences
      initialiseButtons();
    };
    if (nav[11].singleClickCheck()) {
      gamestate1 = 2.12; // filtered by key stage

    };

    if (nav[12].singleClickCheck()) {
      gamestate1 = 2.14; //adjective select
    };
  };


  if (gamestate1 == 2.12 && gamestate1 == 2.14) {
    amountSelector[0].show();
  };


  if (gamestate1 == 2.11) {
    //all sentences/custom sentences

    info[2].show();
    info[3].show();


    if (pageCounter + 1 < sentenceSelect.length / 26) {
      nav[6].show();
      if (nav[6].singleClickCheck() == 1) {//if next page pressed
        pageCounter++; //next page

      };
    }
    if (pageCounter > 0) {
      nav[7].show();
      if (nav[7].singleClickCheck() == 1) {// same but going back pages
        pageCounter = pageCounter - 1;
      };
    }


    for (let i = 0; i < customSentenceToggle.length; i++) {
      customSentenceToggle[i].show(); //show filters

      if (customSentenceToggle[i].option == 1) { //if selected
        customColor = 1;
        fill(200, 200, 200);
      } else {
        fill(255, 255, 255);
      };
      customSentenceToggle[i].show()// show button
      customColor = 0;
      if (customSentenceToggle[i].toggleClickCheck() == 1) {
        initialiseButtons()
      }
    }

    for (let i = 0; i < filterSelect.length; i++) {
      filterSelect[i].show(); //show filters

      if (filterSelect[i].option == 1) { //if selected
        customColor = 1;
        fill(200, 200, 200);
      } else {
        fill(255, 255, 255);
      };
      filterSelect[i].show()// show button
      customColor = 0;
      if (filterSelect[i].toggleClickCheck() == 1) {
        initialiseButtons()
      } //check if pressed


      /*     if (filterSelect[i].singleClickCheck() == 1) { //if clicked
     
     
     
             gamestate1 = 2.121;//go to sentence setup
             pageCounter = 0
             tempSentenceList = []
             posCounter = 0;
             for (let j = filters[1 + i * 2] + 1; j < filters[3 + i * 2] + 1; j++) {
               if (posCounter == 26) {
                 posCounter = 0; //to reset the position of the buttons when the columns get to long
               };
     
               if (posCounter % 2 == 0) {
                 tempX = (windowWidth / 2) - 310;
                 tempY = 100 + 60 * (posCounter / 2);
               };
               if (posCounter % 2 != 0) {
                 tempX = (windowWidth / 2) + 10;
               };
               tempSentence = [];
               tempSentence = filteredSentences[j - 1].split(" ");
               let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40, filteredSentences[j - 1]);  //creates buttons for sentence selection
               tempSentenceList.push(sentence0);
               posCounter++;
             };
           
           };*/


    };
    sentenceCounter = 26 * pageCounter; //used to identify what sentences to display
    posCounter = 0;
    while (posCounter < 26) {
      if (sentenceCounter < sentenceSelect.length) { //while there are still sentences
        nav[1].show();

        if (sentenceSelect[sentenceCounter].option == 1) { //if selected
          customColor = 1;
          fill(200, 200, 200);
        } else {
          fill(255, 255, 255);
        };
        sentenceSelect[sentenceCounter].show()// show button
        customColor = 0;
        sentenceSelect[sentenceCounter].toggleClickCheck(); //check if pressed



      };
      //same for custom sentences:
      /*      if (sentenceCounter < customSentenceSelect.length) {
              nav[1].show();
      
              if (customSentenceSelect[sentenceCounter].option == 1) {
                customColor = 1;
                fill(200, 200, 200);
              } else {
                fill(255, 255, 255);
              };
              customSentenceSelect[sentenceCounter].show();
      
              customColor = 0
              customSentenceSelect[sentenceCounter].toggleClickCheck();
      
      
            };
      */
      if (nav[1].singleClickCheck() == 1) {//if next button pressed



        for (let j = 0; j < sentenceSelect.length; j++) {
          if (sentenceSelect[j].option == 1) {//if selected 
            sentenceQueue.push(allSentences[j]); //add sentence to queue
            sentenceSelect[j].option = 0;


          };

        }
        //same for custom sentences:
        for (let j = 0; j < customSentenceSelect.length; j++) {
          if (customSentenceSelect[j].option == 1) {
            sentenceQueue.push(customSentences[j]);
            customSentenceSelect[j].option = 0;


          };


        };
        if (sentenceQueue.length > 0) { //if queue has items
          gamestate1 = 3; //got to sentence setup
        };

      };

      sentenceCounter++;
      posCounter++;
    }
    sentenceCounter = 26 * pageCounter; //used to identify what sentences to display
    posCounter = 0;
    while (posCounter < 26) {
      if (sentenceCounter < sentenceSelect.length) {
        sentenceSelect[sentenceCounter].showTag()
      }


      if (sentenceCounter < customSentenceSelect.length) {
        customSentenceSelect[sentenceCounter].showTag();
      }


      sentenceCounter++;
      posCounter++;
    }



    if (pageCounter + 1 < sentenceSelect.length / 26) {
      nav[6].show();
      if (nav[6].singleClickCheck() == 1) {//if next page pressed
        pageCounter++; //next page

      };
    }
    if (pageCounter > 0) {
      nav[7].show();
      if (nav[7].singleClickCheck() == 1) {// same but going back pages
        pageCounter = pageCounter - 1;
      };
    }
  };



  if (gamestate1 == 2.12) {

    info[4].show()
    info[5].show()
    for (let i = 0; i < filterSelect.length - 1; i++) {
      filterSelect[i].show(); //show filters
      if (filterSelect[i].singleClickCheck() == 1) { //if clicked

        sentenceQueue = [];
        for (let j = 0; j < amountSelector[0].posNum + 1; j++) { //for selector amount
          tempRandom = Math.round(random(filters[1 + i * 2] + 1, filters[3 + i * 2])); //random number between filter and next filter

          sentenceQueue.push(newSentences[tempRandom]); //add sentence to queue

        }


        gamestate1 = 3;//go to sentence setup
      };


    };


    randomSentenceSelect[0].show();
    randomSentenceSelect[1].show();
    randomSentenceSelect[2].show();
    if ((randomSentenceSelect[0].singleClickCheck() == 1)) { //if random button pressed


      sentenceQueue = [];
      for (let j = 0; j < amountSelector[0].posNum + 1; j++) {
        sentenceQueue.push(random(filteredSentences)); //pick random number

      };

      gamestate1 = 3;//go to sentence setup

    };
    //pick random long sentence
    if ((randomSentenceSelect[2].singleClickCheck() == 1)) {//if long button pressed

      for (let j = 0; j < filteredSentences.length; j++) {
        if (filteredSentences[j].split(" ").length > 5) { //if sentence shorter than 5 words
          sentencePool.push(filteredSentences[j]); //add to filtered list
        };

      };

      sentenceQueue = [];
      for (let j = 0; j < amountSelector[0].posNum + 1; j++) {
        sentenceQueue.push(random(sentencePool)); //pick random sentence and add to queue

      }
      gamestate1 = 3;//go to sentence setup
    }
    //pick random short sentence
    if ((randomSentenceSelect[1].singleClickCheck() == 1)) {
      for (let j = 0; j < filteredSentences.length; j++) {
        if (filteredSentences[j].split(" ").length <= 5) {
          sentencePool.push(filteredSentences[j]);
        };

      };


      sentenceQueue = [];
      for (let j = 0; j < amountSelector[0].posNum + 1; j++) {
        sentenceQueue.push(random(sentencePool));
      }
      gamestate1 = 3; //got to sentence setup
    };

  };






  if (gamestate1 == 2.14) {//adjective select
    //same way of displaying lists as before:
    sentenceCounter = 26 * pageCounter;
    posCounter = 0;
    while (posCounter < 26) {
      if (sentenceCounter < adjectiveSelect.length - 1) {
        nav[1].show();

        if (adjectiveSelect[sentenceCounter].option == 1) {
          customColor = 1;
          fill(200, 200, 200);
        } else {
          fill(255, 255, 255);
        };
        adjectiveSelect[sentenceCounter].show();
        customColor = 0;

        if (adjectiveSelect[sentenceCounter].singleClickCheck() == 1) {

          sentenceQueue = [];
          for (let j = 0; j < amountSelector[0].posNum + 1; j++) {
            tempRandom = Math.round(random(adjectiveSentences[1 + sentenceCounter * 2] + 1, adjectiveSentences[3 + sentenceCounter * 2] - 1));
            sentenceQueue.push(adjectiveSentences[sentenceCounter * 2].replace("_", adjectives[tempRandom]));

          };


          gamestate1 = 3; //go to sentence setup
        };


      };

      sentenceCounter++;
      posCounter++;
    };

    sentenceCounter = 26 * pageCounter;
    posCounter = 0;
    while (posCounter < 26) {
      if (sentenceCounter < adjectiveSelect.length - 1) {
        adjectiveSelect[sentenceCounter].showTag();
      };

      sentenceCounter++;
      posCounter++;
    };
  };



  if (gamestate1 == 2.9) {//custom sentences
    instructions[1].show()
    info[6].show()
    nav[0].show();
    if (nav[0].singleClickCheck()) { //if back button pressed
      gamestate1 = 2;
    };
    i = 0;
    for (i = 0; i < sentenceButtons.length - 2; i++) { //no let as value for i is used later
      sentenceButtons[i].toggleClickCheck();
      sentenceButtons[i].show();

    };

    sentenceButtons[i].show();
    if (sentenceButtons[i].singleClickCheck() == 1) { //if punctuation button clicked
      sentenceButtons[i].next(); //next punctuation
    };
    i++;
    sentenceButtons[i].show();
    if (sentenceButtons[i].singleClickCheck() == 1 || info[6].singleClickCheck()) { //if punctuation button clicked
      sentenceButtons[i].next(); //next punctuation
    };
    i++;
    customSelection[0].show();
    if (customSelection[0].singleClickCheck() == 1) {
      customSentence = "";
      i = 0;

      for (i = 0; i < sentenceButtons.length - 2; i++) {
        if (sentenceButtons[i].tex.charAt(0) != "_" && sentenceButtons[i].tex.charAt(0) != "" && sentenceButtons[i].tex.charAt(0) != null) { //if not empty
          customSentence = customSentence + " " + sentenceButtons[i].tex; //add text
        };

      };
      customSentence = customSentence + sentenceButtons[i].tex; //add punctuation
      i++;
      customSentence = customSentence + " " + sentenceButtons[i].tex; //add punctuation
      i++;

      customSentence = customSentence.substring(1);//remove space at start

      i = 0;
      found = 0;
      for (let i = 0; i < customSentences.length; i++) { //linear search for duplicate sentences 
        if (customSentences[i] == customSentence) {
          found = 1;

        };

      };
      if (found == 0 && customSentence.length > 2) { //if duplicate not found
        customSentences.push(customSentence);
        storeItem("customSentences", customSentences);
        customSentenceSelect = []
        posCounter = 0;
        for (let i = 0; i < customSentences.length; i++) {
          if (posCounter == 26) {
            posCounter = 0; //to reset the position of the buttons when the columns get to long
          };

          if (posCounter % 2 == 0) {
            tempX = (windowWidth / 2) + 10;
            tempY = 100 + 60 * (posCounter / 2);
          }; filter
          if (posCounter % 2 != 0) {
            tempX = (windowWidth / 2) + 320;
          };
          tempSentence = [];
          tempSentence = customSentences[i].split(" ");
          let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40, customSentences[i]);  //creates buttons for sentence selection
          customSentenceSelect.push(sentence0);
          posCounter++;
        };
      };

    };
  };



  if (gamestate1 == 3) { //sentence prep
    //reset all game based values
    sentencePos = -1;
    check = 0;
    attempts = 0;
    stasis = 0;
    totalTime = 0;
    scoreQueue = [];
    totalScore = 0;
    finalQueue = [];
    moreFeedback = [];
    stationSpeed = 0;
    nextSentence();
    gamestate1 = 3.5; //go to intro screen
    startButton[0].move(null, windowHeight - 300); //move start button
  };


  if (gamestate1 == 3.5) { //intro screen
    startButton[0].show();
    fill(255);
    strokeWeight(5);
    stroke(200, 200, 200);
    rect((windowWidth / 2) - 600, 50, 1200, windowHeight - 400, 10);
    fill(0);
    noStroke();
    textSize(fontScale * 60);
    text("Welcome!", (windowWidth / 2) - 600, 50, 1200, windowHeight - 300);
    textSize(fontScale * 30);
    text("Alex has broken his space station.", (windowWidth / 2) - 600, 120, 1200, windowHeight - 300);
    text("He wrote sentences across the station so he knew how to fix it.", (windowWidth / 2) - 600, 160, 1200, windowHeight - 300);
    text("Will you help him fix it?", (windowWidth / 2) - 600, 200, 1200, windowHeight - 300);
    image(spacemanImage, windowWidth / 2 - 2048 * 0.125, 250, 2048 * 0.25, 1360 * 0.25)
    if (startButton[0].singleClickCheck() == 1) {
      gamestate1 = 4; //go to main game
    };
  };
  if (gamestate1 >= 4 && gamestate1 < 5) {
    //main game:
    //show words destinations

    nav[8].show();

    if (gamestate1 >= 4.2) { //while sentence within screen, and sentence is done
      for (let i = 0; i < words.length; i++) {
        words[i].slide(stationSpeed, 0); //move sentence
      };
      stationSpeed = stationSpeed - 0.1 //increase speed (moving backwards)
      for (i = 0; i < 100; i++) {
        engineParticles[i].teleport(words[words.length - 1].xRight, words[words.length - 1].yMid); //move sparks
        engineParticles[i].show();

      };
      gamestate1 = gamestate1 + 0.003;
      if (gamestate1 >= 4.9) {// once sentence left screen, next sentence
        nextSentence();
      };
    } else {
      for (i = 0; i < destinations.length; i++) { //while sentence not moving, display word destinations

        destinations[i].show();
      };
    };


    if (check < sentenceLength) { //while sentence is not correct
      totalTime = totalTime + deltaTime;

    };

    nav[5].show();
    if (nav[5].singleClickCheck() == 1) { //if main menu button pressed
      resetValues();
      gamestate1 = 0;
    };

    //move and show the words:

    for (i = 0; i < words.length; i++) {

      words[i].move();

      fill(255);
      words[i].show();
      destinations[i].mark();

    };
    if (attempts < 3 && check < sentenceLength) {
      instructions[2].show()
    }


    if ((check >= sentenceLength) || (stasis == 1 && attempts < 4 && attempts > 3.5)) { //when sentence is correct or max attempts reached
      if (advancedCapitals == 1 && attempts != 4) {
        for (let i = 0; i < words.length - advancedPunctuation; i++) {
          if (words[i].singleClickCheck() == 1) { //if word presses
            words[i].toggleCapitalise();
          };
          if (words[0].steps == 0) {
            instructions[3].show()
          }

        }
      } else {
        attempts = 4; //complete sentence
      };

      if (checking[0].singleClickCheck() == 1) {

        checkCapitals();
        attempts = 4; //complete sentence
      };
    };

    if ((attempts >= 4)) {// if sentence complete
      //freeze words in place,
      stasis = 1;



      if (gamestate1 < 4.2) {//when game complected
        checking[2].show();
        if (advancedCapitals == 1) {
          instructions[4].tex = "Well Done! Score: " + check + " Capitals: " + capitalCount + "/" + (words.length - advancedPunctuation)
        } else {
          instructions[4].tex = "Well Done! Score: " + check
        }
        instructions[4].show()
        if (checking[2].singleClickCheck() == 1) { //if next button clicked
          if (muted == 0) {
            rocketAudio.play();
          };

          if (check == words.length) { //if sentence correct
            if (advancedCapitals == 1) {
              if (capitalCount == words.length - advancedPunctuation) {
                totalScore++;//if punctuation and words are correct mark correct
              };
            } else {
              totalScore++;//if words are correct mark correct
            };


          };



          gamestate1 = 4.2;// move rocket


          nextScreen = 0;


        };
      };

    } else {

      checking[0].show();

    };

    if ((check != sentenceLength) && (attempts == 3)) {// if sentence incorrect
      //freeze words in place,
      stasis = 1;
      checking[1].show();
      if (checking[1].singleClickCheck() == 1) {
        for (i = 0; i < words.length; i++) {
          words[i].goTo(destinations[i].xLeft, destinations[i].yTop, 100); //go to correct location
        };
        if (advancedCapitals == 1) {
          attempts = 3.9;// user can change capitals
        } else {
          attempts = 4;// mark answer
        };

      };
    };


    if (checking[0].singleClickCheck() == 1 && stasis != 1) {
      checkAnswers();
      if (check < sentenceLength) {
        if (muted == 0) {
          failTwo.play();// play fail noise
        };

      };
      if (check >= sentenceLength) {
        if (muted == 0) {
          successOne.play(); ///play correct noise
        };
      };
    };
  };

  nav[4].show();
  if (gamestate1 == 5) {

    //scoring/end game screen

    endScreen[0].show();
    if (endScreen[0].singleClickCheck()) {//if scores button pressed
      gamestate1 = 5.1;
    };
    nav[5].show();
    if (nav[5].singleClickCheck() == 1) { //if main menu button pressed
      resetValues();
      gamestate1 = 0;
    };
    strokeWeight(5);
    stroke(200, 200, 200);
    fill(255, 255, 255);
    rect(windowWidth / 2 - 300, windowHeight / 2 - 240, 600, 100, 20);
    rect(windowWidth / 2 - 300, windowHeight / 2 - 120, 600, 100, 20);
    rect(windowWidth / 2 - 300, windowHeight / 2, 600, 100, 20);
    noStroke();
    fill(0);
    textSize(fontScale * 60);
    text("thanks for playing", windowWidth / 2 - 400, windowHeight / 2 + 10, 800, 100);
    //shows score
    text("Final Score: " + totalScore + "/" + sentenceQueue.length + " ", windowWidth / 2 - 400, windowHeight / 2 - 220, 800, 100);
    text("time: " + str(Math.round(totalTime) / 1000), windowWidth / 2 - 400, windowHeight / 2 - 100, 800, 100);
    nav[2].show();
    //button to chose new sentence
    if (nav[2].singleClickCheck() == 1) {
      gamestate1 = 3;
    };
    //button to try again
    nav[3].show();
    if (nav[3].singleClickCheck() == 1) {
      gamestate1 = 2;
    };

  };

  if (gamestate1 == 5.1) {
    //create answer board
    let posCounter = 0;
    let tempX;
    let tempY;
    for (let i = 0; i < finalQueue.length; i++) {
      if (posCounter == 6) {
        posCounter = 0; //to reset the position of the buttons when the columns get to long
      };

      if (posCounter % 2 == 0) {
        tempX = (windowWidth / 2) - 905;
        tempY = 120 + 210 * (posCounter / 2);
      };
      if (posCounter % 2 != 0) {
        tempX = (windowWidth / 2) + 5;
      };

      let temp = new feedback(tempX, tempY, finalQueue[i], sentenceQueue[i], scoreQueue[i], i);
      moreFeedback.push(temp);
      posCounter++;
    }
    i = 0;
    pageCounter = 0;
    gamestate1 = 5.2;//display answer board
  };

  if (gamestate1 == 5.2) {
    //display answer board://#
    nav[0].show();
    if (nav[0].singleClickCheck()) {
      gamestate1 = 5;
    };
    let resultCounter = 6 * pageCounter;

    let posCounter = 0;




    while (posCounter < 6) {

      if (resultCounter < sentenceQueue.length) {
        moreFeedback[resultCounter].show();

      };
      resultCounter++
      posCounter++
    };


    if (pageCounter + 1 < moreFeedback.length / 6) {
      nav[6].show();
      if (nav[6].singleClickCheck() == 1) {//if next page pressed
        pageCounter++; //next page

      };
    }
    if (pageCounter > 0) {
      nav[7].show();
      if (nav[7].singleClickCheck() == 1) {// same but going back pages
        pageCounter = pageCounter - 1;
      };
    }
    info[1].show();
  };



  if (gamestate1 == 10) {
    settings[2].show();
    selectFont();

    if (nav[0].singleClickCheck() == 1) {
      //return to start menu 


      gamestate1 = 0;
    }
    if (settings[2].singleClickCheck() == 1) { //if reset button pressed


      currentSettings = new dataStore(1, 0, 0, 0, 2);
      fontNum = currentSettings.font;
      muted = currentSettings.vol;
      advancedCapitals = currentSettings.cap;
      advancedPunctuation = currentSettings.punct;
      amountSelector[0].setVal(currentSettings.amm);
      updateFont()
      autoSave();
      if (muted == 1) {


        nav[8].changeText("Muted");

      }
      else if (muted == 0) {

        nav[8].changeText("Mute");

      }
    };
    nav[0].show();

  };


};

function backdrop() {
  //function to draw background
  background(10, 10, 30);
  noStroke();
  fill(0, 255, 25);
  //image(backImg,0,0,windowWidth,windowHeight);
  for (let i = 0; i < 200; i++) {
    fill(200);
    circle(Xstars[i], Ystars[i], Wstars[i], Hstars[i]);
  };
};

function updateFont() {

  if (fontNum == 0) {
    textFont(ruluko);
    fontScale = 1
  };
  if (fontNum == 1) {
    textFont(topMarks);
    fontScale = 1
  };
  if (fontNum == 2) {
    textFont(openDyslexic);
    fontScale = 0.7
  };
  if (fontNum == 3) {
    textFont(timesNewRoman);
    fontScale = 1.1
  };
  console.log("reset", fontNum)
}

function selectFont() {
  if (nav[0].singleClickCheck() == 1) {
    //return to start menu 
    gamestate1 = 0;
  };

  if (fontSelect[1].singleClickCheck() == 1) {
    fontNum = 0
  };
  if (fontSelect[2].singleClickCheck() == 1) {
    fontNum = 1
  };
  if (fontSelect[3].singleClickCheck() == 1) {
    fontNum = 2
  };
  if (fontSelect[4].singleClickCheck() == 1) {
    fontNum = 3
  };
  for (i = 0; i < fontSelect.length; i++) {
    fontSelect[i].show();
  };
  updateFont()

}
function checkAnswers() {
  //function to check the sentences
  check = 0;
  attempts++;
  for (i = 0; i < words.length; i++) {
    destinations[i].getCurrentAns();
    if (destinations[i].currentAns != 20) {

    }

    if (words[i].checkCorrect() == 1) { //if words in correct position
      destinations[i].correct = 1;

    };


  };

};


function toggFullscreen() {
  //toggle for full screen
  if (fs == 0) {

    fs = 1;
  }
  else if (fs == 1) {
    fs = 0;

  };

  fullscreen(fs);
};
function toggMute() {
  if (muted == 0) {


    nav[8].changeText("Muted");
    muted = 1;
  }
  else if (muted == 1) {
    muted = 0;
    nav[8].changeText("Mute");

  };


};
function resetVisuals() {
  //reset coordinates of all objects
  currentCanvasX = windowWidth-50;
  currentCanvasY = windowHeight-50;
  resizeCanvas(windowWidth-50, windowHeight-50);
  xCanvasRatio = currentCanvasX / 1920;
  yCanvasRatio = currentCanvasY / 1080;
  if (xCanvasRatio > yCanvasRatio) {
    canvasRatio = yCanvasRatio;
  } else {
    canvasRatio = xCanvasRatio;
  };
  for (let i = 0; i < 200; i++) {
    Xstars[i] = random(30, windowWidth - 30);
    Ystars[i] = random(30, windowHeight - 30);
  }
  visualReset = visualReset - 1;
  if (gamestate1 != 3.5) {
    startButton[0].move((windowWidth / 2) - 250, (windowHeight / 2) - 180);
  } else {
    startButton[0].move((windowWidth / 2) - 250, windowHeight - 300);
  }

  startButton[1].move((windowWidth / 2) - 250, (windowHeight / 2) + 120);
  startButton[2].move((windowWidth / 2) - 250, (windowHeight / 2) + 240);
  nav[1].move(windowWidth - 190, windowHeight - 100);
  nav[2].move(windowWidth / 2 - 100, windowHeight / 2 + 120);
  nav[3].move(windowWidth / 2 - 180, windowHeight / 2 + 200);
  nav[4].move(10, windowHeight - 30);
  checking[0].move(windowWidth / 2 - 100, windowHeight - 170);
  fontSelect[0].move(windowWidth / 2 - 87.5, windowHeight / 2 - 70);
  fontSelect[1].move(windowWidth / 2 - 87.5, windowHeight / 2);
  fontSelect[2].move(windowWidth / 2 - 87.5, windowHeight / 2 + 40);
  fontSelect[3].move(windowWidth / 2 - 87.5, windowHeight / 2 + 80);
  fontSelect[4].move(windowWidth / 2 - 87.5, windowHeight / 2 + 120);
  settings[0].move(10, windowHeight - 90);
  settings[1].move(10, windowHeight - 120, 200);
  settings[2].move((windowWidth / 2) - 125, windowHeight - 100);
  nav[5].move(10, 10);
  posCounter = 0;
  randomSentenceSelect[0].move(windowWidth / 2 - 470, 100);
  randomSentenceSelect[1].move(windowWidth / 2 - 470, 100 + 60);
  randomSentenceSelect[2].move(windowWidth / 2 - 470, 100 + 60 * 2);
  amountSelector[0].move((windowWidth / 2) - 150, windowHeight - 110);
  for (let i = 0; i < sentenceSelect.length; i++) {
    if (posCounter == 26) {
      posCounter = 0; //to reset t;he position of the buttons when the columns get to long
    }

    if (posCounter % 2 == 0) {
      tempX = (windowWidth / 2) - 630;
    };
    if (posCounter % 2 != 0) {
      tempX = (windowWidth / 2) - 320;
    };
    posCounter++;;
    sentenceSelect[i].move(tempX);
  };
  for (let i = 0; i < customSentenceSelect.length; i++) {
    if (posCounter == 26) {
      posCounter = 0; //to reset the position of the buttons when the columns get to long
    };

    if (posCounter % 2 == 0) {
      tempX = (windowWidth / 2) + 10;
    };
    if (posCounter % 2 != 0) {
      tempX = (windowWidth / 2) + 320;
    };
    posCounter++;
    customSentenceSelect[i].move(tempX);
  }
  for (let i = 0; i < destinations.length; i++) {
    destinations[i].move(null, windowHeight - 300);
  };
  nav[6].move(windowWidth / 2 + 10, 60 * 15);
  nav[7].move(windowWidth / 2 - 320, 60 * 15);
  nav[8].move(10, windowHeight - 65);
  nav[9].move(windowWidth - 290, windowHeight - 60);
  nav[10].move((windowWidth / 2) - 330, 200);
  nav[11].move((windowWidth / 2) - 330, 400);
  nav[12].move((windowWidth / 2) - 330, 600);
  customSentenceToggle[0].move(windowWidth / 2 + 340, 100)
  customSentenceToggle[1].move(windowWidth / 2 + 340, 100 + 60)
  customSelection[0].move(windowWidth / 2 - 75, windowHeight - 100);
  checking[1].move(windowWidth / 2 - 100, windowHeight - 170);
  checking[2].move(windowWidth / 2 - 100, windowHeight - 170);



  for (let i = 0; i < filterSelect.length; i++) {
    filterSelect[i].move(windowWidth / 2 + 20, 100 + 60 * (i));
    posCounter++;
  }
  endScreen[0].move(windowWidth / 2 - 150, windowHeight / 2 + 280);
  info[1].move((windowWidth / 2) - 75, 10);
  posCounter = 0;
  tempX = 0;
  tempY = 0;
  for (let i = 0; i < moreFeedback.length; i++) {
    if (posCounter == 6) {
      posCounter = 0; //to reset the position of the buttons when the columns get to long
    };

    if (posCounter % 2 == 0) {
      tempX = (windowWidth / 2) - 905;
    };
    if (posCounter % 2 != 0) {
      tempX = (windowWidth / 2) + 5;
    };

    moreFeedback[i].move(tempX);
    posCounter++;
  };
  for (let i = 0; i < 9; i++) {
    pos = ((windowWidth / 2) - 100 * (9)) + (200 * i);
    sentenceButtons[i].move(pos, windowHeight - 300);
  };
};

function keyPressed() {
  typed = keyCode;
  keyUsed = 0;
};

function toggle(inp) {
  if (inp == 1) {
    inp = 0;
  } else {
    inp = 1;
  };
  return inp;
};

function splitSentence(inp) {
  let out = [];
  out = inp.split(" ");
  return (out);
};

function nextSentence() {
  //populate and set up sentences   
  wordStore = "";
  scoreStore = "";
  sentencePos++;
  stationSpeed = 0;
  capitalCount = 0;
  //score last sentence:
  i = 0;
  if (sentencePos > 0) {
    let temp = 0;
    while (i < sentenceLength) {
      if (words[i].correct == 1 && words[i].correctCapital == 1) {//if word correct
        scoreStore = scoreStore + "W";
        temp = i;
      } else {
        scoreStore = scoreStore + "L";
        temp = destinations[i].currentAns; //store current answer
      };
      i++;

      if (temp == 20) { //if nothing there
        wordStore = wordStore + "empty ";
      } else {
        wordStore = wordStore + words[temp].text + " ";

      };
    };
    finalQueue.push(wordStore.slice(0, -1));
    scoreQueue.push(scoreStore);
  };


  if (sentencePos < sentenceQueue.length) {//if there is another sentence
    gamestate1 = 4;
    sentence = splitSentence(sentenceQueue[sentencePos]);
    sentencePool = [];
    words = [];
    destinations = [];
    capitalLog = [];
    stasis = 0;
    attempts = 0;


    sentenceLength = sentence.length;
    for (let i = 0; i < sentenceLength + advancedPunctuation; i++) { //add extra box if advanced assembly is on
      let tempWord;
      let destination;
      let capital;
      if (i < sentenceLength) {
        if (sentence[i] == sentence[i].toLowerCase()) {
          capital = 0;
          capitalLog.push(0);
        } else {
          capital = 1;
          capitalLog.push(1);
        };
      };

      pos = ((windowWidth / 2) - 100 * (sentenceLength + advancedPunctuation)) + (200 * i);
      if (i < sentenceLength - 1) {
        tempWord = new word(windowWidth + 200, random(10, windowHeight - 400), i, sentence[i], 180, 90, Math.round(random(1, 4)), capital);//create objects for words
        destination = new tile(pos, windowHeight + 30, i, 180, 90);//create objects for word, destinations
      };
      if (i == sentenceLength - 1) {
        tempWord = new word(windowWidth + 200, random(10, windowHeight - 400), i, sentence[i].substring(0, sentence[i].length - advancedPunctuation), 180, 90, Math.round(random(1, 4)), capital); // if advanced assembled enabled, remove last character of last word (punctuation)...
        destination = new tile(pos, windowHeight + 30, i, 180, 90);
      };
      if (i == sentenceLength) {
        tempWord = new word(windowWidth + 200, random(10, windowHeight - 400), i, sentence[i - 1].slice(-1), 180, 90, 0, capital); //...and make it its own object
        destination = new tile(pos, windowHeight + 30, i, 180, 90);
      };
      destinations.push(destination);
      destinations[i].goTo(pos, windowHeight - 300, 100);

      words.push(tempWord);
      words[i].goTo(random(0, windowWidth - 200), random(10, windowHeight - 400), 100);
      if (advancedCapitals == 1) {
        words[i].deCapitalise();
      };


    };

    check = 0;
  } else {
    gamestate1 = 5;
  };

};

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

  customSentence = "";
  sentenceQueue = [];
  sentencePos = -1;
  scoreQueue = [];
  totalScore = 0;
  wordStore = "";
  scoreStore = "";
  finalQueue = [];
  moreFeedback = [];
  startButton[0].move((windowWidth / 2) - 250, (windowHeight / 2) - 180);
  capitalCount = 0;
};


function checkCapitals() {
  capitalCount = 0
  for (let i = 0; i < capitalLog.length; i++) {
    if (words[i].capital == capitalLog[i]) {
      words[i].correctCapital = 1;
      capitalCount++;
    } else {
      words[i].correctCapital = 0;

    };
  };

};


function autoSave() {
  currentSettings.font = fontNum;
  currentSettings.vol = muted;
  currentSettings.cap = advancedCapitals;
  currentSettings.punct = advancedPunctuation;
  currentSettings.amm = amountSelector[0].posNum;
  storeItem("settings", currentSettings);
};

function lengthInsertionSort(input) {
  for (let i = 1; i < input.length; i++) {
    key = input[i]
    let j = i - 1
    while (j >= 0 && input[j].length > key.length) {
      input[j + 1] = input[j]
      j--
    }
    input[j + 1] = key
  }
  return (input)
}

function initialiseButtons() {
  allSentences = []
  sentenceSelect = []
  let filterNum = 0
  for (let i = 0; i < filterSelect.length; i++) {
    if (filterSelect[i].option == 1) {
      filterNum++
    }
  }
  let inputNum = 0
  for (let i = 0; i < customSentenceToggle.length; i++) {
    if (customSentenceToggle[i].option == 1) {
      inputNum++
    }
  }
  for (i = 0; i < filterSelect.length; i++) {
    if ((filterSelect[i].option == 1 || filterNum == 0) && (customSentenceToggle[1].option == 1 || inputNum == 0)) {



      let tempLength;



      if (filters[3 + i * 2] == undefined) {
        tempLength = filteredSentences.length + 1;
      } else {
        tempLength = (filters[3 + i * 2] + 1)
      }
      for (let j = filters[1 + i * 2] + 1; j < tempLength; j++) {
        allSentences.push(filteredSentences[j - 1])
      };



    }
    if ((filterSelect[i].option == 1 || filterNum == 0) && (customSentenceToggle[0].option == 1 || inputNum == 0)) {
      for (let j = 0; j < customSentences.length; j++) {
        if (customSentences[j].substring(customSentences[j].lastIndexOf(" ") + 1) == filterSelect[i].tex) {
          allSentences.push(customSentences[j].substring(0, customSentences[j].lastIndexOf(" ")))

        }

      }
    }
  }
  console.log(allSentences)


  /*
    if (filterNum == 0) {
      filterNum = 0
      if (customSentenceToggle[0].option == 1) {
        filterNum++
        for (let i = 0; i < customSentences.length; i++) {
  
          allSentences.push(customSentences[i].substring(0, customSentences[i].lastIndexOf(" ")))
        }
      }
  
      if (customSentenceToggle[1].option == 1) {
        filterNum++
        for (let i = 0; i < newSentences.length; i++) {
          if (newSentences[i].substring(0, 1) != "#") { //filters begin with "#"
            tempSentence = [];
            tempSentence = newSentences[i].split(" ");
            if (tempSentence.length < 9) { //checks string is less than 9 words
              allSentences.push(newSentences[i]);
            };
          };
        };
      }
      if (filterNum == 0) {
        for (let i = 0; i < newSentences.length; i++) {
          if (newSentences[i].substring(0, 1) != "#") { //filters begin with "#"
            tempSentence = [];
            tempSentence = newSentences[i].split(" ");
            if (tempSentence.length < 9) { //checks string is less than 9 words
              allSentences.push(newSentences[i]);
            };
          };
        };
  
        for (let i = 0; i < customSentences.length; i++) {
  
  
  
          allSentences.push(customSentences[i].substring(0, customSentences[i].lastIndexOf(" ")))
        }
  
      }
    }
    */

  allSentences = lengthInsertionSort(allSentences)
  console.log(filteredSentences)
  //creating button objects for sentences:
  posCounter = 0
  for (let i = 0; i < allSentences.length; i++) {
    if (posCounter == 26) {
      posCounter = 0; //to reset the position of the buttons when the columns get to long
    };

    if (posCounter % 2 == 0) {
      tempX = (windowWidth / 2) - 630; //left Colum
      tempY = 100 + 60 * (posCounter / 2); //move down row
    };
    if (posCounter % 2 != 0) {
      tempX = (windowWidth / 2) - 320; //right colum
    };
    tempSentence = [];
    console.log(allSentences[i])
    tempSentence = allSentences[i].split(" ");
    let sentence0 = new optionSelect(tempX, tempY, 300, 50, tempSentence[0] + " " + tempSentence[1] + "...", 40, allSentences[i]);  //creates buttons for sentence selection

    sentenceSelect.push(sentence0);

    console.log(posCounter)
    posCounter++;
  };

}
