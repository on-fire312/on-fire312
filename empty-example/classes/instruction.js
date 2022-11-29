class instruction {
    constructor(nX, nY, nW, nSize, nTitle, nInstructions) {
        this.xLeft = nX;
        this.yTop = nY;
        this.xWidth = nW;
        this.size = nSize;
        this.title = nTitle;
        this.instructions = nInstructions;
        this.yHeight = nSize * 1.2 * (nInstructions.length + 3);//height is determined by num of lines with multiplier to make space between lines. extra space also given for title
        this.yBottom = (this.yTop + this.yHeight);
        this.xRight = (this.xLeft + this.xWidth);
    };

    show() {
        this.ref();
        textAlign(CENTER);
        

        strokeWeight(5);
        stroke(200, 200, 200);

        fill(255, 255, 255);
        rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 10);
        noStroke();
        fill(0);
        textSize(fontScale*this.size*2);
        text(this.title, (this.xLeft + (this.xWidth / 2)), this.yTop+this.size*2);//draw title
        textSize(fontScale*this.size);
        for (let i=0;i<this.instructions.length;i++){
            text(this.instructions[i], (this.xLeft + (this.xWidth / 2)), this.yTop+this.size*(4+i*1.2));//draw rest of text
        };
    };
    move(nX, nY) {
        if (nX != null) {
            this.xLeft = nX;
        };
        if (nY != null) {
            this.yTop = nY;
        };
    }
    ref() {
        this.yBottom = (this.yTop + this.yHeight);
        this.xRight = (this.xLeft + this.xWidth);
    };
};