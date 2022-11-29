//Written by Oscar Hitchcock-Smith
//this is the code for the word class, it handles everything to do with the draggable words. their movement, coordinates, collision and marking.
class word {
  constructor(nX, nY, num, nText, nW, nH, nDetails, nCapital) {
    //creates objects
    this.spriteNum = num; //sets identifier to refer to itself and others
    //sets coordinates
    this.yTop = nY;
    this.xLeft = nX;

    this.xWidth = nW;
    this.yHeight = nH;
    this.yBottom = (this.yTop + this.yHeight);
    this.xRight = (this.xLeft + this.xWidth);
    //used for clicking
    this.overpressed = 0;
    //dont think this is needed any more, if it is im working of phasing it out
    this.xMid = (this.xLeft + this.xRight) / 2;
    this.yMid = (this.yBottom + this.yTop) / 2;
    //checks and moves in case of overlap
    //booleans for what side has overlapped
    this.lCross = 0;
    this.rCross = 0;
    this.tCross = 0;
    this.bCross = 0;
    //values to check how much it has overlapped
    this.lOver = this.xWidth;
    this.rOver = this.xWidth;
    this.tOver = this.yHeight;
    this.bOver = this.yHeight;
    this.half = 0;
    this.clicked = 0;
    this.text = nText; //the variable for the text

    this.moved = 1; //added to remove bug where words think they are in the correct place when they haven't been moved yet
    this.correct = 0;
    this.incorrect = 0
    this.details = nDetails;
    this.xVol;
    this.yVol;
    this.docOffset = -25;
    this.lightG = 20;
    this.steps = 0;
    this.xStep = 0;
    this.yStep = 0;
    this.collision = 1;
    this.capitalised = nCapital;
    this.correctCapital = 1;
    if (advancedCapitals == 1) {
      this.capital = 0
    } else {
      this.capital = nCapital;
    };
    console.log(this.capital);
  };
  fullScreenMove(nX, nY) {
    if (nX != null) {
      this.xLeft = nX;
    };
    if (nY != null) {
      this.yTop = nY;
    };
    this.ref();
  };
  show() {
    // draws object
    strokeWeight(5);
    if (this.spriteNum == words.length - 1) {
      stroke(200, 200, 200);
      fill(255, 255, 255);
      strokeWeight(2.5);
      quad(this.xRight + 20 + this.docOffset, this.yTop + 25, this.xRight + this.docOffset, this.yTop + 35, this.xRight + this.docOffset, this.yBottom - 35, this.xRight + 20 + this.docOffset, this.yBottom - 25);
    } else {
      stroke(200, 200, 200);
      fill(255, 255, 255);
      strokeWeight(2.5);
      quad(this.xRight + this.docOffset, this.yTop + 25, this.xRight + 20 + this.docOffset, this.yTop + 35, this.xRight + 20 + this.docOffset, this.yBottom - 35, this.xRight + this.docOffset, this.yBottom - 25);
      fill(20, this.lightG, 20);
      strokeWeight(1);
      ellipse(this.xRight + 10 + this.docOffset, this.yTop + 35, 5);
      fill(110);
      noStroke();

      rect(this.xRight + 20 - 2.5 + this.docOffset, this.yTop + 32.5, 5, (this.yBottom - 35) - (this.yTop + 35) + 5);
    };

    fill(255, 255, 255);
    stroke(200, 200, 200);
    strokeWeight(5);
    rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 30);
    strokeWeight(2.5);

    noStroke();
    fill(110);
    rect(this.xLeft - 5, this.yTop + 20, 5, this.yHeight - 40);
    rect(this.xRight, this.yTop + 20, 5, this.yHeight - 40);

