//Written by Oscar Hitchcock-Smith
//This is the code for the optionButton class inheriting from the button class. This is used in custom sentence selection for the punctuation.

class optionButton extends button {
    constructor(nX, nY, nW, nH, nDefault, nSize,nOptions) {
        super(nX, nY, nW, nH, nOptions[nDefault], nSize);
        this.option=nDefault;
        this.options=nOptions;
    }

    show() {
        //draws text on top of buttons
        this.ref();
        textAlign(CENTER);
        textSize(fontScale*this.size);

        strokeWeight(5);
        stroke(200, 200, 200);
        if (customColor != 1) {
          if (this.hoverCheck() != 1) {
            fill(255, 255, 255);
          } else {
            fill(222, 222, 222);
          };
    
        };
        rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 10);
        noStroke();
        fill(0);
        text(this.tex, (this.xLeft + (this.xWidth / 2)), this.yTop+this.yHeight/2+this.size/3.2);

    };

    next() {
      if (this.option<this.options.length-1){//if clicked cycle to next option
        this.option++;
        this.tex=this.options[this.option];
      } else {
        this.option=0;//if at end go to first option
        this.tex=this.options[this.option];
      };
    };

};

