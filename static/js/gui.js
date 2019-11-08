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