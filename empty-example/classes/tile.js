//written by oscar
// this handels everything that goes on with the destination of the words. specifically, location, looks and visual marking.
class tile {
  constructor(nX, nY, num, nW, nH) {
    //creates objects
    this.spriteNum = num; //sets identifier to refer to itself and others
    //sets coordinates
    this.yTop = nY;
    this.xLeft = nX;
    this.xWidth = nW;
    this.yHeight = nH;
    this.yBottom = (this.yTop + this.yHeight);
    this.xRight = (this.xLeft + this.yHeight);
    this.correct = 0;
    this.currentAns = 20
    this.steps=0
    this.xStep=0
    this.yStep=0
    
  }
  ref(checkStatus) {
    this.yBottom = (this.yTop + this.yHeight);
    this.xRight = (this.xLeft + this.xWidth);
    this.check = checkStatus;
  }
  move(nX, nY) {
    for (i = 0; i < words.length; i++) {
      if (words[this.spriteNum].overlapTile(i, this.spriteNum) == 1) {
        words[i].fullScreenMove(nX, nY)
      }
    }
    if (nX != null) {
      this.xLeft = nX;
    }
    if (nY != null) {
      this.yTop = nY;
    }

    this.ref();


  }

  getCurrentAns() {
    let i = 0
    let found = 0
    while (i < words.length && found == 0) {
      if (words[i].overlapTile(i, this.spriteNum) == 1) {
        this.currentAns = i
        found = 1
      }
      i++
    }
    return (this.currentAns)
  }
  show() {
    // draws object
    if (this.steps>0){
      this.xLeft=this.xLeft+this.xStep
      this.yTop=this.yTop+this.yStep
      this.steps=this.steps-1
      this.ref()
    }
    this.ref();
    fill(100)
    rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 30);

  }
  mark() {
    //draws text after being checked if it is correct
    if (this.correct == 1) {
      fill(0, 255, 0);
      textSize(15);

      quad((this.xLeft + this.xRight) / 2 - 20, this.yBottom + 30, (this.xLeft + this.xRight) / 2 - 15, this.yBottom + 25, (this.xLeft + this.xRight) / 2, this.yBottom + 40, (this.xLeft + this.xRight) / 2 - 5, this.yBottom + 45);
      quad((this.xLeft + this.xRight) / 2 - 5, this.yBottom + 45, (this.xLeft + this.xRight) / 2 - 10, this.yBottom + 40, (this.xLeft + this.xRight) / 2 + 20, this.yBottom + 10, (this.xLeft + this.xRight) / 2 + 25, this.yBottom + 15);
    }

    if (this.correct == 0 && stasis == 1) {
      fill(255, 0, 0);
      textSize(15);

      quad((this.xLeft + this.xRight) / 2 - 20, this.yBottom + 10, (this.xLeft + this.xRight) / 2 - 25, this.yBottom + 15, (this.xLeft + this.xRight) / 2 + 20, this.yBottom + 55, (this.xLeft + this.xRight) / 2 + 25, this.yBottom + 50);
      quad((this.xLeft + this.xRight) / 2 + 20, this.yBottom + 10, (this.xLeft + this.xRight) / 2 + 25, this.yBottom + 15, (this.xLeft + this.xRight) / 2 - 20, this.yBottom + 55, (this.xLeft + this.xRight) / 2 - 25, this.yBottom + 50);

    }
  }

  slide(movX, movY) {
    
    //move by set amount
    this.xLeft = this.xLeft + movX;
    this.yTop = this.yTop + movY;
    
    this.ref()
  }

  goTo(destinationX,destinationY,steps){
    this.steps=steps
    this.xStep=(destinationX-this.xLeft)/this.steps
    this.yStep=(destinationY-this.yTop)/this.steps

  }
}