//Written by Oscar Hitchcock-Smith
//This is the code for the feedback class. this is used the the final screen of the game to display information about all the sentences.
class feedback {
    constructor(nX, nY, nCurrent, nCorrect, nScore, num) {
        this.xLeft = nX;
        this.yTop = nY;
        this.current = nCurrent;
        this.correct = nCorrect;
        this.score = [];
        this.totalScore = 0;
        for (let i = 0; i < nScore.length; i++) {
            this.score.push(nScore.charAt(i));//if word is correct
            if (this.score[i] == "W") {
                this.totalScore++;
            };

        };

        this.currentSentence = splitSentence(nCurrent);
        this.correctSentence = splitSentence(nCorrect);

        this.spriteNum = num;


        this.xWidth = 900;
        this.matching = 0;
        this.setup = 0;

    }
    checkMatch() {
        if (this.correct == this.current) {
            this.matching = 1;
        };
    };

    show() {
        fill(255, 255, 255);
        if (this.setup == 0) {

            this.checkMatch();

            this.setup = 1;
        };
        strokeWeight(5);
        stroke(200, 200, 200);
        rect(this.xLeft, this.yTop, this.xWidth, 200, 10);
        fill(0);
        noStroke();
        textAlign(CENTER);
        textSize(fontScale*30);
        let pos;


        textSize(fontScale*40);
        textStyle(BOLD);
        text("Qu " + (this.spriteNum + 1), this.xLeft + 60, this.yTop + 50);
        text(this.totalScore + "/" + this.score.length, this.xLeft + this.xWidth - 60, this.yTop + 50);
        textSize(fontScale*30);
        textStyle(NORMAL);
        for (let i = 0; i < this.currentSentence.length; i++) {
            pos = 70 + this.xLeft + ((this.xWidth - 140) / (this.currentSentence.length - 1)) * i;
            fill(0);
            text(this.correctSentence[i], pos, this.yTop + 150);
            if (this.score[i] == "W") {//if word is correct
                fill(0, 150, 0);
            } else {
                fill(150, 0, 0);
            };
            text(this.currentSentence[i], pos, this.yTop + 100);

        };
    };

    move(nX, nY) {
        if (nX != null) {
            this.xLeft = nX;
        };
        if (nY != null) {
            this.yTop = nY;
        };
    };
};