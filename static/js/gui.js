//---------------
// Adapted from https://bensonruan.com/handwritten-digit-recognition-with-tensorflow-js/
//---------------

//Variables
let model;
var canvasWidth = 150;
var canvasHeight = 150;
var canvasStrokeStyle = "white";
var canvasLineJoin = "round";
var canvasLineWidth = 10;
var canvasBackgroundColor = "black";
var canvasId = "canvas";
var clickX = new Array();
var clickY = new Array();
var clickD = new Array();
var movingMouse;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var canvasBox = document.getElementById('canvas_box');
var canvas    = document.createElement("canvas");


//---------------
// Create canvas
//---------------
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("id", canvasId);
canvas.style.backgroundColor = canvasBackgroundColor;
canvasBox.appendChild(canvas);
ctx = canvas.getContext("2d");


//Get the current position of the mouse X and Y coordinates relatively to the canvas
//The window X and Y coordinates minus the canvas offset values.
function getCurrPos(e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
}

//---------------------
// Move down function
//---------------------
$("#canvas").mousedown(function(e) {
    getCurrPos(e);
    movingMouse = true;
    onClick(currX, currY);
    draw();
});

//---------------------
// move function
//---------------------
$("#canvas").mousemove(function(e) {
    if(movingMouse) {
	   getCurrPos(e);
       onClick(currX, currY, true);
       draw();
    }
});
 
//-------------------
// move up function
//-------------------
$("#canvas").mouseup(function(e) {
    movingMouse = false;
});
 
 
//----------------------
// leave canvas function
//----------------------
$("#canvas").mouseleave(function(e) {
    movingMouse = false;
});
 
 
//--------------------
// click function
//--------------------
function onClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickD.push(dragging);
}
 
//-------------------
// draw function
//-------------------
function draw() {
	
	//clear everything in the canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
	//Line colour
	ctx.strokeStyle = canvasStrokeStyle;
	//Join lines with rounded corners equal to the line width
	ctx.lineJoin    = canvasLineJoin;
	//line tickness
	ctx.lineWidth   = canvasLineWidth;
    
	//start a new path.
	for (var i = 0; i < clickX.length; i++) {
		ctx.beginPath();
		//If mouse is held down and moving(draging)
		if(clickD[i] && i) {
			ctx.moveTo(clickX[i-1], clickY[i-1]);
		} else {
			ctx.moveTo(clickX[i]-1, clickY[i]);
		}
		//connect the current sub-path
        //to the last sub-path with a straight line
		ctx.lineTo(clickX[i], clickY[i]);
		//close the path.
		ctx.closePath();
		ctx.stroke();
	}
}

//------------------------
// clear button function
//------------------------
$("#clear-button").click(async function () {
	//clear the canvas, result text and result box
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    clickX = new Array();
    clickY = new Array();
    clickD = new Array();
    $(".prediction-text").empty();
    $("#result_box").addClass('d-none');
});