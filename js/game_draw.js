/*
 * Copyright (C) 2013  Austin Boyle <boyle.austin@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * For a copy of the GNU General Public License see
 * <http://www.gnu.org/licenses/>.
 */

/*
 * This file handles the animation updates
 */

// Sizes
var BOARDER = 2;
var SIZE_DOT = 10;

// Colours
COLOUR = { 
	WHITE : "#FFFFFF",
	BLACK : "#000000",
	BG_PLAY : "#FFFFFF",
	BG_DEBUG : "#BDBDBD",
	BOARDER : "#000000",
	BG : "#99FFCC",
	SHADOW : "#BDBDBD",
	DOT_GOOD : "#FFFF00",
	DOT_BAD : "#3399CC",
	DOT_COLLISION : "#FF3333",
	DOT2 : "#000000",
	HEALTH_GOOD : "#00FF66",
	HEALTH_BAD : "#FF3333",
	BG_LEVEL2 : "#66FFFF"
};

var HEALTH_WIDTH = 100;
var HEALTH_HEIGHT = 20;

var bgImage;
var groundImg;
var platformImg;
var pineappleImg;
var doorImg;
var ballImg;
var treeImg;
var platformTreeImg;
var platformBWImg;

var frameCount;

/* Load image */
function loadImage(name)
{
	var i = new Image();
	i.src = name;
	return i;
}

/* Turn drop shadow on and off */
function shadowOn(context)
{
	context.shadowOffsetX = BOARDER;
	context.shadowOffsetY = BOARDER;
	context.shadowBlur = 4;
	context.shadowColor = COLOUR.SHADOW;
}
function shadowOff(context)
{
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
}

/*
 * Run once at start
 */
function initDraw()
{
	/* Resize */
	boardCanvas.width = WIDTH;
	boardCanvas.height = HEIGHT;

	boardCanvas.offset = new vector(0,0);

//	viewCanvas.width = WIDTH;
//	viewCanvas.height = HEIGHT;

	viewCanvas.offset = new vector(0,0);

	bgImage = loadImage("images/dropman.png");
	platformImg = loadImage("images/ground_grass.png");
	platformTreeImg = loadImage("images/platform_tree.png");
	platformBWImg = loadImage("images/ground_grass_bw.png");
	groundImg = platformImg; /* init */
	
	pineappleImg = loadImage("images/pineapple.png");
	doorImg = loadImage("images/door.png");
	ballImg = loadImage("images/dodgeball2.png");
	
	/* background images */
	treeImg = loadImage("images/tree.png");
	
	var tempImg = loadImage("images/dropman_right.png");
	tempImg = loadImage("images/dropman_left.png");

	frameCount = 0;
}

function singleDraw(context, canvas)
{
	var offs = canvas.offset.clone();

	/* Background */
	context.fillStyle = COLOUR.BOARDER;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = state.bgcolour;
	context.fillRect(BOARDER, BOARDER, canvas.width-2*BOARDER, canvas.height-2*BOARDER);

	if (input.mouseMove) {
				/* image, sx, sy, sw, sh, dx, dy, dw, dh */
		context.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, WIDTH/2 - bgImage.width/4, HEIGHT/2 - bgImage.height/4, bgImage.width/2, bgImage.height/2);
	}
	
	for (var i = 0; i < bg_images.length; i++) {
		bg_images[i].draw(context, canvas);
	}

	/* ground */
	if (groundImg.height != 0) {
		for (var offset = 0; offset <= space.width + groundImg.width; offset += groundImg.width) {
			context.drawImage(groundImg, offset - canvas.offset.x, canvas.height - groundImg.height + canvas.offset.y);
		}
	}
	
	/* Static objects */
	shadowOn(context);
	for (var i = 0; i < objs_static.length; i++) {
		objs_static[i].draw(context, canvas);
	}
	shadowOff(context);
	
	/* Gates */
	for (var i = 0; i < gates.length; i++) {
		gates[i].draw(context, canvas);
	}
	
	/* Dots */
	for (var i = 0; i < objs_dynamic.length; i++) {
		objs_dynamic[i].draw(context, canvas);
	}

	/* Player */
	player.draw(context, canvas);

	/* Game stats */
	shadowOn(context);
	context.fillStyle = COLOUR.BOARDER;
	context.fillRect(canvas.width - HEALTH_WIDTH - 4*BOARDER, 2*BOARDER, HEALTH_WIDTH+2*BOARDER, HEALTH_HEIGHT+2*BOARDER);
	shadowOff(context);
	context.fillStyle = COLOUR.HEALTH_GOOD;
	context.fillRect(canvas.width - HEALTH_WIDTH - 3*BOARDER, 3*BOARDER, HEALTH_WIDTH*player.health/100, HEALTH_HEIGHT);	
	context.fillStyle = COLOUR.HEALTH_BAD;
	context.fillRect(canvas.width - HEALTH_WIDTH - 3*BOARDER + HEALTH_WIDTH*player.health/100, 3*BOARDER, HEALTH_WIDTH*(100-player.health)/100, HEALTH_HEIGHT);
}

/*
 * Run every animation tick
 */
function gameDraw()
{
	state.gameDraw();	
	/* repeat */
	requestAnimationFrame(gameDraw);
}

function basicDraw()
{
	singleDraw(boardContext, boardCanvas);

	singleDraw(viewContext, viewCanvas);

	/* frame counter 0-99 */
	frameCount = (++frameCount) % 100;	
}

function deadDraw()
{
	/* dead! *
	if (player.health == 0 || (player.health < 8 && (frameCount%2 == 0))) {
		context.fillStyle = COLOUR.BOARDER;
		context.fillRect(0, 0, WIDTH, HEIGHT);
	}*/

	viewContext.fillStyle = COLOUR.BOARDER;
	viewContext.fillRect(0, 0, WIDTH, HEIGHT);
}

function titleDraw()
{
	viewContext.fillStyle = state.bgcolour;
	viewContext.fillRect(0, 0, WIDTH, HEIGHT);
	viewContext.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, viewCanvas.width/2 - bgImage.width/4, viewCanvas.height/2 - bgImage.height/4, bgImage.width/2, bgImage.height/2);
	
	viewContext.fillStyle = '#000000';
	viewContext.font = 'courier monospace 30px';
	viewContext.textBaseline = 'top';
	viewContext.textAlign = 'center';
	viewContext.fillText(state.toString(), viewCanvas.width/2, viewCanvas.width/2 - 100);
}