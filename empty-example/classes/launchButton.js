//Written by Oscar Hitchcock-Smith
//This is the code for the button class, inheriting from the text box class, this contains al the code needed for the display and behavior of almost all intractable objects in game.
class launchButton extends button {
    constructor(nX, nY, nW, nText, nSize, nGreen) {
        // to construct button
        let nH = nW
        super(nX, nY, nW, nH, nText, nSize);
        this.overpressed = 0;
        this.green = nGreen
    };

    show() {
        //draws text on top of buttons
        this.ref();
        textAlign(CENTER);
        textSize(fontScale*this.size * canvasRatio);

        strokeWeight(5);
        stroke(200, 200, 200);

        if (customColor != 1) {
            if (this.hoverCheck() != 1) {
                if (this.green==1){
                    fill(0, 200, 0);
                } else {
                    fill(200, 0, 0);
                }
            } else {
                if (this.green==1){
                    fill(10, 255, 10);
                } else {
                    fill(255, 10, 10);
                }
            };

        };
        circle(this.xLeft + this.xWidth / 2, this.yTop + this.yHeight / 2, this.xWidth)

        noStroke();
        if (this.green==1){
            fill(0);
        } else {
            fill(255);
        }
        
        text(this.tex, (this.xLeft + (this.xWidth / 2)), this.yTop + this.yHeight / 2 + this.size / 3.2);
    };


}
