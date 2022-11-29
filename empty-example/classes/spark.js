//Written by Oscar Hitchcock-Smith
//This is the code for the spark class, used to create the sparks from the rocket as it leaves the screen.
class spark {
    constructor(nX, nY, nSize, nDirection) {
        this.xSpawn = nX;
        this.ySpawn = nY;
        this.spawnSize = 0;
        this.xVel = 0;
        this.yVel = 0;
        this.xMid = nX;
        this.yMid = nY;
        this.size = this.spawnSize;
        this.maxSize = nSize;
        this.direction = nDirection;
    };

    show() {
        this.ref();
        this.move();
        fill(255, random(50, 200), 0);
        circle(this.xMid, this.yMid, this.size);
    };

    move() {
        this.size--; //spark gets smaller each frame
        this.xMid = this.xMid + this.xVel;
        this.yMid = this.yMid + this.yVel;
    };
    ref() {
        if (this.size <= 0) {// if spark has disappeared
            if (this.direction == "RIGHT") {
                this.xVel = random(10, 50);
                this.yVel = random(10, -10);
            };
            if (this.direction == "LEFT") {
                this.xVel = random(-10, -50);
                this.yVel = random(10, -10);
            };
            if (this.direction == "UP") {
                this.xVel = random(10, -10);
                this.yVel = random(-10, -50);
            };
            if (this.direction == "DOWN") {
                this.xVel = random(10, -10);
                this.yVel = random(10, 50);
            };

            this.size = random(2, this.maxSize);
            this.xMid = this.xSpawn;
            this.yMid = this.ySpawn;
        };
    };

    changeSize(nSize) {
        this.size = nSize;

    };
    teleport(nX, nY) {
        this.xSpawn = nX;
        this.ySpawn = nY
    };
};