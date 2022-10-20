class slider {
    constructor(nX, nY, nText, nPosTotal, DefaultPos) {
        this.yTop = nY;
        this.xLeft = nX;
        this.tex = nText
        this.xWidth = 300
        this.yHeight = 75
        this.yBottom = this.yTop + this.yHeight
        this.xRight = this.xLeft + this.xWidth
        this.posTotal = nPosTotal
        this.posNum = DefaultPos
        this.posOptions = []
        let i = 0
        while (i < this.posTotal) {
            this.posOptions.push(this.xLeft + 40 + (220 / this.posTotal) * i)
            i++
        }
        this.pos = this.xLeft + 40 + (220 / this.posTotal) * this.posNum
        this.overpressed = 0


    }
    show() {

        strokeWeight(5);
        stroke(200, 200, 200);
        fill(255, 255, 255)
        rect(this.xLeft, this.yTop, 300, 75, 5)
        ellipse(this.pos, this.yTop + 50, 30)
        textSize(25)
        fill(0, 0, 0)
        noStroke()
        text(this.tex, this.xLeft + this.xWidth / 2, this.yTop + 25)
        text(this.posNum + 1, this.pos, this.yTop + 60)
        if (this.clickCheck() == 1) {

            this.update()
        }

    }

    update() {
        i = 0
        let found = 0
        let temp0 = 9999
        let temp1 = 9999
        while (i <= this.posTotal && found == 0) {
            if (mouseX > this.xLeft + 40 + (220 / this.posTotal) * i) {
                temp0 = Math.abs(mouseX - (this.xLeft + 40 + (220 / this.posTotal) * i))
            } else {
                temp0 = Math.abs((this.xLeft + 40 + (220 / this.posTotal) * i) - mouseX)
            }
            if (temp0 < temp1) {
                temp1 = temp0
                i++
            } else {
                found = 1
                i--
            }


        }
        if (found == 0) {
            i--
        }
        this.posNum = i
        this.pos = this.xLeft + 40 + (220 / this.posTotal) * this.posNum
    }

    setVal(inp){
        this.posNum = inp
        this.pos = this.xLeft + 40 + (220 / this.posTotal) * this.posNum
    }


    clickCheck() {
        //checks if mouse is being held on button
        this.ref();

        if (this.overpressed == 1 && mouseIsPressed == true) {

            return (1);
        } else {
            this.overpressed = 0;

        }
        if (mouseX <= this.xRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom && mouseIsPressed == false) {
            this.overpressed = 1;
        }
        return (0);

    }

    ref() {
        this.yBottom = (this.yTop + this.yHeight);
        this.xRight = (this.xLeft + this.xWidth);
    }

    move(nX, nY) {
        if (nX != null) {
          this.xLeft = nX;
        }
        if (nY != null) {
          this.yTop = nY;
        }
    
        this.ref();
      }
}