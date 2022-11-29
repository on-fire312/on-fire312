//Written by Oscar Hitchcock-Smith
//This is the code for the optionSelect class inheriting from the button class. This allows for buttons to be toggled. this is in a different class due to its potential to bug with the other click check methods.
class optionSelect extends button {
  constructor(nX, nY, nW, nH, nText, nSize, nContence) {
    super(nX, nY, nW, nH, nText, nSize);
    this.option = 0;
    this.contence = nContence;
  };



  showTag() {
    if (this.hoverCheck() == 1) {

      if (customColor != 1) {
        if (this.hoverCheck() != 1) {
          fill(255, 255, 255);
        } else {
          fill(222, 222, 222);
        };

      };
      textSize(fontScale * this.size);
      let contenceWidth = textWidth(this.contence);//size based on width of text
      strokeWeight(1);
      stroke(0);
      rect(mouseX, mouseY, contenceWidth, this.size * 1.25);
      fill(0);
      noStroke();
      text(this.contence, mouseX + contenceWidth / 2, mouseY + this.size);
    }
  }

  toggleClickCheck() {
    //checks if mouse has been pressed then released over button
    this.ref();
    if (this.overpressed == 1 && mouseIsPressed == true) {
      this.overpressed = 0;
      this.option = toggle(this.option);
      return (1)
    } else {
      this.overpressed = 0;

    };
    if (mouseX <= this.xRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom && mouseIsPressed == false) {
      this.overpressed = 1;
    };
    return (0)
  };






}