    fill(0, 0, 255);
    strokeWeight(2);
    stroke(0, 0, 150);
    if (this.details == 1) {

      stroke(200, 200, 200);
      rect(this.xLeft + this.xWidth / 2 - 2, this.yTop - 50, 1, 47);
      rect(this.xLeft + this.xWidth / 2 - 2, this.yBottom + 3, 1, 47);
      fill(0, 0, 255);
      strokeWeight(2);
      stroke(0, 0, 150);
      rect(this.xLeft + this.xWidth / 4, this.yTop - 50, this.xWidth / 2, 40, 10);
      rect(this.xLeft + this.xWidth / 4, this.yTop - 30, this.xWidth / 2, 1);
      rect(this.xLeft + this.xWidth / 2 - 2, this.yTop - 50, 1, 40);
      rect(this.xLeft + this.xWidth * 3 / 8 - 2, this.yTop - 50, 1, 40);
      rect(this.xLeft + this.xWidth * 5 / 8 - 2, this.yTop - 50, 1, 40);

      rect(this.xLeft + this.xWidth / 4, this.yBottom + 10, this.xWidth / 2, 40, 10);
      rect(this.xLeft + this.xWidth / 4, this.yBottom + 30, this.xWidth / 2, 1);
      rect(this.xLeft + this.xWidth / 2 - 2, this.yBottom + 10, 1, 40);
      rect(this.xLeft + this.xWidth * 3 / 8 - 2, this.yBottom + 10, 1, 40);
      rect(this.xLeft + this.xWidth * 5 / 8 - 2, this.yBottom + 10, 1, 40);

    };
    if (this.details == 2) {
      strokeWeight(2);
      stroke(200, 200, 200);
      fill(255, 255, 255);

      rect(this.xLeft + this.xWidth / 2 - 2, this.yTop - 30, 1, 27);
      rect(this.xLeft + this.xWidth / 2 - 2, this.yBottom, 1, 27);
      rect(this.xLeft + 25 / 2 + this.xWidth / 2 - 2, this.yBottom + 27, 5, 1);
      ellipse(this.xLeft + this.xWidth / 2 - 2, this.yTop - 30, 25);
      arc(this.xLeft + this.xWidth / 2 + 25 / 2 - 3, this.yBottom + 27, 25, 25, PI / 2, PI * 3 / 2);
      noStroke();
      fill(255, 255, 0);
      ellipse(this.xLeft + this.xWidth / 2 - 2, this.yTop - 30, 10);
      ellipse(this.xLeft + 25 / 2 + this.xWidth / 2 + 8, this.yBottom + 27, 10);
    };
    if (this.details == 3) {
      strokeWeight(0);
      stroke(200, 200, 200);
      fill(100);
      rect(this.xLeft + 30, this.yTop - 15, 30, 15);
      rect(this.xRight - 60, this.yBottom, 30, 15);
      rect(this.xLeft + 30, this.yBottom, 30, 15);
      rect(this.xRight - 60, this.yTop - 15, 30, 15);
      rect(this.xMid - 15, this.yTop - 15, 30, 15);
      rect(this.xMid - 15, this.yBottom, 30, 15);
      fill(200);
      ellipse(this.xLeft + 45, this.yTop - 15, 25);
      ellipse(this.xRight - 45, this.yBottom + 15, 25);
      ellipse(this.xLeft + 45, this.yBottom + 15, 25);
      ellipse(this.xRight - 45, this.yTop - 15, 25);
      ellipse(this.xMid, this.yTop - 15, 25);
      ellipse(this.xMid, this.yBottom + 15, 25);
    };


