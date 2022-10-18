let newChar
class inputButton extends button {
    constructor(nX, nY, num, nW, nH, nText, nSize) {
        super(nX, nY, nW, nH, nText, nSize)
        this.spriteNum = num
        this.takingInput = 0
        this.frameToggle = 1
        this.typed = 0
        this.capitalised = 0
        this.curserOn = 0
    }
    startInput() {
        this.takingInput = 1
        this.frameToggle = 0
        if (this.typed == 0) {
            this.tex = ""
            this.typed = 1
        }
    }
    show() {
        //draws text on top of buttons
        this.ref();
        textAlign(CENTER);
        textSize(this.size);
        this.takeInput()
        strokeWeight(5);
        stroke(200, 200, 200);
        if (this.takingInput == 0) {
            fill(255, 255, 255)
        } else {
            fill(200, 200, 200)
            if (this.curserOn) {
                if (this.tex.length == 1) {
                    this.capitalised = 0
                }
            } else {
                if (this.tex.length == 0) {
                    this.capitalised = 0
                }
            }
        }

        rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 10);
        noStroke();
        fill(0);
        text(this.tex, (this.xLeft + (this.xWidth / 2)), this.yBottom - this.yHeight / 4);

    }

    takeInput() {
        if (this.takingInput == 1) {
            if (frameCycle == 60) {
                this.changeText(this.tex + "|")
                this.curserOn = 1
                this.frameToggle = 1
            }
            if ((frameCycle == 90) && this.frameToggle == 1) {
                this.changeText(this.tex.slice(0, -1))
                this.curserOn = 0
            }
            if (keyUsed == 0) {
                if ((typed > 64 && typed < 91) || typed == 189 || typed == 188 || typed == 49) {
                    if (this.tex.length < 10) {
                        newChar = String.fromCharCode(typed)
                        newChar = newChar.toLowerCase()
                        if ((this.curserOn == 1)) {
                            this.changeText(this.tex.slice(0, -1))
                            this.changeText(this.tex + newChar)
                            this.changeText(this.tex + "|")
                        } else {
                            this.changeText(this.tex + newChar)
                        }
                    }
                    keyUsed = 1
                }
                if (typed == 8) {
                    if (this.curserOn == 1) {
                        this.changeText(this.tex.slice(0, -1))
                        this.changeText(this.tex.slice(0, -1))
                        this.changeText(this.tex + "|")
                    } else {
                        this.changeText(this.tex.slice(0, -1))
                    }
                    keyUsed = 1
                }
                if (typed == 9 || typed == 13) {
                    keyUsed = 1
                    this.endInput()
                    if (this.spriteNum < 7) {
                        sentenceButtons[this.spriteNum + 1].startInput()
                    }

                }
                if (typed == 16) {
                    keyUsed = 1
                    if ((this.curserOn == 1)) {
                        if (this.tex.length > 1) {
                            this.tex = this.capitalise(this.tex)
                        }
                    } else {
                        if (this.tex.length > 0) {
                            this.tex = this.capitalise(this.tex)
                        }
                    }
                }

            }
        }
    }

    toggleClickCheck() {
        if (this.clickCheck() == 1) {
            this.startInput()
        }
        if (this.overpressed == 0 && mouseIsPressed == true) {
            if (this.takingInput == 1 && (this.curserOn == 1)) {
                this.changeText(this.tex.slice(0, -1))
            }
            this.takingInput = 0

        }

    }
    endInput() {
        if (this.takingInput == 1) {
            if (this.curserOn == 1) {
                this.changeText(this.tex.slice(0, -1))
            }
        }
        this.takingInput = 0
    }
    capitalise(inp) {

        //capitalize first letter
        if (this.capitalised == 0) {
            let capital = inp.substring(0, 1);
            capital = capital.toUpperCase();
            inp = capital + inp.slice(1);
            this.capitalised = 1
        } else {
            inp = inp.toLowerCase()
            this.capitalised = 0
        }

        return inp
    }

}
