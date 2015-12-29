/// <reference path="./Scripts/jquery-2.1.4.min.js" />

//canvas
var Canvas = function(id) {
    return document.getElementById(id);
};

//context
var Context = function(canvas) {
    return canvas.getContext("2d");
};

//sprite constructor
var Sprite = function(fileName) {
    this.image = null;
    this.pattern = null;
    this.RADIANS = Math.PI / 180;

    if (fileName) {
        this.image = new Image();
        this.image.src = fileName;
    } else {
        console.log("Unable to construct sprite " + fileName);
        return;
    }
}

//function to draw a sprite
var draw = function (context, sprite, x, y, w, h) {
    context.drawImage(sprite.image, x, y,
                      w == undefined ? sprite.image.width : w,
                      h == undefined ? sprite.image.height : h);
};

//function to draw a pattern of a sprite
var drawPattern = function (context, sprite, x, y, w, h) {
    var pattern = context.createPattern(sprite.image, "repeat");
    context.fillStyle = pattern;
    context.fillRect(x, y, w, h);
};

//function to draw rotated sprite
var rotate = function (context, sprite, x, y, angle, centerRotate) {
    context.save();
    context.translate(x, y);
    context.rotate(angle * sprite.RADIANS);
    context.drawImage(sprite.image,
                      centerRotate ? -(sprite.image.width / 2) : sprite.image.width,
                      centerRotate ? -(sprite.image.height / 2) : sprite.image.height);
    context.restore();
};

$(document).ready(function() {

    //initialize
    var canvas = new Canvas("canvas");
    var context = new Context(canvas);

    var WALL = "./imgs/wall.png";
    var CRATE = "./imgs/crate.png";

    var wall = new Sprite(WALL);
    var crate = new Sprite(CRATE);
    var angle = 0;

    setInterval(function () {

        //bg
        context.beginPath();
        context.rect(0, 0, 640, 480);
        context.fillStyle = "black";
        context.fill();

        draw(context, crate, 0, 0);
        draw(context, wall, 80, 80, 100, 100);
        drawPattern(context, wall, 160, 160, 256, 180);

        rotate(context, wall, 115, 210, angle += 4, true);

    }, 25);

});