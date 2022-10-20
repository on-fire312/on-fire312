
class punctuationButton extends button {
    constructor(nX, nY, nW, nH, nText, nSize) {
        super(nX, nY, nW, nH, nText, nSize)

    }

    show() {
        //draws text on top of buttons
        this.ref();
        textAlign(CENTER);
        textSize(this.size);

        strokeWeight(5);
        stroke(200, 200, 200);
        fill(255, 255, 255)
        rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 10);
        noStroke();
        fill(0);
        text(this.tex, (this.xLeft + (this.xWidth / 2)), this.yBottom - this.yHeight / 4);

    }

    next() {
        if (this.tex == ".") {
            this.tex = "?"
        } else {
            if (this.tex == "?") {
                this.tex = "!"
            } else {
                if (this.tex == "!") {
                    this.tex = "."
                }
            }
        }
    }

}

