class optionSelect extends button {
  constructor(nX, nY, nW, nH, nText, nSize) {
    super(nX, nY, nW, nH, nText, nSize)
    this.option = 0
  }

  toggleClickCheck() {
    //checks if mouse has been pressed then released over button
    this.ref();
    if (this.overpressed == 1 && mouseIsPressed == true) {
      this.overpressed = 0;
      this.option = toggle(this.option)
    } else {
      this.overpressed = 0;

    }
    if (mouseX <= this.XRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom && mouseIsPressed == false) {
      this.overpressed = 1;
    }
  }




}