    fill(0);
    strokeWeight(0);
    if ((attempts >= 4) && (gamestate1 < 4.2)) {
      if (this.correctCapital == 1) {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      };
    } else {
      fill(0, 0, 0);
    }
    stroke(255);
    textSize(fontScale * 40);
    text(this.text, (this.xMid), this.yTop + this.yHeight / 2 + 40 / 2);

  };
  move() {
    if (this.incorrect == 1) {
      this.xVol = random(5, -5);
      this.yVol = random(-10, -5);
      this.incorrect = 0;
    }
    if (this.correct == 1 || attempts > 3) {//if correct, show docking ports to connect stations
      if (this.docOffset != 0) {
        this.docOffset++;
      };
      if (frameCycle == 20) {
        this.lightG = 20;
      };
      if (frameCycle == 1) {
        this.lightG = 255;
      };
    };
    // anything to do with movement
    if (attempts < 3) {
      if ((this.xVol > 0.2 && this.xVol < 0.2) || this.yVol < 0) {
        this.slide(this.xVol, this.yVol);
        if (this.xVol > 0) {
          this.xVol = this.xVol - random(0.007, 0.07);
        };
        if (this.xVol < 0) {
          this.xVol = this.xVol + random(0.007, 0.07);
        };
        this.yVol = this.yVol + random(0.017, 0.17);

      };
    };

    if (this.correct == 0 && stasis == 0) {
      //checks if mouse is over, then mouse is pressed(not before)
      if (this.overpressed == 1 && mouseIsPressed == true) {

        //moves sprite to mouse
        this.xLeft = mouseX - (this.xWidth / 2);
        this.yTop = mouseY - this.yHeight / 2;
        this.clicked = 1;
        this.ref();
        this.moved = 0;
        //checks if overlapped, if so, reverses movement.
        for (let j = 0; j < words.length; j++) {
          if (this.spriteNum != j) {
            if (this.overlap(this.spriteNum, j) == 1) {
              this.collide(this.spriteNum, j);
            };



          };
        };
        this.ref();
      } else {
        //cuts movement if mouse not over sprite
        this.overpressed = 0;

      };
      //checks if mouse is over object
      if (mouseX <= this.xRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom && mouseIsPressed == false) {
        this.overpressed = 1;
        //if any objects overlap this should put them correct
        for (let j = 0; j < words.length; j++) {
          if (this.spriteNum != j) {
            if (this.overlap(this.spriteNum, j) == 1);
            this.collide(this.spriteNum, j);

            this.ref();
          };
          if (this.overlapTile(this.spriteNum, j) == 1) {
            if (this.clicked == 1) {
              this.yTop = destinations[j].yTop;
              this.xLeft = destinations[j].xLeft;
              this.ref();
            };
          };
        };
      };
    };

    if (this.correct == 0 && this.moved == 1) {

      for (let j = 0; j < words.length; j++) {
        if (this.spriteNum != j) {
          if (this.overlap(this.spriteNum, j) == 1) {

            this.collide(this.spriteNum, j);
          };
        };
      };
      this.ref();
    };
    if (this.steps > 0) {
      this.xLeft = this.xLeft + this.xStep;
      this.yTop = this.yTop + this.yStep;
      this.steps = this.steps - 1;
      this.ref();
    } else {
      if (this.collision == 0) {
        this.collision = 1;
      };
    };
  };
  ref() {
    //updates coordinates 
    this.yBottom = (this.yTop + this.yHeight);
    this.xRight = (this.xLeft + this.xWidth);
    this.xMid = (this.xLeft + this.xRight) / 2;
    this.yMid = (this.yBottom + this.yTop) / 2;


  };
  overlapTile(self, other) {
    //checks and moves in case of overlap
    //boolians for what side has overlapped
    this.lCross = 0;
    this.rCross = 0;
    this.tCross = 0;
    this.bCross = 0;
    //values to check how much it has overlapped
    this.lOver = this.xWidth + 1;
    this.rOver = this.xWidth + 1;
    this.tOver = this.yHeight + 1;
    this.bOver = this.yHeight + 1;
    this.half = 0;

    //checks if each side has overlapped and by how much
    if (words[self].xLeft <= destinations[other].xLeft) {
      if (destinations[other].xLeft - words[self].xLeft < this.xWidth) {

        if (destinations[self].xLeft - words[self].xLeft != 0 && this.clicked == 1) {

        };
        this.lCross = 1;
        this.lOver = destinations[other].xLeft - words[self].xLeft;
      }

      else {
        this.lCross = 0;
        this.lOver = this.xWidth;
      };
    } else {
      this.lCross = 0;
      this.lOver = this.xWidth;
    };
    if (words[self].yTop <= destinations[other].yTop) {
      if (destinations[other].yTop - words[self].yTop < this.yHeight) {
        this.tCross = 1;
        this.tOver = destinations[other].yTop - words[self].yTop;
      }

      else {
        this.tCross = 0;
        this.tOver = this.yHeight;
      };
    } else {
      this.tCross = 0;
      this.tOver = this.yHeight;
    };
    if (words[self].yBottom >= destinations[other].yBottom) {
      if (words[self].yBottom - destinations[other].yBottom < this.yHeight) {
        this.bCross = 1;
        this.bOver = words[self].yBottom - destinations[other].yBottom;
      }

      else {
        this.bCross = 0;
        this.bOver = this.yHeight;
      };
    } else {
      this.bCross = 0;
      this.bOver = this.yHeight;
    };
    if (words[self].xRight >= destinations[other].xRight) {
      if (words[self].xRight - destinations[other].xRight < this.xWidth) {
        this.rCross = 1;
        this.rOver = words[self].xRight - destinations[other].xRight;
      }

      else {
        this.rCross = 0;
        this.rOver = this.xWidth;
      };
    } else {
      this.rCross = 0;
      this.rOver = this.xWidth;
    };
    //if 2+ sides this overlap...
    //changed to stop miss detections
    if ((this.rCross + this.tCross == 2 || this.tCross + this.lCross == 2 || this.bCross + this.lCross == 2 || this.bCross + this.rCross == 2)) {

      return (1);

    } else {
      return (0);
    };
  }
  overlap(self, other) {
    //checks and moves in case of overlap
    //boolians for what side has overlapped
    this.lCross = 0;
    this.rCross = 0;
    this.tCross = 0;
    this.bCross = 0;
    //values to check how much it has overlapped
    this.lOver = this.xWidth;
    this.rOver = this.xWidth;
    this.tOver = this.yHeight;
    this.bOver = this.yHeight;
    this.half = 0;

    //checks if each side has overlapped and by how much
    if (words[self].xLeft <= words[other].xLeft) {
      if (words[other].xLeft - words[self].xLeft < this.xWidth) {
        this.lCross = 1;
        this.lOver = words[other].xLeft - words[self].xLeft;
      }

      else {
        this.lCross = 0;
        this.lOver = this.xWidth;
      };
    } else {
      this.lCross = 0;
      this.lOver = this.xWidth;
    };
    if (words[self].yTop <= words[other].yTop) {
      if (words[other].yTop - words[self].yTop < this.yHeight) {
        this.tCross = 1;
        this.tOver = words[other].yTop - words[self].yTop;
      }

      else {
        this.tCross = 0;
        this.tOver = this.yHeight;
      };
    } else {
      this.tCross = 0;
      this.tOver = this.yHeight;
    };
    if (words[self].yBottom >= words[other].yBottom) {
      if (words[self].yBottom - words[other].yBottom < this.yHeight) {
        this.bCross = 1;
        this.bOver = words[self].yBottom - words[other].yBottom;
      }

      else {
        this.bCross = 0;
        this.bOver = this.yHeight;
      };
    } else {
      this.bCross = 0;
      this.bOver = this.yHeight;
    };
    if (words[self].xRight >= words[other].xRight) {
      if (words[self].xRight - words[other].xRight < this.xWidth) {
        this.rCross = 1;
        this.rOver = words[self].xRight - words[other].xRight;
      }

      else {
        this.rCross = 0;
        this.rOver = this.xWidth;
      };
    } else {
      this.rCross = 0;
      this.rOver = this.xWidth;
    };
    //if 2+ sides this overlap...
    if ((this.rCross + this.lCross + this.tCross + this.bCross >= 2)) {
      return (1);

    };
  };
  collide() {
    if (this.collision == 1) {
      //on the side of intersection...
      if (this.tOver < this.yHeight && this.tOver < this.bOver && this.tOver < this.lOver && this.tOver < this.rOver && this.half == 0) {
        //move to the perpendicular side that it is closer to.
        if (this.lOver > this.rOver) {
          this.xLeft = (this.xLeft + (this.xWidth - this.rOver));
        } else {
          this.xLeft = this.xLeft - (this.xWidth - this.lOver);
        };
        this.half = 1;
      };
      if (this.bOver < this.yHeight && this.bOver < this.tOver && this.bOver < this.lOver && this.bOver < this.rOver && this.half == 0) {
        if (this.lOver > this.rOver) {
          this.xLeft = (this.xLeft + (this.xWidth - this.rOver));
        } else {
          this.xLeft = this.xLeft - (this.xWidth - this.lOver);
        };
        this.half = 1;
      };
      if (this.lOver < this.xWidth && this.lOver < this.tOver && this.lOver < this.bOver && this.lOver < this.rOver && this.half == 0) {
        if (this.tOver < this.bOver) {
          this.yTop = this.yTop - (this.yHeight - this.tOver);
        } else {
          this.yTop = this.yTop + (this.yHeight - this.bOver);
        };
        this.half = 1;
      };
      if (this.rOver < this.xWidth && this.rOver < this.tOver && this.rOver < this.lOver && this.rOver < this.bOver && this.half == 0) {
        if (this.tOver < this.bOver) {
          this.yTop = this.yTop - (this.yHeight - this.tOver);
        } else {
          this.yTop = this.yTop + (this.yHeight - this.bOver);
        };
        this.half = 1;
      };

      //just in case it overlaps equally over both sides
      if (this.bOver == this.lOver) {
        this.yTop = this.yTop + (this.yHeight - this.bOver);
        this.xLeft = this.xLeft - (this.xWidth - this.lOver);
      };
      if (this.bOver == this.rOver) {
        this.yTop = this.yTop + (this.yHeight - this.bOver);
        this.xLeft = (this.xLeft + (this.xWidth - this.rOver));
      };
      if (this.tOver == this.rOver) {
        this.yTop = this.yTop - (this.yHeight - this.tOver);
        this.xLeft = (this.xLeft + (this.xWidth - this.rOver));
      };
      if (this.tOver == this.lOver) {
        this.yTop = this.yTop - (this.yHeight - this.tOver);
        this.xLeft = this.xLeft - (this.xWidth - this.lOver);
      };
      if (this.tOver == 0 && this.bOver == 0) {
        if (this.lOver < this.xWidth) {
          this.xLeft = this.xLeft - (this.xWidth - this.lOver);
        }
        else if (this.rOver < this.xWidth) {
          this.xLeft = (this.xLeft + (this.xWidth - this.rOver));
        };
      };
      if (this.lOver == 0 && this.rOver == 0) {
        if (this.tOver < this.yHeight) {
          this.yTop = this.yTop - (this.yHeight - this.tOver);
        }
        else if (this.bOver < this.yHeight) {
          this.yTop = this.yTop + (this.yHeight - this.bOver);
        };
      };
    };

  };

  teleport(nX, nY) {
    //go to set location
    this.xLeft = nX;
    this.yTop = nY;
    for (let j = 0; j < words.length; j++) {
      if (this.spriteNum != j) {
        if (this.overlap(this.spriteNum, j) == 1) {
          this.collide(this.spriteNum, j);
        };



      };
    };
    this.ref();
  };

  slide(movX, movY) {

    //move by set amount
    this.xLeft = this.xLeft + movX;
    this.yTop = this.yTop + movY;
    for (let j = 0; j < words.length; j++) {
      if (this.spriteNum != j) {
        if (this.overlap(this.spriteNum, j) == 1) {

          this.collide(this.spriteNum, j);
        };
      };
    };
    this.ref();
  }
  ;
  goTo(destinationX, destinationY, steps) {
    this.steps = steps;
    this.xStep = (destinationX - this.xLeft) / this.steps;
    this.yStep = (destinationY - this.yTop) / this.steps;
    this.collision = 0;
  };

  checkCorrect() {
    //checks if word is in the correct position
    if (this.overlapTile(this.spriteNum, this.spriteNum) == 1) {

      if (this.moved == 0) {




        this.correct = 1;
        check++;

        return (1);
      };
    } else {
      let z = 0;
      while (z < words.length) {
        if (z != this.spriteNum) {
          if (this.overlapTile(this.spriteNum, z) == 1) {
            if (attempts < 3) {
              this.incorrect = 1;
            };
            z = words.length;

          };
        };
        z++;
      };
    };
  };

  singleClickCheck() {
    //checks if mouse has been pressed then released over button
    this.ref();
    if (this.overpressed == 1 && mouseIsPressed == true) {
      this.overpressed = 0;
      return (1);
    } else {
      this.overpressed = 0;

    };
    if (mouseX <= this.xRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom && mouseIsPressed == false) {
      this.overpressed = 1;
    }
    return (0);

  };

  capitalise() {

    //capitalize first letter
    this.capital = this.text.substring(0, 1);
    this.capital = this.capital.toUpperCase();
    this.text = this.capital + this.text.slice(1);
    this.capital = 1;
  }
  deCapitalise() {
    this.text = this.text.toLowerCase();
    this.capital = 0;
  }
  toggleCapitalise() {
    if (this.capital == 0) {
      this.capitalise();
    } else {
      this.deCapitalise();
    };
  };
};