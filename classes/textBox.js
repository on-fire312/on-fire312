//written by oscar
//this handles everything to do with things that need to be clicked (bar the words). eg:looks, location, and how to register clicks.
class textBox {
  constructor(nX, nY, nW, nH, nText, nSize) {
    // to construct button

    this.yTop = nY;
    this.xLeft = nX;
    this.yBottom = (this.yTop + this.yHeight);
    this.XRight = (this.xLeft + this.xWidth);

    this.xWidth = nW;
    this.yHeight = nH;
    this.tex = nText;
    this.size = nSize;

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
  move(nX, nY) {
    if (nX != null) {
      this.xLeft = nX;
    }
    if (nY != null) {
      this.yTop = nY;
    }

    this.ref();
  }
  changeText(nText) {
    this.tex = nText;
  }
  ref() {
    this.yBottom = (this.yTop + this.yHeight);
    this.XRight = (this.xLeft + this.xWidth);
  }

}


